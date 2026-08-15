import type { Metadata } from 'next';
import { Vazirmatn, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/components/layout/smooth-scroll-provider';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-vazir-local',
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-code-en-local',
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: 'RTL Markdown Studio',
  description: 'Advanced RTL Markdown converter, editor, and previewer with dark modern cinematic UI.',
  openGraph: {
    title: 'RTL Markdown Studio',
    description: 'Advanced RTL Markdown converter, editor, and previewer with dark modern cinematic UI.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RTL Markdown Studio',
    description: 'Advanced RTL Markdown converter, editor, and previewer with dark modern cinematic UI.',
  },
};

/**
 * Root Layout Component providing font variables and smooth scroll.
 *
 * @param {object} props - Component props containing children nodes.
 * @returns {React.JSX.Element} Root HTML layout.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="font-vazir bg-black text-zinc-100 antialiased">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

