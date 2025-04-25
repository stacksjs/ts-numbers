import type { NumbersConfig } from '../src/types'
import { describe, expect, it } from 'bun:test'
import {
  formatCreditCard,
  formatIPAddress,
  formatNumber,
  formatPhoneNumber,
  formatTime,
  parseNumber,
} from '../src'
import { formatSpecializedNumber } from '../src/specialized-formatter'

describe('Phone Number Formatting', () => {
  it('formats US phone numbers', () => {
    expect(formatPhoneNumber('1234567890', '(###) ###-####')).toBe('(123) 456-7890')
    expect(formatPhoneNumber('12345', '(###) ###-####')).toBe('(123) 45_-____')
    expect(formatPhoneNumber('', '(###) ###-####')).toBe('(___) ___-____')
  })

  it('formats international phone numbers', () => {
    expect(formatPhoneNumber('11234567890', '+# (###) ###-####')).toBe('+1 (123) 456-7890')
    expect(formatPhoneNumber('491234567890', '+## ###-###-####')).toBe('+49 123-456-7890')
  })

  it('uses default format when none provided', () => {
    expect(formatPhoneNumber('1234567890')).toBe('(123) 456-7890')
  })

  it('handles non-numeric characters in input', () => {
    expect(formatPhoneNumber('123-456-7890', '(###) ###-####')).toBe('(123) 456-7890')
    expect(formatPhoneNumber('(123) 456-7890', '(###) ###-####')).toBe('(123) 456-7890')
    expect(formatPhoneNumber('abc1d2e3f4g5h6i7j8k9l0', '(###) ###-####')).toBe('(123) 456-7890')
  })
})

describe('Time Formatting', () => {
  it('formats time in 24-hour format', () => {
    expect(formatTime('1430', '24h')).toBe('14:30')
    expect(formatTime('143022', '24h', true)).toBe('14:30:22')
    expect(formatTime('0930', '24h')).toBe('09:30')
    expect(formatTime('9', '24h')).toBe('09:00')
  })

  it('formats time in 12-hour format', () => {
    expect(formatTime('1430', '12h')).toBe('02:30 PM')
    expect(formatTime('0230', '12h')).toBe('02:30 AM')
    expect(formatTime('0930', '12h')).toBe('09:30 AM')
    expect(formatTime('1200', '12h')).toBe('12:00 PM') // Noon
    expect(formatTime('0000', '12h')).toBe('12:00 AM') // Midnight
  })

  it('formats time with seconds when specified', () => {
    expect(formatTime('143022', '24h', true)).toBe('14:30:22')
    expect(formatTime('143022', '12h', true)).toBe('02:30:22 PM')
    expect(formatTime('093045', '12h', true)).toBe('09:30:45 AM')
  })

  it('handles incomplete time inputs', () => {
    expect(formatTime('14', '24h')).toBe('14:00')
    expect(formatTime('1', '24h')).toBe('01:00')
    expect(formatTime('', '24h')).toBe('00:00')
    expect(formatTime('14', '12h')).toBe('02:00 PM')
  })

  it('handles non-numeric characters in input', () => {
    expect(formatTime('14:30', '24h')).toBe('14:30')
    expect(formatTime('2:30 PM', '12h')).toBe('02:30 PM')
    expect(formatTime('9h30m', '24h')).toBe('09:30')
  })
})

describe('IP Address Formatting', () => {
  it('formats IPv4 addresses', () => {
    expect(formatIPAddress('192168001001', 'v4')).toBe('192.168.1.1')
    expect(formatIPAddress('192.168.1', 'v4')).toBe('192.168.1.0')
    expect(formatIPAddress('10.0.0.1', 'v4')).toBe('10.0.0.1')
    expect(formatIPAddress('255255255255', 'v4')).toBe('255.255.255.255')
    expect(formatIPAddress('', 'v4')).toBe('0.0.0.0')
  })

  it('formats IPv6 addresses', () => {
    expect(formatIPAddress('2001:0db8:85a3:0000:0000:8a2e:0370:7334', 'v6')).toBe('2001:0db8:85a3:0000:0000:8a2e:0370:7334')
    expect(formatIPAddress('2001:db8:85a3::8a2e:370:7334', 'v6')).toInclude('2001:0db8:85a3')
    expect(formatIPAddress('', 'v6')).toInclude('0000:0000')
  })

  it('handles invalid IP address inputs', () => {
    expect(formatIPAddress('999.999.999.999', 'v4')).toBe('255.255.255.255') // Values capped at 255
    expect(formatIPAddress('abc', 'v4')).toBe('0.0.0.0')
    expect(formatIPAddress('abc', 'v6')).toInclude('0000:0000')
  })
})

describe('Credit Card Formatting', () => {
  it('formats credit card numbers with auto-detection', () => {
    expect(formatCreditCard('4111111111111111')).toBe('4111 1111 1111 1111') // Visa
    expect(formatCreditCard('5555555555554444')).toBe('5555 5555 5555 4444') // MasterCard
    expect(formatCreditCard('378282246310005')).toBe('3782 822463 10005') // Amex
    expect(formatCreditCard('6011111111111117')).toBe('6011 1111 1111 1117') // Discover
  })

  it('formats credit card numbers with specific formats', () => {
    expect(formatCreditCard('4111111111111111', 'visa')).toBe('4111 1111 1111 1111')
    expect(formatCreditCard('378282246310005', 'amex')).toBe('3782 822463 10005')
    expect(formatCreditCard('378282246310005', 'visa')).toBe('3782 8224 6310 005') // Forces visa format
  })

  it('handles partial card numbers', () => {
    expect(formatCreditCard('4111')).toBe('4111')
    expect(formatCreditCard('41111111')).toBe('4111 1111')
    expect(formatCreditCard('37828224')).toBe('3782 8224')
    expect(formatCreditCard('3782')).toBe('3782')
    expect(formatCreditCard('378282')).toBe('3782 82')
  })

  it('handles empty and invalid inputs', () => {
    expect(formatCreditCard('')).toBe('')
    expect(formatCreditCard('abc')).toBe('')
    expect(formatCreditCard('abc4111def1111abc1111ghi1111')).toBe('4111 1111 1111 1111')
  })
})

describe('Specialized Number Formatter Integration', () => {
  it('formats phone numbers through the specialized formatter', () => {
    const config: NumbersConfig = {
      isSpecializedType: 'phone',
      specializedOptions: {
        phoneFormat: '(###) ###-####',
        countryCode: 'US',
      },
    }

    expect(formatSpecializedNumber('1234567890', config)).toBe('(123) 456-7890')
    expect(formatNumber({ value: '1234567890', config })).toBe('(123) 456-7890')
  })

  it('formats time through the specialized formatter', () => {
    const config: NumbersConfig = {
      isSpecializedType: 'time',
      specializedOptions: {
        timeFormat: '12h',
        showSeconds: true,
      },
    }

    expect(formatSpecializedNumber('143022', config)).toBe('02:30:22 PM')
    expect(formatNumber({ value: '143022', config })).toBe('02:30:22 PM')
  })

  it('formats IP addresses through the specialized formatter', () => {
    const config: NumbersConfig = {
      isSpecializedType: 'ip',
      specializedOptions: {
        ipVersion: 'v4',
      },
    }

    expect(formatSpecializedNumber('192168001001', config)).toBe('192.168.1.1')
    expect(formatNumber({ value: '192168001001', config })).toBe('192.168.1.1')
  })

  it('formats credit cards through the specialized formatter', () => {
    const config: NumbersConfig = {
      isSpecializedType: 'creditCard',
      specializedOptions: {
        creditCardFormat: 'amex',
      },
    }

    expect(formatSpecializedNumber('378282246310005', config)).toBe('3782 822463 10005')
    expect(formatNumber({ value: '378282246310005', config })).toBe('3782 822463 10005')
  })

  it('handles unknown specialized types', () => {
    const config: NumbersConfig = {
      isSpecializedType: 'unknown' as any,
      specializedOptions: {},
    }

    expect(formatSpecializedNumber('12345', config)).toBe('12345')
  })

  it('returns original value when no specialized type is defined', () => {
    const config: NumbersConfig = {
      decimalPlaces: 2,
    }

    expect(formatSpecializedNumber('12345', config)).toBe('12345')
  })
})

describe('Specialized Number Parsing', () => {
  it('parses phone numbers correctly', () => {
    const config: NumbersConfig = {
      isSpecializedType: 'phone',
      specializedOptions: {
        phoneFormat: '(###) ###-####',
        countryCode: 'US',
      },
    }

    expect(parseNumber({ value: '(123) 456-7890', config })).toBe(1234567890)
    expect(parseNumber({ value: '+1 (123) 456-7890', config })).toBe(11234567890)
  })

  it('parses time formats correctly', () => {
    const config: NumbersConfig = {
      isSpecializedType: 'time',
      specializedOptions: {
        timeFormat: '24h',
        showSeconds: true,
      },
    }

    // 14:30:22 should be represented as 143022 (seconds in time)
    expect(parseNumber({ value: '14:30:22', config })).toBe(14 * 3600 + 30 * 60 + 22)
    expect(parseNumber({ value: '09:45', config })).toBe(9 * 60 + 45) // 9 hours and 45 minutes
  })

  it('parses IP addresses correctly', () => {
    const config: NumbersConfig = {
      isSpecializedType: 'ip',
      specializedOptions: {
        ipVersion: 'v4',
      },
    }

    // Should return the first octet
    expect(parseNumber({ value: '192.168.1.1', config })).toBe(192)
    expect(parseNumber({ value: '10.0.0.1', config })).toBe(10)
  })

  it('parses credit card numbers correctly', () => {
    const config: NumbersConfig = {
      isSpecializedType: 'creditCard',
      specializedOptions: {
        creditCardFormat: 'visa',
      },
    }

    expect(parseNumber({ value: '4111 1111 1111 1111', config })).toBe(4111111111111111)
    expect(parseNumber({ value: '3782 822463 10005', config })).toBe(378282246310005)
  })
})
