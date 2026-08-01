# assets/music

| File | Required | Purpose |
|---|---|---|
| `bg.mp3` | optional | Background music |

- **Format** MP3, 128–192 kbps mono or stereo. Universally supported; AAC is not, on some Android builds.
- **Max size** 3 MB. It is fetched lazily and never blocks the page.
- **Length** 2–4 minutes. It loops seamlessly, so a clean loop point matters more than length.
- **Start softly.** The track fades in over 1.1 s and plays at 45% volume.

Point `footer.music` in `config.js` at the file.

**With no file present the control simply does not appear.** No dead button, no console error.

## Two things worth knowing

Browsers refuse to play sound until the visitor has tapped something — this is not a bug and cannot be worked around. The button is how they consent.

The choice is remembered in `localStorage`. Someone who turned music on and reloads gets it back on their first tap, rather than having to find the button again.
