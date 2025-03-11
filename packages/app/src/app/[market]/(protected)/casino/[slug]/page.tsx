import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MappedGameProps } from '@game-portal/types';

import { fetchGameDetails } from '@/lib/api/fetch-game-detail';
import GameStage from '@/components/game-stage';
import games from '@/data/games.json';

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 180;

export const dynamicParams = false;

export async function generateStaticParams() {
  /*
  Why importing directly? accessing the api endpoint would fail on localhost at build time as the server is not running, also the build is running in a different environment (connection would be refused)
  */

  return (games as MappedGameProps[]).map((game) => ({
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
