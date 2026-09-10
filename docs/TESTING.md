# Testing Strategy & Safety Net Map

This document defines the test automation strategy and characterization test coverage for **RTL Markdown Studio**.

---

## Test Strategy

- **Test Runner:** Bun / Vitest (`npm test`)
- **Execution Mode:** Headless, fast in-memory execution (< 500ms for full suite)
- **Coverage Goal:** 100% coverage of core Markdown transformation logic, table alignment, syntax highlighting, and statistical calculations.

---

## Safety Net Map

| Module | Pinned Behaviors | Test Files | Status & Gaps |
|---|---|---|---|
| `services/markdownEngine.ts` | Unified document processing, empty text handling, custom options, export bundle creation | `tests/unit/markdown-engine.test.ts` | **Fully Pinned** (0 gaps) |
| `utils/rtlConverter.ts` | RTL table alignment, code fence preservation, Persian character checks | `tests/unit/rtl-formatter.test.ts` | **Fully Pinned** (0 gaps) |
| `utils/syntaxHighlighter.ts` | Language alias normalization, JS/Python code highlighting, unknown language fallbacks | `tests/unit/syntax-highlighter.test.ts` | **Fully Pinned** (0 gaps) |
| `integration/markdown-converter` | End-to-end processing pipeline, stats calculation, empty document handling | `tests/integration/markdown-converter.test.ts` | **Fully Pinned** (0 gaps) |

---

## Characterization Backlog

- [x] Characterize table header divider alignment (`|---|---|` to `---:`).
- [x] Characterize fenced code block isolation (` ``` ` and `~~~`).
- [x] Characterize reading time estimation with Persian/Arabic WPM metrics.
- [x] Characterize export bundle filename sanitization with Unicode Persian characters.
