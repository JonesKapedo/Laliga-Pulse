/**
 * Self-hosted Better Auth for this app (server-only).
 *
 * The app runs its own Better Auth at `/api/auth/*`, so the session cookie stays
 * on this app's own origin. Sign-in uses whichever standard OAuth providers are
 * configured in the environment (Google, X, GitHub). No external auth broker is
 * required.
 *
 * Tri-mode:
 *   - Deployed: set `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, provider client
 *     ids/secrets, and `DATABASE_URL` (Neon). Sessions persist in Postgres.
 *   - Local dev: no provider creds -> auth is off; the app works from
 *     localStorage. Set provider creds to exercise real sign-in.
 *   - Off: `VITE_AUTH_ENABLED=false` disables sign-in and resolves a dev user.
 *
 * NEVER import this from client code — it pulls in `pg` + server-only Better
 * Auth internals. The client uses `@/lib/auth/client`; components read the user
 * via `@/lib/auth/use-current-user`; server functions get a verified id via
 * `@/lib/auth/middleware`.
 */
import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { randomBytes } from "node:crypto";
import { Pool } from "pg";
import { ensureDbReady, getPglite } from "../db";
import { emailAndPasswordEnabled } from "./email-password";
import { pgliteDialect } from "./pglite-dialect";

// Kick (and share) PGLite bootstrap as soon as the auth server module loads.
void ensureDbReady();

/**
 * Dev secret must outlive module reloads: PGLite (and its session rows) is
 * stored on `globalThis`, so an HMR re-eval of this file must NOT mint a new
 * signing secret or every existing session becomes invalid mid-dev. Process
 * restart clears both the secret and PGLite together.
 */
const globalAuthRef = globalThis as typeof globalThis & {
  __appAuthDevSecret__?: string;
};
function devAuthSecret(): string {
  globalAuthRef.__appAuthDevSecret__ ??= randomBytes(32).toString("hex");
  return globalAuthRef.__appAuthDevSecret__;
}

/** Read an env var, treating empty/whitespace as unset. */
const env = (key: string): string | undefined => {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
};

// Explicit off-switch. Set it to "false" to force auth off everywhere (dev user).
const authDisabled = env("VITE_AUTH_ENABLED") === "false";

const googleId = env("GOOGLE_CLIENT_ID");
const googleSecret = env("GOOGLE_CLIENT_SECRET");
const twitterId = env("TWITTER_CLIENT_ID");
const twitterSecret = env("TWITTER_CLIENT_SECRET");
const githubId = env("GITHUB_CLIENT_ID");
const githubSecret = env("GITHUB_CLIENT_SECRET");

const socialProviders = {
  ...(googleId && googleSecret
    ? { google: { clientId: googleId, clientSecret: googleSecret } }
    : {}),
  ...(twitterId && twitterSecret
    ? { twitter: { clientId: twitterId, clientSecret: twitterSecret } }
    : {}),
  ...(githubId && githubSecret
    ? { github: { clientId: githubId, clientSecret: githubSecret } }
    : {}),
};

/** True when federated sign-in is active (real auth is enforced). */
export const authConfigured =
  !authDisabled && Object.keys(socialProviders).length > 0;

const explicitBaseURL = env("BETTER_AUTH_URL");
const LOCAL_DEV_ORIGINS = [
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://[::1]:8080",
];
const baseURL = explicitBaseURL ?? "http://localhost:8080";
const trustedOrigins = explicitBaseURL
  ? [explicitBaseURL, ...LOCAL_DEV_ORIGINS]
  : LOCAL_DEV_ORIGINS;

const databaseUrl = env("DATABASE_URL");

// Real Postgres when `DATABASE_URL` is set (deployed apps), else the app's
// embedded PGLite (local dev) via a Kysely dialect — so Better Auth persists to
// the SAME DB as app data, including email/password users.
const database = databaseUrl
  ? new Pool({ connectionString: databaseUrl })
  : { dialect: pgliteDialect(() => getPglite()), type: "postgres" as const };

export const auth = betterAuth({
  baseURL,
  secret: env("BETTER_AUTH_SECRET") ?? devAuthSecret(),
  database,
  trustedOrigins,
  socialProviders,

  account: {
    encryptOAuthTokens: true,
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "twitter", "github"],
      requireLocalEmailVerified: false,
    },
  },

  // Cache the session in the short-lived signed `session_data` cookie so reads
  // skip the DB — this shrinks the signed-in loading window.
  session: { cookieCache: { enabled: true, maxAge: 300 } },

  // Local email/password — toggled only via `./email-password` (not a plugin).
  ...(emailAndPasswordEnabled ? { emailAndPassword: { enabled: true } } : {}),

  plugins: [
    // Bridges Better Auth's Set-Cookie into TanStack Start responses. MUST be
    // last so it runs after every other plugin's hooks.
    tanstackStartCookies(),
  ],
});
