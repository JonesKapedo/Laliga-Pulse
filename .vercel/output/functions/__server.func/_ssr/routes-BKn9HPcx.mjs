import { i as __toESM } from "../_runtime.mjs";
import { J as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as SEASON_ARC, i as FEATURED, n as Crest, o as FIXTURES, p as usePulse, t as CLUBS } from "./crest-BkO3ta8O.mjs";
import { c as ArrowRight, s as Check } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Button } from "./router-IWMqB5_W.mjs";
import { a as SectionLabel, r as Meter, t as GravityMark } from "./pulse-bits-DcgHsf9r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BKn9HPcx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FEELS = [
	{
		id: "hungry",
		label: "Hungry",
		line: "We take this."
	},
	{
		id: "nervous",
		label: "Tight",
		line: "Nights like this bite."
	},
	{
		id: "calm",
		label: "Calm",
		line: "Trust the work."
	},
	{
		id: "loud",
		label: "Loud",
		line: "Make them hear us."
	}
];
var FOCUS = [
	"Bellingham",
	"Vinícius",
	"Mbappé",
	"Valverde",
	"Courtois"
];
function Home() {
	const ritualDone = usePulse((s) => s.ritualDone);
	const completeRitual = usePulse((s) => s.completeRitual);
	const feel = usePulse((s) => s.feel);
	const focusPlayer = usePulse((s) => s.focusPlayer);
	const clubId = usePulse((s) => s.clubId);
	const setClub = usePulse((s) => s.setClub);
	const temperature = usePulse((s) => s.temperature);
	const [pickFeel, setPickFeel] = (0, import_react.useState)("hungry");
	const [pickFocus, setPickFocus] = (0, import_react.useState)(FOCUS[0]);
	const home = CLUBS[FEATURED.home];
	const away = CLUBS[FEATURED.away];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overflow-hidden rounded-xl border border-border bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/stadium-night.jpg",
						alt: "",
						className: "h-52 w-full object-cover sm:h-72"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-t from-surface via-bg/20 to-transparent" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionLabel, { children: ["Tonight · ", FEATURED.venue] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap items-end justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "font-display text-4xl tracking-tight sm:text-6xl",
								children: [
									home.short,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: "v"
									}),
									" ",
									away.short
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-xl text-sm text-muted sm:text-base",
								children: FEATURED.story
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GravityMark, { value: FEATURED.gravity })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/match",
									children: ["Enter the Pulse Room ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/season",
									children: "The season arc"
								})
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-surface p-5 lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Before they walk out" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-2xl",
							children: "The ritual"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-prose text-sm text-muted",
							children: "Same as pulling on the shirt. Set the night, name who you are watching, then step into the ninety with the stand."
						}),
						ritualDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex items-start gap-3 rounded-lg bg-raised p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 flex size-8 items-center justify-center rounded-full bg-pitch/20 text-pitch",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "You are in the tunnel."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [
									"Feeling ",
									feel,
									". Eyes on ",
									focusPlayer,
									". The night is on."
								]
							})] })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 text-xs tracking-wide text-muted uppercase",
									children: "How do you come into this"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
									children: FEELS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setPickFeel(f.id),
										className: `min-h-11 rounded-md border px-3 py-2 text-left text-sm transition-colors duration-150 ${pickFeel === f.id ? "border-fg bg-raised" : "border-border hover:border-faint"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block font-medium",
											children: f.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted",
											children: f.line
										})]
									}, f.id))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 text-xs tracking-wide text-muted uppercase",
									children: "Who are you watching"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2",
									children: FOCUS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setPickFocus(p),
										className: `min-h-11 rounded-full border px-4 text-sm ${pickFocus === p ? "border-fg bg-raised" : "border-border hover:border-faint"}`,
										children: p
									}, p))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => {
										completeRitual(pickFeel, pickFocus);
										toast("You are in the tunnel. See you at kick-off.");
									},
									children: "I am here for the ninety"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-surface p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "The two stands" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
									label: `${home.short} energy`,
									value: 72 + (ritualDone ? 8 : 0)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
									label: `${away.short} energy`,
									value: 68,
									tone: "pitch"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
									label: "Match temperature",
									value: temperature
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-surface p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Your shirt" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: "Pulse follows the club you walk with. This is identity, not a bet."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 grid grid-cols-4 gap-2",
								children: Object.keys(CLUBS).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setClub(id),
									className: `flex flex-col items-center gap-1 rounded-md border p-2 ${clubId === id ? "border-fg" : "border-border"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crest, {
										clubId: id,
										size: 28
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted",
										children: CLUBS[id].short
									})]
								}, id))
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Rest of the round" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface",
				children: FIXTURES.map((fx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crest, {
								clubId: fx.home,
								size: 32
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-sm",
								children: CLUBS[fx.home].short
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "v"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-sm",
								children: CLUBS[fx.away].short
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crest, {
								clubId: fx.away,
								size: 32
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tabular-nums",
							children: fx.kickoff
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Gravity ", fx.gravity] })]
					})]
				}, fx.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-5 sm:p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "This season’s thread" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl",
						children: "The table does not sleep"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 grid gap-4 sm:grid-cols-2",
						children: SEASON_ARC.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-lg bg-raised p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-xs tracking-widest text-muted uppercase",
									children: s.week
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1 font-display text-lg",
									children: s.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: s.body
								})
							]
						}, s.week))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "mt-5",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/season",
							children: "Open the season"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid gap-4 md:grid-cols-3",
				children: [
					{
						t: "Call the night",
						d: "Timed moments through the ninety. One voice. Official Fan Pulse."
					},
					{
						t: "Belong to the stand",
						d: "Rank, circles, and a name in this league that lasts past full-time."
					},
					{
						t: "Still here on Tuesday",
						d: "Arcs, echoes, and the week’s work — so the product lives between matchdays."
					}
				].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-border bg-surface p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl",
						children: b.t
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: b.d
					})]
				}, b.t))
			})
		]
	});
}
//#endregion
export { Home as component };
