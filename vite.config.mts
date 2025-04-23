import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts', // if you’re using setup
  },
  plugins: [tsconfigPaths()],
  esbuild: {
    jsx: 'automatic', // 👈 this makes sure React is correctly handled in JSX
  },
});
