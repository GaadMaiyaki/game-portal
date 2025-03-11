export const BRAND_CONFIG = {
  CasinoA: {
    brandName: 'Casino A',
    theme: 'dark',
    description: 'We are the best Casino!',
    menu: {
      position: 'left', //TODO: position variations need to be defined,
      items: [
        { label: 'Home', path: '/' },
        { label: 'Games', path: '/casino' },
        { label: 'My Profile', path: '/my-profile' },
      ],
    },
    gameLobbyDisplay: {
      layout: 'grid',
      columns: 3, //column span i.e 12/3 = 4 card on a row
    },
    footer: {
      text: '© 2025 Casino A. All rights reserved.',
    },
    logo: {
      src: '/assets/TODO: add asset',
      alt: 'Casino A Logo',
    },
    markets: {
      en: {
        title: 'Experience the Best in Online Gaming!',
        description:
          'From exclusive bonuses to top-tier games, enjoy a seamless gaming experience built for you.',
        flag: 'https://flagcdn.com/w320/gb.png',
        features: {
          newUserBonus: true,
          earlyAccess: false,
          premiumSupport: true,
        },
      },
      ca: {
        title: 'Canada’s Premier Gaming Destination',
        description:
          'Join thousands of Canadian players and enjoy exclusive rewards, local support, and top games.',
        flag: 'https://flagcdn.com/w320/ca.png',
        features: {
          newUserBonus: true,
          earlyAccess: true,
          premiumSupport: false,
        },
      },
    },
  },
  CasinoB: {
    brandName: 'Casino B',
    theme: 'light',
    description: 'You can cross the line with us!',
    menu: {
      position: 'right',
      items: [
        { label: 'Home', path: '/' },
        { label: 'Casino', path: '/casino' },
        { label: 'Profile', path: '/my-profile' },
      ],
    },
    gameLobbyDisplay: {
      layout: 'grid',
      columns: 2,
    },
    footer: {
      text: '© 2025 Casino B. All rights reserved.',
    },
    logo: {
      src: '/assets/TODO: add asset',
      alt: 'Casino B Logo',
    },
    markets: {
      en: {
        title: 'Hey Guys! Experience the Best in Online Gaming!',
        description:
          'From exclusive bonuses to top-tier games, enjoy a seamless gaming experience built for you.',
        flag: 'https://flagcdn.com/w320/gb.png',
        features: {
          newUserBonus: false,
          earlyAccess: true,
          premiumSupport: true,
        },
      },
      ca: {
        title: 'Hello there! Canada’s Premier Gaming Destination',
        description:
          'Join thousands of Canadian players and enjoy exclusive rewards, local support, and top games.',
        flag: 'https://flagcdn.com/w320/ca.png',
        features: {
          newUserBonus: true,
          earlyAccess: true,
          premiumSupport: false,
        },
      },
    },
  },
};

export type BrandConfigProps = (typeof BRAND_CONFIG)[keyof typeof BRAND_CONFIG];

export type MarketFeaturesProps = BrandConfigProps['markets']['en']['features'];
