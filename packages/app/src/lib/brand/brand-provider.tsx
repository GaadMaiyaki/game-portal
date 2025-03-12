'use client';

import { useEffect } from 'react';

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

  useEffect(() => {
    dispatch(setBrandConfigData(brandConfigData));
  }, [dispatch, brandConfigData]);

  return <>{children}</>;
};

export default BrandConfigProvider;
