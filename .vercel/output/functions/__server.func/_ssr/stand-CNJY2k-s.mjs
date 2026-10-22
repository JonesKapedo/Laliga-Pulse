import { i as __toESM } from "../_runtime.mjs";
import { J as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as Crest, p as usePulse, t as CLUBS } from "./crest-BkO3ta8O.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Button } from "./router-IWMqB5_W.mjs";
import { a as SectionLabel } from "./pulse-bits-DcgHsf9r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stand-CNJY2k-s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CIRCLE = [
	{
		name: "Marta",
		club: "rma",
		line: "See it to the break."
	},
	{
		name: "Iker",
		club: "rma",
		line: "Valverde from the off."
	},
	{
		name: "Nerea",
		club: "rma",
		line: "Push. Don't sit in."
	},
	{
		name: "Diego",
		club: "atm",
		line: "Watching from the other side of the city."
	}
];
var RIVAL = [{
	name: "Pol",
	club: "fcb",
	line: "Play. The night is ours."
}, {
	name: "Aina",
	club: "fcb",
	line: "Every ball to Yamal."
}];
function StandPage() {
	const clubId = usePulse((s) => s.clubId);
	const [joined, setJoined] = (0, import_react.useState)(true);
	const club = CLUBS[clubId];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "The stand" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl tracking-tight",
					children: club.nickname
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm text-muted",
					children: "Not a comment thread. A room that watches together, calls together, and still talks after the whistle — including with the other lot, when the night allows it."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Watch circle · Chamberí"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "12 in. Kick-off in this room is a ritual."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: joined ? "outline" : "default",
						onClick: () => {
							setJoined((v) => !v);
							toast(joined ? "You stepped out. The row keeps your seat." : "You're in the row.");
						},
						children: joined ? "In the row" : "Take a seat"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 divide-y divide-border",
					children: CIRCLE.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crest, {
							clubId: p.club,
							size: 32
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: p.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: p.line
						})] })]
					}, p.name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Rivalry ignition" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl",
						children: "The other stand"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-prose text-sm text-muted",
						children: "Before kick-off, both rooms send a call across. No abuse. Football talk. Winner is the room that called the night more cleanly."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3",
						children: RIVAL.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 rounded-lg bg-raised px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crest, {
								clubId: p.club,
								size: 32
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: p.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: p.line
							})] })]
						}, p.name))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						variant: "outline",
						onClick: () => toast("Call sent. Their room has it."),
						children: "Send our call across"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/match",
					children: "Watch with the circle"
				})
			})
		]
	});
}
//#endregion
export { StandPage as component };
