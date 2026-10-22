import { createFileRoute } from "@tanstack/react-router";
import { CLUBS, LEADERBOARD, RANKS } from "@/data/pulse-data";
import { usePulse, useRank } from "@/store/pulse-store";
import { Crest } from "@/components/crest";
import { SectionLabel } from "@/components/pulse-bits";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/rank")({ component: RankPage });

function RankPage() {
  const points = usePulse((s) => s.points);
  const name = usePulse((s) => s.name);
  const setName = usePulse((s) => s.setName);
  const clubId = usePulse((s) => s.clubId);
  const rank = useRank();

  const board = LEADERBOARD.map((row) =>
    row.you
      ? { ...row, name, club: clubId, points, title: rank.current.title }
      : row,
  ).sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-8">
      <header>
        <SectionLabel>Your name in this league</SectionLabel>
        <h1 className="mt-2 font-display text-4xl tracking-tight">
          {rank.current.title}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted">{rank.current.copy}</p>
      </header>

      <section className="rounded-xl border border-border bg-surface p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Crest clubId={clubId} size={52} />
            <div>
              <label className="text-xs text-muted" htmlFor="fan-name">
                How the stand knows you
              </label>
              <input
                id="fan-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-48 rounded-md border border-border bg-raised px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs tracking-wide text-muted uppercase">Pulse points</p>
            <p className="font-display text-3xl tabular-nums">{points}</p>
          </div>
        </div>
        <div className="mt-6">
          <div className="mb-2 flex justify-between text-xs text-muted">
            <span>{rank.current.title}</span>
            <span>{rank.next ? rank.next.title : "Top of the stand"}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-raised">
            <div
              className="h-full bg-accent transition-[width] duration-500"
              style={{ width: `${Math.round(rank.progress * 100)}%` }}
            />
          </div>
        </div>
      </section>

      <section>
        <SectionLabel>How standing is earned</SectionLabel>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Not bought. Not gambled. You show up, you call the night, you stay between
          matchdays. That is the only way the terrace promotes you.
        </p>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {RANKS.map((r) => (
            <li
              key={r.title}
              className={cn(
                "rounded-lg border p-4",
                r.title === rank.current.title
                  ? "border-fg bg-surface"
                  : "border-border bg-surface/60",
              )}
            >
              <p className="font-display text-lg">{r.title}</p>
              <p className="text-xs text-muted tabular-nums">{r.min}+ points</p>
              <p className="mt-2 text-sm text-muted">{r.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <SectionLabel>The stand this week</SectionLabel>
        <ul className="mt-3 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
          {board.map((row, i) => (
            <li
              key={row.name + i}
              className={cn(
                "flex items-center gap-3 px-4 py-3",
                row.you && "bg-raised",
              )}
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
              <span className="font-display tabular-nums">{row.points}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
