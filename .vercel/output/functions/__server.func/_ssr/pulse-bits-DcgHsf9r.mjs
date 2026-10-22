import { J as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as cn, i as FEATURED, n as Crest, t as CLUBS } from "./crest-BkO3ta8O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pulse-bits-DcgHsf9r.js
var import_jsx_runtime = require_jsx_runtime();
function GravityMark({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "inline-flex items-center gap-2 rounded-full border border-border bg-raised px-3 py-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-[10px] tracking-[0.18em] text-muted uppercase",
			children: "Gravity"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-sm tabular-nums",
			children: value
		})]
	});
}
function Scoreboard({ minuteLabel, home = FEATURED.home, away = FEATURED.away, homeScore = 1, awayScore = 1, live = true }) {
	const h = CLUBS[home];
	const a = CLUBS[away];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-xl border border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-border px-4 py-2 text-[11px] tracking-[0.16em] text-muted uppercase",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["LALIGA EA SPORTS · ", FEATURED.round] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-2 font-display tabular-nums",
				children: [live && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-accent" }), minuteLabel]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crest, {
						clubId: home,
						size: 44
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg leading-none tracking-wide",
						children: h.short
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 hidden text-xs text-muted sm:block",
						children: h.name
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-4xl tracking-tight tabular-nums",
					children: [
						homeScore,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mx-1 text-muted",
							children: "–"
						}),
						awayScore
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-end gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg leading-none tracking-wide",
							children: a.short
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 hidden text-xs text-muted sm:block",
							children: a.name
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crest, {
						clubId: away,
						size: 44
					})]
				})
			]
		})]
	});
}
function Meter({ label, value, tone = "accent" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1.5 flex items-center justify-between text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tracking-wide text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display tabular-nums",
			children: Math.round(value)
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-1.5 overflow-hidden rounded-full bg-raised",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full transition-[width] duration-500 ease-out", tone === "pitch" ? "bg-pitch" : "bg-accent"),
			style: { width: `${Math.max(4, Math.min(100, value))}%` }
		})
	})] });
}
function Heartbeat({ points }) {
	const max = 100;
	const w = 320;
	const h = 64;
	const step = points.length > 1 ? w / (points.length - 1) : w;
	const d = points.map((p, i) => {
		const x = i * step;
		const y = h - p.value / max * 56 - 4;
		return `${i === 0 ? "M" : "L"} ${x} ${y}`;
	}).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: `0 0 ${w} ${h}`,
		className: "h-16 w-full",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d,
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			className: "text-accent"
		})
	});
}
function SectionLabel({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-display text-[11px] tracking-[0.22em] text-muted uppercase",
		children
	});
}
//#endregion
export { SectionLabel as a, Scoreboard as i, Heartbeat as n, Meter as r, GravityMark as t };
