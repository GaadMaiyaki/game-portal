import { MappedGameProps, Market } from '@game-portal/types';

import CasinoGameCard from './casino-card';

const CasinoGameGrid = ({
  games,
  userMarket,
}: {
  games: MappedGameProps[];
  userMarket: Market | undefined;
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-4">
      {games.map((game) => (
        <CasinoGameCard key={game.id} {...game} userMarket={userMarket} />
      ))}
    </div>
  );
};

export default CasinoGameGrid;
