'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { OrbitNode } from './OrbitNode';
import { nodePosition, type OrbitalNode, type RingConfig } from '@/lib/orbital';

interface OrbitRingProps {
  config: RingConfig;
  nodes: OrbitalNode[];
  highlight: boolean;
  autoRotate: boolean;
}

export function OrbitRing({ config, nodes, highlight, autoRotate }: OrbitRingProps) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current && autoRotate) ref.current.rotation.y += delta * config.speed;
  });
  return (
    <group rotation={config.tilt}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[config.radius, highlight ? 0.03 : 0.015, 8, 160]} />
        <meshBasicMaterial
          color={config.color}
          transparent
          opacity={highlight ? 0.5 : 0.22}
          depthWrite={false}
        />
      </mesh>
      <group ref={ref}>
        {nodes.map((n, i) => (
          <OrbitNode
            key={`${n.kind}-${n.id}`}
            node={n}
            color={config.color}
            position={nodePosition(config.radius, i, nodes.length)}
            highlight={highlight}
          />
        ))}
      </group>
    </group>
  );
}
