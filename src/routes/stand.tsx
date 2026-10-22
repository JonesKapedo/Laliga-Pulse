import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CLUBS, MOMENTS, type ClubId } from "@/data/pulse-data";
import { FANBASE, ROOM_SIZE, roomFeed } from "@/data/rooms";
import { GROUNDS, WIRE } from "@/data/players";
import { usePulse } from "@/store/pulse-store";
import { Crest } from "@/components/crest";
import { ForecastCard } from "@/components/forecast-card";
import { SectionLabel } from "@/components/pulse-bits";
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
    ...wire.map((w) => ({ id: `wire-${w.minute}`, author: "Pulse wire", text: w.text })),
    ...roomFeed(clubId, phase),
    ...lines,
  ];
  const size = ROOM_SIZE[clubId] + (phase === "live" ? 240 : phase === "whistle" ? 80 : 0);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-border">
        <img src="/images/stadium-night.jpg" alt="" className="h-28 w-full object-cover" />
        <div className="bg-surface px-4 py-3">
          <SectionLabel>{club.ground}</SectionLabel>
          <p className="text-sm text-muted">
            Live wire in the room follows the minute. Score, cards, and the next chance
            land here as they happen.
          </p>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {GROUNDS.map(([name, ground, city]) => (
          <article
            key={ground}
            className="w-36 shrink-0 overflow-hidden rounded-lg border border-border bg-surface"
          >
            <img src="/images/stadium-night.jpg" alt="" className="h-16 w-full object-cover" />
            <div className="p-2">
              <p className="truncate font-display text-sm">{name}</p>
              <p className="truncate text-[10px] text-muted">{ground}</p>
              <p className="text-[10px] text-muted">{city}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section className="flex min-h-[28rem] flex-col rounded-xl border border-border bg-surface">
        <header className="border-b border-border p-4">
          <SectionLabel>
            {phase === "tunnel" && "Before kick-off"}
            {phase === "live" && "During the ninety"}
            {phase === "break" && "Half-time"}
            {phase === "whistle" && "After the whistle"}
          </SectionLabel>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
            <h1 className="font-display text-3xl tracking-tight">{club.name}</h1>
            <p className="font-display text-sm tabular-nums text-muted">
              {size.toLocaleString("en-GB")} in the room
            </p>
          </div>
          <p className="mt-1 text-sm text-muted">{FANBASE[clubId].split}</p>
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {(Object.keys(CLUBS) as ClubId[]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setClub(id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border px-2 py-1",
                  id === clubId ? "border-fg" : "border-border",
                )}
              >
                <Crest clubId={id} size={22} />
                <span className="text-xs">{CLUBS[id].short}</span>
              </button>
            ))}
          </div>
        </header>
        <ul className="flex-1 space-y-3 overflow-y-auto p-4">
          {feed.map((line) => (
            <li key={line.id} className="event-card">
              <p className="text-xs text-muted">{line.author}</p>
              <p className="text-sm">{line.text}</p>
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
            className="h-11 min-w-0 flex-1 rounded-md border border-border bg-raised px-3 text-sm"
          />
          <button
            type="submit"
            className="h-11 rounded-md bg-accent px-4 text-sm text-accent-fg"
          >
            Send
          </button>
        </form>
      </section>
      <ForecastCard />
      </div>
    </div>
  );
}
