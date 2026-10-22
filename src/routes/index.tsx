import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import {
  CLUBS,
  FEATURED,
  FIXTURES,
  SEASON_ARC,
  type ClubId,
} from "@/data/pulse-data";
import { usePulse, type Feel } from "@/store/pulse-store";
import { Button } from "@/components/ui/button";
import { Crest } from "@/components/crest";
import { GravityMark, Meter, SectionLabel } from "@/components/pulse-bits";
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
  const [pickFeel, setPickFeel] = useState<Feel>("hungry");
  const [pickFocus, setPickFocus] = useState(FOCUS[0]);

  const home = CLUBS[FEATURED.home];
  const away = CLUBS[FEATURED.away];

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-xl border border-border bg-surface">
        <div className="relative">
          <img
            src="/images/stadium-night.jpg"
            alt=""
            className="h-52 w-full object-cover sm:h-72"
          />
          <div className="absolute inset-0 bg-linear-to-t from-surface via-bg/20 to-transparent" />
        </div>
        <div className="p-5 sm:p-8">
          <SectionLabel>Tonight · {FEATURED.venue}</SectionLabel>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl tracking-tight sm:text-6xl">
                {home.short} <span className="text-muted">v</span> {away.short}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">
                {FEATURED.story}
              </p>
            </div>
            <GravityMark value={FEATURED.gravity} />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild>
              <Link to="/match">
                Take your tile <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/season">The season arc</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-5 lg:col-span-2">
          <SectionLabel>Before they walk out</SectionLabel>
          <h2 className="mt-2 font-display text-2xl">The ritual</h2>
          <p className="mt-2 max-w-prose text-sm text-muted">
            Same as pulling on the shirt. Set the night, name who you are watching, then
            step into the ninety with the stand.
          </p>

          {ritualDone ? (
            <div className="mt-5 flex items-start gap-3 rounded-lg bg-raised p-4">
              <span className="mt-0.5 flex size-8 items-center justify-center rounded-full bg-pitch/20 text-pitch">
                <Check className="size-4" />
              </span>
              <div>
                <p className="font-medium">You are in the tunnel.</p>
                <p className="mt-1 text-sm text-muted">
                  Feeling {feel}. Eyes on {focusPlayer}. The night is on.
                </p>
              </div>
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
                I am here for the ninety
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-surface p-5">
            <SectionLabel>The two stands</SectionLabel>
            <div className="mt-4 space-y-4">
              <Meter label={`${home.short} energy`} value={72 + (ritualDone ? 8 : 0)} />
              <Meter label={`${away.short} energy`} value={68} tone="pitch" />
              <Meter label="Match temperature" value={temperature} />
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <SectionLabel>Your shirt</SectionLabel>
            <p className="mt-2 text-sm text-muted">
              Mosaico follows the club you walk with. This is identity, not a bet.
            </p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {(Object.keys(CLUBS) as ClubId[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setClub(id)}
                  className={`flex flex-col items-center gap-1 rounded-md border p-2 ${
                    clubId === id ? "border-fg" : "border-border"
                  }`}
                >
                  <Crest clubId={id} size={28} />
                  <span className="text-[10px] text-muted">{CLUBS[id].short}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionLabel>Rest of the round</SectionLabel>
        <div className="mt-3 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
          {FIXTURES.map((fx) => (
            <div key={fx.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="flex items-center gap-3">
                <Crest clubId={fx.home} size={32} />
                <span className="font-display text-sm">{CLUBS[fx.home].short}</span>
                <span className="text-muted">v</span>
                <span className="font-display text-sm">{CLUBS[fx.away].short}</span>
                <Crest clubId={fx.away} size={32} />
              </div>
              <div className="text-right text-xs text-muted">
                <p className="tabular-nums">{fx.kickoff}</p>
                <p>Gravity {fx.gravity}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-surface p-5 sm:p-7">
        <SectionLabel>This season’s thread</SectionLabel>
        <h2 className="mt-2 font-display text-2xl">The table does not sleep</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {SEASON_ARC.map((s) => (
            <article key={s.week} className="rounded-lg bg-raised p-4">
              <p className="font-display text-xs tracking-widest text-muted uppercase">
                {s.week}
              </p>
              <h3 className="mt-1 font-display text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </article>
          ))}
        </div>
        <Button variant="outline" className="mt-5" asChild>
          <Link to="/season">Open the season</Link>
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            t: "Call the night",
            d: "Timed moments through the ninety. One stand, one picture.",
          },
          {
            t: "Belong to the stand",
            d: "Rank, circles, and a name in this league that lasts past full-time.",
          },
          {
            t: "Still here on Tuesday",
            d: "Arcs, echoes, and the week’s work — so the product lives between matchdays.",
          },
        ].map((b) => (
          <article key={b.t} className="rounded-xl border border-border bg-surface p-5">
            <h3 className="font-display text-xl">{b.t}</h3>
            <p className="mt-2 text-sm text-muted">{b.d}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
