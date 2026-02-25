<p align="center"><img src=".github/art/cover.jpg" alt="Social Card of ts-numbers"></p>

[![npm version](https://img.shields.io/npm/v/ts-numbers?style=flat-square)](https://npmjs.com/package/ts-numbers)
[![GitHub Actions](https://img.shields.io/github/actions/workflow/status/stacksjs/ts-numbers/ci.yml?style=flat-square&branch=main)](https://github.com/stacksjs/ts-numbers/actions?query=workflow%3Aci)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# ts-numbers

A comprehensive, lightweight TypeScript library for formatting numbers, currencies, and handling numeric inputs with advanced features.

## Features

### Core Formatting

- 🔢 [Versatile number formatting](https://ts-numbers.stacksjs.org/features/core-formatting) _with precise control over decimal places, separators, and more_
- 💰 [Multiple currency support](https://ts-numbers.stacksjs.org/features/currency-support) _with automatic formatting_
- 🌎 [Internationalization](https://ts-numbers.stacksjs.org/features/internationalization) _with locale-specific formatting and RTL support_
- 🔣 [Scientific notation](https://ts-numbers.stacksjs.org/advanced/scientific-notation) _for large or small numbers_

### Specialized Formats

- 📞 [Phone number formatting](https://ts-numbers.stacksjs.org/features/specialized-formats#phone-numbers) _with various patterns_
- 🌡️ [Temperature units](https://ts-numbers.stacksjs.org/advanced/unit-conversion#temperature-conversion) _with automatic conversion (°C, °F, K)_
- ⚖️ [Weight units](https://ts-numbers.stacksjs.org/advanced/unit-conversion#weight-conversion) _with automatic conversion (kg, g, lb, oz)_
- 📏 [Length units](https://ts-numbers.stacksjs.org/advanced/unit-conversion#length-conversion) _with automatic conversion (m, cm, mm, km, in, ft, yd, mi)_
- ⏱️ [Time formatting](https://ts-numbers.stacksjs.org/features/specialized-formats#time-formatting) _(12h/24h)_
- 🔢 [IP address formatting](https://ts-numbers.stacksjs.org/features/specialized-formats#ip-addresses) _(IPv4/IPv6)_
- 💳 [Credit card number formatting](https://ts-numbers.stacksjs.org/features/specialized-formats#credit-card-formatting)

### User Experience

- ⌨️ [Input events](https://ts-numbers.stacksjs.org/features/input-events) _with automatic formatting and validation_
- 📋 Copy/paste format conversion
- 📱 Mobile-friendly with touch controls
- ♿ Accessibility improvements _(ARIA attributes, screen reader support)_
- 🎨 Customizable styling with themes

### Advanced Features

- 🧩 [Presets](https://ts-numbers.stacksjs.org/advanced/presets) _for common number formats_
- 💾 [Extended persistence](https://ts-numbers.stacksjs.org/advanced/extended-persistence) _(localStorage, sessionStorage)_
- 🔄 [History tracking](https://ts-numbers.stacksjs.org/features/input-events#custom-event-handlers) _with undo/redo functionality_
- 📊 [Style rules](https://ts-numbers.stacksjs.org/advanced/style-rules) _for dynamic formatting based on value_

## Installation

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

## Quick Start

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

See [Usage Guide](https://ts-numbers.stacksjs.org/usage) for more examples.

## Configuration

ts-numbers supports extensive configuration options:

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
    USD: { symbol: '$', placement: 'p', decimalPlaces: 2 },
    EUR: { symbol: '€', placement: 's', decimalPlaces: 2 },
    JPY: { symbol: '¥', placement: 'p', decimalPlaces: 0 }
  },

  // Specialized formatting
  useScientificNotation: true,
  scientificNotationThreshold: 1000000,

  // Localization
  locale: 'en-US',

  // Accessibility
  ariaLabel: 'Amount in dollars'
}

const myNum = new Numbers('#amount', config)
```

See [Configuration Guide](https://ts-numbers.stacksjs.org/config) for the full list of options.

## Advanced Examples

### Multiple Currencies

```typescript
// Configure with multiple currencies
const myNum = new Numbers('#amount', {
  currencies: {
    USD: { symbol: '$', placement: 'p', decimalPlaces: 2 },
    EUR: { symbol: '€', placement: 's', decimalPlaces: 2 },
    JPY: { symbol: '¥', placement: 'p', decimalPlaces: 0 }
  },
  activeCurrency: 'USD'
})

// Switch currency
myNum.setCurrency('EUR')
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

For more advanced examples, see the [Advanced Features](https://ts-numbers.stacksjs.org/advanced/presets) section of the documentation.

## Testing

Run the test suite with:

```bash
bun test
```

## Changelog

Please see our [releases](https://github.com/stackjs/clapp/releases) page for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Community

For help, discussion about best practices, or any other conversation that would benefit from being searchable:

[Discussions on GitHub](https://github.com/stacksjs/clapp/discussions)

For casual chit-chat with others using this package:

[Join the Stacks Discord Server](https://discord.gg/stacksjs)

## Postcardware

“Software that is free, but hopes for a postcard.” We love receiving postcards from around the world showing where `ts-numbers` is being used! We showcase them on our website too.

Our address: Stacks.js, 12665 Village Ln #2306, Playa Vista, CA 90094, United States 🌎

## Credits

- [Autonumeric](https://github.com/autoNumeric/autoNumeric) - The original inspiration for this library

## Sponsors

We would like to extend our thanks to the following sponsors for funding Stacks development. If you are interested in becoming a sponsor, please reach out to us.

- [JetBrains](https://www.jetbrains.com/)
- [The Solana Foundation](https://solana.com/)

## License

The MIT License (MIT). Please see [LICENSE](LICENSE.md) for more information.

Made with 💙
