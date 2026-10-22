import { useState, type FormEvent } from "react";
import { CLUBS, type ClubId } from "@/data/pulse-data";
import { forecastPoints, usePulse } from "@/store/pulse-store";
import { Button } from "@/components/ui/button";
import { Crest } from "@/components/crest";

export function RegisterGate() {
  const phase = usePulse((s) => s.phase);
  const registered = usePulse((s) => s.registered);
  const forecast = usePulse((s) => s.forecast);
  const registerFan = usePulse((s) => s.registerFan);
  const clubId = usePulse((s) => s.clubId);
  const [age, setAge] = useState("24");
  const [username, setUsername] = useState("");
  const [club, setClub] = useState<ClubId>(clubId);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (phase !== "whistle" || registered) return null;

  const earned = forecast ? forecastPoints(forecast) : 0;

  function submit(e: FormEvent) {
    e.preventDefault();
    const years = Number(age);
    if (!username.trim() || username.trim().length < 2) {
      setError("A name the stand can say.");
      return;
    }
    if (!Number.isFinite(years) || years < 13 || years > 99) {
      setError("Age from 13.");
      return;
    }
    if (password.length < 6) {
      setError("Password, six characters.");
      return;
    }
    registerFan({ age: years, username: username.trim(), clubId: club });
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-bg/70 p-4 sm:items-center">
      <form
        onSubmit={submit}
        className="event-card w-full max-w-md rounded-xl border border-border bg-surface p-5"
      >
        <p className="font-display text-[11px] tracking-[0.22em] text-muted uppercase">
          Full-time · keep the night
        </p>
        <h2 className="mt-2 font-display text-3xl tracking-tight">Save what you earned</h2>
        <p className="mt-2 text-sm text-muted">
          You came in without an account. That’s allowed. To keep the points
          {earned ? ` — ${earned} from the card` : ""} — leave four things. The password
          stays on this device only.
        </p>
        <label className="mt-4 block text-xs text-muted">
          Age
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            inputMode="numeric"
            className="mt-1 h-11 w-full rounded-md border border-border bg-raised px-3 text-sm text-fg"
          />
        </label>
        <label className="mt-3 block text-xs text-muted">
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 h-11 w-full rounded-md border border-border bg-raised px-3 text-sm text-fg"
          />
        </label>
        <label className="mt-3 block text-xs text-muted">
          Favourite club
          <select
            value={club}
            onChange={(e) => setClub(e.target.value as ClubId)}
            className="mt-1 h-11 w-full rounded-md border border-border bg-raised px-3 text-sm text-fg"
          >
            {(Object.keys(CLUBS) as ClubId[]).map((id) => (
              <option key={id} value={id}>
                {CLUBS[id].name}
              </option>
            ))}
          </select>
        </label>
        <label className="mt-3 block text-xs text-muted">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 h-11 w-full rounded-md border border-border bg-raised px-3 text-sm text-fg"
          />
        </label>
        {error && <p className="mt-2 text-sm text-accent">{error}</p>}
        <Button type="submit" className="mt-4 w-full">
          Keep my night
        </Button>
        <p className="mt-3 flex items-center gap-2 text-xs text-muted">
          <Crest clubId={club} size={18} />
          You can still look around. Points wait until this is done.
        </p>
      </form>
    </div>
  );
}
