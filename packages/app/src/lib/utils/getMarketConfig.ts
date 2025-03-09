import { MARKET_CONFIG } from '@game-portal/constants';
import { Market } from '@game-portal/types';

export const getMarketConfig = (market: Market | undefined) => {
  return !market ? undefined : MARKET_CONFIG[market];
};
