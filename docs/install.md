# Installation

Installing ts-numbers is easy and straightforward with multiple package manager options.

## Package Managers

Choose your package manager of choice:

::: code-group

```sh [npm]
npm install ts-numbers
# or with --save flag
npm install --save ts-numbers
```

```sh [bun]
bun install ts-numbers
# or shorthand
bun add ts-numbers
```

```sh [pnpm]
pnpm add ts-numbers
```

```sh [yarn]
yarn add ts-numbers
```

:::

## TypeScript Configuration

ts-numbers is built with TypeScript and includes complete type definitions. No additional packages are needed for TypeScript support.

Make sure your `tsconfig.json` includes the following settings for the best experience:

```json
{
  "compilerOptions": {
    "target": "ES2020", // Or higher
    "module": "ESNext", // For ES modules
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true // Recommended for type safety
  }
}
```

## Usage with Bundlers

ts-numbers works with all popular bundlers:

### Webpack

```js
// No special configuration needed
import { Numbers } from 'ts-numbers'
```

### Vite

```js
// Works out of the box with Vite
import { Numbers } from 'ts-numbers'
```

### Rollup

```js
// Works with standard Rollup configuration
import { Numbers } from 'ts-numbers'
```

## CDN Usage

You can also use ts-numbers directly from a CDN:

```html
<!-- ESM version -->
<script type="module">
  import { Numbers } from 'https://cdn.jsdelivr.net/npm/ts-numbers/dist/index.js'

  // Use ts-numbers
  const formatter = new Numbers('#my-input', {
    currencySymbol: '$',
    decimalPlaces: 2
  })
</script>
```

```html
<!-- UMD version (global TSNumbers object) -->
<script src="https://cdn.jsdelivr.net/npm/ts-numbers/dist/umd/ts-numbers.js"></script>
<script>
  const formatter = new TSNumbers.Numbers('#my-input', {
    currencySymbol: '$',
    decimalPlaces: 2
  })
</script>
```

## Basic Example

After installation, you can use ts-numbers in your project:

```js
import { Numbers } from 'ts-numbers'

// Create a formatter
const price = new Numbers('#price-input', {
  currencySymbol: '$',
  decimalPlaces: 2,
  digitGroupSeparator: ',',
})

// Set a value
price.set(1234.56) // Displays as "$1,234.56"
```

Now that you've installed ts-numbers, proceed to the [Usage Guide](/usage) to learn more about how to use it effectively.
