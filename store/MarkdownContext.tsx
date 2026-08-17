'use client';

/**
 * @file store/MarkdownContext.tsx
 * @description React Context providing centralized state management for Markdown conversion and UI workflows.
 */

import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { RtlConversionOptions, MarkdownContextType } from '@/types/markdown';
import { ViewMode, Theme } from '@/types/ui';
import { Language } from '@/types/i18n';
import { TRANSLATIONS } from '@/constants/translations';
import { convertToRtlMarkdown } from '@/utils/rtlConverter';
import { calculateDocumentStats } from '@/utils/statsCalculator';
import { SAMPLE_TEMPLATES } from '@/constants/sampleTemplates';
import { useToastQueue } from '@/hooks/useToastQueue';

export type { MarkdownContextType };

const defaultOptions: RtlConversionOptions = {
  wrapRtlContainer: false,
  persianizeDigits: false,
};

const MarkdownContext = createContext<MarkdownContextType | undefined>(undefined);

/**
 * Global Markdown State Provider wrapping the studio application.
 *
 * @param props - Children components to render within context.
 * @returns Context Provider element.
 */
export const MarkdownProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('fa');
  const [rawMarkdown, setRawMarkdown] = useState<string>('');
  const [options, setOptions] = useState<RtlConversionOptions>(defaultOptions);
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isPasteOpen, setIsPasteOpen] = useState<boolean>(false);
  const { toasts, addToast, removeToast } = useToastQueue();

  const t = useMemo(() => TRANSLATIONS[language], [language]);

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    const isFa = language === 'fa';
    addToast(
      nextTheme === 'light'
        ? isFa ? 'حالت روشن فعال شد' : 'Light theme activated'
        : isFa ? 'حالت تاریک فعال شد' : 'Dark theme activated',
      'info'
    );
  }, [theme, language, addToast]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (theme === 'light') {
        root.classList.add('light');
        root.classList.remove('dark');
      } else {
        root.classList.add('dark');
        root.classList.remove('light');
      }
    }
  }, [theme]);

  const toggleLanguage = useCallback(() => {
    const nextLang: Language = language === 'fa' ? 'en' : 'fa';
    setLanguage(nextLang);
    addToast(
      nextLang === 'en' ? 'Language switched to English' : 'زبان به فارسی تغییر یافت',
      'info'
    );
  }, [language, addToast]);

  const rtlMarkdown = useMemo(() => {
    return convertToRtlMarkdown(rawMarkdown, options);
  }, [rawMarkdown, options]);

  const stats = useMemo(() => {
    return calculateDocumentStats(rawMarkdown);
  }, [rawMarkdown]);

  const loadTemplate = useCallback(
    (id: string) => {
      const template = SAMPLE_TEMPLATES.find((t) => t.id === id);
      if (template) {
        setRawMarkdown(template.content);
        addToast(t.toasts.templateLoaded(template.titleFa), 'success');
      }
    },
    [addToast, t]
  );

  const clearContent = useCallback(() => {
    setRawMarkdown('');
    addToast(t.toasts.editorCleared, 'info');
  }, [addToast, t]);

  const contextValue: MarkdownContextType = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      language,
      setLanguage,
      toggleLanguage,
      t,
      rawMarkdown,
      setRawMarkdown,
      rtlMarkdown,
      options,
      setOptions,
      viewMode,
      setViewMode,
      stats,
      isUploadOpen,
      setIsUploadOpen,
      isPasteOpen,
      setIsPasteOpen,
      toasts,
      addToast,
      removeToast,
      loadTemplate,
      clearContent,
    }),
    [
      theme,
      toggleTheme,
      language,
      toggleLanguage,
      t,
      rawMarkdown,
      rtlMarkdown,
      options,
      viewMode,
      stats,
      isUploadOpen,
      isPasteOpen,
      toasts,
      addToast,
      removeToast,
      loadTemplate,
      clearContent,
    ]
  );

  return (
    <MarkdownContext.Provider value={contextValue}>
      {children}
    </MarkdownContext.Provider>
  );
};

/**
 * Custom hook to access the global MarkdownContext values and dispatchers.
 *
 * @returns MarkdownContextType with all state and methods.
 * @throws Error if used outside of a MarkdownProvider.
 */
export const useMarkdownContext = (): MarkdownContextType => {
  const context = useContext(MarkdownContext);
  if (!context) {
    throw new Error('useMarkdownContext must be used within a MarkdownProvider');
  }
  return context;
};


