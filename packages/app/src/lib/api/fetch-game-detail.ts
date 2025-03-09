import { MappedGameProps } from '@game-portal/types';
import { API_ENDPOINTS } from '@game-portal/constants';

import HTTPService from '../http-service';

export const fetchGameDetails = async (slug: string) =>
  await HTTPService.get<MappedGameProps>(`${API_ENDPOINTS.CASINO}/${slug}`);
