// portfolio-3d/src/components/ui/PhoneFrame.tsx
import { cn } from '@/lib/utils';

interface PhoneFrameProps {
  src?: string;
  variant?: 'a' | 'b';
  children?: React.ReactNode;
}

const BIG_GRADIENT: Record<'a' | 'b', string> = {
  a: 'linear-gradient(150deg, rgba(146,119,255,.5), rgba(240,122,224,.3))',
  b: 'linear-gradient(150deg, rgba(100,230,180,.45), rgba(146,119,255,.25))',
};

/** Mockup `.phone` device frame — wraps a screenshot `<img>` (via `src`) or falls
 * back to a skeleton placeholder (or arbitrary `children`) when there's no shot yet. */
export function PhoneFrame({ src, variant = 'a', children }: PhoneFrameProps) {
  return (
    <div className="relative h-[230px] w-[112px] shrink-0 overflow-hidden rounded-[22px] border-2 border-[var(--line)] bg-[var(--bg2)] p-2.5 shadow-[0_10px_30px_rgba(0,0,0,.35)]">
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-2 h-1 w-[34px] -translate-x-1/2 rounded-[3px] bg-[var(--line)]"
      />
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- fixed-size device frame, not a loader-managed hero image
        <img src={src} alt="" className="mt-3.5 h-[calc(100%-14px)] w-full rounded-lg object-cover" />
      ) : children ? (
        <div className="mt-3.5">{children}</div>
      ) : (
        <div className="mt-3.5 grid gap-[7px]">
          <div className="h-1.5 w-[60%] rounded-[3px] bg-[var(--surface2)]" />
          <div className="my-1 h-11 rounded-lg" style={{ background: BIG_GRADIENT[variant] }} />
          <div className="h-1.5 rounded-[3px] bg-[var(--surface2)]" />
          <div className={cn('h-1.5 rounded-[3px] bg-[var(--surface2)]', variant === 'a' && 'w-[60%]')} />
          <div className={cn('h-1.5 rounded-[3px] bg-[var(--surface2)]', variant === 'b' && 'w-[60%]')} />
        </div>
      )}
    </div>
  );
}
