/**
 * Validates an email address.
 * Uses a standard regex for email validation.
 * @param email - The email string to validate.
 * @returns true if valid, false otherwise.
 */
export function isValidEmail(email: string): boolean {
  // Simple regex for email validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Validates a mobile phone number (Taiwan format).
 * Accepts formats like 09xxxxxxxx or 09xx-xxx-xxx.
 * @param phone - The phone number string to validate.
 * @returns true if valid, false otherwise.
 */
export function isValidPhone(phone: string): boolean {
  // Matches 09 followed by 8 digits, optionally with hyphens
  const re = /^09\d{2}-?\d{3}-?\d{3}$/
  return re.test(phone)
}
