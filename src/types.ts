export interface NumbersConfig {
  verbose?: boolean

  // Core formatting options
  decimalPlaces?: number
  decimalCharacter?: string
  decimalCharacterAlternative?: string | null
  digitGroupSeparator?: string
  digitGroupSpacing?: string | number
  currencySymbol?: string
  currencySymbolPlacement?: 'p' | 's' // prefix or suffix

  // Number constraints
  minimumValue?: string
  maximumValue?: string

  // Decimal behavior
  allowDecimalPadding?: boolean | 'floats'
  alwaysAllowDecimalCharacter?: boolean

  // Display and interaction
  caretPositionOnFocus?: 'start' | 'end' | 'decimalChar' | null
  emptyInputBehavior?: 'focus' | 'press' | 'always' | 'min' | 'max' | 'zero' | 'null' | string
  leadingZero?: 'allow' | 'deny' | 'keep'
  negativePositiveSignPlacement?: 'l' | 'r' | 'p' | 's' | null

  // Visual options
  negativeSignCharacter?: string
  positiveSignCharacter?: string
  showPositiveSign?: boolean
  suffixText?: string
  negativeBracketsTypeOnBlur?: string | null

  // Interaction options
  selectOnFocus?: boolean
  selectNumberOnly?: boolean
  readOnly?: boolean
  modifyValueOnWheel?: boolean
  wheelStep?: 'progressive' | string | number
  modifyValueOnUpDownArrow?: boolean
  upDownStep?: 'progressive' | string | number
  roundingMethod?: RoundingMethod
  isCancellable?: boolean
  negativePositiveSignBehavior?: boolean
  keyboardShortcuts?: KeyboardShortcuts | null

  // Scaling options
  divisorWhenUnfocused?: number | null
  decimalPlacesShownOnBlur?: number | null
  decimalPlacesShownOnFocus?: number | null
  symbolWhenUnfocused?: string | null

  // Advanced behavior
  overrideMinMaxLimits?: 'ceiling' | 'floor' | 'ignore' | 'invalid' | null
  valueOverride?: string | null
  onInvalidPaste?: 'error' | 'ignore' | 'clamp' | 'truncate' | 'replace'
  formulaMode?: boolean
  unformatOnHover?: boolean
  unformatOnSubmit?: boolean
  saveValueToSessionStorage?: boolean
  watchExternalChanges?: boolean
  createLocalList?: boolean
  wheelOn?: 'focus' | 'hover'
  noEventListeners?: boolean
  formatOnPageLoad?: boolean

  // Styling
  styleRules?: StyleRulesOption | null
  valuesToStrings?: Record<string, string> | null

  // Accessibility options
  ariaLabel?: string
  ariaLabelledBy?: string

  // Localization
  locale?: string
  useGrouping?: boolean
  numberingSystem?: 'latn' | 'arab' | 'deva' | null

  // Persistence
  persistenceMethod?: 'sessionStorage' | 'localStorage' | 'cookie' | null
  persistenceKey?: string

  // Scientific notation
  useScientificNotation?: boolean
  scientificNotationThreshold?: number

  // Multiple currencies
  currencies?: Record<string, CurrencyConfig> | null
  activeCurrency?: string

  // Specialized formats
  isSpecializedType?: SpecializedNumberType
  specializedOptions?: SpecializedNumberOptions
}

export interface StyleRulesOption {
  positive?: string | null
  negative?: string | null
  ranges?: StyleRuleRange[]
  userDefined?: StyleRuleCallback[]
}

export interface StyleRuleRange {
  min: number
  max: number
  class: string
}

export interface StyleRuleCallback {
  callback: (rawValue: number | string) => boolean | number | number[] | null
  classes: string | string[]
}

export type RoundingMethod =
  | 'S' // Round-Half-Up Symmetric (default)
  | 'A' // Round-Half-Up Asymmetric
  | 's' // Round-Half-Down Symmetric
  | 'a' // Round-Half-Down Asymmetric
  | 'B' // Round-Half-Even "Bankers Rounding"
  | 'U' // Round Up "Round-Away-From-Zero"
  | 'D' // Round Down "Round-Toward-Zero" - same as truncate
  | 'C' // Round to Ceiling "Toward Positive Infinity"
  | 'F' // Round to Floor "Toward Negative Infinity"
  | 'N05' // Rounds to the nearest .05
  | 'U05' // Rounds up to next .05
  | 'D05' // Rounds down to next .05

export interface FormatNumberOptions {
  value: number | string
  config?: NumbersConfig
}

export interface ParseNumberOptions {
  value: string
  config?: NumbersConfig
}

export interface NumbersInstance {
  getElement: () => HTMLElement
  getConfig: () => NumbersConfig
  set: (value: number | string) => NumbersInstance
  get: () => string
  getLocalized: () => string
  getNumber: () => number
  update: (config: Partial<NumbersConfig>) => NumbersInstance
  clear: () => NumbersInstance
  remove: () => void
  setCurrency: (currencyCode: string) => NumbersInstance
  getAvailableCurrencies: () => string[]
  undo: () => NumbersInstance
  redo: () => NumbersInstance
}

export interface KeyboardShortcuts {
  increment?: string
  decrement?: string
  incrementLarge?: string
  decrementLarge?: string
  toggleSign?: string
  clear?: string
  undo?: string
  redo?: string
  custom?: Record<string, () => void> | null
}

export interface CurrencyConfig {
  symbol: string
  placement: 'p' | 's'
  decimalPlaces: number
  locale: string
  groupSeparator?: string
  decimalCharacter?: string
}

export type SpecializedNumberType =
  | 'phone'
  | 'weight'
  | 'length'
  | 'temperature'
  | 'percentage'
  | 'time'
  | 'ip'
  | 'creditCard'
  | null

export interface SpecializedNumberOptions {
  // Phone number options
  phoneFormat?: string
  countryCode?: string

  // Weight options
  weightUnit?: 'kg' | 'g' | 'lb' | 'oz' | string
  convertWeightTo?: 'kg' | 'g' | 'lb' | 'oz' | null

  // Length options
  lengthUnit?: 'm' | 'cm' | 'mm' | 'km' | 'in' | 'ft' | 'yd' | 'mi' | string
  convertLengthTo?: 'm' | 'cm' | 'mm' | 'km' | 'in' | 'ft' | 'yd' | 'mi' | null

  // Temperature options
  temperatureUnit?: 'C' | 'F' | 'K' | string
  convertTempTo?: 'C' | 'F' | 'K' | null

  // Time options
  timeFormat?: '12h' | '24h'
  showSeconds?: boolean

  // IP address options
  ipVersion?: 'v4' | 'v6' | 'both'

  // Credit card options
  creditCardFormat?: 'auto' | 'amex' | 'visa' | 'mastercard' | 'discover'
}
