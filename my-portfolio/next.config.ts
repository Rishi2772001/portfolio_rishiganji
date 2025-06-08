import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ⚠️ Allows build even with lint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // optional – same idea for TS
  },
  /* config options here */
  compiler: {
    // enables the SWC transform that avoids class-name mismatches
    styledComponents: true,
  },
  
};

export default nextConfig;
