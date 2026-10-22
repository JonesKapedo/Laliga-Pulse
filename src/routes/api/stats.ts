import { createFileRoute } from "@tanstack/react-router";

/** Aggregate engagement figures (deck evidence, live from the events table). */
export const Route = createFileRoute("/api/stats")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const { getStats } = await import("@/lib/participation.server");
          return Response.json(await getStats());
        } catch (err) {
          console.error("[api/stats]", err);
          return Response.json({ error: "stats_failed" }, { status: 500 });
        }
      },
    },
  },
});
