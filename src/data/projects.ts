// portfolio-3d/src/data/projects.ts
export interface Project {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  techStack: string[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'pos-system',
    title: 'POS System',
    company: 'The Body Shop Indonesia',
    period: '2023 — Present',
    description:
      'Point of Sales application built with Flutter for in-store transactions. Handles product scanning, payment processing, and sales reporting across multiple retail outlets.',
    techStack: ['Flutter', 'Dart', 'REST API'],
    images: ['/textures/pos-placeholder.png'],
  },
  {
    id: 'realtime-inventory',
    title: 'Realtime Inventory',
    company: 'The Body Shop Indonesia',
    period: '2023 — Present',
    description:
      'Real-time inventory management system that synchronizes stock levels across physical stores and the e-commerce platform, ensuring accurate availability data.',
    techStack: ['NestJS', 'TypeScript', 'PostgreSQL', 'WebSocket'],
    images: ['/textures/inventory-placeholder.png'],
  },
  {
    id: 'ecommerce-cms',
    title: 'E-commerce CMS',
    company: 'The Body Shop Indonesia',
    period: '2023 — Present',
    description:
      'Content management system built with Next.js for managing the e-commerce platform, including product catalog, promotions, and customer data.',
    techStack: ['Next.js', 'React', 'TypeScript'],
    images: ['/textures/cms-placeholder.png'],
  },
  {
    id: 'livestock-erp',
    title: 'Livestock ERP',
    company: 'HW Group',
    period: 'Mar 2023',
    description:
      'Enterprise resource planning system for livestock management. Enables users to input and track stock data efficiently with automated reporting.',
    techStack: ['Laravel', 'PHP', 'Livewire', 'MySQL'],
    images: ['/textures/livestock-placeholder.png'],
  },
  {
    id: 'sales-purchasing-erp',
    title: 'Sales & Purchasing ERP',
    company: 'HW Group',
    period: 'Dec 2022 — Feb 2023',
    description:
      'ERP system supporting internal asset transactions with automatic report generation for accounting and finance departments.',
    techStack: ['Laravel', 'PHP', 'Livewire', 'MySQL'],
    images: ['/textures/sales-erp-placeholder.png'],
  },
];
