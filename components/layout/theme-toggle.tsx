'use client';

/**
 * @file components/layout/theme-toggle.tsx
 * @description Glassmorphism theme toggle button for switching between Dark and Light color schemes.
 */

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useMarkdownContext } from '@/store/MarkdownContext';

/**
 * Renders the theme switcher button in the application header.
 *
 * @returns {React.JSX.Element} The rendered ThemeToggle component.
 */
export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, t } = useMarkdownContext();
  const isDark = theme === 'dark';

  return (
    <div id="header-theme-container" className="flex items-center">
      <button
        id="header-theme-toggle"
        type="button"
        onClick={toggleTheme}
        title={isDark ? t.header.themeToggleLightTitle : t.header.themeToggleDarkTitle}
        aria-label={isDark ? t.header.themeToggleLightTitle : t.header.themeToggleDarkTitle}
        className={`group relative flex items-center justify-center gap-2 h-9 px-3 rounded-xl border text-xs font-semibold tracking-wide transition-all duration-200 backdrop-blur-md cursor-pointer select-none focus:outline-none focus:ring-2 active:scale-95 ${
          isDark
            ? 'bg-zinc-900/90 hover:bg-zinc-800/90 border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white focus:ring-amber-400/30 shadow-inner'
            : 'bg-white hover:bg-zinc-100 border-zinc-200 hover:border-zinc-300 text-zinc-800 hover:text-zinc-950 focus:ring-indigo-500/30 shadow-xs'
        }`}
      >
        <span className="relative flex items-center justify-center">
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 group-hover:rotate-45" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600 transition-transform duration-300 group-hover:-rotate-12" />
          )}
        </span>

        <span className="leading-none">
          {isDark ? t.header.themeLightPrompt : t.header.themeDarkPrompt}
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;

