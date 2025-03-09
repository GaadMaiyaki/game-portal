import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserDataWithoutPassword } from '@game-portal/types';

import { RootState } from '../..';

export type AuthSliceState = {
  userData: UserDataWithoutPassword | undefined;
};

const initialState: AuthSliceState = {
  userData: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<UserDataWithoutPassword | undefined>
    ) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectUserData = (state: RootState) => state.auth.userData;
