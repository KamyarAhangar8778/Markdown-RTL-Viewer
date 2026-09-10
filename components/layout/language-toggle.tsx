'use client';

/**
 * @file components/layout/language-toggle.tsx
 * @description Glassmorphism language switch button for toggling application locale between Persian and English.
 */

import React from 'react';
import { m, useReducedMotion } from 'motion/react';
import { Languages } from 'lucide-react';
import { useMarkdownContext } from '@/store/MarkdownContext';
import { SPRING_PRESS } from '@/lib/ease';

/**
 * Renders the language switcher button in the application header.
 *
 * @returns {React.JSX.Element} The rendered LanguageToggle component.
 */
export function LanguageToggle(): React.JSX.Element {
  const { language, toggleLanguage, t, theme } = useMarkdownContext();
  const isDark = theme === 'dark';
  const reduceMotion = useReducedMotion();

  return (
    <div id="header-language-container" className="flex items-center">
      <m.button
        id="header-language-toggle"
        type="button"
        onClick={toggleLanguage}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
        transition={SPRING_PRESS}
        title={t.header.languageToggleTitle}
        aria-label={t.header.languageToggleTitle}
        className={`group relative flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-0 px-2.5 sm:px-3 rounded-full border text-xs font-medium tracking-wide transition-colors duration-150 cursor-pointer select-none touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
          isDark
            ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-zinc-300 hover:text-white focus-visible:ring-offset-zinc-950'
            : 'bg-zinc-100 hover:bg-zinc-200/80 border-zinc-200 hover:border-zinc-300 text-zinc-700 hover:text-zinc-900 focus-visible:ring-offset-white'
        }`}
      >
        <Languages
          className={`w-3.5 h-3.5 transition-colors shrink-0 ${
            isDark ? 'text-zinc-400 group-hover:text-emerald-400' : 'text-zinc-500 group-hover:text-emerald-600'
          }`}
        />

        <span className="hidden sm:inline leading-none font-medium">
          {language === 'fa' ? 'English' : 'فارسی'}
        </span>

        <span
          className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold font-mono uppercase tracking-wider ${
            isDark
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          }`}
        >
          {language === 'fa' ? 'FA' : 'EN'}
        </span>
      </m.button>
    </div>
  );
}

