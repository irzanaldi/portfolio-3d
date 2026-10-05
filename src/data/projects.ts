// portfolio-3d/src/data/projects.ts
export interface Project {
  id: string;
  title: string;
  category: 'Security' | 'Intelligence' | 'Finance' | 'Platforms' | 'Media' | 'Automation' | 'Mobile';
  tagline: string;
  description: string;
  highlights: string[];
  techStack: string[];
  status: 'live' | 'video' | 'gallery' | 'code' | 'prototype';
  platforms?: ('web' | 'mobile' | 'cli')[];
  images: string[];
  video?: string;
  embedUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'pinjam-buku',
    title: 'pinjam-buku',
    category: 'Platforms',
    tagline: 'A full library system. Browse the live catalog right here.',
    description:
      'A full-scale library management system ported from Perpusnas’ INLISLite to Laravel and Filament — public catalog, circulation, cataloging, and member services in one platform.',
    highlights: [
      'Public catalog and self-service kiosk for patrons',
      'Circulation, fines, and reservations handled end-to-end',
      'Admin console across dozens of library resources, built with Filament',
    ],
    techStack: ['Laravel', 'Filament', 'MySQL'],
    status: 'live',
    platforms: ['web'],
    images: [],
    repoUrl: 'https://github.com/irzanaldi/pinjam-buku',
    liveUrl: 'https://example.com',
    featured: true,
  },
  {
    id: 'cliper',
    title: 'CLIPER',
    category: 'Media',
    tagline: 'One long video into ready-to-post clips.',
    description:
      'An automated video pipeline that turns one long recording into short, ready-to-post clips — scene- and silence-aware splitting, source-quality output, delivered straight to Telegram.',
    highlights: [
      'Scene/silence-aware auto-split into N clips',
      'Source-quality output, no re-encode artifacts',
      'Delivers finished clips straight to Telegram',
    ],
    techStack: ['n8n', 'Python', 'FFmpeg'],
    status: 'video',
    platforms: ['web'],
    images: [],
    repoUrl: 'https://github.com/irzanaldi/cliper',
    featured: true,
  },
  {
    id: 'pos',
    title: 'pos',
    category: 'Platforms',
    tagline: 'POS suite — web + two mobile apps.',
    description:
      'A point-of-sale suite built as four apps: a web console and backend for the counter, plus two Flutter apps — one for staff on the floor, one for customers to order and pay.',
    highlights: [
      'Offline-first transactions that sync when the network returns',
      'Real-time inventory shared across web and both mobile apps',
      'Separate staff and customer experiences on one backend',
    ],
    techStack: ['NestJS', 'Node', 'Postgres', 'Flutter'],
    status: 'video',
    platforms: ['web', 'mobile'],
    images: [],
    repoUrl: 'https://github.com/irzanaldi/pos',
    featured: true,
  },
  {
    id: 'netra',
    title: 'netra',
    category: 'Security',
    tagline: 'External attack-surface recon, automated end to end — discover, scan, triage, report, distribute.',
    description:
      'A bug-bounty and external attack-surface management platform that runs the full recon pipeline — asset discovery, vulnerability scanning, triage, reporting, and distribution — as one automated flow.',
    highlights: [
      'Full pipeline from asset discovery to vulnerability triage',
      'Automated reporting with export and webhook distribution',
      'Built single-binary in Go with a React front end',
    ],
    techStack: ['Go', 'React', 'Postgres', 'Docker'],
    status: 'code',
    platforms: ['web'],
    images: [],
    repoUrl: 'https://github.com/irzanaldi/netra',
  },
  {
    id: 'competitor-intel',
    title: 'competitor-intel',
    category: 'Intelligence',
    tagline: 'Track what competitors ship and surface the changes that matter.',
    description:
      'A competitor-tracking service that watches product and pricing changes across targets and surfaces the ones that actually matter, running as a small Dockerized stack.',
    highlights: [
      'Scheduled crawls across competitor sites and product pages',
      'Diffing that filters noise down to meaningful changes',
      'Dockerized Node + Postgres stack, easy to self-host',
    ],
    techStack: ['Node', 'Docker', 'Postgres'],
    status: 'code',
    platforms: ['web'],
    images: [],
    repoUrl: 'https://github.com/irzanaldi/competitor-intel',
  },
  {
    id: 'crypto-bot',
    title: 'crypto-bot',
    category: 'Finance',
    tagline: 'A market-agnostic trading bot, backtest-first — strategies prove out on history before going live.',
    description:
      'A market-agnostic crypto trading bot built backtest-first — every strategy has to prove itself on historical data before it’s allowed near a live order.',
    highlights: [
      'Backtest-first workflow — no strategy goes live unproven',
      'Market-agnostic design, not tied to one exchange or pair',
      'Built on Python, Pandas and ccxt for data and execution',
    ],
    techStack: ['Python', 'Pandas', 'ccxt'],
    status: 'video',
    platforms: ['cli'],
    images: [],
    repoUrl: 'https://github.com/irzanaldi/crypto-bot',
  },
  {
    id: 'silsilah',
    title: 'silsilah',
    category: 'Platforms',
    tagline: 'Map a family across generations and explore the tree.',
    description:
      'A family genealogy platform for mapping relatives across generations and exploring the resulting tree interactively, built on Laravel with a Node service.',
    highlights: [
      'Interactive, multi-generation family tree explorer',
      'Laravel backend with a dedicated Node service',
      'Built for ongoing, collaborative family record-keeping',
    ],
    techStack: ['Laravel', 'Node', 'MySQL'],
    status: 'live',
    platforms: ['web'],
    images: [],
    repoUrl: 'https://github.com/irzanaldi/silsilah',
    liveUrl: 'https://example.com',
  },
  {
    id: 'presensi',
    title: 'presensi',
    category: 'Mobile',
    tagline: 'Attendance tracking with a mobile check-in companion.',
    description:
      'An attendance-tracking system pairing a Laravel backend with a Flutter check-in companion app for employees in the field.',
    highlights: [
      'Mobile check-in/out with a Flutter companion app',
      'Laravel backend for attendance records and reporting',
      'Built for distributed or field-based teams',
    ],
    techStack: ['Laravel', 'Flutter'],
    status: 'code',
    platforms: ['mobile'],
    images: [],
    repoUrl: 'https://github.com/irzanaldi/presensi',
  },
  {
    id: 'prototype-bidan',
    title: 'prototype-bidan',
    category: 'Mobile',
    tagline: 'A mobile prototype for midwife-led care — booking and records.',
    description:
      'A mobile prototype exploring midwife-led care — appointment booking and patient records in a single Flutter app.',
    highlights: [
      'Appointment booking flow for midwife-led care',
      'Patient record-keeping on mobile',
      'Flutter prototype exploring the domain before a full build',
    ],
    techStack: ['Flutter', 'Dart'],
    status: 'prototype',
    platforms: ['mobile'],
    images: [],
    repoUrl: 'https://github.com/irzanaldi/prototype-bidan',
  },
  {
    id: 'digital-products',
    title: 'DIGITAL_PRODUCTS',
    category: 'Media',
    tagline: 'Generates printable kids’ worksheets and carousels at scale, ready to list and sell.',
    description:
      'A content-generation pipeline that produces printable kids’ worksheets and social carousels at scale, with output ready to list and sell on digital marketplaces.',
    highlights: [
      'Bulk generation of printable worksheets and carousels',
      'Output ready to list on digital marketplaces',
      'Built on Python and Pillow for image composition',
    ],
    techStack: ['Python', 'Pillow'],
    status: 'gallery',
    platforms: ['cli'],
    images: [],
    repoUrl: 'https://github.com/irzanaldi/digital-products',
  },
  {
    id: 'autoapply',
    title: 'autoapply',
    category: 'Automation',
    tagline: 'Applies to jobs without the copy-paste — a browser extension plus a web dashboard.',
    description:
      'A job-application automation tool — a browser extension that fills and submits applications paired with a web dashboard to track them, cutting out the copy-paste.',
    highlights: [
      'Browser extension autofills job applications',
      'Web dashboard tracks application status',
      'Removes repetitive copy-paste from job hunting',
    ],
    techStack: ['Node', 'Browser ext'],
    status: 'code',
    platforms: ['web'],
    images: [],
    repoUrl: 'https://github.com/irzanaldi/autoapply',
  },
];
