// portfolio-3d/src/app/layout.tsx
import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

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
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
