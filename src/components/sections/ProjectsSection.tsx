'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { ProjectModal } from '@/components/ui/ProjectModal';
import { projects, type Project } from '@/data/projects';

const Scene = dynamic(() => import('@/components/three/Scene').then((mod) => mod.Scene), { ssr: false });
const ProjectCard3D = dynamic(() => import('@/components/three/ProjectCard3D').then((mod) => mod.ProjectCard3D), { ssr: false });
const ParticleField = dynamic(() => import('@/components/three/ParticleField').then((mod) => mod.ParticleField), { ssr: false });

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const tbsProjects = projects.filter((p) => p.company === 'The Body Shop Indonesia');
  const hwProjects = projects.filter((p) => p.company === 'HW Group');

  return (
    <section id="projects" className="relative min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Featured <span className="text-[var(--color-accent-cyan)]">Projects</span>
        </motion.h2>
        <motion.p
          className="text-center text-[var(--color-text-secondary)] mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Click a card to see details
        </motion.p>

        {/* 3D Project Cards - Desktop */}
        <motion.div
          className="h-[500px] w-full mb-12 hidden md:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Scene>
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={0.5} />
            <ParticleField count={200} radius={10} />
            {tbsProjects.map((project, i) => (
              <ProjectCard3D key={project.id} title={project.title} company={project.company} position={[1.5, 1.2 - i * 1.6, 0]} onClick={() => setSelectedProject(project)} />
            ))}
            {hwProjects.map((project, i) => (
              <ProjectCard3D key={project.id} title={project.title} company={project.company} position={[-1.5, 0.5 - i * 1.6, 0]} onClick={() => setSelectedProject(project)} />
            ))}
          </Scene>
        </motion.div>

        {/* Mobile fallback: 2D cards */}
        <div className="grid gap-6 md:hidden">
          {projects.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <GlassCard className="cursor-pointer" hover>
                <button className="w-full text-left cursor-pointer" onClick={() => setSelectedProject(project)}>
                  <h3 className="text-lg font-[family-name:var(--font-heading)] font-bold mb-1">{project.title}</h3>
                  <p className="text-[var(--color-text-secondary)] text-xs mb-3">{project.company} · {project.period}</p>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (<Badge key={tech}>{tech}</Badge>))}
                  </div>
                </button>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
