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

  // Formatting behavior
  allowDecimalPadding?: boolean | 'floats'
  alwaysAllowDecimalCharacter?: boolean
  caretPositionOnFocus?: 'start' | 'end' | 'decimalChar' | null
  emptyInputBehavior?: 'focus' | 'press' | 'always' | 'min' | 'max' | 'zero' | 'null' | string
  leadingZero?: 'allow' | 'deny' | 'keep'
  negativePositiveSignPlacement?: 'l' | 'r' | 'p' | 's' | null

  // Visual options
  negativeSignCharacter?: string
  positiveSignCharacter?: string
  showPositiveSign?: boolean
  suffixText?: string

  // Interaction options
  selectOnFocus?: boolean
  readOnly?: boolean
  modifyValueOnWheel?: boolean
  wheelStep?: 'progressive' | string | number
  roundingMethod?: RoundingMethod
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
}
