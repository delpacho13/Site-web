/* Photo fallback: if a real photo fails to load, hide it so the on-brand
   gradient behind it (see .duo in style.css) shows through instead of a
   broken-image icon. 'error' doesn't bubble, so this needs capture. */
document.addEventListener('error', (e) => {
  if (e.target.tagName === 'IMG' && e.target.closest('.duo')) {
    e.target.classList.add('img-broken');
  }
}, true);

document.addEventListener('DOMContentLoaded', () => {

  /* Catch photos that already failed before the listener above was attached
     (this script tag loads after the images in document order). */
  document.querySelectorAll('.duo img').forEach(img => {
    if (img.complete && img.naturalWidth === 0) {
      img.classList.add('img-broken');
    }
  });

  /* Mobile nav toggle */
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const isOpen = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.textContent = isOpen ? '✕' : '☰';
    });
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  /* Collection tabs (produits.html) — run before scroll-reveal setup so the
     observer measures the final (post-filter) layout, not the unfiltered one. */
  const tabs = document.querySelectorAll('.tab-btn');
  const intros = document.querySelectorAll('.collection-intro');
  const products = document.querySelectorAll('.product-card');

  function activateCollection(key) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.key === key));
    intros.forEach(i => i.classList.toggle('active', i.dataset.key === key));
    products.forEach(p => {
      const match = key === 'all' || p.dataset.collection === key;
      p.classList.toggle('show', match);
    });
  }

  if (tabs.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => activateCollection(tab.dataset.key));
    });
    activateCollection(tabs[0].dataset.key);
  }

  /* Scroll reveal — anything already in view at load is shown immediately
     rather than waiting on the async observer callback; only elements
     below the fold animate in on scroll. */
  const revealEls = document.querySelectorAll('.reveal');
  const hasIO = 'IntersectionObserver' in window;
  const io = hasIO ? new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 }) : null;

  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (!hasIO || rect.top < window.innerHeight * 0.92) {
      /* Already in view at load: show final state instantly, no transition
         to wait on (avoids any flash-of-invisible-content on slow paints). */
      el.style.transition = 'none';
      el.classList.add('in');
    } else {
      io.observe(el);
    }
  });

  /* Newsletter form (front-end only) */
  const form = document.querySelector('.newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn = form.querySelector('button');
      if (input && input.value) {
        btn.textContent = 'Merci ! ✓';
        input.value = '';
        setTimeout(() => { btn.textContent = "S'inscrire"; }, 2500);
      }
    });
  }

});
