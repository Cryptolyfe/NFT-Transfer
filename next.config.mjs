// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅  lint still runs locally (`npm run lint`) but is ignored in CI/Prod
  eslint: {
    ignoreDuringBuilds: true,
  },

  /** (optional) Other Next.js options here */
  experimental: {
    // enables looser ESM externals so CJS deps still work
    esmExternals: 'loose',
  },
};

export default nextConfig;   // ESM export so “module is not defined” goes away
