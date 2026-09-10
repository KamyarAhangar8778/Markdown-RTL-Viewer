# Product

## Vision
To provide the premier distraction-free, privacy-first studio environment for creating, editing, and previewing mixed RTL/LTR Markdown documentation for Persian and Arabic creators.

## MVP Definition
Single-screen React SPA featuring dual split view, live GFM rendering, active line focus tracking, upload/paste/download file operations, and a magnification dock toolbar.

## Outcome Roadmap
| Outcome / problem | Job served | Priority | Status |
|---|---|---|---|
| Auto RTL-formatting for Persian text with LTR code isolation | Mixed Persian/English doc drafting | P0 | Done |
| Live document stats (Lines, Words, Chars, Read Time) | Writing progress monitoring | P1 | Done |
| Single-click RTL Sample Template Loader | Instant onboarding & capability demo | P1 | Done |
| Toast notification system for clipboard feedback | Action confirmation | P1 | Done |
| Focus Mode with smooth layout animations | Distraction-free longform writing | P2 | Done |

## Opportunity Solution Tree Notes
- **User Pain**: "I don't know how RTL Markdown looks until I test it."
  - **Solution**: Provide a one-click "Load Sample RTL Markdown" template button directly in the empty preview canvas.

## Hook Model
- **Trigger**: Need to draft Persian technical documentation or README.
- **Action**: Open RTL Markdown Studio and start typing or load sample.
- **Variable Reward**: Instant, perfectly rendered preview with preserved code syntax.
- **Investment**: Download formatted .md file or copy clean text into project.

## Activation & Retention Plan
| Friction / moment | Fix | Owner | Status |
|---|---|---|---|
| Empty screen on first visit | Add "Load RTL Sample" quick button | Frontend | Done |
| Lack of feedback when copying or clearing | Add animated Toast notification feedback | Frontend | Done |
| Mobile view screen overcrowding | Responsive split/single view modes | Frontend | Done |

## Discovery Cadence
Continuous audit of Persian developer documentation needs and GFM markdown compatibility.
