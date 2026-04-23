// portfolio-3d/__tests__/data/experience.test.ts
import { experiences, type Experience } from '@/data/experience';

describe('experience data', () => {
  it('should have 2 experiences', () => {
    expect(experiences).toHaveLength(2);
  });

  it('each experience has required fields', () => {
    experiences.forEach((exp: Experience) => {
      expect(exp.id).toBeTruthy();
      expect(exp.company).toBeTruthy();
      expect(exp.role).toBeTruthy();
      expect(exp.period).toBeTruthy();
      expect(exp.bullets.length).toBeGreaterThan(0);
      expect(exp.projectIds.length).toBeGreaterThan(0);
    });
  });

  it('experiences ordered chronologically (earliest first)', () => {
    expect(experiences[0].company).toBe('HW Group');
    expect(experiences[1].company).toBe('The Body Shop Indonesia');
  });
});
