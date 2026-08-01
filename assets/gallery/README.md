# assets/gallery

Numbered files — `01.webp`, `02.webp`, `03.webp` … in the order you want them shown.

- **Format** WebP, quality 88–92. JPEG works but costs roughly 30% more bytes.
- **Long edge** 1200–1600 px. The mosaic never shows a picture wider than about 600 px, and the fullscreen viewer allows 5× zoom, so beyond 1600 px you are paying for pixels nobody sees.
- **Max size** 250 KB each. Aim for under 2 MB across the whole set.
- **Aspect ratio** whatever you like — genuinely. The mosaic is a column flow that packs tiles by their true height, so portraits, squares and letterboxes all sit together without leaving holes.
- **Transparency** not needed.

## Listing them

Add each one to `gallery[]` in `config.js`:

```js
{ src: 'assets/gallery/08.webp', alt: 'Description', w: 1200, h: 800 }
```

**`w` and `h` must be the file's real pixel dimensions.** They let the browser reserve the correct box before the image downloads, which is what keeps the page from jumping as you scroll. Getting them wrong is the one mistake that will visibly break the layout.

Add `span: 'pano'` to make a picture break out and run the full width as a banner. One or two in a set of eight looks considered; more and the rhythm flattens.

`alt` is read aloud by screen readers. Describe the moment, not the file.
