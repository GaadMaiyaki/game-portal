'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { GameResponseProps } from '@game-portal/types';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { fetchPaginatedGames } from '@/lib/api/fetch-paginated-games';
import { useGetUserData } from '@/hooks/useGetUserData';

import CasinoGameGrid from './casino-grid';

type CasinoClientProps = {
  initialData: GameResponseProps;
};

const CasinoClient = ({ initialData }: CasinoClientProps) => {
  const { ref, inView } = useIntersectionObserver();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<GameResponseProps>({
      //TODO: create constant for query keys
      queryKey: ['casino'],
      queryFn: fetchPaginatedGames,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage <= lastPage?.totalPages || 0 ? nextPage : undefined;
      },
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
    });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  const userData = useGetUserData();

  const games = data?.pages?.flatMap((page) => page.games) || [];

  return (
    <div>
      <h1 className="text-2xl text-center mt-4 font-bold text-grey-[800] mb-4">
        Casino Games
      </h1>

      <CasinoGameGrid
        games={games}
        userMarket={userData?.registrationCountry}
      />

      <div ref={ref} className="bg-transparent py-5" />
      {isFetchingNextPage && (
        <p className="py-4 text-center mb-4">Loading more games...</p>
      )}
    </div>
  );
};

export default CasinoClient;
