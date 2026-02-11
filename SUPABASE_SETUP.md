# Supabase Setup

This project uses Supabase email/password auth with per-client workspace data isolation via Row Level Security (RLS).

## 1. Create the Supabase project

1. Create a new project in Supabase.
2. Go to `Project Settings` -> `API`.
3. Copy:
   - `Project URL`
   - `anon public` key

## 2. Environment variables

Create `.env.local` in the project root:

```bash
cp .env.example .env.local
```

Set:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Do not use the service role key in the frontend app.

## 3. Run schema + security policies

1. Open Supabase `SQL Editor`.
2. Run `supabase/workspace_schema.sql`.

This creates:
- `client_profiles`
- `client_overview`
- `workspace_resources`
- `payment_receipts`
- `upcoming_payments`

All tables have RLS enabled and policies that only allow `auth.uid() = user_id`.

## 4. Configure auth

In Supabase Dashboard:

1. `Authentication` -> `Providers` -> ensure `Email` is enabled.
2. Decide if email confirmations are required:
   - For simplest client onboarding, disable email confirmation.
3. Add your app URL in `Authentication` -> `URL Configuration`:
   - Site URL: `http://localhost:3000` (local) and production URL later.

## 5. Create one auth user per client

1. Go to `Authentication` -> `Users` -> `Add user`.
2. Create one email/password account for each client.
3. Copy each created user `id` (UUID).

## 6. Seed workspace records for each client

Insert rows with `user_id = auth.users.id` for that client.

Minimum needed for a working experience:

1. `client_profiles` (name/company/timezone)
2. `client_overview` (status + milestone fields)
3. `workspace_resources` (title + `doc_url` for published Notion links)
4. `payment_receipts` (title + `receipt_url`, amount/currency/issued date)
5. `upcoming_payments` (description, amount, currency, due date, status)

## 7. Security model in this app

- Login uses Supabase `signInWithPassword` via server route.
- Logout uses Supabase `signOut` via server route.
- Workspace/data pages require authenticated user server-side.
- All workspace queries are server-side and constrained to the authenticated `user.id`.
- RLS is the primary protection boundary in the database.

## 8. Local verification checklist

1. Start app with `npm run dev`.
2. Open `/en/login`.
3. Login with a created client user.
4. Confirm redirect to `/en/workspace?tab=overview`.
5. Verify:
   - `Resources` tab only shows that user’s rows.
   - `Payments` tab only shows that user’s rows.
   - Document pages open only records owned by current user.
