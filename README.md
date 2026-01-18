# Form Builder

Form Builder is a Next.js app for creating and managing custom forms. It
includes authentication, user accounts, and a form management dashboard backed
by Supabase/Postgres.

## Features

- Email/password auth and Google sign-in
- Form list with pagination
- Form builder UI (create, edit, and view forms)
- Light/dark theme toggle

## Tech Stack

- Next.js App Router
- React, TypeScript, Tailwind CSS
- Supabase (data storage)
- Better Auth + Postgres (auth)
- Resend (transactional emails)

## Requirements

- Node.js 18+ (or 20+ recommended)
- A Supabase project (Postgres) with credentials

## Environment Variables

Create a `.env.local` in the project root:

```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_SECRET_SUPABASE_DEFAULT_KEY=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=

# Database (used by Better Auth)
DATABASE_URL=

# Email (Resend)
RESEND_API_KEY=

# OAuth (Google)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Install

```bash
npm install
```

## Run (Development)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Start (Production)

```bash
npm run build
npm run start
```

## Tests & Lint

```bash
npm run test
npm run lint
```
