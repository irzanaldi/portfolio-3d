'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function TimelinePath() {
  const lineRef = useRef<THREE.Line>(null);

  const lineObject = useMemo(() => {
    const points = [
      new THREE.Vector3(-3, 0, 0),
      new THREE.Vector3(-1, 1, -1),
      new THREE.Vector3(1, -0.5, 0),
      new THREE.Vector3(3, 0.5, -1),
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    const curvePoints = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const material = new THREE.LineBasicMaterial({ color: '#00d4ff', transparent: true, opacity: 0.4 });
    return new THREE.Line(geometry, material);
  }, []);

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return <primitive ref={lineRef} object={lineObject} />;
}
