// portfolio-3d/src/components/sections/SkillsSection.tsx
import { skillCategories } from '@/data/skills';

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <span className="tick block" />
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-[var(--line)] pb-3.5">
          <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.5rem,2.8vw,2.1rem)] font-medium tracking-[-.01em]">
            Skills
          </h2>
          <span className="font-[family-name:var(--font-mono)] text-[.74rem] text-[var(--muted)]">
            6 languages · microservices · data · devops
          </span>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-5">
          {skillCategories.map((cat) => (
            <div key={cat.category}>
              <div className="mb-[9px] font-[family-name:var(--font-mono)] text-[.66rem] text-[var(--v)]">
                {cat.category}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-[7px] border border-[var(--line)] bg-[var(--surface)] px-[9px] py-1 text-[.78rem]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
