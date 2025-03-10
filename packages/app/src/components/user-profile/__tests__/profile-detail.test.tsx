import { fireEvent, render, screen } from '@testing-library/react';
import { UserDataWithoutPassword } from '@game-portal/types';

import ProfileDetail from '../profile-detail';

const mockHandleToggleEditState = jest.fn();

const mockUserData: UserDataWithoutPassword = {
  id: 1,
  username: 'adebayo01',
  email: 'adebayo@example.com',
  firstName: 'Adebayo',
  lastName: 'Oluwaseun',
  registrationCountry: 'en',
};

describe('ProfileDetail Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders ProfileDetail component correctly', () => {
    render(
      <ProfileDetail
        handleToggleEditState={mockHandleToggleEditState}
        userData={mockUserData}
      />
    );

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Username:')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('First Name:')).toBeInTheDocument();
    expect(screen.getByText('Last Name:')).toBeInTheDocument();
    expect(screen.getByText('Country:')).toBeInTheDocument();
  });

  it('displays correct user data', () => {
    render(
      <ProfileDetail
        handleToggleEditState={mockHandleToggleEditState}
        userData={mockUserData}
      />
    );

    expect(screen.getByText(mockUserData.lastName)).toBeInTheDocument();
    expect(screen.getByText(mockUserData.firstName)).toBeInTheDocument();
    expect(
      screen.getByText(mockUserData.registrationCountry)
    ).toBeInTheDocument();
    expect(screen.getByText(mockUserData.email)).toBeInTheDocument();
    expect(screen.getByText(mockUserData.username)).toBeInTheDocument();
  });

  it('calls handleToggleEditState when clicking Edit Profile', () => {
    render(
      <ProfileDetail
        handleToggleEditState={mockHandleToggleEditState}
        userData={mockUserData}
      />
    );

    const editButton = screen.getByRole('button', { name: /edit profile/i });
    fireEvent.click(editButton);

    expect(mockHandleToggleEditState).toHaveBeenCalledTimes(1);
    expect(mockHandleToggleEditState).toHaveBeenCalledWith(true);
  });
});
