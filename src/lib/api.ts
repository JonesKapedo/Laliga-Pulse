/**
 * Client read helpers for the participation API. Every call degrades to
 * `null` / `[]` on failure so callers can fall back to seeded demo data and the
 * app never breaks when the backend is absent.
 */

export type TallyOption = { optionId: string; votes: number; share: number };
export type Tally = { momentId: string; total: number; options: TallyOption[] };
export type LeaderboardRow = {
  id: string;
  handle: string;
  clubId: string;
  points: number;
};
export type Pod = {
  id: string;
  code: string;
  name: string;
  clubId: string;
  members: number;
};

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { headers: { accept: "application/json" } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function postJson<T>(url: string, body: unknown): Promise<T | null> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function fetchTally(momentId: string): Promise<Tally | null> {
  return getJson<Tally>(`/api/tally?momentId=${encodeURIComponent(momentId)}`);
}

export function fetchLeaderboard(opts: {
  scope?: "global" | "club" | "pod";
  clubId?: string | null;
  podId?: string | null;
  limit?: number;
}): Promise<{ scope: string; rows: LeaderboardRow[] } | null> {
  const params = new URLSearchParams();
  if (opts.scope) params.set("scope", opts.scope);
  if (opts.clubId) params.set("clubId", opts.clubId);
  if (opts.podId) params.set("podId", opts.podId);
  if (opts.limit) params.set("limit", String(opts.limit));
  return getJson(`/api/leaderboard?${params.toString()}`);
}

export function fetchPods(clubId?: string | null): Promise<{ pods: Pod[] } | null> {
  const q = clubId ? `?clubId=${encodeURIComponent(clubId)}` : "";
  return getJson(`/api/pods${q}`);
}

export function createPod(input: {
  name: string;
  clubId?: string | null;
  fanId: string | null;
  handle?: string | null;
}): Promise<{ pod: Pod } | null> {
  return postJson("/api/pods", { action: "create", ...input });
}

export function joinPod(input: {
  code: string;
  fanId: string | null;
  handle?: string | null;
}): Promise<{ pod: Pod } | null> {
  return postJson("/api/pods", { action: "join", ...input });
}
