export type ClubId =
  | "rma"
  | "fcb"
  | "atm"
  | "ath"
  | "sev"
  | "rso"
  | "vil"
  | "gir";

export type Club = {
  id: ClubId;
  name: string;
  short: string;
  city: string;
  nickname: string;
  ground: string;
  primary: string;
  secondary: string;
};

export const CLUBS: Record<ClubId, Club> = {
  rma: {
    id: "rma",
    name: "Real Madrid",
    short: "RMA",
    city: "Madrid",
    nickname: "Los Blancos",
    ground: "Santiago Bernabéu",
    primary: "#F5F5F5",
    secondary: "#1A2740",
  },
  fcb: {
    id: "fcb",
    name: "FC Barcelona",
    short: "FCB",
    city: "Barcelona",
    nickname: "Culés",
    ground: "Estadi Olímpic",
    primary: "#A50044",
    secondary: "#004D98",
  },
  atm: {
    id: "atm",
    name: "Atlético Madrid",
    short: "ATM",
    city: "Madrid",
    nickname: "Los Colchoneros",
    ground: "Riyadh Air Metropolitano",
    primary: "#C8102E",
    secondary: "#FFFFFF",
  },
  ath: {
    id: "ath",
    name: "Athletic Club",
    short: "ATH",
    city: "Bilbao",
    nickname: "Los Leones",
    ground: "San Mamés",
    primary: "#EE2A24",
    secondary: "#FFFFFF",
  },
  sev: {
    id: "sev",
    name: "Sevilla",
    short: "SEV",
    city: "Sevilla",
    nickname: "Los Nervionenses",
    ground: "Ramón Sánchez-Pizjuán",
    primary: "#F4F4F4",
    secondary: "#D0061F",
  },
  rso: {
    id: "rso",
    name: "Real Sociedad",
    short: "RSO",
    city: "San Sebastián",
    nickname: "Txuri-urdin",
    ground: "Reale Arena",
    primary: "#0067B1",
    secondary: "#FFFFFF",
  },
  vil: {
    id: "vil",
    name: "Villarreal",
    short: "VIL",
    city: "Villarreal",
    nickname: "El Submarino",
    ground: "Estadio de la Cerámica",
    primary: "#F6EB16",
    secondary: "#0055A5",
  },
  gir: {
    id: "gir",
    name: "Girona",
    short: "GIR",
    city: "Girona",
    nickname: "Los Blanquivermells",
    ground: "Montilivi",
    primary: "#C8102E",
    secondary: "#FFFFFF",
  },
};

export type Phase = "tunnel" | "live" | "break" | "whistle";

export type MomentOption = {
  id: string;
  label: string;
  call: string;
  share: number;
};

export type PulseMoment = {
  id: string;
  phase: Phase;
  minute: number;
  minuteLabel: string;
  heading: string;
  question: string;
  note: string;
  options: MomentOption[];
  narrative: Record<string, string>;
};

export const FEATURED = {
  id: "rma-fcb-md9",
  home: "rma" as ClubId,
  away: "fcb" as ClubId,
  competition: "LALIGA EA SPORTS",
  round: "Matchday 9",
  kickoff: "21:00",
  venue: "Santiago Bernabéu",
  gravity: 96,
  story:
    "First meeting of the season. The table is tight. Nights like this are why people fall in love with the league.",
};

export const FIXTURES: Array<{
  id: string;
  home: ClubId;
  away: ClubId;
  kickoff: string;
  gravity: number;
}> = [
  { id: "atm-sev", home: "atm", away: "sev", kickoff: "16:15", gravity: 74 },
  { id: "ath-rso", home: "ath", away: "rso", kickoff: "18:30", gravity: 81 },
  { id: "vil-gir", home: "vil", away: "gir", kickoff: "21:00", gravity: 62 },
];

export const MOMENTS: PulseMoment[] = [
  {
    id: "mandate",
    phase: "tunnel",
    minute: -12,
    minuteLabel: "From the tunnel",
    heading: "The mandate",
    question: "Who should take the right flank from the first whistle?",
    note: "This is the official fan call before they walk out. It goes in the book.",
    options: [
      { id: "valverde", label: "Valverde", call: "Put the lungs on that side.", share: 46 },
      { id: "rodrygo", label: "Rodrygo", call: "Stretch them from the off.", share: 38 },
      { id: "camavinga", label: "Camavinga", call: "Win the first balls.", share: 16 },
    ],
    narrative: {
      valverde: "The stand wants steel on the right. Valverde from the first whistle.",
      rodrygo: "The stand wants width and one-v-one. Rodrygo starts on that flank.",
      camavinga: "The stand wants the midfield duel won early. Camavinga from the right.",
    },
  },
  {
    id: "chance-8",
    phase: "live",
    minute: 8,
    minuteLabel: "8'",
    heading: "The first opening",
    question: "That was the first real sight of goal. What did you see?",
    note: "Call it as you saw it. The Heat is the stand talking in one voice.",
    options: [
      { id: "should", label: "He has to score that", call: "That's the opener.", share: 51 },
      { id: "keeper", label: "The keeper earned it", call: "Big stop.", share: 33 },
      { id: "night", label: "Play on — long night", call: "Settle. The night is young.", share: 16 },
    ],
    narrative: {
      should: "The stand thinks that was the opener. They will remember it if this stays tight.",
      keeper: "The stand gives the gloves their due. A night can turn on a save like that.",
      night: "The stand stays patient. Plenty of football left in this.",
    },
  },
  {
    id: "shout-23",
    phase: "live",
    minute: 23,
    minuteLabel: "23'",
    heading: "The shout",
    question: "Contact in the box. Penalty or play on?",
    note: "No replay in the stand. You call it in the moment, like everyone else.",
    options: [
      { id: "spot", label: "Spot kick", call: "That's a penalty.", share: 41 },
      { id: "soft", label: "Soft", call: "He's looking for it.", share: 28 },
      { id: "play", label: "Let them play", call: "Play on.", share: 31 },
    ],
    narrative: {
      spot: "The stand wants the spot. They saw contact and they saw enough.",
      soft: "The stand is not buying it. Soft, and they want the game to breathe.",
      play: "The stand wants football, not a whistle. Play on.",
    },
  },
  {
    id: "hold-41",
    phase: "live",
    minute: 41,
    minuteLabel: "41'",
    heading: "Hold the line",
    question: "They're pinning us in. What does the stand want before the break?",
    note: "This is the twelfth talking to the back line.",
    options: [
      { id: "sit", label: "Sit in and see it to the break", call: "See it to half-time.", share: 44 },
      { id: "step", label: "Step up and press", call: "Don't drop. Step in.", share: 36 },
      { id: "playout", label: "Play out. Don't panic.", call: "Keep the ball.", share: 20 },
    ],
    narrative: {
      sit: "The stand wants the lines tight and the clock to the break.",
      step: "The stand wants a step up, not a retreat. Win it higher.",
      playout: "The stand wants composure. Play out. Don't kick it away.",
    },
  },
  {
    id: "dressing",
    phase: "break",
    minute: 45,
    minuteLabel: "Half-time",
    heading: "Dressing-room talk",
    question: "What does the dressing room need at the break?",
    note: "The Heat at half-time is the conversation in the concourse, made official.",
    options: [
      { id: "calm", label: "Calm heads", call: "We're in this.", share: 39 },
      { id: "bite", label: "More bite", call: "Win the second balls.", share: 42 },
      { id: "change", label: "Change the right side", call: "That flank is quiet.", share: 19 },
    ],
    narrative: {
      calm: "The stand says the shape is there. Keep the heads. The second half is ours to take.",
      bite: "The stand wants more of a fight for every loose ball after the restart.",
      change: "The stand has seen enough of that right side. They want a different look.",
    },
  },
  {
    id: "shadow-64",
    phase: "live",
    minute: 64,
    minuteLabel: "64'",
    heading: "From the bench",
    question: "The bench is restless. What would you do from the touchline?",
    note: "Your call sits beside the collective. Later we read it against what actually happened.",
    options: [
      { id: "fresh", label: "Fresh legs up top", call: "Change the point.", share: 48 },
      { id: "lock", label: "Lock the midfield", call: "Win the middle.", share: 31 },
      { id: "leave", label: "Leave it — they're growing", call: "Don't break the spell.", share: 21 },
    ],
    narrative: {
      fresh: "The stand wants a new runner in behind. Fresh legs up top.",
      lock: "The stand wants the middle of the park shut. No cheap transitions.",
      leave: "The stand trusts the eleven on the grass. Leave it.",
    },
  },
  {
    id: "twelfth-81",
    phase: "live",
    minute: 81,
    minuteLabel: "81'",
    heading: "The twelfth",
    question: "Last stretch. Send them a message from the stand.",
    note: "On nights like this, the crowd is a player. This is that moment.",
    options: [
      { id: "push", label: "Push for the winner", call: "One more.", share: 53 },
      { id: "seeout", label: "See it out", call: "Don't get greedy.", share: 22 },
      { id: "box", label: "One more ball into the box", call: "Put it in the mixer.", share: 25 },
    ],
    narrative: {
      push: "The stand is on its feet. They want the winner. Go and take it.",
      seeout: "The stand has seen too many nights thrown away. See it out.",
      box: "The stand wants the ball in the six-yard box. Make them defend.",
    },
  },
  {
    id: "motm",
    phase: "whistle",
    minute: 90,
    minuteLabel: "After the whistle",
    heading: "Who ran the night",
    question: "Who put this match on their back?",
    note: "The Official Fan Verdict names the night. This lives in the archive.",
    options: [
      { id: "bellingham", label: "Bellingham", call: "He ran the middle.", share: 37 },
      { id: "yamal", label: "Lamine Yamal", call: "Every time he got it.", share: 34 },
      { id: "courtois", label: "Courtois", call: "Kept us in it.", share: 29 },
    ],
    narrative: {
      bellingham: "The stand names Bellingham. He ran the middle when the game stretched.",
      yamal: "The stand names Lamine Yamal. Every time he received, the night tilted.",
      courtois: "The stand names Courtois. Without the gloves, this is a different story.",
    },
  },
];

export const FEED = [
  { name: "Nerea · Madrid", text: "That right side has to wake up." },
  { name: "Pol · Gràcia", text: "Play. Don't wait for a whistle." },
  { name: "Iker · Chamberí", text: "See it to the break. Heads." },
  { name: "Aina · Eixample", text: "He's beating his man every time." },
  { name: "Luis · Vallecas", text: "The middle is where this is won." },
  { name: "Júlia · Poblenou", text: "Don't sit in. Step up." },
];

export const SEASON_ARC = [
  {
    week: "MD7",
    title: "The table tightens",
    body: "Four sides inside five points. Every result now carries weight into the spring.",
  },
  {
    week: "MD8",
    title: "A night in San Mamés",
    body: "Athletic made the league look like a cup tie. Mosaico called it early: more bite, not more pretty.",
  },
  {
    week: "MD9",
    title: "This one",
    body: "The first Clásico of the season. Gravity 96. The kind of night the rest of the year is measured against.",
  },
  {
    week: "MD10",
    title: "Next: the hangover fixtures",
    body: "After a night like this, the table still asks for three points on a Sunday. That's the league.",
  },
];

export const MISSIONS = [
  {
    id: "m1",
    title: "Be in the tunnel",
    detail: "Complete the matchday ritual before kick-off.",
    points: 400,
  },
  {
    id: "m2",
    title: "Call the ninety",
    detail: "Lock in at least four Moments in one match.",
    points: 800,
  },
  {
    id: "m3",
    title: "Name the night",
    detail: "Cast the Official Fan Verdict after the whistle.",
    points: 500,
  },
  {
    id: "m4",
    title: "Between matchdays",
    detail: "Read this week's arc and leave a mark on last season's echo.",
    points: 300,
  },
];

export const LEADERBOARD = [
  { name: "Marta G.", club: "rma" as ClubId, title: "The Twelfth", points: 16200 },
  { name: "Sergi P.", club: "fcb" as ClubId, title: "Captain of the stand", points: 11200 },
  { name: "Ainhoa L.", club: "ath" as ClubId, title: "Captain of the stand", points: 9800 },
  { name: "You", club: "rma" as ClubId, title: "Season ticket", points: 2400, you: true },
  { name: "Diego R.", club: "atm" as ClubId, title: "Season ticket", points: 6400 },
  { name: "Laia V.", club: "rso" as ClubId, title: "Terrace regular", points: 3100 },
];

export const ECHOES = [
  {
    id: "echo-1",
    when: "This week last season",
    match: "Real Madrid 2–1 Girona",
    verdict: "The stand called for width from minute 1. It arrived late. They still got the night.",
  },
  {
    id: "echo-2",
    when: "A year ago tonight",
    match: "Barcelona 3–0 Sevilla",
    verdict: "Mosaico named the right flank before kick-off. The night agreed.",
  },
];

export const RANKS = [
  { title: "New voice", min: 0, copy: "You've just walked in. Stay for the ninety." },
  { title: "Terrace regular", min: 2000, copy: "They know your face in this stand." },
  { title: "Season ticket", min: 5000, copy: "You're here in November rain and May sun." },
  { title: "Captain of the stand", min: 9000, copy: "When you talk, the row listens." },
  { title: "The Twelfth", min: 15000, copy: "You are part of how this club is felt." },
];

export function rankFromPoints(points: number) {
  let current = RANKS[0];
  let next = RANKS[1];
  for (let i = 0; i < RANKS.length; i++) {
    if (points >= RANKS[i].min) {
      current = RANKS[i];
      next = RANKS[i + 1] ?? null;
    }
  }
  const floor = current.min;
  const ceil = next ? next.min : floor;
  const progress = next ? Math.min(1, (points - floor) / (ceil - floor)) : 1;
  return { current, next, progress };
}

export function winningOption(moment: PulseMoment) {
  return moment.options.reduce((a, b) => (a.share >= b.share ? a : b));
}
