# Contributing to GradientCraft

Thanks for taking the time to contribute. This project is a Next.js 16 + React 19 + Tailwind 4 tool built on the [Bun](https://bun.sh/) runtime.

## Getting set up

```bash
bun install
bun dev        # http://localhost:3000
```

## Before you open a PR

All three must pass — CI runs the same commands:

```bash
bun run lint   # eslint (next core-web-vitals)
bun test       # unit tests (bun:test)
bun run build  # production build; also the full typecheck
```

## Where things live

- **CSS generation** — every export path (CSS, Tailwind, live preview) flows through the pure functions in `src/lib/studio-css.ts`. Changes there should come with a test in `src/lib/studio-css.test.ts`.
- **Studio layer editors** — `src/components/studio/layers/`, sharing control primitives from `layers/shared.tsx`.
- **Preset gradients** — `src/data/gradients.ts`. **A new animated preset must define its `keyframes` string here** — keyframes are collected into a registry and injected globally; an animation whose keyframes are missing will silently not run.
- **Templates** — `src/data/templates.ts` (premade Studio states that deep-link via `?template=<id>`).

## Adding a gradient preset

1. Add an entry to `GRADIENTS` in `src/data/gradients.ts` with a unique `id`, a `css` string, a matching `keyframes` block, and a `style` object for React rendering.
2. Give the `@keyframes` a unique name — the registry de-dupes by name, so a reused name is silently dropped.
3. `bun run build` to confirm it typechecks.

## Commit style

Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`). Keep each commit one logical change.

## Reporting bugs / requesting features

Use the issue templates. Include the browser, and — for a rendering bug — the copied CSS output so the layer stack can be reproduced.
