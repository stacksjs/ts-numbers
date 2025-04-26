# Specialized Formats

ts-numbers goes beyond regular numeric formatting to provide specialized formatting for specific types of data.

## Phone Numbers

Format and validate phone numbers:

```js
import { Numbers } from 'ts-numbers'
import { phoneInternational, phoneUS } from 'ts-numbers/presets'

// US Phone format
const usPhone = new Numbers('#phone-input', {
  isSpecializedType: 'phone',
  specializedOptions: {
    phoneFormat: '(###) ###-####',
    countryCode: 'US',
  },
})

usPhone.set('1234567890') // Displays as "(123) 456-7890"

// International phone format with preset
const intlPhone = new Numbers('#intl-phone', phoneInternational)
intlPhone.set('1234567890') // Displays as "+1 (123) 456-7890"
```

## IP Addresses

Format and validate IPv4 and IPv6 addresses:

```js
// IPv4 formatting
const ipv4 = new Numbers('#ipv4-input', {
  isSpecializedType: 'ip',
  specializedOptions: {
    ipVersion: 'ipv4',
  },
})

ipv4.set('19216801') // Displays as "192.168.0.1"

// IPv6 formatting
const ipv6 = new Numbers('#ipv6-input', {
  isSpecializedType: 'ip',
  specializedOptions: {
    ipVersion: 'ipv6',
  },
})
```

## Time Formatting

Format time values:

```js
import { time24h } from 'ts-numbers/presets'

// 24-hour time format (HH:MM:SS)
const timeInput = new Numbers('#time-input', {
  isSpecializedType: 'time',
  specializedOptions: {
    timeFormat: '24h',
    showSeconds: true,
  },
})

timeInput.set('134530') // Displays as "13:45:30"

// 12-hour time format (hh:mm AM/PM)
const time12h = new Numbers('#time-12h', {
  isSpecializedType: 'time',
  specializedOptions: {
    timeFormat: '12h',
    showSeconds: false,
  },
})

time12h.set('134530') // Displays as "1:45 PM"
```

## Credit Card Formatting

Format credit card numbers with appropriate spacing:

```js
const creditCard = new Numbers('#cc-input', {
  isSpecializedType: 'creditCard',
  specializedOptions: {
    creditCardFormat: 'auto', // Automatically detects card type
  },
})

// Format for different card types
creditCard.set('4111111111111111') // Visa: "4111 1111 1111 1111"
creditCard.set('378282246310005') // Amex: "3782 822463 10005"
```

## Percentage Formatting

Format percentage values:

```js
import { percentageFormat } from 'ts-numbers/presets'

const percentage = new Numbers('#percentage', percentageFormat)
percentage.set(75.5) // Displays as "75.5%"

// Custom percentage format
const customPercentage = new Numbers('#custom-percentage', {
  isSpecializedType: 'percentage',
  decimalPlaces: 2,
  suffixText: '%',
  minimumValue: '0',
  maximumValue: '100',
})
```

## Temperature Formatting

Format and convert temperature values:

```js
// Celsius temperature
const celsius = new Numbers('#temp-celsius', {
  isSpecializedType: 'temperature',
  specializedOptions: {
    temperatureUnit: 'C',
    convertTempTo: 'C', // No conversion
  },
  suffixText: '°C',
})

// Celsius to Fahrenheit conversion
const celsiusToFahrenheit = new Numbers('#temp-convert', {
  isSpecializedType: 'temperature',
  specializedOptions: {
    temperatureUnit: 'C', // Input in Celsius
    convertTempTo: 'F', // Display as Fahrenheit
  },
  suffixText: '°C → °F', // Show conversion in suffix
})

celsiusToFahrenheit.set(20) // Displays as "68°C → °F" (20°C = 68°F)
```

## Weight and Length Formatting

Format and convert weight and length measurements:

```js
// Weight with kilograms to pounds conversion
const weight = new Numbers('#weight', {
  isSpecializedType: 'weight',
  specializedOptions: {
    weightUnit: 'kg', // Input in kilograms
    convertWeightTo: 'lb', // Display as pounds
  },
  decimalPlaces: 1,
  suffixText: ' lb',
})

// Length with meters to feet conversion
const length = new Numbers('#length', {
  isSpecializedType: 'length',
  specializedOptions: {
    lengthUnit: 'm', // Input in meters
    convertLengthTo: 'ft', // Display as feet
  },
  decimalPlaces: 1,
  suffixText: ' ft',
})
```

These specialized formatters make ts-numbers suitable for a wide range of applications beyond simple numeric display, providing a consistent interface for various data types.
