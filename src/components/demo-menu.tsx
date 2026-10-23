import * as Popover from "@radix-ui/react-popover";
import { ChevronDown, RotateCcw, SkipForward } from "lucide-react";
import { MOMENTS } from "@/data/pulse-data";
import { usePulse } from "@/store/pulse-store";
import { cn } from "@/lib/utils";

const PHASES = [
  { id: "tunnel", label: "Tunnel" },
  { id: "live", label: "Kick-off" },
  { id: "break", label: "Half-time" },
  { id: "whistle", label: "Full-time" },
] as const;

export function DemoMenu() {
  const phase = usePulse((s) => s.phase);
  const momentIndex = usePulse((s) => s.momentIndex);
  const jumpPhase = usePulse((s) => s.jumpPhase);
  const nextMoment = usePulse((s) => s.nextMoment);
  const restartNight = usePulse((s) => s.restartNight);
  const moment = MOMENTS[momentIndex];

  const phaseLabel =
    phase === "tunnel"
      ? "Tunnel"
      : phase === "live"
        ? "Live"
        : phase === "break"
          ? "Half-time"
          : "Full-time";

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded-full border border-border bg-surface px-3 text-[11px] font-display tracking-[0.14em] text-muted uppercase transition-colors hover:text-fg"
        >
          <span
            className={cn(
              "size-1.5 rounded-full",
              phase === "live" ? "live-dot bg-accent" : "bg-muted",
            )}
          />
          <span>{phaseLabel}</span>
          <span className="hidden tabular-nums text-faint sm:inline">
            {moment.minute > 0 ? `${moment.minute}’` : "PRE"}
          </span>
          <ChevronDown className="size-3.5 opacity-60" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          align="end"
          className="z-50 w-72 rounded-xl border border-border bg-surface p-3 shadow-2xl shadow-black/50 outline-none"
        >
          <div className="flex items-center justify-between">
            <p className="font-display text-[10px] tracking-[0.2em] text-muted uppercase">
              Demo controls
            </p>
            <p className="text-[10px] text-faint">prototype only</p>
          </div>
          <p className="mt-1.5 text-xs text-muted">
            {moment.minuteLabel} · {moment.heading}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-1.5">
            {PHASES.map((p) => (
              <Popover.Close asChild key={p.id}>
                <button
                  type="button"
                  onClick={() => jumpPhase(p.id)}
                  className={cn(
                    "h-9 rounded-md border px-2 text-xs transition-colors",
                    phase === p.id
                      ? "border-fg/60 bg-raised text-fg"
                      : "border-border text-muted hover:bg-raised hover:text-fg",
                  )}
                >
                  {p.label}
                </button>
              </Popover.Close>
            ))}
          </div>

          <Popover.Close asChild>
            <button
              type="button"
              onClick={nextMoment}
              className="mt-1.5 flex h-9 w-full items-center justify-center gap-2 rounded-md bg-accent text-xs font-medium text-accent-fg transition-opacity hover:opacity-90"
            >
              <SkipForward className="size-3.5" />
              Next moment
            </button>
          </Popover.Close>
          <Popover.Close asChild>
            <button
              type="button"
              onClick={restartNight}
              className="mt-1.5 flex h-9 w-full items-center justify-center gap-2 rounded-md border border-border text-xs text-muted transition-colors hover:bg-raised hover:text-fg"
            >
              <RotateCcw className="size-3.5" />
              Restart the night
            </button>
          </Popover.Close>
          <Popover.Arrow className="fill-border" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
