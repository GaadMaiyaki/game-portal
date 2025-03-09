import { promises as fs } from 'fs';
import path from 'path';

import { GameProps } from '@game-portal/types';

import { handleApiResponse } from '@/lib/utils/http-util';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const filePath = path.join(process.cwd(), 'src/data/games.json');
    const gamesFileData = await fs.readFile(filePath, 'utf-8');
    const gamesData = JSON.parse(gamesFileData) as GameProps[];

    const game = gamesData.find((g) => g.slug === slug);

    if (!game) {
      return handleApiResponse(404, { error: 'Game not found' });
    }

    return handleApiResponse(200, {
      id: game.id,
      name: game.name,
      slug: game.slug,
      thumbnail: game.meta.thumbnail.src,
    });
  } catch (error) {
    return handleApiResponse(500, { error: 'Internal server error' });
  }
}
