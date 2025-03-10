import { MappedGameProps, Market } from '@game-portal/types';

import { cn } from '@/lib/utils';
import { BrandConfigProps } from '@/lib/configs/brand';

import CasinoGameCard from './casino-card';

const CasinoGameGrid = ({
  games,
  userMarket,
  gameLobbyDisplay,
}: {
  games: MappedGameProps[];
  userMarket: Market | undefined;
  gameLobbyDisplay: BrandConfigProps['gameLobbyDisplay'];
}) => {
  return (
    <div
      // TODO: implement layouts other than 'grid'. Default = grid for now
      className={cn('grid grid-cols-12 gap-2 p-4 bg-gameportal-background')}
    >
      {games.map((game) => (
        <CasinoGameCard
          key={game.id}
          game={game}
          userMarket={userMarket}
          gridColumn={gameLobbyDisplay.columns}
        />
      ))}
    </div>
  );
};

export default CasinoGameGrid;
