# Currency Support

ts-numbers provides robust support for formatting monetary values with various currency symbols and formatting rules.

## Basic Currency Formatting

Add currency symbols to your numbers:

```js
import { Numbers } from 'ts-numbers'

// Basic US Dollar formatting
const usd = new Numbers('#price', {
  currencySymbol: '$', // Currency symbol to display
  currencySymbolPlacement: 'p', // Placement: p=prefix, s=suffix
  decimalPlaces: 2, // Typically 2 places for currency
  digitGroupSeparator: ',', // Thousands separator
})

usd.set(1234.56) // Displays as "$1,234.56"
```

## International Currency Formats

Support for multiple currency formats:

```js
// Euro formatting (European style)
const euro = new Numbers('#euro-price', {
  currencySymbol: '€',
  currencySymbolPlacement: 's', // Euro typically shown as suffix in Europe
  decimalCharacter: ',', // European decimal separator
  digitGroupSeparator: '.', // European thousands separator
})

// British Pound
const gbp = new Numbers('#gbp-price', {
  currencySymbol: '£',
  currencySymbolPlacement: 'p',
  decimalPlaces: 2,
})

// Japanese Yen (no decimal places)
const yen = new Numbers('#yen-price', {
  currencySymbol: '¥',
  currencySymbolPlacement: 'p',
  decimalPlaces: 0, // Yen typically shown without decimals
})
```

## Using Currency Presets

ts-numbers includes built-in presets for common currencies:

```js
import { Numbers } from 'ts-numbers'
import { dollar, euro, pound, yen } from 'ts-numbers/presets'

// US Dollar with proper formatting
const usdInput = new Numbers('#usd-input', dollar)

// Euro with European formatting
const euroInput = new Numbers('#euro-input', euro)

// Create a formatter with some customizations on top of a preset
const customDollar = new Numbers('#custom-dollar', {
  ...dollar,
  decimalPlaces: 3, // Override to show 3 decimal places
  showPositiveSign: true, // Show '+' for positive values
})
```

## Accounting Format

Display negative values in accounting notation:

```js
const accountingFormat = new Numbers('#accounting', {
  currencySymbol: '$',
  negativeBracketsTypeOnBlur: '(,)', // Negative values shown as ($123.45)
})

accountingFormat.set(-42.5) // Displays as "($42.50)"
```

## Multiple Currencies in One Application

Dynamically switch between currencies:

```js
const priceDisplay = new Numbers('#price', dollar)

// Switch to Euro format
document.querySelector('#switch-to-euro').addEventListener('click', () => {
  priceDisplay.update(euro)
})

// Switch to Pound format
document.querySelector('#switch-to-pound').addEventListener('click', () => {
  priceDisplay.update(pound)
})
```

## Currency with Internationalization

Combine currency formatting with locale support:

```js
const localizedCurrency = new Numbers('#price', {
  locale: 'de-DE', // Use German locale
  currencySymbol: '€', // Euro symbol
  useGrouping: true, // Enable digit grouping
})

localizedCurrency.set(1234.56) // Displays as "1.234,56 €" in German format
```

Currency formatting in ts-numbers is designed to be flexible enough to handle different regional standards while maintaining a consistent API.
