import { createFileRoute, Link } from "@tanstack/react-router";
import { MOMENTS } from "@/data/pulse-data";
import { usePulse } from "@/store/pulse-store";
import { useStats } from "@/lib/use-participation";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionLabel, Stat } from "@/components/pulse-bits";

export const Route = createFileRoute("/board")({ component: Board });

const KPIS = [
  {
    label: "Fans who call at least once",
    model: "38%",
    now: "This night",
    note: "Share of active LALIGA app users who lock a Moment.",
  },
  {
    label: "Calls per fan in the ninety",
    model: "4.6",
    now: "Live",
    note: "Not a single poll. Recurring calls from tunnel to whistle.",
  },
  {
    label: "Back next matchday",
    model: "71%",
    now: "Ritual cohort",
    note: "Week-on-week return among fans who finished the ritual.",
  },
  {
    label: "Verdict cards shared",
    model: "18%",
    now: "After the whistle",
    note: "The Heat leaving the app and starting a row.",
  },
  {
    label: "Opens with no match on",
    model: "22%",
    now: "Tuesday",
    note: "Season arc, echoes, and the week's work. The product survives the hype.",
  },
];

function Board() {
  const votes = usePulse((s) => s.votes);
  const ritualDone = usePulse((s) => s.ritualDone);
  const calls = Object.keys(votes).length;
  const lang = usePulse((s) => s.lang);
  const stats = useStats();

  return (
    <div className="space-y-8">
      <PageHeader
        kicker={lang === "es" ? "El libro" : "The case"}
        title={
          lang === "es" ? "Cómo vive esto en LALIGA" : "How this lives inside LALIGA"
        }
        lede={
          lang === "es"
            ? "No es una activación de un partido. Es una capa oficial: la app, la retransmisión, el estadio, y una noche que sigue el martes."
            : "Not a one-match activation. An official layer across the app, the broadcast, the ground, and the Tuesday after."
        }
      />

      {stats && (
        <section className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat
            label="Fans"
            value={stats.fans.toLocaleString("en-GB")}
            hint="in the season"
          />
          <Stat
            label="Calls"
            value={stats.votes.toLocaleString("en-GB")}
            hint={`${stats.votesToday.toLocaleString("en-GB")} today`}
            tone="accent"
          />
          <Stat
            label="Moments"
            value={stats.moments.toLocaleString("en-GB")}
            hint="called live"
          />
          <Stat
            label="Events"
            value={stats.events.toLocaleString("en-GB")}
            hint="server-verified"
          />
        </section>
      )}

      <section className="grid gap-3 sm:grid-cols-3">
        <article className="rounded-xl border border-border bg-surface p-5">
          <SectionLabel>App</SectionLabel>
          <h2 className="mt-2 font-display text-xl">A tab, not a side app</h2>
          <p className="mt-2 text-sm text-muted">
            Mosaico sits inside the official LALIGA app. Same login the league already has.
            Your rank travels with you.
          </p>
        </article>
        <article className="rounded-xl border border-border bg-surface p-5">
          <SectionLabel>Broadcast</SectionLabel>
          <h2 className="mt-2 font-display text-xl">The lower third</h2>
          <p className="mt-2 text-sm text-muted">
            The Heat is a clean graphic partners can take. One line. The
            stand’s call. No clutter on the picture.
          </p>
        </article>
        <article className="rounded-xl border border-border bg-surface p-5">
          <SectionLabel>Stadium</SectionLabel>
          <h2 className="mt-2 font-display text-xl">The ribbon</h2>
          <p className="mt-2 text-sm text-muted">
            The same call can run on the stadium ribbon at half-time. People in the ground
            and people at home are one stand.
          </p>
        </article>
      </section>

      <section>
        <SectionLabel>What this prototype is already moving</SectionLabel>
        <p className="mt-2 text-sm text-muted">
          You have called {calls} of {MOMENTS.length} moments
          {ritualDone ? ", and you walked through the tunnel." : "."} The figures below are
          the season model those actions are built to move.
        </p>
        {stats && (
          <div className="mt-4 rounded-lg border border-border bg-raised p-4 text-sm">
            <span className="font-display">{stats.votes.toLocaleString("en-GB")}</span> calls
            from <span className="font-display">{stats.fans.toLocaleString("en-GB")}</span>{" "}
            fans across <span className="font-display">{stats.moments}</span> moments — live
            from the events table, not a mock.
          </div>
        )}
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {KPIS.map((k) => (
            <li key={k.label} className="rounded-xl border border-border bg-surface p-5">
              <p className="text-xs tracking-wide text-muted uppercase">{k.now}</p>
              <p className="mt-2 font-display text-3xl tabular-nums">{k.model}</p>
              <p className="mt-1 font-medium">{k.label}</p>
              <p className="mt-2 text-sm text-muted">{k.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-border bg-surface p-5 sm:p-7">
        <SectionLabel>How it pays for itself</SectionLabel>
        <h2 className="mt-2 font-display text-2xl">A partner on the moment, not a book</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          One curated Moment a match can carry a named partner. They do not set the
          question, they do not touch the result, and there is no cash-out, no odds, no
          stake. The league keeps the voice. The partner keeps the association with a night
          people actually felt.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-raised p-4">
            <p className="font-display text-lg">Presented with</p>
            <p className="mt-1 text-sm text-muted">
              A single line under the question. Example in the ninety: Solara, on “Hold the
              line”.
            </p>
          </div>
          <div className="rounded-lg bg-raised p-4">
            <p className="font-display text-lg">Rank stays clean</p>
            <p className="mt-1 text-sm text-muted">
              Standing is earned by showing up. It is not sold, and it is not a prize draw.
            </p>
          </div>
          <div className="rounded-lg bg-raised p-4">
            <p className="font-display text-lg">Clubs can host a circle</p>
            <p className="mt-1 text-sm text-muted">
              A watch circle can be a club, a bar, a city. That is a second, local line of
              partnership.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-surface p-5 sm:p-7">
        <SectionLabel>What we will not break</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm text-muted">
          <li>
            Calls are aggregate. A broadcast graphic never names a person. Personal traces
            stay on the fan’s own screen.
          </li>
          <li>
            Questions are written by the league desk, not by a sponsor and not by an open
            chat. That is how you keep rights, tone, and the regulator comfortable.
          </li>
          <li>
            Languages follow the league: Spanish first, then the markets LALIGA already
            serves. The toggle in the header is the start of that, not a translation of
            every line yet.
          </li>
        </ul>
      </section>

      <div className="flex flex-wrap gap-2">
        <Button asChild>
          <Link to="/match">Back to the ninety</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/season">Between matchdays</Link>
        </Button>
      </div>
    </div>
  );
}
