# Beyond The Match — 9-Hour Sprint Plan

Target: submitted pitch deck before **2026-10-23T00:00Z**. Demo Day **2026-11-01T20:00Z**.
Spend: **$0 until proven** (free tiers only: Neon free, Vercel Hobby, local PGlite).

## The vision we are hitting (definition of aligned)

1. **Structural, not a one-off** — a season-long participation layer, not a match-day gimmick.
2. **Persistent reputation** — points belong to a fan identity and carry across nights and the season.
3. **Real shared state** — tallies and leaderboards are real aggregates, not seeded numbers.
4. **Evidenced engagement** — the prototype emits events we can point at as KPIs.
5. **Integration story** — a documented feed adapter + SSO/broadcast/stadium surfaces.
6. **Community** — blocks ("peñas") with group standing.
7. **Monetization** — sponsored Moment, points-only (no gambling).
8. **Deck + Demo** — 5 required sections covered, live-vs-conceptual stated honestly.

## What already exists (do not rebuild)

- Ritual + club identity (`src/routes/index.tsx`), rank titles (`rank.tsx`, `RANKS`).
- Moments voting + live forecast + points (`match.tsx`, `pulse-store.ts`).
- Season arc / missions / echoes (`season.tsx`), verdict card (`verdict.tsx`).
- `board.tsx` already renders the deck's argument (KPIs, app/broadcast/stadium, sponsor, risk).
- **Dual-backend SQL is free and already works**: `src/lib/db.ts` auto-selects Neon (`DATABASE_URL`) or embedded PGlite, and auto-applies `migrations/*.sql`. Server routes work via `src/routes/api/auth/$.ts`.
- Optional Better Auth + Neon, PWA manifest/icons, i18n toggle, deploy docs.

## Architecture decision (the whole point)

**One append-only `events` table is the single source of truth** for telemetry, tallies, leaderboard, and season reputation. Everything else is a query over it. This gives us items 2–4 above with no new services, works locally on PGlite today, and flips to Neon free tier with one env var.

```
write path:  UI action -> track() -> POST /api/events -> events (PGlite | Neon)
read paths:  GET /api/tally?moment=  -> option counts
             GET /api/leaderboard?scope=global|club|pod -> season points
offline:     localStorage stays the source of truth on device; server is enrichment.
             Any API failure falls back to seeded data — demo never breaks.
```

## Phases (time boxes from 11:40 UTC; submit by 21:30, hard stop 00:00)

### P0 — Freeze + baseline (20 min)
- [ ] `git checkout -b sprint/beyond-the-match`
- [ ] `npm ci && npm run typecheck && npm run lint && npm test && npm run build`
- [ ] Record the green baseline in this file.
- DoD: all four commands pass before any edit.

### P1 — Participation core (90 min) ← highest value
- [ ] `migrations/0002_participation.sql`: `fans`, `events`, `pods`, `pod_members` (+ indexes on `events(name, created_at)`, `events(moment_id, option_id)`).
- [ ] `src/routes/api/events.ts` — `POST` insert (validated, rate-limited by fanId+minute), returns fresh tally.
- [ ] `src/routes/api/tally.ts` — `GET ?momentId=` → counts per option.
- [ ] `src/routes/api/leaderboard.ts` — `GET ?scope=&clubId=&podId=` → season top-N.
- [ ] `src/lib/telemetry.ts` — `track(name, payload)` fire-and-forget, no-op-safe.
- [ ] `src/lib/api.ts` — fetch helpers with graceful fallback.
- [ ] `pulse-store.ts`: add `fanId` (uuid, persisted), `seasonPoints`; call `track()` from `castVote`, `completeRitual`, `saveForecast`, `say`, `registerFan`.
- DoD: local (PGlite) events persist; `curl POST /api/events` then `GET /api/tally` shows the count.

### P2 — Surface it (75 min)
- [ ] `match.tsx`: option shares come from `GET /api/tally` once revealed (local share as fallback).
- [ ] `rank.tsx`: "the stand this week" reads `GET /api/leaderboard` (seeded fallback).
- [ ] `season.tsx` / `verdict.tsx`: show season reputation from `seasonPoints`.
- DoD: two browser sessions see the same tally and move the same board.

### P3 — Integration + belonging (60 min)
- [ ] `src/lib/feed/adapter.ts`: `MatchFeed` interface + `MockFeed` (wraps existing data) + `HttpFeed` stub reading `FEED_BASE_URL`/`FEED_API_KEY`. Pages keep importing the adapter's `MOMENTS`.
- [ ] Pods: create/join by invite code in `stand.tsx`; pod leaderboard via `/api/leaderboard?scope=pod`.
- DoD: adapter documented; a pod can be created, joined, and ranks.

### P4 — Harden + polish (45 min)
- [ ] Delete unused `src/lib/multiplayer/` (confirmed unreferenced).
- [ ] Verdict share card: real OG image route + copy-link.
- [ ] i18n: ES strings for the new surfaces.
- DoD: `typecheck && lint && test && build` green again.

### P5 — Free-tier deploy + proof (60 min)
- [ ] Create a **free Neon** project → `DATABASE_URL`; run `npm run db:migrate`; re-run the P1 DoD against Neon.
- [ ] Deploy to **Vercel Hobby** (owner action if no CLI token): set `DATABASE_URL`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, `VITE_APP_URL`, `VITE_AUTH_ENABLED=false`.
- [ ] Fallback if deploy is blocked: `npm run build && npm run preview` and record the demo.
- DoD: a public URL (or a recording) where a vote changes a shared tally.

### P6 — The deck (120 min) ← the actual submission
- [ ] `deck/index.html` (self-contained, 16:9 print CSS) + `deck/deck.md` + `deck/SCRIPT.md`.
- 12 slides: 1 Title · 2 Problem/Why-now · 3 The asset (not a feature) · 4 The loop + live demo · 5 In-match · 6 Community/pods · 7 Narrative metric · 8 Integration roadmap (app/broadcast/stadium/SSO/feed) · 9 Success metrics + model · 10 Monetization · 11 Risk (rights/DP/scalability/regulation) · 12 Roadmap + team + ask.
- [ ] Cover the 5 required sections explicitly (Concept, Integration, Prototype Scope, Success Metrics, Risk).
- [ ] Export `deck/LALIGA-Mosaico-Pitch.pdf` via browser Print → Save as PDF.
- DoD: PDF exists, ≤ 12 slides, every required section labelled.

### P7 — Demo + submit + buffer (90 min)
- [ ] 90-second screen recording of the loop (ritual → vote → live tally → leaderboard → verdict).
- [ ] Submit at the Ignyte challenge: upload the PDF, confirm "Pitch Deck" field accepted.
- [ ] Freeze: tag `submitted-<sha>`.
- DoD: submission confirmed; screenshot of confirmation saved.

## Cut list (if behind — cut in this order, top first)

1. Pods UI → keep the API + mark it "conceptual" in the deck.
2. `HttpFeed` → keep the interface + say "integration-ready".
3. Deploy → record locally.
4. i18n new strings.
**Never cut:** deck, telemetry/events, aggregate tally, leaderboard, verification, submission.

## Verification gates

```bash
npm run typecheck && npm run lint && npm test && npm run build
# local (PGlite)
npm run dev &
curl -s -XPOST localhost:8080/api/events -H 'content-type: application/json' \
  -d '{"momentId":"m1","optionId":"opt-a","clubId":"rma","name":"t"}'
curl -s 'localhost:8080/api/tally?momentId=m1'
curl -s 'localhost:8080/api/leaderboard?scope=global'
```

## Risk register

| Risk | Mitigation |
| --- | --- |
| Deadline (deck is the submission) | Build the deck in P6 regardless of P1–P5 state; a working deck alone can win. |
| Neon MCP scope / no Vercel token | Deploy is owner action; PGlite + recording is the fallback. |
| Submission needs a logged-in Ignyte session | Owner uploads; we prepare the exact file + checklist. |
| New routes break `build` | Keep each route tiny; re-run the gate after every phase. |
| bigint/date JSON parity | Already handled by `db.ts` type parsers. |
| Hydration with persisted store | `skipHydration: true` already set; add fanId under `partialize`. |

## Only-two-human-actions

1. Ignyte login to submit the pitch deck PDF.
2. Vercel account (or approve Neon project creation via MCP).

## Status log (UTC)

- **P0 complete** — branch `sprint/beyond-the-match`; baseline green: typecheck, lint, 5 tests, build.
- **P1 complete** — `migrations/0002_participation.sql`, `participation.server.ts`, `/api/events`, `/api/tally`, `/api/leaderboard`, `/api/me`, `/api/stats`, `/api/pods`, client `telemetry.ts` + `api.ts`, store instrumented.
  Verified on PGlite: vote inserts, duplicate vote rejected (`points:0`), live tally by option, global + club + pod leaderboards, season rank.
- **P2 complete** — live tally in `/match`, global board + season standing in `/rank`, season reputation in `/season` and `/verdict`, live event counts in `/board`. All routes 200.
- **P3 complete (adapted)** — pods: create/join/list + pod-scoped board, `PodPanel` in `/stand`. **HTTP feed adapter cut** (cut-list #2): the adapter is described as the integration contract; no speculative code.
- **P4 partial** — `typecheck`/`lint` green after every phase. Dead-code delete + share card + new i18n strings pending.
- **P5 pending** — running on the PGlite fallback (zero setup, real aggregates). Neon free tier + Vercel deploy still owner-gated.
- **P6 complete** — `deck/index.html` → `deck/LALIGA-Mosaico-Pitch.pdf` (12 pages, 16:9, verified by render). All five required sections labelled. `deck/SCRIPT.md` has the pitch, demo runbook, Q&A and submission checklist.
- **P7 rebrand** — product renamed **LALIGA Mosaico** (*Every fan is a tile. Together, the picture.*). Deck cover has a generated tile-mosaic visual; copy now uses The Moment / The Reveal / The Heat / tiles / blocks. Deck slides 6, 7, 9, 10 tightened. App `APP_NAME`, PWA manifest and all user-facing Pulse strings renamed; internals (`usePulse`, `pulse-store`, table/event names) unchanged on purpose. PDF regenerated and visually verified.

### Remaining before submit

1. Optionally: delete `src/lib/multiplayer/` (unused) and re-run the gate.
2. Owner: upload `deck/LALIGA-Mosaico-Pitch.pdf` at the Ignyte challenge before `2026-10-23T00:00Z`.
3. Optional, only if time: Neon free project + Vercel Hobby deploy for a public demo URL.
