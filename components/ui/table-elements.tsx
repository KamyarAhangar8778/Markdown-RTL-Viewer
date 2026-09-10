'use client';

/**
 * @file components/ui/table-elements.tsx
 * @description Atomic table elements (head, body, row, cell) for RTL Markdown rendering.
 */

import React from 'react';
import { useMarkdownContext } from '@/store/MarkdownContext';

/**
 * Custom table head section element with theme-responsive borders.
 */
export function MarkdownTableHead({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>): React.JSX.Element {
  const { theme } = useMarkdownContext();
  const isDark = theme === 'dark';

  return (
    <thead
      className={`border-b text-xs font-semibold ${
        isDark
          ? 'bg-zinc-900/60 border-zinc-800 text-zinc-100'
          : 'bg-zinc-100/70 border-zinc-200 text-zinc-900'
      } ${className || ''}`}
      {...props}
    >
      {children}
    </thead>
  );
}

/**
 * Custom table body section element.
 */
export function MarkdownTableBody({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>): React.JSX.Element {
  return (
    <tbody className={`divide-y-0 [&>tr:last-child>td]:border-b-0 ${className || ''}`} {...props}>
      {children}
    </tbody>
  );
}

/**
 * Custom table row with hover interactions and alternating zebra striping.
 */
export function MarkdownTableRow({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>): React.JSX.Element {
  const { theme } = useMarkdownContext();
  const isDark = theme === 'dark';

  return (
    <tr
      className={`transition-colors duration-150 ${
        isDark
          ? 'even:bg-white/[0.015] hover:bg-zinc-800/40'
          : 'even:bg-zinc-50/60 hover:bg-zinc-100/70'
      } ${className || ''}`}
      {...props}
    >
      {children}
    </tr>
  );
}

/**
 * Custom table header cell with RTL alignment and clear separation.
 */
export function MarkdownTableHeaderCell({
  children,
  className,
  style,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>): React.JSX.Element {
  const { theme } = useMarkdownContext();
  const isDark = theme === 'dark';

  return (
    <th
      style={style}
      className={`py-3 px-4 text-right font-bold text-xs sm:text-sm tracking-tight border-b border-l ${
        isDark
          ? 'border-zinc-800 text-zinc-100 border-l-zinc-800/60'
          : 'border-zinc-200 text-zinc-900 border-l-zinc-200/80'
      } last:border-l-0 ${className || ''}`}
      {...props}
    >
      {children}
    </th>
  );
}

/**
 * Custom table data cell with optimized typography and RTL layout.
 */
export function MarkdownTableCell({
  children,
  className,
  style,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>): React.JSX.Element {
  const { theme } = useMarkdownContext();
  const isDark = theme === 'dark';

  return (
    <td
      style={style}
      className={`py-2.5 px-4 text-right align-middle text-xs sm:text-sm leading-relaxed border-b border-l ${
        isDark
          ? 'border-zinc-800/50 text-zinc-300 border-l-zinc-800/40'
          : 'border-zinc-200/60 text-zinc-700 border-l-zinc-200/60'
      } last:border-l-0 ${className || ''}`}
      {...props}
    >
      {children}
    </td>
  );
}
