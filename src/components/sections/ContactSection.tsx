'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

const contactLinks = [
  { label: 'Email', value: 'irzanaldi@gmail.com', href: 'mailto:irzanaldi@gmail.com', icon: '✉' },
  { label: 'Phone', value: '+(62) 895-2662-7141', href: 'tel:+62895266271141', icon: '☎' },
  { label: 'GitHub', value: 'github.com/irzanaldi', href: 'https://github.com/irzanaldi', icon: '⌨' },
  { label: 'LinkedIn', value: 'Irzan Aldi Ananto', href: 'https://linkedin.com/in/irzan-aldi-ananto-688819214', icon: '🔗' },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative min-h-[70vh] py-24 px-6 flex items-center">
      <div className="max-w-2xl mx-auto text-center w-full">
        <motion.h2
          className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Get In <span className="text-[var(--v)]">Touch</span>
        </motion.h2>
        <motion.p
          className="text-[var(--muted)] mb-12 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Open for opportunities. Feel free to reach out.
        </motion.p>
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="glass rounded-xl p-5 text-left transition-all duration-300 hover:border-[var(--v)]/30 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
            >
              <span className="text-2xl mb-2 block">{link.icon}</span>
              <p className="text-sm text-[var(--muted)] mb-1">{link.label}</p>
              <p className="text-[var(--text)] font-medium text-sm group-hover:text-[var(--v)] transition-colors">{link.value}</p>
            </motion.a>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
          <a href="mailto:irzanaldi@gmail.com"><Button variant="primary">Say Hello</Button></a>
        </motion.div>
        <motion.p
          className="mt-16 text-xs text-[var(--muted)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Built with Next.js, Three.js &amp; Framer Motion
        </motion.p>
      </div>
    </section>
  );
}
