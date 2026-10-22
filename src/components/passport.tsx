import { useEffect, useState } from "react";
import { CLUBS } from "@/data/pulse-data";
import { findPlayer, SCORER } from "@/data/players";
import { usePulse } from "@/store/pulse-store";

export function PassportOverlay() {
  const focus = usePulse((s) => s.focusPlayer);
  const scoreSide = usePulse((s) => s.scoreSide);
  const scriptId = usePulse((s) => s.scriptId);
  const [scorer, setScorer] = useState<string | null>(null);

  useEffect(() => {
    if (!scoreSide) return;
    setScorer(SCORER[scoreSide]);
    const timer = window.setTimeout(() => setScorer(null), 4200);
    return () => window.clearTimeout(timer);
  }, [scriptId, scoreSide]);

  const watched = focus ? findPlayer(focus) : null;
  const scoring = scorer ? findPlayer(scorer) : null;
  const player = scoring ?? watched;
  if (!player) return null;
  const club = CLUBS[player.club];
  const mode = scoring ? "Scored" : "Watching";

  return (
    <div
      className={`pointer-events-none fixed z-30 ${scoring ? "top-28 right-4" : "right-4 bottom-20"}`}
      aria-hidden
    >
      <div className="passport-scene h-40 w-28">
        <div className="passport-spin relative h-full w-full">
          <article
            className="absolute inset-0 flex flex-col justify-between rounded-lg border border-border p-3"
            style={{ background: club.primary, color: club.secondary, backfaceVisibility: "hidden" }}
          >
            <p className="font-display text-[10px] tracking-[0.18em] uppercase">{mode}</p>
            <p className="font-display text-4xl leading-none tabular-nums">{player.number}</p>
            <p className="font-display text-sm leading-tight">{player.name}</p>
          </article>
          <article
            className="absolute inset-0 flex flex-col justify-end rounded-lg border border-border bg-surface p-3 text-fg"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <p className="text-[10px] tracking-widest text-muted uppercase">{club.short}</p>
            <p className="font-display text-lg leading-tight">{player.role}</p>
          </article>
        </div>
      </div>
    </div>
  );
}
