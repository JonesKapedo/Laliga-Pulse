import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send } from "lucide-react";
import { CLUBS, MOMENTS, type ClubId } from "@/data/pulse-data";
import { FANBASE, ROOM_SIZE, roomFeed } from "@/data/rooms";
import { WIRE } from "@/data/players";
import { usePulse } from "@/store/pulse-store";
import { Crest } from "@/components/crest";
import { ForecastCard } from "@/components/forecast-card";
import { PodPanel } from "@/components/pod-panel";
import { LivePill, PageHeader, SectionLabel, Stat } from "@/components/pulse-bits";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/stand")({ component: StandPage });

function StandPage() {
  const clubId = usePulse((s) => s.clubId);
  const setClub = usePulse((s) => s.setClub);
  const phase = usePulse((s) => s.phase);
  const lines = usePulse((s) => s.lines);
  const say = usePulse((s) => s.say);
  const momentIndex = usePulse((s) => s.momentIndex);
  const [text, setText] = useState("");
  const club = CLUBS[clubId];
  const minute = MOMENTS[momentIndex]?.minute ?? 0;
  const wire = WIRE.filter((w) => w.minute <= minute);
  const feed = [
    ...wire.map((w) => ({
      id: `wire-${w.minute}`,
      author: "Mosaico wire",
      text: w.text,
      wire: true,
    })),
    ...roomFeed(clubId, phase).map((line) => ({ ...line, wire: false })),
    ...lines.map((line) => ({ ...line, wire: false })),
  ];
  const size = ROOM_SIZE[clubId] + (phase === "live" ? 240 : phase === "whistle" ? 80 : 0);

  const phaseLabel =
    phase === "tunnel"
      ? "Before kick-off"
      : phase === "live"
        ? "During the ninety"
        : phase === "break"
          ? "Half-time"
          : "After the whistle";

  return (
    <div className="space-y-5">
      <PageHeader
        kicker={club.ground}
        title="The stand"
        lede="One room per club. The wire follows the minute, the rows talk, and your block sits inside it."
      >
        <Stat
          label="In the room"
          value={size.toLocaleString("en-GB")}
          hint={phase === "live" ? "and rising" : "matchday"}
        />
        <Stat label="Your club" value={club.short} hint={club.city} />
      </PageHeader>

      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(CLUBS) as ClubId[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setClub(id)}
            className={cn(
              "flex items-center gap-2 rounded-full border px-2.5 py-1.5 transition-colors",
              id === clubId
                ? "border-fg bg-raised"
                : "border-border hover:border-faint",
            )}
          >
            <Crest clubId={id} size={20} />
            <span className="text-xs">{CLUBS[id].short}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="flex min-h-[30rem] flex-col overflow-hidden rounded-xl border border-border bg-surface">
          <header className="border-b border-border p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Crest clubId={clubId} size={40} />
                <div>
                  <p className="font-display text-xl leading-none tracking-tight">
                    {club.name}
                  </p>
                  <p className="mt-1 text-xs text-muted">{FANBASE[clubId].split}</p>
                </div>
              </div>
              <LivePill>{phaseLabel}</LivePill>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-muted">
              <span>{club.nickname}</span>
              <span className="tabular-nums">
                {size.toLocaleString("en-GB")} in · {minute > 0 ? `${minute}’` : "Pre-match"}
              </span>
            </div>
          </header>

          <ul className="flex-1 space-y-4 overflow-y-auto p-4">
            {feed.map((line) => (
              <li key={line.id} className="event-card">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-display",
                      line.wire
                        ? "bg-accent/15 text-accent"
                        : "bg-raised text-muted",
                    )}
                  >
                    {line.wire ? "W" : line.author.slice(0, 1).toUpperCase()}
                  </span>
                  <p
                    className={cn(
                      "text-xs",
                      line.wire ? "text-accent" : "text-muted",
                    )}
                  >
                    {line.author}
                  </p>
                </div>
                <p className="mt-1 pl-8 text-sm">{line.text}</p>
              </li>
            ))}
          </ul>

          <form
            className="flex gap-2 border-t border-border p-3"
            onSubmit={(e) => {
              e.preventDefault();
              say(text);
              setText("");
            }}
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Say it to your room"
              className="h-11 min-w-0 flex-1 rounded-md border border-border bg-raised px-3 text-sm outline-none placeholder:text-faint focus:border-faint"
            />
            <button
              type="submit"
              className="flex h-11 items-center gap-2 rounded-md bg-accent px-4 text-sm text-accent-fg transition-opacity hover:opacity-90"
            >
              <Send className="size-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </section>

        <div className="space-y-4">
          <ForecastCard />
          <PodPanel />
        </div>
      </div>

      <div className="flex flex-wrap items-baseline gap-2 text-xs text-muted">
        <SectionLabel>Every ground</SectionLabel>
        <span>
          Switch rooms with the club chips above — your tile travels with you.
        </span>
      </div>
    </div>
  );
}
