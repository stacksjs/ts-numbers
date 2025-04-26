import type { NumbersConfig } from './types'
import { defaultConfig } from './config'
import { formatNumber } from './format'

/**
 * Format pattern tokens:
 * # - Digit placeholder (replaced by a digit or nothing)
 * 0 - Zero placeholder (replaced by a digit or 0)
 * . - Decimal point
 * , - Thousands separator
 * $ - Currency symbol (will use the one from config)
 * + - Always show sign
 * - - Negative sign (only for negative numbers)
 * ( - Open parenthesis for negative numbers
 * ) - Close parenthesis for negative numbers
 * % - Percentage sign (multiplies by 100)
 * E - Scientific notation
 */

export interface FormatPatternOptions {
  value: number | string
  pattern: string
  config?: NumbersConfig
}

/**
 * Custom scientific formatter that mimics Excel/spreadsheet style
 */
function formatScientific(value: number, decimalPlaces: number): string {
  if (value === 0)
    return `0.${'0'.repeat(decimalPlaces)}e+0`

  const absValue = Math.abs(value)
  const exponent = Math.floor(Math.log10(absValue))
  const mantissa = absValue / 10 ** exponent

  // Format the mantissa with specified decimal places
  const formattedMantissa = mantissa.toFixed(decimalPlaces)

  // Combine the parts
  return `${value < 0 ? '-' : ''}${formattedMantissa}e${exponent >= 0 ? '+' : ''}${exponent}`
}

/**
 * Apply a format pattern to a number
 */
export function applyFormatPattern({ value, pattern, config = {} }: FormatPatternOptions): string {
  // Merge with default config
  const mergedConfig: NumbersConfig = { ...defaultConfig, ...config }

  // Convert value to number if it's a string
  const numValue = typeof value === 'string' ? Number.parseFloat(value) : value

  // Handle invalid numbers
  if (!Number.isFinite(numValue)) {
    return typeof value === 'string' ? value : 'NaN'
  }

  // Process patterns with different formats for positive and negative
  if (pattern.includes(';')) {
    const [positivePattern, negativePattern] = pattern.split(';')
    if (numValue >= 0) {
      return applyFormatPattern({
        value: numValue,
        pattern: positivePattern,
        config: mergedConfig,
      })
    }
    else {
      // For negative formats with parentheses like ($#,##0.00)
      // we need to format the absolute value
      if (negativePattern.includes('(') && negativePattern.includes(')')) {
        return negativePattern.replace(/\(([^)]+)\)/, (_, contents) => {
          const formatted = applyFormatPattern({
            value: Math.abs(numValue),
            pattern: contents,
            config: mergedConfig,
          })
          return `(${formatted})`
        })
      }
      else {
        return applyFormatPattern({
          value: numValue,
          pattern: negativePattern,
          config: mergedConfig,
        })
      }
    }
  }

  // Create a new config based on pattern analysis
  const patternConfig: NumbersConfig = { ...mergedConfig }

  // Handle percentage format
  if (pattern.includes('%')) {
    const percentValue = numValue * 100
    const percentPattern = pattern.replace('%', '')

    // Determine decimal places for percentage
    if (percentPattern.includes('#0')) {
      // If #0% format (whole numbers only), set decimal places to 0
      if (!percentPattern.includes('.')) {
        patternConfig.decimalPlaces = 0
      }
    }

    return `${applyFormatPattern({
      value: percentValue,
      pattern: percentPattern,
      config: patternConfig,
    })}%`
  }

  // Handle scientific notation format (special handling needed)
  if (pattern.includes('E')) {
    // Determine decimal places from pattern
    const decimalMatch = pattern.match(/\.(0+)/)
    const decimalPlaces = decimalMatch ? decimalMatch[1].length : 3

    // Format using the custom scientific formatter
    return formatScientific(numValue, decimalPlaces)
  }

  // Handle custom format patterns
  if (pattern.startsWith('0') && pattern.includes('.')) {
    // Format like 0.00 - no grouping, fixed decimals
    patternConfig.digitGroupSeparator = ''

    // Set decimal places
    const decimalMatch = pattern.match(/\.(0+)/)
    if (decimalMatch) {
      patternConfig.decimalPlaces = decimalMatch[1].length
      patternConfig.allowDecimalPadding = true
    }

    return formatNumber({ value: numValue, config: patternConfig })
  }

  // Handle fixed decimal places with '0' placeholders
  if (pattern.includes('0')) {
    // Count decimal places after the decimal point
    const decimalMatch = pattern.match(/\.(0+)/)
    if (decimalMatch) {
      patternConfig.decimalPlaces = decimalMatch[1].length
      patternConfig.allowDecimalPadding = true
    }

    // For patterns like "0.00", disable digit grouping
    if (pattern.startsWith('0') && !pattern.includes('#') && !pattern.includes(',')) {
      patternConfig.digitGroupSeparator = ''
    }
  }

  // Handle variable decimal places with '#' placeholders
  if (pattern.includes('#')) {
    // Count maximum decimal places
    const decimalMatch = pattern.match(/\.(#+)/)
    if (decimalMatch) {
      patternConfig.decimalPlaces = decimalMatch[1].length
      patternConfig.allowDecimalPadding = false
    }

    // For simple patterns like '#.##' without commas, disable digit grouping
    if (pattern.match(/^#\.#+$/) || !pattern.includes(',')) {
      patternConfig.digitGroupSeparator = ''
    }
  }

  // Handle currency symbol
  if (pattern.includes('$')) {
    // If the pattern starts with the currency symbol, it's prefix placement
    patternConfig.currencySymbolPlacement = pattern.startsWith('$') ? 'p' : 's'

    // If we don't have a custom currency symbol in config, use $ as default
    if (!config.currencySymbol && !patternConfig.currencySymbol) {
      patternConfig.currencySymbol = '$'
    }

    // Special handling for negative currency values
    if (numValue < 0) {
      // For patterns like '-$#,##0.00', place negative sign before currency symbol
      patternConfig.negativePositiveSignPlacement = 'p'
    }
  }

  // Handle negative numbers with dash/parentheses
  if (numValue < 0) {
    if (pattern.includes('(') && pattern.includes(')')) {
      patternConfig.negativeBracketsTypeOnBlur = '(,)'
    }
    else if (pattern.includes('-')) {
      patternConfig.negativePositiveSignPlacement = 'p'
    }
  }

  // Handle sign display
  if (pattern.includes('+')) {
    patternConfig.showPositiveSign = true
  }

  // Format the value
  return formatNumber({ value: numValue, config: patternConfig })
}

/**
 * Predefined format patterns
 */
export const formatPatterns = {
  // Standard number formats
  decimal: '#,##0.##',

  // Currency formats
  currency: '$#,##0.00',
  currencyNoDecimal: '$#,##0',
  currencyEuro: '€#,##0.00',
  currencyPound: '£#,##0.00',
  currencyYen: '¥#,##0',

  // Percentage formats
  percent: '#,##0.00%',
  percentWhole: '#0%',

  // Accounting formats
  accounting: '$#,##0.00;($#,##0.00)',
  accountingParens: '$(#,##0.00)',
  accountingEuro: '€#,##0.00;(€#,##0.00)',
  accountingPound: '£#,##0.00;(£#,##0.00)',

  // Scientific notation
  scientific: '0.000E+00',
  scientificShort: '0.0E+0',

  // Custom presentation formats
  fixed2: '0.00',
  fixed4: '0.0000',
  integer: '#,##0',
  thousands: '#,##0,K',
  millions: '#,##0.0M',
  billions: '#,##0.0B',
}

/**
 * Apply a predefined format pattern
 */
export function applyPredefinedPattern({
  value,
  patternName,
  config = {},
}: {
  value: number | string
  patternName: keyof typeof formatPatterns
  config?: NumbersConfig
}): string {
  const pattern = formatPatterns[patternName]
  if (!pattern) {
    throw new Error(`Unknown format pattern: ${String(patternName)}`)
  }

  // Special handling for certain patterns
  const updatedConfig = { ...config }

  switch (patternName) {
    case 'currencyEuro':
      if (!config.currencySymbol) {
        updatedConfig.currencySymbol = '€'
      }
      break
    case 'currencyPound':
      if (!config.currencySymbol) {
        updatedConfig.currencySymbol = '£'
      }
      break
    case 'currencyYen':
      if (!config.currencySymbol) {
        updatedConfig.currencySymbol = '¥'
      }
      updatedConfig.decimalPlaces = 0
      break
    case 'percentWhole':
      updatedConfig.decimalPlaces = 0
      break
    case 'scientific':
    case 'scientificShort': {
      // Direct scientific formatter for these patterns
      const decimalPlaces = patternName === 'scientific' ? 3 : 1
      return formatScientific(
        typeof value === 'string' ? Number.parseFloat(value) : value,
        decimalPlaces,
      )
    }
    case 'accountingParens':
      // Special case for the parentheses format with currency symbol inside
      if (typeof value === 'string' ? Number.parseFloat(value) < 0 : value < 0) {
        const absValue = Math.abs(typeof value === 'string' ? Number.parseFloat(value) : value)
        const formattedAbs = applyFormatPattern({
          value: absValue,
          pattern: pattern.replace(/[()]/g, ''),
          config: updatedConfig,
        })
        return `$(${formattedAbs.replace('$', '')})`
      }
      break
    case 'fixed2':
    case 'fixed4':
      // Ensure no digit grouping for fixed patterns
      updatedConfig.digitGroupSeparator = ''
      break
  }

  return applyFormatPattern({ value, pattern, config: updatedConfig })
}
