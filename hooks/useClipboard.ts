'use client';

/**
 * @file hooks/useClipboard.ts
 * @description Custom hook for interacting with the system clipboard (copy and paste).
 */

import { useState, useCallback } from 'react';

export interface ClipboardReadResult {
  text: string | null;
  success: boolean;
  error?: 'unsupported' | 'permission_denied' | 'empty' | 'unknown';
}

/**
 * Custom React hook for reading from and writing to the system clipboard.
 * 
 * @param timeoutMs - Duration in milliseconds before resetting the copied state. Default is 2000ms.
 * @returns Object containing `copied` status flag, `copyToClipboard` and `readFromClipboard` methods.
 */
export function useClipboard(timeoutMs = 2000) {
  const [copied, setCopied] = useState(false);

  /**
   * Copies text to the system clipboard.
   * @param text - The string to copy.
   * @returns Promise resolving to true if successful, false otherwise.
   */
  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    if (typeof window === 'undefined') return false;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), timeoutMs);
        return true;
      }
      return false;
    } catch {
      setCopied(false);
      return false;
    }
  }, [timeoutMs]);

  /**
   * Reads plain text from the system clipboard.
   * @returns Promise resolving to ClipboardReadResult.
   */
  const readFromClipboard = useCallback(async (): Promise<ClipboardReadResult> => {
    if (typeof window === 'undefined') {
      return { text: null, success: false, error: 'unsupported' };
    }
    try {
      window.focus();
    } catch {
      // Ignore focus errors
    }

    if (!navigator?.clipboard?.readText) {
      return { text: null, success: false, error: 'unsupported' };
    }
    try {
      const text = await navigator.clipboard.readText();
      return { text, success: true };
    } catch {
      return { text: null, success: false, error: 'permission_denied' };
    }
  }, []);

  return { copied, copyToClipboard, readFromClipboard };
}
