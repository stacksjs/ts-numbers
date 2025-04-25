import type { FormatNumberOptions, NumbersConfig, ParseNumberOptions, RoundingMethod } from './types'
import { defaultConfig } from './config'

/**
 * Round a number according to the specified rounding method
 */
export function roundNumber(value: number, decimals: number, roundingMethod: RoundingMethod): number {
  let result = 0

  switch (roundingMethod) {
    case 'S': // Round-Half-Up Symmetric (default)
      result = Number(`${Math.round(Number(`${value}e${decimals}`))}e-${decimals}`)
      break

    case 'A': // Round-Half-Up Asymmetric
      result = value >= 0
        ? Number(`${Math.round(Number(`${value}e${decimals}`))}e-${decimals}`)
        : Number(`${Math.floor(Number(`${value}e${decimals}`))}e-${decimals}`)
      break

    case 's': // Round-Half-Down Symmetric (lower case s)
      result = Number(`${Math.floor(Number(`${value}e${decimals}`))}e-${decimals}`)
      break

    case 'a': // Round-Half-Down Asymmetric (lower case a)
      result = value >= 0
        ? Number(`${Math.floor(Number(`${value}e${decimals}`))}e-${decimals}`)
        : Number(`${Math.round(Number(`${value}e${decimals}`))}e-${decimals}`)
      break

    case 'B': // Round-Half-Even "Bankers Rounding"
      result = Number(`${Math.round(Number(`${value}e${decimals}`))}e-${decimals}`)
      break

    case 'U': // Round Up "Round-Away-From-Zero"
      result = value >= 0
        ? Number(`${Math.ceil(Number(`${value}e${decimals}`))}e-${decimals}`)
        : Number(`${Math.floor(Number(`${value}e${decimals}`))}e-${decimals}`)
      break

    case 'D': // Round Down "Round-Toward-Zero" - same as truncate
      result = value >= 0
        ? Number(`${Math.floor(Number(`${value}e${decimals}`))}e-${decimals}`)
        : Number(`${Math.ceil(Number(`${value}e${decimals}`))}e-${decimals}`)
      break

    case 'C': // Round to Ceiling "Toward Positive Infinity"
      result = Number(`${Math.ceil(Number(`${value}e${decimals}`))}e-${decimals}`)
      break

    case 'F': // Round to Floor "Toward Negative Infinity"
      result = Number(`${Math.floor(Number(`${value}e${decimals}`))}e-${decimals}`)
      break

    case 'N05': // Rounds to the nearest .05
      result = Math.round(value * 20) / 20
      break

    case 'U05': // Rounds up to next .05
      result = Math.ceil(value * 20) / 20
      break

    case 'D05': // Rounds down to next .05
      result = Math.floor(value * 20) / 20
      break

    default:
      result = Number(`${Math.round(Number(`${value}e${decimals}`))}e-${decimals}`)
  }

  return result
}

/**
 * Format a number according to the configuration
 */
export function formatNumber({ value, config = {} }: FormatNumberOptions): string {
  // Convert value to string if it's a number
  const valueStr = typeof value === 'number' ? value.toString() : value

  // Parse the number with the current configuration
  let numValue: number
  try {
    numValue = parseNumber({ value: valueStr, config })
  }
  catch {
    // Return original value if it can't be parsed
    return valueStr
  }

  // Apply scientific notation if configured
  if (config.useScientificNotation
    && config.scientificNotationThreshold
    && Math.abs(numValue) >= config.scientificNotationThreshold) {
    return formatScientificNotation(numValue, config)
  }

  // Handle internationalization if locale is set
  if (config.locale) {
    return formatWithLocale(numValue, config)
  }

  // Format the number manually
  return formatManually(numValue, config)
}

/**
 * Format a number in scientific notation
 */
function formatScientificNotation(value: number, config: NumbersConfig): string {
  const decimalPlaces = config.decimalPlaces ?? 2

  // Format with exponential notation
  const formatted = value.toExponential(decimalPlaces)

  // Apply currency symbol if defined
  if (config.currencySymbol) {
    return config.currencySymbolPlacement === 'p'
      ? `${config.currencySymbol}${formatted}`
      : `${formatted}${config.currencySymbol}`
  }

  // Apply suffix if defined
  if (config.suffixText) {
    return `${formatted}${config.suffixText}`
  }

  return formatted
}

/**
 * Format a number using the Intl.NumberFormat for localization
 */
function formatWithLocale(value: number, config: NumbersConfig): string {
  const { locale, decimalPlaces = 2, useGrouping = true, currencySymbol } = config

  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    useGrouping,
  }

  // Apply numbering system if specified
  if (config.numberingSystem) {
    options.numberingSystem = config.numberingSystem
  }

  // Add currency if specified
  if (currencySymbol) {
    if (currencySymbol.length <= 3 && /^[A-Z]{3}$/.test(currencySymbol)) {
      // If it's a standard 3-letter currency code (like USD), use currency formatting
      options.style = 'currency'
      options.currency = currencySymbol
    }
    else {
      // Otherwise, manually add the currency symbol
      const formatted = new Intl.NumberFormat(locale, options).format(value)
      return config.currencySymbolPlacement === 'p'
        ? `${currencySymbol}${formatted}`
        : `${formatted}${currencySymbol}`
    }
  }

  // Format with the locale
  const formatted = new Intl.NumberFormat(locale, options).format(value)

  // Add suffix if specified
  if (config.suffixText) {
    return `${formatted}${config.suffixText}`
  }

  return formatted
}

/**
 * Format a number manually according to the configuration
 */
function formatManually(value: number, config: NumbersConfig): string {
  const {
    decimalPlaces = 2,
    decimalCharacter = '.',
    digitGroupSeparator = ',',
    digitGroupSpacing = '3',
    currencySymbol = '',
    currencySymbolPlacement = 'p',
    suffixText = '',
    showPositiveSign = false,
    negativeSignCharacter = '-',
    positiveSignCharacter = '+',
    roundingMethod = 'S',
  } = config

  // First round the number according to the rounding method
  const roundedValue = roundNumber(value, decimalPlaces, roundingMethod)

  // Convert to string and split into integer and decimal parts
  const absValue = Math.abs(roundedValue)
  let [integerPart, decimalPart = ''] = absValue.toFixed(decimalPlaces).split('.')

  // Add decimal padding if configured
  if (config.allowDecimalPadding === false && decimalPart) {
    // Remove trailing zeros
    decimalPart = decimalPart.replace(/0+$/, '')
  }
  else if (config.allowDecimalPadding === 'floats' && decimalPart) {
    // Remove trailing zeros only for non-integer values
    if (Number.parseInt(decimalPart, 10) === 0) {
      decimalPart = ''
    }
    else {
      decimalPart = decimalPart.replace(/0+$/, '')
    }
  }

  // Format the integer part with group separators
  if (digitGroupSeparator) {
    const spacing = Number.parseInt(digitGroupSpacing.toString(), 10)
    const pattern = new RegExp(`\\B(?=(\\d{${spacing}})+(?!\\d))`, 'g')
    integerPart = integerPart.replace(pattern, digitGroupSeparator)
  }

  // Combine integer and decimal parts
  let formattedValue = decimalPart
    ? `${integerPart}${decimalCharacter}${decimalPart}`
    : integerPart

  // Add sign if needed
  if (roundedValue < 0) {
    formattedValue = `${negativeSignCharacter}${formattedValue}`
  }
  else if (showPositiveSign) {
    formattedValue = `${positiveSignCharacter}${formattedValue}`
  }

  // Add currency symbol if defined
  if (currencySymbol) {
    formattedValue = currencySymbolPlacement === 'p'
      ? `${currencySymbol}${formattedValue}`
      : `${formattedValue}${currencySymbol}`
  }

  // Add suffix if defined
  if (suffixText) {
    formattedValue = `${formattedValue}${suffixText}`
  }

  return formattedValue
}

/**
 * Parse a formatted string back to a number
 */
export function parseNumber({ value, config = {} }: ParseNumberOptions): number {
  const mergedConfig: NumbersConfig = { ...defaultConfig, ...config }

  let stringValue = value.toString()

  // Remove currency symbol
  const currencySymbol = mergedConfig.currencySymbol || ''
  if (currencySymbol) {
    stringValue = stringValue.replace(new RegExp(escapeRegExp(currencySymbol), 'g'), '')
  }

  // Remove suffix text
  const suffixText = mergedConfig.suffixText || ''
  if (suffixText) {
    stringValue = stringValue.replace(new RegExp(escapeRegExp(suffixText), 'g'), '')
  }

  // Remove digit group separators
  const digitSeparator = mergedConfig.digitGroupSeparator || ','
  if (digitSeparator) {
    stringValue = stringValue.replace(new RegExp(escapeRegExp(digitSeparator), 'g'), '')
  }

  // Replace custom decimal character with standard period
  const decimalChar = mergedConfig.decimalCharacter || '.'
  if (decimalChar !== '.') {
    stringValue = stringValue.replace(new RegExp(escapeRegExp(decimalChar), 'g'), '.')
  }

  // Remove any non-numeric characters except period and minus sign
  stringValue = stringValue.replace(/[^\d.-]/g, '')

  // Parse the cleaned string to a number
  const numValue = Number.parseFloat(stringValue)

  // Return NaN if parsing failed, otherwise return the number
  return Number.isNaN(numValue) ? 0 : numValue
}

/**
 * Helper to escape special characters for use in RegExp
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
