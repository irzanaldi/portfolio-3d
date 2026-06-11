import { skillCategories } from '@/data/skills';
import { experiences } from '@/data/experience';
import { projects } from '@/data/projects';

export type NodeKind = 'skill' | 'experience' | 'project';

export interface OrbitalNode {
  kind: NodeKind;
  id: string;
  label: string;
  ringIndex: 0 | 1 | 2;
}

export interface RingConfig {
  ringIndex: 0 | 1 | 2;
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
}

export interface SelectionRef {
  kind: NodeKind;
  id: string;
}

const COLORS: Record<NodeKind, string> = {
  skill: '#22d3ee', // cyan
  experience: '#a78bfa', // violet
  project: '#e879f9', // magenta
};

export function colorForKind(kind: NodeKind): string {
  return COLORS[kind];
}

export const RING_CONFIG: RingConfig[] = [
  { ringIndex: 0, radius: 4, tilt: [0.25, 0, 0.1], speed: 0.1, color: COLORS.skill },
  { ringIndex: 1, radius: 6.5, tilt: [-0.2, 0, -0.15], speed: 0.07, color: COLORS.experience },
  { ringIndex: 2, radius: 9, tilt: [0.15, 0, 0.25], speed: 0.05, color: COLORS.project },
];

export function buildNodes(): OrbitalNode[] {
  const skillNodes: OrbitalNode[] = skillCategories.map((s) => ({
    kind: 'skill',
    id: s.category,
    label: s.category,
    ringIndex: 0,
  }));
  const expNodes: OrbitalNode[] = experiences.map((e) => ({
    kind: 'experience',
    id: e.id,
    label: e.company,
    ringIndex: 1,
  }));
  const projectNodes: OrbitalNode[] = projects.map((p) => ({
    kind: 'project',
    id: p.id,
    label: p.title,
    ringIndex: 2,
  }));
  return [...skillNodes, ...expNodes, ...projectNodes];
}

export function resolveConnections(experienceId: string, nodes: OrbitalNode[]): string[] {
  const exp = experiences.find((e) => e.id === experienceId);
  if (!exp) return [];
  const projectIds = new Set(nodes.filter((n) => n.kind === 'project').map((n) => n.id));
  return exp.projectIds.filter((id) => projectIds.has(id));
}

/** Position of node i of count on a ring of given radius, even angular spacing (local ring plane). */
export function nodePosition(radius: number, i: number, count: number): [number, number, number] {
  const angle = (i / Math.max(count, 1)) * Math.PI * 2;
  return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
}
