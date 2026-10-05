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
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background - hidden on mobile */}
      <div className="absolute inset-0 hidden md:block">
        <Scene>
          <ambientLight intensity={0.2} />
          <ParticleField count={800} />
          <FloatingShapes />
        </Scene>
      </div>

      {/* Mobile gradient fallback */}
      <div className="absolute inset-0 md:hidden bg-gradient-to-br from-[#0a0a1a] via-[#0a1628] to-[#1a0a2e]" />

      {/* Content overlay */}
      <div className="relative z-10 text-center px-6">
        <motion.p
          className="text-[var(--v)] font-[family-name:var(--font-mono)] text-sm mb-4 tracking-widest uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl font-[family-name:var(--font-heading)] font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Irzan Aldi{' '}
          <span className="text-[var(--v)]">Ananto</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-[var(--muted)] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Fullstack Developer
        </motion.p>

        <motion.p
          className="text-[var(--muted)] max-w-lg mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          3+ years building web apps & APIs for retail and e-commerce platforms.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-[var(--v)]/40 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-[var(--v)]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
