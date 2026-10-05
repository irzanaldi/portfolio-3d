// portfolio-3d/src/lib/media.ts
import type { Project } from '@/data/projects';

export type Media =
  | { kind: 'embed'; url: string }
  | { kind: 'video'; url: string }
  | { kind: 'gallery'; images: string[] }
  | { kind: 'none' };

/** Hero-media precedence for a project detail page: embed > video > gallery > none. */
export function pickMedia(p: Project): Media {
  if (p.embedUrl) return { kind: 'embed', url: p.embedUrl };
  if (p.video) return { kind: 'video', url: p.video };
  if (p.images?.length) return { kind: 'gallery', images: p.images };
  return { kind: 'none' };
}
