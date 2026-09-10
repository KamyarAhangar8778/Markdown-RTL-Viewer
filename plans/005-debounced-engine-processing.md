# Plan 005: Optimize Markdown Engine Input Processing with Input Guarding

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: plans/002-markdown-title-extraction-setext.md
- **Category**: perf
- **Planned at**: commit `v0.1.0`, 2026-09-03

## Why this matters

`services/markdownEngine.ts` processes raw text on every render. For small to medium documents this is fast (<1ms), but when text exceeds 5,000 characters with multiple markdown tables, table re-alignment regex operations on every single character insertion can cause micro-jank on lower-end devices.

Short-circuiting table re-alignment when raw text does not contain pipe symbols (`|`) skips unnecessary regex iterations completely for typical prose documents.

## Current state

- `services/markdownEngine.ts:63-65`:
```typescript
  // 1. Transform syntax (RTL table alignment while preserving code blocks)
  const shouldAlignTables = options?.alignTablesRtl ?? true;
  const rtlMarkdown = shouldAlignTables ? convertToRtlMarkdown(safeText) : safeText;
```

## Commands you will need

| Purpose   | Command         | Expected on success |
|-----------|-----------------|---------------------|
| Lint      | `npm run lint`  | exit 0              |
| Test      | `npm test`      | all pass            |
| Build     | `npm run build` | exit 0              |

## Scope

**In scope**:
- `utils/rtlConverter.ts`

## Steps

### Step 1: Add quick character guard in `convertToRtlMarkdown`

In `utils/rtlConverter.ts`: if `!markdown.includes('|')`, return `markdown` immediately without line splitting or regex iteration.

**Verify**: `npm test` -> all tests pass.

## Done criteria

- [ ] `convertToRtlMarkdown` returns immediately when no table pipe characters exist
- [ ] Table formatting still works identically when pipes are present
- [ ] `npm test` passes 100%

## STOP conditions

Stop and report back if:
- Any markdown syntax other than tables relies on `convertToRtlMarkdown`. (Only tables use it).
