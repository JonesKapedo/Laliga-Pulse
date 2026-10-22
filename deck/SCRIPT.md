# LALIGA Mosaico — pitch & demo runbook

## Files

- `deck/index.html` — source (self-contained, 16:9 print CSS)
- `deck/LALIGA-Mosaico-Pitch.pdf` — **the submission file** (12 pages)
- Regenerate: `chromium --headless --no-sandbox --no-pdf-header-footer --print-to-pdf=deck/LALIGA-Mosaico-Pitch.pdf deck/index.html`
  (snap Chromium cannot read `/tmp`; copy the HTML to `$HOME` and print from there)

## The brand, in one breath

A **mosaic** is the one fan artefact that only exists if everyone takes part: one tile is
nothing, the whole stand is a picture. So the product is a mosaic. Every call a fan makes
lands as a **tile** in a record that is theirs; at full time the stand's calls resolve into
**The Reveal**. The league reads the crowd as **The Heat** — temperature, pressure, how
settled the stand is. Small groups are **blocks**, because a block is a handful of tiles.

- Wordmark: `LALIGA MOSAICO` (the O can be set as a tile)
- Line: **Every fan is a tile. Together, the picture.**
- CTA: **Take your tile.**

## Required brief sections → slide

| Brief requirement | Slide |
| --- | --- |
| Concept Summary (area + how it works) | 3, 4 |
| Integration Plan | 8 |
| Prototype Scope (live vs conceptual) | 5 |
| Success Metrics (KPIs + evidence) | 9 |
| Risk Mitigation (deployment, rights, data, regulation) | 11 |

## 3-minute pitch (say it in this order)

1. **Hook (15s).** "A mosaic only works if every fan places a tile. Football has 90 minutes of attention and never gives fans a tile to place. So we made the season the mosaic."
2. **Problem (30s).** One-off activations don't compound; no identity, no Tuesday. The brief asked for structure — this is the structure.
3. **Concept (30s).** A season-long reputation layer. Predict → Play → Prove → Progress → Belong. Every call is a tile; the season is the picture. Points only, no wagering.
4. **Demo (60s).** Run the live loop (below). Say "this is not a mock — the tally is a real aggregate from Postgres."
5. **Integration (30s).** App tab + SSO, broadcast lower-third, stadium ribbon, feed adapter, ES → LATAM → MENA.
6. **Metrics & model (20s).** North star WAP; every action is an event row, so every KPI is measurable in the pilot.
7. **Ask (15s).** One club, one matchday, feed + SSO. "Give fans something to do with the 90 minutes — and a reason to come back on Tuesday."

## 90-second demo runbook

| Step | Do | Say |
| --- | --- | --- |
| 1 | `/` → pick a feeling + player → "I am here for the ninety" | "The ritual. Identity before kick-off, not a form." |
| 2 | `/match` → vote a Moment | "One call per fan. Watch the stand answer." |
| 3 | After the reveal | "The percentage is live from the events table — and it's aggregate, never a named fan." |
| 4 | `/stand` → create block "La Grada", note the code | "A block is your row: a bar, a group chat, a city." |
| 5 | Incognito / second browser → join with the code | "Now the block has its own standing across the season." |
| 6 | `/rank` | "Tiles accumulate. Season reputation and rank persist between matches." |
| 7 | `/board` | "Live event counts, integration, unit economics, and the risk we've closed." |
| 8 | `/verdict` | "The Reveal: the stand's night as one shareable picture. The league's voice leaving the app." |

Fallbacks: if the backend is down the app still runs on localStorage — say "offline-tolerant by design."

## Judge Q&A prep

- **"Isn't this just a poll?"** A poll is one moment. This is an append-only reputation ledger across the season, with community and a monetisable narrative metric.
- **"Why mosaic?"** Because it is the only fan artefact that needs everyone: one tile is nothing, the full stand is a picture. The mechanic *is* the brand.
- **"Is this gambling?"** No. Points only: no stakes, odds, or cash-out. Deliberate to stay outside gambling regulation.
- **"Why won't LALIGA build it?"** They can — we're the pilot-ready execution: a working loop, a feed contract, and a 90-day plan. The ask is one club and one matchday.
- **"Data privacy?"** Pseudonymous fan id, minimisation, age gate, defined retention, aggregate-only broadcast output; GDPR + UAE PDPL.
- **"Cold start?"** The loop works with zero community mass (personal reputation first); blocks and club boards activate as density grows.
- **"Revenue?"** Sponsored moments, block sponsorship, season partner — attached to attention, capped ad load, sponsor never touches questions or results.
- **"Scalability?"** Edge delivery, event-driven writes, Postgres + cache, load model for matchday peaks, scale-to-zero until proven.

## Submission checklist (the only deadline that matters)

- [ ] `deck/LALIGA-Mosaico-Pitch.pdf` exists (12 pages, 16:9)
- [ ] Log in at `https://challenges.ignyte.ae/competition/90A48903-52B6-F111-A6A7-0022486A2D73`
- [ ] Upload the PDF to the required **Pitch Deck** field
- [ ] Submit before **2026-10-23T00:00Z**
- [ ] Save the confirmation screenshot

## Honesty notes (keep them in)

- Slide 9 figures are **modelled**, explicitly labelled. Do not present them as traction.
- Slides 5 and 8 label conceptual integration as conceptual. Do not claim a LALIGA feed or SSO exists.
- The live claims are true: real Postgres schema, aggregate tallies, dedupe, season reputation, blocks, leaderboards.
