'use client';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface CameraRigProps {
  target: [number, number, number] | null;
  reducedMotion: boolean;
  onUserInteract: () => void;
}

const DEFAULT_TARGET = new Vector3(0, 0, 0);

export function CameraRig({ target, reducedMotion, onUserInteract }: CameraRigProps) {
  const controls = useRef<OrbitControlsImpl>(null);
  const desired = useRef(new Vector3());

  useEffect(() => {
    desired.current.set(...(target ?? [0, 0, 0]));
  }, [target]);

  useFrame(() => {
    const c = controls.current;
    if (!c) return;
    const goal = target ? desired.current : DEFAULT_TARGET;
    if (reducedMotion) {
      c.target.copy(goal);
    } else {
      c.target.lerp(goal, 0.08);
    }
    c.update();
  });

  return (
    <OrbitControls
      ref={controls}
      enableDamping
      dampingFactor={0.08}
      enablePan={false}
      minDistance={6}
      maxDistance={26}
      onStart={onUserInteract}
    />
  );
}
