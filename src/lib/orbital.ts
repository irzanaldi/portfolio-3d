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

export type SectionId = 'intro' | 'skills' | 'experience' | 'projects' | 'contact';

export interface Waypoint {
  id: SectionId;
  /** camera world position at this stop */
  camera: [number, number, number];
  /** orbit-controls / lookAt target at this stop */
  target: [number, number, number];
  /** ring highlighted while on this stop (null = none) */
  ringIndex: 0 | 1 | 2 | null;
}

/** Ordered camera stops; scroll offset 0..1 maps across these. */
export const WAYPOINTS: Waypoint[] = [
  { id: 'intro', camera: [0, 5, 20], target: [0, 0, 0], ringIndex: null },
  { id: 'skills', camera: [-6.5, 2.5, 8.5], target: [-1.5, 0, 0], ringIndex: 0 },
  { id: 'experience', camera: [8.5, 1.5, 8], target: [1.5, 0, 0], ringIndex: 1 },
  { id: 'projects', camera: [-9, 4.5, 12], target: [0, 0, 0], ringIndex: 2 },
  { id: 'contact', camera: [0, 2, 13], target: [0, 0.5, 0], ringIndex: null },
];

/** Linear-interpolate the camera+target for a fractional scroll position 0..1. */
export function sampleWaypoint(progress: number): {
  camera: [number, number, number];
  target: [number, number, number];
} {
  const n = WAYPOINTS.length - 1;
  const clamped = Math.min(Math.max(progress, 0), 1);
  const f = clamped * n;
  const i = Math.min(Math.floor(f), n - 1);
  const t = f - i;
  const a = WAYPOINTS[i];
  const b = WAYPOINTS[i + 1];
  const lerp = (
    p: [number, number, number],
    q: [number, number, number],
  ): [number, number, number] => [
    p[0] + (q[0] - p[0]) * t,
    p[1] + (q[1] - p[1]) * t,
    p[2] + (q[2] - p[2]) * t,
  ];
  return { camera: lerp(a.camera, b.camera), target: lerp(a.target, b.target) };
}

/** Which section is most in-focus for a scroll offset 0..1. */
export function activeSection(progress: number): SectionId {
  const n = WAYPOINTS.length - 1;
  const idx = Math.round(Math.min(Math.max(progress, 0), 1) * n);
  return WAYPOINTS[idx].id;
}
