'use client';
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { Vector3 } from 'three';
import { sampleWaypoint, activeSection, type SectionId } from '@/lib/orbital';

interface ScrollRigProps {
  reducedMotion: boolean;
  onSection: (id: SectionId) => void;
}

export function ScrollRig({ reducedMotion, onSection }: ScrollRigProps) {
  const scroll = useScroll();
  const camera = useThree((s) => s.camera);
  const pointer = useThree((s) => s.pointer);
  const camGoal = useRef(new Vector3());
  const tgtGoal = useRef(new Vector3());
  const curTarget = useRef(new Vector3(0, 0, 0));
  const lastSection = useRef<SectionId | null>(null);

  useFrame(() => {
    const p = scroll.offset;
    const { camera: c, target: t } = sampleWaypoint(p);
    camGoal.current.set(c[0], c[1], c[2]);
    // subtle mouse parallax
    camGoal.current.x += pointer.x * 1.4;
    camGoal.current.y += pointer.y * 0.9;
    tgtGoal.current.set(t[0], t[1], t[2]);

    const damp = reducedMotion ? 1 : 0.06;
    camera.position.lerp(camGoal.current, damp);
    curTarget.current.lerp(tgtGoal.current, damp);
    camera.lookAt(curTarget.current);

    const sec = activeSection(p);
    if (sec !== lastSection.current) {
      lastSection.current = sec;
      onSection(sec);
    }
  });

  return null;
}
