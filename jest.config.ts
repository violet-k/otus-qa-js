export default {
  coverageProvider: 'v8',
  testEnvironment: 'node',
  reporters: ['default', ['github-actions', { silent: false }], 'summary'],
  transform: { '^.+\\.(ts|tsx)$': '@swc/jest' },
  verbose: true,
  moduleNameMapper: {
    'src/(.*)$': '<rootDir>/src/$1'
  }
};
