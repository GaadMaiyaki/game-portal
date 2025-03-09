import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';
import { StoreProvider } from '@/lib/store';
import ReactQueryProvider from '@/lib/react-query-provider';
import { Toaster } from '@/components/ui/sonner';
import { getBrandConfigFromEnv } from '@/lib/helpers/getBrandConfigFromEnv';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export function generateMetadata(): Metadata {
  const { brandName, description } = getBrandConfigFromEnv();

  //TODO: add other props
  return {
    title: `${brandName} | ${description}`,
    description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = getBrandConfigFromEnv();

  return (
    <html lang="en" className={`${theme}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <StoreProvider>{children}</StoreProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
