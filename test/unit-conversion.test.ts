import { describe, expect, it } from 'bun:test'
import {
  createUnitConverter,
  formatLength,
  formatNumber,
  formatTemperature,
  formatWeight,
  parseNumber,
} from '../src'

describe('Weight Unit Conversions', () => {
  it('converts kilograms to pounds', () => {
    // 1 kg = 2.20462 lb
    expect(Number.parseFloat(formatWeight(1, 'kg', 'lb'))).toBeCloseTo(2.20462, 4)
    expect(Number.parseFloat(formatWeight(10, 'kg', 'lb'))).toBeCloseTo(22.0462, 4)
    expect(Number.parseFloat(formatWeight(100, 'kg', 'lb'))).toBeCloseTo(220.462, 3)

    // Test with converter config
    const kgToLbConfig = createUnitConverter('kg', 'lb')
    expect(Number.parseFloat(formatNumber({ value: 1, config: kgToLbConfig }).replace(/[^\d.-]/g, ''))).toBeCloseTo(2.20462, 4)
  })

  it('converts pounds to kilograms', () => {
    // 1 lb = 0.453592 kg
    expect(Number.parseFloat(formatWeight(1, 'lb', 'kg'))).toBeCloseTo(0.453592, 5)
    expect(Number.parseFloat(formatWeight(10, 'lb', 'kg'))).toBeCloseTo(4.53592, 4)
    expect(Number.parseFloat(formatWeight(100, 'lb', 'kg'))).toBeCloseTo(45.3592, 3)

    // Test with converter config
    const lbToKgConfig = createUnitConverter('lb', 'kg')
    expect(Number.parseFloat(formatNumber({ value: 100, config: lbToKgConfig }).replace(/[^\d.-]/g, ''))).toBeCloseTo(45.3592, 3)
  })

  it('converts between other weight units', () => {
    // 1 kg = 1000 g
    expect(Number.parseFloat(formatWeight(1, 'kg', 'g'))).toBe(1000)
    expect(Number.parseFloat(formatWeight(1000, 'g', 'kg'))).toBe(1)

    // 1 lb = 16 oz
    expect(Number.parseFloat(formatWeight(1, 'lb', 'oz'))).toBe(16)
    expect(Number.parseFloat(formatWeight(16, 'oz', 'lb'))).toBe(1)
  })
})

describe('Length Unit Conversions', () => {
  it('converts meters to feet', () => {
    // 1 m = 3.28084 ft
    expect(Number.parseFloat(formatLength(1, 'm', 'ft'))).toBeCloseTo(3.28084, 4)
    expect(Number.parseFloat(formatLength(10, 'm', 'ft'))).toBeCloseTo(32.8084, 3)
    expect(Number.parseFloat(formatLength(100, 'm', 'ft'))).toBeCloseTo(328.084, 2)

    // Test with converter config
    const mToFtConfig = createUnitConverter('m', 'ft')
    expect(Number.parseFloat(formatNumber({ value: 1, config: mToFtConfig }).replace(/[^\d.-]/g, ''))).toBeCloseTo(3.28084, 4)
  })

  it('converts feet to meters', () => {
    // 1 ft = 0.3048 m
    expect(Number.parseFloat(formatLength(1, 'ft', 'm'))).toBeCloseTo(0.3048, 4)
    expect(Number.parseFloat(formatLength(10, 'ft', 'm'))).toBeCloseTo(3.048, 3)
    expect(Number.parseFloat(formatLength(100, 'ft', 'm'))).toBeCloseTo(30.48, 2)

    // Test with converter config
    const ftToMConfig = createUnitConverter('ft', 'm')
    expect(Number.parseFloat(formatNumber({ value: 100, config: ftToMConfig }).replace(/[^\d.-]/g, ''))).toBeCloseTo(30.48, 2)
  })

  it('converts between other length units', () => {
    // 1 m = 100 cm
    expect(Number.parseFloat(formatLength(1, 'm', 'cm'))).toBe(100)
    expect(Number.parseFloat(formatLength(100, 'cm', 'm'))).toBe(1)

    // 1 m = 1000 mm
    expect(Number.parseFloat(formatLength(1, 'm', 'mm'))).toBe(1000)
    expect(Number.parseFloat(formatLength(1000, 'mm', 'm'))).toBe(1)

    // 1 km = 1000 m
    expect(Number.parseFloat(formatLength(1, 'km', 'm'))).toBe(1000)
    expect(Number.parseFloat(formatLength(1000, 'm', 'km'))).toBe(1)

    // 1 ft = 12 in
    expect(Number.parseFloat(formatLength(1, 'ft', 'in'))).toBe(12)
    expect(Number.parseFloat(formatLength(12, 'in', 'ft'))).toBe(1)

    // 1 yd = 3 ft
    expect(Number.parseFloat(formatLength(1, 'yd', 'ft'))).toBe(3)
    expect(Number.parseFloat(formatLength(3, 'ft', 'yd'))).toBe(1)

    // 1 mi = 5280 ft
    expect(Number.parseFloat(formatLength(1, 'mi', 'ft'))).toBe(5280)
    expect(Number.parseFloat(formatLength(5280, 'ft', 'mi'))).toBe(1)
  })
})

describe('Temperature Unit Conversions', () => {
  it('converts Celsius to Fahrenheit', () => {
    // C to F: (C × 9/5) + 32
    expect(Number.parseFloat(formatTemperature(0, 'C', 'F'))).toBeCloseTo(32, 1)
    expect(Number.parseFloat(formatTemperature(100, 'C', 'F'))).toBeCloseTo(212, 1)
    expect(Number.parseFloat(formatTemperature(-40, 'C', 'F'))).toBeCloseTo(-40, 1) // Interesting case: -40°C = -40°F

    // Test with converter config
    const cToFConfig = createUnitConverter('C', 'F')
    expect(Number.parseFloat(formatNumber({ value: 100, config: cToFConfig }).replace(/[^\d.-]/g, ''))).toBeCloseTo(212, 1)
  })

  it('converts Fahrenheit to Celsius', () => {
    // F to C: (F − 32) × 5/9
    expect(Number.parseFloat(formatTemperature(32, 'F', 'C'))).toBeCloseTo(0, 1)
    expect(Number.parseFloat(formatTemperature(212, 'F', 'C'))).toBeCloseTo(100, 1)
    expect(Number.parseFloat(formatTemperature(-40, 'F', 'C'))).toBeCloseTo(-40, 1)

    // Test with converter config
    const fToCConfig = createUnitConverter('F', 'C')
    expect(Number.parseFloat(formatNumber({ value: 32, config: fToCConfig }).replace(/[^\d.-]/g, ''))).toBeCloseTo(0, 1)
  })

  it('converts Celsius to Kelvin', () => {
    // C to K: C + 273.15
    expect(Number.parseFloat(formatTemperature(0, 'C', 'K'))).toBeCloseTo(273.15, 2)
    expect(Number.parseFloat(formatTemperature(100, 'C', 'K'))).toBeCloseTo(373.15, 2)
    expect(Number.parseFloat(formatTemperature(-273.15, 'C', 'K'))).toBeCloseTo(0, 2) // Absolute zero

    // Test with converter config
    const cToKConfig = createUnitConverter('C', 'K')
    expect(Number.parseFloat(formatNumber({ value: 0, config: cToKConfig }).replace(/[^\d.-]/g, ''))).toBeCloseTo(273.15, 2)
  })

  it('converts Kelvin to Celsius', () => {
    // K to C: K - 273.15
    expect(Number.parseFloat(formatTemperature(273.15, 'K', 'C'))).toBeCloseTo(0, 2)
    expect(Number.parseFloat(formatTemperature(373.15, 'K', 'C'))).toBeCloseTo(100, 2)
    expect(Number.parseFloat(formatTemperature(0, 'K', 'C'))).toBeCloseTo(-273.15, 2)

    // Test with converter config
    const kToCConfig = createUnitConverter('K', 'C')
    expect(Number.parseFloat(formatNumber({ value: 273.15, config: kToCConfig }).replace(/[^\d.-]/g, ''))).toBeCloseTo(0, 2)
  })

  it('converts Fahrenheit to Kelvin', () => {
    // F to K: (F − 32) × 5/9 + 273.15
    expect(Number.parseFloat(formatTemperature(32, 'F', 'K'))).toBeCloseTo(273.15, 2)
    expect(Number.parseFloat(formatTemperature(212, 'F', 'K'))).toBeCloseTo(373.15, 2)

    // Test with converter config
    const fToKConfig = createUnitConverter('F', 'K')
    expect(Number.parseFloat(formatNumber({ value: 32, config: fToKConfig }).replace(/[^\d.-]/g, ''))).toBeCloseTo(273.15, 2)
  })

  it('converts Kelvin to Fahrenheit', () => {
    // K to F: (K − 273.15) × 9/5 + 32
    expect(Number.parseFloat(formatTemperature(273.15, 'K', 'F'))).toBeCloseTo(32, 1)
    expect(Number.parseFloat(formatTemperature(373.15, 'K', 'F'))).toBeCloseTo(212, 1)

    // Test with converter config
    const kToFConfig = createUnitConverter('K', 'F')
    expect(Number.parseFloat(formatNumber({ value: 273.15, config: kToFConfig }).replace(/[^\d.-]/g, ''))).toBeCloseTo(32, 1)
  })
})

describe('Unit Converter Configuration', () => {
  it('creates proper weight converter configurations', () => {
    const kgToLbConfig = createUnitConverter('kg', 'lb')
    expect(kgToLbConfig.isSpecializedType).toBe('weight')
    expect(kgToLbConfig.specializedOptions?.weightUnit).toBe('kg')
    expect(kgToLbConfig.specializedOptions?.convertWeightTo).toBe('lb')
    expect(kgToLbConfig.suffixText).toBe(' kg → lb')
  })

  it('creates proper length converter configurations', () => {
    const mToFtConfig = createUnitConverter('m', 'ft')
    expect(mToFtConfig.isSpecializedType).toBe('length')
    expect(mToFtConfig.specializedOptions?.lengthUnit).toBe('m')
    expect(mToFtConfig.specializedOptions?.convertLengthTo).toBe('ft')
    expect(mToFtConfig.suffixText).toBe(' m → ft')
  })

  it('creates proper temperature converter configurations', () => {
    const cToFConfig = createUnitConverter('C', 'F')
    expect(cToFConfig.isSpecializedType).toBe('temperature')
    expect(cToFConfig.specializedOptions?.temperatureUnit).toBe('C')
    expect(cToFConfig.specializedOptions?.convertTempTo).toBe('F')
    expect(cToFConfig.suffixText).toBe(' °C → °F')
  })
})

describe('Integration with Parse and Format', () => {
  it('formats and parses weight converter output', () => {
    const kgToLbConfig = createUnitConverter('kg', 'lb')
    const formattedValue = formatNumber({ value: 10, config: kgToLbConfig })

    // Removing the suffix and converter notation to get the raw number
    const numericString = formattedValue.replace(/ kg → lb$/, '').trim()

    // Should still be around 22.05
    expect(Number.parseFloat(numericString)).toBeCloseTo(22.05, 2)

    // The parser should extract the numeric value
    expect(parseNumber({ value: formattedValue, config: kgToLbConfig })).toBeCloseTo(22.05, 2)
  })

  it('formats and parses temperature converter output', () => {
    const cToFConfig = createUnitConverter('C', 'F')
    const formattedValue = formatNumber({ value: 0, config: cToFConfig })

    // Removing the suffix and converter notation to get the raw number
    const numericString = formattedValue.replace(/ °C → °F$/, '').trim()

    // Should be around 32.0
    expect(Number.parseFloat(numericString)).toBeCloseTo(32.0, 1)

    // The parser should extract the numeric value
    expect(parseNumber({ value: formattedValue, config: cToFConfig })).toBeCloseTo(32.0, 1)
  })
})

describe('Edge Cases for Unit Conversions', () => {
  it('handles zero values correctly', () => {
    expect(Number.parseFloat(formatWeight(0, 'kg', 'lb'))).toBe(0)
    expect(Number.parseFloat(formatLength(0, 'm', 'ft'))).toBe(0)
    expect(Number.parseFloat(formatTemperature(0, 'C', 'F'))).toBeCloseTo(32, 1) // Exception: 0°C = 32°F
  })

  it('handles negative values correctly', () => {
    expect(Number.parseFloat(formatWeight(-10, 'kg', 'lb'))).toBeCloseTo(-22.0462, 4)
    expect(Number.parseFloat(formatLength(-5, 'm', 'ft'))).toBeCloseTo(-16.4042, 4)
    expect(Number.parseFloat(formatTemperature(-40, 'C', 'F'))).toBeCloseTo(-40, 1) // Special case: -40°C = -40°F
  })

  it('handles very small values correctly', () => {
    expect(Number.parseFloat(formatWeight(0.001, 'kg', 'lb'))).toBeCloseTo(0.00220462, 8)
    expect(Number.parseFloat(formatLength(0.001, 'm', 'cm'))).toBeCloseTo(0.1, 1)
    expect(Number.parseFloat(formatTemperature(0.001, 'C', 'F'))).toBeCloseTo(32.00180, 5)
  })

  it('handles very large values correctly', () => {
    expect(Number.parseFloat(formatWeight(1000000, 'kg', 'lb'))).toBeCloseTo(2204620, 0)
    expect(Number.parseFloat(formatLength(1000000, 'm', 'km'))).toBe(1000)
    expect(Number.parseFloat(formatTemperature(1000000, 'C', 'K'))).toBeCloseTo(1000273.15, 2)
  })
})
