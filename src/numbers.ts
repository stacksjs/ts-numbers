import type { NumbersConfig, NumbersInstance } from './types'
import { defaultConfig } from './config'
import { formatNumber, parseNumber } from './format'

/**
 * Numbers - A lightweight library for formatting numbers and currencies
 */
export class Numbers implements NumbersInstance {
  private readonly element: HTMLElement
  private config: NumbersConfig
  private originalValue: string
  private initialized: boolean = false

  /**
   * Create a new Numbers instance on the provided element
   */
  constructor(element: HTMLElement | string, config: NumbersConfig = {}) {
    // Get the element
    if (typeof element === 'string') {
      const el = document.querySelector(element)
      if (!el) {
        throw new Error(`Element ${element} not found`)
      }
      this.element = el as HTMLElement
    }
    else {
      this.element = element
    }

    // Store the original value
    this.originalValue = this.getElementValue() || '0'

    // Merge configs
    this.config = { ...defaultConfig, ...config }

    // Initialize
    this.init()

    return this
  }

  /**
   * Initialize the element with event listeners and formatting
   */
  private init(): void {
    if (this.initialized)
      return

    // Set input properties if it's an input element
    if (this.isInput()) {
      const inputElement = this.element as HTMLInputElement

      // Set as readonly if configured
      if (this.config.readOnly) {
        inputElement.readOnly = true
      }

      // Add event listeners for input elements
      this.element.addEventListener('focus', this.handleFocus.bind(this))
      this.element.addEventListener('blur', this.handleBlur.bind(this))
      this.element.addEventListener('keyup', this.handleKeyup.bind(this))

      // Add wheel event if configured
      if (this.config.modifyValueOnWheel) {
        this.element.addEventListener('wheel', this.handleWheel.bind(this), { passive: false })
      }
    }

    // Format the initial value
    const currentValue = this.getElementValue()
    if (currentValue) {
      this.set(currentValue)
    }

    this.initialized = true
  }

  /**
   * Check if the element is an input
   */
  private isInput(): boolean {
    return this.element.tagName.toLowerCase() === 'input'
  }

  /**
   * Get the value from the element
   */
  private getElementValue(): string {
    if (this.isInput()) {
      return (this.element as HTMLInputElement).value
    }
    else if (this.element.hasAttribute('contenteditable')) {
      return this.element.textContent || ''
    }
    return this.element.textContent || ''
  }

  /**
   * Set the value to the element
   */
  private setElementValue(value: string): void {
    if (this.isInput()) {
      (this.element as HTMLInputElement).value = value
    }
    else if (this.element.hasAttribute('contenteditable')) {
      this.element.textContent = value
    }
    else {
      this.element.textContent = value
    }
  }

  /**
   * Handle focus event
   */
  private handleFocus(_e: FocusEvent): void {
    // Select all text if configured
    if (this.config.selectOnFocus && this.isInput()) {
      setTimeout(() => {
        (this.element as HTMLInputElement).select()
      }, 0)
    }

    // Change caret position if configured
    if (this.config.caretPositionOnFocus) {
      setTimeout(() => {
        const inputElement = this.element as HTMLInputElement
        const value = inputElement.value

        switch (this.config.caretPositionOnFocus) {
          case 'start':
            inputElement.setSelectionRange(0, 0)
            break
          case 'end':
            inputElement.setSelectionRange(value.length, value.length)
            break
          case 'decimalChar': {
            const decimalChar = this.config.decimalCharacter || '.'
            const decimalPos = value.indexOf(decimalChar)
            if (decimalPos > -1) {
              inputElement.setSelectionRange(decimalPos + 1, decimalPos + 1)
            }
            else {
              inputElement.setSelectionRange(value.length, value.length)
            }
            break
          }
        }
      }, 0)
    }
  }

  /**
   * Handle blur event
   */
  private handleBlur(_e: FocusEvent): void {
    // Reformat on blur with possible different options
    const value = this.getElementValue()
    const numValue = parseNumber({ value, config: this.config })

    // Format the value
    const formattedValue = formatNumber({
      value: numValue,
      config: this.config,
    })

    // Update the element
    this.setElementValue(formattedValue)
  }

  /**
   * Handle keyup event
   */
  private handleKeyup(e: KeyboardEvent): void {
    // Skip for special keys
    const skipKeys = ['Tab', 'Enter', 'Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    if (skipKeys.includes(e.key)) {
      return
    }

    // Get current value and update it
    const value = this.getElementValue()

    try {
      // Only process if the value has actually changed to avoid cursor jump
      if (value !== this.getElementValue()) {
        const numValue = parseNumber({ value, config: this.config })

        // Format the value, keeping cursor position
        const formattedValue = formatNumber({
          value: numValue,
          config: this.config,
        })

        // If it's an input, manually save and restore cursor position
        if (this.isInput()) {
          const inputElement = this.element as HTMLInputElement
          const currentPosition = inputElement.selectionStart || 0

          this.setElementValue(formattedValue)

          // Restore cursor position
          try {
            inputElement.setSelectionRange(currentPosition, currentPosition)
          }
          // eslint-disable-next-line unused-imports/no-unused-vars
          catch (_e) {
            // Ignore selection range errors
          }
        }
        else {
          this.setElementValue(formattedValue)
        }
      }
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (_e) {
      // If there's an error (e.g. invalid format), leave as-is
    }
  }

  /**
   * Handle wheel event
   */
  private handleWheel(e: WheelEvent): void {
    e.preventDefault()

    // Only process wheel events when element is focused or if wheelOn is set to hover
    const isWheelEnabled = this.isInput()
      && (document.activeElement === this.element || this.config.wheelStep === 'progressive')

    if (!isWheelEnabled)
      return

    // Parse current value
    const currentValue = parseNumber({
      value: this.getElementValue(),
      config: this.config,
    })

    // Determine step size
    let step: number
    if (this.config.wheelStep === 'progressive') {
      const absValue = Math.abs(currentValue)
      if (absValue === 0) {
        step = 1
      }
      else if (absValue < 10) {
        step = 0.1
      }
      else if (absValue < 100) {
        step = 1
      }
      else if (absValue < 1000) {
        step = 10
      }
      else {
        step = 100
      }
    }
    else {
      step = typeof this.config.wheelStep === 'number'
        ? this.config.wheelStep
        : Number.parseFloat(this.config.wheelStep?.toString() || '1')
    }

    // Adjust value based on wheel direction
    const newValue = currentValue + (e.deltaY < 0 ? step : -step)

    // Set the new value
    this.set(newValue)
  }

  /**
   * Get the element
   */
  getElement(): HTMLElement {
    return this.element
  }

  /**
   * Get the current configuration
   */
  getConfig(): NumbersConfig {
    return { ...this.config }
  }

  /**
   * Set a new value
   */
  set(value: number | string): NumbersInstance {
    const formattedValue = formatNumber({
      value,
      config: this.config,
    })

    this.setElementValue(formattedValue)
    return this
  }

  /**
   * Get the current formatted value
   */
  get(): string {
    return this.getElementValue()
  }

  /**
   * Get the localized value according to current configuration
   */
  getLocalized(): string {
    return this.getElementValue()
  }

  /**
   * Get the current value as a number
   */
  getNumber(): number {
    return parseNumber({
      value: this.getElementValue(),
      config: this.config,
    })
  }

  /**
   * Update the configuration
   */
  update(config: Partial<NumbersConfig>): NumbersInstance {
    this.config = { ...this.config, ...config }

    // Reformat with new config
    const numValue = this.getNumber()
    this.set(numValue)

    return this
  }

  /**
   * Clear the value
   */
  clear(): NumbersInstance {
    this.setElementValue('')
    return this
  }

  /**
   * Remove all event listeners and the instance
   */
  remove(): void {
    if (this.isInput()) {
      this.element.removeEventListener('focus', this.handleFocus.bind(this))
      this.element.removeEventListener('blur', this.handleBlur.bind(this))
      this.element.removeEventListener('keyup', this.handleKeyup.bind(this))

      if (this.config.modifyValueOnWheel) {
        this.element.removeEventListener('wheel', this.handleWheel.bind(this))
      }
    }

    // Restore original value
    this.setElementValue(this.originalValue)
  }
}
