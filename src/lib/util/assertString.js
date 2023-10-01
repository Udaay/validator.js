/**
 * Asserts that the input is a string.
 *
 * @param {*} input - The value to be checked.
 * @throws {TypeError} If the input is not a string.
 */
export default function assertString(input) {
  if (typeof input !== 'string' && !(input instanceof String)) {
    const invalidType = input === null ? 'null' : typeof input;
    throw new TypeError(`Expected a string but received a ${invalidType}`);
  }
}
