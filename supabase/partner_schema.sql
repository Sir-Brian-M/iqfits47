-- ============================================================
-- IQFIT47 — Partner Portal Schema
-- Run in Supabase SQL Editor (Project > SQL Editor > New query).
-- ============================================================

create table if not exists partners (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  email            text not null,
  phone            text not null,
  company          text,
  website          text,
  partnership_type text not null,
  message          text not null,
  status           text not null default 'pending'
    check (status in ('pending', 'reviewed', 'accepted', 'rejected')),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists partners_email_idx on partners (email);
create index if not exists partners_status_idx on partners (status);

-- updated_at trigger
drop trigger if exists partners_set_updated_at on partners;
create trigger partners_set_updated_at
  before update on partners
  for each row execute procedure set_updated_at();

-- Row Level Security
alter table partners enable row level security;

-- Only service role (server API routes) can select/insert/update/delete.
-- No public policies are added to ensure applicants cannot read each other's submissions.
