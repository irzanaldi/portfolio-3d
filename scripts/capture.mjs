// Screenshot capture for project showcase assets.
//
// Usage:
//   node scripts/capture.mjs <id> <url> [url2 ...]
//
// Writes full-page screenshots to public/shots/<id>/0.png, 1.png, ...
// Run it against a web app that is already running locally or deployed
// (e.g. the portfolio itself, or a live pinjam-buku/silsilah instance),
// then set the resulting paths in the matching project's `images` array
// in src/data/projects.ts.
//
// Requires Playwright: `npm i -D playwright && npx playwright install chromium`

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const [id, ...urls] = process.argv.slice(2);
if (!id || urls.length === 0) {
  console.error('usage: node scripts/capture.mjs <id> <url> [url2 ...]');
  process.exit(1);
}

await mkdir(`public/shots/${id}`, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

let i = 0;
for (const url of urls) {
  await page.goto(url, { waitUntil: 'networkidle' });
  const out = `public/shots/${id}/${i++}.png`;
  await page.screenshot({ path: out, fullPage: true });
  console.log('wrote', out);
}

await browser.close();
