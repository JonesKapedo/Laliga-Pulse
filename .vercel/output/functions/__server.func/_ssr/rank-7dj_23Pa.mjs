import { J as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as cn, m as useRank, n as Crest, p as usePulse, s as LEADERBOARD, t as CLUBS, u as RANKS } from "./crest-BkO3ta8O.mjs";
import { a as SectionLabel } from "./pulse-bits-DcgHsf9r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rank-7dj_23Pa.js
var import_jsx_runtime = require_jsx_runtime();
function RankPage() {
	const points = usePulse((s) => s.points);
	const name = usePulse((s) => s.name);
	const setName = usePulse((s) => s.setName);
	const clubId = usePulse((s) => s.clubId);
	const rank = useRank();
	const board = LEADERBOARD.map((row) => row.you ? {
		...row,
		name,
		club: clubId,
		points,
		title: rank.current.title
	} : row).sort((a, b) => b.points - a.points);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Your name in this league" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl tracking-tight",
					children: rank.current.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm text-muted",
					children: rank.current.copy
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-5 sm:p-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crest, {
							clubId,
							size: 52
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted",
							htmlFor: "fan-name",
							children: "How the stand knows you"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "fan-name",
							value: name,
							onChange: (e) => setName(e.target.value),
							className: "mt-1 block w-48 rounded-md border border-border bg-raised px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide text-muted uppercase",
							children: "Pulse points"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl tabular-nums",
							children: points
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex justify-between text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: rank.current.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: rank.next ? rank.next.title : "Top of the stand" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 overflow-hidden rounded-full bg-raised",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-accent transition-[width] duration-500",
							style: { width: `${Math.round(rank.progress * 100)}%` }
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "How standing is earned" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm text-muted",
					children: "Not bought. Not gambled. You show up, you call the night, you stay between matchdays. That is the only way the terrace promotes you."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 grid gap-3 sm:grid-cols-2",
					children: RANKS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: cn("rounded-lg border p-4", r.title === rank.current.title ? "border-fg bg-surface" : "border-border bg-surface/60"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg",
								children: r.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted tabular-nums",
								children: [r.min, "+ points"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: r.copy
							})
						]
					}, r.title))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "The stand this week" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface",
				children: board.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: cn("flex items-center gap-3 px-4 py-3", row.you && "bg-raised"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-6 font-display text-sm tabular-nums text-muted",
							children: i + 1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crest, {
							clubId: row.club,
							size: 28
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate font-medium",
								children: [row.name, row.you ? " · you" : ""]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									row.title,
									" · ",
									CLUBS[row.club].short
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display tabular-nums",
							children: row.points
						})
					]
				}, row.name + i))
			})] })
		]
	});
}
//#endregion
export { RankPage as component };
