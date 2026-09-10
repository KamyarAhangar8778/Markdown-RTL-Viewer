# Improve App Plan

## Context
- **App Name**: RTL Markdown Studio
- **Date Started**: 2026-09-03
- **Primary Job**: Fast, private, real-time RTL Markdown editing and rendering without LTR code block distortion or mixed-direction formatting glitches.
- **Platforms**: Web (Desktop & Mobile)

## Phase Status
| Phase | Skill | Status | Artifact | Date |
|---|---|---|---|---|
| 1 | jobs-to-be-done | done | CUSTOMER.md | 2026-09-03 |
| 2 | ux-heuristics | done | DESIGN.md, EXPERIMENTS.md | 2026-09-03 |
| 3 | design-everyday-things | done | DESIGN.md, EXPERIMENTS.md | 2026-09-03 |
| 4 | refactoring-ui | done | DESIGN.md, EXPERIMENTS.md | 2026-09-03 |
| 5 | microinteractions | done | DESIGN.md, EXPERIMENTS.md | 2026-09-03 |
| 6 | made-to-stick | done | POSITIONING.md, EXPERIMENTS.md | 2026-09-03 |
| 7 | influence-psychology | skipped: no in-app upsell or paywall | POSITIONING.md, EXPERIMENTS.md | 2026-09-03 |
| 8 | high-perf-browser | done | DESIGN.md, EXPERIMENTS.md | 2026-09-03 |
| 9 | steve-jobs-design-review | done | PRODUCT.md, DESIGN.md, EXPERIMENTS.md | 2026-09-03 |

Statuses: pending · in-progress · awaiting-evidence · done · deferred: <reason> · skipped: <reason>

## Key Decisions
| Date | Phase | Decision | Rationale |
|---|---|---|---|
| 2026-09-03 | 1 | Re-anchor on RTL/LTR mixed editing job | Client-side engine ensures privacy and zero network delay |
| 2026-09-03 | 2 | Add Sample Loader to Empty Preview/Editor State | Reduces cold-start friction and immediately demonstrates capabilities |
| 2026-09-03 | 3 | Add Undo Toast & Clear Guardrails | Prevents accidental data loss when clicking clear |
| 2026-09-03 | 4 | Elevate Glassmorphic Zinc Token System | Improves contrast in both Light and Dark modes according to WCAG AA |
| 2026-09-03 | 5 | Add Toast Notification feedback engine | Provides immediate (<100ms) confirmation on user actions |
| 2026-09-03 | 6 | Concrete Persian/English UX Copy | Replaces generic placeholder copy with actionable guidance |
| 2026-09-03 | 8 | Client-side O(n) Markdown processing | INP < 50ms, LCP < 0.5s for zero-latency writing experience |
| 2026-09-03 | 9 | Preserve sleek single-screen studio layout | Avoids feature bloat while maximizing editing real estate |

## Next Actions
- [x] Add "Load RTL Sample" button to empty editor/preview states
- [x] Integrate Toast notification component and state
- [x] Ensure standard JSDoc comments across all complex functions
- [x] Maintain strict file size boundaries (<200-300 lines) and single responsibility
- [x] Run linting and build validation checks
