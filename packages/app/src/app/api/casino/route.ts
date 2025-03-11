import { promises as fs } from 'fs';
import path from 'path';

import { GameProps } from '@game-portal/types';
import { PAGE_SIZE } from '@game-portal/constants';

import { handleApiResponse } from '@/lib/utils/http-util';

const DEFAULT_PAGE = 1;

//TODO: implement query param to get casino games relative to a brand
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || DEFAULT_PAGE;
    const limit = Number(searchParams.get('limit')) || PAGE_SIZE;

    const filePath = path.join(process.cwd(), 'src/data/games.json');
    const gamesFileData = await fs.readFile(filePath, 'utf-8');
    const gamesData = JSON.parse(gamesFileData) as GameProps[];

    const totalPages = Math.ceil(gamesData.length / limit);

    if (page < 1 || page > totalPages) {
      return handleApiResponse(400, { error: 'Invalid page number' });
    }

    const startIndex = (page - 1) * limit;
    const paginatedGames = gamesData.slice(startIndex, startIndex + limit);

    return handleApiResponse(200, {
      games: paginatedGames?.map(({ id, meta, name, slug }) => ({
        id,
        thumbnail: meta.thumbnail.src,
        name,
        slug,
      })),
      nextPage: page < totalPages ? page + 1 : null,
      totalPages,
    });
  } catch (error) {
    return handleApiResponse(500, {
      error: 'An error occurred while fetching games',
    });
  }
}
