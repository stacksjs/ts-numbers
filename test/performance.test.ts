import type { NumbersConfig } from '../src/types'
import { describe, expect, it } from 'bun:test'
import { formatNumber, parseNumber } from '../src'
import { bulkFormat, bulkParse, generateLargeNumbers, measureFormatPerformance, measureParsePerformance } from '../src/performance'

describe('Performance Tests', () => {
  describe('Large Number Formatting', () => {
    it('formats billion-scale numbers correctly', () => {
      const billions = 1_234_567_890_123
      const result = formatNumber({ value: billions })
      expect(result).toBe('1,234,567,890,123.00')
    })

    it('formats trillion-scale numbers correctly', () => {
      const trillions = 1_234_567_890_123_456
      const result = formatNumber({ value: trillions })
      expect(result).toBe('1,234,567,890,123,456.00')
    })

    it('formats quadrillion-scale numbers correctly', () => {
      // Using BigInt for precision, then converting to number for the API
      const quadrillions = Number(1_234_567_890_123_456_789n)
      const result = formatNumber({ value: quadrillions })
      // Due to JS Number precision limitations, the value is rounded
      expect(result).toBe('1,234,567,890,123,456,800.00')
    })

    it('measures performance for formatting large numbers', () => {
      const testSizes = [
        { name: 'Million', value: 1_234_567_890 },
        { name: 'Billion', value: 1_234_567_890_123 },
        { name: 'Trillion', value: 1_234_567_890_123_456 },
      ]

      // Using the .forEach syntax to limit linter warnings for console logs
      testSizes.forEach(({ name, value }) => {
        const start = performance.now()
        const result = formatNumber({ value })
        const end = performance.now()

        // We're allowing these logs in tests to display performance metrics
        // eslint-disable-next-line no-console
        console.log(`Testing ${name} formatting:`)
        // eslint-disable-next-line no-console
        console.log(`- Formatted result: ${result}`)
        // eslint-disable-next-line no-console
        console.log(`- Time taken: ${(end - start).toFixed(4)}ms`)

        // Ensure execution time is reasonable (adjust threshold as needed)
        expect(end - start).toBeLessThan(10) // Should format in under 10ms
      })
    })

    it('measures performance for parsing large numbers', () => {
      const testSizes = [
        { name: 'Million', value: '1,234,567,890.00' },
        { name: 'Billion', value: '1,234,567,890,123.00' },
        { name: 'Trillion', value: '1,234,567,890,123,456.00' },
      ]

      testSizes.forEach(({ name, value }) => {
        const start = performance.now()
        const result = parseNumber({ value })
        const end = performance.now()

        // eslint-disable-next-line no-console
        console.log(`Testing ${name} parsing:`)
        // eslint-disable-next-line no-console
        console.log(`- Parsed result: ${result}`)
        // eslint-disable-next-line no-console
        console.log(`- Time taken: ${(end - start).toFixed(4)}ms`)

        // Ensure execution time is reasonable
        expect(end - start).toBeLessThan(10) // Should parse in under 10ms
      })
    })

    it('handles numbers with scientific notation correctly', () => {
      const largeNumber = 1e20
      const result = formatNumber({
        value: largeNumber,
        config: {
          useScientificNotation: false,
          decimalPlaces: 0,
        },
      })

      expect(result).toBe('100,000,000,000,000,000,000')

      const scientificResult = formatNumber({
        value: largeNumber,
        config: {
          useScientificNotation: true,
          scientificNotationThreshold: 1e10,
        },
      })

      expect(scientificResult).toInclude('1.00e+20')
    })
  })

  describe('Bulk Formatting Performance', () => {
    it('measures performance for bulk formatting operations using utility functions', () => {
      const count = 10000
      const numbers = Array.from({ length: count }, (_, i) => i * 1000 + 0.5678)

      // Using the performance measurement utility
      const { totalTime, averageTime, operationsPerSecond } = measureFormatPerformance(numbers)

      // eslint-disable-next-line no-console
      console.log(`Formatting ${count} numbers with utility:`)
      // eslint-disable-next-line no-console
      console.log(`- Total time: ${totalTime.toFixed(2)}ms`)
      // eslint-disable-next-line no-console
      console.log(`- Average time per number: ${averageTime.toFixed(4)}ms`)
      // eslint-disable-next-line no-console
      console.log(`- Numbers per second: ${operationsPerSecond.toLocaleString()}`)

      // Performance assertions (adjust thresholds based on actual performance)
      expect(averageTime).toBeLessThan(0.1) // Average under 0.1ms per number
    })

    it('measures performance for bulk parsing operations using utility functions', () => {
      const count = 10000
      const strings = Array.from({ length: count }, (_, i) => `${i * 1000 + 0.5678}`)

      // Using the performance measurement utility
      const { totalTime, averageTime, operationsPerSecond } = measureParsePerformance(strings)

      // eslint-disable-next-line no-console
      console.log(`Parsing ${count} numbers with utility:`)
      // eslint-disable-next-line no-console
      console.log(`- Total time: ${totalTime.toFixed(2)}ms`)
      // eslint-disable-next-line no-console
      console.log(`- Average time per number: ${averageTime.toFixed(4)}ms`)
      // eslint-disable-next-line no-console
      console.log(`- Numbers per second: ${operationsPerSecond.toLocaleString()}`)

      // Performance assertions
      expect(averageTime).toBeLessThan(0.1) // Average under 0.1ms per number
    })

    it('tests performance with generated large numbers', () => {
      // Generate an array of large numbers from 1 million to 1 trillion
      const largeNumbers = generateLargeNumbers(20, 1_000_000, 100)

      // eslint-disable-next-line no-console
      console.log('Testing with generated large numbers:')
      // eslint-disable-next-line no-console
      console.log(`- Sample values: ${largeNumbers.slice(0, 3).join(', ')}...`)

      const { totalTime, averageTime, operationsPerSecond } = measureFormatPerformance(largeNumbers)

      // eslint-disable-next-line no-console
      console.log(`- Total time: ${totalTime.toFixed(2)}ms`)
      // eslint-disable-next-line no-console
      console.log(`- Average time per number: ${averageTime.toFixed(4)}ms`)
      // eslint-disable-next-line no-console
      console.log(`- Numbers per second: ${operationsPerSecond.toLocaleString()}`)

      expect(averageTime).toBeLessThan(1) // Large numbers should still format under 1ms
    })

    it('compares performance with different configurations', () => {
      const count = 1000
      const number = 1234567.89

      // eslint-disable-next-line no-console
      console.log('Performance comparison with different configurations:')

      // Create typed arrays of numbers
      const numbers = Array.from({ length: count }, () => number)

      // Test with default config
      const { totalTime: defaultTime } = measureFormatPerformance(numbers)

      // Test with scientific notation
      const { totalTime: scientificTime } = measureFormatPerformance(numbers, {
        useScientificNotation: true,
      })

      // Test with digit group spacing
      const { totalTime: digitGroupTime } = measureFormatPerformance(numbers, {
        digitGroupSpacing: '2',
      })

      // eslint-disable-next-line no-console
      console.log(`- Default config: ${defaultTime.toFixed(2)}ms for ${count} operations`)
      // eslint-disable-next-line no-console
      console.log(`- Scientific notation: ${scientificTime.toFixed(2)}ms for ${count} operations`)
      // eslint-disable-next-line no-console
      console.log(`- Custom digit grouping: ${digitGroupTime.toFixed(2)}ms for ${count} operations`)
    })
  })

  describe('Edge Cases Performance', () => {
    it('handles the maximum safe integer correctly', () => {
      const maxSafeInt = Number.MAX_SAFE_INTEGER // 9,007,199,254,740,991
      const result = formatNumber({ value: maxSafeInt, config: { decimalPlaces: 0 } })
      expect(result).toBe('9,007,199,254,740,991')
    })

    it('measures performance with special formatting requirements', () => {
      const count = 1000
      const number = 1234567.89

      // Test with highly customized config
      const customConfig: NumbersConfig = {
        decimalPlaces: 4,
        decimalCharacter: ',',
        digitGroupSeparator: '.',
        currencySymbol: '€',
        currencySymbolPlacement: 'p',
        showPositiveSign: true,
        // Add other custom settings
      }

      // Create a properly typed array of numbers
      const numbers = Array.from({ length: count }, () => number)
      const { totalTime } = measureFormatPerformance(numbers, customConfig)

      // eslint-disable-next-line no-console
      console.log(`Custom config performance: ${totalTime.toFixed(2)}ms for ${count} operations`)
      expect(totalTime).toBeLessThan(1000) // Should complete in reasonable time
    })

    it('tests bulk formatting and parsing utility functions', () => {
      const testNumbers = [123, 456.78, 9000, 12345.6789]

      // Test bulkFormat
      const formattedNumbers = bulkFormat(testNumbers)
      expect(formattedNumbers).toHaveLength(testNumbers.length)
      expect(formattedNumbers[0]).toBe('123.00')
      expect(formattedNumbers[1]).toBe('456.78')

      // Test bulkParse
      const parsedNumbers = bulkParse(formattedNumbers)
      expect(parsedNumbers).toHaveLength(formattedNumbers.length)
      expect(parsedNumbers[0]).toBe(123)
      expect(parsedNumbers[1]).toBe(456.78)
    })
  })
})
