'use client';

/**
 * @file hooks/useSyncScroll.ts
 * @description High-performance bi-directional synchronized scrolling hook between editor and preview.
 * Caches element dimensions to avoid layout reflows and prevents feedback loops for locked 60fps scrolling.
 */

import { useEffect, useRef } from 'react';
import { calculateTargetScrollTop } from '@/utils/syncScroll';

interface SyncScrollOptions {
  /** Reference or direct DOM element for the raw editor textarea */
  editorEl: HTMLElement | null;
  /** Reference or direct DOM element for the rendered markdown preview container */
  previewEl: HTMLElement | null;
  /** Whether sync scroll is currently enabled (typically split-view and toggled on) */
  enabled: boolean;
}

/**
 * Synchronizes vertical scrolling between editor textarea and preview viewport.
 * Uses cached dimensions, ResizeObserver, and programmatic locks to guarantee 60fps performance.
 *
 * @param {SyncScrollOptions} options - Direct element references and enabled status.
 */
export function useSyncScroll({
  editorEl,
  previewEl,
  enabled,
}: SyncScrollOptions): void {
  const activeSourceRef = useRef<'editor' | 'preview' | null>(null);
  const isProgrammaticScrollRef = useRef<boolean>(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled || !editorEl || !previewEl) return;

    // Dimension cache to prevent layout thrashing (scrollHeight/clientHeight forced reflows)
    let editorScrollHeight = editorEl.scrollHeight;
    let editorClientHeight = editorEl.clientHeight;
    let previewScrollHeight = previewEl.scrollHeight;
    let previewClientHeight = previewEl.clientHeight;

    const refreshDimensions = () => {
      if (!editorEl || !previewEl) return;
      editorScrollHeight = editorEl.scrollHeight;
      editorClientHeight = editorEl.clientHeight;
      previewScrollHeight = previewEl.scrollHeight;
      previewClientHeight = previewEl.clientHeight;
    };

    // Keep dimensions synchronized when container sizes change or content expands
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        refreshDimensions();
      });
      resizeObserver.observe(editorEl);
      resizeObserver.observe(previewEl);
    }

    const scheduleResetActive = () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => {
        activeSourceRef.current = null;
      }, 150);
    };

    // Mark editor as the active driver on user input
    const onEditorInput = () => {
      if (!isProgrammaticScrollRef.current) {
        activeSourceRef.current = 'editor';
      }
    };

    // Mark preview as the active driver on user input
    const onPreviewInput = () => {
      if (!isProgrammaticScrollRef.current) {
        activeSourceRef.current = 'preview';
      }
    };

    let editorRafId: number | null = null;
    let previewRafId: number | null = null;

    const handleEditorScroll = () => {
      if (isProgrammaticScrollRef.current) {
        isProgrammaticScrollRef.current = false;
        return;
      }

      if (activeSourceRef.current === 'preview') return;
      activeSourceRef.current = 'editor';
      scheduleResetActive();

      if (editorRafId !== null) return;
      editorRafId = requestAnimationFrame(() => {
        editorRafId = null;
        if (!editorEl || !previewEl) return;

        // Verify dimensions if empty or zeroed
        if (editorScrollHeight <= 0 || previewScrollHeight <= 0) {
          refreshDimensions();
        }

        const targetTop = calculateTargetScrollTop(
          editorEl.scrollTop,
          editorScrollHeight,
          editorClientHeight,
          previewScrollHeight,
          previewClientHeight,
        );

        if (Math.abs(previewEl.scrollTop - targetTop) > 1) {
          isProgrammaticScrollRef.current = true;
          previewEl.scrollTop = targetTop;
        }
      });
    };

    const handlePreviewScroll = () => {
      if (isProgrammaticScrollRef.current) {
        isProgrammaticScrollRef.current = false;
        return;
      }

      if (activeSourceRef.current === 'editor') return;
      activeSourceRef.current = 'preview';
      scheduleResetActive();

      if (previewRafId !== null) return;
      previewRafId = requestAnimationFrame(() => {
        previewRafId = null;
        if (!editorEl || !previewEl) return;

        // Verify dimensions if empty or zeroed
        if (editorScrollHeight <= 0 || previewScrollHeight <= 0) {
          refreshDimensions();
        }

        const targetTop = calculateTargetScrollTop(
          previewEl.scrollTop,
          previewScrollHeight,
          previewClientHeight,
          editorScrollHeight,
          editorClientHeight,
        );

        if (Math.abs(editorEl.scrollTop - targetTop) > 1) {
          isProgrammaticScrollRef.current = true;
          editorEl.scrollTop = targetTop;
        }
      });
    };

    // User gesture listeners
    editorEl.addEventListener('wheel', onEditorInput, { passive: true });
    editorEl.addEventListener('pointerdown', onEditorInput, { passive: true });
    editorEl.addEventListener('touchstart', onEditorInput, { passive: true });
    editorEl.addEventListener('keydown', onEditorInput, { passive: true });
    editorEl.addEventListener('scroll', handleEditorScroll, { passive: true });

    previewEl.addEventListener('wheel', onPreviewInput, { passive: true });
    previewEl.addEventListener('pointerdown', onPreviewInput, { passive: true });
    previewEl.addEventListener('touchstart', onPreviewInput, { passive: true });
    previewEl.addEventListener('keydown', onPreviewInput, { passive: true });
    previewEl.addEventListener('scroll', handlePreviewScroll, { passive: true });

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      if (editorRafId !== null) cancelAnimationFrame(editorRafId);
      if (previewRafId !== null) cancelAnimationFrame(previewRafId);
      editorEl.removeEventListener('wheel', onEditorInput);
      editorEl.removeEventListener('pointerdown', onEditorInput);
      editorEl.removeEventListener('touchstart', onEditorInput);
      editorEl.removeEventListener('keydown', onEditorInput);
      editorEl.removeEventListener('scroll', handleEditorScroll);

      previewEl.removeEventListener('wheel', onPreviewInput);
      previewEl.removeEventListener('pointerdown', onPreviewInput);
      previewEl.removeEventListener('touchstart', onPreviewInput);
      previewEl.removeEventListener('keydown', onPreviewInput);
      previewEl.removeEventListener('scroll', handlePreviewScroll);
    };
  }, [editorEl, previewEl, enabled]);
}
