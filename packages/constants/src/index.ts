export const MARKETS = {
    EN: 'en',
    CA: 'ca',
} as const;

export const API_ENDPOINTS = {
    LOGIN: "/login",
    CASINO: '/casino',
    LOGOUT: '/log-out'
} as const;

export const SESSION_KEYS = {
    USER_SESSION: 'session',
} as const;

export const MARKET_CONFIG = {
    en: {
        title: "Experience the Best in Online Gaming!",
        description: "From exclusive bonuses to top-tier games, enjoy a seamless gaming experience built for you.",
        flag: "https://flagcdn.com/w320/gb.png",
        availableBrands: ["CasinoA", "CasinoB"],
        features: {
            newUserBonus: true,
            earlyAccess: false,
            premiumSupport: true,
        },
    },
    ca: {
        title: "Canada’s Premier Gaming Destination",
        description: "Join thousands of Canadian players and enjoy exclusive rewards, local support, and top games.",
        flag: "https://flagcdn.com/w320/ca.png",
        availableBrands: ["CasinoB"],
        features: {
            newUserBonus: true,
            earlyAccess: true,
            premiumSupport: false,
        },
    },
} as const;

export const PAGE_SIZE = 20;