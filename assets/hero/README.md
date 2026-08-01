# assets/hero

| File | Required | Purpose |
|---|---|---|
| `couple.png` | yes | The couple, cut out |
| `couple.webp` | optional | Same picture, smaller — served first when supported |
| `hero-bg.webp` | yes | The palace arch backdrop |

## couple.png — transparency required

- **Dimensions** 887 × 1512 px (current). Anything 800–1200 px wide works.
- **Aspect ratio** free. Trim the transparent margin away so the figures reach every edge; the layout bottom-aligns whatever it is given.
- **Transparency** mandatory. A cut-out on a white rectangle will show as a visible box against the ivory.
- **Format** PNG-24 with alpha. Save **`couple.webp`** alongside it at quality 92 — the page prefers the WebP and falls back to the PNG.
- **Max size** 1.5 MB for the PNG, 350 KB for the WebP.
- **Export** Keep the alpha edge slightly soft. A hard 1-px cut looks pasted on; 0.5–1 px of feather reads as photography.

> If your cut-out came from a tool that saves indexed PNGs, convert it to full RGBA first. Indexed alpha produces a white fringe in Safari.

## hero-bg.webp

- **Dimensions** 887 × 1774 px. **Aspect ratio 1:2**, portrait.
- **Format** WebP, quality 85–90. **Max size** 250 KB.
- This one file is reused as the backdrop of every section and blurred behind the card on desktop, so it is worth optimising hard.
- **Keep the middle clear.** Text sits over the centre. Detail belongs at the edges.
