import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
    coverage: {
      provider: 'istanbul',
      exclude: [
        '**/test-utils/**',
        '**/tests/**',
        '**.config.cjs',
        'src/main.tsx',
        'dist',
      ],
    },
  },
});
