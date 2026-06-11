'use client';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import type { Mesh } from 'three';
import type { OrbitalNode, SelectionRef } from '@/lib/orbital';

interface OrbitNodeProps {
  node: OrbitalNode;
  position: [number, number, number];
  color: string;
  active: boolean;
  onSelect: (ref: SelectionRef) => void;
}

export function OrbitNode({ node, position, color, active, onSelect }: OrbitNodeProps) {
  const ref = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const target = active || hovered ? 1.6 : 1;

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
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect({ kind: node.kind, id: node.id });
        }}
      >
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active || hovered ? 2.4 : 0.9}
          roughness={0.3}
          metalness={0.4}
        />
        {/* additive halo */}
        <mesh scale={active || hovered ? 2.1 : 1.7}>
          <sphereGeometry args={[0.45, 20, 20]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={active || hovered ? 0.28 : 0.14}
            depthWrite={false}
          />
        </mesh>
      </mesh>
      {(hovered || active) && (
        <Html center distanceFactor={14} position={[0, 0.9, 0]}>
          <div
            style={{
              color: '#fff',
              fontFamily: 'var(--font-orbital-body, sans-serif)',
              fontSize: 13,
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
