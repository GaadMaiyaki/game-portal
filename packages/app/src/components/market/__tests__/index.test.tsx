import { screen } from '@testing-library/react';
import { UserDataWithoutPassword } from '@game-portal/types';

import { renderWithProviders } from '@/lib/utils/test-utils';

import Welcome from '..';

global.window.matchMedia = jest.fn().mockImplementation(() => ({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

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

const mockUserData: UserDataWithoutPassword = {
  id: 3,
  email: 'peter.mayaki@gaad.com',
  username: 'gaadmaiyaki',
  registrationCountry: 'en',
  firstName: 'Peter',
  lastName: 'Maiyaki',
};

describe('Welcome Component', () => {
  it('renders the correct title and description for EN market', () => {
    renderWithProviders(<Welcome />, {
      preloadedState: {
        brand: { brandConfigData: mockBrandConfig },
        auth: { userData: mockUserData },
      },
    });

    expect(
      screen.getByRole('heading', { name: mockBrandConfig.markets.en.title })
    ).toBeInTheDocument();

    expect(
      screen.getByText(mockBrandConfig.markets.en.description)
    ).toBeInTheDocument();

    const image = screen.getByRole('img', { name: /market flag/i });
    expect(image).toHaveAttribute('alt', 'Market Flag');
    expect(image.getAttribute('src')).toContain(
      encodeURIComponent(mockBrandConfig.markets.en.flag)
    );
  });

  it('renders the correct title and description for CA market', () => {
    renderWithProviders(<Welcome />, {
      preloadedState: {
        brand: { brandConfigData: mockBrandConfig },
        auth: { userData: { ...mockUserData, registrationCountry: 'ca' } },
      },
    });

    expect(
      screen.getByRole('heading', { name: mockBrandConfig.markets.ca.title })
    ).toBeInTheDocument();

    expect(
      screen.getByText(mockBrandConfig.markets.ca.description)
    ).toBeInTheDocument();

    const image = screen.getByRole('img', { name: /market flag/i });
    expect(image).toHaveAttribute('alt', 'Market Flag');
    expect(image.getAttribute('src')).toContain(
      encodeURIComponent(mockBrandConfig.markets.ca.flag)
    );
  });

  it('should not render title if user market is unknown', () => {
    renderWithProviders(<Welcome />, {
      preloadedState: {
        brand: { brandConfigData: undefined },
        auth: { userData: mockUserData },
      },
    });

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('renders the feature list for EN market', () => {
    renderWithProviders(<Welcome />, {
      preloadedState: {
        brand: { brandConfigData: mockBrandConfig },
        auth: { userData: mockUserData },
      },
    });

    const features = mockBrandConfig.markets.en.features;

    if (features.newUserBonus) {
      expect(screen.getByText(/new user bonus/i)).toBeInTheDocument();
    }
    if (features.earlyAccess) {
      expect(screen.getByText(/early access/i)).toBeInTheDocument();
    }
    if (features.premiumSupport) {
      expect(screen.getByText(/premium customer support/i)).toBeInTheDocument();
    }
  });

  it('renders the feature list for CA market', () => {
    renderWithProviders(<Welcome />, {
      preloadedState: {
        brand: { brandConfigData: mockBrandConfig },
        auth: { userData: { ...mockUserData, registrationCountry: 'ca' } },
      },
    });

    const features = mockBrandConfig.markets.ca.features;

    if (features.newUserBonus) {
      expect(screen.getByText(/new user bonus/i)).toBeInTheDocument();
    }
    if (features.earlyAccess) {
      expect(screen.getByText(/early access/i)).toBeInTheDocument();
    }
    if (features.premiumSupport) {
      expect(screen.getByText(/premium customer support/i)).toBeInTheDocument();
    }
  });
});
