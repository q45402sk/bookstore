import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: ['styles'],
    additionalData: `@import "@/styles/color.scss";`,
  },
};

export default nextConfig;
