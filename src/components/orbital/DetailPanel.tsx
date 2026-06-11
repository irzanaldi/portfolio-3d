'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import { experiences } from '@/data/experience';
import { skillCategories } from '@/data/skills';
import type { SelectionRef } from '@/lib/orbital';

interface DetailPanelProps {
  selected: SelectionRef | null;
  onClose: () => void;
}

export function DetailPanel({ selected, onClose }: DetailPanelProps) {
  return (
    <AnimatePresence>
      {selected && (
        <motion.aside
          key={`${selected.kind}-${selected.id}`}
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          className="orbital-panel"
        >
          <button className="orbital-panel__close" onClick={onClose} aria-label="Close">
            ×
          </button>
          {selected.kind === 'project' && <ProjectBody id={selected.id} />}
          {selected.kind === 'experience' && <ExperienceBody id={selected.id} />}
          {selected.kind === 'skill' && <SkillBody id={selected.id} />}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function ProjectBody({ id }: { id: string }) {
  const p = projects.find((x) => x.id === id);
  if (!p) return null;
  return (
    <div>
      <span className="orbital-panel__kind">PROJECT</span>
      <h2>{p.title}</h2>
      <p className="orbital-panel__meta">
        {p.company} · {p.period}
      </p>
      <p>{p.description}</p>
      <ul className="orbital-panel__tags">
        {p.techStack.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

function ExperienceBody({ id }: { id: string }) {
  const e = experiences.find((x) => x.id === id);
  if (!e) return null;
  return (
    <div>
      <span className="orbital-panel__kind">EXPERIENCE</span>
      <h2>{e.role}</h2>
      <p className="orbital-panel__meta">
        {e.company} · {e.period} · {e.location}
      </p>
      <ul className="orbital-panel__bullets">
        {e.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

function SkillBody({ id }: { id: string }) {
  const s = skillCategories.find((x) => x.category === id);
  if (!s) return null;
  return (
    <div>
      <span className="orbital-panel__kind">SKILLS</span>
      <h2>{s.category}</h2>
      <ul className="orbital-panel__tags">
        {s.items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
