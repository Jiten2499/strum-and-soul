/* ============================================================
   STRUM & SOUL — Services Page JavaScript
   js/pages/services.js  |  Only loaded on services.html (defer)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Hero background load ─────────────────────────────── */
  const heroBg = document.getElementById('svcHeroBg');
  if (heroBg) setTimeout(() => heroBg.classList.add('loaded'), 100);

  /* ── Sticky service pill nav scroll-spy ──────────────── */
  const pills    = document.querySelectorAll('.svc-pill');
  const sections = document.querySelectorAll('.svc-section[data-service]');

  function updateActivePill() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 180) current = sec.dataset.service;
    });
    pills.forEach(p => p.classList.toggle('active', p.dataset.target === current));
  }
  window.addEventListener('scroll', updateActivePill, { passive: true });
  updateActivePill();

  /* Pill click → smooth scroll to that section */
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const target = document.querySelector(`.svc-section[data-service="${pill.dataset.target}"]`);
      if (target) {
        const offset = target.getBoundingClientRect().top + window.scrollY - 140;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  /* ── Counter for pricing cards (quick re-use) ─────────── */
  // Already handled by main.js IntersectionObserver on [data-count]

});
