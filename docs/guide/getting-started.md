# Getting Started

This guide will help you set up ts-numbers, a comprehensive TypeScript library for formatting numbers, currencies, and handling numeric inputs.

## Installation

Install ts-numbers using your preferred package manager:

```bash
# npm
npm install ts-numbers

# bun
bun add ts-numbers

# pnpm
pnpm add ts-numbers

# yarn
yarn add ts-numbers
```

## Basic Usage

### Creating a Numbers Instance

```typescript
import { Numbers } from 'ts-numbers'

// Create instance on an input element
const myNum = new Numbers('#amount', {
  decimalPlaces: 2,
  currencySymbol: '$',
  digitGroupSeparator: ','
})

// Set a value
myNum.set(1234.56)  // Displays as "$1,234.56"

// Get the numeric value
const value = myNum.getNumber()  // 1234.56
```

### Using Utility Functions

```typescript
import { formatNumber, parseNumber, roundNumber } from 'ts-numbers'

// Format a number
const formatted = formatNumber(1234.567, {
  decimalPlaces: 2,
  digitGroupSeparator: ','
})  // "1,234.57"

// Parse a formatted string
const parsed = parseNumber('$1,234.56')  // 1234.56

// Round with different methods
const rounded = roundNumber(1234.567, 2, 'halfUp')  // 1234.57
```

## Configuration Options

### Core Formatting Options

```typescript
const config = {
  // Decimal handling
  decimalPlaces: 2,              // Number of decimal places
  decimalCharacter: '.',         // Character for decimal point
  decimalCharacterAlternative: null,  // Alternative decimal input

  // Grouping
  digitGroupSeparator: ',',      // Thousands separator
  digitGroupSpacing: 3,          // Digits per group

  // Currency
  currencySymbol: '$',           // Currency symbol
  currencySymbolPlacement: 'p',  // 'p' for prefix, 's' for suffix

  // Range limits
  minimumValue: null,            // Minimum allowed value
  maximumValue: null,            // Maximum allowed value
}

const myNum = new Numbers('#amount', config)
```

### Example Configurations

**US Currency:**
```typescript
const usd = new Numbers('#price', {
  currencySymbol: '$',
  decimalPlaces: 2,
  digitGroupSeparator: ',',
  decimalCharacter: '.'
})

usd.set(1234567.89)  // "$1,234,567.89"
```

**European Format:**
```typescript
const euro = new Numbers('#price', {
  currencySymbol: ' EUR',
  currencySymbolPlacement: 's',
  decimalPlaces: 2,
  digitGroupSeparator: '.',
  decimalCharacter: ','
})

euro.set(1234567.89)  // "1.234.567,89 EUR"
```

**Percentage:**
```typescript
const percent = new Numbers('#percentage', {
  currencySymbol: '%',
  currencySymbolPlacement: 's',
  decimalPlaces: 1,
  minimumValue: 0,
  maximumValue: 100
})

percent.set(75.5)  // "75.5%"
```

## Working with Values

### Setting Values

```typescript
const myNum = new Numbers('#field')

// Set numeric value
myNum.set(1234.56)

// Set from string (parsed automatically)
myNum.set('1,234.56')

// Clear the value
myNum.clear()
```

### Getting Values

```typescript
// Get as number
const numValue = myNum.getNumber()  // 1234.56

// Get as formatted string
const strValue = myNum.getFormatted()  // "$1,234.56"

// Get raw input value
const rawValue = myNum.getRawValue()  // "1234.56"
```

## Event Handling

```typescript
const myNum = new Numbers('#amount', {
  decimalPlaces: 2,
  currencySymbol: '$',

  // Event callbacks
  onInput: (value) => {
    console.log('Input changed:', value)
  },

  onFocus: () => {
    console.log('Field focused')
  },

  onBlur: () => {
    console.log('Field blurred')
  },

  onChange: (value) => {
    console.log('Value changed:', value)
  }
})
```

## Multiple Currencies

Configure multiple currencies and switch between them:

```typescript
const myNum = new Numbers('#amount', {
  currencies: {
    USD: { symbol: '$', placement: 'p', decimalPlaces: 2 },
    EUR: { symbol: ' EUR', placement: 's', decimalPlaces: 2 },
    JPY: { symbol: 'JPY ', placement: 'p', decimalPlaces: 0 },
    GBP: { symbol: 'GBP ', placement: 'p', decimalPlaces: 2 }
  },
  activeCurrency: 'USD'
})

myNum.set(1234.56)  // "$1,234.56"

// Switch currency
myNum.setCurrency('EUR')  // "1,234.56 EUR"
myNum.setCurrency('JPY')  // "JPY 1,235" (no decimals for Yen)
```

## Keyboard Shortcuts

Configure keyboard shortcuts for common actions:

```typescript
const myNum = new Numbers('#amount', {
  keyboardShortcuts: {
    increment: 'Alt+ArrowUp',      // Increase value
    decrement: 'Alt+ArrowDown',    // Decrease value
    toggleSign: 'Alt+-',           // Toggle positive/negative
    clear: 'Alt+C',                // Clear field
    undo: 'Ctrl+Z',                // Undo
    redo: 'Ctrl+Y'                 // Redo
  },
  incrementValue: 1,   // Amount to increment/decrement
  allowNegative: true  // Allow negative values
})
```

## Validation

```typescript
const myNum = new Numbers('#amount', {
  minimumValue: 0,
  maximumValue: 10000,
  decimalPlaces: 2,

  // Called when validation fails
  onInvalidValue: (value, reason) => {
    console.log(`Invalid: ${value} - ${reason}`)
  }
})

// Validation happens automatically on input
myNum.set(15000)  // Clamped to 10000
myNum.set(-50)    // Clamped to 0
```

## Next Steps

- Learn about [Currency Formatting](/guide/currency)
- Explore all [Format Types](/guide/formats)
