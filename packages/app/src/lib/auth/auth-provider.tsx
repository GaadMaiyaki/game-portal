'use client';

import { useEffect } from 'react';
import { UserDataWithoutPassword } from '@game-portal/types/dist';

import { useAppDispatch } from '../store';
import { setUserData } from '../store/features/auth/auth-slice';

type AuthProviderProps = {
  children: React.ReactNode;
  userData: UserDataWithoutPassword | undefined;
};
const AuthProvider = ({ children, userData }: AuthProviderProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUserData(userData));
  }, [dispatch, userData]);

  return <>{children}</>;
};

export default AuthProvider;
