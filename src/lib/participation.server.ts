import { getSql } from "@/lib/db";

/**
 * Server-only participation engine.
 *
 * `events` is append-only and is the single source of truth for the live tally,
 * the season leaderboard, reputation and engagement telemetry. Points are
 * awarded **here**, not by the client, so the board is server-verified rather
 * than client-reported. Production would settle outcome points from the
 * official feed; the prototype scores participation.
 */

/** Rolling season window for the leaderboard / reputation. */
export const SEASON_DAYS = 120;

/** Server-owned scoring rules (points per event). */
const POINTS: Record<string, number> = {
  ritual: 400,
  vote: 250,
  forecast: 500,
  comment: 40,
  pod_join: 100,
  emotion: 0,
  open: 0,
};

export type EventInput = {
  fanId?: string | null;
  handle?: string | null;
  clubId?: string | null;
  name: string;
  momentId?: string | null;
  optionId?: string | null;
  value?: number | null;
};

export type TallyOption = { optionId: string; votes: number; share: number };
export type Tally = { momentId: string; total: number; options: TallyOption[] };

const clean = (v: unknown, max: number): string | null => {
  if (typeof v !== "string") return null;
  const s = v.trim().slice(0, max);
  return s.length ? s : null;
};

const cleanId = (v: unknown): string | null => {
  const s = clean(v, 64);
  return s && /^[A-Za-z0-9_.:-]+$/.test(s) ? s : null;
};

async function upsertFan(
  fanId: string | null,
  handle: string | null,
  clubId: string | null,
): Promise<void> {
  if (!fanId) return;
  const sql = await getSql();
  await sql.query(
    `insert into fans (id, handle, club_id) values ($1, $2, $3)
     on conflict (id) do update
       set handle = coalesce(excluded.handle, fans.handle),
           club_id = coalesce(excluded.club_id, fans.club_id)`,
    [fanId, handle, clubId],
  );
}

export async function getTally(momentId: string): Promise<Tally> {
  const sql = await getSql();
  const rows = await sql.query<{ option_id: string; votes: number }>(
    `select option_id, count(*)::int as votes
       from events
      where name = 'vote' and moment_id = $1 and option_id is not null
      group by option_id
      order by votes desc, option_id asc`,
    [momentId],
  );
  const total = rows.reduce((sum, r) => sum + r.votes, 0);
  return {
    momentId,
    total,
    options: rows.map((r) => ({
      optionId: r.option_id,
      votes: r.votes,
      share: total ? Math.round((r.votes / total) * 100) : 0,
    })),
  };
}

export async function recordEvent(
  input: EventInput,
): Promise<{ ok: boolean; points: number; tally?: Tally; duplicate?: boolean }> {
  const name = clean(input.name, 32);
  if (!name) return { ok: false, points: 0 };

  const fanId = cleanId(input.fanId);
  const momentId = cleanId(input.momentId);
  const optionId = cleanId(input.optionId);
  const clubId = cleanId(input.clubId);
  const handle = clean(input.handle, 24);

  await upsertFan(fanId, handle, clubId);

  const points = POINTS[name] ?? 0;
  const sql = await getSql();
  const inserted = await sql.query<{ id: string }>(
    `insert into events (fan_id, name, moment_id, option_id, club_id, value, points)
     values ($1, $2, $3, $4, $5, $6, $7)
     on conflict do nothing
     returning id`,
    [
      fanId,
      name,
      momentId,
      optionId,
      clubId,
      typeof input.value === "number" && Number.isFinite(input.value)
        ? input.value
        : null,
      points,
    ],
  );

  const duplicate = inserted.length === 0;
  const tally = name === "vote" && momentId ? await getTally(momentId) : undefined;
  return { ok: true, points: duplicate ? 0 : points, tally, duplicate };
}

export type LeaderboardScope = "global" | "club" | "pod";
export type LeaderboardRow = {
  id: string;
  handle: string;
  clubId: string;
  points: number;
};

export async function getLeaderboard(opts: {
  scope?: LeaderboardScope;
  clubId?: string | null;
  podId?: string | null;
  limit?: number;
}): Promise<LeaderboardRow[]> {
  const scope = opts.scope ?? "global";
  const limit = Math.min(Math.max(opts.limit ?? 25, 1), 100);
  const clubId = cleanId(opts.clubId);
  const podId = cleanId(opts.podId);

  const params: unknown[] = [String(SEASON_DAYS)];
  let filter = "";
  if (scope === "club" && clubId) {
    params.push(clubId);
    filter += ` and f.club_id = $${params.length}`;
  }
  if (scope === "pod" && podId) {
    params.push(podId);
    filter += ` and e.fan_id in (select fan_id from pod_members where pod_id = $${params.length})`;
  }
  params.push(limit);

  const sql = await getSql();
  const rows = await sql.query<{
    id: string;
    handle: string;
    club_id: string;
    points: number;
  }>(
    `select e.fan_id as id,
            coalesce(max(f.handle), 'Fan') as handle,
            coalesce(max(f.club_id), '') as club_id,
            sum(e.points)::int as points
       from events e
       left join fans f on f.id = e.fan_id
      where e.fan_id is not null
        and e.created_at >= now() - ($1 || ' days')::interval${filter}
      group by e.fan_id
      order by points desc, max(e.created_at) asc
      limit $${params.length}`,
    params,
  );

  return rows.map((r) => ({
    id: r.id,
    handle: r.handle,
    clubId: r.club_id ?? "",
    points: r.points,
  }));
}

/** A fan's season standing (points + position among all fans). */
export async function getFanSeason(
  fanId: string,
): Promise<{ points: number; rank: number; fans: number }> {
  const id = cleanId(fanId);
  if (!id) return { points: 0, rank: 0, fans: 0 };
  const sql = await getSql();
  const rows = await sql.query<{ points: number; rank: number; fans: number }>(
    `with scored as (
       select e.fan_id as id, sum(e.points)::int as points
         from events e
        where e.fan_id is not null
          and e.created_at >= now() - ($2 || ' days')::interval
        group by e.fan_id
     )
     select coalesce((select points from scored where id = $1), 0) as points,
            (select count(*)::int + 1 from scored where points > coalesce((select points from scored where id = $1), 0)) as rank,
            (select count(*)::int from scored) as fans`,
    [id, String(SEASON_DAYS)],
  );
  return rows[0] ?? { points: 0, rank: 0, fans: 0 };
}

/** Aggregate engagement figures — the numbers the deck cites as evidence. */
export async function getStats(): Promise<{
  fans: number;
  events: number;
  votes: number;
  votesToday: number;
  moments: number;
}> {
  const sql = await getSql();
  const rows = await sql.query<{
    fans: number;
    events: number;
    votes: number;
    votes_today: number;
    moments: number;
  }>(
    `select (select count(*)::int from fans) as fans,
            (select count(*)::int from events) as events,
            (select count(*)::int from events where name = 'vote') as votes,
            (select count(*)::int from events where name = 'vote' and created_at >= date_trunc('day', now())) as votes_today,
            (select count(distinct moment_id)::int from events where name = 'vote' and moment_id is not null) as moments`,
  );
  const r = rows[0];
  return {
    fans: r?.fans ?? 0,
    events: r?.events ?? 0,
    votes: r?.votes ?? 0,
    votesToday: r?.votes_today ?? 0,
    moments: r?.moments ?? 0,
  };
}

export type Pod = {
  id: string;
  code: string;
  name: string;
  clubId: string;
  members: number;
};

function podCode(): string {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

export async function listPods(clubId?: string | null): Promise<Pod[]> {
  const sql = await getSql();
  const id = cleanId(clubId);
  const rows = await sql.query<{
    id: string;
    code: string;
    name: string;
    club_id: string;
    members: number;
  }>(
    `select p.id, p.code, p.name, coalesce(p.club_id, '') as club_id,
            (select count(*)::int from pod_members m where m.pod_id = p.id) as members
       from pods p
      ${id ? "where p.club_id = $1" : ""}
      order by members desc, p.created_at desc
      limit 50`,
    id ? [id] : [],
  );
  return rows.map((r) => ({
    id: r.id,
    code: r.code,
    name: r.name,
    clubId: r.club_id,
    members: r.members,
  }));
}

export async function createPod(input: {
  name: string;
  clubId?: string | null;
  fanId?: string | null;
  handle?: string | null;
}): Promise<Pod | null> {
  const name = clean(input.name, 40);
  if (!name) return null;
  const clubId = cleanId(input.clubId);
  const fanId = cleanId(input.fanId);
  const handle = clean(input.handle, 24);

  await upsertFan(fanId, handle, clubId);

  const sql = await getSql();
  const id = crypto.randomUUID();
  const code = podCode();
  await sql.query(
    `insert into pods (id, code, name, club_id) values ($1, $2, $3, $4)`,
    [id, code, name, clubId],
  );
  if (fanId) {
    await sql.query(
      `insert into pod_members (pod_id, fan_id, handle) values ($1, $2, $3)
       on conflict do nothing`,
      [id, fanId, handle],
    );
  }
  return { id, code, name, clubId: clubId ?? "", members: fanId ? 1 : 0 };
}

export async function joinPod(input: {
  code: string;
  fanId?: string | null;
  handle?: string | null;
}): Promise<Pod | null> {
  const code = clean(input.code, 12)?.toUpperCase();
  if (!code) return null;
  const fanId = cleanId(input.fanId);
  const handle = clean(input.handle, 24);
  if (!fanId) return null;

  const sql = await getSql();
  const found = await sql.query<{
    id: string;
    code: string;
    name: string;
    club_id: string;
  }>(`select id, code, name, coalesce(club_id, '') as club_id from pods where code = $1`, [
    code,
  ]);
  const pod = found[0];
  if (!pod) return null;

  await upsertFan(fanId, handle, pod.club_id || null);
  await sql.query(
    `insert into pod_members (pod_id, fan_id, handle) values ($1, $2, $3)
     on conflict do nothing`,
    [pod.id, fanId, handle],
  );
  await sql.query(
    `insert into events (fan_id, name, club_id, points) values ($1, 'pod_join', $2, $3)`,
    [fanId, pod.club_id || null, POINTS.pod_join],
  );

  const count = await sql.query<{ members: number }>(
    `select count(*)::int as members from pod_members where pod_id = $1`,
    [pod.id],
  );
  return {
    id: pod.id,
    code: pod.code,
    name: pod.name,
    clubId: pod.club_id,
    members: count[0]?.members ?? 0,
  };
}
