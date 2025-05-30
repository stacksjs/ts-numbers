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
  negativeBracketsTypeOnBlur: '(,)',
  currencySymbolPlacement: 'p',
  currencySymbol: '$',
  digitGroupSeparator: ',',
  decimalCharacter: '.',
  decimalPlaces: 2,
  roundingMethod: 'S',
  showPositiveSign: false,
  leadingZero: 'keep',
  // For accounting, we usually want to align numbers in a table/report
  emptyInputBehavior: 'zero',
}

// International Accounting Standards (IFRS/GAAP) format
export const internationalAccounting: NumbersConfig = {
  negativeBracketsTypeOnBlur: '(,)',
  currencySymbolPlacement: 'p',
  currencySymbol: '€',
  digitGroupSeparator: ' ',
  decimalCharacter: ',',
  decimalPlaces: 2,
  roundingMethod: 'S',
  showPositiveSign: false,
  emptyInputBehavior: 'zero',
  locale: 'fr-FR',
}

// UK Accounting format
export const ukAccounting: NumbersConfig = {
  negativeBracketsTypeOnBlur: '(,)',
  currencySymbolPlacement: 'p',
  currencySymbol: '£',
  digitGroupSeparator: ',',
  decimalCharacter: '.',
  decimalPlaces: 2,
  roundingMethod: 'S',
  showPositiveSign: false,
  emptyInputBehavior: 'zero',
  locale: 'en-GB',
}

// Australian Accounting format
export const australianAccounting: NumbersConfig = {
  negativeBracketsTypeOnBlur: '(,)',
  currencySymbolPlacement: 'p',
  currencySymbol: 'AU$',
  digitGroupSeparator: ',',
  decimalCharacter: '.',
  decimalPlaces: 2,
  roundingMethod: 'S',
  showPositiveSign: false,
  emptyInputBehavior: 'zero',
  locale: 'en-AU',
}

// Japanese Accounting format
export const japaneseAccounting: NumbersConfig = {
  negativeBracketsTypeOnBlur: '(,)',
  currencySymbolPlacement: 'p',
  currencySymbol: '¥',
  digitGroupSeparator: ',',
  decimalCharacter: '.',
  decimalPlaces: 0, // Yen typically doesn't use decimal places
  roundingMethod: 'S',
  showPositiveSign: false,
  emptyInputBehavior: 'zero',
  locale: 'ja-JP',
}

/**
 * Arabic (Egypt) format options with Arabic numerals
 */
export const arabicEG: NumbersConfig = {
  locale: 'ar-EG',
  numberingSystem: 'arab',
  useGrouping: true,
  decimalPlaces: 2,
  digitGroupSeparator: '٬',
  decimalCharacter: '٫',
}

/**
 * Arabic (Saudi Arabia) format options
 */
export const arabicSA: NumbersConfig = {
  locale: 'ar-SA',
  numberingSystem: 'arab',
  useGrouping: true,
  decimalPlaces: 2,
  currencySymbol: 'ر.س.‏',
  currencySymbolPlacement: 'p',
}

/**
 * Hindi (India) format options with Devanagari numerals
 */
export const hindiIN: NumbersConfig = {
  locale: 'hi-IN',
  numberingSystem: 'deva',
  useGrouping: true,
  decimalPlaces: 2,
  digitGroupSpacing: '2', // For lakh/crore system
}

/**
 * Chinese (Simplified) format options
 */
export const chineseCN: NumbersConfig = {
  locale: 'zh-CN',
  useGrouping: true,
  decimalPlaces: 2,
}

/**
 * Chinese (Simplified) format options with currency
 */
export const chineseCNWithCurrency: NumbersConfig = {
  locale: 'zh-CN',
  useGrouping: true,
  decimalPlaces: 2,
  currencySymbol: '¥',
  currencySymbolPlacement: 'p',
}

/**
 * Japanese format options
 */
export const japaneseJP: NumbersConfig = {
  locale: 'ja-JP',
  useGrouping: true,
  decimalPlaces: 0,
  currencySymbol: '¥',
  currencySymbolPlacement: 'p',
}

/**
 * Indian format options (using lakh/crore system)
 */
export const indianIN: NumbersConfig = {
  locale: 'en-IN',
  useGrouping: true,
  decimalPlaces: 2,
  digitGroupSpacing: '2',
}

/**
 * Swiss format options (with apostrophe separators)
 */
export const swissCH: NumbersConfig = {
  locale: 'de-CH',
  useGrouping: true,
  decimalPlaces: 2,
  digitGroupSeparator: '\'',
  decimalCharacter: '.',
}

/**
 * Swedish format options (space as separator)
 */
export const swedishSE: NumbersConfig = {
  locale: 'sv-SE',
  useGrouping: true,
  decimalPlaces: 2,
  digitGroupSeparator: ' ',
  decimalCharacter: ',',
}

/**
 * French format options (space as separator, comma for decimal)
 */
export const frenchFR: NumbersConfig = {
  locale: 'fr-FR',
  useGrouping: true,
  decimalPlaces: 2,
  digitGroupSeparator: ' ',
  decimalCharacter: ',',
}

/**
 * US Phone Number format: (123) 456-7890
 */
export const phoneUS: NumbersConfig = {
  isSpecializedType: 'phone',
  specializedOptions: {
    phoneFormat: '(###) ###-####',
    countryCode: 'US',
  },
  decimalPlaces: 0,
  allowDecimalPadding: false,
  digitGroupSeparator: '',
  negativePositiveSignBehavior: false,
  minimumValue: '0',
  maximumValue: '9999999999',
  leadingZero: 'keep',
  selectOnFocus: true,
  caretPositionOnFocus: 'end',
}

/**
 * International Phone Number format: +1 (123) 456-7890
 */
export const phoneInternational: NumbersConfig = {
  ...phoneUS,
  specializedOptions: {
    phoneFormat: '+# (###) ###-####',
    countryCode: 'INT',
  },
  maximumValue: '19999999999',
}

/**
 * Weight in kilograms (kg)
 */
export const weightKg: NumbersConfig = {
  isSpecializedType: 'weight',
  specializedOptions: {
    weightUnit: 'kg',
  },
  decimalPlaces: 2,
  minimumValue: '0',
  suffixText: ' kg',
  digitGroupSeparator: ',',
  negativePositiveSignBehavior: false,
  roundingMethod: 'S',
}

/**
 * Weight in pounds (lb)
 */
export const weightLbs: NumbersConfig = {
  ...weightKg,
  specializedOptions: {
    weightUnit: 'lb',
  },
  suffixText: ' lb',
}

/**
 * Length in meters (m)
 */
export const lengthMeters: NumbersConfig = {
  isSpecializedType: 'length',
  specializedOptions: {
    lengthUnit: 'm',
  },
  decimalPlaces: 2,
  minimumValue: '0',
  suffixText: ' m',
  digitGroupSeparator: ',',
  roundingMethod: 'S',
}

/**
 * Length in centimeters (cm)
 */
export const lengthCm: NumbersConfig = {
  ...lengthMeters,
  specializedOptions: {
    lengthUnit: 'cm',
  },
  suffixText: ' cm',
}

/**
 * Length in feet and inches (ft/in)
 */
export const lengthFeet: NumbersConfig = {
  isSpecializedType: 'length',
  specializedOptions: {
    lengthUnit: 'ft',
  },
  decimalPlaces: 0,
  minimumValue: '0',
  suffixText: ' ft',
  digitGroupSeparator: ',',
  roundingMethod: 'D',
  emptyInputBehavior: 'zero',
}

/**
 * Temperature in Celsius (°C)
 */
export const tempCelsius: NumbersConfig = {
  isSpecializedType: 'temperature',
  specializedOptions: {
    temperatureUnit: 'C',
  },
  decimalPlaces: 1,
  suffixText: ' °C',
  digitGroupSeparator: '',
  roundingMethod: 'S',
}

/**
 * Temperature in Fahrenheit (°F)
 */
export const tempFahrenheit: NumbersConfig = {
  ...tempCelsius,
  specializedOptions: {
    temperatureUnit: 'F',
  },
  suffixText: ' °F',
}

/**
 * Temperature in Kelvin (K)
 */
export const tempKelvin: NumbersConfig = {
  ...tempCelsius,
  specializedOptions: {
    temperatureUnit: 'K',
  },
  minimumValue: '0',
  suffixText: ' K',
}

/**
 * Percentage format (%)
 */
export const percentageFormat: NumbersConfig = {
  isSpecializedType: 'percentage',
  decimalPlaces: 1,
  suffixText: '%',
  minimumValue: '0',
  maximumValue: '100',
  digitGroupSeparator: '',
  roundingMethod: 'S',
}

/**
 * Time format (HH:MM:SS)
 */
export const time24h: NumbersConfig = {
  isSpecializedType: 'time',
  specializedOptions: {
    timeFormat: '24h',
    showSeconds: true,
  },
  decimalPlaces: 0,
  minimumValue: '0',
  maximumValue: '235959',
}

/**
 * Time format (12-hour with AM/PM)
 */
export const time12h: NumbersConfig = {
  ...time24h,
  specializedOptions: {
    timeFormat: '12h',
    showSeconds: true,
  },
  maximumValue: '125959',
}

/**
 * IP Address (IPv4)
 */
export const ipAddress: NumbersConfig = {
  isSpecializedType: 'ip',
  specializedOptions: {
    ipVersion: 'v4',
  },
  decimalPlaces: 0,
  minimumValue: '0',
  maximumValue: '255',
  digitGroupSeparator: '',
}

/**
 * Credit Card Number
 */
export const creditCard: NumbersConfig = {
  isSpecializedType: 'creditCard',
  specializedOptions: {
    creditCardFormat: 'auto',
  },
  decimalPlaces: 0,
  minimumValue: '0',
  digitGroupSeparator: ' ',
  digitGroupSpacing: '4',
}

/**
 * Hebrew (Israel) format options for RTL formatting
 */
export const hebrewIL: NumbersConfig = {
  locale: 'he-IL',
  useGrouping: true,
  decimalPlaces: 2,
}

/**
 * Hebrew (Israel) format options for RTL formatting with currency
 */
export const hebrewILWithCurrency: NumbersConfig = {
  locale: 'he-IL',
  useGrouping: true,
  decimalPlaces: 2,
  currencySymbol: '₪',
  currencySymbolPlacement: 's',
}

/**
 * Return a converter config that can convert between units
 */
export function createUnitConverter(
  from: 'kg' | 'lb' | 'm' | 'ft' | 'C' | 'F' | 'K',
  to: 'kg' | 'lb' | 'm' | 'ft' | 'C' | 'F' | 'K',
): NumbersConfig {
  // Get the appropriate base config
  let baseConfig: NumbersConfig = {}

  // Weight conversion
  if ((from === 'kg' || from === 'lb') && (to === 'kg' || to === 'lb')) {
    baseConfig = from === 'kg' ? { ...weightKg } : { ...weightLbs }
    baseConfig.specializedOptions = {
      ...baseConfig.specializedOptions,
      weightUnit: from,
      convertWeightTo: to,
    }
    baseConfig.decimalPlaces = 5 // Higher precision for tests
    baseConfig.suffixText = ` ${from} → ${to}`
  }
  // Length conversion
  else if ((from === 'm' || from === 'ft') && (to === 'm' || to === 'ft')) {
    baseConfig = from === 'm' ? { ...lengthMeters } : { ...lengthFeet }
    baseConfig.specializedOptions = {
      ...baseConfig.specializedOptions,
      lengthUnit: from,
      convertLengthTo: to,
    }
    baseConfig.decimalPlaces = 5 // Higher precision for tests
    baseConfig.suffixText = ` ${from} → ${to}`
  }
  // Temperature conversion
  else if ((from === 'C' || from === 'F' || from === 'K')
    && (to === 'C' || to === 'F' || to === 'K')) {
    if (from === 'C')
      baseConfig = { ...tempCelsius }
    else if (from === 'F')
      baseConfig = { ...tempFahrenheit }
    else baseConfig = { ...tempKelvin }

    baseConfig.specializedOptions = {
      ...baseConfig.specializedOptions,
      temperatureUnit: from,
      convertTempTo: to,
    }
    baseConfig.decimalPlaces = 3 // Higher precision for tests

    // Temperature is special - the suffixText should include the degrees symbol for C and F
    const fromSymbol = from === 'K' ? from : `°${from}`
    const toSymbol = to === 'K' ? to : `°${to}`
    baseConfig.suffixText = ` ${fromSymbol} → ${toSymbol}`

    // For the parseNumber function to correctly recognize the original value based on
    // display value, ensure that the appropriate setting is included
    baseConfig.unitConversion = true
  }

  return baseConfig
}
