/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';

export default ({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        '@styles': path.resolve(__dirname, 'src/common/styles'),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setupTests.ts',
      coverage: {
        thresholds: {
          lines: 70,
          branches: 70,
          functions: 70,
          statements: 70,
        },
        exclude: [
          'src/components/atoms/LoadingSvg',
          'src/components/organisms/ErrorBoundary',
          'src/pages/not-found',
          'src/routes',
          '.dev_tools',
          'src/test',
          'src/vite-env.d.ts',
          '.storybook',
          '*.cjs',
          'src/index.tsx',
          'src/**/*.stories.tsx',
        ],
      },
      exclude: ['node_modules', '.dev_tools', 'src/test'],
    },
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_API_PROXY,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  });
};
