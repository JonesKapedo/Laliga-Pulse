import { createFileRoute } from "@tanstack/react-router";

/**
 * Telemetry + participation write path. Server-only module is imported lazily so
 * `pg` / PGlite never reach the client bundle.
 */
export const Route = createFileRoute("/api/events")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as Record<string, unknown>;
          const { recordEvent } = await import("@/lib/participation.server");
          const pick = (k: string) =>
            typeof body[k] === "string" ? (body[k] as string) : null;
          const result = await recordEvent({
            fanId: pick("fanId"),
            handle: pick("handle"),
            clubId: pick("clubId"),
            name: pick("name") ?? "",
            momentId: pick("momentId"),
            optionId: pick("optionId"),
            value: typeof body.value === "number" ? body.value : null,
          });
          return Response.json(result, { status: result.ok ? 200 : 400 });
        } catch (err) {
          console.error("[api/events]", err);
          return Response.json({ ok: false, error: "events_failed" }, { status: 500 });
        }
      },
    },
  },
});
