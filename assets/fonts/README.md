# assets/fonts

Deliberately empty. The four families load from Google Fonts via the `<link>` in `index.html`:

| Family | Used for |
|---|---|
| **Cinzel** | Section headings, buttons |
| **Cormorant Garamond** | The groom's name, the joiner |
| **Great Vibes** | The bride's name, quotes, footer |
| **Poppins** | Body text, labels |

## Self-hosting

Worth doing if the invitation must work offline, or if you want to drop the third-party request for a perfect privacy audit.

1. Download the four families (woff2 only — every browser in use supports it).
2. Put them here.
3. Delete the Google Fonts `<link>` from `index.html`.
4. Add `@font-face` blocks to `style.css` with **`font-display: swap`**.

`swap` is not optional. Without it the names stay invisible until the fonts arrive, which is exactly the flash the design is built to avoid.

Subsetting to Latin alone typically saves 60–70% and is safe unless you plan to add Kannada, Telugu or Devanagari text.
