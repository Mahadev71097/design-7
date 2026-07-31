/* ============================================================================
   MAHADEVA & YASHASWINI — behaviour
   ----------------------------------------------------------------------------
   01  Boot & capability guards      07  Countdown
   02  Content from config           08  Gallery cinema + stills
   03  Preloader                     09  Fullscreen viewer
   04  Lenis + ScrollTrigger         10  Buttons
   05  Text splitting                11  Music
   06  Section choreography          12  Atmosphere (dust, rays, silk)
   ========================================================================== */
(function () {
'use strict';

/* ═════════════════════════════════════ 01 · BOOT & CAPABILITY GUARDS ═══ */

const html = document.documentElement;
html.classList.remove('no-js');
html.classList.add('js');

const $  = (s, c) => (c || document).querySelector(s);
const $$ = (s, c) => Array.prototype.slice.call((c || document).querySelectorAll(s));

const HAS_GSAP  = typeof window.gsap !== 'undefined';
const HAS_ST    = HAS_GSAP && typeof window.ScrollTrigger !== 'undefined';
const HAS_SPLIT = typeof window.SplitType !== 'undefined';
const HAS_LENIS = typeof window.Lenis !== 'undefined';

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/* Motion is only "full" when the libraries arrived AND the visitor wants it. */
const ANIMATE = HAS_GSAP && HAS_ST && !REDUCED;

if (!HAS_GSAP || !HAS_ST) html.classList.add('no-gsap');

/* Last line of defence. If anything below throws, the invitation still
   renders in full — just without the choreography. */
function showEverything () {
  html.classList.add('no-gsap');
  $$('.reveal').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.style.filter = 'none';
    el.style.clipPath = 'none';
  });
  document.body.classList.remove('is-loading');
  const pre = $('#preloader');
  if (pre) pre.style.display = 'none';
}

/* deterministic pseudo-random — same layout rhythm on every load, so the
   page never feels arbitrary and nothing shifts between visits */
function seeded (i) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const CFG = window.WEDDING_CONFIG || {};
let lenis = null;


/* ═══════════════════════════════════════════ 02 · CONTENT FROM CONFIG ═══ */

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
const DAYS   = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

const targetDate = new Date((CFG.date && CFG.date.iso) || '2026-11-27T09:00:00');

function paintContent () {
  const c = CFG.couple || {}, d = CFG.date || {}, l = CFG.location || {},
        b = CFG.blessings || {}, f = CFG.footer || {}, t = CFG.theme || {};

  /* theme overrides */
  if (t.ivory)  html.style.setProperty('--ivory', t.ivory);
  if (t.gold)   html.style.setProperty('--gold', t.gold);
  if (t.shadow) html.style.setProperty('--shadow-gold', t.shadow);

  /* names ------------------------------------------------------------- */
  const set = (sel, val) => { const el = $(sel); if (el && val != null) el.textContent = val; };
  set('[data-groom]', c.groom);
  set('[data-bride]', c.bride);
  set('[data-joiner]', c.joiner);
  set('[data-hero-eyebrow]', c.tagline);
  set('[data-pre-groom]', (c.groom || 'M').charAt(0));
  set('[data-pre-bride]', (c.bride || 'Y').charAt(0));

  const pair = (c.groom || '') + ' & ' + (c.bride || '');
  set('[data-footer-names]', pair);
  set('[data-footer-copy]', f.copyright || pair);
  $('#year').textContent = new Date().getFullYear();

  document.title = pair + ' — ' + (c.tagline || 'Our Wedding');
  const og = $('meta[property="og:title"]'); if (og) og.setAttribute('content', pair);

  /* date -------------------------------------------------------------- */
  set('[data-date-eyebrow]', d.eyebrow);
  set('[data-date-label]', d.label);
  set('[data-count-label]', d.countdownLabel);
  set('[data-date-day]',  String(targetDate.getDate()).padStart(2, '0'));
  set('[data-date-mon]',  MONTHS[targetDate.getMonth()]);
  set('[data-date-year]', targetDate.getFullYear());

  /* events ------------------------------------------------------------ */
  const list = $('#eventList');
  if (list && Array.isArray(CFG.events)) {
    list.innerHTML = CFG.events.map((ev, i) => {
      const dt = new Date(ev.date + 'T00:00:00');
      const side = i % 2 === 0 ? 'l' : 'r';          // alternating entry direction

      /* Icons live in the sprite so they inherit currentColor and follow the
         theme. An SVG loaded through <img> cannot — it would render black.
         Anything not in the sprite falls back to a file in assets/events/. */
      const inSprite = !!document.getElementById('ev-' + ev.icon);
      const icon = inSprite
        ? `<svg class="event__icon" viewBox="0 0 64 64" fill="none" stroke="currentColor"
                stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
             <use href="#ev-${ev.icon}"/></svg>`
        : `<img class="event__icon" src="assets/events/${ev.icon}.svg" alt="" width="64" height="64"
                loading="lazy" decoding="async" aria-hidden="true">`;

      return `
      <li class="event reveal" data-anim="event" data-side="${side}">
        ${icon}
        <div class="event__body">
          <h3 class="event__name">${ev.name}</h3>
          <p class="event__where">
            <svg class="event__pin${i === 0 ? ' event__pin--beat' : ''}" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true">
              <use href="#i-pin"/></svg>
            ${ev.venue}
          </p>
        </div>
        <p class="event__when">
          <span class="event__dow">${DAYS[dt.getDay()]}</span>
          <span class="event__day">${String(dt.getDate()).padStart(2, '0')}</span>
          <span class="event__my">${MONTHS[dt.getMonth()]} ${dt.getFullYear()}</span>
        </p>
      </li>`;
    }).join('');
  }

  /* location ---------------------------------------------------------- */
  set('[data-venue-name]', l.name);
  set('[data-map-label]', l.buttonLabel);
  const addr = $('[data-venue-addr]');
  if (addr && Array.isArray(l.address)) addr.innerHTML = l.address.join('<br>');
  if (l.mapUrl) { $('#mapBtn').href = l.mapUrl; $('#venueMap').href = l.mapUrl; }
  if (l.venueImage) $('#venueShot').src = l.venueImage;
  if (l.mapImage)   $('#venueMap img').src = l.mapImage;
  if (l.name)       $('#venueShot').alt = l.name;

  /* blessings --------------------------------------------------------- */
  set('[data-bless-quote]', b.quote);
  set('[data-bless-by]', b.attribution);

  /* footer links ------------------------------------------------------ */
  const link = (id, href) => {
    const el = $(id);
    if (!el) return;
    if (href) el.href = href; else el.hidden = true;
  };
  link('#igLink',  f.instagram);
  link('#waLink',  f.whatsapp);
  link('#telLink', f.phone);
}


/* ═══════════════════════════════════════════════════════ 03 · PRELOADER ═══ */
/* Real progress: we watch the images that actually matter, plus webfonts.
   Because the curtain stays up until everything is decoded, the visitor
   never sees a reflow — which is how we get to zero visible CLS. */

function preload (done) {
  const pre  = $('#preloader');
  const bar  = $('#preBar');
  const pct  = $('#prePct');

  const urls = ['assets/hero/hero-bg.webp', 'assets/hero/couple.webp'];
  (CFG.gallery || []).forEach(g => urls.push(g.src));
  if (CFG.location) { urls.push(CFG.location.venueImage, CFG.location.mapImage); }

  const jobs = urls.filter(Boolean);
  const total = jobs.length + 1;                 // +1 for fonts
  let loaded = 0, shown = 0, finished = false;

  const tick = () => {
    loaded++;
    const target = Math.round((loaded / total) * 100);
    if (HAS_GSAP) {
      gsap.to({ v: shown }, {
        v: target, duration: .5, ease: 'power2.out',
        onUpdate: function () {
          shown = this.targets()[0].v;
          bar.style.width = shown + '%';
          pct.textContent = Math.round(shown);
        }
      });
    } else {
      shown = target;
      bar.style.width = target + '%';
      pct.textContent = target;
    }
    if (loaded >= total) finish();
  };

  const finish = () => {
    if (finished) return;
    finished = true;
    const close = () => {
      document.body.classList.remove('is-loading');
      pre.setAttribute('aria-hidden', 'true');
      done();
    };
    if (HAS_GSAP) {
      gsap.timeline({ delay: .25 })
        .to(bar, { width: '100%', duration: .35, ease: 'power2.out' }, 0)
        .to('.pre__box', { y: -14, opacity: 0, duration: .6, ease: 'power2.inOut' }, .2)
        /* the hero begins under the curtain, so the two movements read as one */
        .to(pre, { opacity: 0, duration: .7, ease: 'power2.inOut',
          onStart: close,
          onComplete () { pre.style.display = 'none'; }
        }, .35);
    } else {
      pre.style.display = 'none';
      close();
    }
  };

  jobs.forEach(src => {
    const img = new Image();
    img.onload = img.onerror = tick;             // a missing file must never stall us
    img.src = src;
  });

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(tick).catch(tick);
  else tick();

  /* hard ceiling — the curtain always lifts, whatever the network does */
  setTimeout(finish, 5000);
}


/* ══════════════════════════════════════════ 04 · LENIS + SCROLLTRIGGER ═══ */

function initScroll () {
  if (!ANIMATE) return;
  gsap.registerPlugin(ScrollTrigger);

  if (HAS_LENIS) {
    lenis = new Lenis({
      duration: 1.05,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      /* Native momentum already feels right on touch, and syncing it costs
         frames on mid-range phones. Wheel and keyboard get the smoothing. */
      smoothTouch: false,
      syncTouch: false,
      touchMultiplier: 1.6,
      wheelMultiplier: 1
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* Keyboard scrolling stays smooth too. */
  window.addEventListener('keydown', e => {
    if (!lenis) return;
    const step = window.innerHeight * .85;
    if (e.key === 'PageDown') { lenis.scrollTo(lenis.scroll + step); e.preventDefault(); }
    if (e.key === 'PageUp')   { lenis.scrollTo(lenis.scroll - step); e.preventDefault(); }
    if (e.key === 'Home')     { lenis.scrollTo(0); e.preventDefault(); }
    if (e.key === 'End')      { lenis.scrollTo(document.body.scrollHeight); e.preventDefault(); }
  });

  /* Only re-measure on real width changes. Mobile toolbars change the
     height constantly; reacting to that is what causes scroll jumps. */
  let lastW = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth === lastW) return;
    lastW = window.innerWidth;
    ScrollTrigger.refresh();
  }, { passive: true });
}


/* ═════════════════════════════════════════════════ 05 · TEXT SPLITTING ═══ */

function splitAll () {
  if (!HAS_SPLIT) return;
  $$('[data-split]').forEach(el => {
    /* keep the sentence intact for screen readers before we shred it */
    if (!el.getAttribute('aria-label')) {
      el.setAttribute('aria-label', el.textContent.trim());
    }
    const type = el.getAttribute('data-split') === 'words' ? 'words' : 'chars';
    try {
      new SplitType(el, { types: type, tagName: 'span' });
      $$('.char, .word', el).forEach(n => n.setAttribute('aria-hidden', 'true'));
    } catch (e) { /* leave the text as it is */ }
  });
}

/* fade-and-rise used wherever a section doesn't ask for something special */
function revealBatch (selector, vars) {
  const nodes = $$(selector).filter(n => !n.hasAttribute('data-anim'));
  if (!nodes.length) return;
  /* the start state must be written BEFORE the batch exists — anything
     already inside the viewport fires on the very first refresh */
  gsap.set(nodes, { y: 26, opacity: 0 });
  ScrollTrigger.batch(nodes, {
    start: 'top 88%',
    once: true,
    onEnter: batch => gsap.to(batch, Object.assign({
      opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: .09, overwrite: true
    }, vars || {}))
  });
}

/* headings arrive one character at a time, as the brief asks */
function charReveal (selector) {
  $$(selector).forEach(el => {
    const chars = $$('.char', el);
    gsap.set(el, { opacity: 1 });
    if (!chars.length) {
      gsap.fromTo(el, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
      return;
    }
    gsap.fromTo(chars,
      { opacity: 0, yPercent: 108 },
      { opacity: 1, yPercent: 0, duration: .9, ease: 'power3.out', stagger: .035,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
}


/* ══════════════════════════════════════════ 06 · SECTION CHOREOGRAPHY ═══ */
/* Every section arrives differently. Nothing is reused.                    */

function heroTimeline () {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  const eyebrow = $$('[data-hero-eyebrow] .char');
  const groom   = $$('[data-groom] .char');
  const bride   = $$('[data-bride] .char');

  gsap.set('#hero .reveal', { opacity: 1 });

  /* the arch draws itself before anything else appears */
  const arch = $('#archPath');
  if (arch && typeof arch.getTotalLength === 'function') {
    const len = arch.getTotalLength();
    tl.fromTo(arch, { strokeDasharray: len, strokeDashoffset: len },
                    { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' }, 0);
  } else {
    tl.fromTo('.arch', { opacity: 0 }, { opacity: 1, duration: 1.6 }, 0);
  }

  tl.fromTo('.hero__couple',
      { opacity: 0, scale: 1.06, yPercent: 4 },
      { opacity: 1, scale: 1, yPercent: 0, duration: 1.8, ease: 'power2.out' }, .15)
    .fromTo('.hero__glow', { opacity: 0, scale: .82 },
      { opacity: 1, scale: 1, duration: 2.2, ease: 'power2.out' }, .25);

  /* letter by letter: a small fade, a small blur, a small rise */
  if (eyebrow.length) {
    tl.fromTo(eyebrow, { opacity: 0, y: 14, filter: 'blur(6px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: .8, stagger: .022 }, .5);
  } else tl.fromTo('[data-hero-eyebrow]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .9 }, .5);

  tl.fromTo('#hero .orn--fleuron', { opacity: 0, scale: .7 },
      { opacity: .9, scale: 1, duration: .9 }, .8);

  if (groom.length) {
    tl.fromTo(groom, { opacity: 0, y: 26, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: .95, stagger: .045 }, 1.0);
  } else tl.fromTo('[data-groom]', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1 }, 1.0);

  tl.fromTo('.hero__joiner', { opacity: 0, scaleX: .5 },
      { opacity: 1, scaleX: 1, duration: .8 }, 1.35);

  /* the script name writes itself on, one letter at a time */
  if (bride.length) {
    tl.fromTo(bride, { opacity: 0, y: 22, rotate: -5, filter: 'blur(7px)' },
      { opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)', duration: 1, stagger: .058 }, 1.5);
  } else tl.fromTo('[data-bride]', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1 }, 1.5);

  /* and then the heart catches the light */
  tl.fromTo('#heroHeart', { opacity: 0, scale: .5 },
      { opacity: 1, scale: 1, duration: .7, ease: 'back.out(2)' }, '-=0.3')
    .to('#heroHeart', {
        filter: 'drop-shadow(0 0 9px rgba(182,140,70,.85))',
        scale: 1.12, duration: 1.1, yoyo: true, repeat: -1, ease: 'sine.inOut'
      }, '+=0.1')
    .fromTo('.scroll-cue', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .8 }, '-=1.6');

  return tl;
}

function ambientLoops () {
  /* the hero image breathes, forever */
  gsap.to('#heroCouple', {
    scale: 1.02, duration: 7, ease: 'sine.inOut', yoyo: true, repeat: -1
  });
  /* light shifts across the arch */
  gsap.to('.rays', {
    xPercent: 6, rotation: -4, opacity: .34, duration: 16,
    ease: 'sine.inOut', yoyo: true, repeat: -1
  });
  /* the silk drifts on its own clock, never in step with anything else */
  gsap.to('.silk', {
    xPercent: 7, yPercent: 4, rotation: 1.6, duration: 11,
    ease: 'sine.inOut', yoyo: true, repeat: -1
  });
  gsap.to('.hero__glow', {
    opacity: .72, scale: 1.05, duration: 5.5, ease: 'sine.inOut', yoyo: true, repeat: -1
  });
}

/* Background plates travel slower than the page. Content is eased against
   the scroll so each section feels held for a beat as it passes — the same
   sensation as a pin, without pin-spacers that fight mobile toolbars. */
function parallaxSections () {
  $$('.section').forEach(sec => {
    const plate = $('.section__bg img', sec);
    if (plate) {
      gsap.fromTo(plate, { yPercent: -7 }, {
        yPercent: 7, ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: .6 }
      });
    }
    const inner = $('.section__inner', sec);
    if (inner && sec.id !== 'hero') {
      gsap.fromTo(inner, { yPercent: 4 }, {
        yPercent: -4, ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 1.1 }
      });
    }
  });
}

function sectionAnimations () {

  /* 2 · DATE — a mask wipes upward across the card ---------------------- */
  const card = $('#dateCard');
  if (card) {
    gsap.set(card, { opacity: 1, clipPath: 'inset(0% 0% 100% 0%)' });
    gsap.to(card, {
      clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power4.inOut',
      scrollTrigger: { trigger: card, start: 'top 85%', once: true }
    });
  }
  /* every section heading reveals character by character */
  charReveal('#dateHead, #eventsHead, #galleryHead, #locHead');

  /* 3 · COUNTDOWN — the cells stand up ---------------------------------- */
  const cells = $$('.count__cell');
  if (cells.length) {
    gsap.fromTo(cells,
      { opacity: 0, y: 40, rotateX: -32, transformOrigin: '50% 100%' },
      { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: 'power3.out', stagger: .1,
        scrollTrigger: { trigger: '#countGrid', start: 'top 86%', once: true } });
  }

  /* 4 · EVENTS — cards slide in from alternating sides ------------------ */
  $$('.event').forEach(el => {
    const fromLeft = el.getAttribute('data-side') === 'l';
    gsap.fromTo(el,
      { opacity: 0, x: fromLeft ? -46 : 46, rotate: fromLeft ? -1 : 1 },
      { opacity: 1, x: 0, rotate: 0, duration: 1.05, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });

  /* 5 · GALLERY — the stills float up out of nothing -------------------- */
  const stills = $$('.still');
  if (stills.length) {
    gsap.fromTo(stills,
      { opacity: 0, scale: .86, y: 34 },
      { opacity: 1, scale: 1, y: 0, duration: 1.15, ease: 'power3.out', stagger: .085,
        scrollTrigger: { trigger: '#stills', start: 'top 88%', once: true },
        onComplete () { floatStills(stills); } });
  }
  const cinema = $('#cinema');
  if (cinema) {
    gsap.set(cinema, { opacity: 1 });
    gsap.fromTo(cinema, { opacity: 0, scale: .94, filter: 'blur(10px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out',
        scrollTrigger: { trigger: cinema, start: 'top 88%', once: true } });
  }

  /* 6 · LOCATION — a slow camera push into the venue -------------------- */
  const shot = $('#venueShot');
  if (shot) {
    gsap.fromTo(shot, { scale: 1.22 }, {
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: '#venueCard', start: 'top bottom', end: 'center center', scrub: 1 }
    });
  }
  const venueCard = $('#venueCard');
  if (venueCard) {
    gsap.set(venueCard, { opacity: 1 });
    gsap.fromTo(venueCard, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: venueCard, start: 'top 88%', once: true }
    });
  }

  /* 7 · BLESSINGS — the quote arrives word by word ---------------------- */
  const words = $$('[data-bless-quote] .word');
  if (words.length) {
    gsap.set('[data-bless-quote]', { opacity: 1 });
    gsap.fromTo(words,
      { opacity: 0, y: 26, filter: 'blur(9px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power2.out', stagger: .085,
        scrollTrigger: { trigger: '[data-bless-quote]', start: 'top 84%', once: true } });
  }

  /* 8 · FOOTER — everything dissolves into white ------------------------ */
  const footer = $('#footer');
  if (footer) {
    gsap.fromTo(footer, { backgroundColor: 'rgba(251,248,242,0)' },
      { backgroundColor: 'rgba(255,255,255,1)', ease: 'none',
        scrollTrigger: { trigger: footer, start: 'top 70%', end: 'bottom bottom', scrub: 1 } });
    gsap.fromTo($('#blessings'), { opacity: 1 }, {
      opacity: .25, ease: 'none',
      scrollTrigger: { trigger: footer, start: 'top 90%', end: 'top 20%', scrub: 1 }
    });
  }

  /* everything else gets the house reveal */
  revealBatch('.section .reveal');
}

/* each still keeps its own clock — no two ever move together */
function floatStills (nodes) {
  nodes.forEach((el, i) => {
    gsap.to(el, {
      y: (seeded(i) * 9 + 4) * (i % 2 ? -1 : 1),
      rotate: (seeded(i + 40) - .5) * 1.6,
      duration: 4.5 + seeded(i + 9) * 3.5,
      delay: seeded(i + 21) * 1.6,
      ease: 'sine.inOut', yoyo: true, repeat: -1
    });
  });
}


/* ═══════════════════════════════════════════════════════ 07 · COUNTDOWN ═══ */
/* Real digit flips on a GSAP ticker. Nothing jumps: each digit rotates its
   old face out and its new face in, and only the digits that changed move. */

const UNITS = [
  { key: 'days',  label: 'Days'    },
  { key: 'hours', label: 'Hours'   },
  { key: 'mins',  label: 'Minutes' },
  { key: 'secs',  label: 'Seconds' }
];

function remaining () {
  let ms = targetDate.getTime() - Date.now();
  if (ms < 0) ms = 0;
  const s = Math.floor(ms / 1000);
  return {
    days:  Math.floor(s / 86400),
    hours: Math.floor(s / 3600) % 24,
    mins:  Math.floor(s / 60) % 60,
    secs:  s % 60,
    over:  ms <= 0
  };
}

function buildCountdown () {
  const grid = $('#countGrid');
  if (!grid) return null;

  const first = remaining();
  /* fix the day column's width now so it can never reflow later */
  const dayDigits = Math.max(2, String(first.days).length);

  grid.innerHTML = UNITS.map(u => {
    const n = u.key === 'days' ? dayDigits : 2;
    let faces = '';
    for (let i = 0; i < n; i++) {
      faces += `<span class="flip" data-d="${u.key}${i}">
                  <span class="flip__face flip__face--cur">0</span>
                  <span class="flip__face flip__face--nxt" aria-hidden="true">0</span>
                </span>`;
    }
    return `<div class="count__cell">
              <span class="count__glow" aria-hidden="true"></span>
              <span class="count__num" data-unit="${u.key}">${faces}</span>
              <span class="count__label">${u.label}</span>
            </div>`;
  }).join('');

  const flips = {};
  $$('.flip', grid).forEach(el => {
    flips[el.getAttribute('data-d')] = {
      cur: $('.flip__face--cur', el),
      nxt: $('.flip__face--nxt', el),
      val: null
    };
  });
  return { grid, flips, dayDigits };
}

function runCountdown (cd) {
  if (!cd) return;
  const { grid, flips, dayDigits } = cd;
  const done = $('#countDone');
  let lastSec = -1;

  function setDigit (slot, ch, cell) {
    const f = flips[slot];
    if (!f || f.val === ch) return;
    const firstPaint = f.val === null;
    f.val = ch;

    if (firstPaint || !ANIMATE) { f.cur.textContent = ch; return; }

    f.nxt.textContent = ch;
    gsap.timeline()
      .set(f.nxt, { rotateX: -90, opacity: 1 })
      .to(f.cur, { rotateX: 90, opacity: 0, duration: .26, ease: 'power2.in' }, 0)
      .to(f.nxt, { rotateX: 0, duration: .3, ease: 'power2.out' }, .2)
      .add(() => {
        f.cur.textContent = ch;
        gsap.set(f.cur, { rotateX: 0, opacity: 1 });
        gsap.set(f.nxt, { opacity: 0 });
      });

    /* a breath of light on the cell that just changed */
    if (cell) {
      const glow = $('.count__glow', cell);
      if (glow) gsap.fromTo(glow, { opacity: .55 }, { opacity: 0, duration: .85, ease: 'power2.out' });
    }
  }

  function paint () {
    const r = remaining();
    if (r.secs === lastSec && !r.over) return;      // one repaint per second, no more
    lastSec = r.secs;

    UNITS.forEach(u => {
      const width = u.key === 'days' ? dayDigits : 2;
      const str = String(r[u.key]).padStart(width, '0');
      const cell = $(`[data-unit="${u.key}"]`, grid).closest('.count__cell');
      for (let i = 0; i < width; i++) setDigit(u.key + i, str[i], cell);
    });

    if (r.over && done && done.hidden) {
      done.hidden = false;
      done.textContent = (CFG.date && CFG.date.passed) || 'Today we begin forever';
      if (ANIMATE) gsap.fromTo(done, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1 });
    }
  }

  paint();
  if (HAS_GSAP) gsap.ticker.add(paint);
  else setInterval(paint, 1000);
}


/* ══════════════════════════════════════════ 08 · GALLERY CINEMA + STILLS ═══ */

const PHOTOS = (CFG.gallery || []).slice();

function buildGallery () {
  const cinema = $('#cinema');
  const dots   = $('#cinemaDots');
  const stills = $('#stills');
  if (!PHOTOS.length) return;

  /* the cinema plate */
  if (cinema) {
    const wash = $('.cinema__wash', cinema);
    PHOTOS.forEach((p, i) => {
      const slide = document.createElement('div');
      slide.className = 'cinema__slide' + (i === 0 ? ' is-on' : '');
      slide.innerHTML = `<img src="${p.src}" alt="${p.alt || ''}" loading="${i < 2 ? 'eager' : 'lazy'}" decoding="async">`;
      cinema.insertBefore(slide, wash);
    });
    dots.innerHTML = PHOTOS.map((_, i) =>
      `<span class="cinema__dot${i === 0 ? ' is-on' : ''}"></span>`).join('');
  }

  /* the constellation */
  if (stills) {
    stills.innerHTML = PHOTOS.map((p, i) => `
      <figure class="still still--${p.span || 'wide'}" data-i="${i}" role="button" tabindex="0"
              aria-label="Open photo ${i + 1}: ${p.alt || ''}">
        <img src="${p.src}" alt="${p.alt || ''}" loading="lazy" decoding="async">
      </figure>`).join('');
  }
}

function runCinema () {
  const cinema = $('#cinema');
  if (!cinema || PHOTOS.length < 2) return;

  const slides = $$('.cinema__slide', cinema);
  const dots   = $$('.cinema__dot');
  const wait   = CFG.gallerySlideMs || 3000;
  let idx = 0, timer = null, held = false;

  function kenBurns (slide) {
    if (!ANIMATE) return;
    const img = $('img', slide);
    const i = slides.indexOf(slide);
    gsap.fromTo(img,
      { scale: 1, xPercent: 0, yPercent: 0 },
      { scale: 1.08,
        xPercent: (seeded(i) - .5) * 3,
        yPercent: (seeded(i + 5) - .5) * 3,
        duration: (wait / 1000) + 1.6, ease: 'none' });
  }

  function go (next) {
    if (next === idx) return;
    const from = slides[idx], to = slides[next];
    idx = next;
    dots.forEach((d, i) => d.classList.toggle('is-on', i === idx));

    if (ANIMATE) {
      gsap.to(from, { opacity: 0, duration: 1.1, ease: 'power2.inOut',
                      onComplete: () => from.classList.remove('is-on') });
      to.classList.add('is-on');
      gsap.fromTo(to, { opacity: 0 }, { opacity: 1, duration: 1.1, ease: 'power2.inOut' });
    } else {
      from.classList.remove('is-on');
      to.classList.add('is-on');
    }
    kenBurns(to);
  }

  const start = () => { stop(); timer = setInterval(() => {
    if (!held) go((idx + 1) % slides.length);
  }, wait); };
  const stop  = () => { if (timer) clearInterval(timer); timer = null; };

  /* hover or focus holds the slideshow where it is */
  cinema.addEventListener('pointerenter', () => { held = true; });
  cinema.addEventListener('pointerleave', () => { held = false; });
  cinema.addEventListener('focusin',  () => { held = true; });
  cinema.addEventListener('focusout', () => { held = false; });

  /* don't burn frames while the section is off screen or the tab is hidden */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(es => {
      es.forEach(e => e.isIntersecting ? start() : stop());
    }, { threshold: .12 }).observe(cinema);
  } else start();

  document.addEventListener('visibilitychange', () => {
    document.hidden ? stop() : start();
  });

  kenBurns(slides[0]);

  cinema.addEventListener('click', () => openViewer(idx));
  cinema.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openViewer(idx); }
  });

  window.__cinemaGo = go;
}


/* ═══════════════════════════════════════════════ 09 · FULLSCREEN VIEWER ═══ */
/* Drag to pan, pinch to zoom, swipe to browse, double-tap to snap.          */

let openViewer = function () {};

function initViewer () {
  const vw     = $('#viewer');
  const canvas = $('#vwCanvas');
  const img    = $('#vwImg');
  const now    = $('#vwNow');
  const all    = $('#vwAll');
  if (!vw || !PHOTOS.length) return;

  all.textContent = PHOTOS.length;

  let index = 0, scale = 1, tx = 0, ty = 0;
  let lastFocus = null;
  const pointers = new Map();
  let startDist = 0, startScale = 1, startX = 0, startY = 0, panning = false;
  let lastTap = 0, dragged = false, downX = 0, downY = 0;

  const apply = (dur) => {
    if (!HAS_GSAP) {
      img.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`;
      return;
    }
    const v = { x: tx, y: ty, scale };
    if (ANIMATE && dur) gsap.to(img, Object.assign({ duration: dur, ease: 'power3.out' }, v));
    else gsap.set(img, v);
  };

  const reset = (dur) => { scale = 1; tx = 0; ty = 0; apply(dur); };

  function show (i, dir) {
    index = (i + PHOTOS.length) % PHOTOS.length;
    const p = PHOTOS[index];
    now.textContent = index + 1;
    reset(0);
    if (ANIMATE) {
      gsap.to(img, { opacity: 0, x: dir ? -dir * 40 : 0, duration: .2, ease: 'power2.in',
        onComplete () {
          img.src = p.src; img.alt = p.alt || '';
          gsap.fromTo(img, { opacity: 0, x: dir ? dir * 40 : 0, scale: .97 },
            { opacity: 1, x: 0, scale: 1, duration: .5, ease: 'power3.out',
              onComplete () { tx = 0; ty = 0; scale = 1; } });
        } });
    } else { img.src = p.src; img.alt = p.alt || ''; }
  }

  openViewer = function (i) {
    lastFocus = document.activeElement;
    vw.classList.add('is-open');
    document.body.classList.add('no-scroll');
    if (lenis) lenis.stop();
    show(i, 0);
    $('#vwClose').focus();
    if (ANIMATE) gsap.fromTo(vw, { opacity: 0 }, { opacity: 1, duration: .35, ease: 'power2.out' });
  };

  function close () {
    const finish = () => {
      vw.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
      if (lenis) lenis.start();
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
    if (ANIMATE) gsap.to(vw, { opacity: 0, duration: .28, ease: 'power2.in', onComplete: finish });
    else finish();
  }

  const next = () => show(index + 1,  1);
  const prev = () => show(index - 1, -1);

  $('#vwClose').addEventListener('click', close);
  $('#vwNext').addEventListener('click', next);
  $('#vwPrev').addEventListener('click', prev);

  /* tapping the backdrop closes — but finishing a pan must not */
  vw.addEventListener('click', e => {
    if (dragged) { dragged = false; return; }
    if (e.target === vw || e.target === canvas) close();
  });

  /* keyboard — and a simple focus trap so tabbing can't escape the dialog */
  document.addEventListener('keydown', e => {
    if (!vw.classList.contains('is-open')) return;
    if (e.key === 'Escape')     { e.preventDefault(); close(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
    if (e.key === 'Tab') {
      const f = $$('button', vw);
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---- pointers: pan, pinch, swipe ---------------------------------- */
  const dist = () => {
    const p = Array.from(pointers.values());
    return Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
  };

  canvas.addEventListener('pointerdown', e => {
    canvas.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.size === 2) {
      startDist = dist(); startScale = scale; panning = false;
    } else {
      startX = e.clientX - tx; startY = e.clientY - ty; panning = true;
      downX = e.clientX; downY = e.clientY; dragged = false;
      const t = Date.now();
      if (t - lastTap < 300) { scale = scale > 1.2 ? 1 : 2.4; tx = 0; ty = 0; apply(.4); }
      lastTap = t;
    }
  });

  canvas.addEventListener('pointermove', e => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.size === 2) {
      const d = dist();
      if (startDist > 0) {
        scale = Math.min(5, Math.max(1, startScale * (d / startDist)));
        apply(0);
      }
    } else if (panning && scale > 1.02) {
      tx = e.clientX - startX;
      ty = e.clientY - startY;
      apply(0);
    }
  });

  function release (e) {
    pointers.delete(e.pointerId);

    const dx = e.clientX - downX;
    const dy = e.clientY - downY;
    if (Math.hypot(dx, dy) > 8) dragged = true;

    /* an un-zoomed one-finger flick browses the set */
    if (panning && scale <= 1.02 && pointers.size === 0 &&
        Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? next() : prev();
    }
    if (pointers.size < 2) startDist = 0;
    if (pointers.size === 0) {
      panning = false;
      if (scale <= 1.02) reset(.35);
      else {
        /* keep the photo from being dragged off screen */
        const lim = (scale - 1) * img.clientWidth / 2;
        const limY = (scale - 1) * img.clientHeight / 2;
        tx = Math.max(-lim, Math.min(lim, tx));
        ty = Math.max(-limY, Math.min(limY, ty));
        apply(.3);
      }
    }
  }
  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', release);

  /* desktop wheel zoom */
  canvas.addEventListener('wheel', e => {
    if (!vw.classList.contains('is-open')) return;
    e.preventDefault();
    scale = Math.min(5, Math.max(1, scale - e.deltaY * .0016));
    if (scale === 1) { tx = 0; ty = 0; }
    apply(0);
  }, { passive: false });

  /* openers */
  document.addEventListener('click', e => {
    const still = e.target.closest && e.target.closest('.still');
    if (still) openViewer(parseInt(still.getAttribute('data-i'), 10) || 0);
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const still = document.activeElement && document.activeElement.closest
                ? document.activeElement.closest('.still') : null;
    if (still) { e.preventDefault(); openViewer(parseInt(still.getAttribute('data-i'), 10) || 0); }
  });
}


/* ═════════════════════════════════════════════════════════ 10 · BUTTONS ═══ */

function initButtons () {
  /* a shimmer crosses the gold every six seconds */
  if (ANIMATE) {
    $$('.btn__shine').forEach(sh => {
      gsap.fromTo(sh, { xPercent: -260 }, {
        xPercent: 460, duration: 1.15, ease: 'power2.inOut',
        repeat: -1, repeatDelay: 6, delay: 2
      });
    });
  }

  /* and a ripple where the finger lands */
  $$('.btn').forEach(btn => {
    btn.addEventListener('pointerdown', e => {
      const r = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2.2;
      const dot = document.createElement('span');
      dot.className = 'btn__ripple';
      dot.style.width = dot.style.height = size + 'px';
      dot.style.left = (e.clientX - r.left) + 'px';
      dot.style.top  = (e.clientY - r.top) + 'px';
      btn.appendChild(dot);
      if (ANIMATE) {
        gsap.fromTo(dot, { scale: 0, opacity: .55 },
          { scale: 1, opacity: 0, duration: .7, ease: 'power2.out',
            onComplete: () => dot.remove() });
      } else setTimeout(() => dot.remove(), 400);
    });
  });
}


/* ═══════════════════════════════════════════════════════════ 11 · MUSIC ═══ */

function initMusic () {
  const btn   = $('#musicBtn');
  const audio = $('#bgAudio');
  const src   = CFG.footer && CFG.footer.music;
  if (!btn || !audio || !src) return;

  /* Only offer the control once we know the file is really there — a dead
     button is worse than no button. */
  audio.src = src;
  audio.volume = 0;
  audio.addEventListener('canplaythrough', () => { btn.hidden = false; }, { once: true });
  audio.addEventListener('error', () => { btn.hidden = true; });
  try { audio.load(); } catch (e) { btn.hidden = true; }

  let playing = false;
  btn.addEventListener('click', () => {
    if (playing) {
      if (HAS_GSAP) gsap.to(audio, { volume: 0, duration: .6, onComplete: () => audio.pause() });
      else { audio.pause(); }
      btn.classList.remove('is-playing');
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-label', 'Play background music');
      playing = false;
    } else {
      const p = audio.play();
      if (p && p.catch) p.catch(() => {});
      if (HAS_GSAP) gsap.to(audio, { volume: .45, duration: 1.1 });
      else audio.volume = .45;
      btn.classList.add('is-playing');
      btn.setAttribute('aria-pressed', 'true');
      btn.setAttribute('aria-label', 'Pause background music');
      playing = true;
    }
  });
}


/* ══════════════════════════════════════════════════════ 12 · ATMOSPHERE ═══ */
/* Dust motes on a single canvas — one draw call per frame, DPR capped,
   parked whenever the tab is hidden. */

function initDust () {
  const cv = $('#dust');
  if (!cv || !ANIMATE) { if (cv) cv.style.display = 'none'; return; }

  const ctx = cv.getContext('2d', { alpha: true });
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0, h = 0, motes = [];

  function size () {
    w = window.innerWidth; h = window.innerHeight;
    cv.width  = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
    cv.style.width  = w + 'px';
    cv.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const n = Math.min(58, Math.round((w * h) / 19000));
    motes = [];
    for (let i = 0; i < n; i++) {
      motes.push({
        x: seeded(i) * w,
        y: seeded(i + 100) * h,
        r: .6 + seeded(i + 200) * 1.7,
        vy: -(.045 + seeded(i + 300) * .11),
        vx: (seeded(i + 400) - .5) * .07,
        a: .12 + seeded(i + 500) * .3,
        p: seeded(i + 600) * Math.PI * 2
      });
    }
  }

  function draw () {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < motes.length; i++) {
      const m = motes[i];
      m.y += m.vy;
      m.p += .006;
      m.x += m.vx + Math.sin(m.p) * .12;
      if (m.y < -6) { m.y = h + 6; m.x = seeded(i + Date.now() % 97) * w; }
      if (m.x < -6) m.x = w + 6;
      if (m.x > w + 6) m.x = -6;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r, 0, 6.2832);
      ctx.fillStyle = 'rgba(212,182,126,' + (m.a * (.6 + Math.sin(m.p) * .4)) + ')';
      ctx.fill();
    }
  }

  size();
  let onW = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth === onW && Math.abs(cv.height / dpr - window.innerHeight) < 140) return;
    onW = window.innerWidth; size();
  }, { passive: true });

  gsap.ticker.add(draw);
  document.addEventListener('visibilitychange', () => {
    document.hidden ? gsap.ticker.remove(draw) : gsap.ticker.add(draw);
  });
}


/* ════════════════════════════════════════════════════════════════ START ═══ */

function start () {
  try {
    initScroll();
    splitAll();

    const cd = buildCountdown();
    runCountdown(cd);

    initViewer();
    runCinema();
    initButtons();
    initMusic();

    if (ANIMATE) {
      parallaxSections();
      sectionAnimations();
      ambientLoops();
      initDust();
      heroTimeline();
      ScrollTrigger.refresh();

      /* Safety net: anything wearing .reveal that no timeline ever claimed
         still has an empty inline opacity. Nothing may stay invisible. */
      setTimeout(() => {
        $$('.reveal').forEach(el => {
          if (!el.style.opacity) gsap.set(el, { opacity: 1, y: 0 });
        });
      }, 2500);
    } else {
      showEverything();
    }
  } catch (err) {
    /* Better a still invitation than a broken one. */
    if (window.console) console.error('[invitation]', err);
    showEverything();
  }
}

function boot () {
  try {
    paintContent();
    buildGallery();
  } catch (err) {
    if (window.console) console.error('[invitation]', err);
  }
  preload(start);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

})();
