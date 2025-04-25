import type { NumbersConfig } from '../src/types'
import { describe, expect, it } from 'bun:test'
import { formatNumber, parseNumber } from '../src'
import { formatTemperature } from '../src/specialized-formatter'

describe('Temperature Conversion', () => {
  describe('Direct Formatter Tests', () => {
    it('converts Celsius to Fahrenheit', () => {
      // Test common temperatures
      expect(Number.parseFloat(formatTemperature(0, 'C', 'F'))).toBeCloseTo(32)
      expect(Number.parseFloat(formatTemperature(100, 'C', 'F'))).toBeCloseTo(212)
      expect(Number.parseFloat(formatTemperature(37, 'C', 'F'))).toBeCloseTo(98.6, 1)
      expect(Number.parseFloat(formatTemperature(-40, 'C', 'F'))).toBeCloseTo(-40)
    })

    it('converts Fahrenheit to Celsius', () => {
      expect(Number.parseFloat(formatTemperature(32, 'F', 'C'))).toBeCloseTo(0)
      expect(Number.parseFloat(formatTemperature(212, 'F', 'C'))).toBeCloseTo(100)
      expect(Number.parseFloat(formatTemperature(98.6, 'F', 'C'))).toBeCloseTo(37, 1)
      expect(Number.parseFloat(formatTemperature(-40, 'F', 'C'))).toBeCloseTo(-40)
    })

    it('converts Celsius to Kelvin', () => {
      expect(Number.parseFloat(formatTemperature(0, 'C', 'K'))).toBeCloseTo(273.15)
      expect(Number.parseFloat(formatTemperature(100, 'C', 'K'))).toBeCloseTo(373.15)
      expect(Number.parseFloat(formatTemperature(-273.15, 'C', 'K'))).toBeCloseTo(0)
    })

    it('converts Kelvin to Celsius', () => {
      expect(Number.parseFloat(formatTemperature(273.15, 'K', 'C'))).toBeCloseTo(0)
      expect(Number.parseFloat(formatTemperature(373.15, 'K', 'C'))).toBeCloseTo(100)
      expect(Number.parseFloat(formatTemperature(0, 'K', 'C'))).toBeCloseTo(-273.15)
    })

    it('converts Fahrenheit to Kelvin', () => {
      expect(Number.parseFloat(formatTemperature(32, 'F', 'K'))).toBeCloseTo(273.15)
      expect(Number.parseFloat(formatTemperature(212, 'F', 'K'))).toBeCloseTo(373.15)
    })

    it('converts Kelvin to Fahrenheit', () => {
      expect(Number.parseFloat(formatTemperature(273.15, 'K', 'F'))).toBeCloseTo(32)
      expect(Number.parseFloat(formatTemperature(373.15, 'K', 'F'))).toBeCloseTo(212)
      expect(Number.parseFloat(formatTemperature(0, 'K', 'F'))).toBeCloseTo(-459.67)
    })

    it('handles string inputs correctly', () => {
      expect(Number.parseFloat(formatTemperature('0', 'C', 'F'))).toBeCloseTo(32)
      expect(Number.parseFloat(formatTemperature('32', 'F', 'C'))).toBeCloseTo(0)
      expect(Number.parseFloat(formatTemperature('273.15', 'K', 'C'))).toBeCloseTo(0)
    })

    it('handles same unit conversion (no-op)', () => {
      expect(formatTemperature(100, 'C', 'C')).toBe('100')
      expect(formatTemperature(32, 'F', 'F')).toBe('32')
      expect(formatTemperature(273.15, 'K', 'K')).toBe('273.15')
    })

    it('handles undefined or null target unit', () => {
      expect(formatTemperature(100, 'C', null)).toBe('100')
      expect(formatTemperature(32, 'F', undefined)).toBe('32')
    })
  })

  describe('Integration with Numbers Class', () => {
    it('formats temperatures using config', () => {
      // Celsius to Fahrenheit
      const celsiusConfig: NumbersConfig = {
        isSpecializedType: 'temperature',
        specializedOptions: {
          temperatureUnit: 'C',
          convertTempTo: 'F',
        },
        decimalPlaces: 1,
        suffixText: ' °F',
      }

      expect(formatNumber({ value: 0, config: celsiusConfig })).toBe('32.0 °F')
      expect(formatNumber({ value: 100, config: celsiusConfig })).toBe('212.0 °F')
      expect(formatNumber({ value: 37, config: celsiusConfig })).toBe('98.6 °F')

      // Fahrenheit to Celsius
      const fahrenheitConfig: NumbersConfig = {
        isSpecializedType: 'temperature',
        specializedOptions: {
          temperatureUnit: 'F',
          convertTempTo: 'C',
        },
        decimalPlaces: 1,
        suffixText: ' °C',
      }

      expect(formatNumber({ value: 32, config: fahrenheitConfig })).toBe('0.0 °C')
      expect(formatNumber({ value: 212, config: fahrenheitConfig })).toBe('100.0 °C')
      expect(formatNumber({ value: 98.6, config: fahrenheitConfig })).toBe('37.0 °C')

      // Kelvin configuration
      const kelvinConfig: NumbersConfig = {
        isSpecializedType: 'temperature',
        specializedOptions: {
          temperatureUnit: 'C',
          convertTempTo: 'K',
        },
        decimalPlaces: 2,
        suffixText: ' K',
      }

      expect(formatNumber({ value: 0, config: kelvinConfig })).toBe('273.15 K')
      expect(formatNumber({ value: 100, config: kelvinConfig })).toBe('373.15 K')
    })

    it('parses temperatures correctly', () => {
      // Celsius to Fahrenheit
      const celsiusConfig: NumbersConfig = {
        isSpecializedType: 'temperature',
        specializedOptions: {
          temperatureUnit: 'C',
          convertTempTo: 'F',
        },
        suffixText: ' °F',
      }

      // When parsing, we get back the original value before conversion
      expect(parseNumber({ value: '32.0 °F', config: celsiusConfig })).toBeCloseTo(0)
      expect(parseNumber({ value: '212.0 °F', config: celsiusConfig })).toBeCloseTo(100)

      // Fahrenheit to Celsius
      const fahrenheitConfig: NumbersConfig = {
        isSpecializedType: 'temperature',
        specializedOptions: {
          temperatureUnit: 'F',
          convertTempTo: 'C',
        },
        suffixText: ' °C',
      }

      expect(parseNumber({ value: '0.0 °C', config: fahrenheitConfig })).toBeCloseTo(32)
      expect(parseNumber({ value: '100.0 °C', config: fahrenheitConfig })).toBeCloseTo(212)
    })
  })

  describe('Edge Cases and Precision', () => {
    it('handles extreme temperatures', () => {
      // Absolute zero
      expect(Number.parseFloat(formatTemperature(-273.15, 'C', 'K'))).toBeCloseTo(0)
      expect(Number.parseFloat(formatTemperature(0, 'K', 'C'))).toBeCloseTo(-273.15)

      // Very high temperatures
      expect(Number.parseFloat(formatTemperature(1000000, 'C', 'F'))).toBeCloseTo(1800032)
      expect(Number.parseFloat(formatTemperature(1000000, 'C', 'K'))).toBeCloseTo(1000273.15)
    })

    it('maintains proper precision', () => {
      // Test with more decimal places
      expect(Number.parseFloat(formatTemperature(37.53, 'C', 'F'))).toBeCloseTo(99.554)
      expect(Number.parseFloat(formatTemperature(98.76, 'F', 'C'))).toBeCloseTo(37.09, 2)
    })

    it('handles invalid temperatures', () => {
      // Below absolute zero in Kelvin (should be clamped)
      expect(Number.parseFloat(formatTemperature(-1, 'K', 'C'))).toBeCloseTo(-274.15)

      // Temperature with invalid string characters
      expect(formatTemperature('abc', 'C', 'F')).toBe('NaN')
      expect(formatTemperature('', 'C', 'F')).toBe('NaN')
    })
  })
})
