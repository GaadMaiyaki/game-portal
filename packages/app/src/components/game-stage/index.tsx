'use client';

import { MappedGameProps } from '@game-portal/types';
import Image from 'next/image';

import { useGetUserData } from '@/hooks/useGetUserData';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

type GameStageProps = {
  game: MappedGameProps;
};
const GameStage = ({ game }: GameStageProps) => {
  const userData = useGetUserData();

  const isAuthenticated = !!userData;

  return (
    <div className="max-w-4xl mx-auto py-10 px-5">
      <div className="flex justify-center">
        <Image
          quality={100}
          unoptimized
          src={game.thumbnail}
          alt={game.name}
          width={100}
          height={100}
          className="w-[45%] h-[45%] rounded-lg shadow-lg"
        />
      </div>

      <h1 className="text-3xl font-bold text-center mt-6">{game.name}</h1>

      <div className="flex justify-center mt-6">
        {isAuthenticated ? (
          <Button
            type="submit"
            className={cn(
              'bg-green-600 hover:bg-green-700 text-white rounded-md text-lg mt-5 py-6 text-[1rem]'
            )}
          >
            Play for Real
          </Button>
        ) : (
          <Button
            type="submit"
            className={cn(
              'bg-blue-600 hover:bg-blue-700 text-white rounded-md text-lg mt-5 py-6 text-[1rem]'
            )}
          >
            Play for Free
          </Button>
        )}
      </div>
    </div>
  );
};

export default GameStage;
