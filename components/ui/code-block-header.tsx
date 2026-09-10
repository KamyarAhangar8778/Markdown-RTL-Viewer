'use client';

/**
 * @file components/ui/code-block-header.tsx
 * @description Header bar for code blocks showing language badge and copy action button.
 */

import React from 'react';
import { m, AnimatePresence, useReducedMotion } from 'motion/react';
import { Copy, Check } from 'lucide-react';
import { SPRING_PRESS, EASE_OUT } from '@/lib/ease';

interface CodeBlockHeaderProps {
  languageName: string;
  isDark: boolean;
  isPersian: boolean;
  copied: boolean;
  onCopy: () => void;
}

function getHeaderClass(isDark: boolean): string {
  return isDark
    ? 'bg-zinc-900/90 border-zinc-800/90 text-zinc-300'
    : 'bg-zinc-100 border-zinc-200 text-zinc-950';
}

function getButtonClass(copied: boolean, isDark: boolean): string {
  if (copied) {
    return isDark
      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-xs'
      : 'bg-emerald-50 text-emerald-600 border-emerald-300 shadow-xs';
  }
  if (isDark) {
    return 'bg-zinc-800/80 text-zinc-300 border-zinc-700/70 hover:bg-zinc-700 hover:text-white focus-visible:ring-offset-zinc-950';
  }
  return 'bg-white text-zinc-900 border-zinc-300 hover:bg-zinc-50 hover:text-black shadow-xs focus-visible:ring-offset-white';
}

function getCopyLabels(isPersian: boolean, copied: boolean): { title: string; ariaLabel: string } {
  if (isPersian) {
    return {
      title: copied ? 'کپی شد' : 'کپی کد',
      ariaLabel: copied ? 'کد در کلیپ‌بورد کپی شد' : 'کپی کد در کلیپ‌بورد',
    };
  }
  return {
    title: copied ? 'Copied' : 'Copy code',
    ariaLabel: copied ? 'Code copied to clipboard' : 'Copy code to clipboard',
  };
}

function CopyButtonContent({ copied }: { copied: boolean }): React.JSX.Element {
  if (copied) {
    return (
      <m.span
        key="copied-state"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.12 }}
        className="flex items-center justify-center"
      >
        <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[2.5]" />
      </m.span>
    );
  }

  return (
    <m.span
      key="copy-state"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.12 }}
      className="flex items-center justify-center"
    >
      <Copy className="w-3.5 h-3.5" />
    </m.span>
  );
}

/**
 * Formats programming language identifier into a clean display label.
 *
 * @param {string} [lang] - Raw or normalized language name.
 * @param {boolean} [isPersian] - Whether the active interface language is Persian.
 * @returns {string} Human-readable language display label.
 */
function formatLanguageName(lang?: string, isPersian?: boolean): string {
  if (!lang || lang === 'text' || lang === 'plain' || lang === 'plaintext') {
    return isPersian ? 'متن' : 'TEXT';
  }
  const displayMap: Record<string, string> = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    python: 'Python',
    bash: 'Bash',
    json: 'JSON',
    yaml: 'YAML',
    markdown: 'Markdown',
    xml: 'HTML / XML',
    css: 'CSS',
    cpp: 'C++',
    csharp: 'C#',
    c: 'C',
    go: 'Go',
    rust: 'Rust',
    sql: 'SQL',
    ruby: 'Ruby',
    java: 'Java',
    php: 'PHP',
    dockerfile: 'Docker',
    graphql: 'GraphQL',
    kotlin: 'Kotlin',
    swift: 'Swift',
    dart: 'Dart',
    scss: 'SCSS',
    diff: 'Diff',
    ini: 'INI',
    makefile: 'Makefile',
    powershell: 'PowerShell',
  };
  return displayMap[lang.toLowerCase()] || lang.toUpperCase();
}

/**
 * Code block header component with copy trigger and language tag.
 */
export function CodeBlockHeader({
  languageName,
  isDark,
  isPersian,
  copied,
  onCopy,
}: CodeBlockHeaderProps): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const { title, ariaLabel } = getCopyLabels(isPersian, copied);

  return (
    <div
      data-code-header
      className={`flex items-center justify-between px-3.5 py-1.5 border-b text-[11px] font-mono select-none ${getHeaderClass(isDark)}`}
      dir="ltr"
    >
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
        <span
          data-code-header-lang
          className={`font-black tracking-wider text-[11px] ${
            isDark ? 'text-zinc-200' : 'text-zinc-950'
          }`}
        >
          {formatLanguageName(languageName, isPersian)}
        </span>
      </div>

      <m.button
        type="button"
        onClick={onCopy}
        whileTap={reduceMotion ? undefined : { scale: 0.92 }}
        animate={
          copied && !reduceMotion
            ? { scale: [1, 1.1, 1], transition: { duration: 0.2, ease: EASE_OUT } }
            : { scale: 1 }
        }
        transition={SPRING_PRESS}
        className={`w-7 h-7 flex items-center justify-center rounded-lg text-[11px] transition-colors cursor-pointer border touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${getButtonClass(copied, isDark)}`}
        title={title}
        aria-label={ariaLabel}
      >
        <AnimatePresence mode="wait" initial={false}>
          <CopyButtonContent copied={copied} />
        </AnimatePresence>
      </m.button>
    </div>
  );
}
