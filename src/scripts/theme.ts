/**
 * Artisan's Grain — theme.ts
 * Compiled to public/scripts/theme.js at build time.
 * Handles: mobile nav, FAQ accordion, contact/commission forms,
 *          filter pills, colour swatches, waitlist, gift card picker.
 */

(function () {
  'use strict';

  /* ── 1. MOBILE NAV ──────────────────────────────────────────────────── */
  const toggle = document.getElementById('nav-toggle') as HTMLButtonElement | null;
  const menu   = document.getElementById('primary-menu') as HTMLUListElement | null;

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target as Node) && !menu.contains(e.target as Node)) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        toggle.focus();
      }
    });
  }

  /* ── 2. FAQ ACCORDION ───────────────────────────────────────────────── */
  function initFaq(root: Document | Element) {
    root.querySelectorAll<HTMLElement>('.faq-wrap').forEach(wrap => {
      const items = wrap.querySelectorAll<HTMLElement>('.faq-item');
      items.forEach(item => {
        const btn    = item.querySelector<HTMLButtonElement>('.faq-question');
        const answer = item.querySelector<HTMLElement>('.faq-answer');
        if (!btn || !answer) return;

        // Start collapsed
        answer.hidden = true;

        btn.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          // Close all
          items.forEach(sib => {
            sib.classList.remove('open');
            const sibBtn = sib.querySelector<HTMLButtonElement>('.faq-question');
            const sibAns = sib.querySelector<HTMLElement>('.faq-answer');
            if (sibBtn) sibBtn.setAttribute('aria-expanded', 'false');
            if (sibAns) sibAns.hidden = true;
          });
          // Open clicked
          if (!isOpen) {
            item.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
            answer.hidden = false;
          }
        });
      });
    });
  }

  initFaq(document);

  /* ── 3. FILTER PILLS (shop page) ────────────────────────────────────── */
  document.querySelectorAll<HTMLButtonElement>('.sfb-pills .pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll<HTMLButtonElement>('.sfb-pills .pill')
        .forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  /* ── 4. SUBJECT PILLS (contact / commission forms) ──────────────────── */
  document.querySelectorAll<HTMLElement>('.subject-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const group = pill.closest<HTMLElement>('.subject-pills');
      if (!group) return;
      group.querySelectorAll<HTMLElement>('.subject-pill')
        .forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      // Show order number row when relevant
      const orderRow = document.getElementById('order-num-row');
      if (orderRow) {
        const val = pill.textContent?.trim() ?? '';
        orderRow.style.display = ['Existing Order','Return / Repair'].includes(val) ? 'block' : 'none';
      }
    });
  });

  /* ── 5. CONTACT FORM ────────────────────────────────────────────────── */
  const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn      = document.getElementById('contact-submit') as HTMLButtonElement;
      const feedback = document.getElementById('contact-feedback');
      const fd       = new FormData(contactForm);

      btn.disabled    = true;
      btn.textContent = 'Sending…';

      // Build name from first + last
      const first = (fd.get('first_name') as string ?? '').trim();
      const last  = (fd.get('last_name')  as string ?? '').trim();
      const subject = document.querySelector<HTMLElement>('.subject-pill.active')?.textContent?.trim() ?? 'General';

      // In production: POST to your API endpoint / serverless function
      // For now we simulate success after a short delay
      await new Promise(r => setTimeout(r, 800));

      btn.textContent    = "Message Sent — We'll Be in Touch Within 48 Hours";
      btn.style.background = 'var(--brown-mid)';
      if (feedback) {
        feedback.textContent = "Thanks! We'll be in touch within 48 hours.";
        feedback.style.cssText = 'padding:14px 18px;background:rgba(39,174,96,.1);border-left:3px solid #27ae60;font-family:var(--font-sans);font-size:13px;color:#1a6b3a;margin-bottom:14px;';
      }
      contactForm.reset();
    });
  }

  /* ── 6. COMMISSION FORM ─────────────────────────────────────────────── */
  const commissionForm = document.getElementById('commission-req') as HTMLFormElement | null;
  if (commissionForm) {
    commissionForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = commissionForm.querySelector<HTMLButtonElement>('[type="submit"]');
      if (!btn) return;
      btn.disabled    = true;
      btn.textContent = "Request Sent — We'll Be in Touch Within 48 Hours";
      btn.style.background = 'var(--brown-mid)';
    });
  }

  /* ── 7. WAITLIST FORMS ──────────────────────────────────────────────── */
  document.querySelectorAll<HTMLFormElement>('.waitlist-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector<HTMLButtonElement>('[type="submit"]');
      if (!btn) return;
      btn.disabled    = true;
      btn.textContent = "You're on the list ✓";
      btn.style.background = 'var(--brown-mid)';
      form.reset();
    });
  });

  /* ── 8. COLOUR SWATCHES ─────────────────────────────────────────────── */
  document.querySelectorAll<HTMLElement>('.sfb-swatches').forEach(group => {
    group.querySelectorAll<HTMLButtonElement>('.colour-swatch').forEach(s => {
      s.addEventListener('click', () => {
        group.querySelectorAll<HTMLButtonElement>('.colour-swatch')
          .forEach(x => x.classList.remove('selected'));
        s.classList.toggle('selected');
      });
    });
  });

  /* ── 9. POLICY SIDEBAR SCROLL SPY ───────────────────────────────────── */
  const policyLinks = document.querySelectorAll<HTMLAnchorElement>('.policy-nav-link');
  if (policyLinks.length) {
    const sections = document.querySelectorAll<HTMLElement>('.policy-section[id]');

    if ('IntersectionObserver' in window && sections.length) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            policyLinks.forEach(l => {
              l.classList.toggle('active', l.getAttribute('href') === `#${entry.target.id}`);
            });
          }
        });
      }, { rootMargin: '-30% 0px -60% 0px' });
      sections.forEach(s => obs.observe(s));
    }

    policyLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector<HTMLElement>(link.getAttribute('href') ?? '');
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        policyLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

})();
