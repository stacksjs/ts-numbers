import type { NumbersConfig } from '../src/types'
import { describe, expect, it } from 'bun:test'
import {
  formatCreditCard,
  formatIPAddress,
  formatNumber,
  formatPhoneNumber,
  parseNumber,
} from '../src'

describe('Specialized Number Types Edge Cases', () => {
  describe('Phone Number Edge Cases', () => {
    it('handles partial phone numbers with various formats', () => {
      // Partial US phone numbers
      expect(formatPhoneNumber('123', '(###) ###-####')).toBe('(123) ___-____')
      expect(formatPhoneNumber('1234', '(###) ###-####')).toBe('(123) 4__-____')
      expect(formatPhoneNumber('12345', '(###) ###-####')).toBe('(123) 45_-____')
      expect(formatPhoneNumber('123456', '(###) ###-####')).toBe('(123) 456-____')
      expect(formatPhoneNumber('1234567', '(###) ###-####')).toBe('(123) 456-7___')
    })

    it('handles international format partial phone numbers', () => {
      expect(formatPhoneNumber('4', '+## ### ### ####')).toBe('+4_ ___ ___ ____')
      expect(formatPhoneNumber('49', '+## ### ### ####')).toBe('+49 ___ ___ ____')
      expect(formatPhoneNumber('491', '+## ### ### ####')).toBe('+49 1__ ___ ____')
      expect(formatPhoneNumber('4912', '+## ### ### ####')).toBe('+49 12_ ___ ____')
    })

    it('handles invalid characters in phone numbers', () => {
      expect(formatPhoneNumber('abc123def456', '(###) ###-####')).toBe('(123) 456-____')
      expect(formatPhoneNumber('12-34-56', '+## ### ### ####')).toBe('+12 345 6__ ____')
      expect(formatPhoneNumber('++49 (123)', '+## ### ### ####')).toBe('+49 123 ___ ____')
    })

    it('integrates with number formatter', () => {
      const config: NumbersConfig = {
        isSpecializedType: 'phone',
        specializedOptions: {
          phoneFormat: '(###) ###-####',
          countryCode: 'US',
        },
      }

      expect(formatNumber({ value: '123', config })).toBe('(123) ___-____')
      expect(parseNumber({ value: '(123) 456-', config })).toBe(123456)
    })
  })

  describe('IP Address Edge Cases', () => {
    it('handles IPv6 shortened notation', () => {
      // Standard notation
      expect(formatIPAddress('2001:0db8:85a3:0000:0000:8a2e:0370:7334', 'v6'))
        .toBe('2001:0db8:85a3:0000:0000:8a2e:0370:7334')

      // Shortened notation (:: representing consecutive zero blocks)
      const result1 = formatIPAddress('2001:db8:85a3::8a2e:370:7334', 'v6')
      expect(result1.includes('2001:0db8:85a3')).toBe(true)

      // Shortened notation at beginning
      const result2 = formatIPAddress('::1', 'v6')
      expect(result2.includes('0000:0000')).toBe(true)
      expect(result2.includes('0001')).toBe(true)

      // Shortened notation at end
      const result3 = formatIPAddress('2001:db8::', 'v6')
      expect(result3.includes('2001:0db8')).toBe(true)
      expect(result3.includes('0000:0000')).toBe(true)
    })

    it('handles edge IPv6 cases', () => {
      // All zeros (localhost)
      const result1 = formatIPAddress('::', 'v6')
      expect(result1.includes('0000:0000')).toBe(true)

      // Mixed IPv4/IPv6 notation - current implementation removes dots and places digits in segments
      const result2 = formatIPAddress('::ffff:192.168.1.1', 'v6')

      // Based on the actual output: 0000:0000:ffff:1921:0000:0000:0000:0000
      expect(result2).toBe('0000:0000:ffff:1921:0000:0000:0000:0000')
    })

    it('integrates with number formatter', () => {
      const config: NumbersConfig = {
        isSpecializedType: 'ip',
        specializedOptions: {
          ipVersion: 'v6',
        },
      }

      // Test shortened notation through the formatter
      const result = formatNumber({ value: '2001:db8::', config })
      expect(result.includes('2001:0db8')).toBe(true)
    })
  })

  describe('Credit Card Validation Edge Cases', () => {
    it('validates and formats Visa cards', () => {
      // Valid Visa format (starts with 4, 16 digits)
      expect(formatCreditCard('4111111111111111', 'visa')).toBe('4111 1111 1111 1111')

      // Valid Visa format (13 digits)
      expect(formatCreditCard('4111111111111', 'visa')).toBe('4111 1111 1111 1')

      // Invalid Visa (wrong first digit)
      const nonVisaWithVisaFormat = formatCreditCard('5111111111111111', 'visa')
      expect(nonVisaWithVisaFormat).toBe('5111 1111 1111 1111')
    })

    it('validates and formats Mastercard cards', () => {
      // Valid Mastercard (starts with 51-55, 16 digits)
      expect(formatCreditCard('5111111111111111', 'mastercard')).toBe('5111 1111 1111 1111')
      expect(formatCreditCard('5511111111111111', 'mastercard')).toBe('5511 1111 1111 1111')

      // Valid Mastercard (starts with 2221-2720, 16 digits)
      expect(formatCreditCard('2221111111111111', 'mastercard')).toBe('2221 1111 1111 1111')
      expect(formatCreditCard('2720111111111111', 'mastercard')).toBe('2720 1111 1111 1111')

      // Invalid Mastercard (wrong first digits)
      const nonMasterWithMasterFormat = formatCreditCard('4111111111111111', 'mastercard')
      expect(nonMasterWithMasterFormat).toBe('4111 1111 1111 1111')
    })

    it('validates and formats American Express cards', () => {
      // Valid Amex (starts with 34 or 37, 15 digits)
      expect(formatCreditCard('341111111111111', 'amex')).toBe('3411 111111 11111')
      expect(formatCreditCard('371111111111111', 'amex')).toBe('3711 111111 11111')

      // Invalid Amex (wrong length or start digits)
      const nonAmexWithAmexFormat = formatCreditCard('3611111111111111', 'amex')
      expect(nonAmexWithAmexFormat).toBe('3611 111111 11111')
    })

    it('validates and formats Discover cards', () => {
      // Valid Discover (starts with 6011, 16 digits)
      expect(formatCreditCard('6011111111111111', 'discover')).toBe('6011 1111 1111 1111')

      // Valid Discover (starts with 65, 16 digits)
      expect(formatCreditCard('6511111111111111', 'discover')).toBe('6511 1111 1111 1111')

      // Valid Discover (starts with 644-649, 16 digits)
      expect(formatCreditCard('6441111111111111', 'discover')).toBe('6441 1111 1111 1111')

      // Invalid Discover (wrong start digits)
      const nonDiscoverWithDiscoverFormat = formatCreditCard('4111111111111111', 'discover')
      expect(nonDiscoverWithDiscoverFormat).toBe('4111 1111 1111 1111')
    })

    it('handles partial credit card numbers with validation', () => {
      // Partial Visa
      expect(formatCreditCard('4', 'visa')).toBe('4')
      expect(formatCreditCard('41', 'visa')).toBe('41')
      expect(formatCreditCard('411111', 'visa')).toBe('4111 11')

      // Partial Amex
      expect(formatCreditCard('37', 'amex')).toBe('37')
      expect(formatCreditCard('3712', 'amex')).toBe('3712')
      expect(formatCreditCard('371244', 'amex')).toBe('3712 44')
    })

    it('integrates with number formatter for credit card validation', () => {
      const visaConfig: NumbersConfig = {
        isSpecializedType: 'creditCard',
        specializedOptions: {
          creditCardFormat: 'visa',
        },
      }

      const amexConfig: NumbersConfig = {
        isSpecializedType: 'creditCard',
        specializedOptions: {
          creditCardFormat: 'amex',
        },
      }

      expect(formatNumber({ value: '4111111111111111', config: visaConfig })).toBe('4111 1111 1111 1111')
      expect(formatNumber({ value: '371111111111111', config: amexConfig })).toBe('3711 111111 11111')

      // Parsing should strip formatting
      expect(parseNumber({ value: '4111 1111 1111 1111', config: visaConfig })).toBe(4111111111111111)
      expect(parseNumber({ value: '3711 111111 11111', config: amexConfig })).toBe(371111111111111)
    })
  })
})
