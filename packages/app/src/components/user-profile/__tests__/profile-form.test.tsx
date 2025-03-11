import { fireEvent, screen, waitFor } from '@testing-library/react';
import { CustomErrorType, UserDataWithoutPassword } from '@game-portal/types';

import { renderWithProviders } from '@/lib/utils/test-utils';
import { ProfileDataProps } from '@/lib/schemas/profile';

import UserProfileForm from '../profile-form';

global.window.matchMedia = jest.fn().mockImplementation(() => ({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

const mockRouterPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

const mockMutateResponseData = jest.fn();

const mockUserData: UserDataWithoutPassword = {
  id: 3,
  email: 'peter.mayaki@gaad.com',
  username: 'gaadmaiyaki',
  registrationCountry: 'en',
  firstName: 'Peter',
  lastName: 'Maiyaki',
};

const mockHandleToggleEditState = jest.fn();

const mockOnSuccess = jest.fn();
const mockOnError = jest.fn();
let onSuccessCallback = jest.fn();
let onErrorCallback = jest.fn();

const mockMutateSuccessFn = jest.fn().mockImplementation(() => {
  onSuccessCallback?.(mockUserData);
});

const mockErrorPayload: CustomErrorType = {
  data: {
    error: 'Failed to update profile',
  },
};

const mockMutateErrorFn = jest.fn().mockImplementation(() => {
  onErrorCallback?.(mockErrorPayload);
});

const mockFirstName = 'Cain';

jest.mock('@tanstack/react-query', () => {
  const actual = jest.requireActual('@tanstack/react-query');
  return {
    ...actual,
    useMutation: ({
      onSuccess,
      onError,
    }: {
      onSuccess: typeof mockOnSuccess;
      onError: typeof mockOnError;
    }) => {
      onSuccessCallback = onSuccess;
      onErrorCallback = onError;
      return {
        mutate: (payload: ProfileDataProps) => {
          if (payload.firstName === mockFirstName) {
            return mockMutateErrorFn();
          }
          return mockMutateSuccessFn();
        },
        isPending: false,
        isError: false,
        onSuccess: mockOnSuccess,
        data: mockMutateResponseData,
      };
    },
  };
});

describe('UserProfileForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should prefill the form fields correctly', async () => {
    renderWithProviders(
      <UserProfileForm
        handleToggleEditState={mockHandleToggleEditState}
        userData={mockUserData}
      />
    );

    expect(screen.getByPlaceholderText('Enter your First Name')).toHaveValue(
      mockUserData.firstName
    );

    expect(screen.getByPlaceholderText('Enter your Last Name')).toHaveValue(
      mockUserData.lastName
    );
  });

  it('should show validation errors when fields are empty', async () => {
    renderWithProviders(
      <UserProfileForm
        handleToggleEditState={mockHandleToggleEditState}
        userData={mockUserData}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your First Name'), {
      target: { value: '' },
    });

    fireEvent.change(screen.getByPlaceholderText('Enter your Last Name'), {
      target: { value: '' },
    });

    expect(
      screen.getByRole('heading', { name: /edit profile/i })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /edit profile/i }));

    expect(
      await screen.findByText(/First Name is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Last Name is required/i)
    ).toBeInTheDocument();

    expect(mockMutateSuccessFn).not.toHaveBeenCalled();
  });

  it('should submit the form successfully, show success toast, and update profile', async () => {
    renderWithProviders(
      <UserProfileForm
        handleToggleEditState={mockHandleToggleEditState}
        userData={mockUserData}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your First Name'), {
      target: { value: 'Peter' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your Last Name'), {
      target: { value: 'Maiyaki' },
    });

    fireEvent.click(screen.getByRole('button', { name: /edit profile/i }));

    await waitFor(() => {
      expect(mockMutateSuccessFn).toHaveBeenCalled();
      expect(
        screen.getByText('Profile successfully updated!')
      ).toBeInTheDocument();
      expect(mockHandleToggleEditState).toHaveBeenCalledWith(false);
    });
  });

  it('should show error toast when profile update fails', async () => {
    renderWithProviders(
      <UserProfileForm
        handleToggleEditState={mockHandleToggleEditState}
        userData={mockUserData}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your First Name'), {
      target: { value: mockFirstName },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your Last Name'), {
      target: { value: 'Matthew' },
    });

    fireEvent.click(screen.getByRole('button', { name: /edit profile/i }));

    await waitFor(() => {
      expect(mockMutateErrorFn).toHaveBeenCalled();
      expect(screen.getByText(mockErrorPayload.data.error)).toBeInTheDocument();
    });
  });
});
