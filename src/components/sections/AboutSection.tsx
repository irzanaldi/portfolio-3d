'use client';

import { useState } from 'react';

const facts = [
  { label: 'BASED IN', value: 'Tangerang Selatan, Indonesia' },
  { label: 'FOCUS', value: 'Microservices · APIs · data' },
  { label: 'NOW', value: 'Senior Fullstack · The Body Shop' },
  { label: 'EDUCATION', value: 'B.Tech IT · Univ. Pamulang' },
];

/** Portrait slot — gradient placeholder is always rendered; a real photo overlays it when available. */
function Portrait() {
  const [broken, setBroken] = useState(false);

  return (
    <div
      className="relative aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-2xl border border-[var(--line)]"
      style={{ background: 'linear-gradient(150deg, var(--surface2), var(--bg2))' }}
    >
      <span className="absolute inset-0 grid place-items-center font-[family-name:var(--font-mono)] text-[.74rem] text-[var(--faint)]">
        your photo
      </span>
      {!broken && (
        // eslint-disable-next-line @next/next/no-img-element -- plain img so the onError fallback works without a loader
        <img
          src="/portrait.jpg"
          alt="Irzan Aldi Ananto"
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setBroken(true)}
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[2px] rounded-2xl opacity-50"
        style={{
          background: 'var(--grad)',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: 2,
        }}
      />
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <span className="tick block" />
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-[var(--line)] pb-3.5">
          <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.5rem,2.8vw,2.1rem)] font-medium tracking-[-.01em]">
            About
          </h2>
          <span className="font-[family-name:var(--font-mono)] text-[.74rem] text-[var(--muted)]">
            who &amp; what
          </span>
        </div>

        <div className="grid items-start gap-9 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Portrait />
            <div className="mt-[18px] grid gap-3">
              {facts.map((fact) => (
                <div key={fact.label} className="text-[.9rem] text-[var(--muted)]">
                  <b className="mb-0.5 block font-[family-name:var(--font-mono)] text-[.64rem] font-normal text-[var(--faint)]">
                    {fact.label}
                  </b>
                  {fact.value}
                </div>
              ))}
            </div>
          </div>

          <p className="text-[1.18rem] leading-[1.7]">
            Senior Fullstack Developer with 5+ years building end-to-end applications for retail &amp; e-commerce — taking vague user pain points all the way through backend, frontend and database to production.{' '}
            <span className="text-[var(--muted)]">
              Specialized in microservices and event-driven architecture across an 11-service ecosystem (Kafka, Redis), data warehousing and ETL, and real-time systems. Hands-on with NestJS, Next.js, Laravel, Vue.js, Go, Python and Flutter, in an AI-augmented workflow. Off the clock I build across security, finance and media — the eleven projects below.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
