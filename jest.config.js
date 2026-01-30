module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: [
    'dist/continuous-carousel.js',
    '!dist/continuous-carousel.min.js',
    '!dist/**/*.esm.js'
  ]
};
