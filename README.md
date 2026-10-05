This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Cara Setup

Portofolio 3D interaktif: **Next.js 16 + React 19** dengan **React Three Fiber / Drei** (Three.js), Tailwind CSS, dan TypeScript.

### Prasyarat

- Node.js 20+ & npm

### Langkah

```bash
# 1. Install dependency
npm install

# 2. Environment (opsional) — buat .env.local
#    NEXT_PUBLIC_SITE_URL=http://localhost:3000

# 3. Jalankan server dev
npm run dev             # http://localhost:3000
```

Build & jalankan produksi: `npm run build` lalu `npm run start`. Lint: `npm run lint`. Test (Jest): `npm test` atau `npm run test:watch`.

## Deploy (gratis)

### 1. Portfolio → Vercel
- Import repo `irzanaldi/portfolio-3d` di Vercel → framework ke-detect Next.js otomatis.
- Set env `NEXT_PUBLIC_SITE_URL=https://<project>.vercel.app`.
- Deploy. Tiap push = auto-deploy.

### 2. App yang di-embed live (pinjam-buku, silsilah) → host gratis
- Deploy Laravel-nya ke Fly.io / Render (free) + DB gratis (Neon/Aiven). Set `APP_URL`, `APP_KEY`, `DB_*`, lalu `php artisan migrate --seed` (data demo).
- **Izinkan embed:** kirim header `Content-Security-Policy: frame-ancestors 'self' https://<domain-portfolio>` dan JANGAN kirim `X-Frame-Options: DENY` — kalau tidak, iframe-nya blank.
- Masukin URL hasil deploy ke `embedUrl` project terkait di `src/data/projects.ts`.

### 3. Aset
- Foto diri → taruh `public/portrait.jpg`. Résumé sudah ada di `public/resume.pdf`.
- Screenshot web app: `node scripts/capture.mjs <id> <url>` (butuh `npm i -D playwright && npx playwright install chromium`); hasil ke `public/shots/<id>/`, lalu isi array `images` di `projects.ts`.

### Catatan
- `netra` sengaja TIDAK di-deploy publik (tool recon) — screenshot + GitHub saja.
- Data project ada di `src/data/projects.ts`; tiap project punya halaman sendiri di `/projects/<id>`.
