// portfolio-3d/src/components/ui/ProjectCard.tsx
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Project } from '@/data/projects';

const STATUS_CHIP: Record<Project['status'], { label: string; className: string }> = {
  live: { label: 'LIVE', className: 'bg-[var(--live)] text-[#0B0813] border-transparent font-medium' },
  video: { label: 'VIDEO', className: 'text-[var(--a)] border-[rgba(255,197,106,.35)]' },
  gallery: { label: 'GALLERY', className: 'text-[var(--a)] border-[rgba(255,197,106,.35)]' },
  prototype: { label: 'PROTOTYPE', className: 'text-[#c3a6ff] border-[rgba(146,119,255,.4)]' },
  code: { label: 'CODE', className: 'text-[var(--muted)] border-[var(--line)]' },
};

export function ProjectCard({ project }: { project: Project }) {
  const chip = STATUS_CHIP[project.status];

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative block rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--v)]"
    >
      <div className="flex items-center justify-between gap-2.5">
        <span className="font-[family-name:var(--font-heading)] text-[1.3rem] font-medium">{project.title}</span>
        <span
          className={cn(
            'inline-block whitespace-nowrap rounded-full border px-[9px] py-1 font-[family-name:var(--font-mono)] text-[.63rem] tracking-[.07em]',
            chip.className,
          )}
        >
          {chip.label}
        </span>
      </div>
      <p className="mt-1.5 min-h-[2.6em] text-[.93rem] text-[var(--muted)]">{project.tagline}</p>
      <div className="mt-3.5 flex items-center justify-between gap-2.5">
        <div className="font-[family-name:var(--font-mono)] text-[.7rem] text-[var(--faint)]">
          {project.techStack.map((tech, i) => (
            <span key={tech}>
              {i === 0 ? <b className="font-medium text-[var(--v)]">{tech}</b> : ` · ${tech}`}
            </span>
          ))}
        </div>
        <div className="whitespace-nowrap rounded-[5px] border border-[var(--line)] px-[7px] py-[3px] font-[family-name:var(--font-mono)] text-[.6rem] text-[var(--faint)]">
          {project.category}
        </div>
      </div>
    </Link>
  );
}
