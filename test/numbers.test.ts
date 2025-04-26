import type { NumbersConfig } from '../src/types'
import { beforeEach, describe, expect, it, mock } from 'bun:test'
import { Numbers } from '../src/numbers'

// Define a custom interface that extends HTMLElement with the properties we need
interface MockHTMLElement extends HTMLElement {
  value: string
}

// Mock document object
function createMockElement(tagName = 'input', value = '', textContent = '') {
  const element = {
    tagName,
    value,
    textContent,
    classList: {
      add: mock(),
      remove: mock(),
      contains: () => false,
    },
    style: {},
    dispatchEvent: mock(),
    addEventListener: mock(),
    removeEventListener: mock(),
    hasAttribute: (attr: string) => attr === 'contenteditable',
    getAttribute: () => null,
    setAttribute: mock(),
    select: mock(),
    nextSibling: null,
    parentNode: {
      insertBefore: mock(),
    },
  } as unknown as MockHTMLElement
  return element
}

describe('Numbers Class', () => {
  describe('Initialization', () => {
    it('initializes with default config', () => {
      const element = createMockElement()
      document.querySelector = () => element

      const instance = new Numbers('#element')
      expect(instance).toBeDefined()
      expect(instance.getElement()).toBe(element)
    })

    it('initializes with custom config', () => {
      const element = createMockElement()
      const config = {
        decimalPlaces: 3,
        currencySymbol: '$',
      }

      const instance = new Numbers(element, config)
      const instanceConfig = instance.getConfig()

      expect(instanceConfig.decimalPlaces).toBe(3)
      expect(instanceConfig.currencySymbol).toBe('$')
    })

    it('throws error when element not found', () => {
      document.querySelector = () => null

      expect(() => new Numbers('#non-existent')).toThrow('Element #non-existent not found')
    })
  })

  describe('Value Management', () => {
    let element: any
    let instance: Numbers

    beforeEach(() => {
      element = createMockElement('input', '1234.56')
      instance = new Numbers(element)
    })

    it('gets the current value', () => {
      expect(instance.get()).toBe('1234.56')
    })

    it('sets a numeric value and formats it', () => {
      instance.set(2345.78)
      expect(element.value).toContain('2,345.78')
    })

    it('sets a string value and formats it', () => {
      instance.set('3456.89')
      expect(element.value).toContain('3,456.89')
    })

    it('clears the value', () => {
      instance.clear()
      expect(element.value).toBe('')
    })

    it('gets the value as a number', () => {
      expect(instance.getNumber()).toBe(1234.56)
    })

    it('sets a value', () => {
      const element = createMockElement()
      const instance = new Numbers(element)

      instance.set(1234.56)
      expect(element.value).toContain('1,234.56')
    })
  })

  describe('Configuration', () => {
    let element: any
    let instance: Numbers

    beforeEach(() => {
      element = createMockElement('input', '1234.56')
      instance = new Numbers(element)
    })

    it('gets the current config', () => {
      const config = instance.getConfig()
      expect(config).toBeDefined()
      expect(config.decimalPlaces).toBe(2) // Default config
    })

    it('updates the config', () => {
      instance.update({
        decimalPlaces: 4,
        currencySymbol: '€',
      })

      const config = instance.getConfig()
      expect(config.decimalPlaces).toBe(4)
      expect(config.currencySymbol).toBe('€')
    })
  })

  describe('Currency Management', () => {
    let element: any
    let instance: Numbers

    beforeEach(() => {
      element = createMockElement('input', '1234.56')
      instance = new Numbers(element, {
        currencies: {
          USD: {
            symbol: '$',
            placement: 'p' as const,
            decimalPlaces: 2,
            locale: 'en-US',
            groupSeparator: ',',
            decimalCharacter: '.',
          },
          EUR: {
            symbol: '€',
            placement: 's' as const,
            decimalPlaces: 2,
            locale: 'de-DE',
            groupSeparator: '.',
            decimalCharacter: ',',
          },
        },
      })
    })

    it('gets available currencies', () => {
      const currencies = instance.getAvailableCurrencies()
      expect(currencies).toEqual(['USD', 'EUR'])
    })

    it('sets a specific currency', () => {
      instance.setCurrency('EUR')
      expect(instance.getConfig().activeCurrency).toBe('EUR')
    })

    it('warns when setting undefined currency', () => {
      console.warn = mock()
      instance.setCurrency('GBP')
      expect(console.warn).toHaveBeenCalled()
    })
  })

  describe('History and Undo/Redo', () => {
    let element: any
    let instance: Numbers

    beforeEach(() => {
      element = createMockElement('input', '1000')
      instance = new Numbers(element)
    })

    it('performs undo operation', () => {
      instance.set(2000)
      instance.set(3000)
      instance.undo()
      expect(element.value).toContain('2,000')
    })

    it('performs redo operation', () => {
      instance.set(2000)
      instance.set(3000)
      instance.undo()
      instance.redo()
      expect(element.value).toContain('3,000')
    })

    it('does nothing when undo at beginning of history', () => {
      instance.set(2000)
      instance.undo()
      instance.undo() // Already at beginning
      expect(element.value).toContain('1,000')
    })

    it('does nothing when redo at end of history', () => {
      instance.set(2000)
      instance.redo() // Already at end
      expect(element.value).toContain('2,000')
    })
  })

  describe('Static Methods', () => {
    beforeEach(() => {
      // Reset numbers list by removing all instances
      Numbers.removeAll()
    })

    it('gets list of all instances', () => {
      const element1 = createMockElement()
      const element2 = createMockElement()

      // eslint-disable-next-line no-new
      new Numbers(element1)
      // eslint-disable-next-line no-new
      new Numbers(element2)

      expect(Numbers.getList().length).toBe(2)
    })

    it('updates all instances', () => {
      const element1 = createMockElement()
      const element2 = createMockElement()
      const instance1 = new Numbers(element1)
      const instance2 = new Numbers(element2)

      Numbers.updateAll({ decimalPlaces: 5 })

      expect(instance1.getConfig().decimalPlaces).toBe(5)
      expect(instance2.getConfig().decimalPlaces).toBe(5)
    })

    it('sets value for all instances', () => {
      const element1 = createMockElement()
      const element2 = createMockElement()

      // eslint-disable-next-line no-new
      new Numbers(element1)
      // eslint-disable-next-line no-new
      new Numbers(element2)

      Numbers.setAll(9999)

      expect(element1.value).toContain('9,999')
      expect(element2.value).toContain('9,999')
    })

    it('sets currency for all instances', () => {
      const element1 = createMockElement()
      const element2 = createMockElement()

      const config: NumbersConfig = {
        currencies: {
          USD: { symbol: '$', placement: 'p', decimalPlaces: 2, locale: 'en-US' },
          EUR: { symbol: '€', placement: 's', decimalPlaces: 2, locale: 'de-DE' },
        },
      }

      const instance1 = new Numbers(element1, config)

      const instance2 = new Numbers(element2, config)

      Numbers.setCurrencyAll('EUR')

      expect(instance1.getConfig().activeCurrency).toBe('EUR')
      expect(instance2.getConfig().activeCurrency).toBe('EUR')
    })

    it('removes all instances', () => {
      const element1 = createMockElement()
      const element2 = createMockElement()

      // eslint-disable-next-line no-new
      new Numbers(element1)
      // eslint-disable-next-line no-new
      new Numbers(element2)

      Numbers.removeAll()

      expect(Numbers.getList().length).toBe(0)
    })
  })

  describe('Instance Removal', () => {
    it('removes instance and event listeners', () => {
      const element = createMockElement()
      const instance = new Numbers(element)

      instance.remove()

      expect(element.removeEventListener).toHaveBeenCalled()
      expect(Numbers.getList()).not.toContain(instance)
    })
  })

  describe('Edge Cases', () => {
    it('handles null values based on emptyInputBehavior config', () => {
      const element = createMockElement()

      const instance = new Numbers(element, {
        emptyInputBehavior: 'zero',
      } as NumbersConfig)

      instance.set(null as any)
      expect(element.value).toContain('0')

      const instance2 = new Numbers(element, {
        emptyInputBehavior: 'null',
      } as NumbersConfig)

      instance2.set(null as any)
      expect(element.value).toBe('')
    })

    it('handles min/max value limits', () => {
      const element = createMockElement()

      const instance = new Numbers(element, {
        minimumValue: '10',
        maximumValue: '100',
        overrideMinMaxLimits: 'floor',
      })

      instance.set(5) // Below minimum
      expect(element.value).toContain('10')

      instance.set(150) // Above maximum
      expect(element.value).toContain('100')
    })

    it('handles valuesToStrings mapping', () => {
      const element = createMockElement()

      const instance = new Numbers(element, {
        valuesToStrings: {
          '0': 'Zero',
          '-1': 'Negative One',
          '1000': 'Thousand',
        },
      })

      instance.set(0)
      expect(element.value).toBe('Zero')

      instance.set(-1)
      expect(element.value).toBe('Negative One')

      instance.set(1000)
      expect(element.value).toBe('Thousand')
    })
  })
})
