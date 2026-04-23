// portfolio-3d/src/components/ui/Button.tsx
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-6 py-3 rounded-xl font-medium transition-all duration-300 cursor-pointer',
        variant === 'primary' &&
          'bg-[var(--color-accent-cyan)] text-[var(--color-bg-primary)] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]',
        variant === 'ghost' &&
          'border border-[var(--color-accent-cyan)]/30 text-[var(--color-accent-cyan)] hover:bg-[var(--color-accent-cyan)]/10',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
