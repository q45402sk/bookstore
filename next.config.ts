import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'store.kyobobook.co.kr',
    ],
    remotePatterns: [
      {
        hostname: '**',
      },
    ],
  },
  sassOptions: {
    includePaths: ['styles'],
    additionalData: `@import "@/styles/color.scss";`,
  },
};

export default nextConfig;
