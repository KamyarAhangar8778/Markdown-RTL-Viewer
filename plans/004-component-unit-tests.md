# Plan 004: Add Unit Test Coverage for Active Line Hook & Document Engine Edge Cases

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: plans/001-active-line-position-calc.md, plans/002-markdown-title-extraction-setext.md
- **Category**: tests
- **Planned at**: commit `v0.1.0`, 2026-09-03

## Why this matters

`hooks/useActiveLinePosition.ts` and `utils/persianizer.ts` lack dedicated unit test suites covering edge cases such as multiline cursor selections, empty textareas, and boundary characters in Persian text detection.

Adding explicit unit tests for these modules locks in expected behaviors and prevents regressions during future UI refactoring.

## Current state

- Existing tests live in `tests/unit/` (`markdown-engine.test.ts`, `rtl-formatter.test.ts`, `syntax-highlighter.test.ts`).

## Commands you will need

| Purpose   | Command     | Expected on success |
|-----------|-------------|---------------------|
| Test      | `npm test`  | all pass            |

## Scope

**In scope**:
- `tests/unit/active-line-position.test.ts` (create)
- `tests/unit/persianizer.test.ts` (create)

## Steps

### Step 1: Create `tests/unit/active-line-position.test.ts`

Test line calculation logic on 1-based line indexing and fallback values when textarea is unmounted.

### Step 2: Create `tests/unit/persianizer.test.ts`

Test Persian character range detection (`\u0600-\u06FF`, `\u0750-\u077F`, `\uFB50-\uFDFF`, `\uFE70-\uFEFF`) and digit conversion helper functions.

**Verify**: `npm test` -> all tests pass including new files.

## Done criteria

- [ ] New unit test files created and passing
- [ ] `npm test` passes 100% of tests

## STOP conditions

Stop and report back if:
- JSDOM or Bun test environment fails to mock DOM refs. Use standard object mocks where appropriate.
