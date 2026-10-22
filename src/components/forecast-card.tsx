import { useState } from "react";
import { CLUBS } from "@/data/pulse-data";
import { usePulse, type Forecast } from "@/store/pulse-store";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/pulse-bits";
import { cn } from "@/lib/utils";

const STEPS: Array<{
  key: keyof Forecast;
  ask: string;
  options: Array<{ id: Forecast[keyof Forecast]; label: string }>;
}> = [
  {
    key: "result",
    ask: "How does it finish?",
    options: [
      { id: "home", label: "Home" },
      { id: "draw", label: "Draw" },
      { id: "away", label: "Away" },
    ],
  },
  {
    key: "card",
    ask: "A red card tonight?",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
  },
  {
    key: "first",
    ask: "Who scores first?",
    options: [
      { id: "home", label: "Home" },
      { id: "away", label: "Away" },
      { id: "none", label: "Neither" },
    ],
  },
];

export function ForecastCard() {
  const phase = usePulse((s) => s.phase);
  const forecast = usePulse((s) => s.forecast);
  const amended = usePulse((s) => s.amended);
  const save = usePulse((s) => s.saveForecast);
  const clubId = usePulse((s) => s.clubId);
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Partial<Forecast>>(forecast ?? {});
  const locked = phase === "whistle";
  const halftime = phase === "break";
  const current = STEPS[step];

  function pick(id: string) {
    const next = { ...draft, [current.key]: id };
    setDraft(next);
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      return;
    }
    if (next.result && next.card && next.first) {
      save(next as Forecast, halftime);
    }
  }

  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <SectionLabel>
        {halftime ? "Half-time · amend the call" : "Before the whistle · three calls"}
      </SectionLabel>
      <h2 className="mt-2 font-display text-2xl">
        {CLUBS[clubId].short} room
      </h2>
      <p className="mt-1 text-sm text-muted">
        {locked
          ? "The night is in the book. Register to keep what you earned."
          : "Brief. One answer each. Correct calls pay at full-time."}
      </p>

      {!locked && (
        <div key={current.key} className="event-card mt-4">
          <p className="text-xs text-muted">
            {step + 1} / {STEPS.length}
            {amended ? " · amended" : ""}
          </p>
          <p className="mt-2 font-display text-3xl tracking-tight">{current.ask}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {current.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => pick(opt.id)}
                className={cn(
                  "min-h-11 rounded-md border px-4 text-sm",
                  draft[current.key] === opt.id
                    ? "border-fg bg-raised"
                    : "border-border hover:bg-raised",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button
              type="button"
              className="mt-3 text-xs text-muted"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}
        </div>
      )}

      {forecast && (
        <p className="mt-4 text-sm text-muted">
          Your slate: {forecast.result}, red card {forecast.card}, first goal {forecast.first}.
          {halftime && !locked ? " Change it before they walk out again." : ""}
        </p>
      )}
      {forecast && !locked && step === STEPS.length - 1 && (
        <Button
          className="mt-3"
          variant="outline"
          size="sm"
          onClick={() => {
            setStep(0);
            setDraft(forecast);
          }}
        >
          {halftime ? "Amend from the top" : "Call it again"}
        </Button>
      )}
    </section>
  );
}
