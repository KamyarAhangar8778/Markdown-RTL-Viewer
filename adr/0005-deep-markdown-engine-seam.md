# ADR 0005: Deep Markdown Domain Module & In-Process Engine Seam

## Status
Accepted

## Date
2026-09-03

## Context
Prior to this decision, Markdown transformation, document metrics calculation, heading extraction, and export preparation were fragmented across multiple shallow utility functions (`rtlConverter.ts`, `statsCalculator.ts`, `persianizer.ts`, and `fileHelpers.ts`). Callers in the UI and React Context had to manually orchestrate multi-step operations and mix browser-specific DOM side-effects (`Blob`, `URL.createObjectURL`, `document.createElement('a')`) with pure document calculations.

## Decision
In accordance with John Ousterhout's Deep Module Principle and the codebase design guidelines:
1. **Unified Deep Interface (`services/markdownEngine.ts`):** We created a centralized domain module exposing two cohesive, high-leverage entry points:
   - `processDocument(rawText: string, options?: ProcessDocumentOptions): ProcessedDocument`: Encapsulates RTL table transformations, code-block protection, Persian character tokenization, reading speed calculations, and document title extraction (supporting both ATX `# Title` and Setext `Title\n===` formats) behind a single seam.
   - `prepareExportBundle(markdown: string, customTitle?: string): ExportBundle`: Pure in-process serialization that generates sanitized filenames, MIME configurations, and content payloads without DOM coupling.
2. **Seam Placement & Dependency Discipline:**
   - Text parsing, AST manipulation, and analytics are strictly in-process, pure functions with zero React or browser globals dependency.
   - Browser DOM operations (`downloadFile`, `readTextFile`) remain segregated inside `utils/fileHelpers.ts` as thin platform adapters.
3. **The Interface is the Test Surface:** Unit tests directly exercise the deep module interface (`tests/unit/markdown-engine.test.ts`), verifying end-to-end domain behavior and observable outcomes.

## Consequences
- **Positive:** High caller leverage: React Context, Hooks, and Components interact with a single cohesive interface rather than stitching shallow utilities together.
- **Positive:** Maximum domain purity: The engine can run unchanged across Node.js, CLI scripts, serverless runtimes, or Web Workers.
- **Positive:** Fast test execution: Testing requires no mock browser DOM or global state.

