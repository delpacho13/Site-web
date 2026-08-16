document.addEventListener('DOMContentLoaded', () => {
  render();
  document.addEventListener('wishlist:change', render);

  function render() {
    const wrap = document.getElementById('favorisWrap');
    if (!wrap || typeof WishlistStore === 'undefined') return;
    const products = WishlistStore.products();

    if (products.length === 0) {
      wrap.innerHTML = `
        <div class="boutique-empty">
          <p>Ta liste de favoris est vide pour l&rsquo;instant.</p>
          <p>Clique sur le cœur d&rsquo;une pièce pour la garder de côté pour plus tard.</p>
          <a href="boutique.html" class="btn btn-fill">Voir la boutique</a>
        </div>`;
      return;
    }

    wrap.innerHTML = `<div class="product-grid">${products.map(productCardHTML).join('')}</div>`;
  }
});
