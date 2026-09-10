# Website

## Sitemap
- `/` (Main Single-Page Workspace): Interactive RTL Markdown Editor, Live Preview, Floating Island Header, and Magnification Studio Dock.

## Page Briefs
### / (home)
- **Purpose & primary conversion action**: Immediate authoring or pasting of Persian/Arabic Markdown with real-time RTL rendering and zero-friction export/copying.
- **Message (from POSITIONING.md)**: "RTL Markdown Studio — Fast, native RTL Markdown Editor for Persian & Arabic documentation."
- **CTA (direct + transitional)**:
  - *Direct*: Paste / Download `.md` / Copy Markdown
  - *Transitional*: "Load Sample Markdown" (Instant demonstration)
- **Copy blocks**:
  - Editor toolbar with live statistics pills (Lines, Words, Chars).
  - Client-side privacy badge ("100% Client-Side & Private").
  - Preview toolbar with LTR code fence preservation badge ("Isolated LTR Code & Tables").

## Conversion Elements
| Objection (Big 5) | Counter | Placement | Status |
|---|---|---|---|
| **Trust / Privacy** | 100% Client-Side local processing with zero server uploads | Editor Header Badge & POSITIONING.md | Active |
| **Effort / Complexity** | One-click "Load Sample" button for instant preview without typing | Empty State Preview & Editor | Active |
| **Fit / Code Distortion** | Code fences (```) and HTML tables are preserved 100% in LTR orientation | Preview Header Badge & `markdownEngine.ts` | Active |
| **Price** | Completely free and open-source in-browser utility | Header Brand Subtitle | Active |
| **Timing / Friction** | Zero load/process delay (<1ms real-time update) | Studio Dock & Live Metrics | Active |

## Audit Findings
| Issue | Severity (0-4) | Fix | Status |
|---|---|---|---|
| Cold start empty state in preview | 3 | Add "Load Sample Markdown" action button in empty state | Fixed |
| Accidental document clearing | 3 | Add Undo action button to Toast notification banner | Fixed |
| Lack of visual privacy guarantee | 2 | Display "100% Client-Side & Private" badge in Editor header | Fixed |
| Code block direction confusion | 2 | Display "Isolated LTR Code & Tables" badge in Preview header | Fixed |

## Lead Capture
- In-app interactive workflow: direct conversion without registration barrier.
