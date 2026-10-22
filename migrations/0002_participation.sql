-- Participation core for LALIGA Mosaico.
--
-- One append-only `events` table is the single source of truth for live tallies,
-- the season leaderboard, reputation, and the engagement telemetry the pitch
-- deck cites. Everything else here is identity/community around it.

create table if not exists fans (
  id text primary key,
  handle text,
  club_id text,
  created_at timestamptz not null default now()
);

create table if not exists events (
  id bigserial primary key,
  fan_id text references fans(id) on delete set null,
  name text not null,
  moment_id text,
  option_id text,
  club_id text,
  value numeric,
  points integer not null default 0,
  created_at timestamptz not null default now()
);

-- Live tally: counts per option for one moment.
create index if not exists events_moment_idx on events (moment_id, option_id)
  where name = 'vote';

-- Season board + telemetry scans.
create index if not exists events_season_idx on events (created_at, name);
create index if not exists events_fan_idx on events (fan_id, created_at);

-- One vote per fan per moment (defence against double counting in the demo).
create unique index if not exists events_one_vote_per_fan
  on events (fan_id, moment_id)
  where name = 'vote' and fan_id is not null;

create table if not exists pods (
  id text primary key,
  code text unique not null,
  name text not null,
  club_id text,
  created_at timestamptz not null default now()
);

create table if not exists pod_members (
  pod_id text not null references pods(id) on delete cascade,
  fan_id text not null,
  handle text,
  joined_at timestamptz not null default now(),
  primary key (pod_id, fan_id)
);

create index if not exists pod_members_fan_idx on pod_members (fan_id);
