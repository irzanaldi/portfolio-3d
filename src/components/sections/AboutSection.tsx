'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { skillCategories } from '@/data/skills';

const Scene = dynamic(
  () => import('@/components/three/Scene').then((mod) => mod.Scene),
  { ssr: false }
);
const TechOrbit = dynamic(
  () => import('@/components/three/TechOrbit').then((mod) => mod.TechOrbit),
  { ssr: false }
);

export function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: 3D Tech Orbit */}
        <motion.div
          className="h-[400px] w-full"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Scene>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.5} />
            <TechOrbit />
          </Scene>
        </motion.div>

        {/* Right: About content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] font-bold mb-6">
            About <span className="text-[var(--color-accent-cyan)]">Me</span>
          </h2>

          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8">
            Fullstack Developer with 3+ years of experience building web applications
            and APIs for retail and e-commerce platforms. Hands-on expertise with
            Laravel, NestJS, Next.js, Vue.js, and Flutter. Currently working at
            The Body Shop Indonesia, building POS systems, real-time inventory, and
            e-commerce solutions.
          </p>

          {/* Skills grid */}
          <div className="space-y-4">
            {skillCategories.map((cat) => (
              <div key={cat.category}>
                <p className="text-sm text-[var(--color-text-secondary)] mb-2 font-[family-name:var(--font-mono)]">
                  {cat.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
