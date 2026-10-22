import { createFileRoute } from "@tanstack/react-router";

/** Watch pods ("peñas"): list, create, join. */
export const Route = createFileRoute("/api/pods")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        try {
          const { listPods } = await import("@/lib/participation.server");
          return Response.json({ pods: await listPods(url.searchParams.get("clubId")) });
        } catch (err) {
          console.error("[api/pods:get]", err);
          return Response.json({ error: "pods_failed" }, { status: 500 });
        }
      },
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as Record<string, unknown>;
          const pick = (k: string) =>
            typeof body[k] === "string" ? (body[k] as string) : null;
          const { createPod, joinPod } = await import("@/lib/participation.server");
          const fan = { fanId: pick("fanId"), handle: pick("handle") };
          if (body.action === "join") {
            const pod = await joinPod({ code: pick("code") ?? "", ...fan });
            return pod
              ? Response.json({ pod })
              : Response.json({ error: "pod_not_found" }, { status: 404 });
          }
          const pod = await createPod({
            name: pick("name") ?? "",
            clubId: pick("clubId"),
            ...fan,
          });
          return pod
            ? Response.json({ pod })
            : Response.json({ error: "invalid_pod" }, { status: 400 });
        } catch (err) {
          console.error("[api/pods:post]", err);
          return Response.json({ error: "pod_write_failed" }, { status: 500 });
        }
      },
    },
  },
});
