import type { ReactNode } from "react";
import { CLUBS, FEATURED, type ClubId } from "@/data/pulse-data";
import { Crest } from "@/components/crest";
import { cn } from "@/lib/utils";

export function GravityMark({ value }: { value: number }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-raised px-3 py-1">
      <span className="font-display text-[10px] tracking-[0.18em] text-muted uppercase">
        Gravity
      </span>
      <span className="font-display text-sm tabular-nums">{value}</span>
    </div>
  );
}

export function Scoreboard({
  minuteLabel,
  home = FEATURED.home,
  away = FEATURED.away,
  homeScore = 1,
  awayScore = 1,
  live = true,
  hotSide = null,
  hotKey = 0,
}: {
  minuteLabel: string;
  home?: ClubId;
  away?: ClubId;
  homeScore?: number;
  awayScore?: number;
  live?: boolean;
  hotSide?: "home" | "away" | null;
  hotKey?: number;
}) {
  const h = CLUBS[home];
  const a = CLUBS[away];
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-4 py-2 text-[11px] tracking-[0.16em] text-muted uppercase">
        <span>LALIGA EA SPORTS · {FEATURED.round}</span>
        <span className="flex items-center gap-2 font-display tabular-nums">
          {live && <span className="live-dot size-1.5 rounded-full bg-accent" />}
          {minuteLabel}
        </span>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-5">
        <div className="flex items-center gap-3">
          <Crest clubId={home} size={44} />
          <div>
            <p className="font-display text-lg leading-none tracking-wide">{h.short}</p>
            <p className="mt-1 hidden text-xs text-muted sm:block">{h.name}</p>
          </div>
        </div>
        <p
          key={hotKey}
          className={cn(
            "font-display text-4xl tracking-tight tabular-nums",
            hotSide && "score-hot",
          )}
        >
          {homeScore}
          <span className="mx-1 text-muted">–</span>
          {awayScore}
        </p>
        <div className="flex items-center justify-end gap-3">
          <div className="text-right">
            <p className="font-display text-lg leading-none tracking-wide">{a.short}</p>
            <p className="mt-1 hidden text-xs text-muted sm:block">{a.name}</p>
          </div>
          <Crest clubId={away} size={44} />
        </div>
      </div>
    </div>
  );
}

export function Meter({
  label,
  value,
  tone = "accent",
}: {
  label: string;
  value: number;
  tone?: "accent" | "pitch";
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="tracking-wide text-muted uppercase">{label}</span>
        <span className="font-display tabular-nums">{Math.round(value)}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-raised">
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-500 ease-out",
            tone === "pitch" ? "bg-pitch" : "bg-accent",
          )}
          style={{ width: `${Math.max(4, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}

export function Heartbeat({ points }: { points: Array<{ minute: number; value: number }> }) {
  const max = 100;
  const w = 320;
  const h = 64;
  const step = points.length > 1 ? w / (points.length - 1) : w;
  const d = points
    .map((p, i) => {
      const x = i * step;
      const y = h - (p.value / max) * (h - 8) - 4;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-16 w-full" aria-hidden>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" className="text-accent" />
    </svg>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-display text-[11px] tracking-[0.22em] text-muted uppercase">
      {children}
    </p>
  );
}
