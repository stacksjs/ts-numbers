<p align="center"><img src=".github/art/cover.jpg" alt="Social Card of this repo"></p>

[![npm version][npm-version-src]][npm-version-href]
[![GitHub Actions][github-actions-src]][github-actions-href]
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
<!-- [![npm downloads][npm-downloads-src]][npm-downloads-href] -->
<!-- [![Codecov][codecov-src]][codecov-href] -->

# TypeScript Numbers 🔢

A comprehensive, lightweight TypeScript library for formatting numbers, currencies, and handling numeric inputs with advanced features.

## Features

- 🌐 Multiple currency support with automatic formatting
- 📱 Mobile-friendly with touch controls
- 🔣 Scientific notation support for large numbers
- 🌍 Internationalization with locale-specific formatting
- ⌨️ Customizable keyboard shortcuts
- 🧩 Batch operations for multiple instances
- 📋 Copy/paste format conversion
- ♿ Accessibility improvements (ARIA attributes, screen reader support)
- 🎨 Customizable styling with themes
- 💾 Data persistence options (localStorage, sessionStorage, cookies)
- 🔄 History tracking with undo/redo functionality
- 📊 Form validation integration
- 📞 Phone number formatting with various patterns
- ⚖️ Weight units with automatic conversion (kg, g, lb, oz)
- 📏 Length units with automatic conversion (m, cm, mm, km, in, ft, yd, mi)
- 🌡️ Temperature units with automatic conversion (°C, °F, K)
- ⏱️ Time formatting (12h/24h)
- 🔢 IP address formatting (IPv4/IPv6)
- 💳 Credit card number formatting

## Installation

```bash
npm install ts-numbers
```

## Basic Usage

```typescript
import { Numbers } from 'ts-numbers'

// Create a new instance on an input element
const myNum = new Numbers('#amount', {
  decimalPlaces: 2,
  currencySymbol: '$',
  digitGroupSeparator: ',',
})

// Set a value
myNum.set(1234.56) // Will display as "$1,234.56"

// Get the numeric value
const value = myNum.getNumber() // Returns 1234.56
```

## Configuration Options

The library supports extensive configuration options:

```typescript
const config = {
  // Core formatting options
  decimalPlaces: 2,
  decimalCharacter: '.',
  digitGroupSeparator: ',',
  currencySymbol: '$',

  // Keyboard shortcuts
  keyboardShortcuts: {
    increment: 'Alt+ArrowUp',
    decrement: 'Alt+ArrowDown',
    toggleSign: 'Alt+-',
    clear: 'Alt+C',
  },

  // Multiple currencies
  currencies: {
    USD: {
      symbol: '$',
      placement: 'p',
      decimalPlaces: 2,
      locale: 'en-US'
    },
    EUR: {
      symbol: '€',
      placement: 's',
      decimalPlaces: 2,
      locale: 'de-DE',
      decimalCharacter: ',',
      groupSeparator: '.'
    }
  },

  // Scientific notation
  useScientificNotation: true,
  scientificNotationThreshold: 1000000,

  // Localization
  locale: 'en-US',
  numberingSystem: 'latn',

  // Persistence
  persistenceMethod: 'localStorage',
  persistenceKey: 'my-number-value',

  // Accessibility
  ariaLabel: 'Amount in dollars'
}

const myNum = new Numbers('#amount', config)
```

## Advanced Usage

### Multiple Currencies

```typescript
// Configure with multiple currencies
const myNum = new Numbers('#amount', {
  currencies: {
    USD: { symbol: '$', placement: 'p', decimalPlaces: 2, locale: 'en-US' },
    EUR: { symbol: '€', placement: 's', decimalPlaces: 2, locale: 'de-DE' },
    JPY: { symbol: '¥', placement: 'p', decimalPlaces: 0, locale: 'ja-JP' }
  },
  activeCurrency: 'USD'
})

// Switch currency
myNum.setCurrency('EUR')
```

### Keyboard Shortcuts

```typescript
const myNum = new Numbers('#amount', {
  keyboardShortcuts: {
    increment: 'Alt+ArrowUp',
    decrement: 'Alt+ArrowDown',
    incrementLarge: 'Alt+Shift+ArrowUp',
    decrementLarge: 'Alt+Shift+ArrowDown',
    toggleSign: 'Alt+-',
    clear: 'Alt+C',
    undo: 'Alt+Z',
    redo: 'Alt+Shift+Z'
  }
})
```

### Touch Controls for Mobile

```typescript
// Enable touch controls for all number inputs
Numbers.enableTouchControls('input[type="number"]', {
  buttonSize: '40px',
  buttonStyle: 'circle',
  position: 'right'
})
```

### Batch Operations

```typescript
// Update all instances at once
Numbers.updateAll({ decimalPlaces: 2 })

// Set the same value to all instances
Numbers.setAll(0)

// Set the same currency to all instances
Numbers.setCurrencyAll('EUR')
```

### Scientific Notation

```typescript
const myNum = new Numbers('#amount', {
  useScientificNotation: true,
  scientificNotationThreshold: 1000000
})

myNum.set(1234567) // Will display as "1.23e+6"
```

### Data Persistence

```typescript
const myNum = new Numbers('#amount', {
  persistenceMethod: 'localStorage',
  persistenceKey: 'user-amount'
})
```

### Undo/Redo History

```typescript
// Undo last change
myNum.undo()

// Redo previously undone change
myNum.redo()
```

## Browser Support

The library supports all modern browsers:

- Chrome, Edge (Chromium-based)
- Firefox
- Safari
- Opera
- Mobile browsers (iOS Safari, Chrome for Android)

## License

MIT

## Features

- **Live formatting**: Format numbers and currencies as you type
- **Highly configurable**: Customize decimal places, group separators, currency symbols, and more
- **International support**: Built-in presets for various currencies and number formats
- **DOM friendly**: Works with `<input>` elements as well as elements with the `contenteditable` attribute
- **Modern TypeScript**: Written in TypeScript with full type safety

## Installation

```bash
bun add ts-numbers
```

or

```bash
npm install ts-numbers
```

## Usage

### Basic Usage

```typescript
import Numbers from 'ts-numbers'

// Format a number in an input element
const element = document.querySelector('#price')
const numbers = new Numbers(element, {
  currencySymbol: '$',
  digitGroupSeparator: ',',
  decimalPlaces: 2
})

// Set a value programmatically
numbers.set(1234.56) // Will display as "$1,234.56"
```

### Using Presets

```typescript
import Numbers, { euro, percentage } from 'ts-numbers'

// Create a Euro-formatted input
const euroInput = new Numbers('#euro-price', euro)

// Create a percentage input
const percentInput = new Numbers('#percentage', percentage)
```

### Configuration

Create a `numbers.config.ts` file in your project root to set global defaults:

```typescript
import type { NumbersConfig } from 'ts-numbers'

const config: NumbersConfig = {
  decimalPlaces: 2,
  currencySymbol: '$',
  // ...other options
}

export default config
```

## API Reference

### `Numbers` Class

The main class for creating formatted number inputs.

```typescript
// Create a new instance
const numbers = new Numbers(element, config)

// Methods
numbers.set(1234.56) // Set a new value
numbers.get() // Get the formatted value as a string
numbers.getNumber() // Get the raw value as a number
numbers.update(config) // Update configuration
numbers.clear() // Clear the value
numbers.remove() // Remove event listeners and cleanup
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `decimalPlaces` | number | 2 | Number of decimal places |
| `decimalCharacter` | string | "." | Decimal separator character |
| `digitGroupSeparator` | string | "," | Thousands separator character |
| `currencySymbol` | string | "" | Currency symbol to display |
| `currencySymbolPlacement` | "p" or "s" | "p" | Currency symbol placement (prefix/suffix) |
| ... | ... | ... | Many more options available |

See the [full documentation](https://github.com/stacksjs/ts-numbers) for all configuration options.

## Predefined Formats

The library includes several predefined formats for common currencies and number formats:

- `dollar`: US Dollar format
- `euro`: Euro format
- `pound`: British Pound format
- `yen`: Japanese Yen format
- `franc`: Swiss Franc format
- `rupee`: Indian Rupee format
- `real`: Brazilian Real format
- `yuan`: Chinese Yuan format
- `ruble`: Russian Ruble format

And number formats:

- `integer`: Integer format with no decimal places
- `float`: Float format with 2 decimal places
- `percentage`: Percentage format with % suffix
- `scientific`: Scientific notation format
- `accounting`: Accounting format

## Testing

```bash
bun test
```

## Changelog

Please see our [releases](https://github.com/stackjs/ts-numbers/releases) page for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Community

For help, discussion about best practices, or any other conversation that would benefit from being searchable:

[Discussions on GitHub](https://github.com/stacksjs/ts-numbers/discussions)

For casual chit-chat with others using this package:

[Join the Stacks Discord Server](https://discord.gg/stacksjs)

## Postcardware

"Software that is free, but hopes for a postcard." We love receiving postcards from around the world showing where Stacks is being used! We showcase them on our website too.

Our address: Stacks.js, 12665 Village Ln #2306, Playa Vista, CA 90094, United States 🌎

## Sponsors

We would like to extend our thanks to the following sponsors for funding Stacks development. If you are interested in becoming a sponsor, please reach out to us.

- [JetBrains](https://www.jetbrains.com/)
- [The Solana Foundation](https://solana.com/)

## Specialized Number Types

The library offers specialized formatting for different types of numbers:

### Phone Numbers

```typescript
import { Numbers, phoneInternational, phoneUS } from 'ts-numbers'

// U.S. phone number format: (123) 456-7890
const phoneInput = new Numbers('#phone', phoneUS)

// International phone number: +1 (123) 456-7890
const intlPhone = new Numbers('#intl-phone', phoneInternational)

// Custom phone format
const customPhone = new Numbers('#custom-phone', {
  isSpecializedType: 'phone',
  specializedOptions: {
    phoneFormat: '###-###-####',
    countryCode: 'CA'
  }
})
```

### Weight Units

```typescript
import { createUnitConverter, Numbers, weightKg, weightLbs } from 'ts-numbers'

// Weight in kilograms
const kgInput = new Numbers('#weight-kg', weightKg)

// Weight in pounds
const lbsInput = new Numbers('#weight-lbs', weightLbs)

// Converter that shows pounds when you enter kilograms
const kgToLbs = new Numbers('#kg-to-lbs', createUnitConverter('kg', 'lb'))
```

### Length Units

```typescript
import { createUnitConverter, lengthCm, lengthFeet, lengthMeters, Numbers } from 'ts-numbers'

// Length in meters
const metersInput = new Numbers('#length-m', lengthMeters)

// Length in centimeters
const cmInput = new Numbers('#length-cm', lengthCm)

// Length in feet
const feetInput = new Numbers('#length-ft', lengthFeet)

// Converter from meters to feet
const mToFt = new Numbers('#m-to-ft', createUnitConverter('m', 'ft'))
```

### Temperature

```typescript
import { createUnitConverter, Numbers, tempCelsius, tempFahrenheit, tempKelvin } from 'ts-numbers'

// Temperature in Celsius
const celsiusInput = new Numbers('#temp-c', tempCelsius)

// Temperature in Fahrenheit
const fahrenheitInput = new Numbers('#temp-f', tempFahrenheit)

// Temperature in Kelvin
const kelvinInput = new Numbers('#temp-k', tempKelvin)

// Converter from Celsius to Fahrenheit
const cToF = new Numbers('#c-to-f', createUnitConverter('C', 'F'))
```

### Time Format

```typescript
import { Numbers, time12h, time24h } from 'ts-numbers'

// 12-hour format with AM/PM
const time12hInput = new Numbers('#time-12h', time12h)

// 24-hour format
const time24hInput = new Numbers('#time-24h', time24h)
```

### IP Addresses

```typescript
import { ipAddress, Numbers } from 'ts-numbers'

// Format IPv4 addresses
const ipv4Input = new Numbers('#ipv4', ipAddress)

// Format IPv6 addresses
const ipv6Input = new Numbers('#ipv6', {
  ...ipAddress,
  specializedOptions: {
    ipVersion: 'v6'
  }
})
```

### Credit Card Numbers

```typescript
import { creditCard, Numbers } from 'ts-numbers'

// Auto-detect card type
const cardInput = new Numbers('#credit-card', creditCard)

// Specific card format
const amexCard = new Numbers('#amex-card', {
  ...creditCard,
  specializedOptions: {
    creditCardFormat: 'amex'
  }
})
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/ts-numbers?style=flat-square
[npm-version-href]: https://npmjs.com/package/ts-numbers
[github-actions-src]: https://img.shields.io/github/actions/workflow/status/stacksjs/ts-numbers/ci.yml?style=flat-square&branch=main
[github-actions-href]: https://github.com/stacksjs/ts-numbers/actions?query=workflow%3Aci

<!-- [codecov-src]: https://img.shields.io/codecov/c/gh/stacksjs/ts-numbers/main?style=flat-square
[codecov-href]: https://codecov.io/gh/stacksjs/ts-numbers -->
