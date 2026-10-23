import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { FEED, MOMENTS, winningOption } from "@/data/pulse-data";
import { usePulse, type Flash } from "@/store/pulse-store";
import { useTally } from "@/lib/use-participation";
import { Button } from "@/components/ui/button";
import {
  Heartbeat,
  Meter,
  Scoreboard,
  SectionLabel,
} from "@/components/pulse-bits";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/match")({ component: MatchRoom });

function EventBand() {
  const scriptId = usePulse((s) => s.scriptId);
  const script = usePulse((s) => s.script);
  const [item, setItem] = useState<Flash | null>(null);

  useEffect(() => {
    if (!script.length) {
      setItem(null);
      return;
    }
    let index = 0;
    let timer = 0;
    let alive = true;
    const step = () => {
      if (!alive) return;
      const current = script[index];
      setItem(current ?? null);
      index += 1;
      if (index < script.length) timer = window.setTimeout(step, 1500);
      else timer = window.setTimeout(() => alive && setItem(null), 1500);
    };
    step();
    return () => {
      alive = false;
      window.clearTimeout(timer);
    };
  }, [scriptId, script]);

  if (!item) return null;
  const red = item.kind === "red";
  return (
    <div className="event-card overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex">
        <span
          className={cn(
            "event-mark w-1.5 shrink-0",
            red || item.kind === "goal" ? "bg-accent" : "bg-pitch",
          )}
        />
        <div className="px-4 py-3">
          <p className="font-display text-[11px] tracking-[0.22em] text-muted uppercase">
            {item.kind === "goal" && "The net"}
            {item.kind === "red" && "The card"}
            {item.kind === "roar" && "The stand"}
            {item.kind === "save" && "The gloves"}
          </p>
          <p className="font-display text-2xl tracking-wide">{item.title}</p>
          <p className="text-sm text-muted">{item.line}</p>
        </div>
      </div>
    </div>
  );
}

function MatchRoom() {
  const momentIndex = usePulse((s) => s.momentIndex);
  const votes = usePulse((s) => s.votes);
  const revealed = usePulse((s) => s.revealed);
  const castVote = usePulse((s) => s.castVote);
  const nextMoment = usePulse((s) => s.nextMoment);
  const temperature = usePulse((s) => s.temperature);
  const pressure = usePulse((s) => s.pressure);
  const emotions = usePulse((s) => s.emotions);
  const pushEmotion = usePulse((s) => s.pushEmotion);
  const phase = usePulse((s) => s.phase);
  const scriptId = usePulse((s) => s.scriptId);
  const scoreSide = usePulse((s) => s.scoreSide);

  const moment = MOMENTS[momentIndex];
  const voted = votes[moment.id];
  const showResult = revealed.includes(moment.id);
  const winner = winningOption(moment);
  const tally = useTally(moment.id);
  const shareFor = (optId: string, fallback: number) =>
    tally?.options.find((o) => o.optionId === optId)?.share ?? fallback;
  const live = phase === "live";
  const scores = useMemo(() => {
    if (moment.minute < 12) return { home: 0, away: 0 };
    if (moment.minute < 64) return { home: 1, away: 0 };
    return { home: 1, away: 1 };
  }, [moment.minute]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="space-y-5">
        <Scoreboard
          minuteLabel={moment.minuteLabel}
          live={live}
          homeScore={scores.home}
          awayScore={scores.away}
          hotSide={scoreSide}
          hotKey={scriptId}
        />
        <EventBand />

        <article className="rounded-xl border border-border bg-surface p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <SectionLabel>
              Moment · {moment.minuteLabel}
            </SectionLabel>
            <span className="rounded-full border border-border px-2.5 py-1 text-[11px] tracking-wide text-muted uppercase">
              {moment.heading}
            </span>
          </div>
          <h1 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
            {moment.question}
          </h1>
          <p className="mt-3 max-w-prose text-sm text-muted">{moment.note}</p>

          <div className="mt-6 space-y-2">
            {moment.options.map((opt) => {
              const selected = voted === opt.id;
              const pct = showResult ? shareFor(opt.id, opt.share) : 0;
              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={Boolean(voted)}
                  onClick={() => {
                    castVote(moment.id, opt.id);
                    toast(opt.call);
                  }}
                  className={cn(
                    "w-full overflow-hidden rounded-lg border px-4 py-3 text-left transition-colors duration-150",
                    selected ? "border-fg bg-raised" : "border-border hover:bg-raised/60",
                    voted && !selected && "opacity-70",
                  )}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="flex items-center gap-2 font-medium">
                      {opt.label}
                      {selected && (
                        <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[9px] tracking-[0.14em] text-accent uppercase">
                          Your call
                        </span>
                      )}
                    </span>
                    {showResult && (
                      <span className="font-display text-sm tabular-nums">{pct}%</span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted">{opt.call}</p>
                  {showResult && (
                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-bg">
                      <div
                        className={cn(
                          "h-full rounded-full transition-[width] duration-500",
                          opt.id === winner.id ? "bg-accent" : "bg-faint",
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="mt-6 space-y-3">
              <div className="rounded-lg bg-raised p-4">
                <SectionLabel>Official Heat read</SectionLabel>
                <p className="mt-2 text-sm">{moment.narrative[winner.id]}</p>
                {tally && tally.total > 0 && (
                  <p className="mt-2 text-xs text-muted">
                    {tally.total.toLocaleString("en-GB")} calls from the stand on this
                    moment, live.
                  </p>
                )}
                {voted && voted !== winner.id && (
                  <p className="mt-2 text-xs text-muted">
                    You went your own way. That still counts — the stand is not a chorus of
                    one note.
                  </p>
                )}
              </div>
              <div className="rounded-lg border border-border p-4">
                <SectionLabel>Night Read</SectionLabel>
                <p className="mt-2 font-display text-3xl tabular-nums">
                  {Math.round(temperature * 0.45 + pressure * 0.35 + winner.share * 0.2)}
                </p>
                <p className="mt-2 text-sm text-muted">
                  A league number, not a betting line. Temperature, pressure, and how
                  settled the stand is, in one figure commentators can argue with.
                </p>
              </div>
            </div>
          )}

          {moment.id === "hold-41" && (
            <p className="mt-4 text-xs tracking-wide text-muted uppercase">
              This moment is presented with Solara · the question and the result stay with
              the league
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {momentIndex < MOMENTS.length - 1 ? (
              <Button onClick={nextMoment}>Next moment</Button>
            ) : (
              <Button asChild>
                <Link to="/verdict">Open the verdict</Link>
              </Button>
            )}
            {phase === "whistle" && (
              <Button variant="outline" asChild>
                <Link to="/verdict">After the whistle</Link>
              </Button>
            )}
          </div>
        </article>
      </div>

      <aside className="space-y-4">
        <div className="rounded-xl border border-border bg-surface p-5">
          <SectionLabel>Heartbeat of the stand</SectionLabel>
          <div className="mt-3 text-accent">
            <Heartbeat points={emotions} />
          </div>
          <div className="mt-4 space-y-3">
            <Meter label="Emotional temperature" value={temperature} />
            <Meter label="Pressure" value={pressure} />
          </div>
          <p className="mt-4 text-xs text-muted">How are you right now?</p>
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {[
              { l: "Ice", v: 22 },
              { l: "Set", v: 48 },
              { l: "Up", v: 72 },
              { l: "Roar", v: 92 },
            ].map((e) => (
              <button
                key={e.l}
                type="button"
                onClick={() => pushEmotion(e.v)}
                className="min-h-11 rounded-md border border-border text-xs hover:bg-raised"
              >
                {e.l}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <SectionLabel>From the rows</SectionLabel>
          <ul className="mt-3 space-y-3">
            {FEED.map((f) => (
              <li key={f.name} className="text-sm">
                <p className="text-xs text-muted">{f.name}</p>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
