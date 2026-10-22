import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SectionLabel } from "@/components/pulse-bits";
import { Button } from "@/components/ui/button";
import { createPod, joinPod } from "@/lib/api";
import { getFanId } from "@/lib/telemetry";
import { useLeaderboard, usePods } from "@/lib/use-participation";
import { usePulse } from "@/store/pulse-store";

/**
 * Watch pods ("peñas"): the belonging layer. A pod is a small group a fan
 * creates or joins by code; its standing is a pod-scoped leaderboard over the
 * same season events.
 */

const KEY = "laliga-pulse-pod";

type Membership = { id: string; code: string; name: string };

function readMembership(): Membership | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Membership;
    return parsed && parsed.id && parsed.code ? parsed : null;
  } catch {
    return null;
  }
}

export function PodPanel() {
  const clubId = usePulse((s) => s.clubId);
  const handle = usePulse((s) => s.name);
  const [membership, setMembership] = useState<Membership | null>(null);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    setMembership(readMembership());
  }, []);

  const pods = usePods(clubId, refresh);
  const board = useLeaderboard("pod", null, membership?.id ?? null, 5);

  const save = (pod: { id: string; code: string; name: string }) => {
    const next = { id: pod.id, code: pod.code, name: pod.name };
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // storage unavailable — the pod still works for this session
    }
    setMembership(next);
    setRefresh((v) => v + 1);
  };

  const onCreate = async () => {
    if (!name.trim() || busy) return;
    setBusy(true);
    const res = await createPod({
      name: name.trim(),
      clubId,
      fanId: getFanId(),
      handle,
    });
    setBusy(false);
    if (!res) {
      toast("Could not create the block. Try again.");
      return;
    }
    save(res.pod);
    setName("");
    toast(`Block ${res.pod.name} is open · code ${res.pod.code}`);
  };

  const onJoin = async (joinCode: string) => {
    if (!joinCode.trim() || busy) return;
    setBusy(true);
    const res = await joinPod({
      code: joinCode.trim(),
      fanId: getFanId(),
      handle,
    });
    setBusy(false);
    if (!res) {
      toast("No block with that code.");
      return;
    }
    save(res.pod);
    setCode("");
    toast(`You are in ${res.pod.name}`);
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <SectionLabel>The block</SectionLabel>

      {membership ? (
        <>
          <p className="mt-2 font-display text-lg">{membership.name}</p>
          <p className="text-xs text-muted">
            Code <span className="tabular-nums">{membership.code}</span> · share it with your
            row
          </p>
          <div className="mt-4">
            <SectionLabel>Block standing</SectionLabel>
            {board && board.length ? (
              <ol className="mt-2 space-y-1.5">
                {board.map((row, i) => (
                  <li key={row.id} className="flex items-baseline justify-between text-sm">
                    <span className="min-w-0 truncate">
                      <span className="mr-2 text-xs text-muted tabular-nums">{i + 1}</span>
                      {row.handle}
                    </span>
                    <span className="tabular-nums">{row.points.toLocaleString("en-GB")}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-2 text-sm text-muted">
                You are first in. Call a moment to put the block on the board.
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <p className="mt-2 text-sm text-muted">
            A block is your row: a bar, a group chat, a city. Join one and its standing is
            yours.
          </p>
          <div className="mt-3 flex gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Block code"
              className="h-10 min-w-0 flex-1 rounded-md border border-border bg-raised px-3 text-sm uppercase"
            />
            <Button size="sm" variant="outline" disabled={busy} onClick={() => onJoin(code)}>
              Join
            </Button>
          </div>
          <div className="mt-2 flex gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Start a block"
              className="h-10 min-w-0 flex-1 rounded-md border border-border bg-raised px-3 text-sm"
            />
            <Button size="sm" disabled={busy} onClick={onCreate}>
              Create
            </Button>
          </div>
          {pods && pods.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {pods.slice(0, 4).map((pod) => (
                <li key={pod.id} className="flex items-baseline justify-between text-sm">
                  <span className="min-w-0 truncate">
                    {pod.name}
                    <span className="ml-2 text-xs text-muted tabular-nums">
                      {pod.members} in
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onJoin(pod.code)}
                    className="text-xs text-accent hover:underline"
                  >
                    Join
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
