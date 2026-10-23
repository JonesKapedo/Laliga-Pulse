import { useId, type ReactNode } from "react";
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
      <div className="flex flex-wrap items-center justify-between gap-1 border-b border-border px-4 py-2 text-[11px] tracking-[0.16em] text-muted uppercase">
        <span>
          <span className="hidden sm:inline">LALIGA EA SPORTS · </span>
          {FEATURED.round}
        </span>
        <span className="flex items-center gap-2 whitespace-nowrap font-display tabular-nums">
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

/**
 * The stand's pulse through the ninety. Points are plotted by match minute so
 * the line reads like a timeline rather than a list of taps.
 */
export function Heartbeat({
  points,
}: {
  points: Array<{ minute: number; value: number }>;
}) {
  const id = useId().replace(/:/g, "");
  const w = 320;
  const h = 72;
  const padY = 8;
  const plot = (minute: number) => Math.max(0, Math.min(90, minute));
  const ordered = [...points].sort((a, b) => a.minute - b.minute);
  const lastMinute = ordered.length ? plot(ordered[ordered.length - 1].minute) : 0;
  // Open on a short window so an early tap still reads as a pulse, then grow to
  // the full ninety as the night moves on.
  const domain = Math.min(90, Math.max(15, lastMinute + 5));
  const x = (minute: number) => (plot(minute) / domain) * w;
  const y = (value: number) =>
    h - padY - (Math.max(0, Math.min(100, value)) / 100) * (h - padY * 2);

  const hasLine = ordered.length > 1;
  const line = ordered
    .map((p, i) => `${i === 0 ? "M" : "L"} ${x(p.minute).toFixed(1)} ${y(p.value).toFixed(1)}`)
    .join(" ");
  const area = hasLine
    ? `${line} L ${x(ordered[ordered.length - 1].minute).toFixed(1)} ${h - padY} L ${x(
        ordered[0].minute,
      ).toFixed(1)} ${h - padY} Z`
    : "";

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-20 w-full" aria-hidden>
        <defs>
          <linearGradient id={`hb-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.34" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.28, 0.55, 0.82].map((t) => (
          <line
            key={t}
            x1="0"
            x2={w}
            y1={h * t}
            y2={h * t}
            stroke="var(--color-border)"
            strokeDasharray="2 4"
            strokeWidth="1"
          />
        ))}
        <line
          x1="0"
          x2={w}
          y1={h - padY}
          y2={h - padY}
          stroke="var(--color-border)"
          strokeWidth="1"
        />
        {hasLine && <path d={area} fill={`url(#hb-${id})`} />}
        {hasLine && (
          <path
            d={line}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {ordered.map((p) => (
          <circle
            key={`${p.minute}-${p.value}`}
            cx={x(p.minute)}
            cy={y(p.value)}
            r="2"
            fill="var(--color-accent)"
            opacity="0.55"
          />
        ))}
        {ordered.length > 0 && (
          <circle
            cx={x(ordered[ordered.length - 1].minute)}
            cy={y(ordered[ordered.length - 1].value)}
            r="3.5"
            fill="var(--color-accent)"
          />
        )}
      </svg>
      <div className="-mt-1 flex justify-between text-[10px] tabular-nums text-faint">
        <span>0’</span>
        <span>{Math.round(domain / 2)}’</span>
        <span>{domain}’</span>
      </div>
      {ordered.length === 0 ? (
        <p className="mt-2 text-xs text-muted">
          No pulse yet. Tell the room how you feel.
        </p>
      ) : (
        <p className="mt-2 text-xs text-muted">
          {ordered.length} {ordered.length === 1 ? "tap" : "taps"} · last at{" "}
          {lastMinute === 0 ? "kick-off" : `${lastMinute}’`}
        </p>
      )}
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-display text-[11px] tracking-[0.22em] text-muted uppercase">
      {children}
    </p>
  );
}

export function PageHeader({
  kicker,
  title,
  lede,
  children,
  className,
}: {
  kicker: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex flex-wrap items-end justify-between gap-x-8 gap-y-5",
        className,
      )}
    >
      <div className="max-w-2xl">
        <SectionLabel>{kicker}</SectionLabel>
        <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">{title}</h1>
        {lede && <p className="mt-3 text-sm text-muted sm:text-base">{lede}</p>}
      </div>
      {children && <div className="flex flex-wrap items-end gap-3">{children}</div>}
    </header>
  );
}

export function Stat({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  tone?: "default" | "accent";
}) {
  return (
    <div className="rounded-lg border border-border bg-surface px-4 py-3">
      <p className="text-[10px] tracking-[0.16em] text-muted uppercase">{label}</p>
      <p
        className={cn(
          "mt-1 font-display text-2xl leading-none tabular-nums",
          tone === "accent" && "text-accent",
        )}
      >
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function LivePill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] font-display tracking-[0.16em] text-muted uppercase">
      <span className="live-dot size-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: ReactNode;
  body: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-surface/40 px-5 py-8 text-center">
      <p className="font-display text-lg">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-muted">{body}</p>
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}
