// Config and types
import { Numbers } from './numbers'

export { config, defaultConfig } from './config'

// Utility functions
export { formatNumber, parseNumber, roundNumber } from './format'
export {
  applyFormatPattern,
  applyPredefinedPattern,
  formatPatterns,
} from './format-patterns'
// Main class
export { Numbers } from './numbers'

// Performance utilities
export {
  bulkFormat,
  bulkParse,
  generateLargeNumbers,
  measureFormatPerformance,
  measureParsePerformance,
} from './performance'
// Presets
export {
  // Internationalization formats
  arabicEG,
  arabicSA,

  chineseCN,
  chineseCNWithCurrency,

  // Utility
  createUnitConverter,
  // Credit Card
  creditCard,
  frenchFR,
  hebrewIL,
  hebrewILWithCurrency,
  hindiIN,
  indianIN,
  // IP Address
  ipAddress,
  japaneseJP,
  lengthCm,
  lengthFeet,

  // Lengths
  lengthMeters,
  // Percentage
  percentageFormat,
  phoneInternational,
  // Phone numbers
  phoneUS,

  swedishSE,
  swissCH,
  // Temperatures
  tempCelsius,

  tempFahrenheit,

  tempKelvin,
  // Time
  time12h,

  time24h,

  // Weights
  weightKg,

  weightLbs,
} from './presets'

export {
  formatCreditCard,
  formatIPAddress,
  formatLength,
  formatPhoneNumber,
  formatTemperature,
  formatTime,
  formatWeight,
} from './specialized-formatter'

export type {
  CurrencyConfig,
  FormatNumberOptions,
  KeyboardShortcuts,
  NumbersConfig,
  NumbersInstance,
  ParseNumberOptions,
  RoundingMethod,
  SpecializedNumberOptions,
  SpecializedNumberType,
  StyleRuleCallback,
  StyleRuleRange,
  StyleRulesOption,
} from './types'

export default Numbers
