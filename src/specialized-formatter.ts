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

  let result: string

  switch (type) {
    case 'phone':
      result = formatPhoneNumber(stringValue, options.phoneFormat, options.countryCode)
      break

    case 'weight': {
      // Handle weight with formatting
      const formattedValue = formatWeight(value, options.weightUnit, options.convertWeightTo)

      // Apply number formatting if configured
      if (config.decimalPlaces !== undefined) {
        const numValue = Number.parseFloat(formattedValue)
        // Format with proper decimal places
        result = numValue.toFixed(config.decimalPlaces)
      }
      else {
        result = formattedValue
      }
      break
    }

    case 'length': {
      // Handle length with formatting
      const formattedValue = formatLength(value, options.lengthUnit, options.convertLengthTo)

      // Apply number formatting if configured
      if (config.decimalPlaces !== undefined) {
        const numValue = Number.parseFloat(formattedValue)
        // Format with proper decimal places
        result = numValue.toFixed(config.decimalPlaces)
      }
      else {
        result = formattedValue
      }
      break
    }

    case 'temperature': {
      // Handle temperature with formatting
      const formattedValue = formatTemperature(value, options.temperatureUnit, options.convertTempTo)

      // Apply number formatting if configured
      if (config.decimalPlaces !== undefined) {
        const numValue = Number.parseFloat(formattedValue)
        // Format with proper decimal places
        result = numValue.toFixed(config.decimalPlaces)
      }
      else {
        result = formattedValue
      }
      break
    }

    case 'time':
      result = formatTime(stringValue, options.timeFormat, options.showSeconds)
      break

    case 'ip':
      result = formatIPAddress(stringValue, options.ipVersion)
      break

    case 'creditCard':
      result = formatCreditCard(stringValue, options.creditCardFormat)
      break

    case 'percentage':
      // Simple percentage formatting can be handled by core formatter with suffix
      result = value.toString()
      break

    default:
      result = value.toString()
      break
  }

  // Add suffix if specified
  if (config.suffixText) {
    result = `${result}${config.suffixText}`
  }

  return result
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
  // Check if the input already has AM/PM markers
  const isPM = value.toUpperCase().includes('PM')
  const isAM = value.toUpperCase().includes('AM')

  // Clean the input to just digits
  const digits = value.replace(/\D/g, '')

  // Handle different input lengths
  let hours = 0
  let minutes = 0
  let seconds = 0

  if (digits.length === 0) {
    // Empty input - use zeros for all values
    // hours, minutes, seconds already set to 0
  }
  else if (digits.length <= 2) {
    // For 1-2 digits: treat as hours (e.g., 9 -> 09:00)
    hours = Number.parseInt(digits, 10)
  }
  else if (digits.length <= 4) {
    // For 3-4 digits: treat as HHMM (e.g., 930 -> 09:30)
    if (digits.length === 3) {
      // Handle 3 digits (e.g., 930 -> 09:30)
      hours = Number.parseInt(digits.substring(0, 1), 10)
      minutes = Number.parseInt(digits.substring(1, 3), 10)
    }
    else {
      hours = Number.parseInt(digits.substring(0, 2), 10)
      minutes = Number.parseInt(digits.substring(2, 4), 10)
    }
  }
  else {
    // For 5+ digits: treat as HHMMSS
    if (digits.length === 5) {
      // Handle 5 digits (e.g., 13045 -> 01:30:45)
      hours = Number.parseInt(digits.substring(0, 1), 10)
      minutes = Number.parseInt(digits.substring(1, 3), 10)
      seconds = Number.parseInt(digits.substring(3, 5), 10)
    }
    else {
      hours = Number.parseInt(digits.substring(0, 2), 10)
      minutes = Number.parseInt(digits.substring(2, 4), 10)
      seconds = Number.parseInt(digits.substring(4, 6), 10)
    }
  }

  // Validate and limit values
  hours = Math.min(Math.max(0, hours), 23) // 0-23
  minutes = Math.min(Math.max(0, minutes), 59) // 0-59
  seconds = Math.min(Math.max(0, seconds), 59) // 0-59

  // Handle 12h/24h format
  let ampm = ''
  if (format === '12h') {
    // Use provided AM/PM status if available
    if (isPM) {
      ampm = 'PM'
      // Convert hours to 24-hour format if less than 12
      if (hours < 12) {
        hours += 12
      }
    }
    else if (isAM) {
      ampm = 'AM'
      // Convert 12 AM to 0 hours
      if (hours === 12) {
        hours = 0
      }
    }
    else {
      // Determine AM/PM based on hour value
      ampm = hours >= 12 ? 'PM' : 'AM'
    }

    // Convert to 12-hour format
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
  if (ipVersion === 'v4' || ipVersion === 'both') {
    // Check if this is already in dot-notation with up to 4 segments
    // Use non-backtracking pattern with fixed-length capturing groups
    const dotGroups = value.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})(?:\.(\d{1,3}))?$/)
    if (dotGroups) {
      // We already have a dot-notation format
      const octets = []
      // First 3 matched groups are guaranteed
      for (let i = 1; i <= 3; i++) {
        const octet = Math.min(Number.parseInt(dotGroups[i], 10), 255)
        octets.push(octet.toString())
      }
      // 4th group is optional
      if (dotGroups[4]) {
        const octet = Math.min(Number.parseInt(dotGroups[4], 10), 255)
        octets.push(octet.toString())
      }
      else {
        octets.push('0') // Add 0 as the last octet if not provided
      }
      return octets.join('.')
    }

    // For IPv4, handle numeric input formatted as a single number (like 192168001001)
    // by extracting each octet
    let digits = value.replace(/\D/g, '')

    // Check if this is a numeric representation of an IPv4 address
    if (/^\d+$/.test(digits) && digits.length >= 4 && digits.length <= 12) {
      // Pad to 12 digits (for simplicity)
      digits = digits.padStart(12, '0')

      // Extract each octet
      const octet1 = Number.parseInt(digits.slice(0, 3), 10)
      const octet2 = Number.parseInt(digits.slice(3, 6), 10)
      const octet3 = Number.parseInt(digits.slice(6, 9), 10)
      const octet4 = Number.parseInt(digits.slice(9, 12), 10)

      // Clamp values to 0-255 range
      const formattedOctets = [
        Math.min(octet1, 255),
        Math.min(octet2, 255),
        Math.min(octet3, 255),
        Math.min(octet4, 255),
      ].map(String)

      return formattedOctets.join('.')
    }
    else {
      // Standard IPv4 dot notation handling - default fallback
      // Clean input to just digits and dots
      const cleanValue = value.replace(/[^\d.]/g, '')

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
  }
  else if (ipVersion === 'v6') {
    // IPv6 format: Allow hex digits and colons
    const cleanValue = value.replace(/[^0-9a-f:]/gi, '')

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
