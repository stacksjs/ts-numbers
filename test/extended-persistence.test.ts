import type { NumbersConfig } from '../src/types'
import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test'
import { Numbers } from '../src'

describe('Extended Persistence Features', () => {
  // Mock implementations
  let mockLocalStorage: Record<string, string> = {}
  let mockSessionStorage: Record<string, string> = {}
  let mockCookies: Record<string, string> = {}

  beforeEach(() => {
    // Reset mocks before each test
    mockLocalStorage = {}
    mockSessionStorage = {}
    mockCookies = {}

    // Mock localStorage
    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: mock((key: string) => mockLocalStorage[key] || null),
        setItem: mock((key: string, value: string) => { mockLocalStorage[key] = value }),
        removeItem: mock((key: string) => { delete mockLocalStorage[key] }),
        clear: mock(() => { mockLocalStorage = {} }),
        key: mock((index: number) => Object.keys(mockLocalStorage)[index] || null),
        length: 0,
      },
      writable: true,
      configurable: true
    })

    // Mock sessionStorage
    Object.defineProperty(globalThis, 'sessionStorage', {
      value: {
        getItem: mock((key: string) => mockSessionStorage[key] || null),
        setItem: mock((key: string, value: string) => { mockSessionStorage[key] = value }),
        removeItem: mock((key: string) => { delete mockSessionStorage[key] }),
        clear: mock(() => { mockSessionStorage = {} }),
        key: mock((index: number) => Object.keys(mockSessionStorage)[index] || null),
        length: 0,
      },
      writable: true,
      configurable: true
    })

    // Mock document.cookie
    Object.defineProperty(document, 'cookie', {
      get: mock(() => {
        return Object.entries(mockCookies)
          .map(([key, value]) => `${key}=${value}`)
          .join('; ')
      }),
      set: mock((cookie: string) => {
        const [keyValuePair] = cookie.split(';')
        const [key, value] = keyValuePair.split('=')
        mockCookies[key.trim()] = value.trim()
      }),
      configurable: true,
    })
  })

  afterEach(() => {
    // Clean up mocks after each test
    // @ts-expect-error: Deleting properties from globalThis
    delete globalThis.localStorage
    // @ts-expect-error: Deleting properties from globalThis
    delete globalThis.sessionStorage
  })

  describe('Local Storage Persistence', () => {
    it('saves values to localStorage when configured', () => {
      const element = document.createElement('input')
      const config: NumbersConfig = {
        persistenceMethod: 'localStorage',
        persistenceKey: 'test-numbers-value',
      }

      const instance = new Numbers(element, config)

      // Set a value that should be saved to localStorage
      instance.set(1234.56)

      // Check if the value was saved
      expect(mockLocalStorage['test-numbers-value']).toBe('1234.56')

      // Change the value and check again
      instance.set(7890.12)
      expect(mockLocalStorage['test-numbers-value']).toBe('7890.12')
    })

    it('loads values from localStorage on initialization', () => {
      const element = document.createElement('input')

      // Preset a value in localStorage
      mockLocalStorage['test-numbers-value'] = '9876.54'

      const config: NumbersConfig = {
        persistenceMethod: 'localStorage',
        persistenceKey: 'test-numbers-value',
        formatOnPageLoad: true,
      }

      // Create instance that should load from localStorage
      const instance = new Numbers(element, config)

      // Check if the value was loaded
      expect(instance.getNumber()).toBe(9876.54)
      expect((element as HTMLInputElement).value).toBe('9,876.54')
    })

    it('clears localStorage value when instance is removed', () => {
      const element = document.createElement('input')
      const config: NumbersConfig = {
        persistenceMethod: 'localStorage',
        persistenceKey: 'test-numbers-value',
      }

      const instance = new Numbers(element, config)
      instance.set(1234.56)

      // Verify value exists
      expect(mockLocalStorage['test-numbers-value']).toBe('1234.56')

      // Remove the instance
      instance.remove()

      // Verify value was removed
      expect(mockLocalStorage['test-numbers-value']).toBeUndefined()
    })
  })

  describe('Session Storage Persistence', () => {
    it('saves values to sessionStorage when configured', () => {
      const element = document.createElement('input')
      const config: NumbersConfig = {
        persistenceMethod: 'sessionStorage',
        persistenceKey: 'test-numbers-session',
      }

      const instance = new Numbers(element, config)

      // Set a value that should be saved to sessionStorage
      instance.set(1234.56)

      // Check if the value was saved
      expect(mockSessionStorage['test-numbers-session']).toBe('1234.56')

      // Change the value and check again
      instance.set(7890.12)
      expect(mockSessionStorage['test-numbers-session']).toBe('7890.12')
    })

    it('loads values from sessionStorage on initialization', () => {
      const element = document.createElement('input')

      // Preset a value in sessionStorage
      mockSessionStorage['test-numbers-session'] = '9876.54'

      const config: NumbersConfig = {
        persistenceMethod: 'sessionStorage',
        persistenceKey: 'test-numbers-session',
        formatOnPageLoad: true,
      }

      // Create instance that should load from sessionStorage
      const instance = new Numbers(element, config)

      // Check if the value was loaded
      expect(instance.getNumber()).toBe(9876.54)
      expect((element as HTMLInputElement).value).toBe('9,876.54')
    })

    it('clears sessionStorage value when instance is removed', () => {
      const element = document.createElement('input')
      const config: NumbersConfig = {
        persistenceMethod: 'sessionStorage',
        persistenceKey: 'test-numbers-session',
      }

      const instance = new Numbers(element, config)
      instance.set(1234.56)

      // Verify value exists
      expect(mockSessionStorage['test-numbers-session']).toBe('1234.56')

      // Remove the instance
      instance.remove()

      // Verify value was removed
      expect(mockSessionStorage['test-numbers-session']).toBeUndefined()
    })
  })

  describe('Cookie Persistence', () => {
    it('saves values to cookies when configured', () => {
      const element = document.createElement('input')
      const config: NumbersConfig = {
        persistenceMethod: 'cookie',
        persistenceKey: 'test-numbers-cookie',
      }

      const instance = new Numbers(element, config)

      // Set a value that should be saved as a cookie
      instance.set(1234.56)

      // Check if the cookie was set
      expect(mockCookies['test-numbers-cookie']).toBe('1234.56')

      // Change the value and check again
      instance.set(7890.12)
      expect(mockCookies['test-numbers-cookie']).toBe('7890.12')
    })

    it('loads values from cookies on initialization', () => {
      const element = document.createElement('input')

      // Preset a cookie value
      mockCookies['test-numbers-cookie'] = '9876.54'

      const config: NumbersConfig = {
        persistenceMethod: 'cookie',
        persistenceKey: 'test-numbers-cookie',
        formatOnPageLoad: true,
      }

      // Create instance that should load from cookie
      const instance = new Numbers(element, config)

      // Check if the value was loaded
      expect(instance.getNumber()).toBe(9876.54)
      expect((element as HTMLInputElement).value).toBe('9,876.54')
    })
  })

  describe('Multiple Instances with Persistence', () => {
    it('maintains separate persistence for multiple instances', () => {
      const element1 = document.createElement('input')
      const element2 = document.createElement('input')

      const config1: NumbersConfig = {
        persistenceMethod: 'localStorage',
        persistenceKey: 'test-numbers-1',
      }

      const config2: NumbersConfig = {
        persistenceMethod: 'localStorage',
        persistenceKey: 'test-numbers-2',
      }

      const instance1 = new Numbers(element1, config1)
      const instance2 = new Numbers(element2, config2)

      // Set different values
      instance1.set(1111.11)
      instance2.set(2222.22)

      // Check that each instance has its own persistence
      expect(mockLocalStorage['test-numbers-1']).toBe('1111.11')
      expect(mockLocalStorage['test-numbers-2']).toBe('2222.22')

      // Remove one instance and check that only its value is removed
      instance1.remove()
      expect(mockLocalStorage['test-numbers-1']).toBeUndefined()
      expect(mockLocalStorage['test-numbers-2']).toBe('2222.22')
    })

    it('handles multiple instances with different persistence methods', () => {
      const element1 = document.createElement('input')
      const element2 = document.createElement('input')
      const element3 = document.createElement('input')

      const config1: NumbersConfig = {
        persistenceMethod: 'localStorage',
        persistenceKey: 'test-multi-1',
      }

      const config2: NumbersConfig = {
        persistenceMethod: 'sessionStorage',
        persistenceKey: 'test-multi-2',
      }

      const config3: NumbersConfig = {
        persistenceMethod: 'cookie',
        persistenceKey: 'test-multi-3',
      }

      const instance1 = new Numbers(element1, config1)
      const instance2 = new Numbers(element2, config2)
      const instance3 = new Numbers(element3, config3)

      // Set values for all instances
      instance1.set(1111.11)
      instance2.set(2222.22)
      instance3.set(3333.33)

      // Verify all persistence methods work
      expect(mockLocalStorage['test-multi-1']).toBe('1111.11')
      expect(mockSessionStorage['test-multi-2']).toBe('2222.22')
      expect(mockCookies['test-multi-3']).toBe('3333.33')
    })
  })

  describe('Edge Cases', () => {
    it('handles invalid persistence method gracefully', () => {
      const element = document.createElement('input')

      // Set an invalid persistence method
      const config: NumbersConfig = {
        persistenceMethod: 'invalid' as any,
        persistenceKey: 'test-invalid',
      }

      // This should not throw an error
      const instance = new Numbers(element, config)

      // Should still be able to set and get values normally
      instance.set(1234.56)
      expect(instance.getNumber()).toBe(1234.56)

      // But nothing should be stored in any persistence method
      expect(mockLocalStorage['test-invalid']).toBeUndefined()
      expect(mockSessionStorage['test-invalid']).toBeUndefined()
      expect(mockCookies['test-invalid']).toBeUndefined()
    })

    it('works correctly when persistence is disabled', () => {
      const element = document.createElement('input')

      // Create instance with no persistence
      const instance = new Numbers(element, { persistenceMethod: null })

      // Set a value
      instance.set(1234.56)

      // Verify no persistence occurred
      expect(Object.keys(mockLocalStorage).length).toBe(0)
      expect(Object.keys(mockSessionStorage).length).toBe(0)
      expect(Object.keys(mockCookies).length).toBe(0)
    })
  })
})
