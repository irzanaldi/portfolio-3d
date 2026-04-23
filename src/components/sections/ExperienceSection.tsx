'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { experiences } from '@/data/experience';

function TimelineItem({
  experience,
  index,
}: {
  experience: (typeof experiences)[number];
  index: number;
}) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      className={`flex items-start gap-8 mb-16 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex-1">
        <GlassCard>
          <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
            <div>
              <h3 className="text-xl font-[family-name:var(--font-heading)] font-bold text-[var(--color-accent-cyan)]">
                {experience.company}
              </h3>
              <p className="text-[var(--color-text-secondary)] text-sm">
                {experience.role}
              </p>
            </div>
            <span className="text-xs font-[family-name:var(--font-mono)] text-[var(--color-accent-purple)] bg-[var(--color-accent-purple)]/10 px-3 py-1 rounded-full">
              {experience.period}
            </span>
          </div>
          <ul className="space-y-2">
            {experience.bullets.map((bullet, i) => (
              <li key={i} className="text-[var(--color-text-secondary)] text-sm leading-relaxed flex gap-2">
                <span className="text-[var(--color-accent-cyan)] mt-1 shrink-0">▸</span>
                {bullet}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </motion.div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="relative min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Work <span className="text-[var(--color-accent-cyan)]">Experience</span>
        </motion.h2>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--color-accent-cyan)]/50 via-[var(--color-accent-purple)]/50 to-transparent hidden md:block" />
          {experiences.map((exp, i) => (
            <div key={exp.id} className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--color-accent-cyan)] shadow-[0_0_12px_var(--color-accent-cyan)] hidden md:block z-10" />
              <TimelineItem experience={exp} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
