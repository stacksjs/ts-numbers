# Presets

ts-numbers includes a comprehensive set of presets for common number formats, allowing you to quickly implement standardized formatting without manually configuring each option.

## Currency Presets

Ready-to-use currency formats for major currencies:

```js
import { Numbers } from 'ts-numbers'
import {
  australianDollar,
  canadianDollar,
  dollar,
  euro,
  franc,
  pound,
  real,
  rupee,
  yen,
  yuan
} from 'ts-numbers/presets'

// US Dollar formatting
const usdInput = new Numbers('#usd-input', dollar)

// Euro formatting
const euroInput = new Numbers('#euro-input', euro)

// British Pound formatting
const gbpInput = new Numbers('#gbp-input', pound)

// Japanese Yen formatting
const jpyInput = new Numbers('#jpy-input', yen)
```

## Number Format Presets

General number formatting presets:

```js
import {
  float,
  integer,
  percentage,
  scientific
} from 'ts-numbers/presets'

// Integer format (no decimal places)
const integerInput = new Numbers('#integer-input', integer)

// Float format with 2 decimal places
const floatInput = new Numbers('#float-input', float)

// Percentage format
const percentInput = new Numbers('#percent-input', percentage)

// Scientific notation
const sciInput = new Numbers('#scientific-input', scientific)
```

## Specialized Format Presets

Presets for specialized number types:

```js
import {
  creditCardFormat,
  ipv4,
  ipv6,
  percentageFormat,
  phoneInternational,
  phoneUS,
  time12h,
  time24h
} from 'ts-numbers/presets'

// US Phone format
const usPhoneInput = new Numbers('#phone-us', phoneUS)

// International phone format
const intlPhoneInput = new Numbers('#phone-intl', phoneInternational)

// IPv4 format
const ipv4Input = new Numbers('#ipv4', ipv4)

// 24-hour time format
const timeInput = new Numbers('#time', time24h)
```

## International Presets

Presets for different locales:

```js
import {
  arabicSA,
  chineseZH,
  frenchFR,
  germanDE,
  hebrewIL,
  italianIT,
  japaneseJP,
  russianRU,
  spanishES
} from 'ts-numbers/presets'

// French formatting
const frenchInput = new Numbers('#french-input', frenchFR)

// German formatting
const germanInput = new Numbers('#german-input', germanDE)

// Arabic (Saudi Arabia) formatting with RTL support
const arabicInput = new Numbers('#arabic-input', arabicSA)
```

## Extending Presets

Customize presets for your specific needs:

```js
// Start with a preset and customize it
const customDollar = new Numbers('#custom-dollar', {
  ...dollar, // Start with dollar preset
  decimalPlaces: 3, // Override to 3 decimal places
  currencySymbol: 'USD ', // Change the currency symbol display
  selectOnFocus: true, // Add selectOnFocus behavior
})

// Combine multiple presets
const customFormat = new Numbers('#custom', {
  ...float, // Start with float preset
  ...dollar, // Add dollar formatting (this will override any conflicts)
  decimalPlacesShownOnFocus: 4, // Custom setting
})
```

## Creating Your Own Presets

Define reusable presets for your application:

```js
// Create a custom preset
const myCompanyFormat = {
  currencySymbol: '$',
  currencySymbolPlacement: 'p',
  decimalCharacter: '.',
  digitGroupSeparator: ',',
  decimalPlaces: 2,
  roundingMethod: 'U',
  selectOnFocus: true,
  caretPositionOnFocus: 'end',
}

// Use it throughout your application
const price1 = new Numbers('#price1', myCompanyFormat)
const price2 = new Numbers('#price2', myCompanyFormat)
const price3 = new Numbers('#price3', myCompanyFormat)

// Export it for use across modules
export const myPresets = {
  companyDefault: myCompanyFormat,
  // Add more presets as needed
}
```

Presets make it easy to maintain consistent formatting across your application while reducing repetitive configuration code.
