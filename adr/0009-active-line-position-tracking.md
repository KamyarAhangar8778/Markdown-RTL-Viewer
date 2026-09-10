# ADR 0009: Non-Blocking Real-Time Active Line Position Tracking

## Status
Accepted

## Date
2026-09-04

## Context
Displaying a visual indicator on the currently active line in the markdown editor helps users maintain focus during intensive writing. However, querying DOM geometry (`window.getComputedStyle`, `element.getBoundingClientRect()`) on every keystroke or cursor movement triggers browser layout thrashing and noticeable input latency.

## Decision
We engineered an optimized cursor line tracking pipeline (`hooks/useActiveLinePosition.ts`, `components/views/editor-active-line.tsx`):
1. **Cached Style Metrics:**
   - Font metrics (`lineHeight` and `paddingTop`) are measured and cached once during initial component mount or viewport resize events, eliminating `getComputedStyle` calls during typing.
2. **Pure Mathematical Calculation (`calculateActiveLinePosition`):**
   - The active line number is derived in $O(k)$ time by slicing the text up to `textarea.selectionStart` and counting newline characters (`\n`).
   - The vertical offset is computed purely mathematically:
     $$\text{lineTop} = \text{paddingTop} + (\text{lineNumber} - 1) \times \text{lineHeight} - \text{scrollTop}$$
3. **Decoupled Visual Overlay:**
   - The indicator is rendered as an absolutely positioned, non-interactive overlay (`pointer-events-none`) behind the text, animated via smooth vertical translation rather than re-rendering the entire editor DOM tree.

## Consequences
- **Positive:** Zero keystroke latency and zero forced reflows during fast typing.
- **Positive:** Accurate line tracking across scrolling, cursor jumping, and multi-line pastes.
- **Positive:** Easily unit-tested via the pure `calculateActiveLinePosition` function (`tests/unit/active-line-position.test.ts`).
