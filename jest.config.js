module.exports = {
  roots: ['<rootDir>/src'],
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', 'isomorphic-fetch', 'jest-canvas-mock'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  // Allow absolute imports
  moduleDirectories: ['node_modules', 'src'],
  // Mock CSS files
  moduleNameMapper: { '\\.(css|less)$': '<rootDir>/src/mocks/stylesMocks.ts' }
}
