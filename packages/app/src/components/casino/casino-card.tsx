import { MappedGameProps, Market } from '@game-portal/types';
import Image from 'next/image';
import Link from 'next/link';

const CasinoGameCard = ({
  id,
  name,
  thumbnail,
  userMarket,
  slug,
}: MappedGameProps & { userMarket: Market | undefined }) => {
  return (
    <div key={id} className="p-2 rounded-md shadow  cursor-pointer">
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
