'use client';

/**
 * @file components/layout/theme-toggle.tsx
 * @description Header theme toggle button implementing the Circle Blur View Transition API reveal.
 */

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeToggle } from '@/components/motion/theme-toggle';
import { ActionSwapIcon } from '@/components/motion/action-swap';
import { useMarkdownContext } from '@/store/MarkdownContext';

/**
 * Renders the theme switcher button in the application header with Circle Blur View Transition.
 *
 * @returns {React.JSX.Element} The rendered ThemeToggle component.
 */
export function ThemeToggle(): React.JSX.Element {
  const { isDark, mounted, toggle } = useThemeToggle({
    variant: 'circle-blur',
    start: 'center',
  });
  const { t } = useMarkdownContext();

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((rect.left + rect.width / 2) / window.innerWidth) * 100);
    const y = Math.round(((rect.top + rect.height / 2) / window.innerHeight) * 100);

    toggle(`${x}% ${y}%`);
  };

  return (
    <div id="header-theme-container" className="flex items-center">
      <button
        id="header-theme-toggle"
        type="button"
        onClick={handleToggle}
        title={isDark ? t.header.themeToggleLightTitle : t.header.themeToggleDarkTitle}
        aria-label={isDark ? t.header.themeToggleLightTitle : t.header.themeToggleDarkTitle}
        aria-pressed={isDark}
        className={`group relative flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-0 px-2.5 sm:px-3 rounded-full border text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer select-none touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 active:scale-95 ${
          isDark
            ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-zinc-300 hover:text-white focus-visible:ring-offset-zinc-950'
            : 'bg-zinc-100 hover:bg-zinc-200/80 border-zinc-200 hover:border-zinc-300 text-zinc-700 hover:text-zinc-900 focus-visible:ring-offset-white'
        }`}
      >
        <span className="relative flex items-center justify-center shrink-0">
          {mounted ? (
            <ActionSwapIcon
              value={isDark ? 'dark' : 'light'}
              animation="blur"
              className="w-3.5 h-3.5"
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5 text-amber-400 transition-transform duration-300 group-hover:rotate-45" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-indigo-600 transition-transform duration-300 group-hover:-rotate-12" />
              )}
            </ActionSwapIcon>
          ) : (
            <span className="w-3.5 h-3.5 inline-block" />
          )}
        </span>

        <span className="hidden sm:inline leading-none">
          {isDark ? t.header.themeLightPrompt : t.header.themeDarkPrompt}
        </span>
      </button>
    </div>
  );
}

