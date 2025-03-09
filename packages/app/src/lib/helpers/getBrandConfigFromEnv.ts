import { BRAND_CONFIG } from './../configs/brand';

export const getBrandConfigFromEnv = () => {
  const brandName = process.env.NEXT_PUBLIC_BRAND as keyof typeof BRAND_CONFIG;

  if (!brandName || !BRAND_CONFIG[brandName]) {
    throw new Error('Invalid or missing brand configuration');
  }

  return BRAND_CONFIG[brandName];
};
