/**
 * @file utils/persianizer.ts
 * @description Helper functions to convert Western digits and punctuation to Persian format.
 */

const ENGLISH_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/**
 * Converts Western digits (0-9) to Persian digits (۰-۹) while skipping code blocks.
 * @param input - The input string containing numbers.
 * @returns String with converted Persian digits.
 */
export function toPersianDigits(input: string): string {
  if (!input) return '';
  
  // Replace numbers while preserving code block sections
  const parts = input.split(/(```[\s\S]*?```|`[^`]+`)/g);
  
  return parts
    .map((part) => {
      if (part.startsWith('`')) {
        return part; // Skip inline or multi-line code blocks
      }
      return part.replace(/[0-9]/g, (digit) => {
        const index = ENGLISH_DIGITS.indexOf(digit);
        return index !== -1 ? PERSIAN_DIGITS[index] : digit;
      });
    })
    .join('');
}

/**
 * Checks if a character is a Persian/Arabic character.
 * @param char - Single character to test.
 */
export function isPersianChar(char: string): boolean {
  const code = char.charCodeAt(0);
  return (code >= 0x0600 && code <= 0x06ff) || (code >= 0xfb50 && code <= 0xfdff);
}
