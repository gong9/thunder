import type { Config } from '@umijs/test'
import { createConfig } from '@umijs/test'

export default {
  displayName: 'anov-3d',
  ...createConfig(),
  collectCoverageFrom: ['./**/*.{ts,js,tsx,jsx}'],
  moduleDirectories: ['node_modules', '../../node_modules'],
} as Config.InitialOptions
