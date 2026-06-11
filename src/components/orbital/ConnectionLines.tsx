'use client';
import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import { Vector3 } from 'three';

interface ConnectionLinesProps {
  segments: Array<[[number, number, number], [number, number, number]]>;
  color: string;
}

export function ConnectionLines({ segments, color }: ConnectionLinesProps) {
  const lines = useMemo(
    () => segments.map(([a, b]) => [new Vector3(...a), new Vector3(...b)] as [Vector3, Vector3]),
    [segments],
  );
  return (
    <>
      {lines.map((pts, i) => (
        <Line key={i} points={pts} color={color} lineWidth={1.5} transparent opacity={0.6} />
      ))}
    </>
  );
}
