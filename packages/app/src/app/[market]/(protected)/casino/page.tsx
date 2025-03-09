import CasinoClient from '@/components/casino/casino-client';
import { fetchGames } from '@/lib/api/fetch-games';

const CasinoPage = async () => {
  const serverSideRenderedInitialGames = await fetchGames();

  return (
    <div>
      <CasinoClient initialData={serverSideRenderedInitialGames} />
    </div>
  );
};

export default CasinoPage;
