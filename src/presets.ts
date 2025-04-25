import type { NumbersConfig } from './types'

/**
 * Predefined configurations for common currencies and number formats
 */

// Euro format options
export const euro: NumbersConfig = {
  digitGroupSeparator: '.',
  decimalCharacter: ',',
  currencySymbol: '€ ',
  currencySymbolPlacement: 's',
  negativePositiveSignPlacement: 'l',
}

// US Dollar format options
export const dollar: NumbersConfig = {
  digitGroupSeparator: ',',
  decimalCharacter: '.',
  currencySymbol: '$',
  currencySymbolPlacement: 'p',
  negativePositiveSignPlacement: 'l',
}

// British Pound format options
export const pound: NumbersConfig = {
  digitGroupSeparator: ',',
  decimalCharacter: '.',
  currencySymbol: '£',
  currencySymbolPlacement: 'p',
  negativePositiveSignPlacement: 'l',
}

// Japanese Yen format options
export const yen: NumbersConfig = {
  digitGroupSeparator: ',',
  decimalCharacter: '.',
  currencySymbol: '¥',
  currencySymbolPlacement: 'p',
  decimalPlaces: 0,
  negativePositiveSignPlacement: 'l',
}

// Swiss Franc format options
export const franc: NumbersConfig = {
  digitGroupSeparator: '\'',
  decimalCharacter: '.',
  currencySymbol: 'CHF ',
  currencySymbolPlacement: 'p',
  negativePositiveSignPlacement: 'l',
  roundingMethod: 'N05',
}

// Indian Rupee format options (using lakhs and crores)
export const rupee: NumbersConfig = {
  digitGroupSeparator: ',',
  decimalCharacter: '.',
  currencySymbol: '₹',
  currencySymbolPlacement: 'p',
  digitGroupSpacing: '2',
  negativePositiveSignPlacement: 'l',
}

// Brazilian Real format options
export const real: NumbersConfig = {
  digitGroupSeparator: '.',
  decimalCharacter: ',',
  currencySymbol: 'R$ ',
  currencySymbolPlacement: 'p',
  negativePositiveSignPlacement: 'l',
}

// Chinese Yuan format options
export const yuan: NumbersConfig = {
  digitGroupSeparator: ',',
  decimalCharacter: '.',
  currencySymbol: '¥',
  currencySymbolPlacement: 'p',
  negativePositiveSignPlacement: 'l',
}

// Russian Ruble format options
export const ruble: NumbersConfig = {
  digitGroupSeparator: ' ',
  decimalCharacter: ',',
  currencySymbol: '₽',
  currencySymbolPlacement: 's',
  negativePositiveSignPlacement: 'l',
}

// Numeric format presets

// Integer format (no decimals)
export const integer: NumbersConfig = {
  decimalPlaces: 0,
  allowDecimalPadding: false,
}

// Float format with 2 decimal places
export const float: NumbersConfig = {
  decimalPlaces: 2,
  allowDecimalPadding: true,
}

// Percentage format
export const percentage: NumbersConfig = {
  decimalPlaces: 2,
  suffixText: '%',
  negativePositiveSignPlacement: 'l',
}

// Scientific notation
export const scientific: NumbersConfig = {
  digitGroupSeparator: '',
  decimalPlaces: 10,
  decimalCharacter: '.',
}

// Accounting format (uses parentheses for negative numbers)
export const accounting: NumbersConfig = {
  negativePositiveSignPlacement: null,
  // This would ideally use brackets for negative values
  // but we don't have that option directly in our config type
}
