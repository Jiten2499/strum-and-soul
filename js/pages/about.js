/* ============================================================
   STRUM & SOUL — About Page JavaScript
   js/pages/about.js  |  Only loaded on about.html (defer)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Hero mosaic bg ─────────────────────────────────────── */
  const heroBg = document.getElementById('aboutHeroBg');
  if (heroBg) setTimeout(() => heroBg.classList.add('loaded'), 80);

  /* ── Instructor bio expand / collapse ─────────────────── */
  document.querySelectorAll('.instr-read-more').forEach(btn => {
    btn.addEventListener('click', () => {
      const bio     = btn.closest('.instructor-info').querySelector('.instructor-bio');
      const expanded = bio.classList.toggle('expanded');
      btn.textContent = expanded ? '↑ Read less' : 'Read full bio →';
    });
  });

  /* ── Timeline — drag to scroll ───────────────────────── */
  const tl = document.querySelector('.timeline-scroll');
  if (tl) {
    let isDown = false, startX, scrollLeft;

    tl.addEventListener('mousedown', e => {
      isDown = true; tl.style.cursor = 'grabbing';
      startX = e.pageX - tl.offsetLeft;
      scrollLeft = tl.scrollLeft;
    });
    tl.addEventListener('mouseleave',  () => { isDown = false; tl.style.cursor = 'grab'; });
    tl.addEventListener('mouseup',     () => { isDown = false; tl.style.cursor = 'grab'; });
    tl.addEventListener('mousemove', e => {
      if (!isDown) return; e.preventDefault();
      const x    = e.pageX - tl.offsetLeft;
      const walk = (x - startX) * 1.4;
      tl.scrollLeft = scrollLeft - walk;
    });
  }

});
