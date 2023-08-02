import type { Config } from '@umijs/test'
import { createConfig } from '@umijs/test'

export default {
  displayName: 'twins-three-vue3',
  ...createConfig(),
  collectCoverageFrom: ['./**/*.{ts,js,tsx,jsx}'],
  moduleDirectories: ['node_modules', '../../node_modules'],
} as Config.InitialOptions
