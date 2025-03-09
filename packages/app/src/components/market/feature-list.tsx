import { MarketConfigProps } from '@game-portal/types/dist';

import FeatureCard from './feature-card';

type FeatureListProps = {
  features: MarketConfigProps['features'];
};

const FeatureList = ({ features }: FeatureListProps) => (
  <div className="mt-4 space-y-2">
    {features.newUserBonus && (
      <FeatureCard color="green" icon="🎉" text="New User Bonus Enabled!" />
    )}
    {features.earlyAccess && (
      <FeatureCard color="blue" icon="🚀" text="Early Access Available!" />
    )}
    <FeatureCard
      color={features.premiumSupport ? 'yellow' : 'gray'}
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
