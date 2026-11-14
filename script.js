/* ==========================================================
   CONFIG
   ========================================================== */
const STEAM_URL = 'https://store.steampowered.com/app/4212480/Ragnarok_The_New_World/';

/* Official Steam screenshots (1920x1080) — stored in assets/images/screenshots/ */
const STEAM_SHOTS = Array.from({ length: 11 }, (_, i) => `assets/images/screenshots/ss-${String(i + 1).padStart(2, '0')}.jpg`);

/* ==========================================================
   FEATURES COVERFLOW — arrows, dots, click side card, swipe, keys, autoplay
   ========================================================== */
(function () {
  const stage = document.getElementById('xpStage');
  const cards = [...stage.querySelectorAll('.xcard')];
  const dots = [...document.querySelectorAll('.xp__dots .xp__dot')];
  const n = cards.length, DUR = 6000;
  let active = 1, timer = null, hover = false, inView = false;   // start on the middle card, like the mockup

  function render() {
    cards.forEach((c, i) => {
      let d = i - active;
      if (d > n / 2) d -= n; if (d < -n / 2) d += n;          // loop: -1, 0, 1
      c.dataset.pos = d;
      c.setAttribute('aria-hidden', d !== 0);
      c.querySelector('.xcard__go').tabIndex = d === 0 ? 0 : -1;
    });
    dots.forEach((b, i) => { b.classList.toggle('is-active', i === active); b.setAttribute('aria-selected', i === active); });
  }
  function go(i, source) {
    active = (i + n) % n; render(); schedule();
    if (source) track('feature_slider_interaction', { action: source, slide: active + 1 });
  }
  function schedule() {
    clearTimeout(timer);
    if (!hover && inView && !document.hidden) timer = setTimeout(() => go(active + 1), DUR);
  }

  document.getElementById('xpPrev').addEventListener('click', e => { e.stopPropagation(); go(active - 1, 'arrow_prev'); });
  document.getElementById('xpNext').addEventListener('click', e => { e.stopPropagation(); go(active + 1, 'arrow_next'); });
  dots.forEach(b => b.addEventListener('click', () => go(+b.dataset.i, 'dot')));
  cards.forEach(c => c.addEventListener('click', () => { if (c.dataset.pos !== '0') go(+c.dataset.i, 'card_click'); }));
  stage.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1, 'keyboard'); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); go(active - 1, 'keyboard'); }
  });

  /* swipe / drag (pointer events = touch + mouse) */
  let x0 = null;
  stage.addEventListener('pointerdown', e => { if (e.target.closest('button,a')) return; x0 = e.clientX; });
  addEventListener('pointerup', e => {
    if (x0 === null) return;
    const dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 45) go(active + (dx < 0 ? 1 : -1), 'swipe');
  });

  /* autoplay: only when visible, pauses on hover/focus and hidden tab */
  stage.addEventListener('mouseenter', () => { hover = true; schedule(); });
  stage.addEventListener('mouseleave', () => { hover = false; schedule(); });
  stage.addEventListener('focusin', () => { hover = true; schedule(); });
  stage.addEventListener('focusout', () => { hover = false; schedule(); });
  document.addEventListener('visibilitychange', schedule);
  new IntersectionObserver(([e]) => { inView = e.isIntersecting && !matchMedia('(prefers-reduced-motion: reduce)').matches; schedule(); }, { threshold: .4 }).observe(stage);
  render();
})();

/* Gallery tiles — swap the `shot` index to match each category with the best screenshot */
const GALLERY = [
  { cls:'t1', shot:0, title:'Open World Exploration', text:'Panoramic landscapes across a seamless Midgard.' },
  { cls:'t2', shot:1, title:'Fly and Travel',          text:'Take to the skies and ride tamed MVP mounts.' },
  { cls:'t3', shot:2, title:'Magic & Combat',          text:'Skills, spells and spectacular battles.' },
  { cls:'t4', shot:3, title:'A World Full of Life',    text:'Characters, monsters and adventures with friends.' }
];

/* ==========================================================
   TRACKING — sends to Meta Pixel, GA4 and GTM (if installed)
   NOTE: these are funnel events, NOT conversions.
   The real conversion (FIRST LOGIN) must come from the
   publisher's SDK / attribution partner / server postback.
   ========================================================== */
function track(event, params = {}) {
  const payload = { ...params, page: 'rag_tnw_sea_pc' };
  (window.dataLayer = window.dataLayer || []).push({ event, ...payload });     // GTM
  if (typeof window.gtag === 'function') gtag('event', event, payload);        // GA4
  if (typeof window.fbq === 'function') fbq('trackCustom', event, payload);    // Meta
}
track('landing_page_view');

/* UTM passthrough → Steam (Steam UTM Analytics reads utm_* on store links) */
(function () {
  const src = new URLSearchParams(location.search);
  const keys = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'];
  const utm = new URLSearchParams();
  keys.forEach(k => src.get(k) && utm.set(k, src.get(k)));
  if (!utm.has('utm_source')) utm.set('utm_source', 'landing');
  if (!utm.has('utm_campaign')) utm.set('utm_campaign', 'stage_rag_01');
  document.querySelectorAll('.js-steam').forEach(a => {
    const u = new URL(STEAM_URL);
    utm.forEach((v, k) => u.searchParams.set(k, v));
    a.href = u.toString();
    a.addEventListener('click', () => {
      const pos = a.dataset.cta;
      if (pos === 'hero') track('hero_cta_click', { cta_position: pos });
      if (pos === 'final') track('final_cta_click', { cta_position: pos });
      track('steam_outbound_click', { cta_position: pos });
    });
  });
})();

/* Hero video: load only on desktop + no data-saver; poster fallback otherwise */
(function () {
  const v = document.getElementById('heroVideo');
  const slow = navigator.connection && (navigator.connection.saveData || /2g/.test(navigator.connection.effectiveType || ''));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (innerWidth < 760 || slow || reduce) return;
  v.src = v.dataset.src;
  v.play().catch(() => {});
  v.addEventListener('error', () => v.removeAttribute('src')); // keep poster if the file fails
})();

/* Nav state + mobile sticky CTA */
const nav = document.getElementById('nav'), mcta = document.getElementById('mcta');
const hero = document.getElementById('hero'), finalSec = document.getElementById('play');
let finalVisible = false;
function onScroll() {
  nav.classList.toggle('is-scrolled', scrollY > 60);
  const pastHero = scrollY > hero.offsetHeight * 0.75;
  mcta.classList.toggle('is-visible', pastHero && !finalVisible);
}
addEventListener('scroll', onScroll, { passive: true }); onScroll();
new IntersectionObserver(([e]) => { finalVisible = e.isIntersecting; onScroll(); }, { threshold: .25 }).observe(finalSec);

/* Reveal on scroll */
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => { if (!el.closest('.hero')) io.observe(el); });

/* feature_section_view (fires once) */
new IntersectionObserver(([e], obs) => {
  if (e.isIntersecting) { track('feature_section_view'); obs.disconnect(); }
}, { threshold: .3 }).observe(document.getElementById('features'));

/* Modals */
function openModal(m) { m.classList.add('is-open'); document.body.style.overflow = 'hidden'; m.querySelector('[data-close]').focus(); }
function closeModal(m) { m.classList.remove('is-open'); document.body.style.overflow = ''; const v = m.querySelector('video'); if (v) v.pause(); }
document.querySelectorAll('.modal').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m || e.target.hasAttribute('data-close')) closeModal(m); });
});
addEventListener('keydown', e => {
  const open = document.querySelector('.modal.is-open'); if (!open) return;
  if (e.key === 'Escape') closeModal(open);
  if (open.id === 'lightbox' && e.key === 'ArrowRight') step(1);
  if (open.id === 'lightbox' && e.key === 'ArrowLeft') step(-1);
});

/* Gameplay video */
const vModal = document.getElementById('videoModal'), mVideo = document.getElementById('modalVideo');
document.querySelectorAll('.js-gameplay').forEach(b => b.addEventListener('click', () => {
  if (mVideo.src !== b.dataset.src) mVideo.src = b.dataset.src;
  openModal(vModal); mVideo.play().catch(() => {});
  track('gameplay_video_play', { source: 'hero' });
}));

/* Gallery + lightbox */
const gal = document.getElementById('gallery');
gal.innerHTML = GALLERY.map((g, i) => `
  <button class="tile ${g.cls}" type="button" data-shot="${g.shot}" aria-label="Open screenshot: ${g.title}">
    <img loading="lazy" decoding="async" src="${STEAM_SHOTS[g.shot]}" alt="Ragnarok: The New World — ${g.title}" />
    <span class="tile__zoom" aria-hidden="true">⤢</span>
    <span class="tile__cap"><b>${g.title}</b><small>${g.text}</small></span>
  </button>`).join('');

const lb = document.getElementById('lightbox'), lbImg = document.getElementById('lbImg'), lbCount = document.getElementById('lbCount');
let cur = 0;
function show(i) {
  cur = (i + STEAM_SHOTS.length) % STEAM_SHOTS.length;
  lbImg.src = STEAM_SHOTS[cur];
  lbImg.alt = `Ragnarok: The New World screenshot ${cur + 1}`;
  lbCount.textContent = `${cur + 1} / ${STEAM_SHOTS.length}`;
}
function step(d) { show(cur + d); track('gallery_interaction', { action: 'navigate', index: cur }); }
gal.addEventListener('click', e => {
  const t = e.target.closest('.tile'); if (!t) return;
  show(+t.dataset.shot); openModal(lb);
  track('gallery_interaction', { action: 'open', index: +t.dataset.shot });
});
document.getElementById('openAllShots').addEventListener('click', () => { show(0); openModal(lb); track('gallery_interaction', { action: 'view_all' }); });
document.getElementById('lbPrev').onclick = () => step(-1);
document.getElementById('lbNext').onclick = () => step(1);
