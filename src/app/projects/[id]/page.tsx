// portfolio-3d/src/app/projects/[id]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { ProjectDetail } from '@/components/ui/ProjectDetail';
import { projects } from '@/data/projects';

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return {
    title: `${project.title} — Irzan Aldi Ananto`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 pb-24 pt-28">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/#projects"
            className="mb-8 inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[.8rem] text-[var(--muted)] transition-colors hover:text-[var(--text)]"
          >
            ← back
          </Link>
          <ProjectDetail project={project} />
        </div>
      </main>
    </>
  );
}
