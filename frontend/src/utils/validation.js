// Identical phone-number characters and length to backend validation.
export function isValidPhoneNumber(value) {
  return typeof value === 'string' && /^[+0-9()\-\s]{7,32}$/.test(value);
}
