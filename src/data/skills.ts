// portfolio-3d/src/data/skills.ts
export interface SkillCategory {
  category: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  { category: 'Languages', items: ['JavaScript', 'TypeScript', 'PHP', 'Dart'] },
  { category: 'Backend', items: ['NestJS', 'Laravel', 'Node.js', 'Express.js'] },
  { category: 'Frontend', items: ['Next.js', 'React', 'Vue.js', 'Livewire', 'Flutter'] },
  { category: 'Database', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'] },
  { category: 'Tools', items: ['Git', 'Docker', 'REST API', 'Linux', 'Postman'] },
];
