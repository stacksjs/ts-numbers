import type { NumbersConfig } from './src/types'

// This is the project-wide configuration for the Numbers library
// You can override any of the default values here

const config: NumbersConfig = {
  // Core formatting options
  decimalPlaces: 2,
  decimalCharacter: '.',
  digitGroupSeparator: ',',

  // Currency options
  currencySymbol: '$',
  currencySymbolPlacement: 'p',

  // Other formatting options
  selectOnFocus: true,
  modifyValueOnWheel: true,
  wheelStep: 'progressive',
}

export default config
