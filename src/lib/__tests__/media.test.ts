import { pickMedia } from '@/lib/media';

test('embed > video > gallery > none', () => {
  expect(pickMedia({ embedUrl: 'e', video: 'v', images: ['i'] } as any).kind).toBe('embed');
  expect(pickMedia({ video: 'v', images: ['i'] } as any).kind).toBe('video');
  expect(pickMedia({ images: ['i'] } as any).kind).toBe('gallery');
  expect(pickMedia({ images: [] } as any).kind).toBe('none');
});
