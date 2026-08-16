document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id'), 10);
  const product = (typeof PRODUCTS !== 'undefined') ? PRODUCTS.find(p => p.id === id) : null;

  const detailEl = document.getElementById('productDetail');
  const breadcrumbEl = document.getElementById('breadcrumb');
  const relatedWrap = document.getElementById('related-wrap');

  if (!product) {
    detailEl.innerHTML = `
      <div class="pd-not-found">
        <h1>Produit introuvable</h1>
        <p>Cette pièce n&rsquo;existe pas ou n&rsquo;est plus disponible.</p>
        <a href="index.html#nouveautes" class="btn btn-fill">Retour à la boutique</a>
      </div>`;
    if (relatedWrap) relatedWrap.style.display = 'none';
    return;
  }

  document.getElementById('pageTitle').textContent = `${product.name} — Maison Eva`;

  breadcrumbEl.innerHTML = `
    <a href="index.html#top">Accueil</a> /
    <a href="boutique.html">Boutique</a> /
    <a href="boutique.html?cat=${encodeURIComponent(product.cat)}">${product.cat}</a> /
    <span>${product.name}</span>`;

  const g = GARMENTS[product.garment];
  const swatchesHTML = product.swatches.map((c, i) =>
    `<span class="swatch pd-swatch${i === 0 ? ' active' : ''}" style="background:${c}"></span>`
  ).join('');
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const sizesHTML = sizes.map((s, i) =>
    `<button class="size-pill${i === 2 ? ' active' : ''}">${s}</button>`
  ).join('');

  detailEl.innerHTML = `
    <div class="pd-gallery">
      <div class="pd-media">
        <div class="ph pd-view-front">${g.front}</div>
        <div class="ph pd-view-back" style="display:none;">${g.back}</div>
      </div>
      <div class="pd-thumbs">
        <button class="pd-thumb active" data-view="front">Face</button>
        <button class="pd-thumb" data-view="back">Dos</button>
      </div>
    </div>
    <div class="pd-info">
      ${product.badge ? `<span class="product-badge" style="position:static;display:inline-block;margin-bottom:14px;">${product.badge}</span>` : ''}
      <div class="pd-title-row">
        <div>
          <span class="eyebrow">${product.cat}</span>
          <h1>${product.name}</h1>
        </div>
        <button class="wishlist-btn pd-wishlist" data-id="${product.id}" aria-label="Ajouter aux favoris">♡</button>
      </div>
      <span class="pd-price">${product.price}€</span>
      <p class="pd-desc">${product.desc}</p>

      <div class="pd-block">
        <span class="pd-label">Coloris</span>
        <div class="swatches pd-swatches">${swatchesHTML}</div>
      </div>

      <div class="pd-block">
        <span class="pd-label">Taille</span>
        <div class="size-pills">${sizesHTML}</div>
      </div>

      <div class="pd-qty-row">
        <div class="qty-stepper">
          <button type="button" data-step="-1" aria-label="Diminuer la quantité">−</button>
          <span id="qtyValue">1</span>
          <button type="button" data-step="1" aria-label="Augmenter la quantité">+</button>
        </div>
        <button type="button" class="btn btn-fill pd-add">Ajouter au panier</button>
      </div>

      <div class="pd-accordions">
        <details class="pd-accordion" open>
          <summary>Composition &amp; entretien</summary>
          <p>${product.composition}</p>
        </details>
        <details class="pd-accordion">
          <summary>Livraison &amp; retours</summary>
          <p>Livraison offerte dès 150€ d&rsquo;achat. Retours gratuits sous 30 jours, pièces non portées avec étiquette.</p>
        </details>
      </div>
    </div>`;

  /* Wishlist heart on the product page itself — reuses the same
     delegated click handler in main.js (matches on .wishlist-btn +
     data-id), this just sets the correct initial state on render. */
  const pdWishlistBtn = detailEl.querySelector('.pd-wishlist');
  if (pdWishlistBtn && typeof WishlistStore !== 'undefined' && WishlistStore.has(product.id)) {
    pdWishlistBtn.classList.add('active');
    pdWishlistBtn.textContent = '♥';
  }

  /* Face / Dos toggle */
  const front = detailEl.querySelector('.pd-view-front');
  const back = detailEl.querySelector('.pd-view-back');
  detailEl.querySelectorAll('.pd-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      detailEl.querySelectorAll('.pd-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const showBack = thumb.dataset.view === 'back';
      front.style.display = showBack ? 'none' : 'flex';
      back.style.display = showBack ? 'flex' : 'none';
    });
  });

  /* Color swatch selection */
  let selectedColor = product.swatches[0];
  detailEl.querySelectorAll('.pd-swatch').forEach(sw => {
    sw.addEventListener('click', () => {
      detailEl.querySelectorAll('.pd-swatch').forEach(s => s.classList.remove('active'));
      sw.classList.add('active');
      selectedColor = sw.style.background;
    });
  });

  /* Size selection */
  let selectedSize = sizes[2];
  detailEl.querySelectorAll('.size-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      detailEl.querySelectorAll('.size-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedSize = pill.textContent;
    });
  });

  /* Quantity stepper */
  const qtyValue = detailEl.querySelector('#qtyValue');
  let qty = 1;
  detailEl.querySelectorAll('[data-step]').forEach(btn => {
    btn.addEventListener('click', () => {
      qty = Math.max(1, qty + parseInt(btn.dataset.step, 10));
      qtyValue.textContent = qty;
    });
  });

  /* Add to cart — persisted via CartStore (localStorage); the header
     badge updates itself through the 'cart:change' event. */
  const addBtn = detailEl.querySelector('.pd-add');
  addBtn.addEventListener('click', () => {
    if (typeof CartStore !== 'undefined') {
      CartStore.add(product.id, qty, selectedSize, selectedColor);
    }
    const original = addBtn.textContent;
    addBtn.textContent = 'Ajouté ✓';
    setTimeout(() => { addBtn.textContent = original; }, 1800);
  });

  /* Related products: any 4 others from the catalog */
  const relatedGrid = document.getElementById('relatedGrid');
  if (relatedGrid && typeof productCardHTML === 'function') {
    const others = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);
    relatedGrid.innerHTML = others.map(productCardHTML).join('');
  }
});
