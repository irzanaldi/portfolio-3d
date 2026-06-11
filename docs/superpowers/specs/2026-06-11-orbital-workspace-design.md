# Orbital Workspace — Design Spec

Date: 2026-06-11
Project: portfolio-3d (Next 16, React 19, R3F 9, drei, postprocessing, framer-motion)

## Goal

An interactive 3D portfolio experience, distinct from a scroll-driven cinematic site (e.g. hubtown.co.in). Instead of passive scroll, the user explores a freely-orbitable 3D "workspace" where the portfolio data (skills, experience, projects) lives as objects orbiting a central node. Control is in the user's hands: drag to orbit, hover to highlight, click to focus and reveal detail.

## Scope

- New route `/orbital`. Existing portfolio at `/` is untouched (non-destructive). May be promoted to home later.
- Reuse existing data modules: `src/data/projects.ts`, `src/data/experience.ts`, `src/data/skills.ts`.
- Reuse existing UI where it fits: `ProjectModal`, `GlassCard`, `Badge`, `Button`.
- Reuse existing hooks: `useWebGL` (capability/fallback), optionally `useScrollProgress` (not needed here).

Out of scope: editing existing `/` portfolio, adding new portfolio data, backend, auth, CMS.

## Architecture

```
src/app/orbital/
  page.tsx                      # route entry; mounts OrbitalExperience (client)
src/components/orbital/
  OrbitalExperience.tsx         # top-level: Canvas + overlay UI + selection state
  OrbitalScene.tsx              # scene graph: center node + 3 rings + starfield + lights + postfx
  CenterNode.tsx                # glowing central "Irzan" node
  OrbitRing.tsx                 # one ring: positions N nodes on a tilted circle, auto-rotates
  OrbitNode.tsx                 # one interactive node (hover/click/glow/label)
  ConnectionLines.tsx           # lines linking active experience <-> its projects
  CameraRig.tsx                 # OrbitControls + tween-to-target on selection
  DetailPanel.tsx               # overlay (HTML, not in-canvas) showing selected item detail
  Loader.tsx                    # Suspense fallback
src/lib/orbital.ts              # pure helpers: build node lists from data, ring config, color map
```

State lives in `OrbitalExperience`:
- `selected: { kind: 'skill'|'experience'|'project', id: string } | null`
- `hovered: same shape | null`
- `autoRotate: boolean` (true until first user drag)

Selection drives: camera target (CameraRig), DetailPanel content, ConnectionLines visibility.

## Scene composition

- One fullscreen `<Canvas>` with `dpr={[1, 2]}`, `gl={{ antialias: true }}`, dark clear color, exponential fog for depth.
- Background: drei `<Stars>` starfield, subtle.
- Lighting: low ambient + 1-2 point lights tinted to the neon palette; emissive materials carry most of the glow.
- Center: `CenterNode` — emissive sphere/icosahedron + `<Html>` name label "Irzan Aldi Ananto".
- Three concentric `OrbitRing`s, increasing radius, each tilted on a different axis:
  - Inner ring: Skills — 5 category nodes (from `skillCategories`).
  - Middle ring: Experience — one node per `experiences` entry.
  - Outer ring: Projects — one node per `projects` entry.
- Each ring auto-rotates slowly via `useFrame` (delta-based, frame-rate independent), different angular speed per ring → parallax.

## Interaction

- Drag: orbit camera via drei `OrbitControls` (damping on, min/max polar + zoom distance clamped). First drag sets `autoRotate=false`.
- Hover node: scale up + intensify emissive + show `<Html>` label. Sets `hovered`.
- Click node: sets `selected`. CameraRig lerps camera + target toward the node over ~1s. DetailPanel slides in.
  - Project → render existing `ProjectModal` content (or DetailPanel embedding project fields).
  - Experience → company, role, period, bullets.
  - Skill → category + items list.
- Active experience: `ConnectionLines` draws lines to its `projectIds` project nodes (glowing).
- Empty-space click or panel close → `selected=null`, camera eases back to default, autoRotate resumes after idle.

## Performance & resilience

- `OrbitNode` meshes share geometry/material refs; use instancing if node count grows (current counts small, instancing optional but ring nodes of same kind share material).
- `<Suspense>` boundary with `Loader` fallback.
- Postprocessing: `@react-three/postprocessing` Bloom for glow, kept subtle (low intensity, luminanceThreshold tuned). Vignette optional.
- Mobile / no-WebGL: `useWebGL` gate. If unsupported, render a static 2D fallback (reuse existing portfolio sections or a simple list linking to `/`).
- `prefers-reduced-motion`: disable auto-rotate and camera tweens (snap instead of lerp).

## Aesthetics

- Theme: deep-space near-black background (`#05060a`), neon cyan (`#22d3ee`) + magenta (`#e879f9`) accents, color-coded by ring kind (skills/experience/projects each get a hue).
- CSS variables for palette in a scoped stylesheet or `globals.css` additions (namespaced to avoid clobbering existing styles).
- Display font: a distinctive non-generic font (NOT Inter/Roboto/Arial) for the name + headings; clean readable body font for panels. Loaded via `next/font`.
- Subtle grain overlay + faint radial vignette on the overlay layer.

## Testing

- Unit-test pure helpers in `src/lib/orbital.ts` (Jest, matching existing `__tests__/data` style): node-list construction from data, ring assignment, color mapping, connection resolution (experience.projectIds → existing project nodes).
- 3D/Canvas rendering itself is not unit-tested (consistent with current repo, which tests data not Three scenes); manual visual verification via dev server.

## Success criteria

- `/orbital` loads, shows center node + 3 populated rings from real data.
- Drag orbits the camera; rings auto-rotate until first interaction.
- Hover highlights + labels; click focuses camera and opens detail panel for all three node kinds.
- Active experience visually links to its projects.
- Graceful fallback when WebGL unavailable and when reduced-motion is set.
- `npm run build` passes; helper unit tests pass.
