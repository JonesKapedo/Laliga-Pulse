import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Circle } from "lucide-react";
import { ECHOES, MISSIONS, SEASON_ARC } from "@/data/pulse-data";
import { usePulse } from "@/store/pulse-store";
import { useSeason } from "@/lib/use-participation";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionLabel, Stat } from "@/components/pulse-bits";
import { toast } from "sonner";

export const Route = createFileRoute("/season")({ component: SeasonPage });

function SeasonPage() {
  const ritualDone = usePulse((s) => s.ritualDone);
  const votes = usePulse((s) => s.votes);
  const voteCount = Object.keys(votes).length;
  const season = useSeason();

  const done: Record<string, boolean> = {
    m1: ritualDone,
    m2: voteCount >= 4,
    m3: Boolean(votes.motm),
    m4: true,
  };
  const doneCount = MISSIONS.filter((m) => done[m.id]).length;
  const standing = season ? (season.rank ? `#${season.rank}` : "Unranked") : "—";

  return (
    <div className="space-y-9">
      <PageHeader
        kicker="Between matchdays"
        title="The week still asks for you"
        lede="Mosaico is not a match-only switch. The table moves, old nights echo, and the stand has work before the next tunnel."
      />

      <section className="grid gap-2 sm:grid-cols-3">
        <Stat
          label="Season points"
          value={season ? season.points.toLocaleString("en-GB") : "—"}
          hint={season ? "tiles earned" : "loading"}
        />
        <Stat
          label="Standing"
          value={standing}
          hint={
            season
              ? season.rank
                ? `of ${season.fans.toLocaleString("en-GB")} scoring fans`
                : "call a moment to enter"
              : undefined
          }
        />
        <Stat
          label="This week"
          value={`${doneCount}/${MISSIONS.length}`}
          hint="work complete"
          tone="accent"
        />
      </section>

      <section>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <SectionLabel>The week’s work</SectionLabel>
          <span className="text-xs text-muted">
            Every task pays into the same season.
          </span>
        </div>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {MISSIONS.map((m) => {
            const complete = done[m.id];
            return (
              <li
                key={m.id}
                className={
                  complete
                    ? "rounded-xl border border-pitch/40 bg-pitch/5 p-5"
                    : "rounded-xl border border-border bg-surface p-5"
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span
                      className={
                        complete
                          ? "mt-0.5 flex size-6 items-center justify-center rounded-full bg-pitch/20 text-pitch"
                          : "mt-0.5 text-faint"
                      }
                    >
                      {complete ? <Check className="size-4" /> : <Circle className="size-4" />}
                    </span>
                    <div>
                      <h3 className="font-display text-lg">{m.title}</h3>
                      <p className="mt-1 text-sm text-muted">{m.detail}</p>
                    </div>
                  </div>
                  <span className="shrink-0 font-display text-sm text-muted tabular-nums">
                    +{m.points}
                  </span>
                </div>
                <p className="mt-3 pl-9 text-[10px] tracking-[0.16em] text-muted uppercase">
                  {complete ? "Done" : "Open"}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <SectionLabel>Season arc</SectionLabel>
        <ol className="mt-4">
          {SEASON_ARC.map((s, i) => (
            <li key={s.week} className="grid grid-cols-[20px_1fr] gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={
                    i === 0
                      ? "mt-1 size-2.5 rounded-full bg-accent"
                      : "mt-1 size-2.5 rounded-full border border-border bg-surface"
                  }
                />
                {i < SEASON_ARC.length - 1 && <span className="w-px flex-1 bg-border" />}
              </div>
              <div className="pb-7">
                <div className="flex flex-wrap items-baseline gap-2">
                  <p className="font-display text-[11px] tracking-[0.18em] text-muted uppercase">
                    {s.week}
                  </p>
                  {i === 0 && (
                    <span className="rounded-full border border-accent/40 px-2 py-0.5 text-[10px] tracking-wide text-accent uppercase">
                      Now
                    </span>
                  )}
                </div>
                <h3 className="mt-1 font-display text-xl">{s.title}</h3>
                <p className="mt-1 text-sm text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <SectionLabel>Echoes</SectionLabel>
          <span className="text-xs text-muted">Old nights wait for a quiet Tuesday.</span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {ECHOES.map((e) => (
            <article key={e.id} className="rounded-xl border border-border bg-surface p-5">
              <p className="text-[10px] tracking-[0.16em] text-muted uppercase">{e.when}</p>
              <h3 className="mt-2 font-display text-lg">{e.match}</h3>
              <p className="mt-2 text-sm text-muted">{e.verdict}</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-4"
                onClick={() => toast("Marked. This echo sits in your trace.")}
              >
                Leave a mark
              </Button>
            </article>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        <Button asChild>
          <Link to="/match">Back into tonight</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/board">The case — how it fits</Link>
        </Button>
      </div>
    </div>
  );
}
