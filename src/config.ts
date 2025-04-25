import type { NumbersConfig } from './types'
import { loadConfig } from 'bunfig'

export const defaultConfig: NumbersConfig = {
  verbose: true,
}

// eslint-disable-next-line antfu/no-top-level-await
export const config: NumbersConfig = await loadConfig({
  name: 'numbers',
  defaultConfig,
})
