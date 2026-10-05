import { render, screen } from '@testing-library/react';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';

test('renders title, tagline, status chip and links to detail', () => {
  const p = projects[0];
  render(<ProjectCard project={p} />);
  expect(screen.getByText(p.title)).toBeInTheDocument();
  expect(screen.getByText(p.tagline)).toBeInTheDocument();
  expect(screen.getByRole('link')).toHaveAttribute('href', `/projects/${p.id}`);
});
