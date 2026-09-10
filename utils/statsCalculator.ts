/**
 * @file utils/statsCalculator.ts
 * @description Utility to compute word count, character count, Persian character ratio, and read time.
 */

import { DocumentStats } from '@/types/markdown';
import { DEFAULT_READING_SPEED_WPM } from '@/constants/domain';
import { isPersianChar } from './persianizer';

/**
 * Calculates comprehensive document statistics for a given text using a high-performance,
 * single-pass scan that eliminates intermediate string arrays and garbage-collection pressure.
 *
 * @param {string} text - The raw text input to analyze.
 * @returns {DocumentStats} Comprehensive metrics and statistics for the document.
 */
export function calculateDocumentStats(text: string): DocumentStats {
  if (!text) {
    return {
      characterCount: 0,
      wordCount: 0,
      persianCharCount: 0,
      lineCount: 0,
      estimatedReadTimeMinutes: 0,
    };
  }

  const characterCount = text.length;
  let lineCount = 1;
  let persianCharCount = 0;
  let wordCount = 0;
  let inWord = false;

  for (let i = 0; i < characterCount; i++) {
    const code = text.charCodeAt(i);
    const char = text[i];

    if (code === 10) {
      lineCount++;
    }

    if (isPersianChar(char)) {
      persianCharCount++;
    }

    // High-speed whitespace detection matching /\s+/
    const isWhitespace =
      code === 32 ||
      code === 10 ||
      code === 9 ||
      code === 13 ||
      code === 12 ||
      code === 11 ||
      code === 160 ||
      (code >= 0x2000 && code <= 0x200a) ||
      code === 0x2028 ||
      code === 0x2029 ||
      code === 0x3000;

    if (isWhitespace) {
      if (inWord) {
        wordCount++;
        inWord = false;
      }
    } else {
      inWord = true;
    }
  }

  if (inWord) {
    wordCount++;
  }

  // Average reading speed: 180 words per minute for Persian/Arabic text
  const estimatedReadTimeMinutes =
    wordCount === 0 ? 0 : Math.max(1, Math.ceil(wordCount / DEFAULT_READING_SPEED_WPM));

  return {
    characterCount,
    wordCount,
    persianCharCount,
    lineCount,
    estimatedReadTimeMinutes,
  };
}
