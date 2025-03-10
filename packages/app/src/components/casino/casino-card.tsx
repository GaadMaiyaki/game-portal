import { MappedGameProps, Market } from '@game-portal/types';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { gridStyleData, GridValues } from '@/lib/configs/grid';

const CasinoGameCard = ({
  id,
  name,
  thumbnail,
  userMarket,
  slug,
  gridColumn,
}: MappedGameProps & {
  userMarket: Market | undefined;
  gridColumn: number;
}) => {
  const gridStyle = gridStyleData[gridColumn as GridValues];
  return (
    <div
      key={id}
      className={cn(
        'p-2 rounded-md shadow  cursor-pointer',
        'col-span-12 sm:col-span-6 md:col-span-4',
        gridStyle
      )}
    >
      <Link href={`/${userMarket}/casino/${slug}`}>
        <Image
          height={100}
          width={100}
          src={thumbnail}
          alt={name}
          className="h-[100%] w-[100%]  rounded-md"
        />
      </Link>
    </div>
  );
};

export default CasinoGameCard;
