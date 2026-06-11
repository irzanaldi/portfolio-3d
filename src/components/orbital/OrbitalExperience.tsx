'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import Link from 'next/link';
import { OrbitalScene } from './OrbitalScene';
import { Sections } from './Sections';
import { useWebGL } from '@/hooks/useWebGL';
import { WAYPOINTS, activeSection, type SectionId } from '@/lib/orbital';

export function OrbitalExperience() {
  const webglOK = useWebGL();
  const [activeId, setActiveId] = useState<SectionId>('intro');
  const [reducedMotion, setReducedMotion] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const p = max > 0 ? el.scrollTop / max : 0;
    progress.current = p;
    setActiveId((prev) => {
      const next = activeSection(p);
      return next === prev ? prev : next;
    });
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
      {/* fixed 3D layer behind */}
      <div className="orbital-canvas-fixed">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 5, 20], fov: 48 }}
          gl={{ antialias: true, alpha: true, toneMappingExposure: 1.15 }}
        >
          <OrbitalScene
            activeId={activeId}
            autoRotate
            reducedMotion={reducedMotion}
            progress={progress}
          />
        </Canvas>
      </div>

      <div className="orbital-vignette" />

      {/* native scroll layer on top */}
      <div className="orbital-scroll" ref={scrollRef} onScroll={onScroll}>
        <Sections />
      </div>

      <Link className="orbital-back" href="/">
        ← Home
      </Link>

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

      <nav className="orbital-dots" aria-label="sections">
        {WAYPOINTS.map((w) => (
          <span
            key={w.id}
            className={`orbital-dots__dot${activeId === w.id ? ' is-active' : ''}`}
            title={w.id}
          />
        ))}
      </nav>

      <div className="orbital-hint">scroll to travel</div>
      <div className="orbital-grain" />
    </div>
  );
}
