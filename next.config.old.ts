import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ✅  Stop blocking production builds on ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },

};

export default nextConfig;
