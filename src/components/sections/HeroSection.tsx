'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const Scene = dynamic(
  () => import('@/components/three/Scene').then((mod) => mod.Scene),
  { ssr: false }
);
const ParticleField = dynamic(
  () => import('@/components/three/ParticleField').then((mod) => mod.ParticleField),
  { ssr: false }
);
const FloatingShapes = dynamic(
  () => import('@/components/three/FloatingShapes').then((mod) => mod.FloatingShapes),
  { ssr: false }
);

export function HeroSection() {
  return (
    <section id="hero" className="relative flex h-screen items-center overflow-hidden">
      {/* 3D Background - hidden on mobile */}
      <div className="absolute inset-0 hidden md:block">
        <Scene>
          <ambientLight intensity={0.2} />
          <ParticleField count={800} />
          <FloatingShapes />
        </Scene>
      </div>

      {/* Mobile gradient fallback (dark-indigo, D-brighter) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg2)] via-[var(--bg)] to-[var(--surface)] md:hidden" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-[16px] font-[family-name:var(--font-mono)] text-[.8rem] text-[var(--v)]">
            Hello, I&apos;m
          </p>

          <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2.8rem,7.6vw,6.2rem)] font-semibold leading-[0.9] tracking-[-.025em]">
            Irzan Aldi
            <br />
            <span className="grad-text">Ananto.</span>
          </h1>

          <p className="mt-[14px] font-[family-name:var(--font-heading)] text-[clamp(1.1rem,2vw,1.5rem)] font-medium text-[var(--muted)]">
            Senior Fullstack Developer
          </p>

          <p className="mt-[18px] max-w-[38ch] text-[1.1rem] text-[var(--muted)]">
            5+ years taking retail &amp; e-commerce products from vague pain points all the way to production — plus eleven systems of my own, from security to media.
          </p>

          <div className="mt-[26px] flex gap-[28px]">
            <div>
              <b className="block font-[family-name:var(--font-heading)] text-[1.6rem] font-semibold">5+</b>
              <span className="mt-[2px] block font-[family-name:var(--font-mono)] text-[.66rem] text-[var(--muted)]">years</span>
            </div>
            <div>
              <b className="grad-text block font-[family-name:var(--font-heading)] text-[1.6rem] font-semibold">11</b>
              <span className="mt-[2px] block font-[family-name:var(--font-mono)] text-[.66rem] text-[var(--muted)]">own projects</span>
            </div>
            <div>
              <b className="block font-[family-name:var(--font-heading)] text-[1.6rem] font-semibold">100+</b>
              <span className="mt-[2px] block font-[family-name:var(--font-mono)] text-[.66rem] text-[var(--muted)]">stores served</span>
            </div>
          </div>

          <div className="mt-[30px] font-[family-name:var(--font-mono)] text-[.68rem] text-[var(--faint)]">
            ↓ scroll
          </div>
        </motion.div>
      </div>
    </section>
  );
}
