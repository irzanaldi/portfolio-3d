import { render, screen } from '@testing-library/react';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';

test('SkillsSection renders a known category label', () => {
  render(<SkillsSection />);
  expect(screen.getByText('Architecture')).toBeInTheDocument();
});

test('ExperienceSection renders the Senior Fullstack Developer role', () => {
  render(<ExperienceSection />);
  expect(screen.getByText(/Senior Fullstack Developer/)).toBeInTheDocument();
});
