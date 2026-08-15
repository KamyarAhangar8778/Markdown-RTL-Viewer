/**
 * @file styles/theme.ts
 * @description Central design system constants for modern dark glass styling with high contrast.
 */

export const THEME_CONFIG = {
  colors: {
    bgDark: '#000000',
    bgCard: '#0d0d10',
    panelBg: 'rgba(12, 12, 15, 0.85)',
    panelBgSolid: '#0d0d10',
    cardBg: 'rgba(20, 20, 24, 0.7)',
    borderSubtle: 'rgba(255, 255, 255, 0.08)',
    borderGlowing: 'rgba(255, 255, 255, 0.2)',
    accentPrimary: '#f4f4f5', // Zinc 100
    accentSecondary: '#a1a1aa', // Zinc 400
    accentEmerald: '#10b981', // Emerald accent
    accentGlow: 'rgba(255, 255, 255, 0.1)',
    textPrimary: '#fafafa',
    textSecondary: '#a1a1aa',
    textMuted: '#71717a',
  },
  effects: {
    glassBlur: 'backdrop-blur-xl',
    noiseOpacity: '0.02',
    transitionSmooth: 'transition-all duration-200 ease-in-out',
    shadowGlow: '0 8px 30px 0 rgba(0, 0, 0, 0.8)',
  },
  typography: {
    fontFamily: 'var(--font-vazir)',
  },
};

