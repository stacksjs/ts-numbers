# Input Events

ts-numbers provides powerful event handling for user input, making it easy to create interactive number inputs with automatic formatting.

## Basic Input Handling

Apply formatting automatically as users type:

```js
import { Numbers } from 'ts-numbers'

// Create a formatter that automatically formats user input
const priceInput = new Numbers('#price-input', {
  currencySymbol: '$',
  decimalPlaces: 2,
  digitGroupSeparator: ',',
})

// The input will automatically format as the user types
// e.g., typing "1234.5" will show as "$1,234.50"
```

## Focus and Blur Behavior

Control how numbers appear when the input is focused vs. blurred:

```js
const percentInput = new Numbers('#percent-input', {
  suffixText: '%', // Show % symbol
  decimalPlacesShownOnFocus: 4, // Show 4 decimal places when focused
  decimalPlacesShownOnBlur: 1, // Show only 1 decimal place when blurred
  selectOnFocus: true, // Automatically select the entire value on focus
})

// When a user focuses, they might see "12.3456%"
// When they blur, it will show as "12.3%"
```

## Caret Positioning

Control the cursor position when the input gets focus:

```js
const customCaretPosition = new Numbers('#input', {
  caretPositionOnFocus: 'start', // Options: 'start', 'end', 'decimalChar', null
})

// With 'start': cursor positions at beginning when focused
// With 'end': cursor positions at end
// With 'decimalChar': cursor positions at the decimal character
// With null: cursor position is not changed
```

## Value Scaling

Scale values between display and actual value:

```js
// Percentage displayed as whole number but stored as decimal
const percentScaler = new Numbers('#percent', {
  divisorWhenUnfocused: 100, // Divide by 100 when not focused
  suffixText: '%',
  decimalPlaces: 0, // No decimal places in display
})

percentScaler.set(0.75) // Displays as "75%" when blurred
// Shows "0.75" when focused if decimalPlacesShownOnFocus is set
```

## Keyboard Shortcuts

Support for keyboard navigation and shortcuts:

```js
const withKeyboardSupport = new Numbers('#input-with-keys', {
  modifyValueOnUpDownArrow: true, // Use up/down keys to increment/decrement
  upDownStep: 1, // Step size for arrow keys

  modifyValueOnWheel: true, // Allow mouse wheel to change value
  wheelStep: 'progressive', // 'progressive' or numeric value
  wheelOn: 'focus', // Apply wheel events only when focused
})
```

## Constraints and Validation

Apply min/max constraints to inputs:

```js
const constrainedInput = new Numbers('#constrained', {
  minimumValue: '0', // Minimum allowed value
  maximumValue: '100', // Maximum allowed value
  overrideMinMaxLimits: 'ceiling', // Behavior when limits exceeded: 'ceiling', 'floor', 'ignore', 'invalid'
})

// If user enters "150" with 'ceiling' option, value becomes "100"
// With 'floor' option, value becomes the minimum when below minimum
// With 'ignore' option, allow values outside the range
// With 'invalid' option, reject values outside the range
```

## Custom Event Handlers

Listen for ts-numbers events:

```js
const input = new Numbers('#my-input', {
  currencySymbol: '$',
})

// The original DOM element
const element = input.getElement()

// Listen for internal events
element.addEventListener('numbers:change', (e) => {
  console.log('New value:', e.detail.value)
  console.log('Formatted value:', e.detail.formatted)
})

// Other events include:
// - numbers:formatted - Fired after formatting completes
// - numbers:minExceeded - Fired when input is below minimum
// - numbers:maxExceeded - Fired when input exceeds maximum
```

## Empty Input Handling

Control what happens when input is empty:

```js
const emptyHandler = new Numbers('#input', {
  emptyInputBehavior: 'zero', // Options: 'zero', 'null', 'focus', 'press', 'min', 'max'
})

// 'zero': show "0" on empty input
// 'null': leave input empty
// 'focus': show predefined value on focus
// And so on...
```

ts-numbers offers comprehensive input handling that makes it easy to create user-friendly number inputs with consistent formatting.
