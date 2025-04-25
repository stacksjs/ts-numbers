<p align="center"><img src=".github/art/cover.jpg" alt="Social Card of this repo"></p>

[![npm version][npm-version-src]][npm-version-href]
[![GitHub Actions][github-actions-src]][github-actions-href]
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
<!-- [![npm downloads][npm-downloads-src]][npm-downloads-href] -->
<!-- [![Codecov][codecov-src]][codecov-href] -->

# TS-Numbers

A simple, lightweight, and highly configurable TypeScript library for formatting numbers and currencies, inspired by AutoNumeric.

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

See the [full documentation](https://github.com/your-username/ts-numbers) for all configuration options.

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

## License

MIT

## Get Started

It's rather simple to get your package development started:

```bash
# you may use this GitHub template or the following command:
bunx degit stacksjs/ts-numbers my-pkg
cd my-pkg

bun i # install all deps
bun run build # builds the library for production-ready use

# after you have successfully committed, you may create a "release"
bun run release # automates git commits, versioning, and changelog generations
```

_Check out the package.json scripts for more commands._

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

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/ts-numbers?style=flat-square
[npm-version-href]: https://npmjs.com/package/ts-numbers
[github-actions-src]: https://img.shields.io/github/actions/workflow/status/stacksjs/ts-numbers/ci.yml?style=flat-square&branch=main
[github-actions-href]: https://github.com/stacksjs/ts-numbers/actions?query=workflow%3Aci

<!-- [codecov-src]: https://img.shields.io/codecov/c/gh/stacksjs/ts-numbers/main?style=flat-square
[codecov-href]: https://codecov.io/gh/stacksjs/ts-numbers -->
