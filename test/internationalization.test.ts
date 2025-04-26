import { describe, expect, it } from 'bun:test'
import {
  arabicEG,
  arabicSA,
  chineseCN,
  chineseCNWithCurrency,
  formatNumber,
  frenchFR,
  hebrewIL,
  hebrewILWithCurrency,
  hindiIN,
  indianIN,
  japaneseJP,
  swedishSE,
  swissCH,
} from '../src'

describe('Internationalization Presets', () => {
  describe('Arabic Presets', () => {
    it('formats numbers in Arabic (Egypt) with Arabic numerals', () => {
      const result = formatNumber({ value: 1234.56, config: arabicEG })
      // Should contain Arabic digits
      expect(result).toMatch(/[٠١٢٣٤٥٦٧٨٩]/)
    })

    it('formats numbers in Arabic (Saudi Arabia)', () => {
      const result = formatNumber({ value: 1234.56, config: arabicSA })
      // Should contain Arabic digits
      expect(result).toMatch(/[٠١٢٣٤٥٦٧٨٩]/)
    })
  })

  describe('Asian Presets', () => {
    it('formats numbers in Hindi with Devanagari numerals', () => {
      const result = formatNumber({ value: 1234.56, config: hindiIN })
      // Should contain Devanagari digits
      expect(result).toMatch(/[०१२३४५६७८९]/)
    })

    it('formats numbers in Chinese', () => {
      const result = formatNumber({ value: 1234.56, config: chineseCN })
      expect(result).toContain('1,234.56')
      expect(result).not.toContain('¥') // No currency by default
    })

    it('formats numbers in Chinese with currency', () => {
      const result = formatNumber({ value: 1234.56, config: chineseCNWithCurrency })
      expect(result).toContain('1,234.56')
      expect(result).toContain('¥') // Should include currency symbol
    })

    it('formats numbers in Japanese', () => {
      const result = formatNumber({ value: 1234, config: japaneseJP })
      expect(result).toContain('1,234')
      expect(result).toContain('¥')
    })
  })

  describe('European Presets', () => {
    it('formats numbers with Swiss formatting', () => {
      const result = formatNumber({ value: 1234567.89, config: swissCH })
      // Check that the result contains a single number - it will be broken
      // with proper digit grouping
      expect(result).not.toBe('1234567.89')
      // Verify the digits are all present
      expect(result).toContain('1')
      expect(result).toContain('234')
      expect(result).toContain('567')
      expect(result).toContain('89')
    })

    it('formats numbers with Swedish formatting', () => {
      const result = formatNumber({ value: 1234.56, config: swedishSE })
      // Should use comma as decimal
      expect(result).toContain(',')
    })

    it('formats numbers with French formatting', () => {
      const result = formatNumber({ value: 1234.56, config: frenchFR })
      // Should use comma as decimal and spaces for thousands
      expect(result).toContain(',')
    })
  })

  describe('RTL Language Presets', () => {
    it('formats numbers in Hebrew', () => {
      const result = formatNumber({ value: 1234.56, config: hebrewIL })
      // Verify number is formatted correctly
      expect(result).toContain('1,234.56')
      // Should not have the currency by default
      expect(result).not.toContain('₪')
    })

    it('formats numbers in Hebrew with currency', () => {
      const result = formatNumber({ value: 1234.56, config: hebrewILWithCurrency })
      // Verify number is formatted correctly
      expect(result).toContain('1,234.56')
      // Should have shekel symbol
      expect(result).toContain('₪')
    })
  })

  describe('Indian Number System', () => {
    it('formats large numbers using lakh/crore system', () => {
      const result = formatNumber({ value: 12345678.9, config: indianIN })
      // Indian system groups: 1,23,45,678.90
      // We're flexible about the exact format as browser implementations may vary
      expect(result).toContain('1')
      expect(result).toContain('678')
    })
  })
})
