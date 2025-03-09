type FeatureCardProps = {
  color: string;
  icon: string;
  text: string;
};

const FeatureCard = ({ color, icon, text }: FeatureCardProps) => (
  <div
    className={`p-3 bg-${color}-700/20 rounded-md border border-${color}-500 text-${color}-400`}
  >
    {icon} {text}
  </div>
);

export default FeatureCard;
