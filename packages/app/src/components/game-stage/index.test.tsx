import { render, screen } from '@testing-library/react';
import { MappedGameProps, UserDataWithoutPassword } from '@game-portal/types';

import { useGetUserData } from '@/hooks/useGetUserData';

import GameStage from '.';

jest.mock('@/hooks/useGetUserData');

const mockGame: MappedGameProps = {
  name: 'Big Baazi',
  thumbnail: '/big-baazi.jpg',
  id: 3,
  slug: 'big-baazi',
};

const mockUserData: UserDataWithoutPassword = {
  id: 3,
  email: 'peter1.mayaki@gaad.com',
  username: 'gaadmaiyaki2',
  registrationCountry: 'ca',
  firstName: 'Peter1',
  lastName: 'Maiyaki1',
};

describe('GameStage Component', () => {
  it('renders the game name and image', () => {
    (useGetUserData as jest.Mock).mockReturnValue(null);

    render(<GameStage game={mockGame} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      mockGame.name
    );
    expect(screen.getByRole('img', { name: mockGame.name })).toHaveAttribute(
      'src',
      mockGame.thumbnail
    );
  });

  it('shows "Play for Free" button when user is not authenticated', () => {
    (useGetUserData as jest.Mock).mockReturnValue(null);

    render(<GameStage game={mockGame} />);

    expect(
      screen.getByRole('button', { name: 'Play for Free' })
    ).toBeInTheDocument();
  });

  it('shows "Play for Real" button when user is authenticated', () => {
    (useGetUserData as jest.Mock).mockReturnValue(mockUserData);

    render(<GameStage game={mockGame} />);

    expect(
      screen.getByRole('button', { name: 'Play for Real' })
    ).toBeInTheDocument();
  });
});
