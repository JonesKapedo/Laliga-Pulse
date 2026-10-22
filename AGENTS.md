# Project guide

LALIGA Pulse is a standalone fan-engagement prototype built with TanStack Start
(React 19), Tailwind CSS v4, Zustand, and optional Better Auth + Postgres. It
must remain deployable with no platform-specific runtime services.

## Commands

- `npm run dev` — dev server on `0.0.0.0:8080`
- `npm run build` — production build, then apply pending SQL migrations
- `npm run typecheck` — TypeScript
- `npm run lint` — ESLint
- `npm test` — unit tests
- `npm run db:migrate` — apply `migrations/*.sql` to `DATABASE_URL`

Always run `npm run typecheck` and `npm run lint` after code changes.

## Architecture

- `src/routes/` — TanStack file routes. `__root.tsx` owns the document shell,
  static PWA/OG metadata and global providers.
- `src/data/` — static LALIGA fixtures, clubs, players and season narrative.
- `src/store/pulse-store.ts` — client state, persisted to `localStorage`. The app
  works with no backend and no account.
- `src/lib/auth/` — optional Better Auth. Standard OAuth providers (Google, X,
  GitHub) are enabled only when their credentials are present. Never import
  `server.ts` from client code; use `client.ts`, `use-current-user.ts`, and
  `middleware.ts`.
- `src/lib/db.ts` — server-only SQL client. Uses `DATABASE_URL` (Neon) when set,
  otherwise an embedded PGlite instance for local development.
- `migrations/` — the single schema source of truth. Add new ordered files
  (`0002_*.sql`) instead of editing applied ones.
- `public/` — static manifest, icons, images and `og.jpg`.

## Environment

See `.env.example`. Keep configuration provider-neutral: `DATABASE_URL`,
`BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, `VITE_APP_URL`, provider client
credentials. Do not commit secrets.

## Conventions

- TypeScript strict; no `any` unless the surrounding code already needs it.
- Follow existing component and styling patterns (Tailwind utility classes,
  `cn()` helper, Radix primitives in `src/components/ui`).
- Do not add comments unless they explain a non-obvious constraint.
- Keep the deploy target Vercel (Nitro `vercel` preset) and Neon compatible.

## Deployment

`npm run build` runs migrations when `DATABASE_URL` is present. On Vercel, set
`DATABASE_URL`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, and `VITE_APP_URL`.
OAuth redirect URIs must point at `<BETTER_AUTH_URL>/api/auth/callback/<provider>`.
