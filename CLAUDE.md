# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Runtime is **Bun** (see `bun.lock`). There is no test suite.

```bash
bun install        # install deps
bun dev            # dev server → http://localhost:3000
bun run build      # production build (also the fastest way to typecheck)
bun start          # serve production build
bun run lint       # eslint (next core-web-vitals)
```

No standalone `tsc` script — rely on `bun run build` or the editor for type errors.

## Architecture

GradientCraft is a Next.js 16 (App Router) + React 19 + Tailwind 4 tool for composing layered CSS backgrounds and exporting pure CSS. Two distinct feature surfaces share the same primitives:

1. **Collection** (`/`, landing page) — a curated library of animated gradient presets rendered as full-page previewable cards.
2. **Studio** (`/studio`) — a live layered compositor. `/templates` is a gallery of premade Studio states that deep-link into the Studio via `?template=<id>`.

### The two data/type worlds — do not conflate them

There are two separate representations of a background. Match the one the file you're editing already uses:

- **Preset gradients** (`src/data/gradients.ts`, types in `src/types/index.ts`): each `Gradient` carries a raw `css` string, a `keyframes` string, and a `style: GradientStyle` object for React rendering. Used by the Collection and `gradient-card`/`gradient-background`/`animation-controls`.
- **Studio state** (`src/types/studio.ts`): a `StudioState` of 5 independent layer configs (`baseColor`, `gradient`, `pattern`, `noise`, `animation`). Everything in `src/components/studio/**` and `src/lib/studio-css.ts` operates on this. Templates (`src/data/templates.ts`) optionally embed a full `studioState` so a template can hydrate the editor.

### Studio CSS generation (`src/lib/studio-css.ts`)

All output flows through pure functions here — there is no runtime style mutation elsewhere:

- `generateCSS(state)` → formatted CSS string for copy/export.
- `computePreviewStyle(state)` / `computeNoiseStyle(...)` → `CSSProperties` for the live preview.
- Layers stack as a `background-image` array in fixed order: **noise (top) → pattern → gradient (bottom)**, with matching `background-size` entries. Adding/reordering a layer means keeping the image list and the size list index-aligned across all builder functions (`buildGradientValue`, `buildPatternValue`/`buildPatternSize`, `buildNoiseValue`).
- Noise is an inline SVG `feTurbulence` data URI, not an asset. Patterns are pure CSS gradients.

### Animation keyframes are injected globally

Preset `@keyframes` live only as strings on each `Gradient` in `gradients.ts`. They are concatenated into `ALL_KEYFRAMES` and injected via a raw `<style>{ALL_KEYFRAMES}</style>` tag in **both** `src/app/page.tsx` and `src/app/studio/page.tsx`. An animation will silently not run if its keyframes aren't in that registry — a new animated preset must define its `keyframes` string there. `CATEGORIES` (also in `gradients.ts`) drives the Collection's category filter and must list any new `category` value.

### Dynamic-style safety

React rejects some raw CSS shorthands. When applying a `GradientStyle` (which has `background`/`animation` shorthands) to a DOM node, convert it with `safeStyle()` from `src/lib/utils.ts` — it remaps `background`→`backgroundImage` and explodes the `animation` shorthand into longhand props. Studio code sidesteps this by producing `CSSProperties` directly from `studio-css.ts`.

### Conventions

- Import alias `@/*` → `src/*`.
- New Studio layer editors go in `src/components/studio/layers/` (shared control primitives in `layers/shared.tsx`).
- Studio state is updated through the `updateLayer(layer, patch)` callback in `src/app/studio/page.tsx` — a shallow merge into one layer; use it rather than replacing the whole state object.
- TypeScript strict is on.

## Note on GEMINI.md

`GEMINI.md` is a parallel AI-context doc with overlapping guidance. Some of it is stale — e.g. its roadmap lists "add more pattern types (dots, grid)" and "add patterns to the Studio" as TODOs, but those already shipped. Trust the actual source tree over its narrative.
