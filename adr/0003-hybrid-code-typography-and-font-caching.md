# ADR 0003: Hybrid Code Block Typography & Immutable Font Caching

## Status
Accepted

## Context
In Persian technical documentation, code blocks frequently contain a mixture of Latin syntax/keywords and Persian comments/strings. Relying solely on a generic monospace font degrades Persian legibility, while using only a Persian font compromises Latin programming ligatures and monospace aesthetics. Furthermore, runtime CDN font fetching risks network latency and layout shifts.

## Decision
1. **Immutable Font Self-Hosting & Caching (`next/font/google`):** Integrated `Vazirmatn` and `JetBrains Mono` via Next.js App Router font optimization alongside a direct CDN fallback. Font binaries are self-hosted with immutable browser cache headers (`max-age=31536000`), eliminating runtime layout shifts.
2. **Hybrid Fallback Hierarchy:** Configured code blocks with `font-family: var(--font-code-hybrid)`. The font stack prioritizes `JetBrains Mono` for Latin tokens, immediately followed by `Vazirmatn` for Persian comments and text strings before generic system monospace fallbacks (`JetBrains Mono` → `Vazirmatn` → `monospace`).

## Consequences
- Zero layout shift and instant cached font rendering across page refreshes.
- High aesthetic quality for English code syntax with native readability for Persian strings and annotations.
