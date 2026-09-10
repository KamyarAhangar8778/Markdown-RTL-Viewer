'use client';

/**
 * @file hooks/useActiveLinePosition.ts
 * @description Lightweight hook to track cursor line position in a textarea without event interference.
 */

import { useState, useCallback, useRef, useEffect, RefObject } from 'react';

export interface ActiveLineInfo {
  lineNumber: number;
  top: number;
  height: number;
  isVisible: boolean;
}

/**
 * Calculates line position metrics from textarea state and dimensions.
 *
 * @param selectionStart - Cursor index in text.
 * @param value - Full text content of textarea.
 * @param scrollTop - Current scroll offset of textarea.
 * @param clientHeight - Visible height of textarea container.
 * @param options - Line height and top padding overrides.
 * @returns ActiveLineInfo
 */
export function calculateActiveLinePosition(
  selectionStart: number,
  value: string,
  scrollTop: number,
  clientHeight: number,
  options?: { lineHeight?: number; paddingTop?: number }
): ActiveLineInfo {
  const text = value ?? '';
  const limit = Math.min(Math.max(0, selectionStart), text.length);
  let lineNumber = 1;

  for (let i = 0; i < limit; i++) {
    if (text.charCodeAt(i) === 10) {
      lineNumber++;
    }
  }

  const lineHeight = options?.lineHeight && options.lineHeight > 0 ? options.lineHeight : 24;
  const paddingTop = options?.paddingTop ?? 16;

  const lineTop = paddingTop + (lineNumber - 1) * lineHeight - scrollTop;
  const isVisible = lineTop >= 0 && lineTop <= clientHeight;

  return {
    lineNumber,
    top: lineTop,
    height: lineHeight,
    isVisible,
  };
}

/**
 * Custom hook calculating the cursor's active line vertical position without layout thrashing.
 * Caches computed styles to avoid running window.getComputedStyle on every keystroke.
 *
 * @param {RefObject<HTMLTextAreaElement | null>} textareaRef - Textarea reference.
 * @returns Object with active line information and update function.
 */
export function useActiveLinePosition(
  textareaRef: RefObject<HTMLTextAreaElement | null>
) {
  const [activeLine, setActiveLine] = useState<ActiveLineInfo>({
    lineNumber: 1,
    top: 16,
    height: 24,
    isVisible: false,
  });

  const styleMetricsRef = useRef<{ lineHeight: number; paddingTop: number } | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const lineCacheRef = useRef<{
    text: string;
    selectionStart: number;
    lineNumber: number;
  }>({
    text: '',
    selectionStart: -1,
    lineNumber: 1,
  });

  const measureMetrics = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea || typeof window === 'undefined') return;

    const style = window.getComputedStyle(textarea);
    let lineHeight = 24;
    let paddingTop = 16;

    const parsedLineHeight = parseFloat(style.lineHeight);
    if (!isNaN(parsedLineHeight) && parsedLineHeight > 0) {
      lineHeight = parsedLineHeight;
    }
    const parsedPaddingTop = parseFloat(style.paddingTop);
    if (!isNaN(parsedPaddingTop)) {
      paddingTop = parsedPaddingTop;
    }

    styleMetricsRef.current = { lineHeight, paddingTop };
  }, [textareaRef]);

  useEffect(() => {
    measureMetrics();
    window.addEventListener('resize', measureMetrics, { passive: true });
    return () => {
      window.removeEventListener('resize', measureMetrics);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [measureMetrics]);

  const recalculateLine = useCallback(() => {
    if (rafIdRef.current !== null) return;

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (!styleMetricsRef.current) {
        measureMetrics();
      }

      const { lineHeight = 24, paddingTop = 16 } = styleMetricsRef.current || {};
      const text = textarea.value ?? '';
      const selectionStart = textarea.selectionStart ?? 0;
      let lineNumber = 1;

      if (
        lineCacheRef.current.selectionStart === selectionStart &&
        lineCacheRef.current.text === text
      ) {
        lineNumber = lineCacheRef.current.lineNumber;
      } else {
        const limit = Math.min(Math.max(0, selectionStart), text.length);
        for (let i = 0; i < limit; i++) {
          if (text.charCodeAt(i) === 10) {
            lineNumber++;
          }
        }
        lineCacheRef.current = { text, selectionStart, lineNumber };
      }

      const lineTop = paddingTop + (lineNumber - 1) * lineHeight - textarea.scrollTop;
      const isVisible = lineTop >= 0 && lineTop <= textarea.clientHeight;

      const computed: ActiveLineInfo = {
        lineNumber,
        top: lineTop,
        height: lineHeight,
        isVisible,
      };

      setActiveLine((prev) => {
        if (
          prev.lineNumber === computed.lineNumber &&
          Math.abs(prev.top - computed.top) < 0.1 &&
          prev.height === computed.height &&
          prev.isVisible === computed.isVisible
        ) {
          return prev;
        }
        return computed;
      });
    });
  }, [textareaRef, measureMetrics]);

  return { activeLine, recalculateLine };
}
