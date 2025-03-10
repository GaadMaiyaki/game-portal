import CasinoClient from '@/components/casino/casino-client';
import { fetchGames } from '@/lib/api/fetch-games';

//TODO: add metadata
const CasinoPage = async () => {
  const serverSideRenderedInitialGames = await fetchGames();

  return <CasinoClient initialData={serverSideRenderedInitialGames} />;
};

export default CasinoPage;
