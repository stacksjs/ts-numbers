import type { NumbersConfig } from './types'
import { loadConfig } from 'bunfig'

export const defaultConfig: NumbersConfig = {
  verbose: false,

  // Core formatting options
  decimalPlaces: 2,
  decimalCharacter: '.',
  decimalCharacterAlternative: null,
  digitGroupSeparator: ',',
  digitGroupSpacing: '3',
  currencySymbol: '',
  currencySymbolPlacement: 'p',

  // Number constraints
  minimumValue: '-10000000000000',
  maximumValue: '10000000000000',

  // Formatting behavior
  allowDecimalPadding: true,
  alwaysAllowDecimalCharacter: false,
  caretPositionOnFocus: null,
  emptyInputBehavior: 'focus',
  leadingZero: 'deny',
  negativePositiveSignPlacement: null,

  // Visual options
  negativeSignCharacter: '-',
  positiveSignCharacter: '+',
  showPositiveSign: false,
  suffixText: '',

  // Interaction options
  selectOnFocus: true,
  readOnly: false,
  modifyValueOnWheel: true,
  wheelStep: 'progressive',
  roundingMethod: 'S',
}

// eslint-disable-next-line antfu/no-top-level-await
export const config: NumbersConfig = await loadConfig({
  name: 'numbers',
  defaultConfig,
})
