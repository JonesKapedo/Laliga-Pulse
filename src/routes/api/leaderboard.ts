import { createFileRoute } from "@tanstack/react-router";

/** Season leaderboard: global, club or pod scoped. */
export const Route = createFileRoute("/api/leaderboard")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const scopeParam = url.searchParams.get("scope");
        const scope =
          scopeParam === "club" || scopeParam === "pod" ? scopeParam : "global";
        const limit = Number(url.searchParams.get("limit") ?? 25);
        try {
          const { getLeaderboard } = await import("@/lib/participation.server");
          const rows = await getLeaderboard({
            scope,
            clubId: url.searchParams.get("clubId"),
            podId: url.searchParams.get("podId"),
            limit: Number.isFinite(limit) ? limit : 25,
          });
          return Response.json({ scope, rows });
        } catch (err) {
          console.error("[api/leaderboard]", err);
          return Response.json({ error: "leaderboard_failed" }, { status: 500 });
        }
      },
    },
  },
});
