'use client';
import { useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { OrbitalScene } from './OrbitalScene';
import { DetailPanel } from './DetailPanel';
import { useWebGL } from '@/hooks/useWebGL';
import type { SelectionRef } from '@/lib/orbital';

export function OrbitalExperience() {
  const webglOK = useWebGL();
  const [selected, setSelected] = useState<SelectionRef | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const [introGone, setIntroGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIntroGone(true), 3800);
    return () => clearTimeout(t);
  }, []);

  const onUserInteract = useCallback(() => {
    setAutoRotate(false);
    setIntroGone(true);
  }, []);
  const onSelect = useCallback((ref: SelectionRef) => {
    setSelected(ref);
    setIntroGone(true);
  }, []);

  if (!webglOK) {
    return (
      <div className="orbital-root">
        <div className="orbital-fallback">
          <h2>Orbital Workspace needs WebGL</h2>
          <p>Your browser/device can&apos;t render the 3D view.</p>
          <Link className="orbital-back" href="/">
            ← View classic portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orbital-root">
      <Link className="orbital-back" href="/">
        ← Home
      </Link>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 5, 19], fov: 48 }}
        gl={{ antialias: true, alpha: true, toneMappingExposure: 1.15 }}
        onPointerMissed={() => setSelected(null)}
      >
        <OrbitalScene
          selected={selected}
          autoRotate={autoRotate}
          reducedMotion={reducedMotion}
          onSelect={onSelect}
          onUserInteract={onUserInteract}
        />
      </Canvas>

      <div className="orbital-vignette" />

      <AnimatePresence>
        {!introGone && (
          <motion.div
            className="orbital-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <motion.span
              className="orbital-intro__eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Interactive Portfolio
            </motion.span>
            <motion.h1
              className="orbital-intro__title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              IRZAN ALDI
              <br />
              ANANTO
            </motion.h1>
            <motion.span
              className="orbital-intro__sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              Fullstack Developer — explore the orbit
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="orbital-legend">
        <div className="orbital-legend__row">
          <span className="orbital-legend__dot" style={{ color: '#22d3ee', background: '#22d3ee' }} />
          Skills
        </div>
        <div className="orbital-legend__row">
          <span className="orbital-legend__dot" style={{ color: '#a78bfa', background: '#a78bfa' }} />
          Experience
        </div>
        <div className="orbital-legend__row">
          <span className="orbital-legend__dot" style={{ color: '#e879f9', background: '#e879f9' }} />
          Projects
        </div>
      </div>

      <DetailPanel selected={selected} onClose={() => setSelected(null)} />
      <div className="orbital-hint">drag to orbit · click a node to explore</div>
      <div className="orbital-grain" />
    </div>
  );
}
