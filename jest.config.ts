export default {
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: ['default', ['github-actions', { silent: false }], 'summary'],
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  verbose: true,
  moduleNameMapper: {
    'src/(.*)$': '<rootDir>/src/$1'
  }
};
