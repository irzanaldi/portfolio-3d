import {
  buildNodes,
  RING_CONFIG,
  colorForKind,
  resolveConnections,
} from '@/lib/orbital';
import { skillCategories } from '@/data/skills';
import { experiences } from '@/data/experience';
import { projects } from '@/data/projects';

describe('orbital helpers', () => {
  const nodes = buildNodes();

  it('builds one node per skill category, experience, and project', () => {
    expect(nodes.filter((n) => n.kind === 'skill')).toHaveLength(skillCategories.length);
    expect(nodes.filter((n) => n.kind === 'experience')).toHaveLength(experiences.length);
    expect(nodes.filter((n) => n.kind === 'project')).toHaveLength(projects.length);
  });

  it('assigns ringIndex by kind', () => {
    expect(nodes.find((n) => n.kind === 'skill')!.ringIndex).toBe(0);
    expect(nodes.find((n) => n.kind === 'experience')!.ringIndex).toBe(1);
    expect(nodes.find((n) => n.kind === 'project')!.ringIndex).toBe(2);
  });

  it('has a RingConfig per ring index with increasing radius outward', () => {
    expect(RING_CONFIG).toHaveLength(3);
    expect(RING_CONFIG[0].radius).toBeGreaterThan(0);
    expect(RING_CONFIG[1].radius).toBeGreaterThan(RING_CONFIG[0].radius);
    expect(RING_CONFIG[2].radius).toBeGreaterThan(RING_CONFIG[1].radius);
  });

  it('maps each kind to a distinct color', () => {
    const colors = new Set(
      (['skill', 'experience', 'project'] as const).map((k) => colorForKind(k)),
    );
    expect(colors.size).toBe(3);
  });

  it('resolves connections from an experience to its existing project node ids', () => {
    const exp = experiences.find((e) => e.projectIds.length > 0)!;
    const conn = resolveConnections(exp.id, nodes);
    const existingIds = new Set(projects.map((p) => p.id));
    const expectedIds = exp.projectIds.filter((id) => existingIds.has(id));
    expect(conn.sort()).toEqual(expectedIds.sort());
  });

  it('returns empty connections for unknown experience id', () => {
    expect(resolveConnections('does-not-exist', nodes)).toEqual([]);
  });
});
