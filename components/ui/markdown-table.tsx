'use client';

/**
 * @file components/ui/markdown-table.tsx
 * @description Custom RTL-optimized and glassmorphism styled table components for Markdown preview.
 */

import React from 'react';
import { useMarkdownContext } from '@/store/MarkdownContext';

/**
 * Props for the MarkdownTable container component.
 */
export interface MarkdownTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children?: React.ReactNode;
}

/**
 * Custom table container with glassmorphic styling and responsive horizontal scrolling
 * for RTL Markdown preview.
 *
 * @param {MarkdownTableProps} props - Table HTML element attributes.
 * @returns {React.JSX.Element} Fully styled table wrapped in a clean container.
 */
export function MarkdownTable({ children, className, ...props }: MarkdownTableProps): React.JSX.Element {
  const { theme } = useMarkdownContext();
  const isDark = theme === 'dark';

  return (
    <div
      className={`my-5 rounded-xl border overflow-hidden transition-all duration-200 shadow-lg ${
        isDark
          ? 'bg-zinc-950/80 border-zinc-800/80 shadow-black/30'
          : 'bg-white/95 border-zinc-200/90 shadow-zinc-200/40'
      }`}
      dir="rtl"
    >
      {/* Horizontal Scroll Area */}
      <div className="overflow-x-auto w-full max-w-full">
        <table
          className={`w-full border-collapse text-right text-xs sm:text-sm font-vazir m-0 border-0 ${className || ''}`}
          {...props}
        >
          {children}
        </table>
      </div>
    </div>
  );
}

export {
  MarkdownTableHead,
  MarkdownTableBody,
  MarkdownTableRow,
  MarkdownTableHeaderCell,
  MarkdownTableCell,
} from './table-elements';

