'use client';

/**
 * @file components/layout/header.tsx
 * @description Floating dynamic island header delivering modern studio branding and quick controls.
 */

import React, { useState, useEffect } from 'react';
import { HeaderBrand } from '@/components/layout/header-brand';
import { LanguageToggle } from '@/components/layout/language-toggle';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { FocusToggle } from '@/components/layout/focus-toggle';
import { useMarkdownContext } from '@/store/MarkdownContext';

function getHeaderGlassClass(isDark: boolean, isScrolled: boolean): string {
  if (isDark) {
    if (isScrolled) {
      return 'bg-zinc-950/85 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_0_20px_rgba(255,255,255,0.08),inset_0_1px_1px_rgba(255,255,255,0.25)]';
    }
    return 'bg-zinc-950/70 border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.7),inset_0_0_16px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.18)]';
  }

  if (isScrolled) {
    return 'bg-white/90 border border-zinc-300/90 shadow-[0_16px_40px_rgba(0,0,0,0.12),inset_0_0_18px_rgba(255,255,255,0.95),inset_0_1px_1px_rgba(255,255,255,1)]';
  }
  return 'bg-white/80 border border-zinc-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.07),inset_0_0_14px_rgba(255,255,255,0.9),inset_0_1px_1px_rgba(255,255,255,1)]';
}

/**
 * Floating island application header delivering modern studio branding and quick controls
 * with an intense frosted backdrop-filter and subtle border inner glow.
 *
 * @returns {React.JSX.Element} The rendered Header component.
 */
export function Header(): React.JSX.Element {
  const { theme } = useMarkdownContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerGlassClass = getHeaderGlassClass(isDark, isScrolled);

  return (
    <div id="header-island-wrapper" className="w-full flex justify-center px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 pointer-events-none">
      <header
        id="main-app-header"
        className={`pointer-events-auto relative w-full max-w-[1580px] rounded-2xl sm:rounded-full transition-all duration-300 backdrop-blur-3xl backdrop-saturate-150 ${headerGlassClass}`}
      >
        {/* Top ambient specular line along island top */}
        <div
          className={`absolute inset-x-8 top-0 h-[1px] rounded-full pointer-events-none ${
            isDark
              ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
              : 'bg-gradient-to-r from-transparent via-zinc-400/30 to-transparent'
          }`}
        />

        {/* Island Content Container */}
        <div className="px-3 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-3 sm:gap-4">
          <HeaderBrand />

          {/* Controls: Focus, Theme & Language */}
          <div id="header-actions-group" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <FocusToggle />
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </header>
    </div>
  );
}
