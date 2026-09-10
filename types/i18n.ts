/**
 * @file types/i18n.ts
 * @description Type definitions for internationalization and language translation dictionaries.
 */

export type Language = 'fa' | 'en';

export interface Translations {
  header: {
    brandTitle: string;
    brandSubtitle: string;
    engineStatus: string;
    gfmNative: string;
    languageToggleTitle: string;
    switchLangPrompt: string;
    themeToggleLightTitle: string;
    themeToggleDarkTitle: string;
    themeLightPrompt: string;
    themeDarkPrompt: string;
  };
  editor: {
    title: string;
    lines: string;
    words: string;
    chars: string;
    placeholder: string;
    syncScroll: string;
    syncScrollEnabled: string;
    syncScrollDisabled: string;
  };
  preview: {
    title: string;
    emptyTitle: string;
    emptyDescription: string;
  };
  dock: {
    upload: string;
    paste: string;
    download: string;
    splitView: string;
    editorView: string;
    previewView: string;
    clear: string;
    focusMode: string;
    exitFocusMode: string;
  };
  focusMode: {
    title: string;
    subtitle: string;
    exitButton: string;
    escHint: string;
  };
  uploadModal: {
    title: string;
    description: string;
    dragDropText: string;
    maxSizeText: string;
    selectButton: string;
  };
  pasteModal: {
    title: string;
    description: string;
    placeholder: string;
    clearButton: string;
    cancelButton: string;
    applyButton: string;
  };
  toasts: {
    editorCleared: string;
    pasteSuccess: string;
    clipboardEmpty: string;
    clipboardPermissionDenied: string;
    noTextToDownload: string;
    downloadSuccess: string;
    invalidFileType: string;
    uploadSuccess: (filename: string) => string;
    fileReadError: string;
    noTextToApply: string;
    textApplied: string;
    langSwitched: (lang: string) => string;
  };
}
