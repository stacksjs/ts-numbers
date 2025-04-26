import type { FormatNumberOptions, NumbersConfig, ParseNumberOptions } from './types'
import { formatNumber, parseNumber } from './format'

/**
 * Bulk format an array of numbers with the same configuration
 * Useful for performance testing and bulk operations
 * @param values - Array of number values to format
 * @param config - Optional configuration to apply to all numbers
 * @returns Array of formatted strings
 */
export function bulkFormat(values: (number | string)[], config?: NumbersConfig): string[] {
  return values.map(value => formatNumber({ value, config }))
}

/**
 * Bulk parse an array of string values with the same configuration
 * Useful for performance testing and bulk operations
 * @param values - Array of string values to parse
 * @param config - Optional configuration to apply to all parsings
 * @returns Array of parsed numbers
 */
export function bulkParse(values: string[], config?: NumbersConfig): number[] {
  return values.map(value => parseNumber({ value, config }))
}

/**
 * Measure the performance of bulk formatting
 * @param values - Array of values to format
 * @param config - Optional configuration
 * @returns Performance metrics
 */
export function measureFormatPerformance(values: (number | string)[], config?: NumbersConfig): {
  totalTime: number
  averageTime: number
  operationsPerSecond: number
  results: string[]
} {
  const start = performance.now()
  const results = bulkFormat(values, config)
  const end = performance.now()

  const totalTime = end - start
  const averageTime = totalTime / values.length
  const operationsPerSecond = Math.floor(1000 / averageTime)

  return {
    totalTime,
    averageTime,
    operationsPerSecond,
    results,
  }
}

/**
 * Measure the performance of bulk parsing
 * @param values - Array of strings to parse
 * @param config - Optional configuration
 * @returns Performance metrics
 */
export function measureParsePerformance(values: string[], config?: NumbersConfig): {
  totalTime: number
  averageTime: number
  operationsPerSecond: number
  results: number[]
} {
  const start = performance.now()
  const results = bulkParse(values, config)
  const end = performance.now()

  const totalTime = end - start
  const averageTime = totalTime / values.length
  const operationsPerSecond = Math.floor(1000 / averageTime)

  return {
    totalTime,
    averageTime,
    operationsPerSecond,
    results,
  }
}

/**
 * Generate an array of large numbers for performance testing
 * @param count - Number of values to generate
 * @param startValue - Starting value (default: 1,000,000)
 * @param multiplier - Multiplier for each successive value (default: 10)
 * @returns Array of large numbers
 */
export function generateLargeNumbers(
  count: number,
  startValue = 1_000_000,
  multiplier = 10,
): number[] {
  return Array.from(
    { length: count },
    (_, i) => startValue * (multiplier ** Math.floor(i / 5)),
  )
}
