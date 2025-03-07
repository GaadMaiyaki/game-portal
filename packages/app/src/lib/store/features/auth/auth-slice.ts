import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type AuthSliceState = {
  userData: Record<string, string> | undefined;
};

const initialState: AuthSliceState = {
  userData: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Record<string, string>>) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = authSlice.actions;
export const authReducer = authSlice.reducer;
