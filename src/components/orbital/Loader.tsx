'use client';
import { Html, useProgress } from '@react-three/drei';

export function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: '#22d3ee', fontFamily: 'var(--font-mono)', fontSize: 14 }}>
        {Math.round(progress)}%
      </div>
    </Html>
  );
}
