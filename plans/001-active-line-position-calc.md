# Plan 001: Fix Textarea Active Line Position Height & Scroll Drift

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: Check live code in `hooks/useActiveLinePosition.ts` against the excerpts below before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `v0.1.0`, 2026-09-03

## Why this matters

In `hooks/useActiveLinePosition.ts`, the line height (`lineHeight = 24`) and top padding (`paddingTop = 16`) are hardcoded constants. On long documents or when the font line-height dynamically computes to fractional pixels (e.g. 1.625 * 14px = 22.75px), the active line highlight overlay in `components/views/editor-view.tsx` progressively drifts away from the actual cursor position as the line number increases (e.g. line 40+ highlights the wrong text line).

By reading the actual `computedStyle.lineHeight` and `computedStyle.paddingTop` from the textarea element at runtime, the active line overlay accurately aligns with the cursor across all screen resolutions and zoom levels.

## Current state

- `hooks/useActiveLinePosition.ts:41-47`:
```typescript
// Use standard line-height of 24px and padding-top of 16px (p-4 in tailwind)
const lineHeight = 24;
const paddingTop = 16;
const scrollTop = textarea.scrollTop;

const lineTop = paddingTop + (lineNumber - 1) * lineHeight - scrollTop;
```

## Commands you will need

| Purpose   | Command         | Expected on success |
|-----------|-----------------|---------------------|
| Lint      | `npm run lint`  | exit 0              |
| Test      | `npm test`      | all pass            |
| Build     | `npm run build` | exit 0              |

## Scope

**In scope**:
- `hooks/useActiveLinePosition.ts`

**Out of scope**:
- `components/views/editor-view.tsx` (the consumer component layout remains untouched)

## Steps

### Step 1: Read computed line-height and padding dynamically in `useActiveLinePosition.ts`

Update `recalculateLine` in `hooks/useActiveLinePosition.ts` to parse `getComputedStyle(textarea)` for `lineHeight` and `paddingTop`, falling back to 24 and 16 if unparsed or non-numeric.

**Verify**: `npm test` -> all tests pass.

## Done criteria

- [x] `hooks/useActiveLinePosition.ts` calculates line height and top padding dynamically from computed style
- [x] `npm test` passes with zero errors
- [x] `npm run lint` passes cleanly

## STOP conditions

Stop and report back if:
- `textareaRef.current` fails to provide computed styles in JS testing environments (ensure safe fallback parsing).
