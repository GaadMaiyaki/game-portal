import { API_ENDPOINTS } from '@game-portal/constants';
import { UserDataWithoutPassword } from '@game-portal/types/dist';

import HTTPService from '../http-service';
import { ProfileDataProps } from '../schemas/profile';

export const updateUserProfile = async (data: ProfileDataProps) => {
  return await HTTPService.put<UserDataWithoutPassword>(
    API_ENDPOINTS.UPDATE_PROFILE,
    data
  );
};
