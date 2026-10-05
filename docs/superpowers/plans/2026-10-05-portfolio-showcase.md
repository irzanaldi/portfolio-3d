# Portfolio-3D Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evolve the existing `portfolio-3d` into Irzan Aldi Ananto's complete personal portfolio — CV-based intro/experience plus all 11 personal projects, each viewable directly in the site (live embed / video / gallery), styled in the "Direction D brighter" system, then deployed free.

**Architecture:** Keep the existing Next.js 16.2.4 + React 19 + React Three Fiber App Router app. Restyle tokens to the D-brighter system, make the projects section data-driven (removing the hardcoded company filter), rewrite the project data to 11 personal projects with an extended interface, add a static `/projects/[id]` detail route whose media area picks iframe > video > gallery, and update About/Experience/Skills content from the CV. Deploy the site to Vercel and the embeddable Laravel apps to a free host.

**Tech Stack:** Next.js 16.2.4 (App Router), React 19, React Three Fiber / drei, Tailwind CSS v4, TypeScript, Jest + Testing Library. Fonts: Clash Display + General Sans (Fontshare), JetBrains Mono.

**Source of truth for exact markup/classes:** `docs/mockup/full-site-d.html` (the approved mockup). **Spec:** `docs/superpowers/specs/2026-10-05-portfolio-showcase-design.md`.

**Before starting:** This repo runs Next 16.2.4, which is ahead of training data (`AGENTS.md`). Read the relevant guides under `node_modules/next/dist/docs/` before writing routes or `next.config`/metadata code.

---

## Phase 0 — Foundation: fonts + design tokens

### Task 0.1: Load fonts

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add font `<link>`s to the root layout `<head>`**

In `src/app/layout.tsx`, inside the `<html>` before `<body>` (or via the metadata/`<head>` mechanism confirmed from `node_modules/next/dist/docs/`), add:

```tsx
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link rel="preconnect" href="https://api.fontshare.com" />
<link href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=general-sans@400,500,600&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

- [ ] **Step 2: Verify dev server renders with the fonts**

Run: `npm run dev` then load `http://localhost:3000`. Expected: headings render in Clash Display (geometric), not the old Geist.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(portfolio): load Clash Display, General Sans, JetBrains Mono"
```

### Task 0.2: Replace design tokens (D-brighter) in globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace the color/token variables** with the D-brighter palette (port exact values from the mockup's `:root` + `html[data-theme="bright"]` blocks in `docs/mockup/full-site-d.html`). Set these as the default `:root` (ship brighter only; no toggle):

```css
:root{
  --bg:#17132E; --bg2:#141029; --surface:#221C44; --surface2:#2A2252; --line:#39315E;
  --text:#F8F5FF; --muted:#BDB2DD; --faint:#8A7FB0;
  --v:#9277FF; --f:#F07AE0; --a:#FFC56A; --live:#64E6B4;
  --grad:linear-gradient(100deg,#9277FF,#F07AE0 55%,#FFC56A);
  --glow1:rgba(146,119,255,.30); --glow2:rgba(240,122,224,.17);
  --font-heading:"Clash Display",system-ui,sans-serif;
  --font-body:"General Sans",system-ui,sans-serif;
  --font-mono:"JetBrains Mono",ui-monospace,monospace;
}
body{background:var(--bg);color:var(--text);font-family:var(--font-body);}
.grad-text{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
```

Keep the ambient `body::before` glow and `.tick` helper from the mockup. Remove the old cyan tokens (`--color-accent-cyan`, `glow-text-cyan`, etc.) and fix any references flagged by the next build.

- [ ] **Step 2: Build to catch broken token references**

Run: `npm run build`
Expected: compiles; fix any "unknown class/var" errors from removed cyan tokens by pointing them at the new tokens.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(portfolio): swap to Direction-D brighter design tokens"
```

---

## Phase 1 — Data model + CV content (TDD)

### Task 1.1: Extend the Project type and rewrite project data

**Files:**
- Modify: `src/data/projects.ts`
- Test: `src/data/__tests__/projects.test.ts` (create)

- [ ] **Step 1: Write the failing data-integrity test**

```ts
import { projects } from '@/data/projects';

const STATUSES = ['live','video','gallery','code','prototype'];

test('11 personal projects, unique ids', () => {
  expect(projects).toHaveLength(11);
  expect(new Set(projects.map(p => p.id)).size).toBe(11);
});

test('every project has required fields and a valid status', () => {
  for (const p of projects) {
    expect(p.title).toBeTruthy();
    expect(p.tagline).toBeTruthy();
    expect(p.techStack.length).toBeGreaterThan(0);
    expect(STATUSES).toContain(p.status);
    expect(Array.isArray(p.images)).toBe(true);
  }
});

test('exactly 3 featured', () => {
  expect(projects.filter(p => p.featured)).toHaveLength(3);
});

test('live projects declare an embedUrl or liveUrl', () => {
  for (const p of projects.filter(p => p.status === 'live')) {
    expect(p.embedUrl || p.liveUrl).toBeTruthy();
  }
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `npm test -- projects.test`
Expected: FAIL (new fields/shape not present).

- [ ] **Step 3: Rewrite `src/data/projects.ts`**

Replace the interface and array. Interface:

```ts
export interface Project {
  id: string;
  title: string;
  category: 'Security'|'Intelligence'|'Finance'|'Platforms'|'Media'|'Automation'|'Mobile';
  tagline: string;
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

Create all 11 entries using the id/category/status/stack/featured values below, with `tagline`, `description`, and `highlights` copied from the matching card/row in `docs/mockup/full-site-d.html` and the spec table. `images` start as `[]` (filled in Phase 5). `embedUrl`/`video`/`liveUrl` start `undefined` (filled in Phase 6). Set `repoUrl` to `https://github.com/irzanaldi/<id>` for each.

| id | category | status | platforms | featured |
|----|----------|--------|-----------|----------|
| pinjam-buku | Platforms | live | [web] | ✅ |
| cliper | Media | video | [web] | ✅ |
| pos | Platforms | video | [web,mobile] | ✅ |
| netra | Security | code | [web] | |
| competitor-intel | Intelligence | code | [web] | |
| crypto-bot | Finance | video | [cli] | |
| silsilah | Platforms | live | [web] | |
| presensi | Mobile | code | [mobile] | |
| prototype-bidan | Mobile | prototype | [mobile] | |
| digital-products | Media | gallery | [cli] | |
| autoapply | Automation | code | [web] | |

Stacks (`techStack`): pinjam-buku `['Laravel','Filament','MySQL']`, cliper `['n8n','Python','FFmpeg']`, pos `['NestJS','Node','Postgres','Flutter']`, netra `['Go','React','Postgres','Docker']`, competitor-intel `['Node','Docker','Postgres']`, crypto-bot `['Python','Pandas','ccxt']`, silsilah `['Laravel','Node','MySQL']`, presensi `['Laravel','Flutter']`, prototype-bidan `['Flutter','Dart']`, digital-products `['Python','Pillow']`, autoapply `['Node','Browser ext']`.

For the two live entries, set a temporary `liveUrl: 'https://example.com'` so the test passes now; Phase 6 replaces it with the real `embedUrl`.

- [ ] **Step 4: Run tests, verify pass**

Run: `npm test -- projects.test`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/data/projects.ts src/data/__tests__/projects.test.ts
git commit -m "feat(portfolio): 11 personal projects with extended Project model + tests"
```

### Task 1.2: Update Experience + Skills content from CV

**Files:**
- Modify: `src/data/experience.ts`
- Modify: `src/data/skills.ts`
- Test: `src/data/__tests__/cv-content.test.ts` (create)

- [ ] **Step 1: Write the failing test**

```ts
import { experiences } from '@/data/experience';
import { skillCategories } from '@/data/skills';

test('experience reflects Senior role and both employers', () => {
  const tbs = experiences.find(e => e.company === 'The Body Shop Indonesia')!;
  expect(tbs.role).toMatch(/Senior Fullstack/);
  expect(tbs.bullets.length).toBeGreaterThanOrEqual(6);
  expect(experiences.some(e => e.company === 'HW Group')).toBe(true);
});

test('skills include the senior-signal categories', () => {
  const names = skillCategories.map(c => c.category);
  expect(names).toEqual(expect.arrayContaining(['Architecture','Data & Analytics','DevOps']));
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `npm test -- cv-content`
Expected: FAIL.

- [ ] **Step 3: Update `experience.ts`** — set TBS role to `Senior Fullstack Developer` and replace both entries' `bullets` with the CV bullets (verbatim from the spec §5 / mockup Experience section: 7 TBS bullets incl. 11-microservice APIs, Smart Admin Panel, real-time inventory, data warehouse w/ Python+dbt+Dagster, promo features, Flutter POS, Jenkins CI/CD; 3 HW bullets). Keep `projectIds` as-is or clear them (not used by the new Projects section).

- [ ] **Step 4: Update `skills.ts`** — replace `skillCategories` with the 8 CV categories (Languages, Backend, Frontend, Architecture, Messaging & Cache, Data & Analytics, DevOps, AI Stack) and their items from the mockup Skills section.

- [ ] **Step 5: Run tests, verify pass**

Run: `npm test -- cv-content`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/data/experience.ts src/data/skills.ts src/data/__tests__/cv-content.test.ts
git commit -m "feat(portfolio): CV-sourced experience + skills content"
```

---

## Phase 2 — Section restyle (Hero, About, Skills, Experience, Nav, Contact)

> For each section, port the exact markup/classes from the matching section in `docs/mockup/full-site-d.html`, translating inline styles to Tailwind v4 utilities + the CSS vars from Task 0.2. Keep the existing `framer-motion` entrances minimal (one hero reveal; no per-card fade-up). Keep R3F only in the Hero.

### Task 2.1: Hero

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1:** Replace copy with CV hero: eyebrow "Hello, I'm", `Irzan Aldi` + grad-text `Ananto.`, role `Senior Fullstack Developer`, lead from mockup, stats `5+ / 11 / 100+ stores`. Keep the R3F `Scene` background (ParticleField/FloatingShapes) but update colors to the new tokens; port the orbital SVG overlay from the mockup as an option (static SVG overlay is acceptable for v1 if R3F orbital isn't ready).
- [ ] **Step 2:** Run `npm run dev`, load `/`. Expected: hero shows new name/role/stats, dark-indigo bg, gradient on "Ananto." and "11".
- [ ] **Step 3:** Commit `feat(portfolio): restyle hero to D-brighter + CV copy`.

### Task 2.2: About (portrait + facts / bio)

**Files:**
- Modify: `src/components/sections/AboutSection.tsx`

- [ ] **Step 1:** Replace the 3D `TechOrbit` layout with the mockup's About layout: left column = portrait slot (`public/portrait.jpg`, fallback gradient block with "your photo" label) + facts list (Based in, Focus, Now, Education); right column = bio paragraph (CV summary). Remove the `Scene`/`TechOrbit` imports here.
- [ ] **Step 2:** Run dev, load `/`. Expected: About shows portrait placeholder + CV bio; no 3D orbit in About.
- [ ] **Step 3:** Commit `feat(portfolio): restyle About with portrait + CV bio`.

### Task 2.3: Skills section (new)

**Files:**
- Create: `src/components/sections/SkillsSection.tsx`
- Modify: `src/app/page.tsx` (insert `<SkillsSection />` after About)

- [ ] **Step 1:** Create `SkillsSection` rendering `skillCategories` as the mockup's 5-col categorized chip strip.
- [ ] **Step 2:** Insert into `page.tsx` between About and Experience.
- [ ] **Step 3:** Run dev. Expected: Skills strip shows 8 categories with chips.
- [ ] **Step 4:** Commit `feat(portfolio): add Skills section`.

### Task 2.4: Experience timeline

**Files:**
- Modify: `src/components/sections/ExperienceSection.tsx`

- [ ] **Step 1:** Render `experiences` as the mockup's vertical timeline (gradient rail, node per role, role · company, mono period, bullet list).
- [ ] **Step 2:** Run dev. Expected: two roles with CV bullets.
- [ ] **Step 3:** Commit `feat(portfolio): restyle Experience as timeline`.

### Task 2.5: Navbar + Contact + section order

**Files:**
- Modify: `src/components/layout/Navbar.tsx`, `src/components/sections/ContactSection.tsx`, `src/app/page.tsx`

- [ ] **Step 1:** Navbar links → About / Experience / Work / Contact (brand "Irzan Aldi"), restyled. Contact → heading from mockup + real links (GitHub `irzanaldi`, `mailto:irzanaldi@gmail.com`, LinkedIn CV URL, Résumé → `/resume.pdf`).
- [ ] **Step 2:** Ensure `page.tsx` order: Hero → About → Skills → Experience → Projects (Phase 3) → Contact.
- [ ] **Step 3:** Run dev, click nav anchors. Expected: smooth scroll to each section; contact links correct.
- [ ] **Step 4:** Commit `feat(portfolio): restyle nav + contact, set section order`.

---

## Phase 3 — Projects: data-driven Selected + grid (fixes filter bug)

### Task 3.1: ProjectCard component

**Files:**
- Create: `src/components/ui/ProjectCard.tsx`
- Test: `src/components/ui/__tests__/ProjectCard.test.tsx` (create)

- [ ] **Step 1: Write failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';

test('renders title, tagline, status chip and links to detail', () => {
  const p = projects[0];
  render(<ProjectCard project={p} />);
  expect(screen.getByText(p.title)).toBeInTheDocument();
  expect(screen.getByText(p.tagline)).toBeInTheDocument();
  expect(screen.getByRole('link')).toHaveAttribute('href', `/projects/${p.id}`);
});
```

- [ ] **Step 2:** Run `npm test -- ProjectCard` → FAIL (no component).
- [ ] **Step 3:** Implement `ProjectCard` (port the `.pcard` markup/classes from the mockup grid): a `next/link` to `/projects/${project.id}` wrapping name + status chip (map status→chip class/label), tagline/desc, stack (mono), category tag.
- [ ] **Step 4:** Run `npm test -- ProjectCard` → PASS.
- [ ] **Step 5:** Commit `feat(portfolio): ProjectCard grid component + test`.

### Task 3.2: Rewrite ProjectsSection (Selected + All) — remove hardcoded filter

**Files:**
- Modify: `src/components/sections/ProjectsSection.tsx`
- Test: `src/components/sections/__tests__/ProjectsSection.test.tsx` (create)

- [ ] **Step 1: Write failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { projects } from '@/data/projects';

test('renders all 11 project titles (no project silently dropped)', () => {
  render(<ProjectsSection />);
  for (const p of projects) {
    expect(screen.getAllByText(p.title).length).toBeGreaterThan(0);
  }
});
```

- [ ] **Step 2:** Run `npm test -- ProjectsSection` → FAIL (old filter drops 11 personal projects; they aren't TBS/HW).
- [ ] **Step 3:** Rewrite `ProjectsSection`: derive `const featured = projects.filter(p => p.featured)` and `const rest = projects.filter(p => !p.featured)`. Render a "Selected work" band (3 tiles from `featured`, port `.tile` markup — live→mock browser/`embedUrl` thumb, video→play glyph, mobile→phone minis) and an "All projects" `.pgrid` of `rest` using `ProjectCard`. **Delete the `company === 'The Body Shop Indonesia' / 'HW Group'` filters and the 3D `ProjectCard3D` positioning.** (3D stays only in Hero.)
- [ ] **Step 4:** Run `npm test -- ProjectsSection` → PASS.
- [ ] **Step 5:** Run `npm run dev`, load `/`. Expected: 3 selected tiles + 8 cards, no duplicates.
- [ ] **Step 6:** Commit `fix(portfolio): data-driven projects section (remove hardcoded company filter)`.

---

## Phase 4 — Detail route + media components (TDD)

### Task 4.1: pickMedia helper (precedence)

**Files:**
- Create: `src/lib/media.ts`
- Test: `src/lib/__tests__/media.test.ts` (create)

- [ ] **Step 1: Write failing test**

```ts
import { pickMedia } from '@/lib/media';

test('embed > video > gallery > none', () => {
  expect(pickMedia({ embedUrl:'e', video:'v', images:['i'] } as any).kind).toBe('embed');
  expect(pickMedia({ video:'v', images:['i'] } as any).kind).toBe('video');
  expect(pickMedia({ images:['i'] } as any).kind).toBe('gallery');
  expect(pickMedia({ images:[] } as any).kind).toBe('none');
});
```

- [ ] **Step 2:** Run `npm test -- media` → FAIL.
- [ ] **Step 3:** Implement:

```ts
import type { Project } from '@/data/projects';
export type Media =
  | { kind:'embed'; url:string } | { kind:'video'; url:string }
  | { kind:'gallery'; images:string[] } | { kind:'none' };
export function pickMedia(p: Project): Media {
  if (p.embedUrl) return { kind:'embed', url:p.embedUrl };
  if (p.video) return { kind:'video', url:p.video };
  if (p.images?.length) return { kind:'gallery', images:p.images };
  return { kind:'none' };
}
```

- [ ] **Step 4:** Run `npm test -- media` → PASS.
- [ ] **Step 5:** Commit `feat(portfolio): media precedence helper + test`.

### Task 4.2: PhoneFrame + ProjectDetail components

**Files:**
- Create: `src/components/ui/PhoneFrame.tsx`
- Create: `src/components/ui/ProjectDetail.tsx`

- [ ] **Step 1:** `PhoneFrame` = the mockup `.phone` markup wrapping `children` (a screenshot `<img>` or placeholder). Props: `{ src?: string; variant?: 'a'|'b' }`.
- [ ] **Step 2:** `ProjectDetail` (`{ project: Project }`): hero-media region renders by `pickMedia`:
  - `embed` → sandboxed, lazy `<iframe src={url} loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups" className="aspect-video w-full rounded-xl border">` + an "Open in new tab" link.
  - `video` → `<video controls>` (or YouTube `<iframe>` if URL is YouTube).
  - `gallery` → responsive grid of `project.images`; if `platforms` includes `mobile`, render those in `PhoneFrame`.
  - `none` → gradient placeholder.
  Then body: kick (category · platforms), `title`, `description`, `highlights` list, stack chips, buttons (`liveUrl`→"View live", `repoUrl`→"Source"). Port classes from the mockup `.detail`.
- [ ] **Step 3:** Run `npm run dev` (will be wired next task). Commit `feat(portfolio): PhoneFrame + ProjectDetail components`.

### Task 4.3: `/projects/[id]` static route

**Files:**
- Create: `src/app/projects/[id]/page.tsx`
- Test: `src/app/projects/__tests__/params.test.ts` (create)

- [ ] **Step 1:** Read `node_modules/next/dist/docs/` for the current `generateStaticParams` + typed `params` API in 16.2.4 (params may be async).

- [ ] **Step 2: Write failing test**

```ts
import { generateStaticParams } from '@/app/projects/[id]/page';
import { projects } from '@/data/projects';

test('generateStaticParams covers every project id', async () => {
  const params = await generateStaticParams();
  expect(params.map((p:{id:string}) => p.id).sort())
    .toEqual(projects.map(p => p.id).sort());
});
```

- [ ] **Step 3:** Run `npm test -- params` → FAIL.
- [ ] **Step 4:** Implement `page.tsx`: `export async function generateStaticParams(){ return projects.map(p => ({ id: p.id })); }`, plus a default component that resolves `params`, finds the project (`notFound()` if missing), and renders `<ProjectDetail project={p} />`. Add `generateMetadata` for title/description per the 16.2.4 docs.
- [ ] **Step 5:** Run `npm test -- params` → PASS. Then `npm run build` → expected: 11 static `/projects/*` pages generated.
- [ ] **Step 6:** Run dev, visit `/projects/pinjam-buku` and `/projects/pos`. Expected: detail renders; pos shows phone frames.
- [ ] **Step 7:** Commit `feat(portfolio): static /projects/[id] detail route + test`.

### Task 4.4: a11y + reduced-motion smoke

**Files:**
- Test: `src/app/__tests__/a11y.test.tsx` (create)

- [ ] **Step 1:** Add a render smoke test for the home page sections asserting there is exactly one `<h1>` and each project card link has an accessible name. Add a CSS assertion-by-inspection note: confirm `@media (prefers-reduced-motion: reduce)` disables the orbital spin in `globals.css`.
- [ ] **Step 2:** Run `npm test` (full) → PASS.
- [ ] **Step 3:** Commit `test(portfolio): a11y + reduced-motion smoke`.

---

## Phase 5 — Assets

### Task 5.1: Résumé + portrait placeholder

**Files:**
- Create: `public/resume.pdf`, `public/portrait.jpg` (placeholder)

- [ ] **Step 1:** Copy the uploaded CV into the site:

```bash
cp "/Users/irzan-aldi/.paseo-b/uploads/upload_992390f4-aec6-49aa-b629-4948304907cc/CV-Irzan-Aldi-Ananto-Senior-Fullstack.pdf" public/resume.pdf
```

- [ ] **Step 2:** Add a placeholder `public/portrait.jpg` (any neutral image); the About slot already falls back to a gradient if missing. User will replace later.
- [ ] **Step 3:** Commit `chore(portfolio): add résumé pdf + portrait placeholder`.

### Task 5.2: Screenshot capture script (web apps)

**Files:**
- Create: `scripts/capture.mjs`

- [ ] **Step 1:** Add a Playwright script that, given a running app URL, writes screenshots to `public/shots/<id>/`. Document usage in a comment. (Run manually per app once it's running locally or deployed.)

```js
// usage: node scripts/capture.mjs <id> <url> [url2 ...]
import { chromium } from 'playwright';
const [id, ...urls] = process.argv.slice(2);
const b = await chromium.launch(); const pg = await b.newPage({ viewport:{width:1440,height:900} });
let i=0; for (const u of urls){ await pg.goto(u,{waitUntil:'networkidle'}); await pg.screenshot({ path:`public/shots/${id}/${i++}.png`, fullPage:true }); }
await b.close();
```

- [ ] **Step 2:** For non-web (crypto-bot, CLIPER, digital-products, mobile apps), collect existing media manually into `public/shots/<id>/` and demo videos into `public/video/<id>.mp4`; then set `images`/`video` in `projects.ts`.
- [ ] **Step 3:** Commit `chore(portfolio): screenshot capture script`.

---

## Phase 6 — Deploy (free tier)

> Hard-to-reverse / outward-facing. Confirm with the user before each live deploy. No secrets committed.

### Task 6.1: Deploy portfolio to Vercel

- [ ] **Step 1:** Ensure the repo builds: `npm run build` → PASS.
- [ ] **Step 2:** In Vercel, import `irzanaldi/portfolio-3d`; framework auto = Next.js; set env `NEXT_PUBLIC_SITE_URL=https://<project>.vercel.app`; Deploy.
- [ ] **Step 3:** Verify the live site loads and `/projects/*` pages work.
- [ ] **Step 4:** Commit any config change (e.g. `next.config` metadataBase) `chore(portfolio): vercel config`.

### Task 6.2: Deploy embeddable Laravel apps (pinjam-buku, silsilah) — free host

> Separate repos. Per app:

- [ ] **Step 1:** Provision a free host (Fly.io or Render free web service) + free DB (Neon Postgres or Aiven MySQL). Set `APP_URL`, `APP_KEY`, `DB_*` as host env (not committed).
- [ ] **Step 2:** `php artisan migrate --seed` with demo data so the public pages have content.
- [ ] **Step 3:** **Allow embedding:** add middleware/response header `Content-Security-Policy: frame-ancestors 'self' https://<project>.vercel.app` and ensure no `X-Frame-Options: DENY` is sent. Verify by loading the app inside a test iframe.
- [ ] **Step 4:** Confirm the public route (`/katalog` for pinjam-buku) renders standalone.
- [ ] **Step 5 (optional):** Attempt `competitor-intel` / `pos` web the same way; skip if they need live scraping/cron or paid services.

### Task 6.3: Wire live URLs back into the portfolio

**Files:**
- Modify: `src/data/projects.ts`

- [ ] **Step 1:** Replace the temporary `liveUrl` on `pinjam-buku` and `silsilah` with the real deployed URL as `embedUrl` (and keep `liveUrl` = same). Add any newly-deployed apps' `embedUrl`.
- [ ] **Step 2:** Run `npm test -- projects.test` → PASS. `npm run build` → PASS.
- [ ] **Step 3:** Commit `feat(portfolio): wire live embed URLs`. Redeploy Vercel (auto on push).

### Task 6.4: README deploy notes

**Files:**
- Modify: `README.md`

- [ ] **Step 1:** Append a "Deploy" section documenting the Vercel steps, the free-host + DB choice, and the `frame-ancestors` embed requirement, so it's reproducible.
- [ ] **Step 2:** Commit `docs(portfolio): deployment + embed notes`.

---

## Self-Review (completed by plan author)

- **Spec coverage:** goal→(all phases); visual system→Phase 0+2; data model→1.1; CV content→1.2+2; "viewable directly" mixed→4.2/4.3; fix filter bug→3.2; assets→5; deploy+embed headers+free+netra-not-live→6 (+note); testing→1.1,1.2,3.1,3.2,4.1,4.3,4.4; Next-16 caveat→0.1,4.3. Out-of-scope items excluded. ✔
- **Placeholder scan:** code steps carry real code; restyle steps point to the committed mockup as exact visual source (DRY) rather than duplicating 600 lines. ✔
- **Type consistency:** `Project` fields used in ProjectCard/ProjectDetail/pickMedia/tests match Task 1.1 (`tagline`, `status`, `embedUrl`, `video`, `images`, `platforms`, `featured`). `pickMedia` → `Media` union used in ProjectDetail. ✔

## Assumptions
- Testing Library + Jest already configured (they are: `jest.config.ts`, deps present).
- `netra` stays non-public per spec security call unless the user overrides.
- Playwright is added only for the capture script (dev-time), not a runtime dep.
