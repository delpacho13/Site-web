const ATELIER_SVG = '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#5B4A3E" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><ellipse cx="100" cy="140" rx="36" ry="14"/><path d="M64,140 L64,110 Q64,96 100,96 Q136,96 136,110 L136,140"/><path d="M100,96 L100,40"/><ellipse cx="100" cy="34" rx="7" ry="10"/></svg>';

function productCardHTML(p) {
  const g = GARMENTS[p.garment];
  const badge = p.badge ? `<span class="product-badge">${p.badge}</span>` : '';
  const swatches = p.swatches.map(c => `<span class="swatch" style="background:${c}"></span>`).join('');
  return `
    <a class="product-card" href="produit.html?id=${p.id}">
      <div class="product-media">
        ${badge}
        <button class="wishlist-btn" aria-label="Ajouter aux favoris">♡</button>
        <div class="ph ph-front">${g.front}</div>
        <div class="ph ph-back">${g.back}</div>
      </div>
      <div class="product-info">
        <span class="p-cat">${p.cat}</span>
        <h3>${p.name}</h3>
        <span class="p-price">${p.price}€</span>
        <div class="swatches">${swatches}</div>
      </div>
    </a>`;
}

/* Renders the "Nouveautés" grid from PRODUCTS/GARMENTS (products.js),
   with the editorial photo tile inserted after the 6th product to
   match the asymmetric rhythm of the reference layout. */
function renderProductGrid() {
  const grid = document.getElementById('productGrid');
  if (!grid || typeof PRODUCTS === 'undefined') return;
  const editorialHTML = `
    <div class="product-card editorial-insert">
      <div class="ph ph-large">${ATELIER_SVG}</div>
      <span class="editorial-insert-caption">Maison Eva — Atelier Paris</span>
    </div>`;
  let html = '';
  PRODUCTS.forEach((p, i) => {
    html += productCardHTML(p);
    if (i === 5) html += editorialHTML;
  });
  grid.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {

  renderProductGrid();

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
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  /* Mega-menu: click-to-toggle for touch devices, alongside the CSS
     :hover/:focus-within behavior for pointer users. On mobile this
     trigger is hidden — a native <details> accordion takes over. */
  document.querySelectorAll('.nav-item').forEach(item => {
    const trigger = item.querySelector('.nav-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      item.classList.toggle('open');
    });
  });
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.nav-item.open').forEach(item => {
      if (!item.contains(e.target)) item.classList.remove('open');
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav-item.open').forEach(item => item.classList.remove('open'));
    }
  });

  /* Hero carousel — autoplay every 5s, pauses on hover, dots + click */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const carousel = document.querySelector('.hero-carousel');
  if (slides.length > 1) {
    let current = 0;
    let timer = null;

    function goTo(i) {
      slides[current].classList.remove('active');
      dots[current]?.classList.remove('active');
      current = i;
      slides[current].classList.add('active');
      dots[current]?.classList.add('active');
    }
    function next() { goTo((current + 1) % slides.length); }
    function start() { timer = setInterval(next, 5000); }
    function stop() { clearInterval(timer); }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i); stop(); start(); });
    });
    if (carousel) {
      carousel.addEventListener('mouseenter', stop);
      carousel.addEventListener('mouseleave', start);
    }
    start();
  }

  /* Wishlist heart toggle — delegated since product cards (and their
     hearts) are rendered dynamically by renderProductGrid() above.
     Product cards are now links to the product page, so this must
     stop the click from also navigating. */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.wishlist-btn');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    btn.classList.toggle('active');
    btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
  });

  /* Scroll reveal — anything already in view at load is shown instantly
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
  }, { threshold: 0.12 }) : null;

  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (!hasIO || rect.top < window.innerHeight * 0.92) {
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
        const original = btn.textContent;
        btn.textContent = 'Merci ✓';
        input.value = '';
        setTimeout(() => { btn.textContent = original; }, 2500);
      }
    });
  }

});
