# Format Types

ts-numbers supports a wide variety of specialized number formats beyond basic currency formatting.

## Phone Number Formatting

Format phone numbers in various patterns:

```typescript
import { formatPhoneNumber, phoneUS, phoneInternational } from 'ts-numbers'

// US format
const usPhone = formatPhoneNumber('5551234567', 'us')
console.log(usPhone)  // "(555) 123-4567"

// International format
const intPhone = formatPhoneNumber('15551234567', 'international')
console.log(intPhone)  // "+1 555-123-4567"

// Using presets
import { Numbers } from 'ts-numbers'

const phoneField = new Numbers('#phone', phoneUS)
phoneField.set('5551234567')  // "(555) 123-4567"
```

## Temperature Formatting

Format temperatures with automatic unit conversion:

```typescript
import { formatTemperature, tempCelsius, tempFahrenheit, tempKelvin } from 'ts-numbers'

// Celsius
const celsius = formatTemperature(25, 'celsius')
console.log(celsius)  // "25C"

// Fahrenheit
const fahrenheit = formatTemperature(77, 'fahrenheit')
console.log(fahrenheit)  // "77F"

// Kelvin
const kelvin = formatTemperature(298.15, 'kelvin')
console.log(kelvin)  // "298.15K"

// Using with Numbers class
const tempField = new Numbers('#temp', tempCelsius)
tempField.set(25)  // "25C"
```

## Weight Formatting

Format weight measurements:

```typescript
import { formatWeight, weightKg, weightLbs } from 'ts-numbers'

// Kilograms
const kg = formatWeight(75.5, 'kg')
console.log(kg)  // "75.5 kg"

// Pounds
const lbs = formatWeight(166.4, 'lbs')
console.log(lbs)  // "166.4 lbs"

// Using presets
const weightField = new Numbers('#weight', weightKg)
weightField.set(75.5)  // "75.5 kg"
```

## Length Formatting

Format length and distance measurements:

```typescript
import { formatLength, lengthMeters, lengthCm, lengthFeet } from 'ts-numbers'

// Meters
const meters = formatLength(1.75, 'meters')
console.log(meters)  // "1.75 m"

// Centimeters
const cm = formatLength(175, 'cm')
console.log(cm)  // "175 cm"

// Feet
const feet = formatLength(5.74, 'feet')
console.log(feet)  // "5.74 ft"

// Using presets
const heightField = new Numbers('#height', lengthCm)
heightField.set(175)  // "175 cm"
```

## Time Formatting

Format time values:

```typescript
import { formatTime, time12h, time24h } from 'ts-numbers'

// 12-hour format
const time12 = formatTime(1430, '12h')
console.log(time12)  // "2:30 PM"

// 24-hour format
const time24 = formatTime(1430, '24h')
console.log(time24)  // "14:30"

// Using presets
const timeField = new Numbers('#time', time24h)
```

## IP Address Formatting

Format IP addresses:

```typescript
import { formatIPAddress, ipAddress } from 'ts-numbers'

// IPv4
const ipv4 = formatIPAddress('192168001001')
console.log(ipv4)  // "192.168.1.1"

// Using preset
const ipField = new Numbers('#ip', ipAddress)
```

## Credit Card Formatting

Format credit card numbers:

```typescript
import { formatCreditCard, creditCard } from 'ts-numbers'

// Format credit card number
const card = formatCreditCard('4532015112830366')
console.log(card)  // "4532 0151 1283 0366"

// Using preset
const cardField = new Numbers('#card', creditCard)
cardField.set('4532015112830366')  // "4532 0151 1283 0366"
```

## Percentage Formatting

Format percentages:

```typescript
import { percentageFormat } from 'ts-numbers'

const percentField = new Numbers('#percentage', {
  ...percentageFormat,
  decimalPlaces: 1,
  minimumValue: 0,
  maximumValue: 100
})

percentField.set(75.5)  // "75.5%"
```

## Scientific Notation

Format large or small numbers in scientific notation:

```typescript
const scientific = new Numbers('#scientific', {
  useScientificNotation: true,
  scientificNotationThreshold: 1000000,
  decimalPlaces: 2
})

scientific.set(1234567890)  // "1.23e+9"
scientific.set(0.00000123)  // "1.23e-6"
```

## Custom Format Patterns

Create custom format patterns:

```typescript
import { applyFormatPattern, formatPatterns } from 'ts-numbers'

// Apply a predefined pattern
const formatted = applyFormatPattern(1234.567, formatPatterns.currency)

// Create custom pattern
const customPattern = {
  prefix: 'Value: ',
  suffix: ' units',
  decimalPlaces: 2,
  groupSeparator: ',',
  decimalSeparator: '.'
}

const custom = applyFormatPattern(1234.567, customPattern)
console.log(custom)  // "Value: 1,234.57 units"
```

## Unit Conversion

Create unit converters:

```typescript
import { createUnitConverter } from 'ts-numbers'

// Create a temperature converter
const tempConverter = createUnitConverter({
  units: {
    celsius: { symbol: 'C', factor: 1 },
    fahrenheit: { symbol: 'F', factor: 1.8, offset: 32 },
    kelvin: { symbol: 'K', factor: 1, offset: 273.15 }
  },
  baseUnit: 'celsius'
})

// Convert values
const celsius = 25
const fahrenheit = tempConverter.convert(celsius, 'celsius', 'fahrenheit')
console.log(fahrenheit)  // 77

// Create a length converter
const lengthConverter = createUnitConverter({
  units: {
    meters: { symbol: 'm', factor: 1 },
    feet: { symbol: 'ft', factor: 3.28084 },
    inches: { symbol: 'in', factor: 39.3701 },
    centimeters: { symbol: 'cm', factor: 100 }
  },
  baseUnit: 'meters'
})

const meters = 1.8
const feet = lengthConverter.convert(meters, 'meters', 'feet')
console.log(feet.toFixed(2))  // "5.91"
```

## Bulk Formatting

Format multiple numbers efficiently:

```typescript
import { bulkFormat, bulkParse } from 'ts-numbers'

// Format many numbers at once
const numbers = [1234.56, 7890.12, 3456.78]
const formatted = bulkFormat(numbers, {
  decimalPlaces: 2,
  digitGroupSeparator: ','
})
console.log(formatted)  // ["1,234.56", "7,890.12", "3,456.78"]

// Parse many formatted strings
const strings = ['1,234.56', '7,890.12', '3,456.78']
const parsed = bulkParse(strings)
console.log(parsed)  // [1234.56, 7890.12, 3456.78]
```

## Performance Optimization

For high-performance scenarios:

```typescript
import {
  measureFormatPerformance,
  measureParsePerformance,
  generateLargeNumbers
} from 'ts-numbers'

// Generate test data
const testNumbers = generateLargeNumbers(10000)

// Measure formatting performance
const formatTime = measureFormatPerformance(testNumbers, {
  decimalPlaces: 2,
  digitGroupSeparator: ','
})
console.log(`Formatted 10,000 numbers in ${formatTime}ms`)

// Measure parsing performance
const testStrings = testNumbers.map(n => n.toLocaleString())
const parseTime = measureParsePerformance(testStrings)
console.log(`Parsed 10,000 strings in ${parseTime}ms`)
```

## Style Rules

Apply dynamic styling based on value:

```typescript
const dynamicStyling = new Numbers('#value', {
  decimalPlaces: 2,
  styleRules: [
    // Negative values in red
    { range: [-Infinity, 0], style: { color: 'red' } },
    // Low values in orange
    { range: [0, 100], style: { color: 'orange' } },
    // Normal values in black
    { range: [100, 1000], style: { color: 'black' } },
    // High values in green
    { range: [1000, Infinity], style: { color: 'green' } }
  ]
})

dynamicStyling.set(-50)   // Displayed in red
dynamicStyling.set(50)    // Displayed in orange
dynamicStyling.set(500)   // Displayed in black
dynamicStyling.set(5000)  // Displayed in green
```

## Rounding Methods

Different rounding strategies:

```typescript
import { roundNumber } from 'ts-numbers'

const value = 2.5

// Half up (standard)
roundNumber(value, 0, 'halfUp')    // 3

// Half down
roundNumber(value, 0, 'halfDown')  // 2

// Half even (banker's rounding)
roundNumber(value, 0, 'halfEven')  // 2

// Ceiling
roundNumber(value, 0, 'ceiling')   // 3

// Floor
roundNumber(value, 0, 'floor')     // 2

// Truncate
roundNumber(value, 0, 'truncate')  // 2
```

## Best Practices

### 1. Use Appropriate Presets

```typescript
// Use presets for standard formats
import { phoneUS, creditCard, percentageFormat } from 'ts-numbers'

const phone = new Numbers('#phone', phoneUS)
const card = new Numbers('#card', creditCard)
```

### 2. Validate Input Ranges

```typescript
// Set appropriate min/max for your use case
const percentage = new Numbers('#pct', {
  ...percentageFormat,
  minimumValue: 0,
  maximumValue: 100
})
```

### 3. Consider Locale Requirements

```typescript
// Different regions have different format expectations
const locale = navigator.language

if (locale.startsWith('de')) {
  // German format: 1.234,56
} else {
  // US format: 1,234.56
}
```
