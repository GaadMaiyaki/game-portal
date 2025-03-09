'use client';

import { useRef } from 'react';

import { useAppDispatch } from '../store';
import { BrandConfigProps } from '../configs/brand';
import { setBrandConfigData } from '../store/features/brand-config/brand-config-slice';

type BrandConfigProviderProps = {
  children: React.ReactNode;
  brandConfigData: BrandConfigProps;
};
const BrandConfigProvider = ({
  children,
  brandConfigData,
}: BrandConfigProviderProps) => {
  const dispatch = useAppDispatch();

  const initialized = useRef(false);

  if (!initialized.current) {
    dispatch(setBrandConfigData(brandConfigData));
    initialized.current = true;
  }
  return <>{children}</>;
};

export default BrandConfigProvider;
