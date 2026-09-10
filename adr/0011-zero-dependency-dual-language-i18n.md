# ADR 0011: Zero-Dependency Type-Safe Dual-Language (Persian/English) i18n Architecture

## Status
Accepted

## Date
2026-09-04

## Context
Complex internationalization libraries (such as `react-intl`, `next-intl`, or `i18next`) introduce substantial client bundle weight, asynchronous dictionary loading delays, potential hydration mismatches during Next.js SSR, and runtime overhead. For a focused studio application with two primary target languages (Persian `fa` and English `en`), an over-engineered i18n framework is counterproductive.

## Decision
We engineered a lightweight, compile-time verified dictionary model (`types/i18n.ts`, `constants/translations.ts`):
1. **Type-Safe Static Schema (`types/i18n.ts`):**
   - Defined strict TypeScript interfaces for all UI text, tooltips, dock actions, statistics badges, and dynamic toast notifications (including parameterized strings).
2. **Compile-Time Exhaustive Dictionary (`constants/translations.ts`):**
   - The `TRANSLATIONS` record provides complete, zero-gap coverage for both `fa` and `en` with zero missing keys. TypeScript compiler enforces exhaustive key parity across languages.
3. **Synchronous Instant Switching:**
   - Locale toggles update the `language` state synchronously within `MarkdownContext`, triggering immediate UI updates with zero asynchronous fetch requests or layout shift.
4. **Context-Aware Sample Markdown Loading:**
   - Sample document templates automatically adapt to the active locale (`SAMPLE_RTL_MARKDOWN_FA` for Persian, `SAMPLE_RTL_MARKDOWN_EN` for English).

## Consequences
- **Positive:** Zero third-party runtime dependencies and zero bundle bloat for localization.
- **Positive:** 100% type safety at build time: any missing translation key immediately fails the TypeScript build.
- **Positive:** Instantaneous language switching with zero network latency.
