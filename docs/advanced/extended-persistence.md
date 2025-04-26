# Extended Persistence

ts-numbers provides powerful persistence capabilities that allow you to save and restore formatted values across page reloads and sessions.

## Basic Persistence

Enable automatic saving of values:

```js
import { Numbers } from 'ts-numbers'

// Save values to localStorage
const persistent = new Numbers('#price', {
  saveValueToSessionStorage: true,  // Enable persistence
  currencySymbol: '$',
  decimalPlaces: 2,
})

// Values will now persist across page reloads
```

## Storage Methods

Choose your persistence method:

```js
// Using localStorage (persists until explicitly cleared)
const localStoragePersistence = new Numbers('#price', {
  persistenceMethod: 'localStorage',
  persistenceKey: 'product-price',  // Custom key for storage
})

// Using sessionStorage (persists until browser tab is closed)
const sessionPersistence = new Numbers('#quantity', {
  persistenceMethod: 'sessionStorage',
  persistenceKey: 'product-quantity',
})
```

## Custom Storage Keys

Customize storage keys for different elements:

```js
// Different persistence keys for different inputs
const price = new Numbers('#price', {
  persistenceMethod: 'localStorage',
  persistenceKey: 'product-price',
})

const quantity = new Numbers('#quantity', {
  persistenceMethod: 'localStorage',
  persistenceKey: 'product-quantity',
})

const discount = new Numbers('#discount', {
  persistenceMethod: 'localStorage',
  persistenceKey: 'product-discount',
})
```

## Value Restoration

Values are automatically restored when the page loads:

```js
// Create a Numbers instance with persistence
const price = new Numbers('#price', {
  persistenceMethod: 'localStorage',
  persistenceKey: 'price',
})

// When the page loads, if 'price' exists in localStorage,
// the value will be automatically restored
```

## Manual Persistence Control

Control persistence manually:

```js
const price = new Numbers('#price', {
  currencySymbol: '$',
})

// Save value manually
document.querySelector('#save-btn').addEventListener('click', () => {
  const value = price.getNumber()
  localStorage.setItem('saved-price', value.toString())
})

// Restore value manually
document.querySelector('#load-btn').addEventListener('click', () => {
  const savedValue = localStorage.getItem('saved-price')
  if (savedValue) {
    price.set(savedValue)
  }
})
```

## Configuring Global Settings

Save and restore configuration settings:

```js
import { Numbers, saveConfig, loadConfig } from 'ts-numbers'

// Create a Numbers instance with custom configuration
const price = new Numbers('#price', {
  currencySymbol: '€',
  decimalPlaces: 3,
  selectOnFocus: true,
})

// Save the current configuration globally
document.querySelector('#save-settings').addEventListener('click', () => {
  saveConfig('userPreferences', price.getConfig())
})

// Later, load the saved configuration
document.querySelector('#load-settings').addEventListener('click', () => {
  const savedConfig = loadConfig('userPreferences')
  if (savedConfig) {
    price.update(savedConfig)
  }
})
```

## Conditional Persistence

Apply persistence only under certain conditions:

```js
// Only persist values that are valid
const price = new Numbers('#price', {
  persistenceMethod: 'localStorage',
  persistenceKey: 'price',
  persistenceCondition: (value) => {
    // Only persist values between 1 and 1000
    return value >= 1 && value <= 1000
  },
})
```

## Multiple Element Synchronization

Keep multiple elements synchronized with the same value:

```js
// Create a primary input with persistence
const primaryInput = new Numbers('#primary-price', {
  persistenceMethod: 'localStorage',
  persistenceKey: 'shared-price',
  currencySymbol: '$',
})

// Create secondary displays that use the same persistence key
const displayOne = new Numbers('#price-display-1', {
  persistenceMethod: 'localStorage',
  persistenceKey: 'shared-price',  // Same key as primary
  currencySymbol: '$',
  readOnly: true,  // Make it display-only
})

const displayTwo = new Numbers('#price-display-2', {
  persistenceMethod: 'localStorage',
  persistenceKey: 'shared-price',  // Same key as primary
  currencySymbol: '$',
  readOnly: true,  // Make it display-only
})

// When primaryInput changes, both displays will update on page reload
```

Extended persistence features make ts-numbers ideal for applications where maintaining state across sessions or page reloads is important, such as e-commerce sites, financial calculators, or forms with multiple steps.
