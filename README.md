# Mahadeva & Yashaswini — wedding invitation

A single-page invitation. Open `index.html` in a browser, or upload the whole
folder to any static host (Netlify, Vercel, GitHub Pages, cPanel).

## Changing anything

Open **`config.js`**. That is the only file you need to touch.

| What | Where in config.js |
|---|---|
| Names | `couple.groom`, `couple.bride` |
| Wedding date & countdown | `date.iso` — one value drives both |
| The six functions | `events[]` |
| Photographs | `gallery[]` |
| Venue, address, map link | `location` |
| Blessing quote | `blessings` |
| Music, Instagram, WhatsApp, phone | `footer` |
| Ivory and gold | `theme` |

### Swapping photographs
Drop new files into `assets/gallery/` and list them in `gallery[]`. The `span`
value sets each picture's footprint in the collage — `tall`, `wide`, `box` or
`pano`. The layout re-flows on its own; keep one `pano` on an even boundary and
it packs without gaps.

### Adding a function
Add an entry to `events[]`. The `icon` name matches either a shape in the
sprite at the top of `index.html` (`mehendi`, `haldi`, `sangeet`, `wedding`,
`reception`, `vidai`) or a file at `assets/events/<name>.svg`.

## Please note

`date.iso` is currently **27 Nov 2026**, matching the Date Reveal artwork.
The events list puts the *wedding* on **Sun 29 Nov 2026**. If the 29th is the
ceremony, change that one line and the card and countdown both follow.

## How it is built

Plain HTML, CSS and JavaScript. GSAP + ScrollTrigger for choreography,
SplitType for the letter-by-letter reveals, Lenis for smooth wheel scrolling —
all from CDN. No build step, no framework, no bundler.

If the CDN is unreachable, or the visitor has "reduce motion" switched on, the
invitation renders in full without animation. It is never blank.
