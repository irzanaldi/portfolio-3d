// portfolio-3d/__tests__/data/projects.test.ts
import { projects, type Project } from '@/data/projects';

describe('projects data', () => {
  it('should have 5 projects', () => {
    expect(projects).toHaveLength(5);
  });

  it('each project has required fields', () => {
    projects.forEach((project: Project) => {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.company).toBeTruthy();
      expect(project.period).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.techStack.length).toBeGreaterThan(0);
      expect(project.images.length).toBeGreaterThan(0);
    });
  });

  it('has projects from both companies', () => {
    const companies = [...new Set(projects.map((p) => p.company))];
    expect(companies).toContain('The Body Shop Indonesia');
    expect(companies).toContain('HW Group');
  });
});
