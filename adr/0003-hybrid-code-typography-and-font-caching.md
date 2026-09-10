# ADR 0003: Hybrid Code Block Typography & Immutable Font Caching

## Status
Accepted

## Date
2026-09-02

## Context
In Persian technical documentation and markdown workflows, code blocks and inline code snippets regularly contain a mixture of Latin syntax/keywords and Persian comments, string literals, and variable names.
- Relying purely on a generic monospace font degrades Persian legibility, causing broken cursors and unreadable glyphs.
- Relying exclusively on a Persian font compromises Latin programming ligatures, tabular digit alignment, and monospace alignment.
- Relying on uncontrolled external CDN runtime font downloads risks Cumulative Layout Shift (CLS) and slow initial renders on restricted networks.

## Decision
1. **Immutable Next.js Font Optimization (`app/layout.tsx`):** We integrated `Vazirmatn` (Persian display and body) and `JetBrains Mono` (Latin monospace) using `@next/font/google` (`next/font/google`). Font binaries are downloaded at build time, self-hosted by the Next.js server, and served with immutable cache headers (`max-age=31536000`), completely eliminating runtime layout shifts (CLS = 0).
2. **Hybrid Font Stack Architecture (`app/globals.css`):** Configured `--font-code-hybrid` using a prioritized fallback chain:
   ```css
   font-family: var(--font-jetbrains-mono), var(--font-vazirmatn), ui-monospace, SFMono-Regular, monospace;
   ```
   This ensures Latin characters and coding symbols are rendered with pristine `JetBrains Mono` glyphs and monospace metrics, while Persian characters immediately fall back to the optimized `Vazirmatn` glyph table without breaking line heights or character kerning.

## Consequences
- **Positive:** Zero layout shift (CLS = 0) and instantaneous cached font rendering across subsequent visits.
- **Positive:** High aesthetic fidelity for code syntax highlighting combined with native readability for Persian strings and annotations.
- **Positive:** Works seamlessly in offline or air-gapped environments without external runtime CDN requests.

