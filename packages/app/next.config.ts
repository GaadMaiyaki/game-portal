import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */ 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'casinodays2.imgix.net',
      },
    ],
  },
};

export default nextConfig;
