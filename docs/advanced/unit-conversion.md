# Unit Conversion

ts-numbers provides built-in unit conversion capabilities for temperature, weight, length, and other measurements, allowing you to display values in different units while maintaining the original value internally.

## Temperature Conversion

Convert between Celsius, Fahrenheit, and Kelvin:

```js
import { Numbers } from 'ts-numbers'

// Celsius to Fahrenheit conversion
const celsiusToFahrenheit = new Numbers('#temp-c-to-f', {
  isSpecializedType: 'temperature',
  specializedOptions: {
    temperatureUnit: 'C', // Input in Celsius
    convertTempTo: 'F', // Display as Fahrenheit
  },
  decimalPlaces: 1,
  suffixText: '°F', // Add unit suffix
})

celsiusToFahrenheit.set(0) // Displays as "32.0°F"
celsiusToFahrenheit.set(100) // Displays as "212.0°F"

// Fahrenheit to Celsius conversion
const fahrenheitToCelsius = new Numbers('#temp-f-to-c', {
  isSpecializedType: 'temperature',
  specializedOptions: {
    temperatureUnit: 'F', // Input in Fahrenheit
    convertTempTo: 'C', // Display as Celsius
  },
  decimalPlaces: 1,
  suffixText: '°C',
})

// You can also convert to/from Kelvin
const kelvinConverter = new Numbers('#temp-kelvin', {
  isSpecializedType: 'temperature',
  specializedOptions: {
    temperatureUnit: 'C', // Input in Celsius
    convertTempTo: 'K', // Display as Kelvin
  },
  decimalPlaces: 1,
  suffixText: 'K',
})
```

## Weight Conversion

Convert between different weight units:

```js
// Kilograms to pounds conversion
const kgToPounds = new Numbers('#weight-kg-to-lb', {
  isSpecializedType: 'weight',
  specializedOptions: {
    weightUnit: 'kg', // Input in kilograms
    convertWeightTo: 'lb', // Display as pounds
  },
  decimalPlaces: 1,
  suffixText: ' lb',
})

kgToPounds.set(1) // Displays as "2.2 lb"
kgToPounds.set(10) // Displays as "22.0 lb"

// Pounds to kilograms conversion
const lbToKg = new Numbers('#weight-lb-to-kg', {
  isSpecializedType: 'weight',
  specializedOptions: {
    weightUnit: 'lb', // Input in pounds
    convertWeightTo: 'kg', // Display as kilograms
  },
  decimalPlaces: 2,
  suffixText: ' kg',
})

// Other supported weight units: g (grams), oz (ounces), st (stone)
```

## Length Conversion

Convert between metric and imperial length units:

```js
// Meters to feet conversion
const metersToFeet = new Numbers('#length-m-to-ft', {
  isSpecializedType: 'length',
  specializedOptions: {
    lengthUnit: 'm', // Input in meters
    convertLengthTo: 'ft', // Display as feet
  },
  decimalPlaces: 1,
  suffixText: ' ft',
})

metersToFeet.set(1) // Displays as "3.3 ft"
metersToFeet.set(10) // Displays as "32.8 ft"

// Miles to kilometers conversion
const milesToKm = new Numbers('#length-mi-to-km', {
  isSpecializedType: 'length',
  specializedOptions: {
    lengthUnit: 'mi', // Input in miles
    convertLengthTo: 'km', // Display as kilometers
  },
  decimalPlaces: 1,
  suffixText: ' km',
})

// Other supported length units:
// cm (centimeters), mm (millimeters), in (inches), yd (yards)
```

## Volume Conversion

Convert between different volume units:

```js
// Liters to gallons conversion
const litersToGallons = new Numbers('#volume-l-to-gal', {
  isSpecializedType: 'volume',
  specializedOptions: {
    volumeUnit: 'l', // Input in liters
    convertVolumeTo: 'gal', // Display as gallons (US)
  },
  decimalPlaces: 2,
  suffixText: ' gal',
})

// Other supported volume units:
// ml (milliliters), oz (fluid ounces), pt (pints), qt (quarts)
```

## Accessing Original Values

Get both the converted and original values:

```js
const tempConverter = new Numbers('#temperature', {
  isSpecializedType: 'temperature',
  specializedOptions: {
    temperatureUnit: 'C',
    convertTempTo: 'F',
  },
})

tempConverter.set(20) // Displays as Fahrenheit (68°F)

// Get the formatted value (in the target unit)
const formattedValue = tempConverter.get() // "68"

// Get the original value (in the source unit)
const originalValue = tempConverter.getNumber() // 20 (Celsius)
```

## Custom Conversion Display

Customize how the conversion is displayed:

```js
// Show both original and converted units
const dualDisplay = new Numbers('#dual-temp', {
  isSpecializedType: 'temperature',
  specializedOptions: {
    temperatureUnit: 'C',
    convertTempTo: 'F',
    showBothUnits: true, // Display both units
  },
  suffixText: '°C → °F', // Custom suffix to indicate conversion
})

dualDisplay.set(0) // Might display as "0°C → 32°F" depending on implementation
```

ts-numbers' unit conversion features make it easy to work with international measurements while providing a consistent and intuitive API for your applications.
