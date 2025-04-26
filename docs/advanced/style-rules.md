# Style Rules

ts-numbers provides dynamic styling capabilities with style rules, allowing you to apply different visual formats based on the value or state of your numeric inputs.

## Basic Style Rules

Apply styles based on numeric values:

```js
import { Numbers } from 'ts-numbers'

// Create a formatter with style rules
const valueWithStyles = new Numbers('#balance', {
  decimalPlaces: 2,
  currencySymbol: '$',
  styleRules: [
    // Negative values appear red
    {
      condition: value => value < 0,
      style: { color: 'red' }
    },
    // Values over 1000 appear green
    {
      condition: value => value >= 1000,
      style: { color: 'green', fontWeight: 'bold' }
    }
  ]
})

// As the value changes, styles are automatically applied
valueWithStyles.set(-50)     // Appears red
valueWithStyles.set(1500)    // Appears green and bold
```

## Class-Based Styling

Use CSS classes instead of inline styles:

```js
const valueWithClasses = new Numbers('#score', {
  styleRules: [
    {
      condition: value => value < 50,
      className: 'score-low'     // Adds this class when value < 50
    },
    {
      condition: value => value >= 50 && value < 80,
      className: 'score-medium'  // Adds this class when 50 <= value < 80
    },
    {
      condition: value => value >= 80,
      className: 'score-high'    // Adds this class when value >= 80
    }
  ]
})

// Your CSS would define these classes:
// .score-low { color: red; }
// .score-medium { color: orange; }
// .score-high { color: green; }
```

## Conditional Formatting

Format the number differently based on its value:

```js
const conditionalFormat = new Numbers('#percentage', {
  styleRules: [
    {
      condition: value => value < 0,
      format: {
        negativePositiveSignPlacement: 'p', // Place sign at prefix
        suffixText: '%',                    // Add percentage symbol
        digitGroupSeparator: ','            // Use comma as thousands separator
      }
    },
    {
      condition: value => value >= 0,
      format: {
        showPositiveSign: true,             // Show + for positive values
        suffixText: '%',                    // Add percentage symbol
        digitGroupSeparator: ','            // Use comma as thousands separator
      }
    }
  ]
})

conditionalFormat.set(-5.25)  // Appears as "-5.25%"
conditionalFormat.set(10.75)  // Appears as "+10.75%"
```

## State-Based Styling

Apply styles based on input state (focus, hover, etc.):

```js
const stateBased = new Numbers('#state-input', {
  stateStyleRules: {
    focus: {
      style: { backgroundColor: '#f0f8ff', border: '1px solid blue' }
    },
    hover: {
      style: { backgroundColor: '#f5f5f5' }
    },
    disabled: {
      style: { backgroundColor: '#f0f0f0', color: '#888' }
    }
  }
})

// Styles apply automatically when the element gains/loses focus,
// is hovered over, or becomes disabled
```

## Combining Multiple Rules

Combine multiple style rules for complex formatting:

```js
const multiRule = new Numbers('#complex-value', {
  decimalPlaces: 2,
  currencySymbol: '$',
  styleRules: [
    // Critical values (in the red)
    {
      condition: value => value < -1000,
      style: { color: 'darkred', fontWeight: 'bold' },
      className: 'critical-value',
      format: { negativeBracketsTypeOnBlur: '(,)' }  // Show values in parentheses
    },
    // Negative values
    {
      condition: value => value < 0 && value >= -1000,
      style: { color: 'red' },
      className: 'negative-value'
    },
    // Warning range
    {
      condition: value => value >= 0 && value < 100,
      style: { color: 'orange' },
      className: 'warning-value'
    },
    // Good range
    {
      condition: value => value >= 100,
      style: { color: 'green' },
      className: 'positive-value'
    }
  ]
})
```

## Custom Format Callbacks

Use callback functions for advanced formatting:

```js
const customCallback = new Numbers('#custom-format', {
  styleRules: [
    {
      condition: value => true,  // Apply to all values
      formatCallback: (value, config) => {
        // Custom formatting logic
        if (value < 0) {
          return `(${Math.abs(value).toFixed(2)})`;
        } else if (value === 0) {
          return '-';
        } else {
          return `+${value.toFixed(2)}`;
        }
      }
    }
  ]
})
```

## Threshold Indicators

Create visual indicators for threshold values:

```js
const thresholdIndicator = new Numbers('#threshold', {
  decimalPlaces: 0,
  styleRules: [
    // Values below threshold
    {
      condition: value => value < 100,
      style: { color: 'black' },
      elementAttributes: {
        'data-status': 'below-target',
        'aria-valuenow': value => value.toString(),
        'aria-valuemin': '0',
        'aria-valuemax': '100'
      },
      afterElementHTML: '<span class="indicator">⚠️ Below target</span>'
    },
    // Values at or above threshold
    {
      condition: value => value >= 100,
      style: { color: 'green' },
      elementAttributes: {
        'data-status': 'on-target',
        'aria-valuenow': value => value.toString(),
        'aria-valuemin': '0',
        'aria-valuemax': '100'
      },
      afterElementHTML: '<span class="indicator">✅ Target achieved</span>'
    }
  ]
})
```

## Dynamic Accessibility Attributes

Improve accessibility with dynamic attributes:

```js
const accessibleInput = new Numbers('#accessible-value', {
  decimalPlaces: 2,
  minimumValue: '0',
  maximumValue: '100',
  styleRules: [
    {
      // Update ARIA attributes based on value
      condition: value => true,  // Apply to all values
      elementAttributes: {
        'aria-valuenow': value => value.toString(),
        'aria-valuemin': '0',
        'aria-valuemax': '100',
        'aria-valuetext': value => `${value} percent complete`
      }
    }
  ]
})
```

Style rules in ts-numbers provide a powerful way to create dynamic, responsive user interfaces that communicate meaning through visual formatting, enhancing both the aesthetics and usability of your numeric displays.
