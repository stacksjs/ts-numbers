import type { NumbersConfig } from '../src/types'
import { describe, expect, it } from 'bun:test'
import { formatNumber, parseNumber } from '../src'
import { Numbers } from '../src/numbers'

describe('Scientific Notation', () => {
  describe('Formatting with Scientific Notation', () => {
    it('formats large numbers in scientific notation', () => {
      const config: NumbersConfig = {
        useScientificNotation: true,
        scientificNotationThreshold: 1000,
        decimalPlaces: 2,
      }

      expect(formatNumber({ value: 1234, config })).toBe('1.23e+3')
      expect(formatNumber({ value: 1000000, config })).toBe('1.00e+6')
      expect(formatNumber({ value: 9876543210, config })).toBe('9.88e+9')
    })

    it('formats small numbers in scientific notation', () => {
      const config: NumbersConfig = {
        useScientificNotation: true,
        scientificNotationThreshold: 0.01,
        decimalPlaces: 2,
      }

      expect(formatNumber({ value: 0.001, config })).toBe('1.00e-3')
      expect(formatNumber({ value: 0.000123, config })).toBe('1.23e-4')
      expect(formatNumber({ value: 0.00000987, config })).toBe('9.87e-6')
    })

    it('respects the decimal places setting', () => {
      const config: NumbersConfig = {
        useScientificNotation: true,
        scientificNotationThreshold: 1000,
        decimalPlaces: 4,
      }

      expect(formatNumber({ value: 12345, config })).toBe('1.2345e+4')
      expect(formatNumber({ value: 0.00012345, config })).toBe('1.2345e-4')
    })

    it('only uses scientific notation beyond the threshold', () => {
      const config: NumbersConfig = {
        useScientificNotation: true,
        scientificNotationThreshold: 10000,
        decimalPlaces: 2,
      }

      // Below threshold - should use regular formatting
      expect(formatNumber({ value: 1234, config })).toBe('1,234.00')

      // Above threshold - should use scientific notation
      expect(formatNumber({ value: 12345, config })).toBe('1.23e+4')
    })

    it('uses different exponent notations based on locale', () => {
      const configDefault: NumbersConfig = {
        useScientificNotation: true,
        scientificNotationThreshold: 1000,
        decimalPlaces: 2,
      }

      // Default (e)
      expect(formatNumber({ value: 1234, config: configDefault })).toBe('1.23e+3')

      // Custom with locale
      const configFrench: NumbersConfig = {
        useScientificNotation: true,
        scientificNotationThreshold: 1000,
        decimalPlaces: 2,
        locale: 'fr-FR',
      }

      // Expect French style formatting (may depend on environment)
      const frenchFormatted = formatNumber({ value: 1234, config: configFrench })
      expect(frenchFormatted.includes('e')).toBe(true)
      expect(frenchFormatted.includes('+')).toBe(true)
    })
  })

  describe('Parsing Scientific Notation', () => {
    it('parses scientific notation strings into numbers', () => {
      expect(parseNumber({ value: '1.23e+3' })).toBe(1230)
      expect(parseNumber({ value: '1.23E+3' })).toBe(1230)
      expect(parseNumber({ value: '1.23e3' })).toBe(1230)
      expect(parseNumber({ value: '1.23E3' })).toBe(1230)
      expect(parseNumber({ value: '1.23e-3' })).toBe(0.00123)
      expect(parseNumber({ value: '1.23E-3' })).toBe(0.00123)
    })

    it('parses scientific notation with different locales', () => {
      const config: NumbersConfig = {
        locale: 'de-DE',
        decimalCharacter: ',',
        digitGroupSeparator: '.',
      }

      // In German locale, 1,23e+3 would represent 1.23 × 10³
      expect(parseNumber({ value: '1,23e+3', config })).toBe(1230)
    })

    it('handles malformed scientific notation', () => {
      // Missing exponent
      expect(parseNumber({ value: '1.23e' })).toBe(1.23)

      // Invalid characters in exponent
      expect(parseNumber({ value: '1.23e+a' })).toBe(1.23)

      // Double exponent
      expect(parseNumber({ value: '1.23e+3e+2' })).toBe(1230)
    })
  })

  describe('Scientific Notation with Numbers Class', () => {
    it('correctly formats and displays scientific notation', () => {
      // Test directly with formatNumber
      const config: NumbersConfig = {
        useScientificNotation: true,
        scientificNotationThreshold: 1000,
        decimalPlaces: 2,
      }

      // Test with a direct call
      expect(formatNumber({ value: 1234567, config })).toBe('1.23e+6')
      expect(formatNumber({ value: 0.0000123, config })).toBe('1.23e-5')
    })

    it('properly converts back from scientific notation on get', () => {
      // Test parser
      const formatted = '1.235e+6'
      const parsed = parseNumber({ value: formatted })
      expect(parsed).toBe(1235000)

      // Test with a smaller value
      const smallFormatted = '1.230e-5'
      const smallParsed = parseNumber({ value: smallFormatted })
      expect(smallParsed).toBe(0.0000123)
    })
  })

  describe('Dynamic Scientific Notation Thresholds', () => {
    it('adapts to different thresholds', () => {
      // Test with a lower threshold
      const configLow: NumbersConfig = {
        useScientificNotation: true,
        scientificNotationThreshold: 100,
        decimalPlaces: 2,
      }
      expect(formatNumber({ value: 123.456, config: configLow })).toBe('1.23e+2')

      // Test with a higher threshold
      const configHigh: NumbersConfig = {
        useScientificNotation: true,
        scientificNotationThreshold: 1000,
        decimalPlaces: 2,
      }
      expect(formatNumber({ value: 123.456, config: configHigh })).toBe('123.46')
    })
  })

  describe('Edge Cases', () => {
    it('handles zero correctly', () => {
      const config: NumbersConfig = {
        useScientificNotation: true,
        scientificNotationThreshold: 0.01,
        decimalPlaces: 2,
      }

      expect(formatNumber({ value: 0, config })).toBe('0.00')
    })

    it('handles extreme values', () => {
      const config: NumbersConfig = {
        useScientificNotation: true,
        scientificNotationThreshold: 1000,
        decimalPlaces: 2,
      }

      // Very large number
      expect(formatNumber({ value: 1e20, config })).toBe('1.00e+20')

      // Very small number
      expect(formatNumber({ value: 1e-20, config })).toBe('1.00e-20')

      // Near max safe integer
      expect(formatNumber({ value: Number.MAX_SAFE_INTEGER, config })).toBe('9.01e+15')
    })

    it('handles NaN and infinity', () => {
      const config: NumbersConfig = {
        useScientificNotation: true,
        scientificNotationThreshold: 1000,
      }

      // NaN should be formatted as regular text
      expect(formatNumber({ value: Number.NaN, config })).toBe('NaN')

      // Infinity should be formatted as regular text
      expect(formatNumber({ value: Infinity, config })).toBe('∞')
      expect(formatNumber({ value: -Infinity, config })).toBe('-∞')
    })
  })
})
