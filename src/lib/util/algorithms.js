/**
 * ISO 7064 validation function
 * Validates a string of numbers (including check digit) according to ISO 7064 (MOD 11, 10).
 *
 * @param {string} str - The input string to validate.
 * @returns {boolean} True if the input is valid; otherwise, false.
 */
export function iso7064Check(str) {
  let checkValue = 10;

  for (let i = 0; i < str.length - 1; i++) {
    const currentDigit = parseInt(str[i], 10);
    checkValue = (currentDigit + checkValue) % 10 === 0 ? (10 * 2) % 11 : (((currentDigit + checkValue) % 10) * 2) % 11;
  }

  checkValue = checkValue === 1 ? 0 : 11 - checkValue;
  return checkValue === parseInt(str[str.length - 1], 10);
}

/**
 * Luhn (mod 10) validation function
 * Validates a string of numbers (including check digit) according to the Luhn algorithm.
 *
 * @param {string} str - The input string to validate.
 * @returns {boolean} True if the input is valid; otherwise, false.
 */
export function luhnCheck(str) {
  let checksum = 0;
  let doubleDigit = false;

  for (let i = str.length - 1; i >= 0; i--) {
    const currentDigit = parseInt(str[i], 10);

    if (doubleDigit) {
      const product = currentDigit * 2;
      checksum += product > 9 ? product - 9 : product;
    } else {
      checksum += currentDigit;
    }

    doubleDigit = !doubleDigit;
  }

  return checksum % 10 === 0;
}

/**
 * Reverse TIN multiplication and summation helper function
 * Calculates the sum of the digits multiplied in reverse with a given base multiplier.
 *
 * @param {number[]} digits - An array of single-digit integers.
 * @param {number} base - The base multiplier.
 * @returns {number} The calculated total.
 */
export function reverseMultiplyAndSum(digits, base) {
  let total = 0;

  for (let i = 0; i < digits.length; i++) {
    total += digits[i] * (base - i);
  }

  return total;
}

/**
 * Verhoeff validation helper function
 * Validates a string of numbers according to the Verhoeff algorithm.
 *
 * @param {string} str - The input string to validate.
 * @returns {boolean} True if the input is valid; otherwise, false.
 */
export function verhoeffCheck(str) {
  const dTable = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  ];

  const pTable = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
  ];

  // Copy (to prevent replacement) and reverse
  const reversedStr = str.split('').reverse().join('');
  let checksum = 0;

  for (let i = 0; i < reversedStr.length; i++) {
    checksum = dTable[checksum][pTable[i % 8][parseInt(reversedStr[i], 10)]];
  }

  return checksum === 0;
}
