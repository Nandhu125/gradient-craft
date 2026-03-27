# GradientCraft - AI Context & Development Guide

## Project Overview
GradientCraft is a high-performance interactive web application for generating, previewing, and customizing animated CSS backgrounds. It is designed to provide production-ready backgrounds that run at 60FPS using pure CSS keyframes, ensuring zero JavaScript overhead on the animation thread.

### Main Features
- **Curated Collection:** A library of animated gradients categorized into Aurora, Warm, Cool, Neon, Pastel, and Shimmer.
- **Full-Page Preview:** Live preview of any gradient as the actual page background.
- **Animation Controls:** Real-time adjustment of speed, direction, timing functions, and play/pause state.
- **Gradient Studio:** A specialized editor for creating custom multi-layer backgrounds involving base colors, gradients, patterns, and noise.
- **One-Click Export:** Copy complete CSS (including `@keyframes`) for use in any web project.

---

## Tech Stack
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Runtime:** [Bun](https://bun.sh/)
- **Language:** TypeScript (Strict)
- **Deployment:** Vercel (inferred from `package.json` analytics)

---

## Project Structure
```text
src/
├── app/               # Next.js App Router routes & layouts
│   ├── studio/        # Gradient Studio editor page
│   └── globals.css    # Global styles & Tailwind configuration
├── components/        # Component library
│   ├── gradients/     # Gradient card, collection, and animation controls
│   ├── studio/        # Studio-specific panels (preview, controls, layers)
│   ├── layout/        # Shared layout elements (Navbar, Footer)
│   └── ui/            # Reusable UI primitives (Icons, Logo, Buttons)
├── data/              # Static data & registry
│   └── gradients.ts   # Centralized gradient definitions & keyframes
├── lib/               # Utilities & helper functions
│   ├── studio-css.ts  # Logic for generating CSS from Studio state
│   └── utils.ts       # Shared utility functions (styling, etc.)
└── types/             # TypeScript definitions
    ├── index.ts       # Main gradient and animation types
    └── studio.ts      # Studio-specific state and layer types
```

---

## Development Workflow

### Key Commands
- **Install Dependencies:** `bun install`
- **Start Dev Server:** `bun dev`
- **Build for Production:** `bun run build`
- **Start Production Server:** `bun start`
- **Linting:** `bun run lint`

### Development Conventions
- **Styling:** Use Tailwind CSS 4. Custom theme variables and complex animations are defined in `src/app/globals.css`.
- **Dynamic Styles:** Use the `safeStyle` utility from `@/lib/utils` when applying dynamic backgrounds and animations in React to ensure property compatibility.
- **Keyframes:** All gradient-specific `@keyframes` must be registered in `src/data/gradients.ts` and are injected globally via the `ALL_KEYFRAMES` constant in the root layouts.
- **Performance:** Prioritize CSS-only animations. Avoid using JavaScript for animation loops or frame-by-frame updates.
- **Studio State:** The Studio uses a centralized `StudioState` defined in `@/types/studio.ts`. Changes to layers should be handled via the `updateLayer` pattern found in `src/app/studio/page.tsx`.

### Adding a New Gradient
1. Define the gradient object in `src/data/gradients.ts`.
2. Include `id`, `name`, `category`, `tags`, `css` string, `keyframes` string, and a `style` object.
3. The gradient will automatically appear in the collection and categories.

---

## Future Roadmap (TODOs)
- [ ] Implement user accounts for saving custom gradients.
- [ ] Add more pattern types (dots, grid, etc.) to the Studio.
- [ ] Expand the collection with community-contributed gradients.
- [ ] Add SVG export for static variants.
