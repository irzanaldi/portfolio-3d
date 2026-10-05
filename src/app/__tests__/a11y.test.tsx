import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { projects } from '@/data/projects';

// Hero's background is a next/dynamic({ ssr:false }) R3F scene — not renderable under
// jsdom (no WebGL). Stub it out so this smoke test exercises the accessible DOM only.
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => {
    function DynamicStub() {
      return null;
    }
    return DynamicStub;
  },
}));

test('home page renders exactly one h1', () => {
  render(<Home />);
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
});

test('every project card/tile link exposes a non-empty accessible name naming its project', () => {
  render(<ProjectsSection />);

  const projectLinks = screen
    .getAllByRole('link')
    .filter((link) => link.getAttribute('href')?.startsWith('/projects/'));

  // 3 featured tiles + 8 "all projects" cards = 11, one per project, no duplicates.
  expect(projectLinks).toHaveLength(projects.length);

  for (const project of projects) {
    const link = projectLinks.find((el) => el.getAttribute('href') === `/projects/${project.id}`);
    expect(link).toBeDefined();
    expect(link?.textContent?.trim().length).toBeGreaterThan(0);
    expect(link?.textContent).toContain(project.title);
  }
});
