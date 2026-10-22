import type { ClubId, Phase } from "@/data/pulse-data";

export const ROOM_SIZE: Record<ClubId, number> = {
  rma: 18420,
  fcb: 17660,
  atm: 9320,
  ath: 7044,
  sev: 5110,
  rso: 4688,
  vil: 3902,
  gir: 2740,
};

export const FANBASE: Record<
  ClubId,
  { calling: string; split: string }
> = {
  rma: { calling: "61% still see a home win", split: "Home 61 · Draw 27 · Away 12" },
  fcb: { calling: "54% came for the away win", split: "Home 22 · Draw 24 · Away 54" },
  atm: { calling: "48% expect a tight draw", split: "Home 31 · Draw 48 · Away 21" },
  ath: { calling: "57% want the first goal", split: "Home 57 · Draw 28 · Away 15" },
  sev: { calling: "44% are on a draw", split: "Home 29 · Draw 44 · Away 27" },
  rso: { calling: "51% called a home win", split: "Home 51 · Draw 30 · Away 19" },
  vil: { calling: "46% see both teams scoring", split: "Home 40 · Draw 34 · Away 26" },
  gir: { calling: "39% are staying with the draw", split: "Home 33 · Draw 39 · Away 28" },
};

const LINES: Record<Phase, string[]> = {
  tunnel: [
    "Who’s starting on that flank?",
    "I’m in. Don’t leave me out of the call.",
    "This one feels like a final already.",
  ],
  live: [
    "That was a penalty. I don’t care.",
    "Sit in. See it to the break.",
    "He’s beating his man every time.",
  ],
  break: [
    "Change the right side. It’s dead.",
    "More bite. We can still take this.",
    "I’m amending. The first half lied.",
  ],
  whistle: [
    "Draw. I had it from the tunnel.",
    "The red card turned it.",
    "Put it in the book. We were there.",
  ],
};

export function roomFeed(club: ClubId, phase: Phase) {
  const names = ["Marta", "Iker", "Nerea", "Pol", "Aina", "Luis"];
  return LINES[phase].map((text, i) => ({
    id: `${club}-${phase}-${i}`,
    author: names[i % names.length],
    text,
  }));
}
