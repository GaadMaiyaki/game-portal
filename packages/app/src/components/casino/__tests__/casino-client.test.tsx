import { render, screen, waitFor } from '@testing-library/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { GameResponseProps, UserDataWithoutPassword } from '@game-portal/types';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useGetUserData } from '@/hooks/useGetUserData';
import { getBrandConfigFromEnv } from '@/lib/helpers/getBrandConfigFromEnv';
import { BrandConfigProps } from '@/lib/configs/brand';

import CasinoClient from '../casino-client';

jest.mock('@tanstack/react-query', () => ({
  useInfiniteQuery: jest.fn(),
}));

jest.mock('@/hooks/useIntersectionObserver', () => ({
  useIntersectionObserver: jest.fn(),
}));

jest.mock('@/hooks/useGetUserData', () => ({
  useGetUserData: jest.fn(),
}));

jest.mock('@/lib/helpers/getBrandConfigFromEnv', () => ({
  getBrandConfigFromEnv: jest.fn(),
}));

const mockUserData: UserDataWithoutPassword = {
  id: 1,
  email: 'peter.mayaki@gaad.com',
  username: 'gaadmaiyaki',
  registrationCountry: 'en',
  firstName: 'Peter',
  lastName: 'Maiyaki',
};

const mockBrandConfig = {
  brandName: 'Casino Days',
  theme: 'dark',
  description: 'Casino Days is built for all!',
  menu: {
    position: 'left',
    items: [
      { label: 'Big Baazi', path: '/big-baazi' },
      { label: 'Lucky Spins', path: '/lucky-spin' },
      { label: 'Big Boost', path: '/big-boost' },
    ],
  },
  gameLobbyDisplay: {
    layout: 'grid',
    columns: 3,
  },
  footer: {
    text: '© 2025 Casino Days. All rights reserved.',
  },
  logo: {
    src: '/assets/casino-days.png',
    alt: 'Casino Days logo',
  },
  markets: {
    en: {
      title: 'Hey English! Hello there!',
      description: 'Casino Days is built for all!',
      flag: 'https://flagcdn.com/w320/gb.png',
      features: {
        newUserBonus: true,
        earlyAccess: false,
        premiumSupport: true,
      },
    },
    ca: {
      title: 'Hey Canada! Hello there!',
      description: 'Casino Days is built for all!',
      flag: 'https://flagcdn.com/w320/ca.png',
      features: {
        newUserBonus: true,
        earlyAccess: true,
        premiumSupport: false,
      },
    },
  },
};

const mockInitialData: GameResponseProps = {
  totalPages: 2,
  games: [
    {
      id: 1,
      name: 'Lucky Spins',
      slug: 'lucky-spin',
      thumbnail: '/lucky-spin.png',
    },
    {
      id: 2,
      name: 'Big Boost',
      slug: 'big-boost',
      thumbnail: '/big-boost.png',
    },
  ],
  nextPage: 2,
};

describe('CasinoClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders casino games when data is available', async () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: { pages: [mockInitialData] },
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    (useIntersectionObserver as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });

    (useGetUserData as jest.Mock).mockReturnValue(
      mockUserData as UserDataWithoutPassword
    );

    (getBrandConfigFromEnv as jest.Mock).mockReturnValue(
      mockBrandConfig as BrandConfigProps
    );

    render(<CasinoClient initialData={mockInitialData} />);

    expect(screen.getByText(/Casino Games/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Lucky Spins/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Big Boost/i)).toBeInTheDocument();
  });

  it('fetches next page when inView is True and hasNextPage is available', async () => {
    const mockFetchNextPage = jest.fn();

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: { pages: [mockInitialData] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    (useIntersectionObserver as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: true,
    });

    (useGetUserData as jest.Mock).mockReturnValue(
      mockUserData as UserDataWithoutPassword
    );

    (getBrandConfigFromEnv as jest.Mock).mockReturnValue(
      mockBrandConfig as BrandConfigProps
    );

    render(<CasinoClient initialData={mockInitialData} />);

    await waitFor(() => {
      expect(mockFetchNextPage).toHaveBeenCalled();
    });
  });

  it('does not fetch next page when either inView is False and hasNextPage is True', async () => {
    const mockFetchNextPage = jest.fn();

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: { pages: [] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    (useIntersectionObserver as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });

    (useGetUserData as jest.Mock).mockReturnValue(
      mockUserData as UserDataWithoutPassword
    );

    (getBrandConfigFromEnv as jest.Mock).mockReturnValue(
      mockBrandConfig as BrandConfigProps
    );

    render(<CasinoClient initialData={mockInitialData} />);

    await waitFor(() => {
      expect(mockFetchNextPage).not.toHaveBeenCalled();
    });
  });

  it('does not fetch next page when either inView is True and hasNextPage is False', async () => {
    const mockFetchNextPage = jest.fn();

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: { pages: [] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    (useIntersectionObserver as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: true,
    });

    (useGetUserData as jest.Mock).mockReturnValue(
      mockUserData as UserDataWithoutPassword
    );

    (getBrandConfigFromEnv as jest.Mock).mockReturnValue(
      mockBrandConfig as BrandConfigProps
    );

    render(<CasinoClient initialData={mockInitialData} />);

    await waitFor(() => {
      expect(mockFetchNextPage).not.toHaveBeenCalled();
    });
  });

  it('does not render if brandConfigData or userData is missing', () => {
    (useGetUserData as jest.Mock).mockReturnValue(null);

    (getBrandConfigFromEnv as jest.Mock).mockReturnValue(null);

    const { container } = render(
      <CasinoClient initialData={mockInitialData} />
    );

    expect(container.firstChild).toBeNull();
  });
});
