import { fireEvent, screen } from '@testing-library/react';
import { UserDataWithoutPassword } from '@game-portal/types';

import { renderWithProviders } from '@/lib/utils/test-utils';

import UserProfile from '..';

global.window.matchMedia = jest.fn().mockImplementation(() => ({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

const mockUserData: UserDataWithoutPassword = {
  id: 3,
  email: 'peter.mayaki@gaad.com',
  username: 'gaadmaiyaki',
  registrationCountry: 'en',
  firstName: 'Peter',
  lastName: 'Maiyaki',
};

describe('UserProfile', () => {
  it('should render ProfileDetail initially', () => {
    renderWithProviders(<UserProfile />, {
      preloadedState: {
        auth: { userData: mockUserData },
      },
    });

    expect(screen.getByText('Profile')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /edit profile/i })
    ).toBeInTheDocument();
  });

  it('should switch to UserProfileForm when edit button is clicked', () => {
    renderWithProviders(<UserProfile />, {
      preloadedState: {
        auth: { userData: mockUserData },
      },
    });

    fireEvent.click(screen.getByRole('button', { name: /edit profile/i }));

    expect(
      screen.getByPlaceholderText('Enter your First Name')
    ).toBeInTheDocument();
  });

  it('should return nothing when no user data exists', () => {
    renderWithProviders(<UserProfile />, {
      preloadedState: {
        auth: { userData: undefined },
      },
    });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByText(/Profile/i)).not.toBeInTheDocument();
  });
});
