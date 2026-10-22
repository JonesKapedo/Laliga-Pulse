import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  MOMENTS,
  type ClubId,
  type Phase,
  rankFromPoints,
} from "@/data/pulse-data";

export type Feel = "hungry" | "nervous" | "calm" | "loud";

export type Lang = "en" | "es";
export type FlashKind = "goal" | "red" | "roar" | "save";

export type Flash = {
  kind: FlashKind;
  title: string;
  line: string;
  side?: "home" | "away";
};

export type Forecast = {
  result: "home" | "draw" | "away";
  card: "yes" | "no";
  first: "home" | "away" | "none";
};

export const NIGHT_TRUTH: Forecast = {
  result: "draw",
  card: "yes",
  first: "home",
};

export function forecastPoints(card: Forecast) {
  let n = 0;
  if (card.result === NIGHT_TRUTH.result) n += 500;
  if (card.card === NIGHT_TRUTH.card) n += 500;
  if (card.first === NIGHT_TRUTH.first) n += 500;
  return n;
}

export type RoomLine = { id: string; author: string; text: string };

type PulseState = {
  name: string;
  clubId: ClubId;
  points: number;
  ritualDone: boolean;
  feel: Feel | null;
  focusPlayer: string | null;
  votes: Record<string, string>;
  revealed: string[];
  momentIndex: number;
  phase: Phase;
  emotions: Array<{ minute: number; value: number }>;
  temperature: number;
  pressure: number;
  lang: Lang;
  scriptId: number;
  script: Flash[];
  scoreSide: "home" | "away" | null;
  registered: boolean;
  age: number | null;
  forecast: Forecast | null;
  amended: boolean;
  settled: boolean;
  lines: RoomLine[];
  setName: (name: string) => void;
  setClub: (id: ClubId) => void;
  setLang: (lang: Lang) => void;
  completeRitual: (feel: Feel, focusPlayer: string) => void;
  castVote: (momentId: string, optionId: string) => void;
  goToMoment: (index: number) => void;
  nextMoment: () => void;
  jumpPhase: (phase: Phase) => void;
  restartNight: () => void;
  pushEmotion: (value: number) => void;
  saveForecast: (card: Forecast, amended: boolean) => void;
  registerFan: (input: { age: number; username: string; clubId: ClubId }) => void;
  say: (text: string) => void;
};

const PHASE_MOMENT: Record<Phase, number> = {
  tunnel: 0,
  live: 1,
  break: 4,
  whistle: 7,
};

export const usePulse = create<PulseState>()(
  persist(
    (set, get) => ({
      name: "You",
      clubId: "rma",
      points: 2400,
      ritualDone: false,
      feel: null,
      focusPlayer: null,
      votes: {},
      revealed: [],
      momentIndex: 0,
      phase: "tunnel",
      emotions: [
        { minute: 0, value: 42 },
        { minute: 4, value: 48 },
      ],
      temperature: 48,
      pressure: 36,
      lang: "en",
      scriptId: 0,
      script: [],
      scoreSide: null,
      registered: false,
      age: null,
      forecast: null,
      amended: false,
      settled: false,
      lines: [],
      setName: (name) => set({ name: name.slice(0, 24) || "You" }),
      setClub: (clubId) => set({ clubId }),
      setLang: (lang) => set({ lang }),
      completeRitual: (feel, focusPlayer) => {
        const { ritualDone, points } = get();
        set({
          ritualDone: true,
          feel,
          focusPlayer,
          points: ritualDone ? points : points + 400,
        });
      },
      castVote: (momentId, optionId) => {
        const { votes, revealed, points } = get();
        if (votes[momentId]) return;
        const bonus = 250;
        const withStand =
          MOMENTS.find((m) => m.id === momentId)?.options.reduce((a, b) =>
            a.share >= b.share ? a : b,
          ).id === optionId;
        set({
          votes: { ...votes, [momentId]: optionId },
          revealed: revealed.includes(momentId) ? revealed : [...revealed, momentId],
          points: points + bonus + (withStand ? 200 : 80),
        });
      },
      goToMoment: (index) => {
        const i = Math.max(0, Math.min(MOMENTS.length - 1, index));
        const prev = MOMENTS[get().momentIndex]?.minute ?? -20;
        const m = MOMENTS[i];
        const next = m.minute;
        const t = 40 + i * 7 + (m.phase === "whistle" ? 20 : 0);
        const p = 30 + i * 8;
        const script: Flash[] = [];
        if (prev < 12 && next >= 12) {
          script.push({
            kind: "goal",
            title: "Goal",
            line: "12' · Los Blancos. The ground lifts.",
            side: "home",
          });
        }
        if (prev < 58 && next >= 58) {
          script.push({
            kind: "red",
            title: "Red card",
            line: "58' · The night changes shape.",
          });
        }
        if (prev < 64 && next >= 64) {
          script.push({
            kind: "goal",
            title: "Goal",
            line: "64' · Level. The away end finds its voice.",
            side: "away",
          });
        }
        if (prev < 8 && next >= 8 && next < 12) {
          script.push({
            kind: "save",
            title: "Big stop",
            line: "8' · The gloves keep it level.",
          });
        }
        set({
          momentIndex: i,
          phase: m.phase,
          temperature: Math.min(96, t + (script.some((s) => s.kind === "goal") ? 18 : 0)),
          pressure: Math.min(98, p + (script.some((s) => s.kind === "red") ? 16 : 0)),
          emotions: [
            ...get().emotions,
            { minute: Math.max(0, m.minute), value: Math.min(96, t) },
          ].slice(-10),
          script,
          scriptId: script.length ? get().scriptId + 1 : get().scriptId,
          scoreSide: script.find((s) => s.side)?.side ?? null,
        });
      },
      nextMoment: () => {
        const { momentIndex } = get();
        get().goToMoment(momentIndex + 1);
      },
      jumpPhase: (phase) => {
        get().goToMoment(PHASE_MOMENT[phase]);
      },
      restartNight: () =>
        set({
          ritualDone: false,
          feel: null,
          focusPlayer: null,
          votes: {},
          revealed: [],
          momentIndex: 0,
          phase: "tunnel",
          temperature: 48,
          pressure: 36,
          emotions: [
            { minute: 0, value: 42 },
            { minute: 4, value: 48 },
          ],
          script: [],
          scriptId: get().scriptId + 1,
          scoreSide: null,
          settled: false,
        }),
      pushEmotion: (value) => {
        const m = MOMENTS[get().momentIndex];
        const roar = value >= 72;
        set({
          temperature: value,
          emotions: [
            ...get().emotions,
            { minute: Math.max(0, m.minute), value },
          ].slice(-10),
          ...(roar
            ? {
                script: [
                  {
                    kind: "roar" as const,
                    title: value >= 90 ? "The roar" : "The stand rises",
                    line: "You, and the rows around you.",
                  },
                ],
                scriptId: get().scriptId + 1,
              }
            : {}),
        });
      },
      saveForecast: (card, amended) => {
        if (get().phase === "whistle") return;
        set({ forecast: card, amended: amended || get().amended });
      },
      registerFan: ({ age, username, clubId }) => {
        const { forecast, settled, points } = get();
        const bonus = forecast && !settled ? forecastPoints(forecast) : 0;
        set({
          registered: true,
          age,
          name: username.slice(0, 24),
          clubId,
          points: points + bonus,
          settled: true,
        });
      },
      say: (text) => {
        const clean = text.trim().slice(0, 180);
        if (!clean) return;
        set({
          lines: [
            ...get().lines,
            { id: `${Date.now()}`, author: get().name || "You", text: clean },
          ].slice(-40),
          points: get().points + (get().lines.length < 4 ? 40 : 0),
        });
      },
    }),
    {
      name: "laliga-pulse-v1",
      skipHydration: true,
      partialize: (s) => ({
        name: s.name,
        clubId: s.clubId,
        points: s.points,
        ritualDone: s.ritualDone,
        feel: s.feel,
        focusPlayer: s.focusPlayer,
        votes: s.votes,
        revealed: s.revealed,
        momentIndex: s.momentIndex,
        phase: s.phase,
        emotions: s.emotions,
        temperature: s.temperature,
        pressure: s.pressure,
        lang: s.lang,
        registered: s.registered,
        age: s.age,
        forecast: s.forecast,
        amended: s.amended,
        settled: s.settled,
        lines: s.lines,
      }),
    },
  ),
);

export function useRank() {
  const points = usePulse((s) => s.points);
  return rankFromPoints(points);
}
