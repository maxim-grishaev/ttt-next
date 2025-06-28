import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    include: ['./src/**/*.test.{ts,tsx}'],
    exclude: ['**/{node_modules,dist,tmp}/**', '**/*.{mock,config}.*'],
    reporters: process.env.CI ? ['basic', 'junit'] : ['default'],
    outputFile: process.env.CI ? './junit.xml' : undefined,
  },
});
