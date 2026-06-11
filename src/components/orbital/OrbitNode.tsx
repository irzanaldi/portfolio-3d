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
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active || hovered ? 1.8 : 0.7}
          roughness={0.35}
          metalness={0.5}
        />
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
