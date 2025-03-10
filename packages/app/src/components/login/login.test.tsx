import { fireEvent, screen, waitFor } from '@testing-library/react';
import { CustomErrorType, UserDataWithoutPassword } from '@game-portal/types';

import { renderWithProviders } from '@/lib/utils/test-utils';
import { LoginDataProps } from '@/lib/schemas/login';

import { LoginForm } from '.';

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

const mockUnregisteredUserData: UserDataWithoutPassword = {
  id: 3,
  email: 'peter1.mayaki@gaad.com',
  username: 'gaadmaiyaki2',
  registrationCountry: 'ca',
  firstName: 'Peter1',
  lastName: 'Maiyaki1',
};

const mockOnSuccess = jest.fn();
const mockOnError = jest.fn();
let onSuccessCallback = jest.fn();
let onErrorCallback = jest.fn();

const mockMutateSuccessFn = jest.fn().mockImplementation(() => {
  onSuccessCallback?.(mockUserData);
});

const mockErrorPayload: CustomErrorType = {
  data: {
    error: 'Invalid username, or password',
  },
};

const mockMutateErrorFn = jest.fn().mockImplementation(() => {
  onErrorCallback?.(mockErrorPayload);
});

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
        mutate: (payload: LoginDataProps) => {
          if (payload.username === mockUnregisteredUserData.username) {
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

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show validation errors when fields are empty', async () => {
    renderWithProviders(<LoginForm />);

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(
      await screen.findByText(/Username must be at least 3 characters long/i)
    ).toBeInTheDocument();
    await screen.findByText(/Password must be at least 6 characters long/i);

    expect(mockMutateSuccessFn).not.toHaveBeenCalled();
  });

  it('should not submit if username or password is missing', async () => {
    renderWithProviders(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('Enter your username'), {
      target: { value: 'maiyaki' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(
      await screen.findByText(/Password must be at least 6 characters long/i)
    ).toBeInTheDocument();

    expect(mockMutateSuccessFn).not.toHaveBeenCalled();
  });

  it('should show validation errors when fields username is less than 3 characters or password is less than 6 characters', async () => {
    renderWithProviders(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('Enter your username'), {
      target: { value: 'ma' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'peter' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(
      await screen.findByText(/Username must be at least 3 characters long/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/Password must be at least 6 characters long/i)
    ).toBeInTheDocument();

    expect(mockMutateSuccessFn).not.toHaveBeenCalled();
  });

  it('should submit the form successfully, show success toast, and redirect user', async () => {
    renderWithProviders(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('Enter your username'), {
      target: { value: 'maiyaki' },
    });

    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'petermaiyaki' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockMutateSuccessFn).toHaveBeenCalled();
      expect(mockRouterPush).toHaveBeenCalledWith('/en');
      expect(screen.getByText('Login Successful!')).toBeInTheDocument();
    });
  });

  it('should show error toast when login fails', async () => {
    renderWithProviders(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('Enter your username'), {
      target: { value: mockUnregisteredUserData.username },
    });

    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'petermaiyaki' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockMutateErrorFn).toHaveBeenCalled();
      expect(screen.getByText(mockErrorPayload.data.error)).toBeInTheDocument();
    });
  });
});
