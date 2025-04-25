import type { NumbersConfig, StyleRuleCallback, StyleRuleRange } from '../src/types'
import { describe, expect, it } from 'bun:test'
import { Numbers } from '../src'

describe('Style Rules', () => {
  describe('Basic Styling', () => {
    it('applies positive/negative styles', () => {
      const element = document.createElement('input')
      document.body.appendChild(element)

      const config: NumbersConfig = {
        styleRules: {
          positive: 'positive-number',
          negative: 'negative-number',
        },
      }

      const instance = new Numbers(element, config)

      // Test positive value
      instance.set(1234.56)
      expect(element.classList.contains('positive-number')).toBe(true)
      expect(element.classList.contains('negative-number')).toBe(false)

      // Test negative value
      instance.set(-1234.56)
      expect(element.classList.contains('positive-number')).toBe(false)
      expect(element.classList.contains('negative-number')).toBe(true)

      // Cleanup
      document.body.removeChild(element)
    })
  })

  describe('Range-based Styling', () => {
    it('applies styles based on value ranges', () => {
      const element = document.createElement('input')
      document.body.appendChild(element)

      const rangeRules: StyleRuleRange[] = [
        { min: 0, max: 100, class: 'low-range' },
        { min: 100, max: 1000, class: 'medium-range' },
        { min: 1000, max: Infinity, class: 'high-range' },
      ]

      const config: NumbersConfig = {
        styleRules: {
          ranges: rangeRules,
        },
      }

      const instance = new Numbers(element, config)

      // Test low range
      instance.set(50)
      expect(element.classList.contains('low-range')).toBe(true)
      expect(element.classList.contains('medium-range')).toBe(false)
      expect(element.classList.contains('high-range')).toBe(false)

      // Test medium range
      instance.set(500)
      expect(element.classList.contains('low-range')).toBe(false)
      expect(element.classList.contains('medium-range')).toBe(true)
      expect(element.classList.contains('high-range')).toBe(false)

      // Test high range
      instance.set(5000)
      expect(element.classList.contains('low-range')).toBe(false)
      expect(element.classList.contains('medium-range')).toBe(false)
      expect(element.classList.contains('high-range')).toBe(true)

      // Test boundary value (should be in the higher range)
      instance.set(100)
      expect(element.classList.contains('low-range')).toBe(false)
      expect(element.classList.contains('medium-range')).toBe(true)

      // Test negative value (shouldn't match any range)
      instance.set(-100)
      expect(element.classList.contains('low-range')).toBe(false)
      expect(element.classList.contains('medium-range')).toBe(false)
      expect(element.classList.contains('high-range')).toBe(false)

      // Cleanup
      document.body.removeChild(element)
    })
  })

  describe('Custom Callback Styling', () => {
    it('applies styles based on custom callback functions', () => {
      const element = document.createElement('input')
      document.body.appendChild(element)

      const isEven: StyleRuleCallback = {
        callback: value => typeof value === 'number' && value % 2 === 0,
        classes: 'even-number',
      }

      const isPrime: StyleRuleCallback = {
        callback: (value) => {
          if (typeof value !== 'number' || value <= 1)
            return false
          if (value <= 3)
            return true
          if (value % 2 === 0 || value % 3 === 0)
            return false

          let i = 5
          while (i * i <= value) {
            if (value % i === 0 || value % (i + 2) === 0)
              return false
            i += 6
          }
          return true
        },
        classes: 'prime-number',
      }

      const config: NumbersConfig = {
        styleRules: {
          userDefined: [isEven, isPrime],
        },
      }

      const instance = new Numbers(element, config)

      // Test even number
      instance.set(4)
      expect(element.classList.contains('even-number')).toBe(true)
      expect(element.classList.contains('prime-number')).toBe(false)

      // Test prime number
      instance.set(11)
      expect(element.classList.contains('even-number')).toBe(false)
      expect(element.classList.contains('prime-number')).toBe(true)

      // Test even prime number
      instance.set(2)
      expect(element.classList.contains('even-number')).toBe(true)
      expect(element.classList.contains('prime-number')).toBe(true)

      // Test neither even nor prime
      instance.set(9)
      expect(element.classList.contains('even-number')).toBe(false)
      expect(element.classList.contains('prime-number')).toBe(false)

      // Cleanup
      document.body.removeChild(element)
    })

    it('applies multiple classes from a single callback', () => {
      const element = document.createElement('input')
      document.body.appendChild(element)

      const multipleClasses: StyleRuleCallback = {
        callback: (value) => {
          if (typeof value !== 'number')
            return false
          // Return true if value is between 10 and 20
          return value >= 10 && value <= 20
        },
        classes: ['range-10-20', 'special-range'],
      }

      const config: NumbersConfig = {
        styleRules: {
          userDefined: [multipleClasses],
        },
      }

      const instance = new Numbers(element, config)

      // Test value in range
      instance.set(15)
      expect(element.classList.contains('range-10-20')).toBe(true)
      expect(element.classList.contains('special-range')).toBe(true)

      // Test value out of range
      instance.set(25)
      expect(element.classList.contains('range-10-20')).toBe(false)
      expect(element.classList.contains('special-range')).toBe(false)

      // Cleanup
      document.body.removeChild(element)
    })
  })

  describe('Combined Style Rules', () => {
    it('applies multiple style rule types simultaneously', () => {
      const element = document.createElement('input')
      document.body.appendChild(element)

      const isMultipleOfFive: StyleRuleCallback = {
        callback: value => typeof value === 'number' && value % 5 === 0,
        classes: 'multiple-of-five',
      }

      const config: NumbersConfig = {
        styleRules: {
          positive: 'positive-number',
          negative: 'negative-number',
          ranges: [
            { min: 0, max: 100, class: 'small-number' },
            { min: 100, max: Infinity, class: 'large-number' },
          ],
          userDefined: [isMultipleOfFive],
        },
      }

      const instance = new Numbers(element, config)

      // Test positive small multiple of five
      instance.set(25)
      expect(element.classList.contains('positive-number')).toBe(true)
      expect(element.classList.contains('small-number')).toBe(true)
      expect(element.classList.contains('multiple-of-five')).toBe(true)
      expect(element.classList.contains('negative-number')).toBe(false)
      expect(element.classList.contains('large-number')).toBe(false)

      // Test positive large multiple of five
      instance.set(500)
      expect(element.classList.contains('positive-number')).toBe(true)
      expect(element.classList.contains('large-number')).toBe(true)
      expect(element.classList.contains('multiple-of-five')).toBe(true)
      expect(element.classList.contains('negative-number')).toBe(false)
      expect(element.classList.contains('small-number')).toBe(false)

      // Test negative not multiple of five
      instance.set(-12)
      expect(element.classList.contains('negative-number')).toBe(true)
      expect(element.classList.contains('positive-number')).toBe(false)
      expect(element.classList.contains('multiple-of-five')).toBe(false)
      expect(element.classList.contains('small-number')).toBe(false)
      expect(element.classList.contains('large-number')).toBe(false)

      // Cleanup
      document.body.removeChild(element)
    })
  })
})
