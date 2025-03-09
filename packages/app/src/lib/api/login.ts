import { API_ENDPOINTS } from '@game-portal/constants';
import { UserDataWithoutPassword } from '@game-portal/types';

import HTTPService from '../http-service';
import { LoginDataProps } from '../schemas/login';

export const loginUser = async (data: LoginDataProps) => {
  return await HTTPService.post<UserDataWithoutPassword>(API_ENDPOINTS.LOGIN, data);
};
