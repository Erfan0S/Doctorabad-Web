This project uses Tailwind CSS. We are migrating from SCSS modules to Tailwind (branch: feat/tailwind-migration).

Rules:

- Use the shared preset from `packages/tailwind-config` (`@repo/tailwind-config`); do not hardcode theme values per app.
- Any style used by more than one element must become a custom class in `packages/tailwind-config/components.css` (under `@layer components`) and be reused.
- One-off styles use inline Tailwind utilities.
- The site is RTL: always use logical utilities (ms-*, me-*, ps-*, pe-*, start-*, end-*) — never ml/mr/pl/pr/left/right.
- Visual parity is required: converted components must look and behave exactly like their SCSS versions (hover/focus states, breakpoints, RTL).
- Keep the old `.module.scss` file until the conversion is verified; delete it in a follow-up commit.
- Tailwind preflight stays OFF until every app is migrated (general.scss provides the global reset).
