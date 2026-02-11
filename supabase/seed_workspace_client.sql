-- Seed workspace data for one client user.
-- Run in Supabase SQL Editor after running workspace_schema.sql.

begin;

-- Replace this UUID if you want to seed another client.
with target_user as (
  select 'cdb10ba0-6eb3-45e5-87f9-f8b20802e15e'::uuid as user_id
)
insert into public.client_profiles (user_id, full_name, company_name, timezone)
select
  target_user.user_id,
  'Kasper Stubbe',
  'Stubio Client',
  'Europe/Copenhagen'
from target_user
on conflict (user_id) do update
set
  full_name = excluded.full_name,
  company_name = excluded.company_name,
  timezone = excluded.timezone;

with target_user as (
  select 'cdb10ba0-6eb3-45e5-87f9-f8b20802e15e'::uuid as user_id
)
insert into public.client_overview (
  user_id,
  project_status,
  next_milestone,
  next_milestone_date,
  last_update,
  updated_at
)
select
  target_user.user_id,
  'In progress',
  'Finalize phase 1 scope and roadmap',
  (current_date + interval '7 day')::date,
  'Kickoff completed. Initial planning docs are ready for review.',
  now()
from target_user
on conflict (user_id) do update
set
  project_status = excluded.project_status,
  next_milestone = excluded.next_milestone,
  next_milestone_date = excluded.next_milestone_date,
  last_update = excluded.last_update,
  updated_at = excluded.updated_at;

-- Make resources/payments idempotent by replacing seeded rows for this user.
delete from public.workspace_resources
where user_id = 'cdb10ba0-6eb3-45e5-87f9-f8b20802e15e'::uuid;

insert into public.workspace_resources (user_id, title, description, category, doc_url)
values
  (
    'cdb10ba0-6eb3-45e5-87f9-f8b20802e15e'::uuid,
    'Project Brief',
    'High-level goals, audience, and scope.',
    'Strategy',
    'https://www.notion.so'
  ),
  (
    'cdb10ba0-6eb3-45e5-87f9-f8b20802e15e'::uuid,
    'Weekly Status Notes',
    'Latest delivery notes and upcoming tasks.',
    'Updates',
    'https://www.notion.so'
  ),
  (
    'cdb10ba0-6eb3-45e5-87f9-f8b20802e15e'::uuid,
    'Design Review',
    'Current design direction and open decisions.',
    'Design',
    'https://www.notion.so'
  );

delete from public.payment_receipts
where user_id = 'cdb10ba0-6eb3-45e5-87f9-f8b20802e15e'::uuid;

insert into public.payment_receipts (
  user_id,
  title,
  description,
  receipt_url,
  issued_at,
  amount,
  currency
)
values
  (
    'cdb10ba0-6eb3-45e5-87f9-f8b20802e15e'::uuid,
    'Invoice #1001',
    'Discovery and planning sprint.',
    'https://www.notion.so',
    (current_date - interval '21 day')::date,
    12500.00,
    'DKK'
  ),
  (
    'cdb10ba0-6eb3-45e5-87f9-f8b20802e15e'::uuid,
    'Invoice #1002',
    'Design delivery milestone.',
    'https://www.notion.so',
    (current_date - interval '7 day')::date,
    9800.00,
    'DKK'
  );

delete from public.upcoming_payments
where user_id = 'cdb10ba0-6eb3-45e5-87f9-f8b20802e15e'::uuid;

insert into public.upcoming_payments (user_id, description, amount, currency, due_date, status)
values
  (
    'cdb10ba0-6eb3-45e5-87f9-f8b20802e15e'::uuid,
    'Development milestone 2',
    14500.00,
    'DKK',
    (current_date + interval '10 day')::date,
    'scheduled'
  ),
  (
    'cdb10ba0-6eb3-45e5-87f9-f8b20802e15e'::uuid,
    'Launch support package',
    4200.00,
    'DKK',
    (current_date + interval '24 day')::date,
    'pending'
  );

commit;
