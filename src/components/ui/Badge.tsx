// portfolio-3d/src/components/ui/Badge.tsx
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs',
        'font-[family-name:var(--font-mono)]',
        'bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)]',
        'border border-[var(--color-accent-cyan)]/20',
        className
      )}
    >
      {children}
    </span>
  );
}
