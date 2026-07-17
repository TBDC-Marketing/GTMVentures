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
- **Brand**: Meridian Reserve identity — Midnight Navy `#07182D`, Antique Gold `#C6A15B`, Warm Ivory `#F6F1E7`, Slate `#536579` as `--color-brand-*` tokens in `src/index.css` via `@theme`. Canonical compass-mark SVGs in `public/brand/` (see its README — never retrace/recolour). Full spec: `WEBSITE-REBRAND-IMPLEMENTATION-PLAN.md`.
- **Structure**:
  - `src/content/site.ts` — ALL site copy and data (edit content here)
  - `src/components/brand/BrandLogo.tsx` — mark + live wordmark lockup (`surface` prop)
  - `src/components/ui/` — Button, Eyebrow, Section/Container, FadeIn, SafeImage
  - `src/components/layout/` — Nav (accessible mobile panel), Footer
  - `src/components/sections/` — Hero, CredibilityBar, Approach, Services, Team, Experience, NetworkProof, Contact
  - `src/App.tsx` — composition only (skip link + section order)
- **Sections order**: Hero → CredibilityBar → Approach → Services → Team → Experience (static logo grid) → NetworkProof → Contact
- **Contact form**: React fetch POST to FormSubmit AJAX endpoint (`formsubmit.co/ajax/info@gtmventureadvisors.com`) with honeypot + inline validation + success/error states. No runtime DOM patches in `index.html` (deliberately removed — do not reintroduce).
- **Fonts**: Instrument Serif (display), Inter (body) — Google Fonts loaded in `index.html` only
- **Headshot images**: `public/principal-nitin.webp`, `public/principal-ezra.webp`, `public/principal-anish.webp`
- **Excluded by client direction**: Johnson & Johnson logo/copy; placeholder legal links and regulatory disclosure (add only when approved copy is provided)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/gtm-venture-advisors run dev` — run landing page locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
