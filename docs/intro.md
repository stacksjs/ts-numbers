# Introduction to ts-numbers

<p align="center"><img src="https://github.com/stacksjs/ts-numbers/blob/main/.github/art/cover.jpg?raw=true" alt="Social Card of ts-numbers"></p>

ts-numbers is a powerful yet lightweight TypeScript library for formatting and parsing numbers with support for currencies, specialized formats, and internationalization.

## Key Features

- **Versatile Number Formatting**: Control decimal places, separators, rounding methods, and more
- **Currency Support**: Format monetary values with proper currency symbols and international formats
- **Specialized Types**: Format phone numbers, IP addresses, time, temperature, and more
- **Input Handling**: Comprehensive event handling for user input with automatic formatting
- **Internationalization**: Support for different locales, numbering systems, and RTL text
- **Unit Conversion**: Built-in conversion for temperature, weight, length, and other measurements
- **Scientific Notation**: Format very large or small numbers with scientific notation
- **Advanced Features**: Presets, extended persistence, style rules, and more

## Why ts-numbers

ts-numbers is designed to solve the complex problem of number formatting and input handling in web applications. It provides a consistent and powerful API for handling numeric values with the following benefits:

- **Type Safety**: Built from the ground up with TypeScript for excellent type safety
- **Lightweight**: Small bundle size with no external dependencies
- **Comprehensive**: Handles a wide range of number formatting needs
- **Flexible**: Works with any HTML input element or element that can display text
- **Extensible**: Easy to customize and extend with your own formatting rules
- **Well-tested**: Extensive test coverage for reliability

## Quick Example

```typescript
import { Numbers } from 'ts-numbers'

// Basic currency formatting
const price = new Numbers('#price-input', {
  currencySymbol: '$',
  decimalPlaces: 2,
  digitGroupSeparator: ',',
})

// Set a value programmatically
price.set(1234.56) // Displays as "$1,234.56"

// Get the raw numeric value
const value = price.getNumber() // 1234.56
```

Ready to get started? Check out the [Installation](/install) guide next.

## Get Started

It's rather simple to get your package development started:

```bash
# you may use this GitHub template or the following command
bunx degit stacksjs/ts-numbers my-pkg
cd my-pkg

# if you don't have pnpm installed, run `npm i -g pnpm`
bun i # install all deps
bun run build # builds the library for production-ready use

# after you have successfully committed, you may create a "release"
bun run release # automates git commits, versioning, and changelog generations
```

Check out the package.json scripts for more commands.

### Developer Experience (DX)

This Starter Kit comes pre-configured with the following:

- [Powerful Build Process](https://github.com/oven-sh/bun) - via Bun
- [Fully Typed APIs](https://www.typescriptlang.org/) - via TypeScript
- [Documentation-ready](https://vitepress.dev/) - via VitePress
- [CLI & Binary](https://www.npmjs.com/package/bunx) - via Bun & CAC
- [Be a Good Commitizen](https://www.npmjs.com/package/git-cz) - pre-configured Commitizen & git-cz setup to simplify semantic git commits, versioning, and changelog generations
- [Built With Testing In Mind](https://bun.sh/docs/cli/test) - pre-configured unit-testing powered by [Bun](https://bun.sh/docs/cli/test)
- [Renovate](https://renovatebot.com/) - optimized & automated PR dependency updates
- [ESLint](https://eslint.org/) - for code linting _(and formatting)_
- [GitHub Actions](https://github.com/features/actions) - runs your CI _(fixes code style issues, tags releases & creates its changelogs, runs the test suite, etc.)_

## Changelog

Please see our [releases](https://github.com/stacksjs/stacks/releases) page for more information on what has changed recently.

## Stargazers

[![Stargazers](https://starchart.cc/stacksjs/ts-numbers.svg?variant=adaptive)](https://starchart.cc/stacksjs/ts-numbers)

## Contributing

Please review the [Contributing Guide](https://github.com/stacksjs/contributing) for details.

## Community

For help, discussion about best practices, or any other conversation that would benefit from being searchable:

[Discussions on GitHub](https://github.com/stacksjs/stacks/discussions)

For casual chit-chat with others using this package:

[Join the Stacks Discord Server](https://discord.gg/stacksjs)

## Postcardware

Two things are true: Stacks OSS will always stay open-source, and we do love to receive postcards from wherever Stacks is used! 🌍 _We also publish them on our website. And thank you, Spatie_

Our address: Stacks.js, 12665 Village Ln #2306, Playa Vista, CA 90094

## Sponsors

We would like to extend our thanks to the following sponsors for funding Stacks development. If you are interested in becoming a sponsor, please reach out to us.

- [JetBrains](https://www.jetbrains.com/)
- [The Solana Foundation](https://solana.com/)

## Credits

- [Chris Breuer](https://github.com/chrisbbreuer)
- [All Contributors](https://github.com/stacksjs/rpx/graphs/contributors)

## License

The MIT License (MIT). Please see [LICENSE](https://github.com/stacksjs/ts-numbers/tree/main/LICENSE.md) for more information.

Made with 💙
