/* =============================================================
   Venkatraman Rajaram — Portfolio scripts
   - Sticky nav state on scroll
   - Mobile menu toggle
   - Reveal-on-scroll
   - Animated counters
   - Subtle 3D tilt on .tilt cards
   - Active section link highlighting
   - Footer year
   ============================================================= */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Nav: scrolled state + active link + mobile toggle ---------- */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelectorAll('.nav-links a');

  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 16);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.counter');
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target || '0');
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const v = target * ease(p);
      el.textContent = (Number.isInteger(target) ? Math.round(v) : v.toFixed(1)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          // mark parent metric card so the bar animates
          const metric = e.target.closest('.metric');
          if (metric) metric.classList.add('in-view');
          animateCounter(e.target);
          cio.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => cio.observe(c));
  } else {
    counters.forEach(c => {
      const metric = c.closest('.metric');
      if (metric) metric.classList.add('in-view');
      c.textContent = (c.dataset.target || '0') + (c.dataset.suffix || '');
    });
  }

  /* ---------- 3D tilt on cards (pointer only, light-touch) ---------- */
  const tiltEls = document.querySelectorAll('.tilt');
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (isFinePointer && !prefersReducedMotion) {
    tiltEls.forEach((el) => {
      let rect = null;
      let raf = null;
      const max = 6; // max degrees

      const onEnter = () => { rect = el.getBoundingClientRect(); el.style.transition = 'transform .12s ease-out'; };
      const onLeave = () => {
        if (raf) cancelAnimationFrame(raf);
        el.style.transition = 'transform .35s cubic-bezier(.22,.61,.36,1)';
        el.style.transform = '';
      };
      const onMove = (e) => {
        if (!rect) rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - y) * max * 2;
        const ry = (x - 0.5) * max * 2;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(0)`;
        });
      };

      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
    });
  }

  /* ---------- Active nav link highlighting ---------- */
  const sections = ['about', 'skills', 'experience', 'projects', 'achievements', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const setActive = (id) => {
      navLinks.forEach(a => {
        const match = a.getAttribute('href') === '#' + id;
        a.classList.toggle('is-active', match);
      });
    };
    const sio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(s => sio.observe(s));
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
