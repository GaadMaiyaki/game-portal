import { render, renderHook, RenderOptions } from '@testing-library/react';
import { ReactNode } from 'react';
import { UserDataWithoutPassword } from '@game-portal/types';
import { Provider } from 'react-redux';

import { AppStore, makeStore, RootState } from '@/lib/store';
import ReactQueryProvider from '@/lib/react-query-provider';
import { Toaster } from '@/components/ui/sonner';

type ExtendedRenderOptions = Omit<RenderOptions, 'queries'> & {
  userData?: UserDataWithoutPassword;
  preloadedState?: Partial<RootState>;
  store?: AppStore;
};

function TestProviders({
  children,
  store,
}: {
  children: ReactNode;
  userData?: UserDataWithoutPassword;
  store: AppStore;
}) {
  return (
    <ReactQueryProvider>
      <Provider store={store}>{children}</Provider>
      <Toaster />
    </ReactQueryProvider>
  );
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    store = makeStore(preloadedState),
    ...options
  }: ExtendedRenderOptions = {}
) {
  return render(
    <TestProviders userData={options?.userData} store={store}>
      {ui}
    </TestProviders>,
    options
  );
}

export function renderHookWithProviders<Result, Props>(
  hookRenderCallback: (initialProps: Props) => Result,
  {
    preloadedState,
    store = makeStore(preloadedState),
    ...options
  }: ExtendedRenderOptions = {}
) {
  return renderHook(hookRenderCallback, {
    wrapper: ({ children }) => (
      <TestProviders userData={options?.userData} store={store}>
        {children}
      </TestProviders>
    ),
    ...options,
  });
}
