# ADR 0001: RTL Markdown Transformation & Rendering Architecture

## Status
Accepted

## Context
Standard Markdown parsers default to Left-To-Right (LTR) block rendering, which distorts RTL languages such as Persian and Arabic (misaligning bullet points, punctuation, headings, and table columns).

## Decision
We adopted a dual-layer RTL approach:
1. **Source Transformation Layer (`utils/rtlConverter.ts`):** Converts markdown strings into RTL structure by applying table column right-alignment, optional Persian digit transformation, and container wrapping.
2. **CSS & Typography Layer (`app/globals.css`):** Employs Vazirmatn web font, `dir="rtl"`, and custom CSS overrides for headers, lists, blockquotes, and tables, while enforcing `dir="ltr"` for code blocks.

## Consequences
- Fast client-side performance without external API latency.
- Full privacy with zero data persistence on external servers.
