import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { UserDataWithoutPassword } from '@game-portal/types';

import { useGetUserData } from '@/hooks/useGetUserData';

import Navbar from './navbar';

const mockRouterPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

const mockOnSuccess = jest.fn();
let onSuccessCallback = jest.fn();

const mockMutateSuccessFn = jest.fn().mockImplementation(() => {
  onSuccessCallback?.(mockUserData);
});

jest.mock('@tanstack/react-query', () => {
  const actual = jest.requireActual('@tanstack/react-query');
  return {
    ...actual,
    useMutation: ({ onSuccess }: { onSuccess: typeof mockOnSuccess }) => {
      onSuccessCallback = onSuccess;
      return {
        mutate: () => {
          return mockMutateSuccessFn();
        },
        isPending: false,
        isError: false,
        onSuccess: mockOnSuccess,
      };
    },
  };
});

jest.mock('@/hooks/useGetUserData');

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
  email: 'peter1.mayaki@gaad.com',
  username: 'gaadmaiyaki2',
  registrationCountry: 'ca',
  firstName: 'Peter1',
  lastName: 'Maiyaki1',
};

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Navbar with brand name', () => {
    (useGetUserData as jest.Mock).mockReturnValue(null);
    render(<Navbar brandConfigData={mockBrandConfig} />);
    expect(screen.getByText(mockBrandConfig.brandName)).toBeInTheDocument();
  });

  it('renders Navbar menu item(s) correctly for authenticated users', () => {
    (useGetUserData as jest.Mock).mockReturnValue(mockUserData);
    render(<Navbar brandConfigData={mockBrandConfig} />);

    mockBrandConfig.menu.items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it('does not render Navbar menu item(s) for unauthenticated users', () => {
    (useGetUserData as jest.Mock).mockReturnValue(null);
    render(<Navbar brandConfigData={mockBrandConfig} />);

    mockBrandConfig.menu.items.forEach((item) => {
      expect(screen.queryByText(item.label)).not.toBeInTheDocument();
    });
  });

  it('renders login link when user is not authenticated', () => {
    (useGetUserData as jest.Mock).mockReturnValue(null);
    render(<Navbar brandConfigData={mockBrandConfig} />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders user avatar and logout button when user is authenticated', () => {
    (useGetUserData as jest.Mock).mockReturnValue(mockUserData);
    render(<Navbar brandConfigData={mockBrandConfig} />);

    fireEvent.click(screen.getByText('PM'));
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls logOutUser mutation on logout', async () => {
    (useGetUserData as jest.Mock).mockReturnValue(mockUserData);
    render(<Navbar brandConfigData={mockBrandConfig} />);

    fireEvent.click(screen.getByText('PM'));
    fireEvent.click(screen.getByText('Logout'));

    await waitFor(() => expect(mockMutateSuccessFn).toHaveBeenCalled());
  });
});
