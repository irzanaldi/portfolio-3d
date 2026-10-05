// portfolio-3d/src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Irzan Aldi Ananto — Fullstack Developer',
  description:
    'Fullstack Developer with 3+ years experience building web apps and APIs for retail and e-commerce platforms. NestJS, Next.js, Flutter, Laravel.',
  keywords: [
    'Fullstack Developer',
    'NestJS',
    'Next.js',
    'Flutter',
    'Laravel',
    'React',
    'TypeScript',
    'Portfolio',
  ],
  authors: [{ name: 'Irzan Aldi Ananto' }],
  openGraph: {
    title: 'Irzan Aldi Ananto — Fullstack Developer',
    description:
      'Fullstack Developer with 3+ years experience building web apps and APIs for retail and e-commerce platforms.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Irzan Aldi Ananto',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Irzan Aldi Ananto — Fullstack Developer',
    description:
      'Fullstack Developer with 3+ years experience building web apps and APIs.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://api.fontshare.com" />
      <link
        href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=general-sans@400,500,600&display=swap"
        rel="stylesheet"
        precedence="default"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
        precedence="default"
      />
      <body className="antialiased">{children}</body>
    </html>
  );
}
