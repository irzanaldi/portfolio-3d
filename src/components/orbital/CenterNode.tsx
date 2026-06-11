'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import type { Mesh } from 'three';

export function CenterNode() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.2;
  });
  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#22d3ee"
          emissiveIntensity={1.4}
          roughness={0.3}
          metalness={0.6}
          wireframe
        />
      </mesh>
      <Html center distanceFactor={12} position={[0, -2, 0]}>
        <div
          style={{
            color: '#e6f7ff',
            fontFamily: 'var(--font-orbital-display, sans-serif)',
            fontSize: 18,
            whiteSpace: 'nowrap',
            textShadow: '0 0 12px rgba(34,211,238,0.8)',
            pointerEvents: 'none',
          }}
        >
          Irzan Aldi Ananto
        </div>
      </Html>
    </group>
  );
}
