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

  // Decimal behavior
  allowDecimalPadding: true,
  alwaysAllowDecimalCharacter: false,

  // Display and interaction
  caretPositionOnFocus: null,
  emptyInputBehavior: 'focus',
  leadingZero: 'deny',
  negativePositiveSignPlacement: null,

  // Visual options
  negativeSignCharacter: '-',
  positiveSignCharacter: '+',
  showPositiveSign: false,
  suffixText: '',
  negativeBracketsTypeOnBlur: null,

  // Interaction options
  selectOnFocus: true,
  selectNumberOnly: false,
  readOnly: false,
  modifyValueOnWheel: true,
  wheelStep: 'progressive',
  modifyValueOnUpDownArrow: true,
  upDownStep: 'progressive',
  roundingMethod: 'S',
  isCancellable: true,
  negativePositiveSignBehavior: false,

  // Scaling options
  divisorWhenUnfocused: null,
  decimalPlacesShownOnBlur: null,
  decimalPlacesShownOnFocus: null,
  symbolWhenUnfocused: null,

  // Advanced behavior
  overrideMinMaxLimits: null,
  valueOverride: null,
  onInvalidPaste: 'error',
  formulaMode: false,
  unformatOnHover: true,
  unformatOnSubmit: false,
  saveValueToSessionStorage: false,
  watchExternalChanges: false,
  createLocalList: true,
  wheelOn: 'focus',
  noEventListeners: false,
  formatOnPageLoad: true,

  // Styling
  styleRules: null,
  valuesToStrings: null,
}

// eslint-disable-next-line antfu/no-top-level-await
export const config: NumbersConfig = await loadConfig({
  name: 'numbers',
  defaultConfig,
})
