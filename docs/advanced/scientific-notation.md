# Scientific Notation

ts-numbers provides comprehensive support for scientific notation, allowing you to format very large or very small numbers in a readable and concise format.

## Basic Scientific Notation

Enable scientific notation for large or small numbers:

```js
import { Numbers } from 'ts-numbers'

const scientific = new Numbers('#scientific', {
  useScientificNotation: true,
  decimalPlaces: 6,
})

// Very large number
scientific.set(1234567890000) // Displays as "1.234568e+12"

// Very small number
scientific.set(0.0000000123) // Displays as "1.230000e-8"
```

## Customizing Scientific Display

Control the threshold and formatting:

```js
const customScientific = new Numbers('#custom-scientific', {
  useScientificNotation: true,
  scientificNotationThreshold: 1e6, // Use scientific notation for values ≥ 1,000,000
  decimalPlaces: 3, // Precision in mantissa
})

customScientific.set(12345) // Displays as "12,345" (below threshold)
customScientific.set(1234567) // Displays as "1.235e+6" (above threshold)
```

## Using Scientific Notation Preset

ts-numbers includes a preset for scientific notation:

```js
import { scientific } from 'ts-numbers/presets'

const sciInput = new Numbers('#scientific-input', scientific)

sciInput.set(1.23456789e-10) // Displays with appropriate scientific notation
```

## Maintaining Precision

Scientific notation helps maintain precision for calculations:

```js
const highPrecision = new Numbers('#high-precision', {
  useScientificNotation: true,
  decimalPlaces: 10,
})

// Store high-precision value
highPrecision.set(1.23456789123456789e-15)

// The displayed value will be formatted as scientific notation
// But the original precision is maintained internally
console.log(highPrecision.getNumber()) // Access full precision value for calculations
```

## Parsing Scientific Notation

ts-numbers can automatically parse scientific notation input:

```js
const parser = new Numbers('#scientific-input', {
  useScientificNotation: true,
})

// User types or sets "1.234e-5"
const value = parser.getNumber() // Returns the numeric value 0.00001234
```

## Engineering Notation

Format numbers using engineering notation (powers of 3):

```js
const engineering = new Numbers('#engineering', {
  useScientificNotation: true,
  engineeringNotation: true, // Forces exponents to be multiples of 3
})

engineering.set(1.23e4) // Displays as "12.3e+3" instead of "1.23e+4"
engineering.set(1.23e5) // Displays as "123e+3"
engineering.set(1.23e6) // Displays as "1.23e+6"
```

## Scientific Notation with SI Prefixes

Combine scientific notation with appropriate SI unit prefixes:

```js
const siUnits = new Numbers('#si-units', {
  useScientificNotation: true,
  siUnitPrefixes: true,
  suffixText: 'g', // Base unit (grams in this example)
})

siUnits.set(0.001) // Displays as "1 mg" (milligram)
siUnits.set(1000) // Displays as "1 kg" (kilogram)
siUnits.set(1000000) // Displays as "1 Mg" (megagram)
```

Scientific notation in ts-numbers is particularly useful for scientific and engineering applications where representing very large or very small numbers is essential.
