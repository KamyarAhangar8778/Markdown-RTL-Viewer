# ADR 0008: Zero-Backend Zero-Telemetry Client-Side Processing Architecture

## Status
Accepted

## Date
2026-09-04

## Context
Writers, developers, and translators frequently paste proprietary documentation, technical specifications, and sensitive text into markdown editors. Storing or routing document contents through external server backends introduces security risks, compliance burdens (GDPR/privacy), latency, and potential availability outages.

## Decision
We established a strict client-side-only execution architecture:
1. **100% In-Memory Parsing & Transformation:**
   - All text manipulation, Persian tokenization, table re-alignment, and reading time calculations run entirely within browser memory via `services/markdownEngine.ts`.
2. **Zero Remote Telemetry & Tracking:**
   - No analytics SDKs, keyloggers, or external tracking pings are included. User documents never leave the local browser environment.
3. **In-Memory File Import and Export (`utils/fileHelpers.ts`):**
   - File uploads use standard `FileReader.readAsText()` API in memory.
   - File exports generate in-memory `Blob` objects and trigger direct download streams via temporary `URL.createObjectURL(blob)` handles, immediately revoking URLs after dispatch.
4. **Transient Persistence Preferences:**
   - Only non-sensitive user UI preferences (selected theme and active locale) persist via browser storage. Document text is stored in ephemeral React Context memory.

## Consequences
- **Positive:** Total confidentiality and privacy: Sensitive enterprise documentation can be converted securely even on corporate intranets.
- **Positive:** 100% offline capability: Works without an active internet connection once initial static assets are loaded.
- **Positive:** Zero server operating costs and zero backend scaling bottlenecks.
- **Trade-off:** Documents are not synchronized across devices by default (which aligns with the tool's pure utility model).
