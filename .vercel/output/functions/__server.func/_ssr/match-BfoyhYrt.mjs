import { i as __toESM } from "../_runtime.mjs";
import { J as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as FEED, f as cn, h as winningOption, l as MOMENTS, p as usePulse } from "./crest-BkO3ta8O.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Button } from "./router-IWMqB5_W.mjs";
import { a as SectionLabel, i as Scoreboard, n as Heartbeat, r as Meter } from "./pulse-bits-DcgHsf9r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/match-BfoyhYrt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MatchRoom() {
	const momentIndex = usePulse((s) => s.momentIndex);
	const votes = usePulse((s) => s.votes);
	const revealed = usePulse((s) => s.revealed);
	const castVote = usePulse((s) => s.castVote);
	const nextMoment = usePulse((s) => s.nextMoment);
	const temperature = usePulse((s) => s.temperature);
	const pressure = usePulse((s) => s.pressure);
	const emotions = usePulse((s) => s.emotions);
	const pushEmotion = usePulse((s) => s.pushEmotion);
	const phase = usePulse((s) => s.phase);
	const moment = MOMENTS[momentIndex];
	const voted = votes[moment.id];
	const showResult = revealed.includes(moment.id);
	const winner = winningOption(moment);
	const live = phase === "live";
	const scores = (0, import_react.useMemo)(() => {
		if (moment.minute < 12) return {
			home: 0,
			away: 0
		};
		if (moment.minute < 64) return {
			home: 1,
			away: 0
		};
		return {
			home: 1,
			away: 1
		};
	}, [moment.minute]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scoreboard, {
				minuteLabel: moment.minuteLabel,
				live,
				homeScore: scores.home,
				awayScore: scores.away
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-border bg-surface p-5 sm:p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionLabel, { children: ["Pulse moment · ", moment.minuteLabel] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border border-border px-2.5 py-1 text-[11px] tracking-wide text-muted uppercase",
							children: moment.heading
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-3xl tracking-tight sm:text-4xl",
						children: moment.question
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-prose text-sm text-muted",
						children: moment.note
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 space-y-2",
						children: moment.options.map((opt) => {
							const selected = voted === opt.id;
							const pct = showResult ? opt.share : 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: Boolean(voted),
								onClick: () => {
									castVote(moment.id, opt.id);
									toast(opt.call);
								},
								className: cn("w-full overflow-hidden rounded-lg border px-4 py-3 text-left transition-colors duration-150", selected ? "border-fg bg-raised" : "border-border hover:bg-raised/60", voted && !selected && "opacity-70"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: opt.label
										}), showResult && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-display text-sm tabular-nums",
											children: [pct, "%"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted",
										children: opt.call
									}),
									showResult && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 h-1 overflow-hidden rounded-full bg-bg",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: cn("h-full rounded-full transition-[width] duration-500", opt.id === winner.id ? "bg-accent" : "bg-faint"),
											style: { width: `${pct}%` }
										})
									})
								]
							}, opt.id);
						})
					}),
					showResult && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-lg bg-raised p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Official Fan Pulse" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm",
								children: moment.narrative[winner.id]
							}),
							voted && voted !== winner.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted",
								children: "You went your own way. That still counts — the stand is not a chorus of one note."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-2",
						children: [momentIndex < MOMENTS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: nextMoment,
							children: "Next moment in the ninety"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/verdict",
								children: "Open the verdict"
							})
						}), phase === "whistle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/verdict",
								children: "After the whistle"
							})
						})]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Heartbeat of the stand" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 text-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heartbeat, { points: emotions })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Emotional temperature",
							value: temperature
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Pressure",
							value: pressure
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-muted",
						children: "How are you right now?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid grid-cols-4 gap-1.5",
						children: [
							{
								l: "Ice",
								v: 22
							},
							{
								l: "Set",
								v: 48
							},
							{
								l: "Up",
								v: 72
							},
							{
								l: "Roar",
								v: 92
							}
						].map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => pushEmotion(e.v),
							className: "min-h-11 rounded-md border border-border text-xs hover:bg-raised",
							children: e.l
						}, e.l))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "From the rows" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-3",
					children: FEED.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: f.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: f.text })]
					}, f.name))
				})]
			})]
		})]
	});
}
//#endregion
export { MatchRoom as component };
