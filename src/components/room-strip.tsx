import { Link } from "@tanstack/react-router";
import { CLUBS } from "@/data/pulse-data";
import { FANBASE, ROOM_SIZE, roomFeed } from "@/data/rooms";
import { usePulse } from "@/store/pulse-store";

export function RoomStrip() {
  const clubId = usePulse((s) => s.clubId);
  const phase = usePulse((s) => s.phase);
  const lines = usePulse((s) => s.lines);
  const feed = roomFeed(clubId, phase);
  const latest = lines[lines.length - 1] ?? feed[feed.length - 1];
  const size = ROOM_SIZE[clubId] + (phase === "live" ? 240 : 0);
  const mood = FANBASE[clubId];

  return (
    <Link
      to="/stand"
      className="flex h-8 items-center gap-3 overflow-hidden border-t border-border bg-bg px-4 text-xs"
    >
      <span className="shrink-0 font-display tracking-wider text-muted uppercase">
        {CLUBS[clubId].short} · {size.toLocaleString("en-GB")} in
      </span>
      <span className="hidden shrink-0 text-muted sm:inline">{mood.calling}</span>
      <span className="truncate text-fg">
        <span className="text-muted">{latest.author} · </span>
        {latest.text}
      </span>
    </Link>
  );
}
