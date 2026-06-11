'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import type { Mesh, MeshStandardMaterial } from 'three';

export function CenterNode() {
  const ref = useRef<Mesh>(null);
  const core = useRef<Mesh>(null);
  const mat = useRef<MeshStandardMaterial>(null);
  const halo = useRef<Mesh>(null);
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta;
    if (ref.current) ref.current.rotation.y += delta * 0.18;
    if (core.current) core.current.rotation.y -= delta * 0.3;
    const pulse = 1 + Math.sin(t.current * 1.4) * 0.5;
    if (mat.current) mat.current.emissiveIntensity = 1.2 + pulse * 0.6;
    if (halo.current) {
      const s = 1 + Math.sin(t.current * 1.4) * 0.06;
      halo.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      {/* solid glowing core */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          ref={mat}
          color="#bdf3ff"
          emissive="#22d3ee"
          emissiveIntensity={1.6}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>
      {/* wireframe shell */}
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#7c3aed"
          emissiveIntensity={1.0}
          roughness={0.3}
          metalness={0.6}
          wireframe
        />
      </mesh>
      {/* additive halo */}
      <mesh ref={halo} scale={1.9}>
        <sphereGeometry args={[1.2, 24, 24]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.1} depthWrite={false} />
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
