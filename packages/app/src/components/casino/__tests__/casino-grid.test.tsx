import { render, screen } from '@testing-library/react';
import { MappedGameProps } from '@game-portal/types';

import { BrandConfigProps } from '@/lib/configs/brand';

import CasinoGameGrid from '../casino-grid';

const mockGames: MappedGameProps[] = [
  {
    id: 1,
    name: 'Big Boost',
    thumbnail: '/images/bigboost.png',
    slug: 'big-boost',
  },
  {
    id: 2,
    name: 'Lucky spins',
    thumbnail: '/images/luckyspins.png',
    slug: 'lucky-spins',
  },
];

const mockGameLobbyDisplay: BrandConfigProps['gameLobbyDisplay'] = {
  columns: 4,
  layout: 'grid',
};

describe('CasinoGameGrid Component', () => {
  it('renders the correct number of CasinoGameCard components', () => {
    render(
      <CasinoGameGrid
        games={mockGames}
        userMarket="en"
        gameLobbyDisplay={mockGameLobbyDisplay}
      />
    );

    const gameCards = screen.getAllByTestId('casino-game-card');
    expect(gameCards).toHaveLength(mockGames.length);
  });

  it('renders no CasinoGameCard when games array is empty', () => {
    render(
      <CasinoGameGrid
        games={[]}
        userMarket="en"
        gameLobbyDisplay={mockGameLobbyDisplay}
      />
    );

    expect(screen.queryByTestId('casino-game-card')).not.toBeInTheDocument();
  });
});
