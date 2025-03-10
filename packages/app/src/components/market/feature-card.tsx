import { cn } from '@/lib/utils';

type FeatureCardProps = {
  textColor: string;
  borderColor: string;
  icon: string;
  text: string;
};

const FeatureCard = ({
  textColor,
  borderColor,
  icon,
  text,
}: FeatureCardProps) => (
  <div className={cn('p-3 rounded-md border', textColor, borderColor)}>
    <span>{icon}</span>
    <span>{text}</span>
  </div>
);

export default FeatureCard;
