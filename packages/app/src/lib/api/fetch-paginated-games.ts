import { GameResponseProps } from '@game-portal/types';
import { PAGE_SIZE } from '@game-portal/constants';

import HTTPService from '../http-service';

export const fetchPaginatedGames = async ({
  pageParam = 1,
}: {
  pageParam: unknown;
}) =>
  await HTTPService.get<GameResponseProps>(
    `/casino?page=${pageParam}&limit=${PAGE_SIZE}`
  );
