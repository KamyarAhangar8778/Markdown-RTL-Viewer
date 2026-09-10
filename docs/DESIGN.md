# Design System

## Design Direction
Dark Glassmorphic Studio UI with high-contrast Zinc tones, floating island header, and macOS-style magnification dock controls. Supports seamless transition between Dark and Light mode.

## Typography
- **Primary Persian Font**: Vazirmatn (Variable, 100-900)
- **Code & English Font**: JetBrains Mono / Inter
- **Line Height**: 1.85 for Persian body preview text, 1.6 for control UI
- **Scale**: H1 (1.85rem / 700), H2 (1.50rem / 700), H3 (1.25rem / 600), Body (0.875rem - 1rem)
- **Measure**: 45-75 characters per line (`max-w-prose` constraint for optimal readability)

## Tokens
- **Dark Canvas**: `#000000` (Pure black with noise texture)
- **Light Canvas**: `#f8fafc` (Slate 50)
- **Dark Panels**: `rgba(10, 10, 12, 0.90)` with `border-zinc-800`
- **Light Panels**: `rgba(255, 255, 255, 0.95)` with `border-zinc-200`
- **Accent Emerald**: `#10b981` (Status & Success indicators)
- **Accent Sky/Blue**: `#0284c7` (Active line focus border)
- **Spacing Scale**: 4px / 8px / 12px / 16px / 20px / 24px / 32px / 48px / 64px

## Components
| Component | Decision | Status |
|---|---|---|
| Header | Floating glass island with brand badge and theme/language toggles | Done |
| EditorView | Glass panel with live stats pills, privacy badge, active line highlight, and text area | Done |
| PreviewView | ReactMarkdown container with LTR code badge, GFM table and code block styling | Done |
| StudioDock | Magnified floating dock bar with smooth spring transitions | Done |
| FocusModeBar | Minimalist top bar for distraction-free writing mode | Done |
| ToastNotification | Floating status banner with Undo action button for clipboard and file feedback | Done |

## UX Audit Findings
| Issue | Heuristic | Severity (0-4) | Fix | Status |
|---|---|---|---|---|
| Cold start empty state in preview | Recognition rather than recall | 3 | Add "Load Sample" button to populate rich Persian MD sample | Done |
| Destructive Clear action in dock | Error prevention & Recovery (Norman Gulf of Execution) | 3 | Add instant "Undo / بازیابی" action button to Toast banner | Done |
| Absence of instant action feedback | Visibility of system status | 2 | Integrate floating animated Toast notification bar | Done |
| Uncertainty regarding data privacy | User control & freedom / Trust | 2 | Display "100% Client-Side & Private" badge in Editor header | Done |
| Code block direction confusion | Match between system and real world | 2 | Display "Isolated LTR Code & Tables" badge in Preview header | Done |
| Performance on large files | Flexibility and efficiency | 1 | Memoize regex parsing in `markdownEngine.ts` (INP < 50ms) | Done |

## Microinteraction Inventory
| Interaction | Trigger/Rules/Feedback/Loops | Fix | Status |
|---|---|---|---|
| Copy Code Block | Click code copy icon · Copies code · Shows checkmark for 2s | Animate icon swap with checkmark | Done |
| Dock Item Hover | Mouse hover · Scales item based on distance · Shows tooltip | Magnification spring animation | Done |
| Load Sample | Click empty state sample button · Fills raw text · Shows Toast | Smooth text insertion + Toast feedback | Done |
| Clear Editor | Click dock clear · Clears text · Shows Toast with Undo action | Instant clearing + Undo restore button in Toast | Done |
