import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { fetchGameDetails } from '@/lib/api/fetch-game-detail';
import GameStage from '@/components/game-stage';
import { fetchGames } from '@/lib/api/fetch-games';

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 180;

export const dynamicParams = true;

export async function generateStaticParams() {
  const { games } = await fetchGames();
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = await fetchGameDetails(slug);
  if (!game) return {};

  return {
    title: `${game.name} | Play Casino Games`,
    description: `Play ${game.name} online. Enjoy casino games!`,
    openGraph: {
      title: `${game.name} | Casino Game`,
      images: [{ url: game.thumbnail }],
    },
  };
}

const GameStagePage = async ({ params }: Props) => {
  const { slug } = await params;

  const game = await fetchGameDetails(slug);
  if (!game) return notFound();

  return <GameStage game={game} />;
};

export default GameStagePage;
