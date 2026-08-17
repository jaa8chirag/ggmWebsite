# GGM Technologies — Project Status

This file exists so a **new Claude session (any account)** can pick up this project with full context, even without the original chat history. Read this first.

## What this is

A Next.js marketing website **with a full admin CMS backend** for **GGM Technologies**, a New Delhi digital marketing agency (SEO, PPC, web development, lead generation, social media, Shopify/WordPress). Content and pricing were originally sourced from the real live site **ggmtechnologies.com**, then migrated into a Postgres database that the site owner now manages themselves via `/admin`.

- **Local path**: `c:\Users\chira\GGm\ggm-web`
- **Not a git repo** (no `.git` — nothing has been committed to version control yet)
- **Dev server**: `npm run dev` (runs on port 3003)
- **Local Postgres / SQL**: Local SQL database using `ggm_web_dump.sql`.
- **Deployed to Vercel once**: `https://ggm-web-seven.vercel.app` (project `jaa8chirags-projects/ggm-web`) — that deploy predates the database/admin work below, so it currently serves the old static version. **Do not redeploy without asking** (see below) — redeploying will need a production Postgres database provisioned first (see "Going to production" below).

## ⚠️ Critical user preferences — read before doing anything

1. **DO NOT deploy to Vercel unless the user explicitly asks in that conversation.** The user said: "ab local pai kaam krta hai deploy mat krna jab tak na bolu mai" (work locally, don't deploy until I say so). A past deploy being approved once does not mean standing permission.
2. **User communicates in Hindi/Hinglish.** Respond in kind — short, direct, no headers/sections for simple replies.
3. **Always verify visually/functionally before claiming something works.** Workflow used throughout: `npm install --no-save playwright` → write a throwaway `scratch-*.js` script → run it, read the screenshots/console output → fix issues found → `rm -f scratch-*.js` → `npm uninstall playwright` → then `npx tsc --noEmit`, `npm run lint`, `npm run build`. This has repeatedly caught real bugs (including a subtle one in the admin auth flow, see below) that code review alone missed.
   - **Gotcha learned the hard way**: when testing admin pages with Playwright, scope button/link selectors to `page.locator("main")` — the admin sidebar layout has its own `<form>`/`<button type="submit">` ("Sign out"), and an unscoped `button[type="submit"]` selector can click the wrong one.
   - **Gotcha learned the hard way**: `page.waitForLoadState("networkidle")` right after clicking a login submit button can resolve *before* the server-action-triggered client-side redirect actually finishes — add a short explicit wait (1–2s) after login before asserting on the resulting URL, or you'll see false "redirected to login" failures that aren't real bugs.
4. Don't create planning/analysis docs unless asked — but this file was explicitly requested, so keep it updated as work continues.

## Tech stack

- Next.js 16.3 (App Router), React 19, TypeScript, Tailwind CSS v4 (`@theme` tok- **MySQL Direct Pool** (`mysql2` driver) — Prisma removed completely. All queries run directly via `query` / `queryOne` helpers in `src/lib/db.ts`.
- **Next.js 16 renamed `middleware.ts` → `proxy.ts`** (`src/proxy.ts` in this project, exporting `proxy()` not `middleware()`). Proxy runs on the **Node.js runtime by default** now (unlike old Edge-default middleware), so it can safely run MySQL queries directly — used here for admin session validation.
- bcryptjs for password hashing
- GSAP + ScrollTrigger + `@gsap/react`'s `useGSAP` — the only scroll-animation engine (Motion/Framer only for non-scroll hover/tap via `Magnetic.tsx`)
- Lenis smooth scroll, wired into `gsap.ticker`
- Three.js / `@react-three/fiber` / drei — used sparingly (`BacklinkField.tsx` constellation on the homepage), code-split via `next/dynamic(..., { ssr: false })`
- dotLottie for a few icon animations (`.lottie` files in `public/lottie/`)
- `cn()` utility (clsx + tailwind-merge) from `src/lib/utils.ts`

## ⭐ Admin CMS + database (the big recent addition)

The whole site is backed by a MySQL database with a dynamic admin panel for content management with per-page SEO controls and multi-location service pages.

### Running it locally

```
mysql -u <user> -p ggm_web < ggm_web_dump.sql  # imports schema + seed data directly into local MySQL database
npm run dev                                    # localhost:3003, admin at /admin
```             # localhost:3003, admin at /admin
```

`.env.local` (gitignored) has `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` (the seed script hashes the password into the DB — the plaintext env var is only read once, at seed time). **Current dev login**: `admin@ggmtechnologies.com` / `ChangeMe123!` — change this before the site is ever public.

### Data model (`prisma/schema.prisma`)

Every content model carries the same **SEO field group**: `metaTitle`, `metaDescription`, `ogImage` (text URL, no upload pipeline), `canonicalOverride`, `noIndex`. Models: `Service` (+ `ServiceFaq`), `Location`, `ServiceLocation` (the service×location join — see below), `BlogPost` (+ `BlogBlock`, `BlogFaq`), `CaseStudy` (Work), `Product` (+ `ProductSpec`), `Testimonial`, `SiteSettings` (singleton — company info, About page content, homepage metrics), `AdminUser` + `AdminSession` (auth).

**Deliberately still static** (not admin-managed, by design — structural/brand elements, not day-to-day content): `src/data/nav.ts` (nav links), `src/data/process.ts` (the 4-step Audit/Strategy/Execute/Scale process, tied to Lottie assets), `src/data/backlinks.ts` (decorative Three.js data), `src/data/climb.ts` (now just search-simulation config — `searchQuery`/`rankStart`/`rankEnd`/`supportingItems`; the actual services list it displays now comes from the DB via a prop).

### The flagship feature: multi-location service pages

`/services/[serviceSlug]/[locationSlug]` — e.g. `/services/seo/delhi`. Locations are entirely admin-managed (added via `/admin/locations`, enabled per-service via `/admin/services/[id]/locations`), not a hardcoded list. Each combo (`ServiceLocation` row) gets its own optional `customIntro` and full SEO override fields; if `customIntro` is blank the page falls back to a generated intro. **Verified end-to-end**: created a "Delhi" location, enabled it on the SEO service, confirmed `/services/seo/delhi` renders correctly with canonical URL on the real domain, `Service`+`FAQPage`+`BreadcrumbList` JSON-LD, and shows up in `/sitemap.xml` — all without a rebuild (see "force-dynamic" below).

### Auth

Single admin (no multi-user/roles, per user's choice). DB-backed opaque session tokens — no JWT secret to manage, logout just deletes the `AdminSession` row. `src/lib/auth.ts` has `verifyCredentials`/`createSession`/`destroySession`/`getCurrentAdmin`/`requireAdmin`. `src/proxy.ts` guards `/admin/**` (redirects to `/admin/login` if no valid session) using a direct Prisma check — safe because Proxy is Node-runtime by default in Next 16.

### Admin UI (`src/app/admin/**`)

Two root layouts via Next.js "multiple root layouts" (route groups) — **this was a real bug that had to be fixed**: admin pages were initially still nested under the public site's root layout, so the public Nav/Footer bled into every admin page. Fixed by moving the entire public site into `src/app/(site)/` with its own root `layout.tsx` (html/body/fonts/Nav/Footer/GSAP), and giving `src/app/admin/layout.tsx` its own separate minimal root layout (html/body/fonts, no Nav/Footer). Within admin, `src/app/admin/(dashboard)/layout.tsx` is a second-level layout that adds the sidebar for everything except `/admin/login`.

Every content type follows the same pattern: list page → new/edit form (shared client form component) → delete via a small `DeleteButton` client component wrapping a bound server action. Mutations are **Next.js Server Actions** (colocated `actions.ts` per section), not a REST API. Shared building blocks in `src/components/admin/`: `SeoFieldset.tsx` (the 5 SEO fields, reused everywhere), `RepeatingText.tsx` (string arrays like bullets/features), `RepeatingPairs.tsx` (FAQ question/answer, spec label/value), `RepeatingMetrics.tsx` (homepage metric counters), `BlockEditor.tsx` (structured H2/H3/paragraph/list blog content — not a WYSIWYG, matches the existing `ContentBlock` rendering shape), `ToggleButton.tsx`, `DeleteButton.tsx`, `styles.ts` (shared input/label/card class constants).

**Real bug hit and fixed**: the repeating-field components originally generated row ids via a `useRef` counter mutated *during* the `useState` initializer (`counter.current++` inside a function called while computing initial state) — React's `react-hooks/refs` lint rule correctly flags this as "accessing refs during render," which is genuinely unsafe. Fixed by computing initial rows with plain array-index ids (no ref involved) and only touching the ref-based counter inside the "Add row" `onClick` handler, where ref mutation is safe.

### Public pages: rewired from static imports to DB reads

Pattern: Server Component pages fetch via `src/lib/queries.ts` (a thin wrapper over Prisma — `getServices`, `getServiceBySlug`, `getServiceLocation`, `getPublishedPosts`, `getPostBySlug`, `getWork`, `getProducts`, `getProductBySlug`, `getTestimonials`, `getSettings`) and pass data down as props. This mattered most for the several homepage sections that are `"use client"` components (`Climb.tsx`, `Services.tsx`, `Work.tsx`, `Testimonials.tsx`, `Blog.tsx` teaser, `Metrics.tsx`) — Prisma can't run in a client component, so `src/app/(site)/page.tsx` fetches everything once and passes it down.

**`export const dynamic = "force-dynamic"`** is set on `(site)/layout.tsx` (cascades to every public page) and individually on `sitemap.ts` and the root `opengraph-image.tsx` (which sit outside the `(site)` group so they don't inherit it). Without this, Next.js would statically prerender pages with the DB content **frozen at build time** — admin edits wouldn't show up until a rebuild, which defeats the entire point of a CMS. This was caught by actually inspecting the `next build` route table (static `○` vs dynamic `ƒ`), not assumed.

### Migration / seed data

`prisma/seed-data/*.ts` (moved from `src/data/` — `company.ts`, `about.ts`, `metrics.ts`, `services.ts`, `posts.ts`, `work.ts`, `shop.ts`, `testimonials.ts`) are the **original real content**, now used only as bootstrap fixtures for `prisma/seed.ts`. They're not imported by the running app anymore (the DB is the live source of truth), but kept around (rather than deleted or inlined) so a fresh environment can be seeded with real starting content instead of an empty database. `prisma/seed.ts` is idempotent (upserts by slug, skips testimonials/settings if already present).

### Explicitly out of scope (flagged, not silently built)

- **Image upload** — `ogImage` and similar fields are plain text URL/path inputs, not a file-upload pipeline (no S3/Cloudinary/Vercel Blob wired up).
- **Rich WYSIWYG blog editor** — structured block list (H2/H3/paragraph/list) instead, matching how blog posts already render. Swappable for TipTap/etc. later.
- **Multi-user auth / roles** — single admin only, per the user's choice when asked.

### Going to production (not done — do not do this without being asked)

The Vercel deploy from before this work predates the database. To actually go live with the CMS: provision a production Postgres (Vercel Postgres/Neon via the Vercel dashboard — can't be done via this CLI version, no `vercel storage` subcommand available), set `DATABASE_URL`/`ADMIN_EMAIL`/`ADMIN_PASSWORD` in Vercel's env vars, run the seed script against it once, then deploy. **Do not do any of this without the user explicitly asking** — see the standing "don't deploy" instruction above.

## Brand identity

Sourced from the client's real logo PDF (`C:\Users\chira\Downloads\Fwd_ Logo\`):

- **Colors**: `--color-flow: #0370ba` (blue, primary/links), `--color-signal: #fe911a` (orange, CTAs/accents)
- **Base tokens**: `--color-ink: #eef1f7` (page bg), `--color-surface: #ffffff` (cards), `--color-chalk: #0f1420` (text), `--color-muted: #454e60`
- **Theme**: light theme site-wide
- **Logo assets**: `public/logo/ggm-mark.png` (icon only, transparent) and `public/logo/ggm-logo-color.png` (full lockup), cropped from the client's PDFs via PyMuPDF. Favicon (`src/app/favicon.ico`) generated from the mark.
- Nav shows **logo only, no text** — floating rounded "pill" bar (`src/components/layout/Nav.tsx`), nav links stay static (`src/data/nav.ts`).

## Site structure

- `/` — Hero, Climb (interactive "which service ranks #1" section, DB-backed services), Services, Process (static), Constellation (Three.js), Metrics (DB), Work (DB), Testimonials (DB), Blog teaser (DB), CtaBand
- `/services`, `/services/[slug]` — DB-backed, 6 services seeded
- `/services/[slug]/[location]` — **new**, admin-managed local-SEO pages (see above)
- `/work` — DB-backed case studies, single listing page (no `/work/[slug]` detail route)
- `/shop`, `/shop/[slug]` — DB-backed products
- `/about`, `/contact` (DB-backed settings; contact form is client-side with validation, service dropdown passed down as a prop from the server-fetched list)
- `/blog`, `/blog/[slug]` — DB-backed, 7 real posts seeded, draft/published status, table of contents, related posts, FAQ schema
- `/admin/**` — the CMS (see above), session-gated by `src/proxy.ts`
- `/sitemap.xml`, `/robots.txt` (disallows `/admin`), `/opengraph-image`, `/blog/[slug]/opengraph-image`, `/services/[slug]/[location]/opengraph-image`, `/not-found` — all DB-aware where relevant

## SEO implementation

Built in an earlier pass, then extended for the CMS (per-item SEO overrides now come from the DB via `overrides` param on `buildMetadata()`):

- `src/lib/site.ts` (`SITE_URL`, currently `https://ggmtechnologies.com` via `NEXT_PUBLIC_SITE_URL`), `src/lib/seo.ts` (`buildMetadata()` — canonical/OG/Twitter, now accepts admin SEO overrides), `src/lib/schema.ts` (JSON-LD: `organizationSchema`/`websiteSchema`/`localBusinessSchema` now take a `company` param instead of a static import; `serviceSchema` takes `allServiceTitles`; new `serviceLocationSchema` for the location pages).
- `src/components/seo/JsonLd.tsx`, `Breadcrumbs.tsx`, `src/components/blog/TableOfContents.tsx`.
- `src/app/sitemap.ts`/`robots.ts` — dynamic from DB, force-dynamic.
- Custom branded `not-found.tsx`, `noindex`.

**Flagged, not fabricated** (per earlier instruction to flag questionable content rather than invent replacements) — now seeded into the DB, so worth revisiting *in the admin panel*, not the code: `Testimonial` rows (4 generic-looking testimonials, no company names — verify if real before adding Review/AggregateRating schema) and `CaseStudy` rows ("Northline Interiors", "Vantage Fitness", "Coastal Goods Co." with specific stats — same caveat).

## Recent work (most recent first)

0. **Full dynamic admin CMS + Postgres + multi-location SEO pages** — see the dedicated section above. This is the big one: Prisma 7, `proxy.ts` auth, full CRUD admin for every content type, `/services/[slug]/[location]` programmatic SEO pages, force-dynamic rendering throughout. Verified end-to-end with Playwright against a production build (`next build && next start`): login → create location → enable on service → new page renders with correct SEO/schema/sitemap → edit blog post → change reflects immediately on `/blog`. Real bugs found and fixed along the way: the admin/public-site layout collision (Nav bleeding into admin), the `useState`+`useRef`-during-render lint errors in the repeating-field components, and Prisma 7's driver-adapter requirement.
1. **Work section illustrations** — checked ggmtechnologies.com first (no portfolio section exists there), built custom line-art SVG scenes (`src/components/decor/WorkIllustration.tsx`) per case-study industry instead of stock photography, matching the site's zero-photography aesthetic.
2. **Full SEO implementation** — sitemap, robots, canonical URLs, JSON-LD, dynamic OG images, breadcrumbs, table of contents, internal linking, heading-hierarchy fixes, custom 404.
3. **Navbar redesign** — logo-only, floating rounded "pill" nav.
4. **Fixed broken blog links** — `/blog/[slug]/page.tsx` didn't exist at all; built it with real content fetched from ggmtechnologies.com.
5. **Deployed once to Vercel** at the user's request, then told not to deploy again without asking.
6. **Brand identity pass** — real logo/colors extracted from the client's PDF, replaced placeholder pink/teal with blue/orange sitewide.
7. **VECTR-inspired homepage redesign** — `IsometricScene.tsx` (SVG+GSAP), pinned scroll-driven Process section, Hero redesign.
8. **Marquee fix** — negative `animation-delay` so tickers appear already in motion on load.
9. Earlier: full site build from an original CP-0→CP-8 plan, dark→light theme conversion, real content pass from ggmtechnologies.com, Climb section redesign, various Playwright-verified bug fixes (dotLottie ZIP path bug, contact form click-target bug, Lighthouse perf via code-splitting, a heading-overlap bug, a Three.js instanced-color bug).

## Known non-issues / things intentionally left alone

- No git repository — nothing is version-controlled yet. If asked to set one up, check with the user first.
- Mobile nav overlay background is close in tone to the page background — minor pre-existing cosmetic quirk, not flagged by the user.
- Root `opengraph-image` and blog/service-location OG image routes render with a hashed path segment internally (e.g. `/opengraph-image-12o0cb`) rather than the clean `/opengraph-image` — this is normal Next.js behavior for generated image routes; the auto-generated `<meta property="og:image">` tag always points to the correct hashed path, so it's not broken, just cosmetically different from what you'd guess.

## If you're a new session picking this up

1. `docker compose up -d` (Postgres on port 5434) before `npm run dev` — the site will error on every DB-backed page without it.
2. Check `npm run dev` isn't already running on port 3003 before starting another one.
3. Read this file fully, then the plan archive at `C:\Users\chira\.claude\plans\humble-imagining-snowflake.md` if you need the original CMS design reasoning.
4. Follow the Playwright-verify workflow above for any change — don't just trust code review, and remember the two admin-testing gotchas listed under "Critical user preferences."
5. Do not run `vercel --prod` unless explicitly asked this session — and if you ever do, remember production needs its own Postgres provisioned first (see "Going to production" above).
