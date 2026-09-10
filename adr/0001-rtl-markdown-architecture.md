# ADR 0001: RTL Markdown Transformation & Dual-Layer Rendering Architecture

## Status
Accepted

## Date
2026-09-01

## Context
Standard CommonMark and GitHub Flavored Markdown (GFM) parsers assume a Left-to-Right (LTR) reading flow by default. When rendering Right-to-Left (RTL) languages such as Persian and Arabic:
- Punctuation marks (periods, exclamation marks, question marks) drift to the wrong edge of sentences.
- Ordered and unordered lists indent from the left side with misaligned bullet markers.
- Table headers and column alignments invert or format unpredictably.
- Embedded English technical terms and programming code blocks risk being corrupted if an indiscriminate global RTL direction is applied.

## Decision
We adopted a dual-layer architectural pipeline separating source-level AST transformations from presentation-layer styling:
1. **Source Transformation Layer (`services/markdownEngine.ts`, `utils/rtlConverter.ts`):** Pre-processes markdown strings before parsing by normalizing markdown table column alignments (`:---` to `---:`) and extracting structured document metadata without modifying code block internals.
2. **Code & Syntax Isolation Layer (`utils/syntaxHighlighter.ts`, `components/ui/code-block.tsx`):** Strictly enforces `dir="ltr"` and `text-left` on all multi-line code fences and inline backtick tokens, ensuring Latin syntax and programming keywords remain untampered.
3. **Typography & Layout Styling (`app/globals.css`, `components/views/preview-view.tsx`):** Applies the `Vazirmatn` font family, native CSS logical properties (`margin-inline-start`, `padding-inline`), and custom prose overrides for headers, blockquotes, callouts, and lists under `dir="rtl"`.
4. **Persian Digit & Character Tokenization (`utils/persianizer.ts`):** Provides optional, isolated digit conversion and Persian character normalization that skips protected code fences and URL schemes.

## Consequences
- **Positive:** Sub-millisecond client-side transformation with zero network latency.
- **Positive:** Preserves 100% syntactic correctness of programming code blocks and embedded English technical terms.
- **Positive:** Clean, native reading experience for Persian and Arabic documentation writers.
- **Trade-off:** Requires a pre-parsing scan step before passing content to `react-markdown`, which is kept at $O(n)$ linear complexity.

