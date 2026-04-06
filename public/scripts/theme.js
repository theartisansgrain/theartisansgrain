/**
 * Artisan's Grain — theme.js (public/scripts/theme.js)
 * Served statically. Mirrors src/scripts/theme.ts.
 */
(function () {
  'use strict';

  /* ── 1. MOBILE NAV ──────────────────────────────────────────────────── */
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('primary-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open');
    });
    document.addEventListener('click', e => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        toggle.focus();
      }
    });
  }

  /* ── 2. FAQ ACCORDION ───────────────────────────────────────────────── */
  document.querySelectorAll('.faq-wrap').forEach(wrap => {
    const items = wrap.querySelectorAll('.faq-item');
    items.forEach(item => {
      const btn    = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      if (!btn || !answer) return;
      answer.hidden = true;
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(sib => {
          sib.classList.remove('open');
          const b = sib.querySelector('.faq-question');
          const a = sib.querySelector('.faq-answer');
          if (b) b.setAttribute('aria-expanded', 'false');
          if (a) a.hidden = true;
        });
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
          answer.hidden = false;
        }
      });
    });
  });

  /* ── 3. FILTER PILLS ────────────────────────────────────────────────── */
  document.querySelectorAll('.sfb-pills .pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.sfb-pills .pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  /* ── 4. SUBJECT PILLS ───────────────────────────────────────────────── */
  document.querySelectorAll('.subject-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const group = pill.closest('.subject-pills');
      if (!group) return;
      group.querySelectorAll('.subject-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const orderRow = document.getElementById('order-num-row');
      if (orderRow) {
        const val = pill.textContent.trim();
        orderRow.style.display = ['Existing Order', 'Return / Repair'].includes(val) ? 'block' : 'none';
      }
    });
  });

  /* ── 5. CONTACT FORM ────────────────────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      const btn      = document.getElementById('contact-submit');
      const feedback = document.getElementById('contact-feedback');
      if (btn) {
        btn.disabled    = true;
        btn.textContent = 'Sending…';
      }
      await new Promise(r => setTimeout(r, 800));
      if (btn) { btn.textContent = "Message Sent — We'll Be in Touch Within 48 Hours"; btn.style.background = 'var(--brown-mid)'; }
      if (feedback) { feedback.textContent = "Thanks! We'll be in touch within 48 hours."; feedback.style.cssText = 'padding:14px 18px;background:rgba(39,174,96,.1);border-left:3px solid #27ae60;font-family:var(--font-sans);font-size:13px;color:#1a6b3a;margin-bottom:14px;'; }
      contactForm.reset();
    });
  }

  /* ── 6. COMMISSION FORM ─────────────────────────────────────────────── */
  const commissionForm = document.getElementById('commission-req');
  if (commissionForm) {
    commissionForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = commissionForm.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = "Request Sent — We'll Be in Touch Within 48 Hours"; btn.style.background = 'var(--brown-mid)'; }
    });
  }

  /* ── 7. WAITLIST FORMS ──────────────────────────────────────────────── */
  document.querySelectorAll('.waitlist-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = "You're on the list ✓"; btn.style.background = 'var(--brown-mid)'; }
      form.reset();
    });
  });

  /* ── 8. COLOUR SWATCHES ─────────────────────────────────────────────── */
  document.querySelectorAll('.sfb-swatches').forEach(group => {
    group.querySelectorAll('.colour-swatch').forEach(s => {
      s.addEventListener('click', () => {
        group.querySelectorAll('.colour-swatch').forEach(x => x.classList.remove('selected'));
        s.classList.toggle('selected');
      });
    });
  });

  /* ── 9. POLICY SIDEBAR SCROLL SPY ───────────────────────────────────── */
  const policyLinks = document.querySelectorAll('.policy-nav-link');
  if (policyLinks.length) {
    const sections = document.querySelectorAll('.policy-section[id]');
    if ('IntersectionObserver' in window && sections.length) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            policyLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
          }
        });
      }, { rootMargin: '-30% 0px -60% 0px' });
      sections.forEach(s => obs.observe(s));
    }
    policyLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        policyLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  /* ── 10. GIFT CARD AMOUNT SYNC ───────────────────────────────────────── */
  const previewAmounts = document.getElementById('preview-amounts');
  const formAmounts    = document.getElementById('form-amounts');
  const gcDisplay      = document.getElementById('gc-amount-display');
  const gcSubmitLabel  = document.getElementById('gc-submit-label');
  const customRow      = document.getElementById('custom-amount-row');

  if (previewAmounts && formAmounts) {
    function syncGcAmount(amt) {
      const display = amt === 'custom' ? 'Custom' : '$' + amt;
      if (gcDisplay)     gcDisplay.textContent    = display;
      if (gcSubmitLabel) gcSubmitLabel.textContent = display;
    }

    previewAmounts.querySelectorAll('.pill').forEach(btn => {
      btn.addEventListener('click', () => {
        previewAmounts.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        syncGcAmount(btn.dataset.amount);
        formAmounts.querySelectorAll('.pill').forEach(b => {
          b.classList.toggle('selected', b.dataset.amount === btn.dataset.amount);
        });
      });
    });

    formAmounts.querySelectorAll('.pill').forEach(btn => {
      btn.addEventListener('click', () => {
        formAmounts.querySelectorAll('.pill').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        const amt = btn.dataset.amount;
        if (customRow) customRow.style.display = amt === 'custom' ? 'flex' : 'none';
        syncGcAmount(amt);
        previewAmounts.querySelectorAll('.pill').forEach(b => {
          b.classList.toggle('active', b.dataset.amount === amt);
        });
      });
    });
  }

})();
