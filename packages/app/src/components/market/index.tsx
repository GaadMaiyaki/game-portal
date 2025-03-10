'use client';

import { useGetUserData } from '@/hooks/useGetUserData';
import { useAppSelector } from '@/lib/store';
import { selectBrandConfigData } from '@/lib/store/features/brand-config/brand-config-slice';

import MarketInfo from './market-info';
import FeatureList from './feature-list';

const Welcome = () => {
  const userData = useGetUserData();

  const brandConfigData = useAppSelector(selectBrandConfigData);

  if (!userData) return undefined;

  const marketConfigData =
    brandConfigData?.markets[userData?.registrationCountry];

  if (!marketConfigData) return undefined;

  return (
    <section className="h-[82vh] flex flex-col justify-center items-center px-6 bg-gameportal-background text-white">
      <div className="max-w-4xl w-full bg-gameportal-background border border-gameportal-border p-8 rounded-lg shadow-lg">
        <MarketInfo
          title={marketConfigData?.title}
          description={marketConfigData?.description}
          flag={marketConfigData?.flag}
        />
        <FeatureList features={marketConfigData?.features} />
      </div>
    </section>
  );
};

export default Welcome;
