// Basic usage example for TS-Numbers library

// Import the Numbers class
import Numbers from '../src/numbers'
import { dollar, euro, percentage } from '../src/presets'

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Basic number formatting
  const basicNumberInput = document.getElementById('basic-number')
  if (basicNumberInput) {
    // eslint-disable-next-line no-new
    new Numbers(basicNumberInput, {
      decimalPlaces: 2,
      digitGroupSeparator: ',',
      decimalCharacter: '.',
    })
  }

  // Dollar currency formatting
  const dollarInput = document.getElementById('dollar-input')
  if (dollarInput) {
    // eslint-disable-next-line no-new
    new Numbers(dollarInput, dollar)
  }

  // Euro currency formatting
  const euroInput = document.getElementById('euro-input')
  if (euroInput) {
    // eslint-disable-next-line no-new
    new Numbers(euroInput, euro)
  }

  // Percentage formatting
  const percentageInput = document.getElementById('percentage-input')
  if (percentageInput) {
    // eslint-disable-next-line no-new
    new Numbers(percentageInput, percentage)
  }

  // Custom currency formatting
  const customInput = document.getElementById('custom-input')
  if (customInput) {
    // eslint-disable-next-line no-new
    new Numbers(customInput, {
      currencySymbol: '₿',
      digitGroupSeparator: ' ',
      decimalPlaces: 8,
      currencySymbolPlacement: 's',
    })
  }

  // Demonstration of programmatic value setting
  const programmaticInput = document.getElementById('programmatic-input')
  if (programmaticInput) {
    const numbersInstance = new Numbers(programmaticInput, dollar)

    // Set an initial value
    numbersInstance.set(1234.56)

    // Add a button event listener to change the value
    const updateButton = document.getElementById('update-value')
    if (updateButton) {
      updateButton.addEventListener('click', () => {
        // Get a random value between 0 and 10000
        const randomValue = Math.random() * 10000
        numbersInstance.set(randomValue)
      })
    }

    // Add a button to get the current value as a number
    const getValueButton = document.getElementById('get-value')
    if (getValueButton) {
      getValueButton.addEventListener('click', () => {
        const currentValue = numbersInstance.getNumber()
        // eslint-disable-next-line no-alert
        alert(`Current value as number: ${currentValue}`)
      })
    }
  }
})
