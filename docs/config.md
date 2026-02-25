# Configuration

_This is just an example of the ts-numbers docs._

The Reverse Proxy can be configured using a `reverse-proxy.config.ts` _(or `reverse-proxy.config.js`)_ file and it will be automatically loaded when running the `reverse-proxy` command.

ts-numbers can be configured using a `numbers.config.ts` (or `numbers.config.js`) file to set default configuration options for your entire application.

## Global Configuration

Create a configuration file in your project root:

```ts
// numbers.config.ts
import type { NumbersConfig } from 'ts-numbers'

const config: NumbersConfig = {
  /**

   _ Core formatting options

   _/
  decimalPlaces: 2,
  decimalCharacter: '.',
  digitGroupSeparator: ',',

  /**

   _ Currency options

   _/
  currencySymbol: '$',
  currencySymbolPlacement: 'p',

  /**

   _ Number constraints

   _/
  minimumValue: undefined,
  maximumValue: undefined,

  /**

   _ Decimal behavior

   _/
  allowDecimalPadding: true,
  alwaysAllowDecimalCharacter: false,

  /**

   _ Display and interaction

   _/
  caretPositionOnFocus: null,
  emptyInputBehavior: 'focus',
  leadingZero: 'deny',
  negativePositiveSignPlacement: 'l',

  /**

   _ Interaction options

   _/
  selectOnFocus: false,
  readOnly: false,
  modifyValueOnWheel: false,

  /**

   _ Miscellaneous

   _/
  roundingMethod: 'S',
  verbose: false,
}

export default config
```

Then import and use it in your application:

```ts
import { Numbers } from 'ts-numbers'
import numbersConfig from './numbers.config'

// Create a new instance with global config
const myInput = new Numbers('#my-input', {
  ...numbersConfig,
  // Override specific options as needed
  decimalPlaces: 4,
})
```

## Configuration Options

ts-numbers provides a wide range of configuration options. Here are the most common ones:

### Basic Formatting

```ts
{
  // Number of decimal places to display
  decimalPlaces: 2,

  // Character used for the decimal separator
  decimalCharacter: '.',

  // Alternative decimal character (e.g., comma for European formats)
  decimalCharacterAlternative: null,

  // Character used for thousands separator
  digitGroupSeparator: ',',

  // Number of digits between separators
  digitGroupSpacing: 3,
}
```

### Currency Formatting

```ts
{
  // Currency symbol to display
  currencySymbol: '$',

  // Placement of currency symbol: 'p' (prefix) or 's' (suffix)
  currencySymbolPlacement: 'p',
}
```

### Number Constraints

```ts
{
  // Minimum allowed value
  minimumValue: '0',

  // Maximum allowed value
  maximumValue: '1000',

  // Behavior when value exceeds min/max limits
  // Options: 'ceiling', 'floor', 'ignore', 'invalid'
  overrideMinMaxLimits: 'ceiling',
}
```

### Input Behavior

```ts
{
  // Select entire value on focus
  selectOnFocus: true,

  // Where to position cursor on focus
  // Options: 'start', 'end', 'decimalChar', null
  caretPositionOnFocus: 'end',

  // Behavior when input is empty
  // Options: 'focus', 'press', 'always', 'min', 'max', 'zero', 'null'
  emptyInputBehavior: 'zero',
}
```

### Specialized Types

```ts
{
  // Type of specialized formatting
  // Options: 'phone', 'temperature', 'weight', 'length', 'time', 'ip', 'creditCard', 'percentage'
  isSpecializedType: 'phone',

  // Options for the specialized type
  specializedOptions: {
    // For phone numbers
    phoneFormat: '(###) ###-####',
    countryCode: 'US',

    // For temperature
    temperatureUnit: 'C',
    convertTempTo: 'F',
  },
}
```

## Loading from File

The library will automatically load configuration from `numbers.config.ts` or `numbers.config.js` if present in your project root. You can also explicitly load a configuration file:

```ts
import { loadConfig } from 'ts-numbers'

// Load from a specific path
loadConfig('./path/to/custom-config.js')
```

To learn more about all available configuration options, refer to the [API Reference](/api-reference).
