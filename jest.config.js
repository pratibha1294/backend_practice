/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/tests/e2e/'],
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
};
