'use client';
import { useRef, type RefObject } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { sampleWaypoint } from '@/lib/orbital';

interface ScrollRigProps {
  /** scroll progress 0..1, updated outside React render by the scroll handler */
  progress: RefObject<number>;
  reducedMotion: boolean;
}

/** Drives the camera along WAYPOINTS from a native-scroll progress ref. */
export function ScrollRig({ progress, reducedMotion }: ScrollRigProps) {
  const camera = useThree((s) => s.camera);
  const pointer = useThree((s) => s.pointer);
  const camGoal = useRef(new Vector3());
  const tgtGoal = useRef(new Vector3());
  const curTarget = useRef(new Vector3(0, 0, 0));

  useFrame(() => {
    const p = progress.current ?? 0;
    const { camera: c, target: t } = sampleWaypoint(p);
    camGoal.current.set(c[0], c[1], c[2]);
    camGoal.current.x += pointer.x * 1.4;
    camGoal.current.y += pointer.y * 0.9;
    tgtGoal.current.set(t[0], t[1], t[2]);

    const damp = reducedMotion ? 1 : 0.06;
    camera.position.lerp(camGoal.current, damp);
    curTarget.current.lerp(tgtGoal.current, damp);
    camera.lookAt(curTarget.current);
  });

  return null;
}
