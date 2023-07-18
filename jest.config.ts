// @ts-ignore
import { Config, } from '@umijs/test';

export default {
  projects: [
    '<rootDir>/packages/*/jest.config.ts',
  ],
  testMatch: [
    '<rootDir>/packages/**/__tests__/**/*.test.{ts,js,tsx,jsx}',
  ],
} as Config.InitialOptions;
