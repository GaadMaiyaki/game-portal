import { render, renderHook, RenderOptions } from '@testing-library/react';
import { ReactNode } from 'react';
import { UserDataWithoutPassword } from '@game-portal/types';

import { StoreProvider } from '@/lib/store';
import ReactQueryProvider from '@/lib/react-query-provider';
import AuthProvider from '@/lib/auth/auth-provider';
import BrandConfigProvider from '@/lib/brand/brand-provider';
import { Toaster } from '@/components/ui/sonner';

import { BRAND_CONFIG } from '../configs/brand';

type ExtendedRenderOptions = Omit<RenderOptions, 'queries'> & {
  userData?: UserDataWithoutPassword;
};

function TestProviders({
  children,
  userData,
}: {
  children: ReactNode;
  userData?: UserDataWithoutPassword;
}) {
  const brandConfigData = BRAND_CONFIG['CasinoA'];

  return (
    <ReactQueryProvider>
      <StoreProvider>
        <AuthProvider userData={userData}>
          <BrandConfigProvider brandConfigData={brandConfigData}>
            {children}
          </BrandConfigProvider>
        </AuthProvider>
      </StoreProvider>
      <Toaster />
    </ReactQueryProvider>
  );
}

export function renderWithProviders(
  ui: React.ReactElement,
  options?: ExtendedRenderOptions
) {
  return render(
    <TestProviders userData={options?.userData}>{ui}</TestProviders>,
    options
  );
}

export function renderHookWithProviders<Result, Props>(
  hookRenderCallback: (initialProps: Props) => Result,
  options?: ExtendedRenderOptions
) {
  return renderHook(hookRenderCallback, {
    wrapper: ({ children }) => (
      <TestProviders userData={options?.userData}>{children}</TestProviders>
    ),
    ...options,
  });
}
