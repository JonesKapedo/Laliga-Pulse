import { createAuthClient } from "better-auth/react";
import { AUTH_PROVIDERS } from "./providers";

/**
 * Better Auth client for this React SPA (browser-side).
 *
 * Talks to this app's OWN Better Auth at same-origin `/api/auth/*`. Deployed
 * apps use the normal full-page OAuth redirect, so cookie auth just works.
 */
export const authClient = createAuthClient();

/**
 * True when sign-in UI should be shown — i.e. whenever `VITE_AUTH_ENABLED` is
 * not `"false"`. Set it to `"false"` to select the dev user (see
 * `use-current-user`).
 */
export const authEnabled = import.meta.env.VITE_AUTH_ENABLED !== "false";

/** The upstream providers to render sign-in buttons for. */
export { AUTH_PROVIDERS };

/**
 * Start sign-in with one provider (`id` from `AUTH_PROVIDERS`).
 *
 * Clears any existing local session first so switching providers actually
 * switches identity, then performs a normal full-page OAuth redirect.
 */
export async function signIn(
  providerId: string,
  opts: { callbackURL?: string; errorCallbackURL?: string } = {},
): Promise<void> {
  const callbackURL = opts.callbackURL ?? "/";
  const errorCallbackURL = opts.errorCallbackURL ?? "/";

  // Clear any prior session so switching providers actually switches identity.
  try {
    await authClient.signOut();
  } catch {
    /* no session to clear — continue */
  }

  const { data, error } = await authClient.signIn.social({
    provider: providerId,
    callbackURL,
    errorCallbackURL,
  });
  if (error) throw new Error(error.message ?? "Sign-in failed");
  if (data?.url) window.location.href = data.url;
}

/**
 * Sign out of THIS app's local session, then redirect.
 *
 * Use this, never `authClient.signOut()` directly, so the redirect always
 * follows a confirmed server-side sign-out.
 */
export async function signOut(redirectTo = "/"): Promise<void> {
  const { error } = await authClient.signOut();
  if (error) throw new Error(error.message ?? "Sign-out failed");
  window.location.href = redirectTo;
}
