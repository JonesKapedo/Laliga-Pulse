import { createFileRoute, Link } from "@tanstack/react-router";
import { ECHOES, MISSIONS, SEASON_ARC } from "@/data/pulse-data";
import { usePulse } from "@/store/pulse-store";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/pulse-bits";
import { toast } from "sonner";

export const Route = createFileRoute("/season")({ component: SeasonPage });

function SeasonPage() {
  const ritualDone = usePulse((s) => s.ritualDone);
  const votes = usePulse((s) => s.votes);
  const voteCount = Object.keys(votes).length;

  const done: Record<string, boolean> = {
    m1: ritualDone,
    m2: voteCount >= 4,
    m3: Boolean(votes.motm),
    m4: true,
  };

  return (
    <div className="space-y-8">
      <header className="overflow-hidden rounded-xl border border-border">
        <img src="/images/pitch.jpg" alt="" className="h-44 w-full object-cover" />
        <div className="-mt-16 relative bg-linear-to-t from-bg via-bg/90 to-transparent px-5 pt-16 pb-6">
          <SectionLabel>Between matchdays</SectionLabel>
          <h1 className="mt-2 font-display text-4xl tracking-tight">The week still asks for you</h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Pulse is not a match-only switch. The table moves, old nights echo, and the
            stand has work before the next tunnel.
          </p>
        </div>
      </header>

      <section>
        <SectionLabel>The week’s work</SectionLabel>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {MISSIONS.map((m) => (
            <li key={m.id} className="rounded-xl border border-border bg-surface p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg">{m.title}</h3>
                <span className="text-xs text-muted tabular-nums">+{m.points}</span>
              </div>
              <p className="mt-2 text-sm text-muted">{m.detail}</p>
              <p className="mt-3 text-xs tracking-wide uppercase text-muted">
                {done[m.id] ? "Done" : "Open"}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionLabel>Season arc</SectionLabel>
        <ol className="mt-4 space-y-0">
          {SEASON_ARC.map((s, i) => (
            <li key={s.week} className="grid grid-cols-[24px_1fr] gap-4">
              <div className="flex flex-col items-center">
                <span className="size-2.5 rounded-full bg-accent" />
                {i < SEASON_ARC.length - 1 && (
                  <span className="w-px flex-1 bg-border" />
                )}
              </div>
              <div className="pb-8">
                <p className="font-display text-xs tracking-widest text-muted uppercase">
                  {s.week}
                </p>
                <h3 className="font-display text-xl">{s.title}</h3>
                <p className="mt-1 text-sm text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <SectionLabel>Echoes</SectionLabel>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Old Pulse nights do not disappear. They wait for a quiet Tuesday.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {ECHOES.map((e) => (
            <article key={e.id} className="rounded-xl border border-border bg-surface p-5">
              <p className="text-xs tracking-wide text-muted uppercase">{e.when}</p>
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
          <Link to="/board">The book — metrics and how it fits</Link>
        </Button>
      </div>
    </div>
  );
}
