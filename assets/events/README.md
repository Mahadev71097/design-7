# assets/events

Line-art icons for the six functions: `mehendi`, `haldi`, `sangeet`, `wedding`, `reception`, `vidai`.

These files are the **editable masters**. The versions the page actually renders are mirrored into the SVG sprite at the top of `index.html`.

## Why the duplication

An SVG loaded through `<img>` cannot inherit `currentColor` — it would render black instead of champagne gold, and would ignore any theme change. Inlining also removes six network requests.

## Adding an icon

1. Draw it on a **64 × 64** canvas, strokes only, no fills, `stroke-width="1.6"`.
2. Set `stroke="currentColor"` so it picks up the gold.
3. Save it here as `<name>.svg`.
4. Copy its contents into `index.html` inside `<defs>` as `<g id="ev-<name>">…</g>`.
5. Reference it from `config.js`: `{ icon: '<name>', … }`.

Step 4 is optional. Skip it and the page falls back to loading the file — it will just render in a flat colour rather than following the theme.

Keep them geometric and open. At 46 px on a phone, fine interior detail turns to mud.
