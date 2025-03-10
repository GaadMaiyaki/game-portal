import { MappedGameProps, Market } from '@game-portal/types';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { gridStyleData, GridValues } from '@/lib/configs/grid';

const CasinoGameCard = ({
  game,
  userMarket,
  gridColumn,
}: {
  game: MappedGameProps;
  userMarket: Market | undefined;
  gridColumn: number;
}) => {
  const { id, name, slug, thumbnail } = game;

  const gridStyle =
    gridStyleData[gridColumn as GridValues] ||
    'lg:col-span-4 xl:col-span-4 2xl:col-span-4';
  return (
    <div
      key={id}
      data-testid="casino-game-card"
      className={cn(
        'p-2 rounded-md shadow  cursor-pointer',
        'col-span-12 sm:col-span-6 md:col-span-4',
        gridStyle
      )}
    >
      {userMarket && (
        <Link href={`/${userMarket}/casino/${slug}`}>
          <Image
            quality={100}
            unoptimized
            height={100}
            width={100}
            src={thumbnail}
            alt={name}
            className="h-[100%] w-[100%]  rounded-md"
          />
        </Link>
      )}
    </div>
  );
};

export default CasinoGameCard;
