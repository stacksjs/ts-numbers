# Currency Formatting

ts-numbers provides comprehensive currency formatting capabilities with support for multiple currencies, locales, and formatting styles.

## Basic Currency Formatting

```typescript
import { Numbers } from 'ts-numbers'

// Simple USD formatting
const usd = new Numbers('#price', {
  currencySymbol: '$',
  decimalPlaces: 2,
  digitGroupSeparator: ','
})

usd.set(1234.56)  // "$1,234.56"
```

## Currency Symbol Placement

Position the currency symbol as prefix or suffix:

```typescript
// Prefix (default for USD, GBP, etc.)
const prefix = new Numbers('#amount', {
  currencySymbol: '$',
  currencySymbolPlacement: 'p'  // prefix
})
prefix.set(100)  // "$100.00"

// Suffix (common for EUR in some countries)
const suffix = new Numbers('#amount', {
  currencySymbol: ' EUR',
  currencySymbolPlacement: 's'  // suffix
})
suffix.set(100)  // "100.00 EUR"
```

## International Currencies

### US Dollar (USD)

```typescript
const usd = new Numbers('#usd', {
  currencySymbol: '$',
  currencySymbolPlacement: 'p',
  decimalPlaces: 2,
  digitGroupSeparator: ',',
  decimalCharacter: '.'
})

usd.set(1234567.89)  // "$1,234,567.89"
```

### Euro (EUR)

```typescript
// German format
const eurDE = new Numbers('#eur-de', {
  currencySymbol: ' EUR',
  currencySymbolPlacement: 's',
  decimalPlaces: 2,
  digitGroupSeparator: '.',
  decimalCharacter: ','
})

eurDE.set(1234567.89)  // "1.234.567,89 EUR"

// French format
const eurFR = new Numbers('#eur-fr', {
  currencySymbol: ' EUR',
  currencySymbolPlacement: 's',
  decimalPlaces: 2,
  digitGroupSeparator: ' ',  // Space as separator
  decimalCharacter: ','
})

eurFR.set(1234567.89)  // "1 234 567,89 EUR"
```

### British Pound (GBP)

```typescript
const gbp = new Numbers('#gbp', {
  currencySymbol: 'GBP ',
  currencySymbolPlacement: 'p',
  decimalPlaces: 2,
  digitGroupSeparator: ',',
  decimalCharacter: '.'
})

gbp.set(1234567.89)  // "GBP 1,234,567.89"
```

### Japanese Yen (JPY)

```typescript
const jpy = new Numbers('#jpy', {
  currencySymbol: 'JPY ',
  currencySymbolPlacement: 'p',
  decimalPlaces: 0,  // No decimals for Yen
  digitGroupSeparator: ','
})

jpy.set(1234567)  // "JPY 1,234,567"
```

### Swiss Franc (CHF)

```typescript
const chf = new Numbers('#chf', {
  currencySymbol: 'CHF ',
  currencySymbolPlacement: 'p',
  decimalPlaces: 2,
  digitGroupSeparator: "'",  // Apostrophe as separator
  decimalCharacter: '.'
})

chf.set(1234567.89)  // "CHF 1'234'567.89"
```

### Indian Rupee (INR)

```typescript
import { indianIN } from 'ts-numbers'

// Use preset
const inr = new Numbers('#inr', indianIN)
inr.set(1234567.89)  // "Rs 12,34,567.89" (Indian grouping)

// Or configure manually
const inrManual = new Numbers('#inr-manual', {
  currencySymbol: 'Rs ',
  currencySymbolPlacement: 'p',
  decimalPlaces: 2,
  // Indian numbering: first group of 3, then groups of 2
  digitGroupSeparator: ','
})
```

## Multi-Currency Support

Configure multiple currencies and switch between them:

```typescript
const multiCurrency = new Numbers('#amount', {
  currencies: {
    USD: { symbol: '$', placement: 'p', decimalPlaces: 2 },
    EUR: { symbol: ' EUR', placement: 's', decimalPlaces: 2 },
    GBP: { symbol: 'GBP ', placement: 'p', decimalPlaces: 2 },
    JPY: { symbol: 'JPY ', placement: 'p', decimalPlaces: 0 },
    CHF: { symbol: 'CHF ', placement: 'p', decimalPlaces: 2 },
    CNY: { symbol: 'CNY ', placement: 'p', decimalPlaces: 2 }
  },
  activeCurrency: 'USD'
})

// Set value
multiCurrency.set(1000)  // "$1,000.00"

// Switch currency
multiCurrency.setCurrency('EUR')  // "1,000.00 EUR"
multiCurrency.setCurrency('JPY')  // "JPY 1,000"
multiCurrency.setCurrency('GBP')  // "GBP 1,000.00"

// Get current currency
const current = multiCurrency.getCurrency()  // "GBP"
```

## Currency Presets

Use built-in presets for common currencies:

```typescript
import {
  frenchFR,
  swissCH,
  indianIN,
  japaneseJP,
  arabicEG,
  arabicSA,
  chineseCN,
  chineseCNWithCurrency,
  hebrewIL,
  hebrewILWithCurrency,
  hindiIN,
  swedishSE
} from 'ts-numbers'

// French format
const french = new Numbers('#fr', frenchFR)
french.set(1234.56)  // "1 234,56 EUR"

// Swiss format
const swiss = new Numbers('#ch', swissCH)
swiss.set(1234.56)  // "CHF 1'234.56"

// Chinese with currency
const chinese = new Numbers('#cn', chineseCNWithCurrency)
chinese.set(1234.56)  // "CNY 1,234.56"

// Arabic (Egypt)
const arabic = new Numbers('#ar', arabicEG)
// Right-to-left number formatting

// Hebrew with currency
const hebrew = new Numbers('#he', hebrewILWithCurrency)
```

## Negative Currency Values

Handle negative currency amounts:

```typescript
const currency = new Numbers('#amount', {
  currencySymbol: '$',
  decimalPlaces: 2,
  allowNegative: true,
  negativePositiveSignPlacement: 'l'  // 'l' left, 'r' right, 'p' prefix, 's' suffix
})

currency.set(-1234.56)  // "-$1,234.56"

// Alternative: parentheses for negative (accounting style)
const accounting = new Numbers('#accounting', {
  currencySymbol: '$',
  decimalPlaces: 2,
  allowNegative: true,
  negativeBracketsTypeOnBlur: '(,)'  // Use parentheses
})

accounting.set(-1234.56)  // "($1,234.56)"
```

## Currency Input Validation

```typescript
const validated = new Numbers('#validated', {
  currencySymbol: '$',
  decimalPlaces: 2,
  minimumValue: 0,           // No negative values
  maximumValue: 1000000,     // Max $1 million
  allowNegative: false
})

validated.set(1500000)  // Clamped to "$1,000,000.00"
validated.set(-100)     // Clamped to "$0.00"
```

## Formatting Without Input Elements

Format currency values directly:

```typescript
import { formatNumber } from 'ts-numbers'

// Format a number as currency
const formatted = formatNumber(1234.56, {
  currencySymbol: '$',
  currencySymbolPlacement: 'p',
  decimalPlaces: 2,
  digitGroupSeparator: ','
})

console.log(formatted)  // "$1,234.56"
```

## Currency Conversion Display

While ts-numbers doesn't do currency conversion, you can display converted values:

```typescript
const displayCurrency = new Numbers('#display', {
  currencies: {
    USD: { symbol: '$', placement: 'p', decimalPlaces: 2 },
    EUR: { symbol: ' EUR', placement: 's', decimalPlaces: 2 }
  },
  activeCurrency: 'USD'
})

// Set USD value
const usdAmount = 100
displayCurrency.set(usdAmount)

// Convert and display in EUR (conversion rate: 0.85)
const eurAmount = usdAmount * 0.85
displayCurrency.setCurrency('EUR')
displayCurrency.set(eurAmount)  // "85.00 EUR"
```

## Best Practices

### 1. Use Presets When Available

```typescript
import { frenchFR, swissCH, indianIN } from 'ts-numbers'

// Use presets for consistent regional formatting
const price = new Numbers('#price', frenchFR)
```

### 2. Match Locale Expectations

```typescript
// Different countries expect different formats
const config = {
  US: { symbol: '$', separator: ',', decimal: '.' },
  DE: { symbol: ' EUR', separator: '.', decimal: ',' },
  FR: { symbol: ' EUR', separator: ' ', decimal: ',' },
  CH: { symbol: 'CHF ', separator: "'", decimal: '.' }
}
```

### 3. Handle Zero Decimals Appropriately

```typescript
// Yen, Won, and some currencies have no decimals
const jpy = new Numbers('#jpy', {
  currencySymbol: 'JPY ',
  decimalPlaces: 0  // Important for currencies without cents
})
```

### 4. Consider Accessibility

```typescript
const accessible = new Numbers('#amount', {
  currencySymbol: '$',
  ariaLabel: 'Price in US dollars',
  ariaDescribedBy: 'price-help'
})
```
