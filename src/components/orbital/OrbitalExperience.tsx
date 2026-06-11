'use client';
import { useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import Link from 'next/link';
import { OrbitalScene } from './OrbitalScene';
import { Sections } from './Sections';
import { useWebGL } from '@/hooks/useWebGL';
import { WAYPOINTS, type SectionId } from '@/lib/orbital';

export function OrbitalExperience() {
  const webglOK = useWebGL();
  const [activeId, setActiveId] = useState<SectionId>('intro');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const onSection = useCallback((id: SectionId) => setActiveId(id), []);

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
        camera={{ position: [0, 5, 20], fov: 48 }}
        gl={{ antialias: true, alpha: true, toneMappingExposure: 1.15 }}
      >
        <ScrollControls pages={5} damping={0.3}>
          <OrbitalScene
            activeId={activeId}
            autoRotate
            reducedMotion={reducedMotion}
            onSection={onSection}
          />
          <Scroll html>
            <Sections />
          </Scroll>
        </ScrollControls>
      </Canvas>

      <div className="orbital-vignette" />

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
