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
