import { generateStaticParams } from '@/app/projects/[id]/page';
import { projects } from '@/data/projects';

test('generateStaticParams covers every project id', async () => {
  const params = await generateStaticParams();
  expect(params.map((p: { id: string }) => p.id).sort()).toEqual(projects.map((p) => p.id).sort());
});
