/**
 * Converts a value to a string.
 *
 * @param {*} input - The value to be converted to a string.
 * @returns {string} The string representation of the input.
 */
export default function toString(input) {
  if (input === null || input === undefined || (isNaN(input) && !input.length)) {
    return '';
  }

  if (typeof input === 'object' && typeof input.toString === 'function') {
    return input.toString();
  }

  return String(input);
}
