import { experiences } from '@/data/experience';
import { skillCategories } from '@/data/skills';

test('experience reflects Senior role and both employers', () => {
  const tbs = experiences.find(e => e.company === 'The Body Shop Indonesia')!;
  expect(tbs.role).toMatch(/Senior Fullstack/);
  expect(tbs.bullets.length).toBeGreaterThanOrEqual(6);
  expect(experiences.some(e => e.company === 'HW Group')).toBe(true);
});

test('skills include the senior-signal categories', () => {
  const names = skillCategories.map(c => c.category);
  expect(names).toEqual(expect.arrayContaining(['Architecture', 'Data & Analytics', 'DevOps']));
});
