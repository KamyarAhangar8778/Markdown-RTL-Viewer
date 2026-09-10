# Plan 003: Add Unified Verification Command (`npm run check`) in Package Manifest

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `v0.1.0`, 2026-09-03

## Why this matters

The developer experience currently lacks a single one-command verification pipeline to run typechecking, linting, and testing in sequence. Adding a `"check"` script (`tsc --noEmit && npm run lint && npm test`) to `package.json` provides a single command for CI/CD and developer verification.

## Current state

- `package.json:5-12`:
```json
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "bun test",
    "clean": "next clean"
  },
```

## Commands you will need

| Purpose   | Command         | Expected on success |
|-----------|-----------------|---------------------|
| Check     | `npm run check` | exit 0              |

## Scope

**In scope**:
- `package.json`

## Steps

### Step 1: Add `"check"` and `"typecheck"` scripts to `package.json`

Add:
`"typecheck": "tsc --noEmit"`
`"check": "npm run typecheck && npm run lint && npm test"`

**Verify**: `npm run check` -> runs typecheck, lint, and tests, exiting 0.

## Done criteria

- [ ] `npm run check` is available and runs typecheck, lint, and test sequentially
- [ ] `npm run check` exits 0 with no errors

## STOP conditions

Stop and report back if:
- `tsc --noEmit` fails on missing ambient types.
