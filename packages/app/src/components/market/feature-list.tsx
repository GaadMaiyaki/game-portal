import { MarketFeaturesProps } from '@/lib/configs/brand';

import FeatureCard from './feature-card';

type FeatureListProps = {
  features: MarketFeaturesProps;
};

const FeatureList = ({ features }: FeatureListProps) => (
  <div className="mt-4 space-y-2">
    {features.newUserBonus && (
      <FeatureCard
        textColor="text-gameportal-primary-text"
        borderColor="border-gameportal-border"
        icon="🎉"
        text="New User Bonus Enabled!"
      />
    )}
    {features.earlyAccess && (
      <FeatureCard
        textColor="text-gameportal-primary-text"
        borderColor="border-gameportal-border"
        icon="🚀"
        text="Early Access Available!"
      />
    )}
    <FeatureCard
      textColor="text-gameportal-primary-text"
      borderColor="border-gameportal-border"
      icon={features.premiumSupport ? '🛠️' : '⚠️'}
      text={
        features.premiumSupport
          ? 'Premium Customer Support!'
          : 'Standard Support'
      }
    />
  </div>
);

export default FeatureList;
