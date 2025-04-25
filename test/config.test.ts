import type { NumbersConfig } from '../src/types'
import { describe, expect, it } from 'bun:test'
import { defaultConfig, Numbers } from '../src'

describe('Configuration Module', () => {
  describe('Default Configuration', () => {
    it('has expected default values', () => {
      expect(defaultConfig.decimalPlaces).toBe(2)
      expect(defaultConfig.decimalCharacter).toBe('.')
      expect(defaultConfig.digitGroupSeparator).toBe(',')
      expect(defaultConfig.digitGroupSpacing).toBe('3')
      expect(defaultConfig.currencySymbol).toBe('')
      expect(defaultConfig.currencySymbolPlacement).toBe('p')
      expect(defaultConfig.showPositiveSign).toBe(false)
    })

    it('can be modified via direct assignment', () => {
      const originalDecimalPlaces = defaultConfig.decimalPlaces
      const originalDigitGroupSeparator = defaultConfig.digitGroupSeparator
      const originalShowPositiveSign = defaultConfig.showPositiveSign

      // Modify defaults
      defaultConfig.decimalPlaces = 4
      defaultConfig.digitGroupSeparator = ' '
      defaultConfig.showPositiveSign = true

      expect(defaultConfig.decimalPlaces).toBe(4)
      expect(defaultConfig.digitGroupSeparator).toBe(' ')
      expect(defaultConfig.showPositiveSign).toBe(true)

      // Reset defaults for other tests
      defaultConfig.decimalPlaces = originalDecimalPlaces
      defaultConfig.digitGroupSeparator = originalDigitGroupSeparator
      defaultConfig.showPositiveSign = originalShowPositiveSign
    })
  })

  describe('Instance Configuration', () => {
    it('merges instance config with default config', () => {
      // Mock HTMLElement
      const element = document.createElement('input')

      const customConfig: NumbersConfig = {
        decimalPlaces: 3,
        currencySymbol: '$',
        emptyInputBehavior: 'zero',
      }

      const instance = new Numbers(element, customConfig)
      const instanceConfig = instance.getConfig()

      expect(instanceConfig.decimalPlaces).toBe(3)
      expect(instanceConfig.currencySymbol).toBe('$')
      expect(instanceConfig.emptyInputBehavior).toBe('zero')
      expect(instanceConfig.digitGroupSeparator).toBe(',') // From default
    })

    it('updates instance config without affecting other instances', () => {
      // Mock HTMLElements
      const element1 = document.createElement('input')
      const element2 = document.createElement('input')

      const instance1 = new Numbers(element1, { decimalPlaces: 2, currencySymbol: '$' })
      const instance2 = new Numbers(element2, { decimalPlaces: 3, currencySymbol: '€' })

      instance1.update({ decimalPlaces: 4 })

      expect(instance1.getConfig().decimalPlaces).toBe(4)
      expect(instance2.getConfig().decimalPlaces).toBe(3)

      expect(instance1.getConfig().currencySymbol).toBe('$')
      expect(instance2.getConfig().currencySymbol).toBe('€')
    })
  })

  describe('Currency Configuration', () => {
    it('handles different currency configurations', () => {
      const element = document.createElement('input')

      const customConfig: NumbersConfig = {
        currencySymbol: '$',
        currencySymbolPlacement: 'p',
        currencies: {
          EUR: {
            symbol: '€',
            placement: 's',
            decimalPlaces: 2,
            locale: 'de-DE',
            groupSeparator: '.',
            decimalCharacter: ',',
          },
          GBP: {
            symbol: '£',
            placement: 'p',
            decimalPlaces: 2,
            locale: 'en-GB',
          },
        },
      }

      const instance = new Numbers(element, customConfig)
      instance.set(1234.56)

      // Default currency ($)
      expect(instance.getConfig().currencySymbol).toBe('$')
      expect(instance.getConfig().currencySymbolPlacement).toBe('p')

      // Switch to EUR
      instance.setCurrency('EUR')
      const eurConfig = instance.getConfig()
      expect(eurConfig.currencySymbol).toBe('€')
      expect(eurConfig.currencySymbolPlacement).toBe('s')

      // Switch to GBP
      instance.setCurrency('GBP')
      const gbpConfig = instance.getConfig()
      expect(gbpConfig.currencySymbol).toBe('£')
      expect(gbpConfig.currencySymbolPlacement).toBe('p')

      // Verify available currencies
      expect(instance.getAvailableCurrencies()).toContain('EUR')
      expect(instance.getAvailableCurrencies()).toContain('GBP')
    })
  })
})
