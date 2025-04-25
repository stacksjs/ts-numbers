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
  keyboardShortcuts: {
    increment: 'Alt+ArrowUp',
    decrement: 'Alt+ArrowDown',
    incrementLarge: 'Alt+Shift+ArrowUp',
    decrementLarge: 'Alt+Shift+ArrowDown',
    toggleSign: 'Alt+-',
    clear: 'Alt+C',
    undo: 'Alt+Z',
    redo: 'Alt+Shift+Z',
    custom: null,
  },

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

  // Accessibility options
  ariaLabel: undefined,
  ariaLabelledBy: undefined,

  // Localization
  locale: 'en-US',
  useGrouping: true,
  numberingSystem: null,

  // Persistence
  persistenceMethod: null,
  persistenceKey: 'numbers-value',

  // Scientific notation
  useScientificNotation: false,
  scientificNotationThreshold: 1e6,

  // Multiple currencies
  currencies: null,
  activeCurrency: undefined,
}

// eslint-disable-next-line antfu/no-top-level-await
export const config: NumbersConfig = await loadConfig({
  name: 'numbers',
  defaultConfig,
})
