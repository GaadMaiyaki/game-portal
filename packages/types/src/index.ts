import { MARKETS, MARKET_CONFIG } from '@game-portal/constants';

export type Market = (typeof MARKETS)[keyof typeof MARKETS];

export interface UserData {
    id: number;
    email: string;
    username: string;
    password: string;
    registrationCountry: Market;
    firstName: string;
    lastName: string;
}

export type UserDataWithoutPassword = Omit<UserData, 'password'>;

export type CustomErrorType = { data: { error: string } };

export type MarketConfigProps = (typeof MARKET_CONFIG)[Market];

export interface GameProps {
    id: number;
    name: string;
    slug: string;
    meta: {
        thumbnail: {
            src: string;
        };
    };
};
export interface MappedGameProps extends Omit<GameProps, 'meta'> {
    thumbnail: string
};

export type GameResponseProps = {
    games: MappedGameProps[],
    nextPage: number,
    totalPages: number
}