const ATELIER_SVG = '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#5B4A3E" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><ellipse cx="100" cy="140" rx="36" ry="14"/><path d="M64,140 L64,110 Q64,96 100,96 Q136,96 136,110 L136,140"/><path d="M100,96 L100,40"/><ellipse cx="100" cy="34" rx="7" ry="10"/></svg>';

function productCardHTML(p) {
  const g = GARMENTS[p.garment];
  const badge = p.badge ? `<span class="product-badge">${p.badge}</span>` : '';
  const swatches = p.swatches.map(c => `<span class="swatch" style="background:${c}"></span>`).join('');
  const isFav = (typeof WishlistStore !== 'undefined') && WishlistStore.has(p.id);
  return `
    <a class="product-card" href="produit.html?id=${p.id}">
      <div class="product-media">
        ${badge}
        <button class="wishlist-btn${isFav ? ' active' : ''}" data-id="${p.id}" aria-label="Ajouter aux favoris">${isFav ? '♥' : '♡'}</button>
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

/* Header cart/wishlist count badges, kept in sync everywhere via the
   store's change events (e.g. adding to cart on produit.html updates
   the badge instantly without a page reload). */
function updateHeaderCounts() {
  if (typeof CartStore !== 'undefined') {
    document.querySelectorAll('.cart-count').forEach(el => { el.textContent = CartStore.count(); });
  }
  if (typeof WishlistStore !== 'undefined') {
    document.querySelectorAll('.wishlist-count').forEach(el => { el.textContent = WishlistStore.count(); });
  }
}
document.addEventListener('cart:change', updateHeaderCounts);
document.addEventListener('wishlist:change', updateHeaderCounts);

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
  updateHeaderCounts();

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

  /* Every mega-menu subcategory link points to the boutique filtered
     by its own label, so every button leads somewhere real instead of
     a dead "#" — including categories we don't stock yet, which the
     boutique page shows as an honest empty state rather than a
     broken link. Links with a real href (the "À la une" column) are
     left untouched. */
  document.querySelectorAll('.mega-col a[href="#"]').forEach(a => {
    const label = a.childNodes[0] && a.childNodes[0].nodeType === Node.TEXT_NODE
      ? a.childNodes[0].textContent.trim()
      : a.textContent.trim();
    a.href = `boutique.html?cat=${encodeURIComponent(label)}`;
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
     stop the click from also navigating. Persists via WishlistStore
     so it's still there on the next visit and on other pages. */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.wishlist-btn');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const id = parseInt(btn.dataset.id, 10);
    if (!id || typeof WishlistStore === 'undefined') return;
    WishlistStore.toggle(id);
    const active = WishlistStore.has(id);
    document.querySelectorAll(`.wishlist-btn[data-id="${id}"]`).forEach(b => {
      b.classList.toggle('active', active);
      b.textContent = active ? '♥' : '♡';
    });
  });

  /* Search overlay — built once and shared by every page. Filters
     PRODUCTS live by name/category/description as you type. */
  if (typeof PRODUCTS !== 'undefined' && !document.getElementById('searchOverlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'searchOverlay';
    overlay.className = 'search-overlay';
    overlay.innerHTML = `
      <div class="search-panel">
        <div class="search-bar">
          <span class="search-icon">⌕</span>
          <input type="text" id="searchInput" placeholder="Rechercher une pièce, une catégorie…" autocomplete="off">
          <button class="search-close" aria-label="Fermer la recherche">✕</button>
        </div>
        <div class="search-results" id="searchResults"></div>
      </div>`;
    document.body.appendChild(overlay);

    const input = overlay.querySelector('#searchInput');
    const results = overlay.querySelector('#searchResults');
    const closeBtn = overlay.querySelector('.search-close');

    function renderResults(query) {
      const q = query.trim().toLowerCase();
      if (!q) {
        results.innerHTML = '<p class="search-hint">Tape le nom d’une pièce ou d’une catégorie — par exemple « robe » ou « sac ».</p>';
        return;
      }
      const matches = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.cat.toLowerCase().includes(q) ||
        (p.desc && p.desc.toLowerCase().includes(q))
      );
      if (matches.length === 0) {
        results.innerHTML = `<p class="search-hint">Aucun résultat pour « ${query} ». Essaie un autre mot-clé, ou <a href="boutique.html">explore la boutique</a>.</p>`;
        return;
      }
      results.innerHTML = `<div class="product-grid">${matches.map(productCardHTML).join('')}</div>`;
    }

    function openSearch() {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      renderResults('');
      setTimeout(() => input.focus(), 50);
    }
    function closeSearch() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      input.value = '';
    }

    document.querySelectorAll('.search-trigger').forEach(btn => {
      btn.addEventListener('click', openSearch);
    });
    closeBtn.addEventListener('click', closeSearch);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeSearch();
    });
    input.addEventListener('input', () => renderResults(input.value));
  }

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
