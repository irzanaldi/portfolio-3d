'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';

const techItems = [
  'JS', 'TS', 'PHP', 'Dart',
  'NestJS', 'Laravel', 'Next.js', 'React',
  'Vue', 'Flutter', 'PostgreSQL', 'Docker',
];

function OrbitItem({ label, index, total }: { label: string; index: number; total: number }) {
  const ref = useRef<THREE.Group>(null);
  const angle = (index / total) * Math.PI * 2;
  const radius = 2.5;
  const speed = 0.15;

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + angle;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <group ref={ref}>
      <Billboard>
        <Text fontSize={0.2} color="#00d4ff" anchorX="center" anchorY="middle">
          {label}
        </Text>
      </Billboard>
    </group>
  );
}

export function TechOrbit() {
  return (
    <group>
      {/* Center sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#7b2ff7"
          emissive="#7b2ff7"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      {/* Orbiting tech labels */}
      {techItems.map((tech, i) => (
        <OrbitItem key={tech} label={tech} index={i} total={techItems.length} />
      ))}
    </group>
  );
}
