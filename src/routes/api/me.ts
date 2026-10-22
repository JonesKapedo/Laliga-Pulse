import { createFileRoute } from "@tanstack/react-router";

/** A fan's season standing: points + global rank. */
export const Route = createFileRoute("/api/me")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const fanId = new URL(request.url).searchParams.get("fanId");
        if (!fanId) return Response.json({ error: "fanId_required" }, { status: 400 });
        try {
          const { getFanSeason } = await import("@/lib/participation.server");
          return Response.json(await getFanSeason(fanId));
        } catch (err) {
          console.error("[api/me]", err);
          return Response.json({ error: "me_failed" }, { status: 500 });
        }
      },
    },
  },
});
