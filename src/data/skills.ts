// portfolio-3d/src/data/skills.ts
export interface SkillCategory {
  category: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  { category: 'Languages', items: ['TypeScript', 'JavaScript', 'PHP', 'Go', 'Python', 'Dart'] },
  { category: 'Backend', items: ['NestJS', 'Node.js', 'Express', 'Laravel', 'Go'] },
  { category: 'Frontend', items: ['Next.js', 'React', 'Vue.js', 'Livewire', 'Flutter'] },
  { category: 'Architecture', items: ['Microservices', 'Event-Driven', 'REST APIs'] },
  { category: 'Messaging & Cache', items: ['Kafka', 'Redis'] },
  { category: 'Data & Analytics', items: ['Data Warehouse', 'dbt', 'Dagster', 'MySQL', 'PostgreSQL', 'MongoDB'] },
  { category: 'DevOps', items: ['Docker', 'Jenkins', 'n8n', 'Linux', 'Git'] },
  { category: 'AI Stack', items: ['Claude Code', 'Obsidian'] },
];
