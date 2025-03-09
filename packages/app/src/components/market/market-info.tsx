import Image from 'next/image';

interface MarketInfoProps {
  title: string;
  description: string;
  flag: string;
}

const MarketInfo = ({ title, description, flag }: MarketInfoProps) => (
  <div className="flex items-center gap-4">
    <Image
      src={flag}
      alt="Market Flag"
      width={50}
      height={50}
      className="rounded-full w-[50px] h-[50px]"
    />
    <div className="text-left">
      <h1 className="text-3xl font-extrabold text-white">{title}</h1>
      <p className="mt-2 text-gray-300">{description}</p>
    </div>
  </div>
);

export default MarketInfo;
