'use client';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import type { Mesh } from 'three';
import type { OrbitalNode } from '@/lib/orbital';

interface OrbitNodeProps {
  node: OrbitalNode;
  position: [number, number, number];
  color: string;
  /** true when this node's ring is the active scroll section */
  highlight: boolean;
}

export function OrbitNode({ node, position, color, highlight }: OrbitNodeProps) {
  const ref = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const lit = highlight || hovered;
  const target = hovered ? 1.7 : highlight ? 1.3 : 1;

  useFrame(() => {
    if (!ref.current) return;
    const s = ref.current.scale.x + (target - ref.current.scale.x) * 0.15;
    ref.current.scale.setScalar(s);
  });

  return (
    <group position={position}>
      <mesh
        ref={ref}
        scale={0.01}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={lit ? 2.4 : 0.8}
          roughness={0.3}
          metalness={0.4}
        />
        <mesh scale={lit ? 2.1 : 1.6}>
          <sphereGeometry args={[0.45, 20, 20]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={lit ? 0.28 : 0.12}
            depthWrite={false}
          />
        </mesh>
      </mesh>
      {(hovered || highlight) && (
        <Html center distanceFactor={14} position={[0, 0.95, 0]}>
          <div
            style={{
              color: '#fff',
              fontFamily: 'var(--font-orbital-body, sans-serif)',
              fontSize: 12,
              whiteSpace: 'nowrap',
              padding: '2px 8px',
              borderRadius: 6,
              background: 'rgba(5,6,10,0.7)',
              border: `1px solid ${color}`,
              pointerEvents: 'none',
            }}
          >
            {node.label}
          </div>
        </Html>
      )}
    </group>
  );
}
