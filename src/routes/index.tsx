import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Radio } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CLUBS,
  FEATURED,
  FIXTURES,
  SEASON_ARC,
  type ClubId,
} from "@/data/pulse-data";
import { ROOM_SIZE } from "@/data/rooms";
import { usePulse, type Feel } from "@/store/pulse-store";
import { useStats } from "@/lib/use-participation";
import { Button } from "@/components/ui/button";
import { Crest } from "@/components/crest";
import {
  GravityMark,
  LivePill,
  Meter,
  PageHeader,
  SectionLabel,
  Stat,
} from "@/components/pulse-bits";
import { toast } from "sonner";

export const Route = createFileRoute("/")({ component: Home });

const FEELS: { id: Feel; label: string; line: string }[] = [
  { id: "hungry", label: "Hungry", line: "We take this." },
  { id: "nervous", label: "Tight", line: "Nights like this bite." },
  { id: "calm", label: "Calm", line: "Trust the work." },
  { id: "loud", label: "Loud", line: "Make them hear us." },
];

const FOCUS = ["Bellingham", "Vinícius", "Mbappé", "Valverde", "Courtois"];

function Home() {
  const ritualDone = usePulse((s) => s.ritualDone);
  const completeRitual = usePulse((s) => s.completeRitual);
  const feel = usePulse((s) => s.feel);
  const focusPlayer = usePulse((s) => s.focusPlayer);
  const clubId = usePulse((s) => s.clubId);
  const setClub = usePulse((s) => s.setClub);
  const temperature = usePulse((s) => s.temperature);
  const pressure = usePulse((s) => s.pressure);
  const phase = usePulse((s) => s.phase);
  const momentIndex = usePulse((s) => s.momentIndex);
  const [pickFeel, setPickFeel] = useState<Feel>("hungry");
  const [pickFocus, setPickFocus] = useState(FOCUS[0]);
  const [statsRefresh, setStatsRefresh] = useState(0);
  const stats = useStats(statsRefresh);

  useEffect(() => {
    const timer = window.setInterval(() => setStatsRefresh((v) => v + 1), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const home = CLUBS[FEATURED.home];
  const away = CLUBS[FEATURED.away];
  const minute = momentIndex * 12;
  const score = minute < 12 ? "0 – 0" : minute < 64 ? "1 – 0" : "1 – 1";
  const phaseLabel =
    phase === "tunnel"
      ? "In the tunnel"
      : phase === "live"
        ? "Live now"
        : phase === "break"
          ? "Half-time"
          : "Full-time";

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-surface">
        <img
          src="/images/stadium-night.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-r from-bg via-bg/90 to-bg/40" />
        <div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <LivePill>{phaseLabel}</LivePill>
              <GravityMark value={FEATURED.gravity} />
              <span className="text-[11px] tracking-[0.16em] text-muted uppercase">
                {FEATURED.venue}
              </span>
            </div>
            <h1 className="mt-4 font-display text-5xl leading-none tracking-tight sm:text-7xl">
              {home.short} <span className="text-faint">v</span> {away.short}
            </h1>
            <p className="mt-4 max-w-lg text-sm text-muted sm:text-base">
              {FEATURED.story}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild size="lg">
                <Link to="/match">
                  Take your tile <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/season">The season arc</Link>
              </Button>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted">
              <span>
                <span className="font-display text-base text-fg tabular-nums">
                  {stats ? stats.fans.toLocaleString("en-GB") : "—"}
                </span>{" "}
                fans in the picture
              </span>
              <span>
                <span className="font-display text-base text-fg tabular-nums">
                  {stats ? stats.votes.toLocaleString("en-GB") : "—"}
                </span>{" "}
                calls made
              </span>
              <span>
                <span className="font-display text-base text-fg tabular-nums">
                  {ROOM_SIZE[clubId].toLocaleString("en-GB")}
                </span>{" "}
                in your room
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-bg/75 p-4 backdrop-blur-md sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] tracking-[0.18em] text-muted uppercase">
              <span>
                <span className="hidden sm:inline">LALIGA EA SPORTS · </span>
                {FEATURED.round}
              </span>
              <span className="flex items-center gap-1.5 whitespace-nowrap font-display tabular-nums">
                {phase === "live" && <span className="live-dot size-1.5 rounded-full bg-accent" />}
                {phase === "tunnel" ? "Kick-off soon" : phaseLabel}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <div className="flex items-center gap-2">
                <Crest clubId={FEATURED.home} size={34} />
                <span className="font-display text-sm tracking-wide">{home.short}</span>
              </div>
              <p className="font-display text-2xl tabular-nums">{score}</p>
              <div className="flex items-center justify-end gap-2">
                <span className="font-display text-sm tracking-wide">{away.short}</span>
                <Crest clubId={FEATURED.away} size={34} />
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <Meter label="Emotional temperature" value={temperature} />
              <Meter label="Pressure" value={pressure} tone="pitch" />
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-3">
              <span className="text-xs text-muted">The stand is one picture.</span>
              <Link
                to="/stand"
                className="inline-flex items-center gap-1 text-xs text-fg hover:text-accent"
              >
                Enter the room <Radio className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-5 sm:p-6 lg:col-span-2">
          <SectionLabel>Before they walk out</SectionLabel>
          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-2xl">The ritual</h2>
            <span className="text-xs text-muted">Two taps. Then you are in.</span>
          </div>
          <p className="mt-2 max-w-prose text-sm text-muted">
            Same as pulling on the shirt. Set the night, name who you are watching, then
            step into the ninety with the stand.
          </p>

          {ritualDone ? (
            <div className="mt-5 flex items-start gap-3 rounded-lg border border-pitch/40 bg-pitch/10 p-4">
              <span className="mt-0.5 flex size-8 items-center justify-center rounded-full bg-pitch/20 text-pitch">
                <Check className="size-4" />
              </span>
              <div className="flex-1">
                <p className="font-medium">You are in the tunnel.</p>
                <p className="mt-1 text-sm text-muted">
                  Feeling {feel}. Eyes on {focusPlayer}. The night is on.
                </p>
              </div>
              <Button size="sm" variant="outline" asChild>
                <Link to="/match">Go to the match</Link>
              </Button>
            </div>
          ) : (
            <div className="mt-5 space-y-5">
              <div>
                <p className="mb-2 text-xs tracking-wide text-muted uppercase">
                  How do you come into this
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {FEELS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setPickFeel(f.id)}
                      className={`min-h-11 rounded-md border px-3 py-2 text-left text-sm transition-colors duration-150 ${
                        pickFeel === f.id
                          ? "border-fg bg-raised"
                          : "border-border hover:border-faint"
                      }`}
                    >
                      <span className="block font-medium">{f.label}</span>
                      <span className="text-xs text-muted">{f.line}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs tracking-wide text-muted uppercase">
                  Who are you watching
                </p>
                <div className="flex flex-wrap gap-2">
                  {FOCUS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPickFocus(p)}
                      className={`min-h-11 rounded-full border px-4 text-sm ${
                        pickFocus === p
                          ? "border-fg bg-raised"
                          : "border-border hover:border-faint"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <Button
                onClick={() => {
                  completeRitual(pickFeel, pickFocus);
                  toast("You are in the tunnel. See you at kick-off.");
                }}
              >
                I am here for the ninety <ArrowRight className="size-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-surface p-5">
            <SectionLabel>Your shirt</SectionLabel>
            <p className="mt-2 text-sm text-muted">
              Mosaico follows the club you walk with. This is identity, not a bet.
            </p>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {(Object.keys(CLUBS) as ClubId[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setClub(id)}
                  className={`flex flex-col items-center gap-1 rounded-md border p-2 transition-colors ${
                    clubId === id
                      ? "border-fg bg-raised"
                      : "border-border hover:border-faint"
                  }`}
                >
                  <Crest clubId={id} size={28} />
                  <span className="text-[10px] text-muted">{CLUBS[id].short}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between">
              <SectionLabel>Live from the picture</SectionLabel>
              <span className="live-dot size-1.5 rounded-full bg-accent" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Stat
                label="Fans"
                value={stats ? stats.fans.toLocaleString("en-GB") : "—"}
                hint="in the season"
              />
              <Stat
                label="Calls today"
                value={stats ? stats.votesToday.toLocaleString("en-GB") : "—"}
                hint="from the stand"
                tone="accent"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <SectionLabel>Rest of the round</SectionLabel>
            <h2 className="mt-2 font-display text-2xl">Around the league</h2>
          </div>
          <Link
            to="/stand"
            className="text-xs text-muted transition-colors hover:text-fg"
          >
            Every ground →
          </Link>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {FIXTURES.map((fx) => (
            <div
              key={fx.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3"
            >
              <div className="flex items-center gap-2.5">
                <Crest clubId={fx.home} size={28} />
                <span className="font-display text-sm">{CLUBS[fx.home].short}</span>
                <span className="text-xs text-faint">v</span>
                <span className="font-display text-sm">{CLUBS[fx.away].short}</span>
                <Crest clubId={fx.away} size={28} />
              </div>
              <div className="text-right text-[11px] text-muted tabular-nums">
                <p>{fx.kickoff}</p>
                <p className="text-faint">Gravity {fx.gravity}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <PageHeader
          kicker="This season’s thread"
          title="The table does not sleep"
          lede="Mosaico keeps the stand together between matchdays: the arc, the echoes, and the work that carries your name forward."
        >
          <Button variant="outline" asChild>
            <Link to="/season">Open the season</Link>
          </Button>
        </PageHeader>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {SEASON_ARC.slice(0, 2).map((s) => (
            <article key={s.week} className="rounded-xl border border-border bg-surface p-5">
              <p className="font-display text-xs tracking-widest text-accent uppercase">
                {s.week}
              </p>
              <h3 className="mt-1 font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-accent/30 bg-surface p-6 sm:p-9">
        <div className="absolute inset-0 bg-linear-to-r from-accent/15 via-transparent to-transparent" />
        <div className="relative flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-xl">
            <SectionLabel>Your tile is missing</SectionLabel>
            <h2 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">
              The picture is not finished without you.
            </h2>
            <p className="mt-2 text-sm text-muted">
              One call at a time, the stand becomes a mosaic. Take a tile tonight and
              carry it into the season.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="lg" asChild>
              <Link to="/match">
                Take your tile <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/rank">See your rank</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
