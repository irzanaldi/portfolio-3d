import type { Metadata } from 'next';
import { Syne, Sora } from 'next/font/google';
import { OrbitalExperience } from '@/components/orbital/OrbitalExperience';

const display = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-orbital-display',
});
const body = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-orbital-body',
});

export const metadata: Metadata = {
  title: 'Orbital Workspace — Irzan Aldi Ananto',
  description: 'An interactive 3D exploration of skills, experience, and projects.',
};

export default function OrbitalPage() {
  return (
    <main className={`${display.variable} ${body.variable}`}>
      <OrbitalExperience />
    </main>
  );
}
