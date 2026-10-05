'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({
  position,
  geometry,
  color,
  speed,
}: {
  position: [number, number, number];
  geometry: 'icosahedron' | 'torus' | 'octahedron';
  color: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      {geometry === 'icosahedron' && <icosahedronGeometry args={[0.8, 1]} />}
      {geometry === 'torus' && <torusGeometry args={[0.6, 0.25, 16, 32]} />}
      {geometry === 'octahedron' && <octahedronGeometry args={[0.7, 0]} />}
      <MeshDistortMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        transparent
        opacity={0.15}
        wireframe
        distort={0.2}
        speed={1.5}
      />
    </mesh>
  );
}

export function FloatingShapes() {
  return (
    <group>
      <FloatingShape
        position={[-3, 1, -2]}
        geometry="icosahedron"
        color="#9277FF"
        speed={0.8}
      />
      <FloatingShape
        position={[3.5, -0.5, -3]}
        geometry="torus"
        color="#F07AE0"
        speed={0.6}
      />
      <FloatingShape
        position={[-1.5, -1.5, -1.5]}
        geometry="octahedron"
        color="#9277FF"
        speed={1.0}
      />
      <FloatingShape
        position={[2, 2, -4]}
        geometry="icosahedron"
        color="#F07AE0"
        speed={0.5}
      />
    </group>
  );
}
