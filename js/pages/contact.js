/* ============================================================
   STRUM & SOUL — Contact Page JavaScript
   js/pages/contact.js  |  Only loaded on contact.html (defer)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Subject tabs ────────────────────────────────────────── */
  const subjectTabs  = document.querySelectorAll('.subject-tab');
  const hiddenSubject = document.getElementById('formSubjectHidden');

  subjectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      subjectTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (hiddenSubject) hiddenSubject.value = tab.dataset.subject;

      // Optional: change form panel accent based on topic
      const panel = document.querySelector('.contact-form-panel');
      if (panel) {
        panel.dataset.topic = tab.dataset.topic || '';
      }
    });
  });

  /* ── Floating label — fix select elements ──────────────── */
  // Select elements don't support :placeholder-shown trick
  document.querySelectorAll('.fl-select').forEach(sel => {
    sel.addEventListener('change', () => {
      sel.classList.toggle('has-value', sel.value !== '');
    });
  });

  /* ── Char counter on message textarea ───────────────────── */
  const msgArea = document.getElementById('contactMessage');
  const charOut = document.getElementById('charCount');
  const MAX_CHARS = 800;

  if (msgArea && charOut) {
    const update = () => {
      const len = msgArea.value.length;
      charOut.textContent = `${len} / ${MAX_CHARS}`;
      charOut.parentElement.classList.toggle('warn', len > MAX_CHARS * 0.85);
    };
    msgArea.addEventListener('input', update);
    update();
  }

  /* ── Form submission (Web3Forms) ─────────────────────────── */
  const form    = document.getElementById('contactMainForm');
  const formWrap = document.getElementById('formWrap');
  const success = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();

      const btn  = form.querySelector('.contact-submit');
      const orig = btn.innerHTML;

      // Loading state
      btn.classList.add('loading');
      btn.innerHTML = '<span>⏳ Sending your message…</span>';

      try {
        const res  = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: new FormData(form)
        });
        const data = await res.json();

        if (data.success) {
          // Swap to success state
          if (formWrap) formWrap.style.display = 'none';
          if (success)  success.classList.add('show');
          // Scroll success into view
          success?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          throw new Error('Web3Forms returned failure');
        }
      } catch (err) {
        console.error(err);
        alert('Something went wrong. Please call us directly at +91 98765 43210 or WhatsApp us.');
        btn.innerHTML = orig;
        btn.classList.remove('loading');
      }
    });
  }

  /* ── "Send another" button resets the form ──────────────── */
  const resetBtn = document.getElementById('resetForm');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (form)     form.reset();
      if (formWrap) formWrap.style.display = '';
      if (success)  success.classList.remove('show');
      // Reset subject tab
      subjectTabs.forEach((t, i) => t.classList.toggle('active', i === 0));
      if (hiddenSubject) hiddenSubject.value = subjectTabs[0]?.dataset.subject || '';
    });
  }

});
