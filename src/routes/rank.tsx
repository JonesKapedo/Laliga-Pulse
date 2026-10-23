import { createFileRoute } from "@tanstack/react-router";
import {
  CLUBS,
  LEADERBOARD,
  RANKS,
  rankFromPoints,
  type ClubId,
} from "@/data/pulse-data";
import { usePulse } from "@/store/pulse-store";
import { useFanId, useLeaderboard, useSeason } from "@/lib/use-participation";
import { Crest } from "@/components/crest";
import { PageHeader, SectionLabel } from "@/components/pulse-bits";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/rank")({ component: RankPage });

type Row = {
  key: string;
  name: string;
  club: ClubId;
  title: string;
  points: number;
  you: boolean;
};

function RankPage() {
  const points = usePulse((s) => s.points);
  const name = usePulse((s) => s.name);
  const setName = usePulse((s) => s.setName);
  const clubId = usePulse((s) => s.clubId);
  const live = useLeaderboard("global", null, null, 12);
  const season = useSeason();
  const fanId = useFanId();

  const shownPoints = season?.points ?? points;
  const rank = rankFromPoints(shownPoints);
  const usingLive = Boolean(live && live.length > 0);

  const asClub = (v: string): ClubId => (v in CLUBS ? (v as ClubId) : clubId);

  const rows: Row[] = usingLive
    ? live!.map((r) => ({
        key: r.id,
        name: r.handle,
        club: asClub(r.clubId),
        title: rankFromPoints(r.points).current.title,
        points: r.points,
        you: fanId ? r.id === fanId : false,
      }))
    : LEADERBOARD.map((row, i) => ({
        key: `${row.name}-${i}`,
        name: row.you ? name : row.name,
        club: row.you ? clubId : row.club,
        title: row.you ? rank.current.title : row.title,
        points: row.you ? shownPoints : row.points,
        you: Boolean(row.you),
      }));

  if (usingLive && fanId && shownPoints > 0 && !rows.some((r) => r.you)) {
    rows.push({
      key: fanId,
      name,
      club: clubId,
      title: rank.current.title,
      points: shownPoints,
      you: true,
    });
  }

  rows.sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-9">
      <PageHeader
        kicker="Your name in this league"
        title={rank.current.title}
        lede={rank.current.copy}
      >
        <div className="rounded-lg border border-border bg-surface px-4 py-3 text-right">
          <p className="text-[10px] tracking-[0.16em] text-muted uppercase">Season tiles</p>
          <p className="font-display text-3xl leading-none tabular-nums">
            {shownPoints.toLocaleString("en-GB")}
          </p>
        </div>
      </PageHeader>

      <section className="rounded-xl border border-border bg-surface p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <Crest clubId={clubId} size={56} />
            <div>
              <label className="text-xs text-muted" htmlFor="fan-name">
                How the stand knows you
              </label>
              <input
                id="fan-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-52 rounded-md border border-border bg-raised px-3 py-2 text-sm outline-none focus:border-faint focus:ring-2 focus:ring-accent/40"
              />
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] tracking-[0.16em] text-muted uppercase">Next step</p>
            <p className="mt-1 font-display text-lg">
              {rank.next ? rank.next.title : "Top of the stand"}
            </p>
            <p className="text-xs text-muted tabular-nums">
              {rank.next
                ? `${(rank.next.min - shownPoints).toLocaleString("en-GB")} tiles away`
                : "The Twelfth"}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-xs text-muted">
            <span>{rank.current.title}</span>
            <span>
              {rank.next ? `${rank.next.min.toLocaleString("en-GB")} tiles` : "Top"}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-raised">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-500"
              style={{ width: `${Math.round(rank.progress * 100)}%` }}
            />
          </div>
        </div>

        <p className="mt-4 text-xs text-muted">
          {season ? (
            season.rank ? (
              <>
                Season standing:{" "}
                <span className="text-fg tabular-nums">#{season.rank}</span> of{" "}
                {season.fans.toLocaleString("en-GB")} scoring fans ·{" "}
                {season.points.toLocaleString("en-GB")} league points
              </>
            ) : (
              <>
                Season standing: <span className="text-fg">Unranked</span> — no scoring
                calls this season yet.{" "}
                {season.fans.toLocaleString("en-GB")} fans are on the board.
              </>
            )
          ) : (
            "Connecting to the season…"
          )}
        </p>
      </section>

      <section>
        <SectionLabel>How standing is earned</SectionLabel>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Not bought. Not gambled. You show up, you call the night, you stay between
          matchdays. That is the only way the terrace promotes you.
        </p>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {RANKS.map((r) => {
            const current = r.title === rank.current.title;
            return (
              <li
                key={r.title}
                className={cn(
                  "rounded-lg border p-4",
                  current ? "border-fg bg-surface" : "border-border bg-surface/50",
                )}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-display text-lg">{r.title}</p>
                  {current && (
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] tracking-wide text-accent uppercase">
                      You
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted tabular-nums">{r.min}+ tiles</p>
                <p className="mt-2 text-sm text-muted">{r.copy}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <section>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <SectionLabel>The stand this week</SectionLabel>
          {!usingLive && (
            <span className="rounded-full border border-border px-2 py-0.5 text-[10px] tracking-wide text-muted uppercase">
              Sample board
            </span>
          )}
        </div>
        <ul className="mt-3 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
          {rows.map((row, i) => (
            <li
              key={row.key}
              className={cn("flex items-center gap-3 px-4 py-3", row.you && "bg-raised")}
            >
              <span className="w-6 font-display text-sm tabular-nums text-muted">
                {i + 1}
              </span>
              <Crest clubId={row.club} size={28} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">
                  {row.name}
                  {row.you ? " · you" : ""}
                </p>
                <p className="text-xs text-muted">
                  {row.title} · {CLUBS[row.club].short}
                </p>
              </div>
              <span className="font-display tabular-nums">
                {row.points.toLocaleString("en-GB")}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
