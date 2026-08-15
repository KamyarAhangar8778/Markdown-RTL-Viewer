'use client';

/**
 * @file hooks/useStudioDockActions.tsx
 * @description Custom hook encapsulating actions, handlers, and items configuration for the Studio Dock.
 */

import React, { useMemo, useCallback } from 'react';
import {
  Upload,
  ClipboardPaste,
  Download,
  Code2,
  LayoutGrid,
  Edit3,
  Eye,
  Trash2,
} from 'lucide-react';
import { PersianDigitsIcon } from '@/components/ui/persian-digits-icon';
import { useMarkdownContext } from '@/store/MarkdownContext';
import { useClipboard } from '@/hooks/useClipboard';
import { downloadFile } from '@/utils/fileHelpers';
import { DockItemData } from '@/types/dock';

/**
 * Custom hook providing action handlers and generated items for the Studio Dock.
 *
 * @returns An array of DockItemData configured with current state, handlers, and active indicators.
 */
export function useStudioDockActions(): DockItemData[] {
  const {
    setRawMarkdown,
    rtlMarkdown,
    options,
    setOptions,
    viewMode,
    setViewMode,
    setIsUploadOpen,
    clearContent,
    addToast,
    t,
  } = useMarkdownContext();

  const { readFromClipboard } = useClipboard();

  const handlePaste = useCallback(async () => {
    try {
      const result = await readFromClipboard();
      if (result.success && result.text !== null) {
        if (result.text.length > 0) {
          // Clear previous content completely and set new clipboard content directly
          setRawMarkdown(result.text);
          addToast(t.toasts.pasteSuccess, 'success');
        } else {
          addToast(t.toasts.clipboardEmpty, 'info');
        }
      } else {
        const textarea = typeof document !== 'undefined'
          ? (document.getElementById('editor-markdown-textarea') as HTMLTextAreaElement | null)
          : null;
        if (textarea) {
          textarea.focus();
        }
        addToast(t.toasts.clipboardPermissionDenied, 'error');
      }
    } catch {
      const textarea = typeof document !== 'undefined'
        ? (document.getElementById('editor-markdown-textarea') as HTMLTextAreaElement | null)
        : null;
      if (textarea) {
        textarea.focus();
      }
      addToast(t.toasts.clipboardPermissionDenied, 'error');
    }
  }, [readFromClipboard, setRawMarkdown, addToast, t]);

  const handleDownload = useCallback(() => {
    if (!rtlMarkdown.trim()) {
      addToast(t.toasts.noTextToDownload, 'info');
      return;
    }
    downloadFile(rtlMarkdown, 'rtl-document.md');
    addToast(t.toasts.downloadSuccess, 'success');
  }, [rtlMarkdown, addToast, t]);

  const togglePersianDigits = useCallback(() => {
    setOptions((prev) => ({ ...prev, persianizeDigits: !prev.persianizeDigits }));
  }, [setOptions]);

  const togglePreserveCode = useCallback(() => {
    setOptions((prev) => ({ ...prev, preserveLtrCode: !prev.preserveLtrCode }));
  }, [setOptions]);

  const dockItems: DockItemData[] = useMemo(
    () => [
      { id: 'dock-upload', icon: <Upload className="w-5 h-5" />, label: t.dock.upload, onClick: () => setIsUploadOpen(true) },
      { id: 'dock-paste', icon: <ClipboardPaste className="w-5 h-5" />, label: t.dock.paste, onClick: handlePaste },
      { id: 'dock-download', icon: <Download className="w-5 h-5" />, label: t.dock.download, onClick: handleDownload },
      {
        id: 'dock-digits',
        icon: <PersianDigitsIcon className="w-5 h-5" />,
        label: options.persianizeDigits ? t.dock.persianDigitsActive : t.dock.persianDigitsInactive,
        onClick: togglePersianDigits,
        isActive: options.persianizeDigits,
      },
      {
        id: 'dock-code',
        icon: <Code2 className="w-5 h-5" />,
        label: options.preserveLtrCode ? t.dock.codeIsolationActive : t.dock.codeIsolationInactive,
        onClick: togglePreserveCode,
        isActive: options.preserveLtrCode,
      },
      { id: 'dock-split', icon: <LayoutGrid className="w-5 h-5" />, label: t.dock.splitView, onClick: () => setViewMode('split'), isActive: viewMode === 'split' },
      { id: 'dock-editor', icon: <Edit3 className="w-5 h-5" />, label: t.dock.editorView, onClick: () => setViewMode('editor'), isActive: viewMode === 'editor' },
      { id: 'dock-preview', icon: <Eye className="w-5 h-5" />, label: t.dock.previewView, onClick: () => setViewMode('preview'), isActive: viewMode === 'preview' },
      { id: 'dock-clear', icon: <Trash2 className="w-5 h-5 text-red-400" />, label: t.dock.clear, onClick: clearContent },
    ],
    [
      setIsUploadOpen,
      handlePaste,
      handleDownload,
      options.persianizeDigits,
      togglePersianDigits,
      options.preserveLtrCode,
      togglePreserveCode,
      setViewMode,
      viewMode,
      clearContent,
      t,
    ]
  );

  return dockItems;
}

