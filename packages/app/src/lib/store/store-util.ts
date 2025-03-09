'use client';

import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { authReducer } from './features/auth/auth-slice';
import { brandConfigReducer } from './features/brand-config/brand-config-slice';

const rootReducer = combineSlices({
  auth: authReducer,
  brand: brandConfigReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore['dispatch'];
