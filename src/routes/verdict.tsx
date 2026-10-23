import { createFileRoute, Link } from "@tanstack/react-router";
import { MOMENTS, winningOption } from "@/data/pulse-data";
import { usePulse, useRank } from "@/store/pulse-store";
import { useSeason } from "@/lib/use-participation";
import { Button } from "@/components/ui/button";
import { PageHeader, Scoreboard, SectionLabel, Stat } from "@/components/pulse-bits";

export const Route = createFileRoute("/verdict")({ component: Verdict });

function Verdict() {
  const votes = usePulse((s) => s.votes);
  const points = usePulse((s) => s.points);
  const feel = usePulse((s) => s.feel);
  const focusPlayer = usePulse((s) => s.focusPlayer);
  const rank = useRank();
  const season = useSeason();
  const motm = MOMENTS.find((m) => m.id === "motm")!;
  const motmWin = winningOption(motm);

  const calls = MOMENTS.filter((m) => votes[m.id]).length;
  const withStand = MOMENTS.filter((m) => {
    const v = votes[m.id];
    return v && v === winningOption(m).id;
  }).length;

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="After the whistle"
        title="The night, in the book"
        lede="The Official Fan Verdict is not a recap. It is what the stand called, kept."
      />

      <Scoreboard minuteLabel="FT" live={false} homeScore={1} awayScore={1} />

      <section className="overflow-hidden rounded-xl border border-border">
        <img src="/images/terrace.jpg" alt="" className="h-40 w-full object-cover" />
        <div className="bg-surface p-5 sm:p-7">
          <SectionLabel>Official Fan Verdict</SectionLabel>
          <p className="mt-3 max-w-2xl text-lg">
            A draw that felt like a cup tie. The stand named {motmWin.label} as the one who
            ran the night. Mandate from the tunnel still hangs over the right flank.
          </p>
          <p className="mt-3 text-sm text-muted">{motm.narrative[motmWin.id]}</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Stat label="Your calls" value={`${calls}/${MOMENTS.length}`} hint="on the night" />
        <Stat label="With the stand" value={String(withStand)} hint="read the room" />
        <Stat
          label="Season tiles"
          value={season ? season.points.toLocaleString("en-GB") : String(points)}
          hint={season ? "league standing" : "local"}
          tone="accent"
        />
      </section>

      <section className="rounded-xl border border-border bg-surface p-5">
        <SectionLabel>Your match trace</SectionLabel>
        <ul className="mt-4 space-y-3">
          {MOMENTS.map((m) => {
            const v = votes[m.id];
            const opt = m.options.find((o) => o.id === v);
            return (
              <li
                key={m.id}
                className="flex flex-col gap-1 border-b border-border py-3 last:border-0 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div>
                  <p className="font-display text-xs tracking-widest text-muted uppercase">
                    {m.minuteLabel} · {m.heading}
                  </p>
                  <p className="text-sm">{opt ? opt.label : "You let this one go"}</p>
                </div>
                <p className="text-xs text-muted">{opt ? opt.call : "—"}</p>
              </li>
            );
          })}
        </ul>
        {(feel || focusPlayer) && (
          <p className="mt-4 text-sm text-muted">
            You came in {feel ?? "quiet"}, watching {focusPlayer ?? "the whole pitch"}.
            That is now part of how you remember this night.
          </p>
        )}
      </section>

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface p-5">
        <div>
          <SectionLabel>Standing</SectionLabel>
          <p className="mt-1 font-display text-2xl">{rank.current.title}</p>
          <p className="text-sm text-muted">{rank.current.copy}</p>
          {season && (
            <p className="mt-2 text-xs text-muted">
              {season.rank ? (
                <>
                  #{season.rank} of {season.fans.toLocaleString("en-GB")} in the season ·{" "}
                  {season.points.toLocaleString("en-GB")} tiles
                </>
              ) : (
                <>
                  Unranked this season — no scoring calls logged yet.{" "}
                  {season.fans.toLocaleString("en-GB")} fans are on the board.
                </>
              )}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/rank">See your rank</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/season">Between matchdays</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
