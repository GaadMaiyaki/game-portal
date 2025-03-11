import { NextRequest, NextResponse } from 'next/server';
import { UserDataWithoutPassword } from '@game-portal/types';

import { middleware } from '../middleware';

jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    redirect: jest.fn(),
    next: jest.fn(),
  },
}));

const mockUserData: UserDataWithoutPassword = {
  id: 3,
  email: 'peter.mayaki@gaad.com',
  username: 'gaadmaiyaki',
  registrationCountry: 'ca',
  firstName: 'Peter',
  lastName: 'Maiyaki',
};

describe('middleware', () => {
  const mockRedirect = NextResponse.redirect;
  const mockNext = NextResponse.next;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to login if user is unauthenticated and accessing a market route', async () => {
    const req = {
      mockLoginPath: 'go-and-login',
      url: 'http://localhost:3000',
      nextUrl: {
        pathname: '/en/profile',
      },
      cookies: {
        get: jest.fn().mockReturnValue(null),
      },
    };

    (mockRedirect as jest.Mock).mockReturnValue('go-and-login');

    const result = middleware(req as unknown as NextRequest);

    expect(result).toBe('go-and-login');
    expect(mockRedirect).toHaveBeenCalledWith(
      new URL('/go-and-login', req.url)
    );
  });

  it('should redirect to the correct market if user is accessing a market route but has a different registration country', async () => {
    const req = {
      url: 'http://localhost:3000',
      nextUrl: {
        pathname: '/en/profile',
      },
      cookies: {
        get: jest.fn().mockReturnValue({
          value: JSON.stringify(mockUserData),
        }),
      },
    };

    (mockRedirect as jest.Mock).mockReturnValue(
      mockUserData.registrationCountry
    );

    const result = middleware(req as unknown as NextRequest);

    expect(result).toBe(mockUserData.registrationCountry);

    expect(mockRedirect).toHaveBeenCalledWith(new URL('/ca/profile', req.url));
  });

  it('should proceed if user is authenticated and accessing the correct market route', async () => {
    const req = {
      url: 'http://localhost:3000',
      nextUrl: {
        origin: 'http://localhost:3000',
        pathname: '/en/casino',
      },
      cookies: {
        get: jest.fn().mockReturnValue({
          value: JSON.stringify({ ...mockUserData, registrationCountry: 'en' }),
        }),
      },
    };

    (mockNext as jest.Mock).mockReturnValue('go to casino');

    const result = middleware(req as unknown as NextRequest);

    expect(result).toBe('go to casino');

    expect(mockNext).toHaveBeenCalled();
  });

  it('should not redirect if user is accessing the login route', async () => {
    const req = {
      url: 'http://localhost:3000',
      nextUrl: {
        origin: 'http://localhost:3000',
        pathname: '/login',
      },
      cookies: {
        get: jest.fn().mockReturnValue(null),
      },
    };

    (mockNext as jest.Mock).mockReturnValue('go to login');

    const result = middleware(req as unknown as NextRequest);

    expect(result).toBe('go to login');
    expect(mockNext).toHaveBeenCalled();
  });
});
