# Stubio Web

Modern, localized marketing site for Stubio built with Next.js App Router, optimized for Vercel.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS v4
- shadcn/ui style components
- lucide-react icons
- framer-motion (light, section-level motion)
- next/font + next/image
- i18n routes: `/en` and `/da`

## Routes

- `/` -> English landing page
- `/login` -> English login
- `/en` and `/da` -> localized landing page
- `/en/login` and `/da/login` -> localized login
- `/en/workspace` and `/da/workspace` -> authenticated client workspace
- `/en/privacy` and `/da/privacy` -> placeholder privacy pages
- `/en/terms` and `/da/terms` -> placeholder terms pages

## Calendly setup

Calendly embed URL is configured in `src/lib/site-config.ts`:

```ts
calendlyUrl: "https://calendly.com/your-calendly-handle/intro-call"
```

Replace it with your real booking link.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run lint
npm run build
npm run start
```

## Deploy to Vercel

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the repo in Vercel.
3. Keep default framework preset as `Next.js`.
4. Deploy.

Optional environment variable you may add later:

- `NEXT_PUBLIC_SITE_URL` for canonical/metadata URLs.

## Supabase auth + workspace setup

See `SUPABASE_SETUP.md`.

## Notes

- Most sections are server-rendered; only motion, theme toggle, accordion, and Calendly widget are client components.
- Language switcher preserves route context between `da` and `en`.
