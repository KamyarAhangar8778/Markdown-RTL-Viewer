# ADR 0010: Deferred Reactive State & In-Memory Pipeline Optimization

## Status
Accepted

## Date
2026-09-04

## Context
When editing long documents (thousands of words, extensive tables, and multiple code fences), running document parsing, word counting, reading time estimation, and RTL table conversions synchronously on every keystroke can block the main thread and cause typing stutter.

## Decision
We implemented a prioritized concurrent state architecture in `store/MarkdownContext.tsx`:
1. **High-Priority Immediate Input (`rawMarkdown`):**
   - Textarea keystrokes immediately update `rawMarkdown`, ensuring 60fps cursor responsiveness and zero typing lag.
2. **Low-Priority Deferred Processing (`useDeferredValue`):**
   - Document processing is wrapped in React's `useDeferredValue(rawMarkdown)`.
   - The heavy transformation pipeline (`processDocument`) executes during idle frames, yielding to user typing inputs.
3. **Memoized Domain Aggregation:**
   - Results of `processDocument` (`rtlMarkdown`, `stats`) are memoized via `useMemo` based on `deferredRawMarkdown`, preventing redundant recalculations when non-text state (view mode, active modal, theme) changes.
4. **Non-Destructive Content Backup:**
   - Clearing content captures an in-memory snapshot allowing one-click instant "Undo" recovery via toast action banner.

## Consequences
- **Positive:** Smooth, instantaneous typing experience even with large documents.
- **Positive:** UI remains fully responsive during intensive markdown processing.
- **Positive:** Eliminates arbitrary `setTimeout` debounce timers in favor of native React concurrent scheduling.
