'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { OrbitNode } from './OrbitNode';
import { nodePosition, type OrbitalNode, type RingConfig, type SelectionRef } from '@/lib/orbital';

interface OrbitRingProps {
  config: RingConfig;
  nodes: OrbitalNode[];
  selected: SelectionRef | null;
  autoRotate: boolean;
  onSelect: (ref: SelectionRef) => void;
}

export function OrbitRing({ config, nodes, selected, autoRotate, onSelect }: OrbitRingProps) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current && autoRotate) ref.current.rotation.y += delta * config.speed;
  });
  return (
    <group rotation={config.tilt}>
      {/* faint ring guide */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[config.radius, 0.015, 8, 128]} />
        <meshBasicMaterial color={config.color} transparent opacity={0.25} />
      </mesh>
      <group ref={ref}>
        {nodes.map((n, i) => (
          <OrbitNode
            key={`${n.kind}-${n.id}`}
            node={n}
            color={config.color}
            position={nodePosition(config.radius, i, nodes.length)}
            active={selected?.kind === n.kind && selected?.id === n.id}
            onSelect={onSelect}
          />
        ))}
      </group>
    </group>
  );
}
