'use client';

/**
 * @file components/layout/language-toggle.tsx
 * @description Glassmorphism language switch button for toggling application locale between Persian and English.
 */

import React from 'react';
import { Languages } from 'lucide-react';
import { useMarkdownContext } from '@/store/MarkdownContext';

/**
 * Renders the language switcher button in the application header.
 *
 * @returns {React.JSX.Element} The rendered LanguageToggle component.
 */
export const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage, t, theme } = useMarkdownContext();
  const isDark = theme === 'dark';

  return (
    <div id="header-language-container" className="flex items-center">
      <button
        id="header-language-toggle"
        type="button"
        onClick={toggleLanguage}
        title={t.header.languageToggleTitle}
        aria-label={t.header.languageToggleTitle}
        className={`group relative flex items-center justify-center gap-2 h-9 px-3 rounded-xl border text-xs font-semibold tracking-wide transition-all duration-200 backdrop-blur-md cursor-pointer select-none focus:outline-none focus:ring-2 active:scale-95 ${
          isDark
            ? 'bg-zinc-900/90 hover:bg-zinc-800/90 border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white focus:ring-emerald-400/30 shadow-inner'
            : 'bg-white hover:bg-zinc-100 border-zinc-200 hover:border-zinc-300 text-zinc-800 hover:text-zinc-950 focus:ring-emerald-500/30 shadow-xs'
        }`}
      >
        <Languages
          className={`w-4 h-4 transition-colors shrink-0 ${
            isDark ? 'text-zinc-400 group-hover:text-emerald-400' : 'text-zinc-500 group-hover:text-emerald-600'
          }`}
        />

        <span className="leading-none font-medium">
          {language === 'fa' ? 'English' : 'فارسی'}
        </span>

        <span
          className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider ${
            isDark
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          }`}
        >
          {language === 'fa' ? 'FA' : 'EN'}
        </span>
      </button>
    </div>
  );
};

export default LanguageToggle;

