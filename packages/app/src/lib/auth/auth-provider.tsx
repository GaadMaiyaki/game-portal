'use client';

import { useRef } from 'react';
import { UserDataWithoutPassword } from '@game-portal/types/dist';

import { useAppDispatch } from '../store';
import { setUserData } from '../store/features/auth/auth-slice';

type AuthProviderProps = {
  children: React.ReactNode;
  userData: UserDataWithoutPassword | undefined;
};
const AuthProvider = ({ children, userData }: AuthProviderProps) => {
  const dispatch = useAppDispatch();

  const initialized = useRef(false);

  if (!initialized.current) {
    dispatch(setUserData(userData));
    initialized.current = true;
  }
  return <>{children}</>;
};

export default AuthProvider;
