import { J as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crest-BkO3ta8O.js
var import_jsx_runtime = require_jsx_runtime();
var CLUBS = {
	rma: {
		id: "rma",
		name: "Real Madrid",
		short: "RMA",
		city: "Madrid",
		nickname: "Los Blancos",
		ground: "Santiago Bernabéu",
		primary: "#F5F5F5",
		secondary: "#1A2740"
	},
	fcb: {
		id: "fcb",
		name: "FC Barcelona",
		short: "FCB",
		city: "Barcelona",
		nickname: "Culés",
		ground: "Estadi Olímpic",
		primary: "#A50044",
		secondary: "#004D98"
	},
	atm: {
		id: "atm",
		name: "Atlético Madrid",
		short: "ATM",
		city: "Madrid",
		nickname: "Los Colchoneros",
		ground: "Riyadh Air Metropolitano",
		primary: "#C8102E",
		secondary: "#FFFFFF"
	},
	ath: {
		id: "ath",
		name: "Athletic Club",
		short: "ATH",
		city: "Bilbao",
		nickname: "Los Leones",
		ground: "San Mamés",
		primary: "#EE2A24",
		secondary: "#FFFFFF"
	},
	sev: {
		id: "sev",
		name: "Sevilla",
		short: "SEV",
		city: "Sevilla",
		nickname: "Los Nervionenses",
		ground: "Ramón Sánchez-Pizjuán",
		primary: "#F4F4F4",
		secondary: "#D0061F"
	},
	rso: {
		id: "rso",
		name: "Real Sociedad",
		short: "RSO",
		city: "San Sebastián",
		nickname: "Txuri-urdin",
		ground: "Reale Arena",
		primary: "#0067B1",
		secondary: "#FFFFFF"
	},
	vil: {
		id: "vil",
		name: "Villarreal",
		short: "VIL",
		city: "Villarreal",
		nickname: "El Submarino",
		ground: "Estadio de la Cerámica",
		primary: "#F6EB16",
		secondary: "#0055A5"
	},
	gir: {
		id: "gir",
		name: "Girona",
		short: "GIR",
		city: "Girona",
		nickname: "Los Blanquivermells",
		ground: "Montilivi",
		primary: "#C8102E",
		secondary: "#FFFFFF"
	}
};
var FEATURED = {
	id: "rma-fcb-md9",
	home: "rma",
	away: "fcb",
	competition: "LALIGA EA SPORTS",
	round: "Matchday 9",
	kickoff: "21:00",
	venue: "Santiago Bernabéu",
	gravity: 96,
	story: "First meeting of the season. The table is tight. Nights like this are why people fall in love with the league."
};
var FIXTURES = [
	{
		id: "atm-sev",
		home: "atm",
		away: "sev",
		kickoff: "16:15",
		gravity: 74
	},
	{
		id: "ath-rso",
		home: "ath",
		away: "rso",
		kickoff: "18:30",
		gravity: 81
	},
	{
		id: "vil-gir",
		home: "vil",
		away: "gir",
		kickoff: "21:00",
		gravity: 62
	}
];
var MOMENTS = [
	{
		id: "mandate",
		phase: "tunnel",
		minute: -12,
		minuteLabel: "From the tunnel",
		heading: "The mandate",
		question: "Who should take the right flank from the first whistle?",
		note: "This is the official fan call before they walk out. It goes in the book.",
		options: [
			{
				id: "valverde",
				label: "Valverde",
				call: "Put the lungs on that side.",
				share: 46
			},
			{
				id: "rodrygo",
				label: "Rodrygo",
				call: "Stretch them from the off.",
				share: 38
			},
			{
				id: "camavinga",
				label: "Camavinga",
				call: "Win the first balls.",
				share: 16
			}
		],
		narrative: {
			valverde: "The stand wants steel on the right. Valverde from the first whistle.",
			rodrygo: "The stand wants width and one-v-one. Rodrygo starts on that flank.",
			camavinga: "The stand wants the midfield duel won early. Camavinga from the right."
		}
	},
	{
		id: "chance-8",
		phase: "live",
		minute: 8,
		minuteLabel: "8'",
		heading: "The first opening",
		question: "That was the first real sight of goal. What did you see?",
		note: "Call it as you saw it. The Pulse is the stand talking in one voice.",
		options: [
			{
				id: "should",
				label: "He has to score that",
				call: "That's the opener.",
				share: 51
			},
			{
				id: "keeper",
				label: "The keeper earned it",
				call: "Big stop.",
				share: 33
			},
			{
				id: "night",
				label: "Play on — long night",
				call: "Settle. The night is young.",
				share: 16
			}
		],
		narrative: {
			should: "The stand thinks that was the opener. They will remember it if this stays tight.",
			keeper: "The stand gives the gloves their due. A night can turn on a save like that.",
			night: "The stand stays patient. Plenty of football left in this."
		}
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
			{
				id: "spot",
				label: "Spot kick",
				call: "That's a penalty.",
				share: 41
			},
			{
				id: "soft",
				label: "Soft",
				call: "He's looking for it.",
				share: 28
			},
			{
				id: "play",
				label: "Let them play",
				call: "Play on.",
				share: 31
			}
		],
		narrative: {
			spot: "The stand wants the spot. They saw contact and they saw enough.",
			soft: "The stand is not buying it. Soft, and they want the game to breathe.",
			play: "The stand wants football, not a whistle. Play on."
		}
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
			{
				id: "sit",
				label: "Sit in and see it to the break",
				call: "See it to half-time.",
				share: 44
			},
			{
				id: "step",
				label: "Step up and press",
				call: "Don't drop. Step in.",
				share: 36
			},
			{
				id: "playout",
				label: "Play out. Don't panic.",
				call: "Keep the ball.",
				share: 20
			}
		],
		narrative: {
			sit: "The stand wants the lines tight and the clock to the break.",
			step: "The stand wants a step up, not a retreat. Win it higher.",
			playout: "The stand wants composure. Play out. Don't kick it away."
		}
	},
	{
		id: "dressing",
		phase: "break",
		minute: 45,
		minuteLabel: "Half-time",
		heading: "Dressing-room talk",
		question: "What does the dressing room need at the break?",
		note: "The Pulse at half-time is the conversation in the concourse, made official.",
		options: [
			{
				id: "calm",
				label: "Calm heads",
				call: "We're in this.",
				share: 39
			},
			{
				id: "bite",
				label: "More bite",
				call: "Win the second balls.",
				share: 42
			},
			{
				id: "change",
				label: "Change the right side",
				call: "That flank is quiet.",
				share: 19
			}
		],
		narrative: {
			calm: "The stand says the shape is there. Keep the heads. The second half is ours to take.",
			bite: "The stand wants more of a fight for every loose ball after the restart.",
			change: "The stand has seen enough of that right side. They want a different look."
		}
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
			{
				id: "fresh",
				label: "Fresh legs up top",
				call: "Change the point.",
				share: 48
			},
			{
				id: "lock",
				label: "Lock the midfield",
				call: "Win the middle.",
				share: 31
			},
			{
				id: "leave",
				label: "Leave it — they're growing",
				call: "Don't break the spell.",
				share: 21
			}
		],
		narrative: {
			fresh: "The stand wants a new runner in behind. Fresh legs up top.",
			lock: "The stand wants the middle of the park shut. No cheap transitions.",
			leave: "The stand trusts the eleven on the grass. Leave it."
		}
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
			{
				id: "push",
				label: "Push for the winner",
				call: "One more.",
				share: 53
			},
			{
				id: "seeout",
				label: "See it out",
				call: "Don't get greedy.",
				share: 22
			},
			{
				id: "box",
				label: "One more ball into the box",
				call: "Put it in the mixer.",
				share: 25
			}
		],
		narrative: {
			push: "The stand is on its feet. They want the winner. Go and take it.",
			seeout: "The stand has seen too many nights thrown away. See it out.",
			box: "The stand wants the ball in the six-yard box. Make them defend."
		}
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
			{
				id: "bellingham",
				label: "Bellingham",
				call: "He ran the middle.",
				share: 37
			},
			{
				id: "yamal",
				label: "Lamine Yamal",
				call: "Every time he got it.",
				share: 34
			},
			{
				id: "courtois",
				label: "Courtois",
				call: "Kept us in it.",
				share: 29
			}
		],
		narrative: {
			bellingham: "The stand names Bellingham. He ran the middle when the game stretched.",
			yamal: "The stand names Lamine Yamal. Every time he received, the night tilted.",
			courtois: "The stand names Courtois. Without the gloves, this is a different story."
		}
	}
];
var FEED = [
	{
		name: "Nerea · Madrid",
		text: "That right side has to wake up."
	},
	{
		name: "Pol · Gràcia",
		text: "Play. Don't wait for a whistle."
	},
	{
		name: "Iker · Chamberí",
		text: "See it to the break. Heads."
	},
	{
		name: "Aina · Eixample",
		text: "He's beating his man every time."
	},
	{
		name: "Luis · Vallecas",
		text: "The middle is where this is won."
	},
	{
		name: "Júlia · Poblenou",
		text: "Don't sit in. Step up."
	}
];
var SEASON_ARC = [
	{
		week: "MD7",
		title: "The table tightens",
		body: "Four sides inside five points. Every result now carries weight into the spring."
	},
	{
		week: "MD8",
		title: "A night in San Mamés",
		body: "Athletic made the league look like a cup tie. The Pulse called it early: more bite, not more pretty."
	},
	{
		week: "MD9",
		title: "This one",
		body: "The first Clásico of the season. Gravity 96. The kind of night the rest of the year is measured against."
	},
	{
		week: "MD10",
		title: "Next: the hangover fixtures",
		body: "After a night like this, the table still asks for three points on a Sunday. That's the league."
	}
];
var MISSIONS = [
	{
		id: "m1",
		title: "Be in the tunnel",
		detail: "Complete the matchday ritual before kick-off.",
		points: 40
	},
	{
		id: "m2",
		title: "Call the ninety",
		detail: "Lock in at least four Pulse moments in one match.",
		points: 80
	},
	{
		id: "m3",
		title: "Name the night",
		detail: "Cast the Official Fan Verdict after the whistle.",
		points: 50
	},
	{
		id: "m4",
		title: "Between matchdays",
		detail: "Read this week's arc and leave a mark on last season's echo.",
		points: 30
	}
];
var LEADERBOARD = [
	{
		name: "Marta G.",
		club: "rma",
		title: "The Twelfth",
		points: 1840
	},
	{
		name: "Sergi P.",
		club: "fcb",
		title: "Captain of the stand",
		points: 1210
	},
	{
		name: "Ainhoa L.",
		club: "ath",
		title: "Captain of the stand",
		points: 1088
	},
	{
		name: "You",
		club: "rma",
		title: "Season ticket",
		points: 320,
		you: true
	},
	{
		name: "Diego R.",
		club: "atm",
		title: "Season ticket",
		points: 704
	},
	{
		name: "Laia V.",
		club: "rso",
		title: "Terrace regular",
		points: 488
	}
];
var ECHOES = [{
	id: "echo-1",
	when: "This week last season",
	match: "Real Madrid 2–1 Girona",
	verdict: "The stand called for width from minute 1. It arrived late. They still got the night."
}, {
	id: "echo-2",
	when: "A year ago tonight",
	match: "Barcelona 3–0 Sevilla",
	verdict: "The Pulse named the right flank before kick-off. The night agreed."
}];
var RANKS = [
	{
		title: "New voice",
		min: 0,
		copy: "You've just walked in. Stay for the ninety."
	},
	{
		title: "Terrace regular",
		min: 200,
		copy: "They know your face in this stand."
	},
	{
		title: "Season ticket",
		min: 500,
		copy: "You're here in November rain and May sun."
	},
	{
		title: "Captain of the stand",
		min: 900,
		copy: "When you talk, the row listens."
	},
	{
		title: "The Twelfth",
		min: 1500,
		copy: "You are part of how this club is felt."
	}
];
function rankFromPoints(points) {
	let current = RANKS[0];
	let next = RANKS[1];
	for (let i = 0; i < RANKS.length; i++) if (points >= RANKS[i].min) {
		current = RANKS[i];
		next = RANKS[i + 1] ?? null;
	}
	const floor = current.min;
	const ceil = next ? next.min : floor;
	const progress = next ? Math.min(1, (points - floor) / (ceil - floor)) : 1;
	return {
		current,
		next,
		progress
	};
}
function winningOption(moment) {
	return moment.options.reduce((a, b) => a.share >= b.share ? a : b);
}
var PHASE_MOMENT = {
	tunnel: 0,
	live: 1,
	break: 4,
	whistle: 7
};
var usePulse = create()(persist((set, get) => ({
	name: "You",
	clubId: "rma",
	points: 320,
	ritualDone: false,
	feel: null,
	focusPlayer: null,
	votes: {},
	revealed: [],
	momentIndex: 0,
	phase: "tunnel",
	emotions: [{
		minute: 0,
		value: 42
	}, {
		minute: 4,
		value: 48
	}],
	temperature: 48,
	pressure: 36,
	setName: (name) => set({ name: name.slice(0, 24) || "You" }),
	setClub: (clubId) => set({ clubId }),
	completeRitual: (feel, focusPlayer) => {
		const { ritualDone, points } = get();
		set({
			ritualDone: true,
			feel,
			focusPlayer,
			points: ritualDone ? points : points + 40
		});
	},
	castVote: (momentId, optionId) => {
		const { votes, revealed, points } = get();
		if (votes[momentId]) return;
		const bonus = 55 + Math.floor(Math.random() * 16);
		set({
			votes: {
				...votes,
				[momentId]: optionId
			},
			revealed: revealed.includes(momentId) ? revealed : [...revealed, momentId],
			points: points + bonus
		});
	},
	goToMoment: (index) => {
		const i = Math.max(0, Math.min(MOMENTS.length - 1, index));
		const m = MOMENTS[i];
		const t = 40 + i * 7 + (m.phase === "whistle" ? 20 : 0);
		const p = 30 + i * 8;
		set({
			momentIndex: i,
			phase: m.phase,
			temperature: Math.min(96, t),
			pressure: Math.min(94, p),
			emotions: [...get().emotions, {
				minute: Math.max(0, m.minute),
				value: Math.min(96, t)
			}].slice(-10)
		});
	},
	nextMoment: () => {
		const { momentIndex } = get();
		get().goToMoment(momentIndex + 1);
	},
	jumpPhase: (phase) => {
		get().goToMoment(PHASE_MOMENT[phase]);
	},
	restartNight: () => set({
		ritualDone: false,
		feel: null,
		focusPlayer: null,
		votes: {},
		revealed: [],
		momentIndex: 0,
		phase: "tunnel",
		temperature: 48,
		pressure: 36,
		emotions: [{
			minute: 0,
			value: 42
		}, {
			minute: 4,
			value: 48
		}]
	}),
	pushEmotion: (value) => {
		const m = MOMENTS[get().momentIndex];
		set({
			temperature: value,
			emotions: [...get().emotions, {
				minute: Math.max(0, m.minute),
				value
			}].slice(-10)
		});
	}
}), {
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
		pressure: s.pressure
	})
}));
function useRank() {
	return rankFromPoints(usePulse((s) => s.points));
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Crest({ clubId, size = 40, className }) {
	const club = CLUBS[clubId];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex shrink-0 items-center justify-center rounded-full font-display font-semibold tracking-wide", className),
		style: {
			width: size,
			height: size,
			background: club.primary,
			color: club.secondary,
			fontSize: Math.max(10, size * .28),
			boxShadow: "inset 0 0 0 1px color-mix(in oklab, white 18%, transparent)"
		},
		"aria-label": club.name,
		children: club.short
	});
}
//#endregion
export { FEED as a, MISSIONS as c, SEASON_ARC as d, cn as f, winningOption as h, FEATURED as i, MOMENTS as l, useRank as m, Crest as n, FIXTURES as o, usePulse as p, ECHOES as r, LEADERBOARD as s, CLUBS as t, RANKS as u };
