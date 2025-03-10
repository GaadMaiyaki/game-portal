import { render, screen } from '@testing-library/react';
import { MappedGameProps } from '@game-portal/types';

import { gridStyleData } from '@/lib/configs/grid';

import CasinoGameCard from '../casino-card';

const mockGame: MappedGameProps = {
  id: 1,
  name: 'Big Boost',
  thumbnail: '/images/bigboost.png',
  slug: 'big-boost',
};

describe('CasinoGameCard Component', () => {
  it('renders the game card with the correct image, alt text, and link URL', () => {
    render(<CasinoGameCard game={mockGame} userMarket="en" gridColumn={3} />);

    const image = screen.getByRole('img', { name: mockGame.name });
    expect(image).toHaveAttribute('alt', mockGame.name);
    expect(image.getAttribute('src')).toContain(mockGame.thumbnail);

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/en/casino/big-boost'
    );
  });

  it('applies correct grid styling', () => {
    render(<CasinoGameCard game={mockGame} userMarket="en" gridColumn={3} />);

    const gameCard = screen.getByRole('link').closest('div');
    expect(gameCard).toHaveClass(gridStyleData[3]);
  });

  it('does not display link element if user market is not provided', () => {
    render(
      <CasinoGameCard game={mockGame} userMarket={undefined} gridColumn={3} />
    );

    const link = screen.queryByRole('link');
    expect(link).not.toBeInTheDocument();
  });

  it('falls back to default grid styling when gridColumn is invalid', () => {
    render(<CasinoGameCard game={mockGame} userMarket="en" gridColumn={-1} />);

    const gameCard = screen.getByRole('link').closest('div');
    expect(gameCard).toHaveClass(
      'col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4'
    );
  });
});
