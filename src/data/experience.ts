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
      'Designed and developed RESTful APIs with Laravel — the backbone for internal operations and client-facing services.',
      'Built a customer-management CMS with Livewire, reducing manual data entry for the team.',
      'Contributed to a POS CMS with Vue.js and managed ongoing maintenance and bug fixes.',
    ],
    projectIds: ['livestock-erp', 'sales-purchasing-erp'],
  },
  {
    id: 'tbs-indonesia',
    company: 'The Body Shop Indonesia',
    role: 'Senior Fullstack Developer',
    period: 'Aug 2023 — Present',
    location: 'Indonesia',
    bullets: [
      'Architected RESTful and event-driven APIs (NestJS, Go) across an 11-microservice ecosystem, with Kafka messaging and Redis.',
      'Built a Smart Admin Panel (Next.js) — one interface to run 8 departments and 11 microservices, funneling orders from 100+ stores into a centralized OMS.',
      'Built a real-time inventory system syncing stock across stores and e-commerce, with expiry tracking, analytics and smart reminders.',
      'Designed a data warehouse over 11 microservices and POS channels — ELT with Python, dbt and Dagster — powering analytics and reporting.',
      'Built promotional features (vouchers, campaigns) for the e-commerce platform.',
      'Maintained and enhanced the Flutter POS system for reliable in-store transactions.',
      'Implemented CI/CD pipelines with Jenkins across services.',
    ],
    projectIds: ['pos-system', 'realtime-inventory', 'ecommerce-cms'],
  },
];
