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

test('any live/demo URL is a real https URL (no placeholders)', () => {
  for (const p of projects) {
    for (const url of [p.embedUrl, p.liveUrl].filter(Boolean)) {
      expect(url).toMatch(/^https:\/\//);
      expect(url).not.toContain('example.com');
    }
  }
});
