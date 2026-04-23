'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function TimelinePath() {
  const lineRef = useRef<THREE.Line>(null);
  const points = [
    new THREE.Vector3(-3, 0, 0),
    new THREE.Vector3(-1, 1, -1),
    new THREE.Vector3(1, -0.5, 0),
    new THREE.Vector3(3, 0.5, -1),
  ];
  const curve = new THREE.CatmullRomCurve3(points);
  const curvePoints = curve.getPoints(50);

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <line ref={lineRef as React.RefObject<THREE.Line>}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(curvePoints.flatMap((p) => [p.x, p.y, p.z])), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00d4ff" transparent opacity={0.4} />
    </line>
  );
}
