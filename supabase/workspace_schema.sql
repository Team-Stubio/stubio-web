-- Run this in Supabase SQL Editor.
-- It creates the workspace schema with strict per-user Row Level Security.

create extension if not exists pgcrypto;

create table if not exists public.client_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  company_name text,
  timezone text not null default 'Europe/Copenhagen',
  created_at timestamptz not null default now()
);

create table if not exists public.client_overview (
  user_id uuid primary key references auth.users(id) on delete cascade,
  project_status text,
  next_milestone text,
  next_milestone_date date,
  last_update text,
  updated_at timestamptz not null default now()
);

create table if not exists public.workspace_resources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  category text,
  doc_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.payment_receipts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  receipt_url text not null,
  issued_at date not null default current_date,
  amount numeric(12,2),
  currency text,
  created_at timestamptz not null default now()
);

create table if not exists public.upcoming_payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  description text not null,
  amount numeric(12,2) not null,
  currency text not null default 'EUR',
  due_date date not null,
  status text not null check (status in ('scheduled', 'pending', 'paid', 'overdue')),
  created_at timestamptz not null default now()
);

create index if not exists idx_workspace_resources_user_created
  on public.workspace_resources (user_id, created_at desc);

create index if not exists idx_payment_receipts_user_issued
  on public.payment_receipts (user_id, issued_at desc);

create index if not exists idx_upcoming_payments_user_due
  on public.upcoming_payments (user_id, due_date asc);

alter table public.client_profiles enable row level security;
alter table public.client_overview enable row level security;
alter table public.workspace_resources enable row level security;
alter table public.payment_receipts enable row level security;
alter table public.upcoming_payments enable row level security;

drop policy if exists "client_profiles_select_own" on public.client_profiles;
drop policy if exists "client_profiles_insert_own" on public.client_profiles;
drop policy if exists "client_profiles_update_own" on public.client_profiles;
drop policy if exists "client_profiles_delete_own" on public.client_profiles;

create policy "client_profiles_select_own"
  on public.client_profiles for select
  using (auth.uid() = user_id);

create policy "client_profiles_insert_own"
  on public.client_profiles for insert
  with check (auth.uid() = user_id);

create policy "client_profiles_update_own"
  on public.client_profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "client_profiles_delete_own"
  on public.client_profiles for delete
  using (auth.uid() = user_id);

drop policy if exists "client_overview_select_own" on public.client_overview;
drop policy if exists "client_overview_insert_own" on public.client_overview;
drop policy if exists "client_overview_update_own" on public.client_overview;
drop policy if exists "client_overview_delete_own" on public.client_overview;

create policy "client_overview_select_own"
  on public.client_overview for select
  using (auth.uid() = user_id);

create policy "client_overview_insert_own"
  on public.client_overview for insert
  with check (auth.uid() = user_id);

create policy "client_overview_update_own"
  on public.client_overview for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "client_overview_delete_own"
  on public.client_overview for delete
  using (auth.uid() = user_id);

drop policy if exists "workspace_resources_select_own" on public.workspace_resources;
drop policy if exists "workspace_resources_insert_own" on public.workspace_resources;
drop policy if exists "workspace_resources_update_own" on public.workspace_resources;
drop policy if exists "workspace_resources_delete_own" on public.workspace_resources;

create policy "workspace_resources_select_own"
  on public.workspace_resources for select
  using (auth.uid() = user_id);

create policy "workspace_resources_insert_own"
  on public.workspace_resources for insert
  with check (auth.uid() = user_id);

create policy "workspace_resources_update_own"
  on public.workspace_resources for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "workspace_resources_delete_own"
  on public.workspace_resources for delete
  using (auth.uid() = user_id);

drop policy if exists "payment_receipts_select_own" on public.payment_receipts;
drop policy if exists "payment_receipts_insert_own" on public.payment_receipts;
drop policy if exists "payment_receipts_update_own" on public.payment_receipts;
drop policy if exists "payment_receipts_delete_own" on public.payment_receipts;

create policy "payment_receipts_select_own"
  on public.payment_receipts for select
  using (auth.uid() = user_id);

create policy "payment_receipts_insert_own"
  on public.payment_receipts for insert
  with check (auth.uid() = user_id);

create policy "payment_receipts_update_own"
  on public.payment_receipts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "payment_receipts_delete_own"
  on public.payment_receipts for delete
  using (auth.uid() = user_id);

drop policy if exists "upcoming_payments_select_own" on public.upcoming_payments;
drop policy if exists "upcoming_payments_insert_own" on public.upcoming_payments;
drop policy if exists "upcoming_payments_update_own" on public.upcoming_payments;
drop policy if exists "upcoming_payments_delete_own" on public.upcoming_payments;

create policy "upcoming_payments_select_own"
  on public.upcoming_payments for select
  using (auth.uid() = user_id);

create policy "upcoming_payments_insert_own"
  on public.upcoming_payments for insert
  with check (auth.uid() = user_id);

create policy "upcoming_payments_update_own"
  on public.upcoming_payments for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "upcoming_payments_delete_own"
  on public.upcoming_payments for delete
  using (auth.uid() = user_id);
