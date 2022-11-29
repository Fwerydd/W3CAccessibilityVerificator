/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '.js'
  ],
  collectCoverageFrom: [
    '**/*.ts',
    '!**/build/**',
    '!**/node_modules/**'
  ],
  coveragePathIgnorePatterns: [
    'src/doc/*'
  ]
};