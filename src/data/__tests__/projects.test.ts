import { projects } from '@/data/projects';

const STATUSES = ['live', 'video', 'gallery', 'code', 'prototype'];

test('11 personal projects, unique ids', () => {
  expect(projects).toHaveLength(11);
  expect(new Set(projects.map(p => p.id)).size).toBe(11);
});

test('every project has required fields and a valid status', () => {
  for (const p of projects) {
    expect(p.title).toBeTruthy();
    expect(p.tagline).toBeTruthy();
    expect(p.techStack.length).toBeGreaterThan(0);
    expect(STATUSES).toContain(p.status);
    expect(Array.isArray(p.images)).toBe(true);
  }
});

test('exactly 3 featured', () => {
  expect(projects.filter(p => p.featured)).toHaveLength(3);
});

test('live projects declare an embedUrl or liveUrl', () => {
  for (const p of projects.filter(p => p.status === 'live')) {
    expect(p.embedUrl || p.liveUrl).toBeTruthy();
  }
});
