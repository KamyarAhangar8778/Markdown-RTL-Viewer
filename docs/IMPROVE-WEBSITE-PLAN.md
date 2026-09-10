# Improve Website Plan

## Context
- **Target Page**: Main RTL Markdown Studio Single-Page Web Application (`/`).
- **Primary Conversion Action**: Authoring, converting, or pasting Persian/Arabic Markdown documents and previewing, copying, or downloading clean RTL files.
- **Goal**: Optimize conversion clarity, usability, visual hierarchy, typography, messaging, performance, and error resilience across all 8 improvement phases.

## Phase Status
| Phase | Skill | Status | Artifact | Date |
|---|---|---|---|---|
| 1 | cro-methodology | done | METRICS.md, WEBSITE.md, EXPERIMENTS.md | 2026-09-03 |
| 2 | ux-heuristics | done | DESIGN.md, EXPERIMENTS.md | 2026-09-03 |
| 3 | refactoring-ui | done | DESIGN.md, EXPERIMENTS.md | 2026-09-03 |
| 4 | web-typography | done | DESIGN.md, EXPERIMENTS.md | 2026-09-03 |
| 5 | storybrand-messaging | done | POSITIONING.md, EXPERIMENTS.md | 2026-09-03 |
| 6 | high-perf-browser | done | METRICS.md, WEBSITE.md, EXPERIMENTS.md | 2026-09-03 |
| 7 | made-to-stick | done | POSITIONING.md, EXPERIMENTS.md | 2026-09-03 |
| 8 | design-everyday-things | done | DESIGN.md, EXPERIMENTS.md | 2026-09-03 |

## Key Decisions
| Date | Phase | Decision | Rationale |
|---|---|---|---|
| 2026-09-03 | Phase 1 | Focus single-page app layout around 1 primary CTA path (Live Markdown -> Clean RTL Output) | Eliminates competing navigation distractions and maximizes direct conversion |
| 2026-09-03 | Phase 2 | Add Empty State "Load Sample" button & Undo for Clear action | Fixes cold-start friction and prevents accidental data loss |
| 2026-09-03 | Phase 3 | Implement Dark Glass Studio UI with high contrast Zinc hierarchy | Standardizes spacing scale and visual focal point on editor/preview panels |
| 2026-09-03 | Phase 4 | Use Vazirmatn variable font with 1.85 line-height for Persian preview | Ensures comfortable reading and prevents character crowding |
| 2026-09-03 | Phase 5 | Position app as "Privacy-first, Native RTL Markdown Editor for Persian Technical Writers" | Clarifies above-the-fold value proposition in 5 seconds |
| 2026-09-03 | Phase 6 | Enforce zero-latency in-browser local regex processing | Eliminates network roundtrips and guarantees CWV targets (LCP < 2.5s, INP < 50ms) |
| 2026-09-03 | Phase 7 | Ground value in concrete human stats ("10,000 words in <1ms", "100% Client-Side Private") | Beats abstract descriptions with memorable, tangible proofs |
| 2026-09-03 | Phase 8 | Integrate Undo toast action on document clear and explicit line highlight | Bridges Execution and Evaluation gulfs with instantaneous feedback |

## Next Actions
- [x] Integrate Undo Toast action for document clearing in `store/MarkdownContext.tsx`
- [x] Add 100% client-side privacy and isolated LTR code proof badges in Editor and Preview headers
- [x] Maintain zero external network dependencies for text processing
