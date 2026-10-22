import { J as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as winningOption, l as MOMENTS, m as useRank, p as usePulse } from "./crest-BkO3ta8O.mjs";
import { n as Button } from "./router-IWMqB5_W.mjs";
import { a as SectionLabel, i as Scoreboard } from "./pulse-bits-DcgHsf9r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verdict-DMGy5a5u.js
var import_jsx_runtime = require_jsx_runtime();
function Verdict() {
	const votes = usePulse((s) => s.votes);
	const points = usePulse((s) => s.points);
	const feel = usePulse((s) => s.feel);
	const focusPlayer = usePulse((s) => s.focusPlayer);
	const rank = useRank();
	const motm = MOMENTS.find((m) => m.id === "motm");
	const motmWin = winningOption(motm);
	const calls = MOMENTS.filter((m) => votes[m.id]).length;
	const withStand = MOMENTS.filter((m) => {
		const v = votes[m.id];
		return v && v === winningOption(m).id;
	}).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "After the whistle" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl tracking-tight",
					children: "The night, in the book"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm text-muted",
					children: "The Official Fan Verdict is not a recap. It is what the stand called, kept."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scoreboard, {
				minuteLabel: "FT",
				live: false,
				homeScore: 1,
				awayScore: 1
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overflow-hidden rounded-xl border border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/terrace.jpg",
					alt: "",
					className: "h-40 w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-surface p-5 sm:p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Official Fan Verdict" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 max-w-2xl text-lg",
							children: [
								"A draw that felt like a cup tie. The stand named ",
								motmWin.label,
								" as the one who ran the night. Mandate from the tunnel still hangs over the right flank."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: motm.narrative[motmWin.id]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Your calls",
						value: `${calls}/${MOMENTS.length}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "With the stand",
						value: String(withStand)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Pulse points",
						value: String(points)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Your match trace" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3",
						children: MOMENTS.map((m) => {
							const v = votes[m.id];
							const opt = m.options.find((o) => o.id === v);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex flex-col gap-1 border-b border-border py-3 last:border-0 sm:flex-row sm:items-baseline sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-xs tracking-widest text-muted uppercase",
									children: [
										m.minuteLabel,
										" · ",
										m.heading
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: opt ? opt.label : "You let this one go"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: opt ? opt.call : "—"
								})]
							}, m.id);
						})
					}),
					(feel || focusPlayer) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm text-muted",
						children: [
							"You came in ",
							feel ?? "quiet",
							", watching ",
							focusPlayer ?? "the whole pitch",
							". That is now part of how you remember this night."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Standing" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-2xl",
						children: rank.current.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: rank.current.copy
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/rank",
							children: "See your rank"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/season",
							children: "Between matchdays"
						})
					})]
				})]
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-wide text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-display text-3xl tabular-nums",
			children: value
		})]
	});
}
//#endregion
export { Verdict as component };
