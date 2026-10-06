// portfolio-3d/src/components/sections/ProjectsSection.tsx
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { projects, type Project } from '@/data/projects';

const STATUS_CHIP: Record<Project['status'], string> = {
  live: 'bg-[var(--live)] text-[#0B0813] border-transparent font-medium',
  video: 'text-[var(--a)] border-[rgba(255,197,106,.35)]',
  gallery: 'text-[var(--a)] border-[rgba(255,197,106,.35)]',
  prototype: 'text-[#c3a6ff] border-[rgba(146,119,255,.4)]',
  code: 'text-[var(--muted)] border-[var(--line)]',
};

/** Mock browser chrome thumbnail — used for `live` tiles. */
function BrowserThumb() {
  return (
    <div className="absolute inset-x-4 top-4 bottom-0 flex flex-col rounded-t-lg border border-[var(--line)] bg-[var(--bg2)]">
      <div className="flex gap-1.5 border-b border-[var(--line)] px-2.5 py-2">
        <i className="block h-2 w-2 rounded-full bg-[var(--line)]" />
        <i className="block h-2 w-2 rounded-full bg-[var(--line)]" />
        <i className="block h-2 w-2 rounded-full bg-[var(--line)]" />
      </div>
      <div className="grid flex-1 content-start gap-[7px] p-3">
        <div className="h-[7px] w-[58%] rounded bg-[var(--surface2)]" />
        <div className="h-[7px] w-[84%] rounded bg-[var(--line)]" />
        <div className="mt-[5px] grid grid-cols-3 gap-[7px]">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="h-7 rounded-[5px] bg-[var(--surface2)]" />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Play glyph — used for `video` (non-mobile) tiles. */
function PlayGlyph() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <b className="grid h-[52px] w-[52px] place-items-center rounded-full" style={{ background: 'var(--grad)' }}>
        <span
          className="ml-1 block border-y-[9px] border-l-[15px] border-y-transparent"
          style={{ borderLeftColor: 'var(--bg)' }}
        />
      </b>
    </div>
  );
}

/** Two mini phone frames — used for tiles whose platforms include `mobile`. */
function PhoneMinis() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-2.5">
      {[0, 1].map((i) => (
        <div key={i} className="h-[150px] w-[74px] rounded-2xl border-2 border-[var(--line)] bg-[var(--bg2)] p-1.5">
          <div
            className="mb-1 h-[30px] rounded-md"
            style={{ background: 'linear-gradient(150deg, rgba(146,119,255,.5), rgba(240,122,224,.3))' }}
          />
          <div className="my-1 h-1 rounded bg-[var(--surface2)]" />
          <div className="my-1 h-1 rounded bg-[var(--surface2)]" />
          <div className="my-1 h-1 rounded bg-[var(--surface2)]" />
        </div>
      ))}
    </div>
  );
}

function FeaturedTile({ project }: { project: Project }) {
  const isMobile = project.platforms?.includes('mobile');

  return (
    <Link
      href={`/projects/${project.id}`}
      className="flex min-h-[236px] flex-col overflow-hidden rounded-[14px] border border-[var(--line)] bg-[var(--surface)] transition-all duration-200 hover:-translate-y-[3px] hover:border-[var(--v)]"
    >
      <div className="relative flex-1 overflow-hidden" style={{ background: 'linear-gradient(150deg, var(--surface2), var(--bg2))' }}>
        {project.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element -- static screenshot, no loader needed
          <img src={project.images[0]} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
        ) : isMobile ? (
          <PhoneMinis />
        ) : project.status === 'live' ? (
          <BrowserThumb />
        ) : (
          <PlayGlyph />
        )}
      </div>
      <div className="border-t border-[var(--line)] px-4 py-3.5">
        <div className="flex items-center justify-between gap-2 font-[family-name:var(--font-heading)] text-[1.12rem] font-medium">
          <span>{project.title}</span>
          <span
            className={cn(
              'whitespace-nowrap rounded-full border px-[9px] py-1 font-[family-name:var(--font-mono)] text-[.63rem] tracking-[.07em]',
              STATUS_CHIP[project.status],
            )}
          >
            {project.status.toUpperCase()}
          </span>
        </div>
        <p className="mt-[3px] text-[.88rem] text-[var(--muted)]">{project.tagline}</p>
      </div>
    </Link>
  );
}

export function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Selected work */}
        <div className="mb-20">
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-[var(--line)] pb-3.5">
            <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.5rem,2.8vw,2.1rem)] font-medium tracking-[-.01em]">
              Selected <span className="text-[var(--v)]">work</span>
            </h2>
            <span className="font-[family-name:var(--font-mono)] text-[.74rem] text-[var(--muted)]">
              live · video · mobile — demoable in page
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-[1.6fr_1fr_1fr]">
            {featured.map((project) => (
              <FeaturedTile key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* All projects */}
        <div>
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-[var(--line)] pb-3.5">
            <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.5rem,2.8vw,2.1rem)] font-medium tracking-[-.01em]">
              All projects
            </h2>
            <span className="font-[family-name:var(--font-mono)] text-[.74rem] text-[var(--muted)]">
              {rest.length} more · tap any to open
            </span>
          </div>
          <div className="grid gap-3.5 sm:grid-cols-2">
            {rest.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
