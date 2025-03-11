import { SESSION_KEYS } from '@game-portal/constants';
import { UserDataWithoutPassword } from '@game-portal/types';
import { NextRequest, NextResponse } from 'next/server';
import { MARKETS } from '@game-portal/constants';

const LOGIN_ROUTE = 'login';

export function middleware(req: NextRequest & { mockLoginPath?: string }) {
  const MOCK_LOGIN_PATH = req?.mockLoginPath;
  const url = req.nextUrl;
  const marketParam = url.pathname.split('/')[1];

  const availableMarkets = Object.values(MARKETS);

  const isAccessingMarketRoute = availableMarkets
    .map((availableMarket) => availableMarket.toLocaleLowerCase())
    .includes(marketParam.toLocaleLowerCase());

  const session = req.cookies.get(SESSION_KEYS.USER_SESSION);

  const userData = (session ? JSON.parse(session?.value || '{}') : session) as
    | UserDataWithoutPassword
    | undefined;

  const userMarket = userData?.registrationCountry;

  if (!userData && marketParam !== (MOCK_LOGIN_PATH || LOGIN_ROUTE)) {
    return NextResponse.redirect(
      new URL(`/${MOCK_LOGIN_PATH || LOGIN_ROUTE}`, req.url)
    );
  }

  if (userData && userMarket !== marketParam && isAccessingMarketRoute) {
    const pathnameToRedirect = `/${userData?.registrationCountry}${url.pathname.substring(3)}`;

    return NextResponse.redirect(new URL(pathnameToRedirect, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
