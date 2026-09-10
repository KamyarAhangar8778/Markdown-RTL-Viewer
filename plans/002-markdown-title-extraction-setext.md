# Plan 002: Extend Markdown Title Extraction to Support Setext Headings

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: Check live code in `services/markdownEngine.ts` against the excerpts below before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `v0.1.0`, 2026-09-03

## Why this matters

`services/markdownEngine.ts` currently extracts document titles using `extractDocumentTitle(text)`, which only checks for ATX-style headings (`# Document Title`). Standard Markdown also permits Setext-style Level-1 headings (`Document Title\n===`). When exporting documents or displaying titles for Setext-formatted Markdown files, `extractDocumentTitle` returns an empty string and defaults the filename to `rtl-document.md`.

Adding Setext h1 detection ensures consistent document title extraction regardless of heading style convention.

## Current state

- `services/markdownEngine.ts:119-138`:
```typescript
function extractDocumentTitle(text: string): string {
  if (!text) return '';
  const lines = text.split('\n');
  let inCode = false;

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      inCode = !inCode;
      continue;
    }
    if (!inCode) {
      const match = line.match(/^#\s+(.+)$/);
      if (match) {
        return match[1].trim();
      }
    }
  }

  return '';
}
```

## Commands you will need

| Purpose   | Command         | Expected on success |
|-----------|-----------------|---------------------|
| Lint      | `npm run lint`  | exit 0              |
| Test      | `npm test`      | all pass            |
| Build     | `npm run build` | exit 0              |

## Scope

**In scope**:
- `services/markdownEngine.ts`
- `tests/unit/markdown-engine.test.ts`

**Out of scope**:
- Table formatting and RTL conversion logic

## Steps

### Step 1: Update `extractDocumentTitle` in `services/markdownEngine.ts`

Enhance `extractDocumentTitle` to detect both ATX (`# Title`) and Setext Level 1 (`Title\n===`) headings outside fenced code blocks.

### Step 2: Add unit test in `tests/unit/markdown-engine.test.ts`

Add a test case verifying Setext heading extraction and export filename generation.

**Verify**: `npm test` -> all tests pass.

## Done criteria

- [ ] Setext-style h1 headings (`Title\n===`) are properly recognized by `extractDocumentTitle`
- [ ] Export bundles built from Setext heading documents generate correct filenames
- [ ] `npm test` passes with zero failures
- [ ] `npm run lint` passes cleanly

## STOP conditions

Stop and report back if:
- Setext detection triggers on code block divider lines or horizontal rules (`---`). Ensure the preceding line is non-empty text.
