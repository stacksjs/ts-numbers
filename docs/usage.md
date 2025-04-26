# Usage Guide

Learn how to use ts-numbers effectively in your projects.

## Basic Usage

### Creating a Number Formatter

```js
import { Numbers } from 'ts-numbers'

// Create a formatter instance
const formatter = new Numbers('#my-input', {
  decimalPlaces: 2,
  digitGroupSeparator: ',',
})

// Set a value
formatter.set(1234.56) // Displays as "1,234.56"

// Get the numeric value
const value = formatter.getNumber() // Returns 1234.56
```

### Working with DOM Elements

ts-numbers can be attached to any element that can display text:

```js
// With a CSS selector
const price = new Numbers('#price-display', { currencySymbol: '$' })

// With a direct DOM element reference
const element = document.getElementById('total')
const total = new Numbers(element, { currencySymbol: '€' })

// With an input element (enables user interaction)
const input = new Numbers('input.currency', {
  currencySymbol: '$',
  selectOnFocus: true,
})
```

## Formatting Options

### Currency Formatting

```js
// US Dollar
const dollar = new Numbers('#dollar', {
  currencySymbol: '$',
  currencySymbolPlacement: 'p', // prefix
  decimalPlaces: 2,
})

// Euro
const euro = new Numbers('#euro', {
  currencySymbol: '€',
  currencySymbolPlacement: 's', // suffix
  decimalCharacter: ',',
  digitGroupSeparator: '.',
})
```

### Using Presets

```js
import { Numbers } from 'ts-numbers'
import { dollar, euro, integer, percentage } from 'ts-numbers/presets'

// Quickly apply predefined formats
const price = new Numbers('#price', dollar)
const quantity = new Numbers('#quantity', integer)
const discount = new Numbers('#discount', percentage)
```

## Handling User Input

```js
const input = new Numbers('#user-input', {
  decimalPlaces: 2,
  minimumValue: '0', // Prevent negative values
  maximumValue: '1000', // Set maximum value
  selectOnFocus: true, // Select content on focus
  caretPositionOnFocus: 'end', // Position cursor at the end
})

// Listen for events
const element = input.getElement()
element.addEventListener('numbers:change', (e) => {
  console.log('Value changed:', e.detail.value)
})
```

## Specialized Formatting

### Phone Numbers

```js
const phone = new Numbers('#phone-input', {
  isSpecializedType: 'phone',
  specializedOptions: {
    phoneFormat: '(###) ###-####',
    countryCode: 'US',
  },
})

phone.set('1234567890') // Displays as "(123) 456-7890"
```

### Temperature with Conversion

```js
const temp = new Numbers('#temperature', {
  isSpecializedType: 'temperature',
  specializedOptions: {
    temperatureUnit: 'C', // Input in Celsius
    convertTempTo: 'F', // Display as Fahrenheit
  },
  suffixText: '°F',
})

temp.set(20) // Displays as "68°F" (20°C converted to Fahrenheit)
```

## Internationalization

```js
// German format
const german = new Numbers('#german', {
  locale: 'de-DE',
  useGrouping: true,
  currencySymbol: '€',
})

german.set(1234.56) // Displays as "1.234,56 €"

// Arabic format with RTL support
const arabic = new Numbers('#arabic', {
  locale: 'ar-EG',
  useGrouping: true,
  currencySymbol: 'ج.م',
})
```

## Advanced Usage

### Dynamic Configuration Updates

```js
const dynamicFormat = new Numbers('#dynamic', {
  decimalPlaces: 2,
})

// Change configuration on the fly
document.querySelector('#increase-precision').addEventListener('click', () => {
  dynamicFormat.update({ decimalPlaces: 4 })
})

// Switch to currency format
document.querySelector('#show-as-currency').addEventListener('click', () => {
  dynamicFormat.update({
    currencySymbol: '$',
    currencySymbolPlacement: 'p',
  })
})
```

### Integration with Frameworks

ts-numbers can be easily integrated with popular frameworks:

#### React Example

```jsx
import React, { useEffect, useRef } from 'react'
import { Numbers } from 'ts-numbers'

function CurrencyInput({ value, onChange }) {
  const inputRef = useRef(null)
  const numbersRef = useRef(null)

  useEffect(() => {
    // Initialize ts-numbers when component mounts
    if (inputRef.current && !numbersRef.current) {
      numbersRef.current = new Numbers(inputRef.current, {
        currencySymbol: '$',
        decimalPlaces: 2,
      })

      // Set up event listener
      const handleChange = (e) => {
        onChange(numbersRef.current.getNumber())
      }

      inputRef.current.addEventListener('numbers:change', handleChange)

      return () => {
        // Clean up when component unmounts
        if (inputRef.current) {
          inputRef.current.removeEventListener('numbers:change', handleChange)
        }

        if (numbersRef.current) {
          numbersRef.current.remove()
        }
      }
    }
  }, [])

  // Update the value when props change
  useEffect(() => {
    if (numbersRef.current && value !== undefined) {
      numbersRef.current.set(value)
    }
  }, [value])

  return <input ref={inputRef} />
}
```

For more detailed examples, refer to the specific feature pages in the documentation.
