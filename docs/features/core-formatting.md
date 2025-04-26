# Core Formatting

ts-numbers provides powerful core formatting options for displaying numbers exactly how you want them.

## Basic Formatting

Format numbers with complete control over:

```js
import { Numbers } from 'ts-numbers'

// Create a formatter instance
const formatter = new Numbers('#my-input', {
  decimalPlaces: 2, // Number of decimal places to display
  decimalCharacter: '.', // Character for decimal separator
  digitGroupSeparator: ',', // Character for thousands separator
  digitGroupSpacing: 3, // Number of digits between separators
})

// Format a number
formatter.set(1234.56) // Displays as "1,234.56"
```

## Decimal Places Control

Precisely control decimal points:

```js
// Set fixed decimal places
const price = new Numbers('#price', {
  decimalPlaces: 2, // Always show 2 decimal places
  allowDecimalPadding: true, // Add zeros if needed (e.g., 10 → 10.00)
})

// For scientific values that need more precision
const scientific = new Numbers('#scientific-value', {
  decimalPlaces: 6, // Show 6 decimal places
  allowDecimalPadding: 'floats', // Only pad decimal places for actual decimal values
})
```

## Negative Number Display

Multiple ways to display negative numbers:

```js
// Standard negative sign
const standard = new Numbers('#standard', {
  negativeSignCharacter: '-', // Character to use for negative sign
  negativePositiveSignPlacement: 'l', // Position: l=left, r=right, p=prefix, s=suffix
})

// Accounting format (parentheses)
const accounting = new Numbers('#accounting', {
  negativeBracketsTypeOnBlur: '(,)', // Wrap negative numbers in parentheses
})
```

## Custom Formatting Behavior

Fine-tune how numbers behave when displayed:

```js
const customFormatter = new Numbers('#custom', {
  leadingZero: 'keep', // How to handle leading zeros: 'allow', 'deny', or 'keep'
  roundingMethod: 'U', // Rounding method: U=up, D=down, C=ceiling, F=floor, N=nearest, etc.
  emptyInputBehavior: 'zero', // What to show on empty input: 'zero', 'null', 'focus', etc.
})
```

## Get Formatted and Raw Values

Easily retrieve both formatted and raw numeric values:

```js
const myFormatter = new Numbers('#value')
myFormatter.set(1234.56)

// Get the formatted value as displayed to the user
const formatted = myFormatter.get() // "1,234.56"

// Get the raw numeric value for calculations
const numericValue = myFormatter.getNumber() // 1234.56
```

The core formatting engine provides the foundation for all of ts-numbers' features, from currency formatting to specialized types, while maintaining a small footprint and high performance.
