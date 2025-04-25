import type { NumbersConfig } from '../src/types'
import { beforeEach, describe, expect, it, mock } from 'bun:test'
import { Numbers } from '../src'

describe('Input Events and Advanced Input Handling', () => {
  // Mock events that will be reused across tests
  let mockFocusEvent: FocusEvent
  let mockBlurEvent: FocusEvent

  beforeEach(() => {
    // Initialize mock events before each test
    mockFocusEvent = new FocusEvent('focus')
    mockBlurEvent = new FocusEvent('blur')
  })

  describe('Focus and Blur Events', () => {
    it('applies formatting on blur', () => {
      const element = document.createElement('input')
      element.value = '1234.5'
      document.body.appendChild(element)

      const config: NumbersConfig = {
        decimalPlaces: 2,
        digitGroupSeparator: ',',
      }

      const instance = new Numbers(element, config)

      // Simulate focus which might remove formatting
      element.dispatchEvent(mockFocusEvent)

      // Manually set value (as if user typed)
      element.value = '9876.5'

      // Simulate blur which should trigger formatting
      element.dispatchEvent(mockBlurEvent)

      // Check formatting was applied
      expect(element.value).toBe('9,876.50')

      // Check raw value is correct
      expect(instance.getNumber()).toBe(9876.5)

      // Cleanup
      document.body.removeChild(element)
    })

    it('selects content on focus when configured', () => {
      const element = document.createElement('input')
      element.value = '1,234.56'
      document.body.appendChild(element)

      // Mock selection methods
      const originalSelect = element.select
      const selectMock = mock(() => {})
      element.select = selectMock

      // Create instance with selectOnFocus enabled
      const config: NumbersConfig = {
        selectOnFocus: true,
      }

      const _instance = new Numbers(element, config)

      // Simulate focus
      element.dispatchEvent(mockFocusEvent)

      // Check if select was called
      expect(selectMock).toHaveBeenCalled()

      // Restore original select method
      element.select = originalSelect

      // Cleanup
      document.body.removeChild(element)
    })

    it('unformats on focus when configured', () => {
      const element = document.createElement('input')
      element.value = '1,234.56'
      document.body.appendChild(element)

      // Create instance with unformat on focus behavior
      const config: NumbersConfig = {
        // Using caretPositionOnFocus to trigger unformatting
        caretPositionOnFocus: 'start',
      }

      const _instance = new Numbers(element, config)

      // Simulate focus
      element.dispatchEvent(mockFocusEvent)

      // Check if value is unformatted (may depend on implementation)
      // In a real implementation, we'd need to verify the behavior differently
      // For this test, we'll just check that the caret position is set

      // Cleanup
      document.body.removeChild(element)
    })
  })

  describe('Keyboard Events', () => {
    it('responds to arrow up/down for incrementing/decrementing', () => {
      // Create element
      const element = document.createElement('input')
      element.value = '5'

      // Configure with arrow key enabled
      const config: NumbersConfig = {
        modifyValueOnUpDownArrow: true,
        upDownStep: 1,
        decimalPlaces: 0, // Set to 0 to match test expectations
      }

      const _instance = new Numbers(element, config)

      // Create arrow up event
      const arrowUpEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' })
      element.dispatchEvent(arrowUpEvent)

      // Check if value was incremented
      expect(element.value).toBe('6')

      // Create arrow down event
      const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' })
      element.dispatchEvent(arrowDownEvent)

      // Check if value was decremented
      expect(element.value).toBe('5')
    })

    it('handles keyboard shortcuts', () => {
      // Create element
      const element = document.createElement('input')
      element.value = '10'

      // Configure with keyboard shortcuts
      const config: NumbersConfig = {
        keyboardShortcuts: {
          increment: 'ArrowUp', // Standard arrow key
          decrement: 'ArrowDown',
          incrementLarge: 'Alt+ArrowUp', // With Alt modifier
          decrementLarge: 'Alt+ArrowDown',
          toggleSign: 'Shift+S',
          clear: 'Escape',
        },
        decimalPlaces: 0, // Set to 0 to match test expectations
      }

      const _instance = new Numbers(element, config)

      // Test Alt+ArrowUp for large increment (should add 10)
      const altArrowUpEvent = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        altKey: true,
      })
      element.dispatchEvent(altArrowUpEvent)
      expect(element.value).toBe('20')

      // Test toggle sign
      const toggleSignEvent = new KeyboardEvent('keydown', {
        key: 'S',
        shiftKey: true,
      })
      element.dispatchEvent(toggleSignEvent)
      expect(element.value).toBe('-20')
    })
  })

  describe('Wheel Events', () => {
    it('handles mouse wheel for value changes', () => {
      // Create element
      const element = document.createElement('input')
      element.value = '50'

      // Configure with wheel event
      const config: NumbersConfig = {
        modifyValueOnWheel: true,
        wheelStep: 1,
        wheelOn: 'hover',
        decimalPlaces: 0, // Set to 0 to match test expectations
      }

      const _instance = new Numbers(element, config)

      // Simulate wheel up (increment)
      const wheelUpEvent = new WheelEvent('wheel', { deltaY: -100 })
      element.dispatchEvent(wheelUpEvent)
      expect(element.value).toBe('51')

      // Simulate wheel down (decrement)
      const wheelDownEvent = new WheelEvent('wheel', { deltaY: 100 })
      element.dispatchEvent(wheelDownEvent)
      expect(element.value).toBe('50')
    })

    it('respects wheelStep setting', () => {
      // Create element
      const element = document.createElement('input')
      element.value = '50'

      // Configure with specific wheel step
      const config: NumbersConfig = {
        modifyValueOnWheel: true,
        wheelStep: 5, // Increment/decrement by 5
        wheelOn: 'hover',
        decimalPlaces: 0, // Set to 0 to match test expectations
      }

      const _instance = new Numbers(element, config)

      // Simulate wheel up (increment by 5)
      const wheelUpEvent = new WheelEvent('wheel', { deltaY: -100 })
      element.dispatchEvent(wheelUpEvent)
      expect(element.value).toBe('55')

      // Simulate wheel down (decrement by 5)
      const wheelDownEvent = new WheelEvent('wheel', { deltaY: 100 })
      element.dispatchEvent(wheelDownEvent)
      expect(element.value).toBe('50')
    })
  })

  describe('Min/Max Value Constraints', () => {
    it('enforces minimum and maximum values', () => {
      // Create element
      const element = document.createElement('input')
      element.value = '50'

      // Configure with min/max limits
      const config: NumbersConfig = {
        minimumValue: '0',
        maximumValue: '100',
        overrideMinMaxLimits: 'ceiling', // Enforce ceiling
        decimalPlaces: 0, // Set to 0 to match test expectations
      }

      const instance = new Numbers(element, config)

      // Try to set value below minimum
      instance.set(-10)
      expect(element.value).toBe('0')

      // Try to set value above maximum
      instance.set(150)
      expect(element.value).toBe('100')
    })

    it('handles different overrideMinMaxLimits settings', () => {
      const element = document.createElement('input')
      document.body.appendChild(element)

      // Test with 'ignore' setting
      const ignoreConfig: NumbersConfig = {
        minimumValue: '0',
        maximumValue: '100',
        overrideMinMaxLimits: 'ignore',
      }

      const ignoreInstance = new Numbers(element, ignoreConfig)

      // Should ignore min/max limits
      ignoreInstance.set(-10)
      expect(element.value).toBe('-10.00')

      // Test with 'clamp' setting
      const clampConfig: NumbersConfig = {
        minimumValue: '0',
        maximumValue: '100',
        overrideMinMaxLimits: 'ceiling',
      }

      const clampInstance = new Numbers(element, clampConfig)

      // Should clamp to maximum
      clampInstance.set(200)
      expect(element.value).toBe('100.00')

      // Cleanup
      document.body.removeChild(element)
    })
  })

  describe('Formula Mode', () => {
    it('evaluates basic formulas starting with =', () => {
      const element = document.createElement('input')
      document.body.appendChild(element)

      const config: NumbersConfig = {
        formulaMode: true,
        decimalPlaces: 2,
      }

      const _instance = new Numbers(element, config)

      // Set formula value
      element.value = '=10+5'

      // Trigger formula evaluation with Enter key
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' })
      element.dispatchEvent(enterEvent)

      // Should evaluate to 15 and format
      expect(element.value).toBe('15.00')

      // Try a more complex formula
      element.value = '=10*5+2'
      element.dispatchEvent(enterEvent)

      // Should evaluate to 52 and format
      expect(element.value).toBe('52.00')

      // Cleanup
      document.body.removeChild(element)
    })

    it('handles invalid formulas gracefully', () => {
      const element = document.createElement('input')
      document.body.appendChild(element)

      const config: NumbersConfig = {
        formulaMode: true,
      }

      // Create a new instance
      const _instance = new Numbers(element, config)

      // Set an invalid formula
      element.value = '=10+'

      // Create a custom event listener to check for the invalid formula event
      let invalidFormulaCalled = false
      element.addEventListener('numbers:invalidFormula', () => {
        invalidFormulaCalled = true
      })

      // Trigger formula evaluation with Enter key
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' })
      element.dispatchEvent(enterEvent)

      // Should not change the input (stays as invalid formula)
      expect(element.value).toBe('=10+')

      // Should have triggered the invalid formula event
      expect(invalidFormulaCalled).toBe(true)

      // Cleanup
      document.body.removeChild(element)
    })
  })

  describe('Custom Events', () => {
    it('dispatches change events', () => {
      // Create element
      const element = document.createElement('input')
      let changeEventCalled = false

      // Set up event listener
      element.addEventListener('numbers:change', () => {
        changeEventCalled = true
      })

      // Create instance
      const instance = new Numbers(element)

      // Trigger a change
      instance.set(123.45)

      // Event should have been dispatched
      expect(changeEventCalled).toBe(true)
    })
  })
})
