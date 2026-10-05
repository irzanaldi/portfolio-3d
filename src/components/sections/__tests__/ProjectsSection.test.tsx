import { render, screen } from '@testing-library/react';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { projects } from '@/data/projects';

test('renders all 11 project titles (no project silently dropped)', () => {
  render(<ProjectsSection />);
  for (const p of projects) {
    expect(screen.getAllByText(p.title).length).toBeGreaterThan(0);
  }
});
