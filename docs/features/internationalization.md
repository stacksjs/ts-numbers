# Internationalization

ts-numbers provides robust internationalization (i18n) support, making it easy to format numbers according to different cultural and regional standards.

## Locale-based Formatting

Format numbers according to specific locales:

```js
import { Numbers } from 'ts-numbers'

// US-style formatting
const usFormat = new Numbers('#us-number', {
  locale: 'en-US',
  useGrouping: true,
})
usFormat.set(1234567.89) // Displays as "1,234,567.89"

// German-style formatting
const germanFormat = new Numbers('#german-number', {
  locale: 'de-DE',
  useGrouping: true,
})
germanFormat.set(1234567.89) // Displays as "1.234.567,89"

// French-style formatting
const frenchFormat = new Numbers('#french-number', {
  locale: 'fr-FR',
  useGrouping: true,
})
frenchFormat.set(1234567.89) // Displays as "1 234 567,89"
```

## International Currencies

Format currencies according to international standards:

```js
// US Dollar in US format
const usdInUS = new Numbers('#usd-us', {
  locale: 'en-US',
  currencySymbol: 'USD', // Using ISO currency code
})
usdInUS.set(1234.56) // Displays as "$1,234.56"

// Euro in German format
const euroInDE = new Numbers('#euro-de', {
  locale: 'de-DE',
  currencySymbol: 'EUR',
})
euroInDE.set(1234.56) // Displays as "1.234,56 €"

// Japanese Yen in Japanese format
const yenInJP = new Numbers('#yen-jp', {
  locale: 'ja-JP',
  currencySymbol: 'JPY',
})
yenInJP.set(1234) // Displays as "￥1,234"
```

## Different Numbering Systems

Support for non-Latin numbering systems:

```js
// Arabic numbers
const arabicNumbers = new Numbers('#arabic-number', {
  locale: 'ar-EG',
  numberingSystem: 'arab', // Arabic-Indic digits
})
arabicNumbers.set(1234.56) // Displays using Arabic-Indic digits

// Devanagari (Hindi) numbers
const hindiNumbers = new Numbers('#hindi-number', {
  locale: 'hi-IN',
  numberingSystem: 'deva', // Devanagari digits
})
```

## Right-to-Left (RTL) Support

Support for RTL languages like Arabic and Hebrew:

```js
import { arabicSA, hebrewIL } from 'ts-numbers/presets'

// Arabic (Saudi Arabia) format
const arabicNumber = new Numbers('#arabic-input', arabicSA)

// Hebrew (Israel) format
const hebrewNumber = new Numbers('#hebrew-input', hebrewIL)

// Custom RTL format
const customRTL = new Numbers('#custom-rtl', {
  locale: 'ar-EG',
  currencySymbol: 'EGP',
  useGrouping: true,
  // Number input will follow RTL conventions
})
```

## Multiple Languages in One Application

Switch between different locales dynamically:

```js
// Create a formatter with initial locale
const dynamicLocale = new Numbers('#dynamic-locale', {
  locale: 'en-US',
  currencySymbol: '$',
})

// Change locale on the fly
document.querySelector('#switch-to-french').addEventListener('click', () => {
  dynamicLocale.update({
    locale: 'fr-FR',
    currencySymbol: '€',
    currencySymbolPlacement: 's', // Euro typically shown as suffix in France
  })
})

document.querySelector('#switch-to-japanese').addEventListener('click', () => {
  dynamicLocale.update({
    locale: 'ja-JP',
    currencySymbol: '¥',
  })
})
```

## Using Locale with Specialized Formats

Combine locale support with specialized formatting:

```js
// Phone number with international format based on locale
const phoneByLocale = new Numbers('#phone-input', {
  isSpecializedType: 'phone',
  specializedOptions: {
    phoneFormat: 'auto', // Automatically use format based on locale
    countryCode: 'auto',
  },
  locale: 'fr-FR', // Use French formatting
})

// Time format based on locale (12h vs 24h)
const timeByLocale = new Numbers('#time-input', {
  isSpecializedType: 'time',
  specializedOptions: {
    timeFormat: 'locale', // Use format based on locale
    showSeconds: true,
  },
  locale: 'en-US', // US typically uses 12-hour format
})
```

ts-numbers' internationalization support ensures your numeric inputs and displays work correctly regardless of user location or language preferences.
