/**
 * Client telemetry. Fire-and-forget writes to `/api/events`; never blocks the UI
 * and silently no-ops in SSR, when disabled, or when the backend is unreachable
 * (the app stays fully usable offline on localStorage alone).
 *
 * The fan id is a browser-local uuid, kept out of the persisted store so it can
 * never cause a server/client hydration mismatch.
 */

const FAN_KEY = "laliga-pulse-fan";

export function getFanId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    let id = window.localStorage.getItem(FAN_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `fan-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      window.localStorage.setItem(FAN_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

const identity: { handle: string | null; clubId: string | null } = {
  handle: null,
  clubId: null,
};

export function setTelemetryIdentity(next: {
  handle?: string | null;
  clubId?: string | null;
}): void {
  if (next.handle !== undefined) identity.handle = next.handle;
  if (next.clubId !== undefined) identity.clubId = next.clubId;
}

const ENABLED = import.meta.env.VITE_TELEMETRY !== "off";

export type TrackPayload = {
  momentId?: string | null;
  optionId?: string | null;
  value?: number | null;
};

export function track(name: string, payload: TrackPayload = {}): void {
  if (!ENABLED || typeof window === "undefined") return;
  const body = JSON.stringify({
    fanId: getFanId(),
    handle: identity.handle,
    clubId: identity.clubId,
    name,
    ...payload,
  });
  try {
    void fetch("/api/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
    })
      .then((res) => {
        if (res.ok) window.dispatchEvent(new Event("mosaico:refresh"));
      })
      .catch(() => undefined);
  } catch {
    // never let telemetry break an interaction
  }
}
