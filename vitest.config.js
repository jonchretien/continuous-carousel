import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.{js,ts}'],
    coverage: {
      include: ['dist/continuous-carousel.js'],
      exclude: ['dist/continuous-carousel.min.js', 'dist/**/*.esm.js']
    }
  }
});
