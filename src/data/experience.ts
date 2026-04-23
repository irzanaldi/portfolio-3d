// portfolio-3d/src/data/experience.ts
export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  projectIds: string[];
}

export const experiences: Experience[] = [
  {
    id: 'hw-group',
    company: 'HW Group',
    role: 'Backend Developer',
    period: 'Oct 2021 — Aug 2023',
    location: 'Indonesia',
    bullets: [
      'Designed and developed RESTful APIs using Laravel for internal operations and client-facing services.',
      'Built customer management CMS using Livewire, streamlining data operations.',
      'Contributed to POS CMS development using Vue.js with ongoing maintenance.',
    ],
    projectIds: ['livestock-erp', 'sales-purchasing-erp'],
  },
  {
    id: 'tbs-indonesia',
    company: 'The Body Shop Indonesia',
    role: 'Fullstack Developer',
    period: 'Aug 2023 — Present',
    location: 'Indonesia',
    bullets: [
      'Designed and implemented RESTful APIs using NestJS for backend services.',
      'Developed customer management CMS with Next.js for operations team.',
      'Built promotional features (vouchers, campaigns) for e-commerce website.',
      'Maintained and enhanced POS system using Flutter for in-store transactions.',
      'Developed real-time inventory system to sync stock across stores and e-commerce.',
    ],
    projectIds: ['pos-system', 'realtime-inventory', 'ecommerce-cms'],
  },
];
