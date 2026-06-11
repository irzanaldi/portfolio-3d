'use client';
import { Suspense, useMemo, type RefObject } from 'react';
import { Stars, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { CenterNode } from './CenterNode';
import { OrbitRing } from './OrbitRing';
import { ScrollRig } from './ScrollRig';
import { Loader } from './Loader';
import { buildNodes, RING_CONFIG, type SectionId } from '@/lib/orbital';

interface OrbitalSceneProps {
  activeId: SectionId;
  autoRotate: boolean;
  reducedMotion: boolean;
  progress: RefObject<number>;
}

const RING_SECTION: Record<number, SectionId> = {
  0: 'skills',
  1: 'experience',
  2: 'projects',
};

export function OrbitalScene({ activeId, autoRotate, reducedMotion, progress }: OrbitalSceneProps) {
  const nodes = useMemo(() => buildNodes(), []);
  const ringNodes = useMemo(
    () => RING_CONFIG.map((c) => nodes.filter((n) => n.ringIndex === c.ringIndex)),
    [nodes],
  );

  return (
    <>
      <fog attach="fog" args={['#05060a', 18, 42]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[8, 8, 8]} intensity={80} color="#22d3ee" />
      <pointLight position={[-8, -4, -8]} intensity={55} color="#e879f9" />
      <pointLight position={[0, 10, -6]} intensity={45} color="#a78bfa" />
      <Stars radius={80} depth={50} count={3500} factor={3.2} fade speed={0.4} />
      <Sparkles count={70} scale={22} size={2.2} speed={0.25} opacity={0.5} color="#9fe8ff" />

      <Suspense fallback={<Loader />}>
        <CenterNode />
        {RING_CONFIG.map((cfg, i) => (
          <OrbitRing
            key={cfg.ringIndex}
            config={cfg}
            nodes={ringNodes[i]}
            highlight={activeId === RING_SECTION[cfg.ringIndex]}
            autoRotate={autoRotate && !reducedMotion}
          />
        ))}
        <EffectComposer>
          <Bloom intensity={1.15} luminanceThreshold={0.12} luminanceSmoothing={0.85} mipmapBlur radius={0.75} />
          <Vignette eskil={false} offset={0.25} darkness={0.55} />
        </EffectComposer>
      </Suspense>

      <ScrollRig progress={progress} reducedMotion={reducedMotion} />
    </>
  );
}
