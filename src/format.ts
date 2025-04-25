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
 * Format number to string according to configuration
 */
export function formatNumber({ value, config = {} }: FormatNumberOptions): string {
  const mergedConfig: NumbersConfig = { ...defaultConfig, ...config }

  // Convert value to number if it's a string
  let numValue = typeof value === 'string' ? Number.parseFloat(value) : value

  // Check if value is within min/max limits
  const minValue = Number.parseFloat(mergedConfig.minimumValue || '-10000000000000')
  const maxValue = Number.parseFloat(mergedConfig.maximumValue || '10000000000000')

  if (numValue < minValue)
    numValue = minValue
  if (numValue > maxValue)
    numValue = maxValue

  const decimalPlaces = mergedConfig.decimalPlaces || 0

  // Round the number
  numValue = roundNumber(numValue, decimalPlaces, mergedConfig.roundingMethod || 'S')

  // Convert to string and split into integer and decimal parts
  const parts = numValue.toString().split('.')
  let integerPart = parts[0]
  let decimalPart = parts.length > 1 ? parts[1] : ''

  // Handle negative numbers
  const isNegative = integerPart.startsWith('-')
  if (isNegative)
    integerPart = integerPart.substring(1)

  // Add digit group separators to integer part
  const digitGroupSpacing = mergedConfig.digitGroupSpacing || '3'
  const digitSeparator = mergedConfig.digitGroupSeparator || ','

  if (digitSeparator && integerPart.length > 0) {
    const spacing = Number.parseInt(digitGroupSpacing.toString(), 10)
    const rgx = new RegExp(`(\\d)(?=(\\d{${spacing}})+(?!\\d))`, 'g')
    integerPart = integerPart.replace(rgx, `$1${digitSeparator}`)
  }

  // Handle decimal part
  let formattedDecimalPart = ''
  if (decimalPlaces > 0) {
    const decimalChar = mergedConfig.decimalCharacter || '.'

    // Pad or truncate decimal part to match decimalPlaces
    if (mergedConfig.allowDecimalPadding === true) {
      decimalPart = decimalPart.padEnd(decimalPlaces, '0').substring(0, decimalPlaces)
    }
    else if (mergedConfig.allowDecimalPadding === 'floats' && decimalPart.length > 0) {
      decimalPart = decimalPart.padEnd(decimalPlaces, '0').substring(0, decimalPlaces)
    }
    else {
      decimalPart = decimalPart.substring(0, decimalPlaces)
    }

    if (decimalPart.length > 0) {
      formattedDecimalPart = `${decimalChar}${decimalPart}`
    }
  }

  // Build the final formatted string
  let formattedValue = `${integerPart}${formattedDecimalPart}`

  // Add currency symbol
  const currencySymbol = mergedConfig.currencySymbol || ''
  const currencySymbolPlacement = mergedConfig.currencySymbolPlacement || 'p'

  // Add negative sign according to placement
  const negativeSign = isNegative ? mergedConfig.negativeSignCharacter || '-' : ''
  const positiveSign = !isNegative && mergedConfig.showPositiveSign ? mergedConfig.positiveSignCharacter || '+' : ''
  const sign = isNegative ? negativeSign : positiveSign

  // Add sign according to placement
  const signPlacement = mergedConfig.negativePositiveSignPlacement

  // Apply currency symbol and sign based on placement
  if (currencySymbolPlacement === 'p') {
    if (!signPlacement || signPlacement === 'p') {
      formattedValue = `${sign}${currencySymbol}${formattedValue}`
    }
    else if (signPlacement === 'l') {
      formattedValue = `${sign}${currencySymbol}${formattedValue}`
    }
    else if (signPlacement === 's') {
      formattedValue = `${currencySymbol}${formattedValue}${sign}`
    }
    else { // 'r'
      formattedValue = `${currencySymbol}${formattedValue}${sign}`
    }
  }
  else { // 's'
    if (!signPlacement || signPlacement === 'p') {
      formattedValue = `${sign}${formattedValue}${currencySymbol}`
    }
    else if (signPlacement === 'l') {
      formattedValue = `${sign}${formattedValue}${currencySymbol}`
    }
    else if (signPlacement === 's') {
      formattedValue = `${formattedValue}${currencySymbol}${sign}`
    }
    else { // 'r'
      formattedValue = `${formattedValue}${sign}${currencySymbol}`
    }
  }

  // Add suffix text if present
  if (mergedConfig.suffixText) {
    formattedValue = `${formattedValue}${mergedConfig.suffixText}`
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
