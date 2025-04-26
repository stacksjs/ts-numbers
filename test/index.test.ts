import { describe, expect, it } from 'bun:test'
import {
  createUnitConverter,
  creditCard,
  formatCreditCard,
  formatIPAddress,
  formatLength,
  formatNumber,
  formatPhoneNumber,
  formatTemperature,
  formatTime,
  formatWeight,
  ipAddress,
  lengthCm,
  lengthFeet,
  lengthMeters,
  parseNumber,
  phoneInternational,
  phoneUS,
  roundNumber,
  tempCelsius,
  tempFahrenheit,
  tempKelvin,
  time12h,
  time24h,
  weightKg,
  weightLbs,
} from '../src'

describe('Basic Formatting', () => {
  it('formats numbers with default options', () => {
    expect(formatNumber({ value: 1234.5678 })).toBe('1,234.57')
    expect(formatNumber({ value: -1234.5678 })).toBe('-1,234.57')
    expect(formatNumber({ value: 0 })).toBe('0.00')
  })

  it('formats numbers with custom options', () => {
    // Test case with proper German formatting: dot as thousand separator, comma as decimal
    const germanConfig = {
      decimalPlaces: 2,
      digitGroupSeparator: '.',
      decimalCharacter: ',',
    }

    // Use an explicitly rounded value to avoid precision issues
    expect(formatNumber({
      value: 1234,
      config: germanConfig,
    })).toBe('1.234,00')

    // Test $ currency symbol
    expect(formatNumber({
      value: 1234.5678,
      config: {
        currencySymbol: '$',
        currencySymbolPlacement: 'p',
      },
    })).toBe('$1,234.57')
  })
})

describe('Number Parsing', () => {
  it('parses formatted strings to numbers', () => {
    expect(parseNumber({ value: '1,234.56' })).toBe(1234.56)
    expect(parseNumber({ value: '-1,234.56' })).toBe(-1234.56)
    expect(parseNumber({ value: '$1,234.56' })).toBe(1234.56)
    expect(parseNumber({ value: '1.234,56', config: { decimalCharacter: ',', digitGroupSeparator: '.' } })).toBe(1234.56)
  })
})

describe('Rounding', () => {
  it('rounds numbers correctly', () => {
    expect(roundNumber(1.235, 2, 'S')).toBe(1.24)
    expect(roundNumber(1.235, 2, 'D')).toBe(1.23)
    expect(roundNumber(1.235, 2, 'U')).toBe(1.24)
    expect(roundNumber(-1.235, 2, 'S')).toBe(-1.24)
  })
})

describe('Phone Number Formatting', () => {
  it('formats US phone numbers', () => {
    expect(formatPhoneNumber('1234567890', '(###) ###-####')).toBe('(123) 456-7890')
    expect(formatPhoneNumber('12345', '(###) ###-####')).toBe('(123) 45_-____')
    expect(formatNumber({ value: '1234567890', config: phoneUS })).toBe('(123) 456-7890')
  })

  it('formats international phone numbers', () => {
    expect(formatPhoneNumber('11234567890', '+# (###) ###-####')).toBe('+1 (123) 456-7890')
    expect(formatNumber({ value: '11234567890', config: phoneInternational })).toBe('+1 (123) 456-7890')
  })
})

describe('Weight Formatting', () => {
  it('formats weights', () => {
    expect(formatNumber({ value: 75.5, config: weightKg })).toInclude('75.50 kg')
    expect(formatNumber({ value: 180.4, config: weightLbs })).toInclude('180.40 lb')
  })

  it('converts between weight units', () => {
    expect(Number.parseFloat(formatWeight(10, 'kg', 'lb'))).toBeCloseTo(22.0462, 4)
    expect(Number.parseFloat(formatWeight(22.0462, 'lb', 'kg'))).toBeCloseTo(10, 4)

    // Test unit converter config
    const kgToLbConfig = createUnitConverter('kg', 'lb')
    expect(formatNumber({ value: 10, config: kgToLbConfig })).toInclude('22.0462')
  })
})

describe('Length Formatting', () => {
  it('formats lengths', () => {
    expect(formatNumber({ value: 5.25, config: lengthMeters })).toInclude('5.25 m')
    expect(formatNumber({ value: 150, config: lengthCm })).toInclude('150.00 cm')
    expect(formatNumber({ value: 6, config: lengthFeet })).toInclude('6 ft')
  })

  it('converts between length units', () => {
    expect(Number.parseFloat(formatLength(1, 'm', 'ft'))).toBeCloseTo(3.28084, 4)
    expect(Number.parseFloat(formatLength(3.28084, 'ft', 'm'))).toBeCloseTo(1, 4)
    expect(Number.parseFloat(formatLength(1, 'm', 'cm'))).toBe(100)

    // Test unit converter config
    const mToFtConfig = createUnitConverter('m', 'ft')
    expect(formatNumber({ value: 1, config: mToFtConfig })).toInclude('3.28')
  })
})

describe('Temperature Formatting', () => {
  it('formats temperatures', () => {
    expect(formatNumber({ value: 25, config: tempCelsius })).toInclude('25.0 °C')
    expect(formatNumber({ value: 77, config: tempFahrenheit })).toInclude('77.0 °F')
    expect(formatNumber({ value: 300, config: tempKelvin })).toInclude('300.0 K')
  })

  it('converts between temperature units', () => {
    expect(Number.parseFloat(formatTemperature(0, 'C', 'F'))).toBeCloseTo(32, 1)
    expect(Number.parseFloat(formatTemperature(32, 'F', 'C'))).toBeCloseTo(0, 1)
    expect(Number.parseFloat(formatTemperature(0, 'C', 'K'))).toBeCloseTo(273.15, 2)

    // Test unit converter config
    const cToFConfig = createUnitConverter('C', 'F')
    expect(formatNumber({ value: 100, config: cToFConfig })).toInclude('212.0')
  })
})

describe('Time Formatting', () => {
  it('formats time in 24-hour format', () => {
    expect(formatTime('1430', '24h')).toBe('14:30')
    expect(formatTime('143022', '24h', true)).toBe('14:30:22')
    expect(formatNumber({ value: '143022', config: time24h })).toInclude('14:30:22')
  })

  it('formats time in 12-hour format', () => {
    expect(formatTime('1430', '12h')).toBe('02:30 PM')
    expect(formatTime('083022', '12h', true)).toBe('08:30:22 AM')
    expect(formatNumber({ value: '143022', config: time12h })).toInclude('02:30:22 PM')
  })
})

describe('IP Address Formatting', () => {
  it('formats IPv4 addresses', () => {
    expect(formatIPAddress('192168001001', 'v4')).toBe('192.168.1.1')
    expect(formatIPAddress('192.168.1', 'v4')).toBe('192.168.1.0')
    expect(formatNumber({ value: '192168001001', config: ipAddress })).toInclude('192.168.1.1')
  })

  it('formats IPv6 addresses', () => {
    expect(formatIPAddress('2001:0db8:85a3:0000:0000:8a2e:0370:7334', 'v6')).toBe('2001:0db8:85a3:0000:0000:8a2e:0370:7334')
    expect(formatIPAddress('2001:db8:85a3::8a2e:370:7334', 'v6')).toInclude('2001:0db8:85a3')
  })
})

describe('Credit Card Formatting', () => {
  it('formats credit card numbers', () => {
    expect(formatCreditCard('4111111111111111')).toBe('4111 1111 1111 1111')
    expect(formatCreditCard('378282246310005', 'amex')).toBe('3782 822463 10005')
    expect(formatNumber({ value: '4111111111111111', config: creditCard })).toInclude('4111 1111 1111 1111')
  })

  it('auto-detects card type', () => {
    expect(formatCreditCard('4111111111111111', 'auto')).toBe('4111 1111 1111 1111') // Visa
    expect(formatCreditCard('5555555555554444', 'auto')).toBe('5555 5555 5555 4444') // MasterCard
    expect(formatCreditCard('378282246310005', 'auto')).toBe('3782 822463 10005') // Amex
  })
})

describe('Unit Conversion', () => {
  it('creates proper converter configurations', () => {
    const kgToLbConfig = createUnitConverter('kg', 'lb')
    expect(kgToLbConfig.isSpecializedType).toBe('weight')
    expect(kgToLbConfig.specializedOptions?.weightUnit).toBe('kg')
    expect(kgToLbConfig.specializedOptions?.convertWeightTo).toBe('lb')

    const cToFConfig = createUnitConverter('C', 'F')
    expect(cToFConfig.isSpecializedType).toBe('temperature')
    expect(cToFConfig.specializedOptions?.temperatureUnit).toBe('C')
    expect(cToFConfig.specializedOptions?.convertTempTo).toBe('F')
  })
})

describe('Edge Cases', () => {
  it('handles invalid inputs', () => {
    expect(formatNumber({ value: 'abc' })).toBe('abc')
    expect(parseNumber({ value: 'abc' })).toBe(0)

    expect(formatPhoneNumber('abc', '(###) ###-####')).toBe('(___) ___-____')
    expect(formatTime('abc', '24h')).toBe('00:00')
    expect(formatIPAddress('abc', 'v4')).toBe('0.0.0.0')
  })

  it('handles extreme values', () => {
    expect(formatNumber({ value: 1e20 })).toInclude('100,000,000,000,000,000,000.00')
    expect(formatNumber({
      value: 1e20,
      config: {
        useScientificNotation: true,
        scientificNotationThreshold: 1e10,
      },
    })).toInclude('1.00e+20')
  })
})
