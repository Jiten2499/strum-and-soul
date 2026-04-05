/* ============================================================
   STRUM & SOUL — Homepage JavaScript
   js/pages/index.js  |  Only loaded on index.html (defer)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── FAQ Accordion ───────────────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq').forEach(f => f.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
    q.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); q.click(); }
    });
  });

  /* ── Course Filter Tabs ──────────────────────────────────── */
  const tabs        = document.querySelectorAll('.tab');
  const courseCards = document.querySelectorAll('.course-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      courseCards.forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.cat === filter) ? '' : 'none';
      });
    });
  });

  /* ── Contact Form (Web3Forms) ────────────────────────────── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn  = form.querySelector('.submit-btn');
      const orig = btn.innerHTML;
      btn.innerHTML = '⏳ Sending…';
      btn.disabled  = true;
      try {
        const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(form) });
        const data = await res.json();
        if (data.success) {
          form.style.display = 'none';
          document.getElementById('formSuccess').classList.add('show');
        } else throw new Error('Submission failed');
      } catch {
        alert('Something went wrong. Please call us directly at +91 98765 43210');
        btn.innerHTML = orig;
        btn.disabled  = false;
      }
    });
  }

});
