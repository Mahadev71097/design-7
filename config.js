/* ============================================================================
   config.js  —  EDIT THIS FILE ONLY
   ----------------------------------------------------------------------------
   Everything a couple needs to change lives here. Nothing in index.html,
   style.css or script.js needs to be touched to personalise this invitation.
   ========================================================================== */

window.WEDDING_CONFIG = {

  /* ------------------------------------------------------------------ NAMES */
  couple: {
    groom:  'Mahadeva',      // rendered in Cormorant Garamond
    bride:  'Yashaswini',    // rendered in Great Vibes (the script name)
    joiner: 'and',
    // Shown in the browser tab and when the link is shared.
    tagline: 'Welcome To Our Forever'
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
  gallery: [
    { src: 'assets/gallery/01.webp', alt: 'The couple forehead to forehead', span: 'tall' },
    { src: 'assets/gallery/02.webp', alt: 'Beneath the floral arch',         span: 'wide' },
    { src: 'assets/gallery/04.webp', alt: 'Seated together at the mandap',   span: 'pano' },
    { src: 'assets/gallery/03.webp', alt: 'Mehendi hands, rings on',         span: 'wide' },
    { src: 'assets/gallery/05.webp', alt: 'A quiet moment between the two',  span: 'box'  },
    { src: 'assets/gallery/06.webp', alt: 'Temple jewellery, close',         span: 'wide' },
    { src: 'assets/gallery/07.webp', alt: 'The twirl',                       span: 'tall' }
  ],
  gallerySlideMs: 3000,        // crossfade interval for the cinema stage

  /* --------------------------------------------------------------- LOCATION */
  location: {
    name:    'Sri Venkateswara Kalyana Mandapam',
    address: ['No. 123, Outer Ring Road', 'NGEF Layout, Bangalore', 'Karnataka 560038'],
    venueImage: 'assets/location/venue.webp',
    mapImage:   'assets/location/map.webp',
    // Opens when "View on map" is pressed.
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sri+Venkateswara+Kalyana+Mandapam+NGEF+Layout+Bangalore',
    buttonLabel: 'View on map'
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
    copyright: 'Mahadeva & Yashaswini'
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
