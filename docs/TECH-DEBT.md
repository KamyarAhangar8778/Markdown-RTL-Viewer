# Technical Debt Ledger & Quality Standards

This document tracks identified technical debt, code smells, adopted conventions, and maintenance policies for **RTL Markdown Studio**.

---

## Debt Ledger

| Item ID | Location | Type | Risk | Effort | Priority | Status |
|---|---|---|---|---|---|---|
| **TD-001** | `components/motion/theme-toggle.tsx` | File Size (248 lines) | Low | Low | P3 | **Mitigated** (Well structured under 250 lines) |
| **TD-002** | `components/ui/markdown-table.tsx` | File Size (242 lines) | Low | Low | P3 | **Mitigated** (Clean single-responsibility component) |
| **TD-003** | `store/MarkdownContext.tsx` | State Management | Low | Medium | P2 | **Resolved** (Memoized context values & isolated handlers) |

---

## Sprout / Wrap Register

*No sprouted or wrapped temporary shims present. All core functions are natively implemented and covered by unit tests.*

---

## Smell Inventory

| Smell Name | Affected Location | Applied Refactoring | Current Status |
|---|---|---|---|
| **Magic Numbers** | `utils/statsCalculator.ts` | Replaced 180 WPM magic number with documented constant | **Fixed** |
| **Duplicate Regex** | `services/markdownEngine.ts` | Centralized code fence regex detection pattern | **Fixed** |
| **Contextless Catch** | `utils/syntaxHighlighter.ts` | Added explicit safe text fallbacks on syntax error | **Fixed** |

---

## Adopted Conventions

1. **File Line Cap:** Maximum line count per file target is 200–300 lines to preserve single responsibility and maintainability.
2. **Standard Documentation:** Every exported function, interface, and hook must include standardized JSDoc comments explaining parameters, return types, and purpose.
3. **Immutability:** State objects and processed document outputs are returned as `readonly` immutable structures.
4. **Zero Untracked Hacks:** No inline `// TODO` or `// FIXME` comments allowed without an associated issue or Debt Ledger entry.

---

## Debt Budget & Broken-Windows Policy

- **Debt Allocation:** 15% of developer effort per milestone allocated to refactoring and structural cleanup.
- **Broken Windows:** Any failing test, broken lint rule, or unhandled exception must be fixed immediately prior to committing new features.
