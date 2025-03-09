import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { BrandConfigProps } from '@/lib/configs/brand';

import { RootState } from '../..';

export type BrandConfigSliceState = {
  brandConfigData: BrandConfigProps | undefined;
};

const initialState: BrandConfigSliceState = {
  brandConfigData: undefined,
};

export const brandConfigSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setBrandConfigData: (
      state,
      action: PayloadAction<BrandConfigProps | undefined>
    ) => {
      state.brandConfigData = action.payload;
    },
  },
});

export const { setBrandConfigData } = brandConfigSlice.actions;
export const brandConfigReducer = brandConfigSlice.reducer;

export const selectBrandConfigData = (state: RootState) =>
  state.brand.brandConfigData;
