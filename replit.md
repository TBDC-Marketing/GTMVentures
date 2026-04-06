# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains the GTM Venture Advisors landing page and API server.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### GTM Venture Advisors Landing Page (`artifacts/gtm-venture-advisors`)
- **Type**: React + Vite SPA (frontend-only, no backend)
- **Preview path**: `/` (root)
- **Tech**: React, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React
- **Content**: Full GTM Venture Advisors marketing site — 10 sections:
  - Sticky navigation with smooth-scroll and mobile hamburger
  - Hero with animated Instrument Serif headline, gold accent on "Institutional Capital."
  - What We Do (3 service cards)
  - Sectors & Focus (4 sector cards + focus badges)
  - Partnership with TBDC (3-step flow diagram)
  - Team (3 principals with headshot photos + credentials)
  - Services accordion (7 items numbered in gold)
  - Network & Reach (capital source tags)
  - Contact CTA with email link
  - Footer
- **Brand colors**: navy (#0A1628), teal (#00838F), gold (#D4A843), surface (#FAFAF7) defined in `src/index.css` via `@theme`
- **Fonts**: Instrument Serif (display/headlines), Inter (body) — loaded from Google Fonts in `index.html`
- **Headshot images**: `public/nitin-kaushal.jpg`, `public/ezra-chang.jpg`, `public/david-kideckel.jpg`
- **Key file**: `src/App.tsx` — all content data in const objects at the top for easy editing

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/gtm-venture-advisors run dev` — run landing page locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
