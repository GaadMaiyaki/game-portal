import { API_ENDPOINTS } from '@game-portal/constants';

import HTTPService from '../http-service';

export const logOutUser = async () => {
  return await HTTPService.post<unknown>(API_ENDPOINTS.LOGOUT, {});
};
