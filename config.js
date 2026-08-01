/* ============================================================================
   config.js  —  EDIT THIS FILE ONLY
   ----------------------------------------------------------------------------
   Everything a couple needs to change lives here. Nothing in index.html,
   style.css or script.js needs to be touched to personalise this invitation.
   ========================================================================== */

window.WEDDING_CONFIG = {

  /* ------------------------------------------------------------------ NAMES */
  couple: {
    groom:  'Karan',         // rendered in Cormorant Garamond
    bride:  'Yashaswini',    // rendered in Great Vibes (the script name)
    joiner: 'and',
    // Shown in the browser tab and when the link is shared.
    tagline: 'Welcome To Our Forever'
  },

  /* ------------------------------------------------------------------ INTRO */
  /* The opening film. Visitors land on a still poster, tap once, watch the
     clip, and it settles onto its own final frame — which is then the hero's
     background, so the handover is invisible.
     Set `enabled: false` to skip the whole thing and open straight on the hero. */
  intro: {
    enabled:  true,
    video:    'assets/video/intro.mp4',
    poster:   'assets/video/poster.webp',
    endFrame: 'assets/hero/hero-end.webp',   // also used as the hero backdrop
    eyebrow:  'You are invited to celebrate',
    cta:      'Tap to open',
    skip:     'Skip'
  },

  /* ------------------------------------------------------------------- DATE */
  date: {
    /* The single source of truth. Drives the Date Reveal card AND the
       countdown, so the two can never disagree.
       Format: YYYY-MM-DDTHH:mm:ss  (24h, local time of the venue)

       NOTE FOR THE COUPLE: your Date Reveal artwork says 27 Nov 2026, but the
       events list below puts the WEDDING on Sun 29 Nov 2026. Change the line
       below to '2026-11-29T09:00:00' if the 29th is the ceremony date. */
    iso: '2026-11-27T09:00:00',

    heading: 'Save The Date',        // the large section title
    eyebrow: "The date we've been waiting for is almost here",
    label:   "We're getting married on",
    countdownLabel: 'Counting down to forever',
    // Message shown once the date has passed.
    passed:  'Today we begin forever'
  },

  /* ----------------------------------------------------------------- EVENTS */
  /* icon must match a filename in /assets/events/  (without .svg) */
  events: [
    { icon: 'mehendi',   name: 'Mehendi',   venue: 'Garden Area',    date: '2026-11-26' },
    { icon: 'haldi',     name: 'Haldi',     venue: 'Garden Area',    date: '2026-11-27' },
    { icon: 'sangeet',   name: 'Sangeet',   venue: 'Banquet Hall',   date: '2026-11-28' },
    { icon: 'wedding',   name: 'Wedding',   venue: 'Main Mandap',    date: '2026-11-29' },
    { icon: 'reception', name: 'Reception', venue: 'Banquet Hall',   date: '2026-11-30' },
    { icon: 'vidai',     name: 'Vidai',     venue: 'With Blessings', date: '2026-12-01' }
  ],

  /* ---------------------------------------------------------------- GALLERY */
  /* `span` controls the size in the collage: 'tall' | 'wide' | 'pano' | 'box'
     Add or remove freely — the layout re-flows itself. */
  /* `w`/`h` are the file's real pixel dimensions. They set the intrinsic
     aspect ratio so the mosaic never reflows while images load, and so the
     browser reserves the right box before the bytes arrive (zero CLS).
     `span: 'pano'` makes a picture run the full width as a banner. */
  gallery: [
    { src: 'assets/gallery/01.webp', alt: 'The couple forehead to forehead', w: 284, h: 390 },
    { src: 'assets/gallery/02.webp', alt: 'Beneath the floral arch',         w: 288, h: 222 },
    { src: 'assets/gallery/03.webp', alt: 'Mehendi hands, rings on',         w: 288, h: 147 },
    { src: 'assets/gallery/04.webp', alt: 'Seated together at the mandap',   w: 606, h: 252, span: 'pano' },
    { src: 'assets/gallery/05.webp', alt: 'A quiet moment between the two',  w: 276, h: 212 },
    { src: 'assets/gallery/06.webp', alt: 'Temple jewellery, close',         w: 276, h: 149 },
    { src: 'assets/gallery/07.webp', alt: 'The twirl',                       w: 312, h: 384 }
  ],

  gallerySlideMs: 3000,        // crossfade interval for the cinema stage

  /* --------------------------------------------------------------- LOCATION */
  location: {
    name:    'Taj Yeshwantpur, Bengaluru',
    address: ['2275, Tumkur Road', 'Yeshwanthpur Industrial Area, Phase 1',
              'Bengaluru, Karnataka 560022'],
    venueImage: 'assets/location/venue.webp',

    /* A still map preview. It is deliberately NOT interactive: a live embed
       traps touch scrolling on a phone and makes the page stutter as you pass
       it. Tapping anywhere on it opens the real Google Maps app instead. */
    mapEmbed: 'https://www.google.com/maps?q=Taj+Yeshwantpur+Bengaluru&z=15&output=embed',

    /* Where every tap goes — the venue's own Google Maps link. */
    mapUrl: 'https://maps.app.goo.gl/FKirVTUEPV3qmSi37',

    buttonLabel: 'View on map',
    copyLabel:   'Copy address',
    copiedLabel: 'Address copied'
  },

  /* -------------------------------------------------------------- BLESSINGS */
  blessings: {
    quote: 'Two souls, one light — bound by the fire, blessed by the elders, carried forward by love.',
    attribution: 'With the blessings of our families'
  },

  /* ----------------------------------------------------------------- FOOTER */
  footer: {
    music: 'assets/music/bg.mp3',   // drop your track here; button hides itself if absent
    instagram: 'https://instagram.com/',
    whatsapp:  'https://wa.me/919000000000',
    phone:     'tel:+919000000000',
    copyright: 'Karan & Yashaswini',
    /* {bride} and {groom} are filled in automatically. */
    madeWith: 'Made with \u2764 for {bride} & {groom}'
  },

  /* ------------------------------------------------------------------ BRAND */
  /* The white band at the very bottom of the page. This is your studio's
     signature, kept separate from the couple's own sign-off above it.
     Set `name` to an empty string to remove the band entirely. */
  brand: {
    name:    'Wedlifyy',
    tagline: 'Invitations, crafted',
    url:     ''        // e.g. 'https://wedlifyy.com' — omit for no link
  },

  /* ------------------------------------------------------------------ THEME */
  /* Overrides the CSS variables in style.css. Leave as-is for the ivory
     and champagne-gold palette from the brief. */
  theme: {
    ivory:  '#FBF8F2',
    gold:   '#B68C46',
    shadow: 'rgba(182,140,70,.12)'
  }
};
