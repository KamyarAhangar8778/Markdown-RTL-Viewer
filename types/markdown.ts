/**
 * @file types/markdown.ts
 * @description Type definitions for Markdown document state and stats.
 */

import { ViewMode, Theme } from '@/types/ui';
import { Language, Translations } from '@/types/i18n';

import { ToastState } from '@/components/ui/toast-notification';

export interface DocumentStats {
  characterCount: number;
  wordCount: number;
  persianCharCount: number;
  lineCount: number;
  estimatedReadTimeMinutes: number;
}

export interface MarkdownContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  rawMarkdown: string;
  setRawMarkdown: (val: string) => void;
  rtlMarkdown: string;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  stats: DocumentStats;
  isProcessing: boolean;
  isUploadOpen: boolean;
  setIsUploadOpen: (open: boolean) => void;
  isPasteOpen: boolean;
  setIsPasteOpen: (open: boolean) => void;
  isFocusMode: boolean;
  setIsFocusMode: (focus: boolean) => void;
  toggleFocusMode: () => void;
  isSyncScroll: boolean;
  setIsSyncScroll: (val: boolean | ((prev: boolean) => boolean)) => void;
  toggleSyncScroll: () => void;
  editorElement: HTMLTextAreaElement | null;
  setEditorElement: (el: HTMLTextAreaElement | null) => void;
  previewElement: HTMLDivElement | null;
  setPreviewElement: (el: HTMLDivElement | null) => void;
  clearContent: () => void;
  loadSample: () => void;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error', action?: { label: string; onClick: () => void }) => void;
  closeToast: () => void;
}


