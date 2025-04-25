import type { NumbersConfig } from './types'

/**
 * Format a value according to specialized type and options
 */
export function formatSpecializedNumber(value: string | number, config: NumbersConfig): string {
  if (!config.isSpecializedType || !config.specializedOptions) {
    return value.toString()
  }

  const type = config.isSpecializedType
  const options = config.specializedOptions

  // Convert to string if it's a number
  const stringValue = typeof value === 'number' ? value.toString() : value

  switch (type) {
    case 'phone':
      return formatPhoneNumber(stringValue, options.phoneFormat, options.countryCode)

    case 'weight':
      return formatWeight(value, options.weightUnit, options.convertWeightTo)

    case 'length':
      return formatLength(value, options.lengthUnit, options.convertLengthTo)

    case 'temperature':
      return formatTemperature(value, options.temperatureUnit, options.convertTempTo)

    case 'time':
      return formatTime(stringValue, options.timeFormat, options.showSeconds)

    case 'ip':
      return formatIPAddress(stringValue, options.ipVersion)

    case 'creditCard':
      return formatCreditCard(stringValue, options.creditCardFormat)

    case 'percentage':
      // Simple percentage formatting can be handled by core formatter with suffix
      return value.toString()

    default:
      return value.toString()
  }
}

/**
 * Format a phone number based on the provided format
 * Format string uses # as placeholder for digits
 */
export function formatPhoneNumber(value: string, format?: string, _countryCode?: string): string {
  // Clean the input to just digits
  const digits = value.replace(/\D/g, '')

  if (!format) {
    // Default US format if not specified
    format = '(###) ###-####'
  }

  let result = format
  let digitIndex = 0

  // Replace each # with a digit
  for (let i = 0; i < result.length; i++) {
    if (result[i] === '#') {
      result = result.substring(0, i)
        + (digitIndex < digits.length ? digits[digitIndex] : '_')
        + result.substring(i + 1)
      digitIndex++
    }
  }

  return result
}

/**
 * Format weight with optional unit conversion
 */
export function formatWeight(value: string | number, fromUnit?: string, toUnit?: string | null): string {
  const numValue = typeof value === 'string' ? Number.parseFloat(value) : value

  if (!fromUnit || !toUnit || fromUnit === toUnit) {
    return numValue.toString()
  }

  let convertedValue: number = numValue

  // Convert between units
  if (fromUnit === 'kg' && toUnit === 'lb') {
    convertedValue = numValue * 2.20462 // kg to lb
  }
  else if (fromUnit === 'lb' && toUnit === 'kg') {
    convertedValue = numValue * 0.453592 // lb to kg
  }
  else if (fromUnit === 'kg' && toUnit === 'g') {
    convertedValue = numValue * 1000 // kg to g
  }
  else if (fromUnit === 'g' && toUnit === 'kg') {
    convertedValue = numValue / 1000 // g to kg
  }
  else if (fromUnit === 'lb' && toUnit === 'oz') {
    convertedValue = numValue * 16 // lb to oz
  }
  else if (fromUnit === 'oz' && toUnit === 'lb') {
    convertedValue = numValue / 16 // oz to lb
  }

  return convertedValue.toString()
}

/**
 * Format length with optional unit conversion
 */
export function formatLength(value: string | number, fromUnit?: string, toUnit?: string | null): string {
  const numValue = typeof value === 'string' ? Number.parseFloat(value) : value

  if (!fromUnit || !toUnit || fromUnit === toUnit) {
    return numValue.toString()
  }

  let convertedValue: number = numValue

  // Convert between units
  if (fromUnit === 'm' && toUnit === 'ft') {
    convertedValue = numValue * 3.28084 // m to ft
  }
  else if (fromUnit === 'ft' && toUnit === 'm') {
    convertedValue = numValue * 0.3048 // ft to m
  }
  else if (fromUnit === 'm' && toUnit === 'cm') {
    convertedValue = numValue * 100 // m to cm
  }
  else if (fromUnit === 'cm' && toUnit === 'm') {
    convertedValue = numValue / 100 // cm to m
  }
  else if (fromUnit === 'm' && toUnit === 'mm') {
    convertedValue = numValue * 1000 // m to mm
  }
  else if (fromUnit === 'mm' && toUnit === 'm') {
    convertedValue = numValue / 1000 // mm to m
  }
  else if (fromUnit === 'm' && toUnit === 'km') {
    convertedValue = numValue / 1000 // m to km
  }
  else if (fromUnit === 'km' && toUnit === 'm') {
    convertedValue = numValue * 1000 // km to m
  }
  else if (fromUnit === 'ft' && toUnit === 'in') {
    convertedValue = numValue * 12 // ft to in
  }
  else if (fromUnit === 'in' && toUnit === 'ft') {
    convertedValue = numValue / 12 // in to ft
  }
  else if (fromUnit === 'ft' && toUnit === 'yd') {
    convertedValue = numValue / 3 // ft to yd
  }
  else if (fromUnit === 'yd' && toUnit === 'ft') {
    convertedValue = numValue * 3 // yd to ft
  }
  else if (fromUnit === 'mi' && toUnit === 'ft') {
    convertedValue = numValue * 5280 // mi to ft
  }
  else if (fromUnit === 'ft' && toUnit === 'mi') {
    convertedValue = numValue / 5280 // ft to mi
  }

  return convertedValue.toString()
}

/**
 * Format temperature with optional unit conversion
 */
export function formatTemperature(value: string | number, fromUnit?: string, toUnit?: string | null): string {
  const numValue = typeof value === 'string' ? Number.parseFloat(value) : value

  if (!fromUnit || !toUnit || fromUnit === toUnit) {
    return numValue.toString()
  }

  let convertedValue: number = numValue

  // Convert between units
  if (fromUnit === 'C' && toUnit === 'F') {
    convertedValue = (numValue * 9 / 5) + 32 // Celsius to Fahrenheit
  }
  else if (fromUnit === 'F' && toUnit === 'C') {
    convertedValue = (numValue - 32) * 5 / 9 // Fahrenheit to Celsius
  }
  else if (fromUnit === 'C' && toUnit === 'K') {
    convertedValue = numValue + 273.15 // Celsius to Kelvin
  }
  else if (fromUnit === 'K' && toUnit === 'C') {
    convertedValue = numValue - 273.15 // Kelvin to Celsius
  }
  else if (fromUnit === 'F' && toUnit === 'K') {
    convertedValue = ((numValue - 32) * 5 / 9) + 273.15 // Fahrenheit to Kelvin
  }
  else if (fromUnit === 'K' && toUnit === 'F') {
    convertedValue = ((numValue - 273.15) * 9 / 5) + 32 // Kelvin to Fahrenheit
  }

  return convertedValue.toString()
}

/**
 * Format time string (HH:MM:SS or HH:MM AM/PM)
 */
export function formatTime(value: string, format?: string, showSeconds?: boolean): string {
  // Clean the input to just digits
  const digits = value.replace(/\D/g, '')

  // Pad with zeros if needed
  const paddedValue = digits.padStart(showSeconds ? 6 : 4, '0')

  let hours = Number.parseInt(paddedValue.substring(0, 2), 10)
  const minutes = Number.parseInt(paddedValue.substring(2, 4), 10)
  const seconds = showSeconds ? Number.parseInt(paddedValue.substring(4, 6), 10) : 0

  // Handle 12h/24h format
  let ampm = ''
  if (format === '12h') {
    ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours === 0 ? 12 : hours // Convert 0 to 12 for 12-hour format
  }

  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = seconds.toString().padStart(2, '0')

  if (showSeconds) {
    return format === '12h'
      ? `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`
      : `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  }
  else {
    return format === '12h'
      ? `${formattedHours}:${formattedMinutes} ${ampm}`
      : `${formattedHours}:${formattedMinutes}`
  }
}

/**
 * Format IP address (v4 or v6)
 */
export function formatIPAddress(value: string, ipVersion?: string): string {
  // Clean input to just digits and dots or colons
  let cleanValue = ''

  if (ipVersion === 'v4' || ipVersion === 'both') {
    // IPv4 format: Allow digits and dots
    cleanValue = value.replace(/[^\d.]/g, '')

    // Split by dots and format each octet
    const octets = cleanValue.split('.')

    // Format up to 4 octets
    const formattedOctets = octets.slice(0, 4).map((octet) => {
      const num = Number.parseInt(octet, 10)
      return Number.isNaN(num) ? '0' : Math.min(255, num).toString()
    })

    // Ensure we have 4 octets
    while (formattedOctets.length < 4) {
      formattedOctets.push('0')
    }

    return formattedOctets.join('.')
  }
  else if (ipVersion === 'v6') {
    // IPv6 format: Allow hex digits and colons
    cleanValue = value.replace(/[^0-9a-f:]/gi, '')

    // Split by colons
    const segments = cleanValue.split(':')

    // Format up to 8 segments
    const formattedSegments = segments.slice(0, 8).map((segment) => {
      // Pad each segment to 4 hex digits
      return segment.padStart(4, '0').substring(0, 4)
    })

    // Ensure we have 8 segments
    while (formattedSegments.length < 8) {
      formattedSegments.push('0000')
    }

    return formattedSegments.join(':')
  }

  return value
}

/**
 * Format credit card number based on card type
 */
export function formatCreditCard(value: string, cardFormat?: string): string {
  // Clean input to just digits
  const digits = value.replace(/\D/g, '')

  // Determine card type if auto
  let format = cardFormat || 'auto'

  if (format === 'auto') {
    // Detect card type based on prefix
    if (digits.startsWith('34') || digits.startsWith('37')) {
      format = 'amex'
    }
    else if (digits.startsWith('4')) {
      format = 'visa'
    }
    else if (digits.startsWith('5')) {
      format = 'mastercard'
    }
    else if (digits.startsWith('6')) {
      format = 'discover'
    }
    else {
      format = 'visa' // Default to visa format
    }
  }

  // Apply formatting based on card type
  switch (format) {
    case 'amex': {
      // American Express: XXXX XXXXXX XXXXX (4-6-5)
      if (digits.length <= 4) {
        return digits
      }
      else if (digits.length <= 10) {
        return `${digits.substring(0, 4)} ${digits.substring(4)}`
      }
      else {
        return `${digits.substring(0, 4)} ${digits.substring(4, 10)} ${digits.substring(10, 15)}`
      }
    }

    case 'visa':
    case 'mastercard':
    case 'discover':
    default: {
      // Standard format: XXXX XXXX XXXX XXXX
      const groups = []
      for (let i = 0; i < digits.length; i += 4) {
        groups.push(digits.substring(i, i + 4))
      }
      return groups.join(' ')
    }
  }
}
