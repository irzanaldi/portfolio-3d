'use client';
import { useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
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

  const onUserInteract = useCallback(() => setAutoRotate(false), []);
  const onSelect = useCallback((ref: SelectionRef) => setSelected(ref), []);

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
        camera={{ position: [0, 6, 18], fov: 50 }}
        gl={{ antialias: true }}
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
      <DetailPanel selected={selected} onClose={() => setSelected(null)} />
      <div className="orbital-hint">drag to orbit · click a node to explore</div>
      <div className="orbital-grain" />
    </div>
  );
}
