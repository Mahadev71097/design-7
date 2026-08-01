# assets/location

| File | Required | Purpose |
|---|---|---|
| `venue.webp` | yes | Photograph of the venue |

- **Dimensions** 1044 × 492 px or larger, **ratio roughly 2.1:1** (landscape).
- **Format** WebP, quality 90. **Max size** 200 KB.
- **Transparency** not needed.
- Tapping it opens fullscreen, so supply a picture that rewards a closer look.
- Evening photographs suit this palette better than midday ones — warm light sits naturally against the ivory.

## The map

There is no map image any more. The section embeds a live, pannable Google map.

To point it at your venue: open Google Maps → **Share** → **Embed a map** → copy the `src="..."` value → paste it into `location.mapEmbed` in `config.js`.

Set `location.mapUrl` to a normal Google Maps link as well. That is what the **View on map** button opens, and it launches turn-by-turn directions on a phone.

If a picture is missing, the frame shows a quiet placeholder rather than a broken-image icon. The layout never collapses.
