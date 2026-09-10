/**
 * @file tests/unit/persianizer.test.ts
 * @description Unit tests for Persian character detection.
 */

import { describe, test, expect } from 'bun:test';
import { isPersianChar, hasPersianText } from '../../utils/persianizer';

describe('Persianizer Utilities', () => {
  test('returns false for empty or falsy character inputs', () => {
    expect(isPersianChar('')).toBe(false);
    expect(hasPersianText('')).toBe(false);
  });

  test('identifies Persian alphabet characters', () => {
    expect(isPersianChar('الف')).toBe(true);
    expect(isPersianChar('گ')).toBe(true);
    expect(isPersianChar('چ')).toBe(true);
    expect(isPersianChar('پ')).toBe(true);
    expect(isPersianChar('ژ')).toBe(true);
  });

  test('identifies English ASCII characters as non-Persian', () => {
    expect(isPersianChar('A')).toBe(false);
    expect(isPersianChar('z')).toBe(false);
    expect(isPersianChar('1')).toBe(false);
    expect(isPersianChar('!')).toBe(false);
    expect(hasPersianText('npm install react')).toBe(false);
  });

  test('detects Persian text correctly inside mixed and purely Persian strings', () => {
    expect(hasPersianText('سلام')).toBe(true);
    expect(hasPersianText('کد تابع calculate()')).toBe(true);
    expect(hasPersianText('console.log("Hello")')).toBe(false);
  });
});
