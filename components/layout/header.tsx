'use client';

/**
 * @file components/layout/header.tsx
 * @description Master cinematic glassmorphism header integrating brand identity, view switcher, and quick tools.
 */

import React, { useState, useEffect } from 'react';
import { HeaderBrand } from '@/components/layout/header-brand';
import { LanguageToggle } from '@/components/layout/language-toggle';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { useMarkdownContext } from '@/store/MarkdownContext';

/**
 * Main application header delivering studio branding and identity.
 *
 * @returns {React.JSX.Element} The rendered Header component.
 */
export const Header: React.FC = () => {
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

  return (
    <header
      id="main-app-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 backdrop-blur-2xl ${
        isDark
          ? isScrolled
            ? 'bg-zinc-950/90 shadow-2xl shadow-black/80'
            : 'bg-black/75'
          : isScrolled
            ? 'bg-white/90 shadow-xl shadow-zinc-300/40 border-b border-zinc-200/80'
            : 'bg-white/75 border-b border-zinc-200/50'
      }`}
    >
      {/* Top Specular Ambient Line */}
      <div
        className={`absolute inset-x-0 top-0 h-[1px] pointer-events-none ${
          isDark
            ? 'bg-gradient-to-r from-transparent via-white/15 to-transparent'
            : 'bg-gradient-to-r from-transparent via-zinc-400/20 to-transparent'
        }`}
      />

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4">
        {/* Brand & Engine status */}
        <HeaderBrand />

        {/* Controls Container: Theme & Language */}
        <div id="header-actions-group" className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>

      {/* Bottom Ambient Boundary */}
      {isDark && (
        <div
          className={`h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent transition-opacity duration-300 ${
            isScrolled ? 'opacity-90' : 'opacity-40'
          }`}
        />
      )}
    </header>
  );
};

export default Header;
