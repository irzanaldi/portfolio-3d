'use client';
import { projects } from '@/data/projects';
import { experiences } from '@/data/experience';
import { skillCategories } from '@/data/skills';

/**
 * Scroll-synced HTML overlay. Rendered inside drei <Scroll html>, so it scrolls
 * in lockstep with the camera waypoints driven by ScrollRig. One full-viewport
 * panel per camera stop.
 */
export function Sections() {
  return (
    <div className="orbital-pages">
      <section className="orbital-page orbital-page--center">
        <span className="orbital-intro__eyebrow">Interactive Portfolio</span>
        <h1 className="orbital-intro__title">
          IRZAN ALDI
          <br />
          ANANTO
        </h1>
        <p className="orbital-intro__sub">Fullstack Developer — scroll to travel the orbit</p>
        <span className="orbital-scrollcue">scroll ↓</span>
      </section>

      <section className="orbital-page orbital-page--left">
        <div className="orbital-card">
          <span className="orbital-panel__kind" style={{ color: '#22d3ee' }}>
            01 — SKILLS
          </span>
          <h2>Toolbelt</h2>
          {skillCategories.map((s) => (
            <div key={s.category} className="orbital-card__group">
              <h3>{s.category}</h3>
              <ul className="orbital-panel__tags">
                {s.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="orbital-page orbital-page--right">
        <div className="orbital-card orbital-card--wide">
          <span className="orbital-panel__kind" style={{ color: '#a78bfa' }}>
            02 — EXPERIENCE
          </span>
          <h2>Where I&apos;ve built</h2>
          <ol className="orbital-timeline">
            {experiences.map((e) => (
              <li key={e.id} className="orbital-timeline__item">
                <div className="orbital-timeline__head">
                  <h3>{e.role}</h3>
                  <span className="orbital-timeline__period">{e.period}</span>
                </div>
                <p className="orbital-timeline__company">
                  {e.company}
                  {e.location ? ` · ${e.location}` : ''}
                </p>
                <ul className="orbital-panel__bullets">
                  {e.bullets.slice(0, 2).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="orbital-page orbital-page--left">
        <div className="orbital-card">
          <span className="orbital-panel__kind" style={{ color: '#e879f9' }}>
            03 — PROJECTS
          </span>
          <h2>Selected work</h2>
          {projects.map((p) => (
            <div key={p.id} className="orbital-card__group">
              <h3>{p.title}</h3>
              <p className="orbital-panel__meta">
                {p.company} · {p.period}
              </p>
              <p className="orbital-card__desc">{p.description}</p>
              <ul className="orbital-panel__tags">
                {p.techStack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="orbital-page orbital-page--center">
        <span className="orbital-panel__kind" style={{ color: '#22d3ee' }}>
          04 — CONTACT
        </span>
        <h2 className="orbital-contact__title">Let&apos;s build something.</h2>
        <div className="orbital-contact__links">
          <a href="mailto:irzanaldi@gmail.com">irzanaldi@gmail.com</a>
          <a href="https://github.com/irzanaldi" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/irzan-aldi-ananto-688819214"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
