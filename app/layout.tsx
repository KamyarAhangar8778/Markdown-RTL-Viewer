import type { Metadata } from 'next';
import { Vazirmatn, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/components/layout/smooth-scroll-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { MotionProvider } from '@/components/providers/motion-provider';
import { InitialAppLoader } from '@/components/ui/initial-app-loader';
import { CustomCursor } from '@/components/custom-cursor';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-vazir-local',
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-code-en-local',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'RTL Markdown Studio',
  description: 'Markdown editor and previewer with RTL support for Persian and Arabic text.',
  openGraph: {
    title: 'RTL Markdown Studio',
    description: 'Markdown editor and previewer with RTL support for Persian and Arabic text.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RTL Markdown Studio',
    description: 'Markdown editor and previewer with RTL support for Persian and Arabic text.',
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
    <html lang="fa" dir="rtl" suppressHydrationWarning className={`${vazirmatn.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="font-vazir bg-black text-zinc-100 antialiased">
        {/* Instant pre-hydration ASCII line loader */}
        <div
          id="pre-hydration-loader"
          suppressHydrationWarning
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#e4e4e7',
            fontFamily: 'monospace',
            fontSize: '32px',
            userSelect: 'none',
          }}
          dangerouslySetInnerHTML={{
            __html: `
              <span id="pre-ascii-char">|</span>
              <script>
                (function() {
                  var f = ['|', '/', '-', '\\\\'];
                  var i = 0;
                  var el = document.getElementById('pre-ascii-char');
                  if (el) {
                    window.__asciiPreInterval = setInterval(function() {
                      i = (i + 1) % f.length;
                      el.textContent = f[i];
                    }, 200);
                  }
                })();
              </script>
            `,
          }}
        />

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <MotionProvider>
            <InitialAppLoader />
            <CustomCursor />
            <SmoothScrollProvider>
              {children}
            </SmoothScrollProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

