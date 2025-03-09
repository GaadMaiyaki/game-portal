import { GameResponseProps } from '@game-portal/types';
import { API_ENDPOINTS } from '@game-portal/constants';

import HTTPService from '../http-service';

export const fetchGames = async () =>
  await HTTPService.get<GameResponseProps>(API_ENDPOINTS.CASINO);
