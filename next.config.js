/** @type {import('next').NextConfig} */
const nextConfig = {
    // 🚫  Prevent ESLint from blocking production builds
    eslint: {
      ignoreDuringBuilds: true,
    },
    // (keep this file minimal; you can add other options later)
  };
  
  module.exports = nextConfig;
  