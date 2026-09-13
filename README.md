# GradientCraft — CSS Background Studio

> **Live site → [www.gradientcraft.fun](https://www.gradientcraft.fun)**

[![CI](https://github.com/Nandhu125/gradient-craft/actions/workflows/ci.yml/badge.svg)](https://github.com/Nandhu125/gradient-craft/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Next.js 16](https://img.shields.io/badge/Next.js-16-black)
![TypeScript strict](https://img.shields.io/badge/TypeScript-strict-3178c6)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

A visual **CSS background composer** that lets you stack gradients, patterns, noise textures, and animations into layered backgrounds. Preview changes live, then copy production-ready CSS — or Tailwind — in one click.

### Video Demo

<p align="center">
  <video src="public/gradient-craft.mp4" width="100%" controls autoplay loop muted></video>
</p>

<p align="center">
  <img src="public/slide_1.webp" width="100%" alt="GradientCraft Studio" />
</p>

<p align="center">
  <img src="public/slide_2.webp" width="49%" alt="GradientCraft Layers" />
  <img src="public/slide_3.webp" width="49%" alt="GradientCraft Controls" />
</p>

---

## What is this?

Most CSS background tools only handle one thing — a gradient picker, a pattern generator, or a noise tool. GradientCraft Studio combines all of them into a single layered compositor. You toggle layers on/off, adjust their properties with sliders, and the studio generates one clean CSS block that stacks everything together.

| Feature | GradientCraft Studio | Single-purpose tools |
|---|---|---|
| Layered background composing | Yes | No |
| Gradient + Pattern + Noise + Animation | Yes | One at a time |
| Live preview | Yes | Varies |
| CSS **and** Tailwind export | Yes | Rare |
| Zero JS in output | Yes | Yes |

---

## Features

**5 composable layers** — each toggleable independently:

- **Base Color** — Solid background color with hex input and preset swatches
- **Gradient** — Linear, radial, conic, or mesh with custom angles, 2–6 color stops, and 25 animated presets
- **Pattern** — Dots, grids, lines, diagonals, checkerboards, crosses — adjustable size, color, and opacity
- **Noise / Grain** — SVG `feTurbulence` noise with intensity and opacity controls
- **Animation** — GPU-powered CSS keyframe animations with speed (0.25×–3×) and direction control

**Studio UX:**

- Accordion right sidebar — all layers visible, expand to edit, visibility toggle on each header
- Live preview fills the main canvas
- One-click **Copy CSS** emits stacked `background-image`, `background-size`, `background-color`, `animation`, and `@keyframes`
- One-click **Copy Tailwind** emits the arbitrary-value utility equivalent
- Raster/vector export to PNG, WebP, and SVG
- Output is pure CSS — no JavaScript, no dependencies, works anywhere

---

## Tech Stack

| | |
|---|---|
| Framework | [Next.js 16 (App Router)](https://nextjs.org/) |
| Library | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Runtime & test runner | [Bun](https://bun.sh/) |
| Language | TypeScript (strict) |

---

## Getting Started

Requires [Bun](https://bun.sh/) installed on your machine.

```bash
git clone https://github.com/Nandhu125/gradient-craft.git
cd gradient-craft
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page, or go directly to [http://localhost:3000/studio](http://localhost:3000/studio) for the editor.

```bash
bun run build   # production build (also the fastest full typecheck)
bun start       # serve the production build
bun run lint    # eslint (next core-web-vitals)
bun test        # unit tests for the CSS generation engine
```

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx            # Landing page — curated preset collection
│   ├── studio/page.tsx     # Studio editor (the tool)
│   └── templates/page.tsx  # Gallery of premade Studio states
├── components/
│   ├── studio/             # Preview + controls; layers/ holds per-layer editors
│   ├── home/               # Hero, HowItWorks, Features, About
│   ├── layout/             # Navbar, Footer
│   └── ui/                 # Logo, Icons, shared primitives
├── data/
│   ├── gradients.ts        # 25 gradient presets + keyframes registry
│   └── templates.ts        # Premade Studio states
├── lib/
│   ├── studio-css.ts       # CSS + Tailwind generation (pure functions)
│   ├── studio-css.test.ts  # Unit tests for the generation engine
│   ├── studio-export.ts    # PNG / WebP / SVG export
│   └── utils.ts            # safeStyle() and helpers
└── types/
    └── studio.ts           # StudioState, layer interfaces, defaults
```

---

## How the CSS generation works

The studio maintains a `StudioState` object with 5 layer configs. Every output path flows through pure functions in `src/lib/studio-css.ts`:

- `computePreviewStyle(state)` — a `CSSProperties` object for the live preview
- `generateCSS(state)` — a formatted CSS string for copy/export
- `generateTailwind(state)` — the arbitrary-value Tailwind equivalent

Layers stack as a `background-image` array — pattern (top) → gradient (bottom) — with an index-aligned `background-size` list. Noise is emitted separately as a static `::after` grain overlay so it never pans with an animated gradient. Animations reference `@keyframes` from the preset registry, injected once via a raw `<style>` tag.

Because these are pure functions, the engine is covered by `bun test`.

---

## Contributing

PRs are welcome — new gradient presets, pattern types, or UX improvements.

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Make your changes — `bun run lint`, `bun test`, and `bun run build` should all pass
4. Open a Pull Request

New animated presets must define a `keyframes` string in `src/data/gradients.ts` (it feeds the injected keyframe registry) and, if they introduce a new category, add it to `CATEGORIES`.

---

## License

MIT — free to use in personal and commercial projects. See [`LICENSE`](LICENSE).

---

<p align="center">Built by <a href="https://github.com/Nandhu125">Nandhu</a> · <a href="https://www.gradientcraft.fun">gradientcraft.fun</a></p>
