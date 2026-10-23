import { useEffect, useState } from "react";
import {
  fetchLeaderboard,
  fetchPods,
  fetchTally,
  type LeaderboardRow,
  type Pod,
  type Tally,
} from "@/lib/api";
import { getFanId } from "@/lib/telemetry";

/**
 * Small data hooks for the participation API. Each is SSR-safe (effects run on
 * the client only) and returns `null` until a real value arrives, so views keep
 * rendering their seeded fallback until the backend answers.
 */

function useRefreshTick(intervalMs = 30_000): number {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const bump = () => setTick((t) => t + 1);
    const id = window.setInterval(bump, intervalMs);
    window.addEventListener("mosaico:refresh", bump);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("mosaico:refresh", bump);
    };
  }, [intervalMs]);
  return tick;
}

export function useFanId(): string | null {
  const [fanId, setFanId] = useState<string | null>(null);
  useEffect(() => {
    setFanId(getFanId());
  }, []);
  return fanId;
}

export function useTally(momentId: string, enabled = true): Tally | null {
  const [tally, setTally] = useState<Tally | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    void fetchTally(momentId).then((t) => {
      if (alive && t) setTally(t);
    });
    return () => {
      alive = false;
    };
  }, [momentId, enabled]);
  return tally;
}

export function useLeaderboard(
  scope: "global" | "club" | "pod",
  clubId?: string | null,
  podId?: string | null,
  limit = 12,
): LeaderboardRow[] | null {
  const [rows, setRows] = useState<LeaderboardRow[] | null>(null);
  const tick = useRefreshTick();
  useEffect(() => {
    let alive = true;
    void fetchLeaderboard({ scope, clubId, podId, limit }).then((r) => {
      if (alive && r) setRows(r.rows);
    });
    return () => {
      alive = false;
    };
  }, [scope, clubId, podId, limit, tick]);
  return rows;
}

export type Season = { points: number; rank: number | null; fans: number };

export function useSeason(refresh = 0): Season | null {
  const [season, setSeason] = useState<Season | null>(null);
  const tick = useRefreshTick();
  useEffect(() => {
    const fanId = getFanId();
    if (!fanId) return;
    let alive = true;
    void fetch(`/api/me?fanId=${encodeURIComponent(fanId)}`, { cache: "no-store" })
      .then((r) => (r.ok ? (r.json() as Promise<Season>) : null))
      .then((s) => {
        if (alive && s) setSeason(s);
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [refresh, tick]);
  return season;
}

export type Stats = {
  fans: number;
  events: number;
  votes: number;
  votesToday: number;
  moments: number;
};

export function useStats(refresh = 0): Stats | null {
  const [stats, setStats] = useState<Stats | null>(null);
  const tick = useRefreshTick();
  useEffect(() => {
    let alive = true;
    void fetch("/api/stats", { cache: "no-store" })
      .then((r) => (r.ok ? (r.json() as Promise<Stats>) : null))
      .then((s) => {
        if (alive && s) setStats(s);
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [refresh, tick]);
  return stats;
}

export function usePods(clubId?: string | null, refresh = 0): Pod[] | null {
  const [pods, setPods] = useState<Pod[] | null>(null);
  const tick = useRefreshTick();
  useEffect(() => {
    let alive = true;
    void fetchPods(clubId).then((r) => {
      if (alive && r) setPods(r.pods);
    });
    return () => {
      alive = false;
    };
  }, [clubId, refresh, tick]);
  return pods;
}
