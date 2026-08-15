/**
 * @file types/markdown.ts
 * @description Type definitions for Markdown document state, RTL conversion options, and stats.
 */

import { ViewMode, ToastMessage, Theme } from '@/types/ui';
import { Language, Translations } from '@/types/i18n';

export interface RtlConversionOptions {
  /** Wrap markdown with explicit RTL div container */
  wrapRtlContainer: boolean;
  /** Convert Western digits (0-9) to Persian digits (۰-۹) */
  persianizeDigits: boolean;
  /** Preserve code blocks direction as LTR */
  preserveLtrCode: boolean;
  /** Add RTL paragraph direction attributes */
  autoAlignParagraphs: boolean;
}

export interface DocumentStats {
  characterCount: number;
  wordCount: number;
  persianCharCount: number;
  lineCount: number;
  estimatedReadTimeMinutes: number;
}

export interface SampleTemplate {
  id: string;
  titleFa: string;
  descriptionFa: string;
  content: string;
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
  options: RtlConversionOptions;
  setOptions: React.Dispatch<React.SetStateAction<RtlConversionOptions>>;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  stats: DocumentStats;
  isUploadOpen: boolean;
  setIsUploadOpen: (open: boolean) => void;
  isPasteOpen: boolean;
  setIsPasteOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  addToast: (title: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  loadTemplate: (id: string) => void;
  clearContent: () => void;
}

