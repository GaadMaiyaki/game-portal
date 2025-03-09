import { useAppSelector } from '@/lib/store';
import { selectUserData } from '@/lib/store/features/auth/auth-slice';

export const useGetUserData = () => {
  const userData = useAppSelector(selectUserData);

  return userData;
};
