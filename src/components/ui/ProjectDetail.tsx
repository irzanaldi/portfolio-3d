// portfolio-3d/src/components/ui/ProjectDetail.tsx
import { pickMedia } from '@/lib/media';
import type { Project } from '@/data/projects';

function isYouTubeUrl(url: string): boolean {
  return /(?:youtube\.com|youtu\.be)/i.test(url);
}

function toYouTubeEmbedUrl(url: string): string {
  if (url.includes('/embed/')) return url;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    }
    const id = parsed.searchParams.get('v');
    if (id) return `https://www.youtube.com/embed/${id}`;
  } catch {
    // not an absolute/parseable URL — fall through and use it as-is
  }
  return url;
}

function HeroMedia({ project }: { project: Project }) {
  const media = pickMedia(project);

  if (media.kind === 'embed') {
    return (
      <div>
        <iframe
          src={media.url}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups"
          title={`${project.title} live preview`}
          className="aspect-video w-full rounded-xl border border-[var(--line)]"
        />
        <a
          href={media.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 inline-block font-[family-name:var(--font-mono)] text-[.75rem] text-[var(--v)] hover:underline"
        >
          Open in new tab ↗
        </a>
      </div>
    );
  }

  if (media.kind === 'video') {
    if (isYouTubeUrl(media.url)) {
      return (
        <iframe
          src={toYouTubeEmbedUrl(media.url)}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={`${project.title} demo video`}
          className="aspect-video w-full rounded-xl border border-[var(--line)]"
        />
      );
    }
    return (
      <video controls src={media.url} className="aspect-video w-full rounded-xl border border-[var(--line)] bg-[var(--bg2)]" />
    );
  }

  if (media.kind === 'gallery') {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {media.images.map((img) => (
          // eslint-disable-next-line @next/next/no-img-element -- arbitrary gallery paths, no loader config needed
          <img key={img} src={img} alt="" className="aspect-video w-full rounded-xl border border-[var(--line)] object-cover object-top" />
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex min-h-[220px] items-center justify-center rounded-xl border border-[var(--line)]"
      style={{ background: 'linear-gradient(150deg, var(--surface2), var(--bg2))' }}
    >
      <span className="font-[family-name:var(--font-mono)] text-[.7rem] uppercase tracking-[.12em] text-[var(--faint)]">
        No media yet
      </span>
    </div>
  );
}

function MobileShots({ images }: { images: string[] }) {
  return (
    <div className="mt-6">
      <div className="mb-3 font-[family-name:var(--font-mono)] text-[.68rem] text-[var(--faint)]">MOBILE APP</div>
      <div className="flex flex-wrap justify-center gap-5">
        {images.map((img) => (
          <div
            key={img}
            className="w-[230px] overflow-hidden rounded-[28px] border-[3px] border-[var(--line)] bg-[var(--bg2)] p-1.5 shadow-[0_10px_30px_rgba(0,0,0,.35)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static screenshot, no loader needed */}
            <img src={img} alt="" className="w-full rounded-[22px]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  const kick = project.platforms?.length
    ? `${project.category} · ${project.platforms.join(' + ')}`
    : project.category;

  return (
    <div className="overflow-hidden rounded-[18px] border border-[var(--line)] bg-[var(--bg2)]">
      <div
        className="border-b border-[var(--line)] p-6 sm:p-[30px]"
        style={{ background: 'linear-gradient(150deg, var(--surface2), var(--bg2))' }}
      >
        <HeroMedia project={project} />
        {project.mobileImages?.length ? <MobileShots images={project.mobileImages} /> : null}
      </div>

      <div className="grid gap-[30px] p-6 sm:p-[28px_30px_32px] md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[.72rem] text-[var(--v)]">{kick}</p>
          <h1 className="mt-[6px] font-[family-name:var(--font-heading)] text-[1.9rem] font-semibold">
            {project.title}
          </h1>
          <p className="mt-[10px] max-w-[54ch] text-[var(--muted)]">{project.description}</p>
          <ul className="mt-4 grid gap-[9px]">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="relative pl-[18px] text-[.95rem]">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[9px] block h-[7px] w-[7px] rounded-[2px]"
                  style={{ background: 'var(--grad)' }}
                />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-2 font-[family-name:var(--font-mono)] text-[.68rem] text-[var(--faint)]">STACK</div>
          <div className="mb-[18px] flex flex-wrap gap-[7px]">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-[var(--line)] px-[9px] py-[5px] font-[family-name:var(--font-mono)] text-[.72rem] text-[var(--muted)]"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mb-2 font-[family-name:var(--font-mono)] text-[.68rem] text-[var(--faint)]">LINKS</div>
          <div className="flex flex-wrap gap-[10px]">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[10px] px-[18px] py-[11px] text-[.92rem] font-medium text-[#0B0813]"
                style={{ background: 'var(--grad)' }}
              >
                View live
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[10px] border border-[var(--line)] px-[18px] py-[11px] text-[.92rem] font-medium text-[var(--text)] transition-colors hover:border-[var(--v)]"
              >
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
