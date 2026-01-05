import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.blingmaroc.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.youcan.shop',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
