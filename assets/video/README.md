# assets/video

The opening film. Visitors land on a still poster, tap once, watch the clip, and
it settles onto its final frame — which is also the hero's backdrop, so the
handover between film and page is invisible.

| File | Required | Purpose |
|---|---|---|
| `intro.mp4` | yes | The film itself |
| `poster.webp` | yes | First frame, shown before the tap |
| `poster.jpg` | optional | Fallback for very old browsers |
| `../hero/hero-end.webp` | yes | Final frame, reused as the hero backdrop |

## intro.mp4

- **Codec H.264 (`libx264`), `yuv420p`, profile `main`.** Not HEVC, not VP9,
  not AV1. H.264 is the only codec with guaranteed hardware decoding on every
  phone in circulation, and hardware decoding is the whole difference between
  smooth playback and a stuttering first impression.
- **Length** 5 seconds. Long enough to feel cinematic, short enough that nobody
  reaches for a skip button.
- **Dimensions** 698 × 1242 (current) — portrait, roughly 9:16.
- **Max size** 1.5 MB. The current file is 568 KB.
- **No audio track.** Stripped deliberately: it keeps the file small, avoids
  every autoplay restriction, and stops the film fighting the background music.
- **`-movflags +faststart` is essential.** It moves the index to the front of
  the file so playback can begin before the download finishes.

Recommended encode:

```
ffmpeg -i source.mov -t 5 -an \
  -c:v libx264 -profile:v main -pix_fmt yuv420p \
  -crf 27 -preset slower -movflags +faststart \
  intro.mp4
```

## The two frames

They are not decorative — the illusion depends on them.

```
ffmpeg -i intro.mp4 -vframes 1 -update 1 poster.png        # first frame
ffmpeg -sseof -0.1 -i intro.mp4 -vframes 1 -update 1 end.png   # last frame
```

Save the first as `poster.webp` (quality 84) and the last as
`../hero/hero-end.webp` (quality 86).

**If the last frame and the hero backdrop are not the same image, the cover
will visibly jump as it dissolves.** Regenerate both together whenever you
change the film.

Choose a clip that *ends* somewhere calm and uncluttered in the centre — the
couple's names sit over that area once the page appears.

## Turning it off

Set `intro.enabled: false` in `config.js`. The cover is removed from the page
entirely and visitors land straight on the hero, which falls back to
`assets/hero/hero-bg.webp`.

Visitors with "reduce motion" enabled see the poster and the invitation to
enter, but the film never plays — their tap goes straight through.
