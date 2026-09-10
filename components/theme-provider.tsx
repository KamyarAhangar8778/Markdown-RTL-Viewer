'use client';

/**
 * @file components/theme-provider.tsx
 * @description Client-side NextThemes wrapper providing theme state across the entire document tree.
 */

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
