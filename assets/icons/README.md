# assets/icons

Deliberately empty.

Every interface icon — heart, pin, camera, play, pause, Instagram, WhatsApp, phone, close, arrows, copy, tick — lives in the inline `<svg>` sprite at the top of `index.html`.

Two reasons. An SVG loaded through `<img>` cannot inherit `currentColor`, so it would render black rather than gold and would not follow a theme change. And inlining removes roughly a dozen network requests from a page whose whole point is to load fast on a phone at a wedding venue.

To add one: drop a `<g id="i-yourname">…</g>` into that `<defs>` block and reference it with `<use href="#i-yourname"/>`.

This folder is kept so the structure stays predictable if you later want file-based icons.
