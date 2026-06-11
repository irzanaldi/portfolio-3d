# Orbital Workspace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive 3D "Orbital Workspace" portfolio at `/orbital` where skills, experience, and projects orbit a central node and the user drags to orbit, hovers to highlight, and clicks to focus + reveal detail.

**Architecture:** New non-destructive route `/orbital` mounting a client `OrbitalExperience`. Pure data→node helpers in `src/lib/orbital.ts` (unit-tested). R3F scene: center node + 3 auto-rotating tilted rings built from existing data. Selection state in the top component drives camera tween, detail panel, and connection lines.

**Tech Stack:** Next 16, React 19, @react-three/fiber 9, @react-three/drei, @react-three/postprocessing, three, framer-motion, Jest.

---

## File Structure

- Create `src/lib/orbital.ts` — pure helpers: node-list builders, ring config, color map, connection resolver.
- Create `__tests__/lib/orbital.test.ts` — unit tests for helpers.
- Create `src/components/orbital/OrbitalExperience.tsx` — Canvas + overlay + selection state + WebGL/reduced-motion gates.
- Create `src/components/orbital/OrbitalScene.tsx` — scene graph (lights, fog, stars, center, rings, connections, postfx).
- Create `src/components/orbital/CenterNode.tsx` — glowing center node + name label.
- Create `src/components/orbital/OrbitRing.tsx` — places nodes on a tilted circle, auto-rotates.
- Create `src/components/orbital/OrbitNode.tsx` — one interactive node (hover/click/glow/label).
- Create `src/components/orbital/ConnectionLines.tsx` — lines from active experience to its projects.
- Create `src/components/orbital/CameraRig.tsx` — OrbitControls + tween-to-target.
- Create `src/components/orbital/DetailPanel.tsx` — overlay detail for selected node.
- Create `src/components/orbital/Loader.tsx` — Suspense fallback.
- Create `src/app/orbital/page.tsx` — route entry.
- Modify `src/app/globals.css` — append namespaced `.orbital-*` palette vars + grain/vignette.

## Shared types (defined once, used across tasks)

These live at the top of `src/lib/orbital.ts`:

```ts
export type NodeKind = 'skill' | 'experience' | 'project';

export interface OrbitalNode {
  kind: NodeKind;
  id: string;
  label: string;       // short label shown on hover
  ringIndex: 0 | 1 | 2; // 0 inner skills, 1 mid experience, 2 outer projects
}

export interface RingConfig {
  ringIndex: 0 | 1 | 2;
  radius: number;
  tilt: [number, number, number]; // euler rotation of the ring plane
  speed: number;                   // radians/sec auto-rotate
  color: string;                   // hex
}

export interface SelectionRef { kind: NodeKind; id: string }
```

---

### Task 1: Pure helpers + tests (`src/lib/orbital.ts`)

**Files:**
- Create: `src/lib/orbital.ts`
- Test: `__tests__/lib/orbital.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// __tests__/lib/orbital.test.ts
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

  it('has a RingConfig for each ring index with positive radius and increasing radius outward', () => {
    expect(RING_CONFIG).toHaveLength(3);
    expect(RING_CONFIG[0].radius).toBeGreaterThan(0);
    expect(RING_CONFIG[1].radius).toBeGreaterThan(RING_CONFIG[0].radius);
    expect(RING_CONFIG[2].radius).toBeGreaterThan(RING_CONFIG[1].radius);
  });

  it('maps each kind to a distinct color', () => {
    const colors = new Set(['skill', 'experience', 'project'].map((k) => colorForKind(k as any)));
    expect(colors.size).toBe(3);
  });

  it('resolves connections from an experience to its project node ids that exist', () => {
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
```

- [ ] **Step 2: Run test, verify it fails**

Run: `npx jest __tests__/lib/orbital.test.ts`
Expected: FAIL — cannot find module `@/lib/orbital`.

- [ ] **Step 3: Implement `src/lib/orbital.ts`**

```ts
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

export interface SelectionRef { kind: NodeKind; id: string }

const COLORS: Record<NodeKind, string> = {
  skill: '#22d3ee',       // cyan
  experience: '#a78bfa',  // violet
  project: '#e879f9',     // magenta
};

export function colorForKind(kind: NodeKind): string {
  return COLORS[kind];
}

export const RING_CONFIG: RingConfig[] = [
  { ringIndex: 0, radius: 4, tilt: [0.25, 0, 0.1], speed: 0.10, color: COLORS.skill },
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
```

- [ ] **Step 4: Run test, verify it passes**

Run: `npx jest __tests__/lib/orbital.test.ts`
Expected: PASS (all assertions).

- [ ] **Step 5: Commit**

```bash
git add src/lib/orbital.ts __tests__/lib/orbital.test.ts
git commit -m "feat(orbital): add data->node helpers with tests"
```

---

### Task 2: Loader + CenterNode

**Files:**
- Create: `src/components/orbital/Loader.tsx`
- Create: `src/components/orbital/CenterNode.tsx`

- [ ] **Step 1: Implement `Loader.tsx`**

```tsx
'use client';
import { Html, useProgress } from '@react-three/drei';

export function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: '#22d3ee', fontFamily: 'var(--font-mono)', fontSize: 14 }}>
        {Math.round(progress)}%
      </div>
    </Html>
  );
}
```

- [ ] **Step 2: Implement `CenterNode.tsx`**

```tsx
'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import type { Mesh } from 'three';

export function CenterNode() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.2;
  });
  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#22d3ee"
          emissiveIntensity={1.4}
          roughness={0.3}
          metalness={0.6}
          wireframe
        />
      </mesh>
      <Html center distanceFactor={12} position={[0, -2, 0]}>
        <div
          style={{
            color: '#e6f7ff',
            fontFamily: 'var(--font-orbital-display, sans-serif)',
            fontSize: 18,
            whiteSpace: 'nowrap',
            textShadow: '0 0 12px rgba(34,211,238,0.8)',
            pointerEvents: 'none',
          }}
        >
          Irzan Aldi Ananto
        </div>
      </Html>
    </group>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors in these files (pre-existing unrelated errors, if any, ignored — there should be none).

- [ ] **Step 4: Commit**

```bash
git add src/components/orbital/Loader.tsx src/components/orbital/CenterNode.tsx
git commit -m "feat(orbital): add Loader and CenterNode"
```

---

### Task 3: OrbitNode + OrbitRing

**Files:**
- Create: `src/components/orbital/OrbitNode.tsx`
- Create: `src/components/orbital/OrbitRing.tsx`

- [ ] **Step 1: Implement `OrbitNode.tsx`**

```tsx
'use client';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import type { Mesh } from 'three';
import type { OrbitalNode, SelectionRef } from '@/lib/orbital';

interface OrbitNodeProps {
  node: OrbitalNode;
  position: [number, number, number];
  color: string;
  active: boolean;
  onSelect: (ref: SelectionRef) => void;
}

export function OrbitNode({ node, position, color, active, onSelect }: OrbitNodeProps) {
  const ref = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const target = active || hovered ? 1.6 : 1;

  useFrame(() => {
    if (!ref.current) return;
    const s = ref.current.scale.x + (target - ref.current.scale.x) * 0.15;
    ref.current.scale.setScalar(s);
  });

  return (
    <group position={position}>
      <mesh
        ref={ref}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect({ kind: node.kind, id: node.id });
        }}
      >
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active || hovered ? 1.8 : 0.7}
          roughness={0.35}
          metalness={0.5}
        />
      </mesh>
      {(hovered || active) && (
        <Html center distanceFactor={14} position={[0, 0.9, 0]}>
          <div
            style={{
              color: '#fff',
              fontFamily: 'var(--font-orbital-body, sans-serif)',
              fontSize: 13,
              whiteSpace: 'nowrap',
              padding: '2px 8px',
              borderRadius: 6,
              background: 'rgba(5,6,10,0.7)',
              border: `1px solid ${color}`,
              pointerEvents: 'none',
            }}
          >
            {node.label}
          </div>
        </Html>
      )}
    </group>
  );
}
```

- [ ] **Step 2: Implement `OrbitRing.tsx`**

```tsx
'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { OrbitNode } from './OrbitNode';
import { nodePosition, type OrbitalNode, type RingConfig, type SelectionRef } from '@/lib/orbital';

interface OrbitRingProps {
  config: RingConfig;
  nodes: OrbitalNode[];
  selected: SelectionRef | null;
  autoRotate: boolean;
  onSelect: (ref: SelectionRef) => void;
}

export function OrbitRing({ config, nodes, selected, autoRotate, onSelect }: OrbitRingProps) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current && autoRotate) ref.current.rotation.y += delta * config.speed;
  });
  return (
    <group rotation={config.tilt}>
      {/* faint ring guide */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[config.radius, 0.015, 8, 128]} />
        <meshBasicMaterial color={config.color} transparent opacity={0.25} />
      </mesh>
      <group ref={ref}>
        {nodes.map((n, i) => (
          <OrbitNode
            key={`${n.kind}-${n.id}`}
            node={n}
            color={config.color}
            position={nodePosition(config.radius, i, nodes.length)}
            active={selected?.kind === n.kind && selected?.id === n.id}
            onSelect={onSelect}
          />
        ))}
      </group>
    </group>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/orbital/OrbitNode.tsx src/components/orbital/OrbitRing.tsx
git commit -m "feat(orbital): add interactive OrbitNode and OrbitRing"
```

---

### Task 4: CameraRig + ConnectionLines

**Files:**
- Create: `src/components/orbital/CameraRig.tsx`
- Create: `src/components/orbital/ConnectionLines.tsx`

- [ ] **Step 1: Implement `CameraRig.tsx`**

```tsx
'use client';
import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface CameraRigProps {
  target: [number, number, number] | null; // selected node world pos, or null = default
  reducedMotion: boolean;
  onUserInteract: () => void;
}

const DEFAULT_TARGET = new Vector3(0, 0, 0);

export function CameraRig({ target, reducedMotion, onUserInteract }: CameraRigProps) {
  const controls = useRef<OrbitControlsImpl>(null);
  const desired = useRef(new Vector3());

  useEffect(() => {
    desired.current.set(...(target ?? [0, 0, 0]));
  }, [target]);

  useFrame(() => {
    const c = controls.current;
    if (!c) return;
    const goal = target ? desired.current : DEFAULT_TARGET;
    if (reducedMotion) {
      c.target.copy(goal);
    } else {
      c.target.lerp(goal, 0.08);
    }
    c.update();
  });

  return (
    <OrbitControls
      ref={controls}
      enableDamping
      dampingFactor={0.08}
      enablePan={false}
      minDistance={6}
      maxDistance={26}
      onStart={onUserInteract}
    />
  );
}
```

- [ ] **Step 2: Implement `ConnectionLines.tsx`**

```tsx
'use client';
import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import { Vector3 } from 'three';

interface ConnectionLinesProps {
  // pairs of world positions [from, to]
  segments: Array<[[number, number, number], [number, number, number]]>;
  color: string;
}

export function ConnectionLines({ segments, color }: ConnectionLinesProps) {
  const lines = useMemo(
    () =>
      segments.map(([a, b]) => [new Vector3(...a), new Vector3(...b)] as [Vector3, Vector3]),
    [segments],
  );
  return (
    <>
      {lines.map((pts, i) => (
        <Line key={i} points={pts} color={color} lineWidth={1.5} transparent opacity={0.6} />
      ))}
    </>
  );
}
```

Note: world positions for connections are computed in `OrbitalScene` (Task 5) where node group refs are available; for the first pass, connection segments may be drawn from the ring centers as an approximation if per-node world positions are not yet wired. Acceptable simplification: draw from center node `[0,0,0]` to each connected project's ring position. This keeps the feature visible without threading refs. The exact source is documented in Task 5.

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/orbital/CameraRig.tsx src/components/orbital/ConnectionLines.tsx
git commit -m "feat(orbital): add CameraRig and ConnectionLines"
```

---

### Task 5: OrbitalScene (assembly)

**Files:**
- Create: `src/components/orbital/OrbitalScene.tsx`

- [ ] **Step 1: Implement `OrbitalScene.tsx`**

```tsx
'use client';
import { Suspense, useMemo } from 'react';
import { Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { CenterNode } from './CenterNode';
import { OrbitRing } from './OrbitRing';
import { CameraRig } from './CameraRig';
import { ConnectionLines } from './ConnectionLines';
import { Loader } from './Loader';
import {
  buildNodes,
  RING_CONFIG,
  resolveConnections,
  nodePosition,
  colorForKind,
  type SelectionRef,
} from '@/lib/orbital';

interface OrbitalSceneProps {
  selected: SelectionRef | null;
  autoRotate: boolean;
  reducedMotion: boolean;
  onSelect: (ref: SelectionRef) => void;
  onUserInteract: () => void;
}

export function OrbitalScene({
  selected,
  autoRotate,
  reducedMotion,
  onSelect,
  onUserInteract,
}: OrbitalSceneProps) {
  const nodes = useMemo(() => buildNodes(), []);
  const ringNodes = useMemo(
    () => RING_CONFIG.map((c) => nodes.filter((n) => n.ringIndex === c.ringIndex)),
    [nodes],
  );

  // selected node approx position (ring plane, ignoring live rotation) for camera focus
  const targetPos = useMemo<[number, number, number] | null>(() => {
    if (!selected) return null;
    const cfg = RING_CONFIG.find((c) =>
      nodes.some((n) => n.ringIndex === c.ringIndex && n.kind === selected.kind),
    );
    if (!cfg) return null;
    const list = ringNodes[cfg.ringIndex];
    const idx = list.findIndex((n) => n.id === selected.id);
    if (idx < 0) return null;
    return nodePosition(cfg.radius, idx, list.length);
  }, [selected, nodes, ringNodes]);

  // connection segments: center -> each connected project ring position
  const segments = useMemo<
    Array<[[number, number, number], [number, number, number]]>
  >(() => {
    if (selected?.kind !== 'experience') return [];
    const connectedIds = resolveConnections(selected.id, nodes);
    const projCfg = RING_CONFIG[2];
    const list = ringNodes[2];
    return connectedIds
      .map((pid) => {
        const idx = list.findIndex((n) => n.id === pid);
        if (idx < 0) return null;
        const pos = nodePosition(projCfg.radius, idx, list.length);
        return [[0, 0, 0], pos] as [[number, number, number], [number, number, number]];
      })
      .filter((s): s is [[number, number, number], [number, number, number]] => s !== null);
  }, [selected, nodes, ringNodes]);

  return (
    <>
      <color attach="background" args={['#05060a']} />
      <fog attach="fog" args={['#05060a', 14, 32]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[8, 8, 8]} intensity={60} color="#22d3ee" />
      <pointLight position={[-8, -4, -8]} intensity={40} color="#e879f9" />
      <Stars radius={60} depth={40} count={2500} factor={3} fade speed={0.5} />

      <Suspense fallback={<Loader />}>
        <CenterNode />
        {RING_CONFIG.map((cfg, i) => (
          <OrbitRing
            key={cfg.ringIndex}
            config={cfg}
            nodes={ringNodes[i]}
            selected={selected}
            autoRotate={autoRotate && !reducedMotion}
            onSelect={onSelect}
          />
        ))}
        <ConnectionLines segments={segments} color={colorForKind('project')} />
        <EffectComposer>
          <Bloom intensity={0.7} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
          <Vignette eskil={false} offset={0.3} darkness={0.7} />
        </EffectComposer>
      </Suspense>

      <CameraRig target={targetPos} reducedMotion={reducedMotion} onUserInteract={onUserInteract} />
    </>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/orbital/OrbitalScene.tsx
git commit -m "feat(orbital): assemble OrbitalScene with rings, bloom, connections"
```

---

### Task 6: DetailPanel

**Files:**
- Create: `src/components/orbital/DetailPanel.tsx`

- [ ] **Step 1: Implement `DetailPanel.tsx`**

```tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import { experiences } from '@/data/experience';
import { skillCategories } from '@/data/skills';
import type { SelectionRef } from '@/lib/orbital';

interface DetailPanelProps {
  selected: SelectionRef | null;
  onClose: () => void;
}

export function DetailPanel({ selected, onClose }: DetailPanelProps) {
  return (
    <AnimatePresence>
      {selected && (
        <motion.aside
          key={`${selected.kind}-${selected.id}`}
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          className="orbital-panel"
        >
          <button className="orbital-panel__close" onClick={onClose} aria-label="Close">
            ×
          </button>
          {selected.kind === 'project' && <ProjectBody id={selected.id} />}
          {selected.kind === 'experience' && <ExperienceBody id={selected.id} />}
          {selected.kind === 'skill' && <SkillBody id={selected.id} />}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function ProjectBody({ id }: { id: string }) {
  const p = projects.find((x) => x.id === id);
  if (!p) return null;
  return (
    <div>
      <span className="orbital-panel__kind">PROJECT</span>
      <h2>{p.title}</h2>
      <p className="orbital-panel__meta">{p.company} · {p.period}</p>
      <p>{p.description}</p>
      <ul className="orbital-panel__tags">
        {p.techStack.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </div>
  );
}

function ExperienceBody({ id }: { id: string }) {
  const e = experiences.find((x) => x.id === id);
  if (!e) return null;
  return (
    <div>
      <span className="orbital-panel__kind">EXPERIENCE</span>
      <h2>{e.role}</h2>
      <p className="orbital-panel__meta">{e.company} · {e.period} · {e.location}</p>
      <ul className="orbital-panel__bullets">
        {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </div>
  );
}

function SkillBody({ id }: { id: string }) {
  const s = skillCategories.find((x) => x.category === id);
  if (!s) return null;
  return (
    <div>
      <span className="orbital-panel__kind">SKILLS</span>
      <h2>{s.category}</h2>
      <ul className="orbital-panel__tags">
        {s.items.map((i) => <li key={i}>{i}</li>)}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/orbital/DetailPanel.tsx
git commit -m "feat(orbital): add DetailPanel for skill/experience/project"
```

---

### Task 7: OrbitalExperience (top-level) + styles

**Files:**
- Create: `src/components/orbital/OrbitalExperience.tsx`
- Modify: `src/app/globals.css` (append namespaced styles)

- [ ] **Step 1: Append styles to `src/app/globals.css`**

Append at end of file:

```css
/* ===== Orbital Workspace ===== */
.orbital-root {
  position: fixed;
  inset: 0;
  background: #05060a;
  overflow: hidden;
}
.orbital-root canvas { display: block; }
.orbital-grain {
  pointer-events: none;
  position: absolute;
  inset: 0;
  opacity: 0.05;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.orbital-hint {
  position: absolute;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  color: rgba(230,247,255,0.6);
  font-family: var(--font-orbital-body, sans-serif);
  font-size: 13px;
  letter-spacing: 0.08em;
  pointer-events: none;
}
.orbital-back {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  color: #22d3ee;
  font-family: var(--font-orbital-body, sans-serif);
  font-size: 14px;
  text-decoration: none;
  border: 1px solid rgba(34,211,238,0.4);
  padding: 6px 12px;
  border-radius: 8px;
  background: rgba(5,6,10,0.5);
}
.orbital-panel {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: min(420px, 90vw);
  z-index: 20;
  padding: 64px 32px 32px;
  background: rgba(8,10,18,0.78);
  backdrop-filter: blur(14px);
  border-left: 1px solid rgba(34,211,238,0.3);
  color: #e6f7ff;
  font-family: var(--font-orbital-body, sans-serif);
  overflow-y: auto;
}
.orbital-panel h2 {
  font-family: var(--font-orbital-display, sans-serif);
  font-size: 28px;
  margin: 8px 0;
}
.orbital-panel__kind {
  font-size: 11px;
  letter-spacing: 0.2em;
  color: #22d3ee;
}
.orbital-panel__meta { color: rgba(230,247,255,0.6); font-size: 13px; margin-bottom: 16px; }
.orbital-panel__bullets { padding-left: 18px; display: flex; flex-direction: column; gap: 8px; }
.orbital-panel__bullets li { list-style: disc; font-size: 14px; line-height: 1.5; }
.orbital-panel__tags { display: flex; flex-wrap: wrap; gap: 8px; padding: 0; margin-top: 12px; }
.orbital-panel__tags li {
  list-style: none;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(168,139,250,0.4);
  color: #e6f7ff;
}
.orbital-panel__close {
  position: absolute;
  top: 18px;
  right: 18px;
  background: none;
  border: none;
  color: #e6f7ff;
  font-size: 28px;
  cursor: pointer;
  line-height: 1;
}
.orbital-fallback {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #e6f7ff;
  text-align: center;
  padding: 24px;
  font-family: var(--font-orbital-body, sans-serif);
}
```

- [ ] **Step 2: Implement `OrbitalExperience.tsx`**

```tsx
'use client';
import { useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import Link from 'next/link';
import { OrbitalScene } from './OrbitalScene';
import { DetailPanel } from './DetailPanel';
import { useWebGL } from '@/hooks/useWebGL';
import type { SelectionRef } from '@/lib/orbital';

export function OrbitalExperience() {
  const webglOK = useWebGL();
  const [selected, setSelected] = useState<SelectionRef | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const onUserInteract = useCallback(() => setAutoRotate(false), []);
  const onSelect = useCallback((ref: SelectionRef) => setSelected(ref), []);

  if (!webglOK) {
    return (
      <div className="orbital-root">
        <div className="orbital-fallback">
          <h2>Orbital Workspace needs WebGL</h2>
          <p>Your browser/device can&apos;t render the 3D view.</p>
          <Link className="orbital-back" href="/">← View classic portfolio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orbital-root">
      <Link className="orbital-back" href="/">← Home</Link>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 6, 18], fov: 50 }}
        gl={{ antialias: true }}
        onPointerMissed={() => setSelected(null)}
      >
        <OrbitalScene
          selected={selected}
          autoRotate={autoRotate}
          reducedMotion={reducedMotion}
          onSelect={onSelect}
          onUserInteract={onUserInteract}
        />
      </Canvas>
      <DetailPanel selected={selected} onClose={() => setSelected(null)} />
      <div className="orbital-hint">drag to orbit · click a node to explore</div>
      <div className="orbital-grain" />
    </div>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/orbital/OrbitalExperience.tsx src/app/globals.css
git commit -m "feat(orbital): add OrbitalExperience shell, panel wiring, styles"
```

---

### Task 8: Route + fonts + verify

**Files:**
- Create: `src/app/orbital/page.tsx`

- [ ] **Step 1: Implement `src/app/orbital/page.tsx`**

Use distinctive non-generic fonts (NOT Inter/Space Grotesk) scoped to this route via `next/font` and CSS vars `--font-orbital-display` / `--font-orbital-body`.

```tsx
import type { Metadata } from 'next';
import { Syne, Sora } from 'next/font/google';
import { OrbitalExperience } from '@/components/orbital/OrbitalExperience';

const display = Syne({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-orbital-display' });
const body = Sora({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-orbital-body' });

export const metadata: Metadata = {
  title: 'Orbital Workspace — Irzan Aldi Ananto',
  description: 'An interactive 3D exploration of skills, experience, and projects.',
};

export default function OrbitalPage() {
  return (
    <main className={`${display.variable} ${body.variable}`}>
      <OrbitalExperience />
    </main>
  );
}
```

- [ ] **Step 2: Run unit tests**

Run: `npx jest`
Expected: all tests pass (existing data tests + new orbital helper tests).

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: build succeeds, `/orbital` appears in the route list.

- [ ] **Step 4: Manual smoke test**

Run: `npm run dev`, open `http://localhost:3000/orbital`.
Verify: center node + 3 rings render from real data; drag orbits; hover shows labels; clicking a skill/experience/project focuses camera + opens panel; clicking an experience draws connection lines to its projects; empty-space click closes panel; `/` still works.

- [ ] **Step 5: Commit**

```bash
git add src/app/orbital/page.tsx
git commit -m "feat(orbital): add /orbital route with scoped fonts"
```

---

## Self-Review notes

- **Spec coverage:** route `/orbital` (T8), reuse data (T1/T6), center+3 rings (T2/T3/T5), drag/hover/click/focus (T3/T4/T7), connection lines (T4/T5), bloom/fog/stars (T5), WebGL + reduced-motion fallback (T7), distinctive fonts (T8), helper unit tests (T1), build passes (T8). All covered.
- **Type consistency:** `SelectionRef`, `OrbitalNode`, `RingConfig`, `nodePosition`, `resolveConnections`, `colorForKind` defined in T1 and used unchanged in T3/T5/T6.
- **Known simplification (documented):** camera focus + connection segments use ring-plane node positions (pre-rotation), not live-rotated world positions. Acceptable: rings rotate slowly and focus tween + lines remain visually coherent. Threading live world matrices is deferred (YAGNI) unless visual testing shows drift.
- **Reuse note:** `ProjectModal` not directly reused; DetailPanel covers all three kinds in one consistent overlay (simpler than mounting a separate modal). Recorded as intentional deviation from spec's "reuse ProjectModal" suggestion.
