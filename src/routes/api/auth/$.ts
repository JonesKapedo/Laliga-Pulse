import { createFileRoute } from "@tanstack/react-router";

/**
 * Better Auth catch-all API route (`/api/auth/*`).
 *
 * The handler module is imported lazily so `pg` / PGlite and the auth secret
 * never reach the client bundle.
 */
export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      ANY: async ({ request }) => {
        const { auth } = await import("@/lib/auth/server");
        return auth.handler(request);
      },
    },
  },
});
