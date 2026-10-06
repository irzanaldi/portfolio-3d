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
  mobileImages?: string[];
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
    tagline: 'A full library system — catalog, kiosk, and circulation.',
    description:
      'A full-scale library management system ported from Perpusnas’ INLISLite to Laravel and Filament — public catalog (OPAC), self-service kiosk, circulation, cataloging, and member services in one platform.',
    highlights: [
      'Public OPAC catalog and self-service loan/return kiosk',
      'Circulation, fines, and reservations handled end to end',
      'Filament admin console across dozens of library resources',
    ],
    techStack: ['Laravel', 'Filament', 'MySQL'],
    status: 'code',
    platforms: ['web'],
    images: [
      '/shots/pinjam-buku/1.png',
      '/shots/pinjam-buku/3.png',
      '/shots/pinjam-buku/0.png',
      '/shots/pinjam-buku/2.png',
    ],
    repoUrl: 'https://github.com/irzanaldi/pinjam-buku',
    featured: true,
  },
  {
    id: 'cliper',
    title: 'CLIPER',
    category: 'Media',
    tagline: 'Automated short-video pipeline — autocut and AI faceless, ready to post.',
    description:
      'An automated video pipeline with two modes: autocut (scene- and silence-aware splitting of long videos into clips) and AI faceless (stock footage, voiceover and captions). Produces source-quality vertical clips, delivered straight to Telegram.',
    highlights: [
      'Autocut: scene/silence-aware split of long videos into N clips',
      'AI faceless: stock footage + voiceover + captions, generated end to end',
      'Source-quality vertical output, delivered to Telegram',
    ],
    techStack: ['n8n', 'Python', 'FFmpeg'],
    status: 'video',
    platforms: ['web'],
    images: ['/shots/cliper/poster.jpg'],
    video: '/video/cliper.mp4',
    repoUrl: 'https://github.com/irzanaldi/cliper',
    featured: true,
  },
  {
    id: 'crypto-bot',
    title: 'crypto-bot',
    category: 'Finance',
    tagline: 'A market-agnostic trading bot, backtest-first — proven on history before going live.',
    description:
      'A market-agnostic crypto trading bot built backtest-first — every strategy has to prove itself on historical data before it goes near a live order. Charts below are from the repo’s own backtest engine on offline demo data.',
    highlights: [
      'Backtest-first workflow — no strategy goes live unproven',
      'Equity curve, drawdown and trade signals plotted per run',
      'Market-agnostic design on Python, Pandas and ccxt',
    ],
    techStack: ['Python', 'Pandas', 'ccxt'],
    status: 'gallery',
    platforms: ['cli'],
    images: [
      '/shots/crypto-bot/03-dashboard.png',
      '/shots/crypto-bot/01-equity-curve.png',
      '/shots/crypto-bot/02-price-signals.png',
    ],
    repoUrl: 'https://github.com/irzanaldi/crypto-bot',
    featured: true,
  },
  {
    id: 'netra',
    title: 'netra',
    category: 'Security',
    tagline: 'External attack-surface recon, automated end to end — discover, scan, triage, report, distribute.',
    description:
      'A bug-bounty and external attack-surface management platform that runs the full recon pipeline — asset discovery, vulnerability scanning, triage, reporting, and distribution — as one automated flow, shipped as a single Go binary with an embedded React dashboard.',
    highlights: [
      'Full pipeline from asset discovery to vulnerability triage',
      'Findings, reports, export and webhook distribution',
      'Single Go binary serving an embedded React dashboard',
    ],
    techStack: ['Go', 'React', 'Postgres', 'Docker'],
    status: 'code',
    platforms: ['web'],
    images: ['/shots/netra/1.png', '/shots/netra/0.png'],
    repoUrl: 'https://github.com/irzanaldi/netra',
  },
  {
    id: 'competitor-intel',
    title: 'competitor-intel',
    category: 'Intelligence',
    tagline: 'Track what competitors ship and surface the changes that matter.',
    description:
      'A competitor-tracking service that watches product and pricing changes across targets and surfaces the ones that actually matter — a dashboard over brands, products, and a promo calendar, running as a small Dockerized stack.',
    highlights: [
      'Brand, product, and promo-calendar tracking in one dashboard',
      'Diffing that filters noise down to meaningful changes',
      'pnpm monorepo: Node web + API + Postgres, easy to self-host',
    ],
    techStack: ['Node', 'Docker', 'Postgres'],
    status: 'code',
    platforms: ['web'],
    images: [
      '/shots/competitor-intel/0.png',
      '/shots/competitor-intel/1.png',
      '/shots/competitor-intel/2.png',
    ],
    repoUrl: 'https://github.com/irzanaldi/competitor-intel',
  },
  {
    id: 'silsilah',
    title: 'silsilah',
    category: 'Platforms',
    tagline: 'School administration service system — submit, track, done.',
    description:
      'A school administrative service platform (SILSILAH — Sistem Layanan Administrasi Sekolah) for SMAN 49 Jakarta: a public portal to submit and track administrative requests, plus an admin console for student and staff records, service types, and reports.',
    highlights: [
      'Public portal to submit and track administrative requests',
      'Admin console for student & staff records and settings',
      'Service-type management, SOP/FAQ info, and reporting',
    ],
    techStack: ['Laravel', 'Livewire', 'MySQL'],
    status: 'code',
    platforms: ['web'],
    images: [
      '/shots/silsilah/0.png',
      '/shots/silsilah/3.png',
      '/shots/silsilah/1.png',
      '/shots/silsilah/2.png',
    ],
    repoUrl: 'https://github.com/irzanaldi/silsilah',
  },
  {
    id: 'presensi',
    title: 'presensi',
    category: 'Platforms',
    tagline: 'HRIS with attendance, leave, and a mobile check-in app.',
    description:
      'A human-resources information system: attendance tracking, leave management, users/roles/permissions, and office locations — a Laravel + Livewire admin panel paired with a Flutter check-in companion app.',
    highlights: [
      'Attendance tracking with a Flutter mobile check-in companion',
      'Leave management and office-location setup',
      'Users, roles, and permissions on a Livewire admin panel',
    ],
    techStack: ['Laravel', 'Livewire', 'Flutter'],
    status: 'code',
    platforms: ['web', 'mobile'],
    images: ['/shots/presensi/1.png', '/shots/presensi/2.png', '/shots/presensi/0.png'],
    mobileImages: [
      '/shots/presensi/mobile-home.png',
      '/shots/presensi/mobile-attendance.png',
      '/shots/presensi/mobile-profile.png',
    ],
    repoUrl: 'https://github.com/irzanaldi/presensi',
  },
  {
    id: 'pos',
    title: 'pos',
    category: 'Platforms',
    tagline: 'A point-of-sale suite — web console, backend, and two mobile apps.',
    description:
      'A point-of-sale suite built as four apps: a NestJS backend and a web console for the counter, plus two Flutter apps — one for staff on the floor, one for customers to order and pay.',
    highlights: [
      'Offline-first transactions that sync when the network returns',
      'Real-time inventory shared across web and both mobile apps',
      'Separate staff and customer experiences on one backend',
    ],
    techStack: ['NestJS', 'Node', 'Postgres', 'Flutter'],
    status: 'code',
    platforms: ['web', 'mobile'],
    images: ['/shots/pos/0.png'],
    mobileImages: ['/shots/pos/mobile-login.png'],
    repoUrl: 'https://github.com/irzanaldi/pos',
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
    images: [
      '/shots/digital-products/01-huruf.png',
      '/shots/digital-products/02-warna-bentuk.png',
      '/shots/digital-products/03-hewan.png',
      '/shots/digital-products/04-buah-sayur.png',
      '/shots/digital-products/05-mewarnai.png',
    ],
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
    images: ['/shots/autoapply/0.png', '/shots/autoapply/1.png', '/shots/autoapply/2.png'],
    repoUrl: 'https://github.com/irzanaldi/autoapply',
  },
];
