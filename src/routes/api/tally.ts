import { createFileRoute } from "@tanstack/react-router";

/** Live tally for one Pulse Moment. */
export const Route = createFileRoute("/api/tally")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const momentId = url.searchParams.get("momentId");
        if (!momentId) {
          return Response.json({ error: "momentId_required" }, { status: 400 });
        }
        try {
          const { getTally } = await import("@/lib/participation.server");
          return Response.json(await getTally(momentId));
        } catch (err) {
          console.error("[api/tally]", err);
          return Response.json({ error: "tally_failed" }, { status: 500 });
        }
      },
    },
  },
});
