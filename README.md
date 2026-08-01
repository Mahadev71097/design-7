# Karan & Yashaswini — wedding invitation

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
| Venue, address | `location.name`, `location.address` |
| Live map | `location.mapEmbed` (Google Maps → Share → Embed a map) |
| Directions button | `location.mapUrl` |
| Blessing quote | `blessings` |
| Music, Instagram, WhatsApp, phone | `footer` |
| Footer sign-off | `footer.madeWith` — `{bride}` and `{groom}` fill themselves in |
| Ivory and gold | `theme` |

### Swapping photographs
Drop new files into `assets/gallery/` and list them in `gallery[]`, each with
its real pixel dimensions:

```js
{ src: 'assets/gallery/08.webp', alt: 'Description', w: 1200, h: 800 }
```

Any aspect ratio works. The mosaic packs tiles by their true height, so nothing
leaves a hole. `w` and `h` reserve the correct box before the image downloads —
that is what stops the page jumping as you scroll, so get them right.

Add `span: 'pano'` to make one run the full width as a banner.

Every asset folder has its own README with dimensions, formats and size limits.

### Adding a function
Add an entry to `events[]`. The `icon` name matches either a shape in the
sprite at the top of `index.html` (`mehendi`, `haldi`, `sangeet`, `wedding`,
`reception`, `vidai`) or a file at `assets/events/<name>.svg`.

### Your studio's branding
The white band at the very foot of the page is set by `brand` in `config.js` —
name, tagline and an optional link. Set `brand.name` to an empty string and the
band disappears entirely. It is kept separate from the couple's own sign-off so
one can be changed without touching the other.

The Instagram, WhatsApp and phone links sit **inside that band**, beneath the
studio name, because they are the studio's channels rather than the couple's.
They come from `footer.instagram`, `footer.whatsapp` and `footer.phone`. Any
one you leave empty simply does not render, and their screen-reader labels pick
up `brand.name` automatically.

Music has one control only — the floating button at the top right. There is no
second copy in the footer.

## Please note

`date.iso` is currently **27 Nov 2026**, matching the Date Reveal artwork.
The events list puts the *wedding* on **Sun 29 Nov 2026**. If the 29th is the
ceremony, change that one line and the card and countdown both follow.

The map is a **still preview**, on purpose. A live embed traps touch-scrolling
on a phone and makes the page stutter as your finger crosses it. Tapping the
plate opens the real Google Maps app, which does the job better.

### The opening film
`intro` in `config.js` controls the cover: the video, its poster, its final
frame, and the wording on the button. Set `intro.enabled: false` to remove it
and open straight on the hero.

There is no loading screen — the cover poster is the first thing anyone sees,
so a progress bar in front of it would only be a second door. Images warm in
the background while the visitor reads the cover.

Tapping the cover starts the music as well as the film: that tap is the gesture
browsers require before any audio may play, so it is the one reliable moment to
begin. The floating button at the top right then toggles it.

The film's last frame doubles as the hero's background, which is why the cover
can simply dissolve without anything appearing to move. If you swap the video,
re-export both frames together — `assets/video/README.md` has the exact ffmpeg
commands.

### Small behaviours worth knowing
A guide appears on the hero's left rail for about three seconds, then retires —
or leaves the moment you start scrolling.

If the hero is left untouched for five seconds, the page travels slowly to the
end and back, once, to show what is there. Any input cancels it instantly and
it never offers again.

On a laptop the opening film plays inside a 9:16 portrait card rather than
filling the window, because it was shot portrait and cropping it to a landscape
viewport throws most of the frame away.

## How it is built

Plain HTML, CSS and JavaScript. GSAP + ScrollTrigger for choreography,
SplitType for the letter-by-letter reveals, Lenis for smooth wheel scrolling —
all from CDN. No build step, no framework, no bundler.

If the CDN is unreachable, or the visitor has "reduce motion" switched on, the
invitation renders in full without animation. It is never blank.


## Where things happen

- **`config.js`** — all content. Start and usually finish here.
- **`index.html`** — structure, plus the inline SVG icon sprite.
- **`style.css`** — 21 numbered sections; design tokens are at the top.
- **`script.js`** — 12 numbered sections, all commented.

## Notes on behaviour

**Music** won't play until the visitor taps the button. Browsers require it, and
no code can bypass it. The choice is remembered across refreshes.

**The map** is a live Google embed — it zooms, pans and gives directions. It
needs no API key.

**Missing images** show a quiet placeholder rather than a broken icon. Nothing
collapses, so a half-finished set is safe to preview.

**Reduced motion** is honoured. Visitors who ask their device for less movement
get the invitation with the animation stripped out, not a broken page.
