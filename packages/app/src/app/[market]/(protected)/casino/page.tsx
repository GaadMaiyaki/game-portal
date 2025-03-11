import { Metadata } from 'next';

import CasinoClient from '@/components/casino/casino-client';
import { fetchGames } from '@/lib/api/fetch-games';

export const metadata: Metadata = {
  title: 'Welcome to Casino Lobby page',
  description: 'You can enjoy all of the games you want!',
};

const CasinoPage = async () => {
  const serverSideRenderedInitialGames = await fetchGames();

  return <CasinoClient initialData={serverSideRenderedInitialGames} />;
};

export default CasinoPage;
