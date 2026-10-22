/**
 * The identity providers this app can offer for sign-in.
 *
 * Source of truth for BOTH the server (`server.ts`, one Better Auth social
 * provider per configured credential pair) and the client (sign-in buttons).
 * Kept in its own dependency-free module so the client can import it without
 * pulling the server-only Better Auth instance (and `pg`) into the browser
 * bundle.
 *
 * A provider is only active server-side when its client id/secret env vars are
 * set. The client list is a display list; `VITE_AUTH_ENABLED=false` hides auth
 * entirely.
 */
export type AuthProviderId = "google" | "twitter" | "github";

export type AuthProvider = {
  /** Better Auth provider id; also the callback path segment. */
  id: AuthProviderId;
  /** Human label for the sign-in button. */
  label: string;
};

export const AUTH_PROVIDERS: readonly AuthProvider[] = [
  { id: "google", label: "Google" },
  { id: "twitter", label: "X" },
  { id: "github", label: "GitHub" },
];
