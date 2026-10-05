// portfolio-3d/__tests__/data/skills.test.ts
import { skillCategories, type SkillCategory } from '@/data/skills';

describe('skills data', () => {
  it('should have 8 categories', () => {
    expect(skillCategories).toHaveLength(8);
  });

  it('each category has items', () => {
    skillCategories.forEach((cat: SkillCategory) => {
      expect(cat.category).toBeTruthy();
      expect(cat.items.length).toBeGreaterThan(0);
    });
  });
});
