import type { NumbersConfig, NumbersInstance, StyleRulesOption } from './types'
import { defaultConfig } from './config'
import { formatNumber, parseNumber } from './format'

// To track all Numbers instances for global operations
const numbersList: Numbers[] = []

/**
 * Numbers - A lightweight library for formatting numbers and currencies
 */
export class Numbers implements NumbersInstance {
  private readonly element: HTMLElement
  private config: NumbersConfig
  private originalValue: string
  private initialized: boolean = false
  private historyTable: string[] = []
  private historyIndex: number = -1

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

    // Add to list if configured
    if (this.config.createLocalList) {
      numbersList.push(this)
    }

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

    // Check for formula mode support
    if (this.config.formulaMode) {
      this.setupFormulaModeEvents()
    }

    // Set input properties if it's an input element
    if (this.isInput()) {
      const inputElement = this.element as HTMLInputElement

      // Set as readonly if configured
      if (this.config.readOnly) {
        inputElement.readOnly = true
      }

      // Add event listeners for input elements
      if (!this.config.noEventListeners) {
        this.element.addEventListener('focus', this.handleFocus.bind(this))
        this.element.addEventListener('blur', this.handleBlur.bind(this))
        this.element.addEventListener('keyup', this.handleKeyup.bind(this))
        this.element.addEventListener('keydown', this.handleKeydown.bind(this))

        // Add wheel event if configured
        if (this.config.modifyValueOnWheel) {
          this.element.addEventListener('wheel', this.handleWheel.bind(this), { passive: false })
        }

        // Unformat on hover with Alt key if configured
        if (this.config.unformatOnHover) {
          this.element.addEventListener('mouseover', this.handleMouseOver.bind(this))
          this.element.addEventListener('mouseout', this.handleMouseOut.bind(this))
        }

        // Watch external changes if configured
        if (this.config.watchExternalChanges) {
          this.watchExternalChanges()
        }
      }
    }
    else if (this.element.hasAttribute('contenteditable') && !this.config.noEventListeners) {
      // For contenteditable elements
      this.element.addEventListener('focus', this.handleFocus.bind(this))
      this.element.addEventListener('blur', this.handleBlur.bind(this))
      this.element.addEventListener('keyup', this.handleKeyup.bind(this))
      this.element.addEventListener('keydown', this.handleKeydown.bind(this))
    }

    // Format the initial value
    const currentValue = this.getElementValue()
    if (currentValue && this.config.formatOnPageLoad !== false) {
      this.set(currentValue)
    }

    this.initialized = true
  }

  /**
   * Setup event listeners for formula mode
   */
  private setupFormulaModeEvents(): void {
    if (!this.isInput())
      return

    this.element.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === '=' && this.config.formulaMode) {
        // Enter formula mode
        (this.element as HTMLInputElement).value = '='
        e.preventDefault()
      }
      else if (e.key === 'Enter' && (this.element as HTMLInputElement).value.startsWith('=')) {
        // Evaluate formula
        try {
          const formula = (this.element as HTMLInputElement).value.substring(1)
          // Use Function constructor instead of eval for better security
          // eslint-disable-next-line no-new-func
          const result = new Function(`return ${formula}`)()
          this.set(result)
          this.dispatchEvent('validFormula', { formula, result })
        }
        catch {
          this.dispatchEvent('invalidFormula', { formula: (this.element as HTMLInputElement).value.substring(1) })
        }
        e.preventDefault()
      }
    })
  }

  /**
   * Watch for external value changes
   */
  private watchExternalChanges(): void {
    if (!this.isInput())
      return

    // Create a MutationObserver to watch for value attribute changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'value') {
          const newValue = (this.element as HTMLInputElement).value
          if (newValue !== this.get()) {
            this.set(newValue)
          }
        }
      })
    })

    // Start observing value attribute changes
    observer.observe(this.element, { attributes: true, attributeFilter: ['value'] })
  }

  /**
   * Dispatch a custom event
   */
  private dispatchEvent(eventName: string, detail?: any): void {
    const event = new CustomEvent(`numbers:${eventName}`, {
      bubbles: true,
      cancelable: true,
      detail,
    })
    this.element.dispatchEvent(event)
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

    // Apply style rules if configured
    this.applyStyleRules(parseNumber({ value, config: this.config }))

    // Save in history
    this.saveValueToHistory(value)
  }

  /**
   * Apply style rules to the element
   */
  private applyStyleRules(rawValue: number): void {
    const styleRules = this.config.styleRules
    if (!styleRules)
      return

    // Remove existing classes
    if (styleRules.positive) {
      this.element.classList.remove(styleRules.positive)
    }
    if (styleRules.negative) {
      this.element.classList.remove(styleRules.negative)
    }

    // Remove any range classes
    if (styleRules.ranges) {
      styleRules.ranges.forEach((range) => {
        this.element.classList.remove(range.class)
      })
    }

    // Apply positive/negative classes
    if (rawValue > 0 && styleRules.positive) {
      this.element.classList.add(styleRules.positive)
    }
    else if (rawValue < 0 && styleRules.negative) {
      this.element.classList.add(styleRules.negative)
    }

    // Apply range classes
    if (styleRules.ranges) {
      styleRules.ranges.forEach((range) => {
        if (rawValue >= range.min && rawValue <= range.max) {
          this.element.classList.add(range.class)
        }
      })
    }

    // Apply user-defined callbacks
    if (styleRules.userDefined) {
      styleRules.userDefined.forEach((userDef) => {
        const result = userDef.callback(rawValue)

        if (result === true && typeof userDef.classes === 'string') {
          this.element.classList.add(userDef.classes)
        }
        else if (result === false && typeof userDef.classes === 'string') {
          this.element.classList.remove(userDef.classes)
        }
        else if (Array.isArray(userDef.classes)) {
          if (typeof result === 'boolean' && userDef.classes.length === 2) {
            // Toggle between two classes
            if (result) {
              this.element.classList.add(userDef.classes[0])
              this.element.classList.remove(userDef.classes[1])
            }
            else {
              this.element.classList.remove(userDef.classes[0])
              this.element.classList.add(userDef.classes[1])
            }
          }
          else if (typeof result === 'number' && result >= 0 && result < userDef.classes.length) {
            // Apply class by index
            userDef.classes.forEach((cls, i) => {
              if (i === result) {
                this.element.classList.add(cls)
              }
              else {
                this.element.classList.remove(cls)
              }
            })
          }
          else if (Array.isArray(result)) {
            // Apply multiple classes by index array
            userDef.classes.forEach((cls, i) => {
              if (Array.isArray(result) && result.includes(i)) {
                this.element.classList.add(cls)
              }
              else {
                this.element.classList.remove(cls)
              }
            })
          }
        }
      })
    }
  }

  /**
   * Save value to history
   */
  private saveValueToHistory(value: string): void {
    // Don't save duplicates
    if (this.historyTable.length === 0 || this.historyTable[this.historyTable.length - 1] !== value) {
      // Add to history
      this.historyTable.push(value)

      // Limit history size
      const historySize = 20 // Default history size
      while (this.historyTable.length > historySize) {
        this.historyTable.shift()
      }

      // Update history index
      this.historyIndex = this.historyTable.length - 1
    }
  }

  /**
   * Handle focus event
   */
  private handleFocus(_e: FocusEvent): void {
    // Save the current value for potential cancellation
    this.saveValueToHistory(this.getElementValue())

    // Apply different format settings for focus state
    if (this.config.decimalPlacesShownOnFocus !== null) {
      const value = this.getNumber()
      const formatConfig = {
        ...this.config,
        decimalPlaces: this.config.decimalPlacesShownOnFocus,
      }
      const formattedValue = formatNumber({ value, config: formatConfig })
      this.setElementValue(formattedValue)
    }

    // Select all text if configured
    if (this.config.selectOnFocus && this.isInput()) {
      setTimeout(() => {
        if (this.config.selectNumberOnly) {
          this.selectNumbersOnly()
        }
        else {
          (this.element as HTMLInputElement).select()
        }
      }, 0)
    }

    // Change caret position if configured
    if (this.config.caretPositionOnFocus && this.isInput()) {
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

    this.dispatchEvent('focus')
  }

  /**
   * Handle blur event
   */
  private handleBlur(_e: FocusEvent): void {
    // Reformat on blur with possible different options
    const value = this.getElementValue()
    const numValue = parseNumber({ value, config: this.config })

    // Handle scaling if configured
    if (this.config.divisorWhenUnfocused) {
      const scaledValue = numValue / this.config.divisorWhenUnfocused

      // Format with potential different decimal places
      const formatConfig = {
        ...this.config,
        decimalPlaces: this.config.decimalPlacesShownOnBlur !== null
          ? this.config.decimalPlacesShownOnBlur
          : this.config.decimalPlaces,
        suffixText: this.config.symbolWhenUnfocused || this.config.suffixText,
      }

      const formattedValue = formatNumber({
        value: scaledValue,
        config: formatConfig,
      })

      this.setElementValue(formattedValue)
    }
    else {
      // Apply decimal places for blur state if configured
      if (this.config.decimalPlacesShownOnBlur !== null) {
        const formatConfig = {
          ...this.config,
          decimalPlaces: this.config.decimalPlacesShownOnBlur,
        }
        const formattedValue = formatNumber({ value: numValue, config: formatConfig })
        this.setElementValue(formattedValue)
      }
      else {
        // Standard formatting
        const formattedValue = formatNumber({
          value: numValue,
          config: this.config,
        })

        // Update the element
        this.setElementValue(formattedValue)
      }
    }

    // Apply negative brackets if configured
    if (this.config.negativeBracketsTypeOnBlur && numValue < 0) {
      const brackets = this.config.negativeBracketsTypeOnBlur.split(',')
      if (brackets.length === 2) {
        const formattedValue = this.getElementValue().replace(/-/g, '')
        this.setElementValue(`${brackets[0]}${formattedValue}${brackets[1]}`)
      }
    }

    this.dispatchEvent('blur')
  }

  /**
   * Handle keydown event
   */
  private handleKeydown(e: KeyboardEvent): void {
    // Handle arrow keys for value modification
    if (this.config.modifyValueOnUpDownArrow && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      e.preventDefault()

      // Get current value
      const currentValue = this.getNumber()

      // Determine step size
      let step: number
      if (this.config.upDownStep === 'progressive') {
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
        step = typeof this.config.upDownStep === 'number'
          ? this.config.upDownStep
          : Number.parseFloat(this.config.upDownStep?.toString() || '1')
      }

      // Apply the step based on the arrow key
      const newValue = currentValue + (e.key === 'ArrowUp' ? step : -step)

      // Set the new value
      this.set(newValue)
    }

    // Handle Escape key for cancellation
    if (e.key === 'Escape' && this.config.isCancellable) {
      e.preventDefault()

      // Go back one step in history
      if (this.historyIndex > 0) {
        this.historyIndex -= 1
        this.setElementValue(this.historyTable[this.historyIndex])
      }
    }

    // Check for negative/positive key
    if ((e.key === '-' || e.key === '+') && this.isInput()) {
      if (this.config.negativePositiveSignBehavior === true) {
        // Toggle between positive and negative
        const currentValue = this.getNumber()
        this.set(currentValue * -1)
        e.preventDefault()
      }
    }
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
          catch {
            // Ignore selection range errors
          }
        }
        else {
          this.setElementValue(formattedValue)
        }
      }
    }
    catch {
      // If there's an error (e.g. invalid format), leave as-is
    }
  }

  /**
   * Handle wheel event
   */
  private handleWheel(e: WheelEvent): void {
    e.preventDefault()

    // Check if wheel should be processed based on wheelOn setting
    const isWheelEnabled = this.isInput()
      && ((this.config.wheelOn === 'focus' && document.activeElement === this.element)
        || (this.config.wheelOn === 'hover'))

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
   * Handle mouse over event for unformatting on Alt key press
   */
  private handleMouseOver(): void {
    if (!this.config.unformatOnHover)
      return

    // Listen for Alt key presses
    const altKeyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Alt') {
        // Save the formatted value
        const formattedValue = this.getElementValue()

        // Show the raw value
        if (this.isInput()) {
          (this.element as HTMLInputElement).value = this.getNumber().toString()
        }
        else {
          this.element.textContent = this.getNumber().toString()
        }

        // Restore on Alt key up
        const altKeyUpHandler = () => {
          // Restore formatted value
          if (this.isInput()) {
            (this.element as HTMLInputElement).value = formattedValue
          }
          else {
            this.element.textContent = formattedValue
          }

          // Remove event listener
          document.removeEventListener('keyup', altKeyUpHandler)
        }

        // Listen for Alt key up
        document.addEventListener('keyup', altKeyUpHandler)
      }
    }

    // Add event listener for Alt key
    document.addEventListener('keydown', altKeyHandler)

    // Remove event listener when mouse leaves
    const mouseOutHandler = () => {
      document.removeEventListener('keydown', altKeyHandler)
      this.element.removeEventListener('mouseout', mouseOutHandler)
    }

    // Add mouseout listener
    this.element.addEventListener('mouseout', mouseOutHandler)
  }

  /**
   * Handle mouse out event
   */
  private handleMouseOut(): void {
    // This is here for future enhancements
  }

  /**
   * Select only the numeric part of the value
   */
  private selectNumbersOnly(): void {
    if (!this.isInput())
      return

    const inputElement = this.element as HTMLInputElement
    const value = inputElement.value

    // Find the starting position (after currency symbol)
    let startPos = 0
    const currencySymbol = this.config.currencySymbol || ''

    if (this.config.currencySymbolPlacement === 'p' && currencySymbol) {
      startPos = currencySymbol.length
    }

    // Find the ending position (before suffix)
    let endPos = value.length
    const suffixText = this.config.suffixText || ''

    if (suffixText) {
      endPos = value.lastIndexOf(suffixText)
      if (endPos === -1) {
        endPos = value.length
      }
    }

    // Select that range
    inputElement.setSelectionRange(startPos, endPos)
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
    // Check if value is valuesToStrings replacement
    if (typeof value === 'number' || typeof value === 'string') {
      if (this.config.valuesToStrings) {
        const stringValue = value.toString()
        if (stringValue in this.config.valuesToStrings) {
          this.setElementValue(this.config.valuesToStrings[stringValue])
          return this
        }
      }
    }

    // Convert null to empty string or special handling based on emptyInputBehavior
    if (value === null) {
      if (this.config.emptyInputBehavior === 'null') {
        this.setElementValue('')
        return this
      }
      else if (this.config.emptyInputBehavior === 'min') {
        value = this.config.minimumValue || '0'
      }
      else if (this.config.emptyInputBehavior === 'max') {
        value = this.config.maximumValue || '0'
      }
      else if (this.config.emptyInputBehavior === 'zero' || this.config.emptyInputBehavior === 'focus' || this.config.emptyInputBehavior === 'press' || this.config.emptyInputBehavior === 'always') {
        value = 0
      }
      else {
        value = 0
      }
    }

    // Check for limit overrides
    if (this.config.overrideMinMaxLimits) {
      const numValue = typeof value === 'string' ? Number.parseFloat(value) : value
      const minValue = Number.parseFloat(this.config.minimumValue || '-10000000000000')
      const maxValue = Number.parseFloat(this.config.maximumValue || '10000000000000')

      if (this.config.overrideMinMaxLimits === 'ceiling' && numValue > maxValue) {
        value = maxValue
      }
      else if (this.config.overrideMinMaxLimits === 'floor' && numValue < minValue) {
        value = minValue
      }
      else if (this.config.overrideMinMaxLimits === 'ignore') {
        // Allow any value
      }
      else if (this.config.overrideMinMaxLimits === 'invalid' && (numValue < minValue || numValue > maxValue)) {
        // Set invalid state
        this.element.classList.add('an-invalid')
        this.dispatchEvent('invalidValue', { value: numValue })
      }
    }

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
      this.element.removeEventListener('keydown', this.handleKeydown.bind(this))

      if (this.config.modifyValueOnWheel) {
        this.element.removeEventListener('wheel', this.handleWheel.bind(this))
      }

      if (this.config.unformatOnHover) {
        this.element.removeEventListener('mouseover', this.handleMouseOver.bind(this))
        this.element.removeEventListener('mouseout', this.handleMouseOut.bind(this))
      }
    }

    // Remove from global list
    const index = numbersList.indexOf(this)
    if (index !== -1) {
      numbersList.splice(index, 1)
    }

    // Restore original value
    this.setElementValue(this.originalValue)
  }

  /**
   * Static method to access all Numbers instances
   */
  static getList(): Numbers[] {
    return [...numbersList]
  }
}
