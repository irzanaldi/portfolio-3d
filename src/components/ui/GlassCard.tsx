// portfolio-3d/src/components/ui/GlassCard.tsx
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass rounded-2xl p-6',
        hover && 'transition-all duration-300 hover:border-[var(--v)]/30',
        className
      )}
    >
      {children}
    </div>
  );
}
