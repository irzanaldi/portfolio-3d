// portfolio-3d/src/components/ui/ProjectModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from './Badge';
import { Button } from './Button';
import type { Project } from '@/data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="glass relative z-10 max-w-2xl w-full rounded-2xl p-8"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer"
            >
              ✕
            </button>

            {/* Project screenshot placeholder */}
            <div className="w-full h-48 rounded-xl bg-[var(--color-accent-cyan)]/5 border border-[var(--color-accent-cyan)]/10 mb-6 flex items-center justify-center text-[var(--color-text-secondary)]">
              {project.images[0] ? (
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                'Screenshot placeholder'
              )}
            </div>

            {/* Content */}
            <h3 className="text-2xl font-[family-name:var(--font-heading)] font-bold mb-1">
              {project.title}
            </h3>
            <p className="text-[var(--color-text-secondary)] text-sm mb-4">
              {project.company} · {project.period}
            </p>
            <p className="text-[var(--color-text-primary)] mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost">GitHub</Button>
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary">Live Demo</Button>
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
