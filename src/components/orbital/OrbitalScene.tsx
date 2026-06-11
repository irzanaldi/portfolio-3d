'use client';
import { Suspense, useMemo } from 'react';
import { Stars, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { CenterNode } from './CenterNode';
import { OrbitRing } from './OrbitRing';
import { CameraRig } from './CameraRig';
import { ConnectionLines } from './ConnectionLines';
import { Loader } from './Loader';
import {
  buildNodes,
  RING_CONFIG,
  resolveConnections,
  nodePosition,
  colorForKind,
  type SelectionRef,
} from '@/lib/orbital';

interface OrbitalSceneProps {
  selected: SelectionRef | null;
  autoRotate: boolean;
  reducedMotion: boolean;
  onSelect: (ref: SelectionRef) => void;
  onUserInteract: () => void;
}

export function OrbitalScene({
  selected,
  autoRotate,
  reducedMotion,
  onSelect,
  onUserInteract,
}: OrbitalSceneProps) {
  const nodes = useMemo(() => buildNodes(), []);
  const ringNodes = useMemo(
    () => RING_CONFIG.map((c) => nodes.filter((n) => n.ringIndex === c.ringIndex)),
    [nodes],
  );

  // selected node approx position (ring plane, ignoring live rotation) for camera focus
  const targetPos = useMemo<[number, number, number] | null>(() => {
    if (!selected) return null;
    const cfg = RING_CONFIG.find((c) =>
      nodes.some((n) => n.ringIndex === c.ringIndex && n.kind === selected.kind),
    );
    if (!cfg) return null;
    const list = ringNodes[cfg.ringIndex];
    const idx = list.findIndex((n) => n.id === selected.id);
    if (idx < 0) return null;
    return nodePosition(cfg.radius, idx, list.length);
  }, [selected, nodes, ringNodes]);

  // connection segments: center -> each connected project ring position
  const segments = useMemo<
    Array<[[number, number, number], [number, number, number]]>
  >(() => {
    if (selected?.kind !== 'experience') return [];
    const connectedIds = resolveConnections(selected.id, nodes);
    const projCfg = RING_CONFIG[2];
    const list = ringNodes[2];
    return connectedIds
      .map((pid) => {
        const idx = list.findIndex((n) => n.id === pid);
        if (idx < 0) return null;
        const pos = nodePosition(projCfg.radius, idx, list.length);
        return [[0, 0, 0], pos] as [[number, number, number], [number, number, number]];
      })
      .filter((s): s is [[number, number, number], [number, number, number]] => s !== null);
  }, [selected, nodes, ringNodes]);

  return (
    <>
      <fog attach="fog" args={['#05060a', 18, 40]} />
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
            selected={selected}
            autoRotate={autoRotate && !reducedMotion}
            onSelect={onSelect}
          />
        ))}
        <ConnectionLines segments={segments} color={colorForKind('project')} />
        <EffectComposer>
          <Bloom intensity={1.15} luminanceThreshold={0.12} luminanceSmoothing={0.85} mipmapBlur radius={0.75} />
          <Vignette eskil={false} offset={0.25} darkness={0.55} />
        </EffectComposer>
      </Suspense>

      <CameraRig target={targetPos} reducedMotion={reducedMotion} onUserInteract={onUserInteract} />
    </>
  );
}
