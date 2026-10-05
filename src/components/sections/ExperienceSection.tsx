import { experiences } from '@/data/experience';

export function ExperienceSection() {
  // Most recent role first, matching the mockup's reverse-chronological timeline.
  const timeline = [...experiences].reverse();

  return (
    <section id="experience" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <span className="tick block" />
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-[var(--line)] pb-3.5">
          <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.5rem,2.8vw,2.1rem)] font-medium tracking-[-.01em]">
            Experience
          </h2>
          <span className="font-[family-name:var(--font-mono)] text-[.74rem] text-[var(--muted)]">
            where I&apos;ve shipped professionally
          </span>
        </div>

        <div className="relative pl-[26px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1.5 left-1 top-1.5 w-0.5 opacity-50"
            style={{ background: 'var(--grad)' }}
          />
          {timeline.map((exp) => (
            <div key={exp.id} className="relative pb-[30px]">
              <span
                aria-hidden="true"
                className="absolute -left-[26px] top-[5px] h-[11px] w-[11px] rounded-full border-2"
                style={{ background: 'var(--bg)', borderColor: 'var(--v)' }}
              />
              <div className="flex flex-wrap items-baseline justify-between gap-1.5">
                <div className="font-[family-name:var(--font-heading)] text-[1.25rem] font-medium">
                  {exp.role} <em className="not-italic text-[var(--v)]">· {exp.company}</em>
                </div>
                <div className="font-[family-name:var(--font-mono)] text-[.72rem] uppercase text-[var(--faint)]">
                  {exp.period} · {exp.location}
                </div>
              </div>
              <ul className="mt-2.5 grid gap-1.5">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="relative max-w-[72ch] pl-4 text-[.95rem] text-[var(--muted)]">
                    <span className="absolute left-0 top-[9px] h-[5px] w-[5px] rounded-full bg-[var(--faint)]" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
