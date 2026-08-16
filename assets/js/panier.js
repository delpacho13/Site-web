document.addEventListener('DOMContentLoaded', () => {
  render();
  document.addEventListener('cart:change', render);

  function cartLineHTML(line) {
    const g = GARMENTS[line.product.garment];
    return `
      <div class="cart-line" data-index="${line.index}">
        <div class="cart-line-media ph">${g.front}</div>
        <div class="cart-line-info">
          <span class="p-cat">${line.product.cat}</span>
          <h3><a href="produit.html?id=${line.product.id}">${line.product.name}</a></h3>
          <div class="cart-line-meta">
            <span class="cart-swatch" style="background:${line.color || line.product.swatches[0]}"></span>
            <span>Taille ${line.size || 'M'}</span>
          </div>
        </div>
        <div class="qty-stepper cart-line-qty">
          <button type="button" data-step="-1" aria-label="Diminuer la quantité">−</button>
          <span>${line.qty}</span>
          <button type="button" data-step="1" aria-label="Augmenter la quantité">+</button>
        </div>
        <div class="cart-line-price">${(line.product.price * line.qty).toFixed(0)}€</div>
        <button class="cart-line-remove" aria-label="Retirer du panier">✕</button>
      </div>`;
  }

  function render() {
    const wrap = document.getElementById('cartWrap');
    if (!wrap || typeof CartStore === 'undefined') return;
    const lines = CartStore.lines();

    if (lines.length === 0) {
      wrap.innerHTML = `
        <div class="boutique-empty">
          <p>Ton panier est vide pour l&rsquo;instant.</p>
          <p>Découvre nos pièces et trouve celles qui te correspondent.</p>
          <a href="boutique.html" class="btn btn-fill">Voir la boutique</a>
        </div>`;
      return;
    }

    const subtotal = CartStore.subtotal();
    const shipping = subtotal >= 150 ? 0 : 6.9;
    const total = subtotal + shipping;

    wrap.innerHTML = `
      <div class="cart-layout">
        <div class="cart-lines">
          ${lines.map(cartLineHTML).join('')}
        </div>
        <aside class="cart-summary">
          <h2>Résumé</h2>
          <div class="cart-summary-row"><span>Sous-total</span><span>${subtotal.toFixed(0)}€</span></div>
          <div class="cart-summary-row"><span>Livraison</span><span>${shipping === 0 ? 'Offerte' : shipping.toFixed(2) + '€'}</span></div>
          ${shipping > 0 ? `<p class="cart-shipping-note">Livraison offerte dès 150€ d&rsquo;achat (encore ${(150 - subtotal).toFixed(0)}€).</p>` : ''}
          <div class="cart-summary-row cart-summary-total"><span>Total</span><span>${total.toFixed(0)}€</span></div>
          <a href="paiement.html" class="btn btn-fill cart-checkout-btn">Passer la commande</a>
          <a href="boutique.html" class="link-arrow" style="margin-top:16px;display:block;text-align:center;">Continuer mes achats</a>
        </aside>
      </div>`;

    wrap.querySelectorAll('.cart-line').forEach(lineEl => {
      const index = parseInt(lineEl.dataset.index, 10);
      lineEl.querySelectorAll('[data-step]').forEach(btn => {
        btn.addEventListener('click', () => {
          const current = CartStore.get()[index];
          if (!current) return;
          CartStore.updateQty(index, current.qty + parseInt(btn.dataset.step, 10));
        });
      });
      lineEl.querySelector('.cart-line-remove').addEventListener('click', () => {
        CartStore.remove(index);
      });
    });
  }
});
