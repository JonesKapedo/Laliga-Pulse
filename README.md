# LALIGA Pulse

A fan-engagement prototype for the **LALIGA Beyond The Match Challenge** (Ignyte). Pulse turns a match night into a shared ritual: call how the night feels, back your club, register your presence, and watch the stand's collective pulse move in real time.

Built with TanStack Start, React 19, Tailwind CSS, and Zustand. Data lives in the browser (`localStorage`); the optional auth/database layer uses Better Auth + Postgres (Neon) or an embedded PGlite fallback for local development.

## Run locally

```bash
npm install
cp .env.example .env   # optional; the app runs without it
npm run dev            # http://localhost:8080
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server on `0.0.0.0:8080` |
| `npm run build` | Production build + apply pending migrations |
| `npm run preview` | Preview the production build |
| `npm run db:migrate` | Apply `migrations/*.sql` to `DATABASE_URL` |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm test` | Unit tests |

## Environment

All configuration is standard and provider-neutral. See `.env.example`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `BETTER_AUTH_URL` | Production | Public origin used for OAuth callbacks |
| `BETTER_AUTH_SECRET` | Production | Session signing secret (`openssl rand -hex 32`) |
| `DATABASE_URL` | No | Postgres/Neon connection; omitted -> embedded PGlite |
| `VITE_APP_URL` | No | Absolute URL used for Open Graph images |
| `VITE_AUTH_ENABLED` | No | `false` disables sign-in (dev user fallback) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | No | Google sign-in |
| `TWITTER_CLIENT_ID` / `TWITTER_CLIENT_SECRET` | No | X sign-in |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | No | GitHub sign-in |

Sign-in is optional and off unless at least one provider credential pair is set. The current UI does not require an account.

## Deploy to Vercel + Neon

1. Push this repository to GitHub.
2. Import it into Vercel. The Nitro `vercel` preset is already configured.
3. Create a Neon project and copy its pooled connection string.
4. Add the environment variables above in Vercel (at minimum `DATABASE_URL`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, `VITE_APP_URL`).
5. Deploy. The build runs `npm run db:migrate`, which creates the Better Auth tables on Neon.
6. For OAuth, add `<BETTER_AUTH_URL>/api/auth/callback/<provider>` as an authorized redirect URI in each provider console.

## Project layout

```
src/routes/          App routes (home, match, stand, season, rank, board, verdict)
src/components/      UI components
src/data/            Fixtures, clubs, players, season narrative
src/store/           Zustand store (localStorage persistence)
src/lib/auth/        Optional Better Auth (standard OAuth providers)
migrations/          SQL schema (Better Auth)
scripts/             Migration tooling
public/              Static assets, manifest, icons, OG image
```

## Challenge context

The prototype targets the four opportunity areas of the LALIGA Beyond The Match Challenge: in-match participation, community, data and storytelling, and extended experiences (rankings, missions, challenges).
