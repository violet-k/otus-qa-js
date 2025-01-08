import type { Config } from 'jest';

export default {
  coverageProvider: 'v8',
  testEnvironment: 'node',
  reporters: ['default', ['github-actions', { silent: false }], 'summary'],
  transform: { '^.+\\.(ts|tsx)$': '@swc/jest' },
  verbose: true,
  moduleNameMapper: {
    '^config(.*)$': '<rootDir>/framework/config/$1',
    '^fixtures(.*)$': '<rootDir>/framework/fixtures/$1',
    '^services(.*)$': '<rootDir>/framework/services/$1',
    '^schemas(.*)$': '<rootDir>/framework/schemas/$1',
    '^types(.*)$': '<rootDir>/framework/types/$1'
  },
  setupFilesAfterEnv: ['./setupJest.ts']
} as Config;
