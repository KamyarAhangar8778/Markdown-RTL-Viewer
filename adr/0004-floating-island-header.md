# ADR 0004: Floating Island Header Architecture

## Status
Accepted

## Date
2026-09-03

## Context
Full-width rectangular sticky headers span the entire upper edge of the viewport, creating rigid layout boundaries and consuming valuable vertical editing space. In a dedicated markdown and writing studio, users benefit from an airy, focused canvas with subtle spatial elevation and zero distraction.

## Decision
We transitioned the primary navigation and controls into a decoupled **Floating Island** capsule (`components/layout/header.tsx`):
1. **Isolated Floating Geometry:** Centered floating capsule constrained to `max-w-5xl` with `sticky top-2.5 sm:top-4` and elevated z-index (`z-40`), allowing document content to pass underneath with optical blur (`backdrop-blur-2xl`).
2. **Layered Glassmorphism Styling:** Engineered multi-layered optical depth using `bg-zinc-950/80` (dark mode) / `bg-white/80` (light mode), specular top border highlights (`border-white/10`), and subtle ambient drop shadows (`shadow-2xl shadow-black/40`).
3. **Integrated Pill Toggles:** Replaced bulky dropdowns with micro-pill toggle switches for theme switching (`components/layout/theme-toggle.tsx`) and bilingual locale switching (`components/layout/language-toggle.tsx`).
4. **Stable Non-Oscillating Mount:** Maintained static physical stability without continuous hovering/swaying motions, guaranteeing reliable click/tap targets for rapid interactions while preserving a smooth initial fade/slide entrance animation.

## Consequences
- **Positive:** Unobstructed editing viewport with an open, modern aesthetic.
- **Positive:** Perfectly responsive across mobile screens (`w-[calc(100%-1.5rem)]`) and ultra-wide displays (`max-w-5xl mx-auto`).
- **Positive:** Clear visual distinction between the fixed application shell and the scrollable content canvas.

