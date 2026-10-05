'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-50">
      <div
        className="h-full bg-[var(--v)] shadow-[0_0_10px_var(--v)]"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
