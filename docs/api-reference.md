# API Reference

This page documents the complete API for ts-numbers.

## Core Class: Numbers

The main class that provides all functionality.

### Constructor

```typescript
constructor(element: HTMLElement | string, config: NumbersConfig = {})
```

Creates a new Numbers instance.

- `element`: An HTMLElement or CSS selector string referencing the input element to attach to
- `config`: Configuration options (see [Configuration Options](#configuration-options))

### Instance Methods

| Method | Description |
|--------|-------------|
| `set(value: number &#124; string)` | Sets a new value with formatting applied |
| `get()` | Gets the current value as a string |
| `getNumber()` | Gets the current value as a number |
| `getLocalized()` | Gets the localized value according to current configuration |
| `getElement()` | Gets the DOM element that this instance is attached to |
| `getConfig()` | Gets the current configuration |
| `update(config: Partial<NumbersConfig>)` | Updates the configuration |
| `clear()` | Clears the current value |
| `remove()` | Removes the formatting and event listeners |
| `setCurrency(currencyCode: string)` | Sets a specific currency format |
| `getAvailableCurrencies()` | Returns an array of available currency codes |
| `undo()` | Reverts to the previous value (if history enabled) |
| `redo()` | Reverts an undo action (if history enabled) |

All instance methods (except `getNumber()`, `get()`, `getElement()`, etc.) return the Numbers instance for chaining.

## Configuration Options

### Basic Formatting

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `decimalPlaces` | number | 2 | Number of decimal places to display |
| `decimalCharacter` | string | '.' | Character used for the decimal separator |
| `decimalCharacterAlternative` | string &#124; null | null | Alternative decimal character (e.g., ',') |
| `digitGroupSeparator` | string | ',' | Character used for thousands separator |
| `digitGroupSpacing` | string &#124; number | 3 | Number of digits between separators |

### Currency Formatting

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `currencySymbol` | string | '' | Currency symbol to display |
| `currencySymbolPlacement` | 'p' &#124; 's' | 'p' | Placement of currency symbol: prefix or suffix |

### Number Constraints

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `minimumValue` | string | undefined | Minimum allowed value |
| `maximumValue` | string | undefined | Maximum allowed value |
| `overrideMinMaxLimits` | 'ceiling' &#124; 'floor' &#124; 'ignore' &#124; 'invalid' &#124; null | null | Behavior when value exceeds min/max limits |

### Decimal Behavior

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `allowDecimalPadding` | boolean &#124; 'floats' | true | Whether to pad decimals with zeros |
| `alwaysAllowDecimalCharacter` | boolean | false | Always allow decimal character (even if decimalPlaces: 0) |

### Display and Interaction

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `caretPositionOnFocus` | 'start' &#124; 'end' &#124; 'decimalChar' &#124; null | null | Where to position cursor on focus |
| `emptyInputBehavior` | string | 'focus' | Behavior when input is empty |
| `leadingZero` | 'allow' &#124; 'deny' &#124; 'keep' | 'deny' | How to handle leading zeros |
| `negativePositiveSignPlacement` | 'l' &#124; 'r' &#124; 'p' &#124; 's' &#124; null | 'l' | Position of negative/positive sign |
| `negativeSignCharacter` | string | '-' | Character for negative sign |
| `positiveSignCharacter` | string | '+' | Character for positive sign |
| `showPositiveSign` | boolean | false | Whether to show plus sign for positive numbers |
| `suffixText` | string | '' | Text to append after the number |
| `negativeBracketsTypeOnBlur` | string &#124; null | null | Brackets for negative numbers, e.g., '(,)' |

### Interaction Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `selectOnFocus` | boolean | false | Select entire value on focus |
| `selectNumberOnly` | boolean | false | Select only the numeric part on focus |
| `readOnly` | boolean | false | Make the input read-only |
| `modifyValueOnWheel` | boolean | false | Allow value change via mouse wheel |
| `wheelStep` | 'progressive' &#124; string &#124; number | 1 | Increment size for mouse wheel |
| `modifyValueOnUpDownArrow` | boolean | false | Allow value change via up/down arrow keys |
| `upDownStep` | 'progressive' &#124; string &#124; number | 1 | Increment size for arrow keys |
| `wheelOn` | 'focus' &#124; 'hover' | 'focus' | When to apply wheel events |

### Scaling Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `divisorWhenUnfocused` | number &#124; null | null | Divisor applied to value when not focused |
| `decimalPlacesShownOnBlur` | number &#124; null | null | Decimal places shown when element loses focus |
| `decimalPlacesShownOnFocus` | number &#124; null | null | Decimal places shown when element has focus |
| `symbolWhenUnfocused` | string &#124; null | null | Symbol to show when not focused |

### Specialized Types

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `isSpecializedType` | string &#124; null | null | Type of specialized formatting: 'phone', 'temperature', etc. |
| `specializedOptions` | object | undefined | Options for the specialized type |

### Scientific Notation

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `useScientificNotation` | boolean | false | Enable scientific notation |
| `scientificNotationThreshold` | number | 1e+15 | Threshold for using scientific notation |
| `engineeringNotation` | boolean | false | Use engineering notation (exponents in multiples of 3) |

### Internationalization

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `locale` | string | undefined | Locale code (e.g., 'en-US', 'de-DE') |
| `useGrouping` | boolean | true | Whether to use digit grouping (thousands separators) |
| `numberingSystem` | string | undefined | Numbering system (e.g., 'arab', 'latn') |

### Miscellaneous

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `roundingMethod` | string | 'S' | Rounding method |
| `saveValueToSessionStorage` | boolean | false | Save value to sessionStorage |
| `createLocalList` | boolean | true | Add instance to global list |
| `watchExternalChanges` | boolean | false | Watch for external value changes |
| `verbose` | boolean | false | Enable verbose console logging |

## Static Functions

ts-numbers also provides standalone formatting functions:

```typescript
// Format a number according to configuration
formatNumber({ value: number | string, config?: NumbersConfig }): string

// Parse a formatted string back to a number
parseNumber({ value: string, config?: NumbersConfig }): number
```

## Presets

ts-numbers includes many predefined configuration presets:

```typescript
import {
  arabicSA, // Currency presets
  dollar,
  euro,
  float, // Locale presets
  frenchFR,
  germanDE,

  hebrewIL, // Number format presets
  integer,
  ipv4,
  percentage,

  phoneInternational, // Specialized format presets
  phoneUS,
  pound,
  rupee,

  scientific,
  time24h,
  yen,
  yuan
} from 'ts-numbers/presets'
```

These can be imported and used directly with the Numbers constructor:

```typescript
const dollarInput = new Numbers('#price', dollar)
```

## Events

The following events are dispatched on the element:

| Event | Description |
|-------|-------------|
| `numbers:formatted` | Fired after formatting is applied |
| `numbers:change` | Fired when the value changes |
| `numbers:minExceeded` | Fired when input is below minimum allowed value |
| `numbers:maxExceeded` | Fired when input exceeds maximum allowed value |
| `numbers:invalid` | Fired when invalid input is detected |

Events include `detail` with relevant information:

```typescript
element.addEventListener('numbers:change', (e) => {
  console.log('New value:', e.detail.value)
  console.log('Formatted value:', e.detail.formatted)
})
```
