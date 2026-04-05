/* ============================================================
   STRUM & SOUL — Global JavaScript
   js/main.js  |  Loaded on every page (defer)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Body loaded (fade-in) ───────────────────────────────── */
  document.body.classList.add('loaded');

  /* ── Hero background parallax load ──────────────────────── */
  const heroBg = document.getElementById('heroBg');
  if (heroBg) setTimeout(() => heroBg.classList.add('loaded'), 100);

  /* ── Navbar scroll effect ────────────────────────────────── */
  const nav = document.getElementById('nav');
  const stb = document.getElementById('stb');

  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', scrollY > 50);
    if (stb) stb.classList.toggle('on', scrollY > 400);
    highlightNavLink();
  }, { passive: true });

  /* ── Mobile nav ──────────────────────────────────────────── */
  const toggle  = document.getElementById('navToggle');
  const mob     = document.getElementById('navMob');
  const navClose = document.getElementById('navClose');

  function closeMenu() {
    if (!toggle || !mob) return;
    toggle.classList.remove('open');
    mob.classList.remove('open');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && mob) {
    toggle.addEventListener('click', () => {
      const isOpen = mob.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
  if (navClose) navClose.addEventListener('click', closeMenu);
  if (mob) mob.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  /* ── Active nav link on scroll ───────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links .nav-a');

  function highlightNavLink() {
    let cur = '';
    sections.forEach(s => { if (scrollY >= s.offsetTop - 130) cur = s.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  }

  /* ── Scroll reveal ───────────────────────────────────────── */
  const revEls = document.querySelectorAll('.reveal, .reveal-l, .reveal-r');
  const revIO  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); revIO.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revEls.forEach(el => revIO.observe(el));

  /* ── Counter animation ───────────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  const cntIO    = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const dur    = 1600;
      const start  = performance.now();
      const tick   = now => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cntIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => cntIO.observe(el));

  /* ── Scroll to top ───────────────────────────────────────── */
  if (stb) stb.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── Smooth anchor scroll ────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

});
