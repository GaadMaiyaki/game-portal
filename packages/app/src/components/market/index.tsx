'use client';

import { getMarketConfig } from '@/lib/utils/getMarketConfig';
import { useGetUserData } from '@/hooks/useGetUserData';

import MarketInfo from './market-info';
import FeatureList from './feature-list';
import AvailableBrands from './available-brands';

const Welcome = () => {
  const userData = useGetUserData();

  const marketConfigData = getMarketConfig(userData?.registrationCountry);

  if (!marketConfigData) return undefined;

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 bg-gray-900 text-white">
      <div className="max-w-4xl w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <MarketInfo
          title={marketConfigData?.title}
          description={marketConfigData?.description}
          flag={marketConfigData?.flag}
        />
        <FeatureList features={marketConfigData?.features} />
        <AvailableBrands brands={marketConfigData?.availableBrands} />
      </div>
    </section>
  );
};

export default Welcome;
