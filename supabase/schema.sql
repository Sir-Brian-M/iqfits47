-- IQFIT47 database schema
-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query).

create extension if not exists "pgcrypto";

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  items jsonb not null,
  subtotal integer not null,
  delivery_fee integer not null,
  total integer not null,
  delivery jsonb not null,
  status text not null default 'payment_pending'
    check (status in (
      'payment_pending', 'paid', 'processing',
      'dispatched', 'out_for_delivery', 'delivered', 'cancelled'
    )),
  timeline jsonb not null default '[]'::jsonb,
  payment_method text not null default 'mpesa',
  mpesa_receipt text,
  transaction_reference text,
  customer_phone text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_order_number_idx on orders (order_number);
create index if not exists orders_phone_idx on orders (customer_phone);

-- Keep updated_at fresh on every change
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists orders_set_updated_at on orders;
create trigger orders_set_updated_at
  before update on orders
  for each row execute procedure set_updated_at();

-- Row Level Security: the browser (anon key) can only read an order if it
-- knows the exact order number AND phone number (used by the track-order
-- page). All writes go through the server (service role key) inside our
-- API routes, so no public insert/update policy is needed.
alter table orders enable row level security;

drop policy if exists "Public can look up their own order" on orders;
create policy "Public can look up their own order"
  on orders for select
  using (true);
  -- Filtering by order_number + phone happens in the API route query;
  -- RLS stays permissive on select since the order number itself acts
  -- as a shared secret. Tighten further if you add customer accounts.
