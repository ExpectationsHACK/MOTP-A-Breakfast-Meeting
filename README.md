# Men Ought to Pray — Conference Website

A Next.js site for the "Men Ought to Pray" men's prayer breakfast: the marketing/landing page, a
registration form, and an admin console for managing registrants and follow-up.

## Getting started

```bash
npm install
npm run db:migrate   # applies the schema to the Postgres database in DATABASE_URL
npm run db:seed      # creates the first super admin account
npm run dev
```

Visit `http://localhost:3000`. Admin console is at `/admin/login`.

The seed script creates the first super admin using the values in `.env`
(`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` / `SEED_ADMIN_NAME`). **Change that password after your
first login** — there is no in-app "change password" screen yet, so for now update it via
`npm run db:studio` (Prisma Studio) or by re-running the seed with new env values against a fresh
database.

## What's included

- **Marketing site** (`app/page.tsx` + `components/marketing/*`) — hero, the problem/promise/
  experience/solution sections, who-should-attend, event details with a live countdown, FAQ, and
  the registration form, all pulled from the conference copy.
- **Registration** (`app/register/actions.ts`) — a server action validates and writes each
  signup straight to the database. No separate confirmation email/SMS is wired up yet.
- **Admin console** (`app/admin/`) — email/password login (Auth.js), protected by `proxy.ts`.
  - **Dashboard** — registration counts, unassigned count (super admin), recent signups.
  - **Registrants** — searchable/filterable table; change status; call (`tel:`) or text (`sms:`)
    a registrant straight from the row; export the current filter to CSV; a super admin can
    assign a registrant to an admin for follow-up, promote a registrant to an admin account, or
    delete a registrant.
  - **Registrant detail** — full record, follow-up notes log, same call/text/assign/promote
    actions.
  - **Admins** (super admin only) — add admins directly, or promote an existing registrant (they
    need an email on file); remove an admin (their assigned registrants become unassigned).
- **Roles** — `SUPER_ADMIN` sees and manages everything; `ADMIN` only sees registrants assigned
  to them and can update status / log notes / call / text.

## Assumptions made (revisit these)

- **Registration is free.** The source copy had `[INSERT REGISTRATION INFORMATION]` — the FAQ
  currently says the breakfast is free. Change the answer in
  [`components/marketing/FAQ.tsx`](components/marketing/FAQ.tsx) if there's actually a fee.
  event date/time is stored in `EVENT_DATE_ISO` (`.env`), fed into the hero countdown.
- **"Call or text from the admin"** opens the device's own phone/messaging app via `tel:`/`sms:`
  links — there's no SMS-sending service (e.g. Twilio) wired up. If you want in-app bulk texting,
  that's a separate integration.
- **Images** are the photos supplied in `public/` (prayer, brotherhood, breakfast, worship
  scenes). `lib/images.ts` is the one file that maps each photo to where it's used, so swapping
  in new photos later is a one-line change per section.
- **"About MOTP"** copy is original text written to fit the conference's mission since the brief
  didn't include separate About copy. Edit it in
  [`components/marketing/AboutMotp.tsx`](components/marketing/AboutMotp.tsx), and add the host
  church's name if you'd like it credited.

## Database

The app runs on **Postgres** (Prisma Postgres, a hosted database), configured via `DATABASE_URL`
in `.env`. That URL contains a live credential — never commit `.env` (it's already gitignored)
and treat that connection string like a password. Prisma's schema/migration files live in
`prisma/` and are safe to commit; only the connection string itself is secret.

To point the app at a different Postgres database (a new environment, another provider like Neon
or Supabase, etc.), swap `DATABASE_URL` in `.env` and run `npm run db:migrate` once against it.

## Environment variables (`.env`)

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Prisma connection string |
| `AUTH_SECRET` | Auth.js session encryption key — generate a new one for production (`openssl rand -base64 32`) |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` / `SEED_ADMIN_NAME` | Used once by `npm run db:seed` |
| `EVENT_DATE_ISO` | Feeds the countdown timer and event details |

## Deploying

1. Push this repo to GitHub.
2. Deploy to Vercel (or any Node host), setting the environment variables above (same
   `DATABASE_URL` to share the current database, or a fresh Postgres instance for a separate
   production environment).
3. Run `npx prisma migrate deploy` against that database, then `npm run db:seed` once to create
   the first admin (skip this if reusing the current database — the admin already exists).
