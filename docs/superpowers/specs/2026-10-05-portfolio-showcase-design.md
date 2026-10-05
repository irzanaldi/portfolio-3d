# Portfolio-3D — "All projects, viewable in one site" (design)

**Date:** 2026-10-05
**Status:** Visual direction locked (Direction D, "brighter"). Pending user spec review → implementation plan.
**Owner:** Irzan Aldi Ananto
**Mockup:** `docs/mockup/full-site-d.html` (served via `python3 -m http.server --directory docs/mockup`)

## 1. Goal

Turn the existing `portfolio-3d` into Irzan's complete personal portfolio that:
1. Presents who he is + professional experience (sourced from his CV).
2. Showcases **all 11 personal projects** so each can be explored **directly in the site** — live where possible, video/gallery otherwise.
3. Ships with **deployment + setup steps** ("cara masang").

## 2. Locked decisions

- **Evolve the existing app**, not a rewrite. Stack stays: Next.js 16.2.4 + React 19 + React Three Fiber.
- **Projects shown = personal only, 11.** The 5 work projects move to / stay in **Experience** (not the Projects grid).
- **"Viewable directly" = mixed:**
  - **Live-embed (iframe):** `pinjam-buku`, `silsilah`.
  - **In-page video:** `CLIPER`, `crypto-bot`, `pos`.
  - **Gallery/images:** `DIGITAL_PRODUCTS` (+ screenshots for all).
  - **Code + screenshots only (no live):** `netra` (security tool — must not be publicly live), `competitor-intel`, `autoapply`, `presensi`, `prototype-bidan`.
- **Visual = Direction D "brighter"** (deep indigo + violet→fuchsia→amber gradient, restrained). Keep the 3D orbital hero, reskinned; 2D everywhere else.
- **Deploy:** portfolio → Vercel; `pinjam-buku` + `silsilah` → Railway/Fly free tier; the rest not deployed live.

## 3. Visual system (Direction D, brighter)

Ship **brighter** as the default theme. Keep tokens structured so a dark variant is a cheap follow-up (do not build the toggle for v1).

```
--bg #17132E  --bg2 #141029  --surface #221C44  --surface2 #2A2252  --line #39315E
--text #F8F5FF  --muted #BDB2DD  --faint #8A7FB0
--v #9277FF  --f #F07AE0  --a #FFC56A  --live #64E6B4
--grad linear-gradient(100deg,#9277FF,#F07AE0 55%,#FFC56A)
```

- **Type:** Clash Display (headings, Fontshare) · General Sans (body, Fontshare) · JetBrains Mono (data labels only). Replaces current Geist.
- **Layout order:** Hero (type + orbital) → About (portrait + facts / bio) → Skills (categorized strip) → Experience (timeline) → Selected work (3 tiles) → All projects (8-card, 2-col grid) → Contact. Project detail is its own route.
- **Motion:** one hero-load reveal + orbital slow spin (disabled under `prefers-reduced-motion`) + hover answers to clicks. No per-card fade-up.
- **Anti-tell discipline:** gradient appears in only ~4–5 spots; no `01/02/03` numbering; no all-caps eyebrows; no `→` appended to buttons; no uniform soft-shadow card kit (thin borders + hover accent instead).

## 4. Architecture / components

Keep existing structure: `src/app` (App Router), `src/components/{three,sections,ui,layout}`, `src/data`, `src/hooks`.

Changes:
- **Tokens:** rewrite `globals.css` to the D-brighter system; restyle `Navbar` + all sections.
- **Data:** rewrite `src/data/projects.ts` (11 personal, extended interface below). Update `experience.ts` + `skills.ts` content from CV.
- **Fix the filter bug:** `ProjectsSection` currently hardcodes `company === 'The Body Shop...'` / `'HW Group'`, which silently drops any other project. Replace with data-driven rendering: `featured` flag → Selected tiles; the rest → grid. Split into `SelectedWork` + `AllProjects` components.
- **New routes:** `src/app/projects/[id]/page.tsx` (detail; `generateStaticParams` from data). A separate `/projects` index is optional — the home page already lists all; skip for v1.
- **New components:** `ui/ProjectCard` (grid card), `ui/ProjectDetail` (media switch), `ui/PhoneFrame` (mobile mockup), `sections/SkillsSection`; update `AboutSection` + `ExperienceSection`.
- **3D:** keep in `HeroSection` (orbital/particles, reskinned). Drop the 3D `TechOrbit` from About (focus + performance); About uses the 2D skills strip.
- **Media precedence in detail:** `embedUrl` → `<iframe>` (lazy, `sandbox`, aspect-boxed, with "open in new tab" fallback) → else `video` → `<video>`/YouTube → else `images[]` → gallery/carousel.

**`Project` interface:**
```ts
interface Project {
  id: string;
  title: string;
  category: 'Security'|'Intelligence'|'Finance'|'Platforms'|'Media'|'Automation'|'Mobile';
  tagline: string;          // one line
  description: string;
  highlights: string[];
  techStack: string[];
  status: 'live'|'video'|'gallery'|'code'|'prototype';
  platforms?: ('web'|'mobile'|'cli')[];
  images: string[];
  video?: string;
  embedUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}
```

## 5. Content

### About / Experience / Skills — from CV (verbatim intent)
- **Title:** Senior Fullstack Developer · 5+ years · Tangerang Selatan, Indonesia.
- **Summary:** microservices + event-driven across an 11-service ecosystem (Kafka, Redis), data warehousing/ETL, real-time systems; NestJS, Next.js, Laravel, Vue.js, Go, Python, Flutter; AI-augmented workflow.
- **Experience:** The Body Shop Indonesia — Senior Fullstack (Aug 2023–Present, 7 bullets incl. 11-microservice APIs, Smart Admin Panel over 8 depts / 100+ stores → OMS, real-time inventory, data warehouse w/ Python+dbt+Dagster, Jenkins CI/CD); HW Group — Backend (Oct 2021–Aug 2023, 3 bullets).
- **Skills:** Languages (TS, JS, PHP, Go, Python, Dart); Backend (NestJS, Node, Express, Laravel, Go); Frontend (Next, React, Vue, Livewire, Flutter); Architecture (Microservices, Event-Driven, REST); Messaging/Cache (Kafka, Redis); Data (DW, dbt, Dagster, MySQL, Postgres, Mongo); DevOps (Docker, Jenkins, n8n, Linux, Git); AI Stack (Claude Code, Obsidian).
- **Education:** Universitas Pamulang, B.Tech IT (2016–2021).
- **Contact:** github.com/irzanaldi · irzanaldi@gmail.com · linkedin.com/in/irzan-aldi-ananto-688819214.

### 11 projects
| id | category | status | view mode | stack |
|----|----------|--------|-----------|-------|
| pinjam-buku | Platforms | live | iframe `/katalog` + screenshots | Laravel · Filament · MySQL |
| silsilah | Platforms | live | iframe + screenshots | Laravel · Node · MySQL |
| pos | Platforms | video | video + phone frames (web + 2 mobile) | Node · Flutter · Postgres |
| CLIPER | Media | video | demo video | n8n · Python · FFmpeg |
| crypto-bot | Finance | video | video + screenshots | Python · Pandas · ccxt |
| netra | Security | code | screenshots only (NOT live) | Go · React · Postgres · Docker |
| competitor-intel | Intelligence | code | screenshots | Node · Docker · Postgres |
| DIGITAL_PRODUCTS | Media | gallery | PDF/PNG gallery | Python · Pillow |
| autoapply | Automation | code | screenshots | Node · browser extension |
| presensi | Mobile | code | screenshots + APK | Laravel · Flutter |
| prototype-bidan | Mobile | prototype | screenshots | Flutter · Dart |

Featured (3 Selected tiles): `pinjam-buku` (live), `CLIPER` (video), `pos` (mobile).

## 6. Assets (user-involved)
- Screenshots + 3 demo videos. Plan: a Playwright script captures web apps (once deployed or run locally); `CLIPER` reuses existing output video; `DIGITAL_PRODUCTS` reuses existing PDF/PNG; mobile via emulator/device screenshots placed in phone frames. Gradient placeholders until captured.
- **Portrait photo** for About + **résumé PDF** for the Contact link — user to provide (placeholder slot meanwhile).

## 7. Deploy & setup ("cara masang")

**Free tier only.** Deploy every web app that can reasonably go live; everything else stays video/gallery/screenshots.

- **Portfolio → Vercel (free):** import `irzanaldi/portfolio-3d`; Next.js auto-detected; set `NEXT_PUBLIC_SITE_URL`; deploy → `*.vercel.app` (no custom domain — stay free).
- **Deployable web apps (live-embed candidates), free hosts:**
  - `pinjam-buku` (Laravel + Filament): Fly.io / Render free + free MySQL/Postgres (e.g. Aiven/Neon). `migrate --seed` demo data; expose public `/katalog` + `/kiosk`.
  - `silsilah` (Laravel + Node): same pattern.
  - `competitor-intel` (Node + Docker): Render/Fly free + Neon Postgres — **if feasible** (web UI with seeded/demo data; skip if it needs live scraping/cron).
  - `pos` web console (Node): deploy the web part only if it runs standalone with demo data; otherwise keep as video. Mobile apps are not web — never "deployed live".
- **Embed fix (every embedded app):** send `Content-Security-Policy: frame-ancestors 'self' https://<portfolio-domain>` and remove `X-Frame-Options: DENY`, else the iframe is blank. Fill each deployed URL into `embedUrl`.
- **`netra` — capable but NOT public (security call):** it's an active attack-surface scanner; a public instance invites abuse + legal risk. Default = screenshots + GitHub only. User may override, but not recommended.
- **Local dev:** `npm install` → `npm run dev` for the portfolio; each app per its own README.
- **No secrets committed.** Free hosts only (no paid add-ons).

## 8. Testing
Jest (existing) plus: data-integrity test (required fields present, valid `status`, unique `id`, exactly 3 `featured`), detail-route `generateStaticParams` coverage, media-precedence unit (embed > video > gallery), reduced-motion + basic a11y smoke.

## 9. Build caveat
Next 16.2.4 is ahead of training data (`AGENTS.md`). Read `node_modules/next/dist/docs/` before writing routes/config.

## 10. Out of scope (YAGNI v1)
Blog, testimonials, CMS, i18n, full dark/light theming (ship brighter only), deploying non-web apps live, a separate `/projects` index page.

## 11. Open items for user
- **Portrait photo** — user will supply later; placeholder slot until then.
- **Résumé** — use the uploaded CV PDF (`CV-Irzan-Aldi-Ananto-Senior-Fullstack.pdf`); copy into `public/` and link from Contact.
- **Deploy scope** — deploy whatever can go live, free tier only. Confirmed candidates: `pinjam-buku`, `silsilah` (+ `competitor-intel`/`pos` web if feasible). `netra` stays non-public.
- **Domain** — none; use `*.vercel.app` (free).
