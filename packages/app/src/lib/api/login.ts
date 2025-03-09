import { API_ENDPOINTS } from '@game-portal/constants';
import { UserData } from '@game-portal/types';

import HTTPService from '../http-service';
import { LoginDataProps } from '../schemas/login';

type LoginResponse = Omit<UserData, 'password'>;

export const loginUser = async (data: LoginDataProps) => {
  return await HTTPService.post<LoginResponse>(API_ENDPOINTS.LOGIN, data);
};
