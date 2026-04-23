'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

interface ProjectCard3DProps {
  title: string;
  company: string;
  position: [number, number, number];
  onClick: () => void;
}

export function ProjectCard3D({ title, company, position, onClick }: ProjectCard3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.1;
      const targetScale = hovered ? 1.08 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onClick={onClick}
      onPointerEnter={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
      <RoundedBox args={[2.2, 1.4, 0.05]} radius={0.08} smoothness={4}>
        <meshStandardMaterial
          color={hovered ? '#1a1a3e' : '#0f0f2a'}
          emissive={hovered ? '#00d4ff' : '#7b2ff7'}
          emissiveIntensity={hovered ? 0.15 : 0.05}
          transparent
          opacity={0.9}
        />
      </RoundedBox>
      <Text position={[0, 0.2, 0.03]} fontSize={0.16} color="#f0f0f0" anchorX="center" anchorY="middle" maxWidth={1.8}>
        {title}
      </Text>
      <Text position={[0, -0.15, 0.03]} fontSize={0.1} color="#8892a0" anchorX="center" anchorY="middle">
        {company}
      </Text>
      {hovered && (
        <RoundedBox args={[2.25, 1.45, 0.04]} radius={0.08} smoothness={4}>
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.1} side={THREE.BackSide} />
        </RoundedBox>
      )}
    </group>
  );
}
