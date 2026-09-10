'use client';

/**
 * @file hooks/useStudioDockActions.tsx
 * @description Custom hook encapsulating actions, handlers, and items configuration for the Studio Dock.
 */

import React, { useMemo, useCallback, useRef, useEffect } from 'react';
import {
  Upload,
  Clipboard,
  Download,
  Columns2,
  PenBox,
  Eye,
  Trash2,
} from 'lucide-react';
import { useMarkdownContext } from '@/store/MarkdownContext';
import { useClipboard } from '@/hooks/useClipboard';
import { downloadFile } from '@/utils/fileHelpers';
import { prepareExportBundle } from '@/services/markdownEngine';
import { DockItemData } from '@/types/dock';

/**
 * Custom hook providing action handlers and generated items for the Studio Dock.
 * Stabilizes function references using refs to prevent unnecessary dock re-renders during text input.
 *
 * @returns An array of DockItemData configured with current state, handlers, and active indicators.
 */
export function useStudioDockActions(): DockItemData[] {
  const {
    setRawMarkdown,
    rtlMarkdown,
    viewMode,
    setViewMode,
    setIsUploadOpen,
    setIsPasteOpen,
    clearContent,
    showToast,
    t,
  } = useMarkdownContext();

  const { readFromClipboard } = useClipboard();
  const rtlMarkdownRef = useRef(rtlMarkdown);

  useEffect(() => {
    rtlMarkdownRef.current = rtlMarkdown;
  }, [rtlMarkdown]);

  const handlePaste = useCallback(async () => {
    try {
      const result = await readFromClipboard();
      if (result.success && result.text !== null) {
        if (result.text.length > 0) {
          // Clear previous content completely and set new clipboard content directly
          setRawMarkdown(result.text);
          showToast(t.toasts.pasteSuccess, 'success');
        } else {
          setIsPasteOpen(true);
        }
      } else {
        setIsPasteOpen(true);
      }
    } catch {
      setIsPasteOpen(true);
    }
  }, [readFromClipboard, setRawMarkdown, setIsPasteOpen, showToast, t.toasts.pasteSuccess]);

  const handleDownload = useCallback(() => {
    const currentRtl = rtlMarkdownRef.current;
    if (!currentRtl.trim()) {
      showToast(t.toasts.noTextToDownload, 'error');
      return;
    }
    const bundle = prepareExportBundle(currentRtl);
    downloadFile(bundle.content, bundle.filename, bundle.mimeType);
    showToast(t.toasts.downloadSuccess, 'success');
  }, [showToast, t.toasts.noTextToDownload, t.toasts.downloadSuccess]);

  const dockItems: DockItemData[] = useMemo(
    () => [
      { id: 'dock-upload', icon: <Upload className="w-5 h-5" />, label: t.dock.upload, onClick: () => setIsUploadOpen(true) },
      { id: 'dock-paste', icon: <Clipboard className="w-5 h-5" />, label: t.dock.paste, onClick: handlePaste },
      { id: 'dock-download', icon: <Download className="w-5 h-5" />, label: t.dock.download, onClick: handleDownload },
      { id: 'dock-split', icon: <Columns2 className="w-5 h-5" />, label: t.dock.splitView, onClick: () => setViewMode('split'), isActive: viewMode === 'split' },
      { id: 'dock-editor', icon: <PenBox className="w-5 h-5" />, label: t.dock.editorView, onClick: () => setViewMode('editor'), isActive: viewMode === 'editor' },
      { id: 'dock-preview', icon: <Eye className="w-5 h-5" />, label: t.dock.previewView, onClick: () => setViewMode('preview'), isActive: viewMode === 'preview' },
      { id: 'dock-clear', icon: <Trash2 className="w-5 h-5 text-red-400" />, label: t.dock.clear, onClick: clearContent },
    ],
    [
      setIsUploadOpen,
      handlePaste,
      handleDownload,
      setViewMode,
      viewMode,
      clearContent,
      t,
    ]
  );

  return dockItems;
}

