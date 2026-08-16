document.addEventListener('DOMContentLoaded', () => {
  const wrap = document.getElementById('checkoutWrap');
  if (!wrap || typeof CartStore === 'undefined') return;

  const lines = CartStore.lines();

  if (lines.length === 0) {
    wrap.innerHTML = `
      <div class="boutique-empty">
        <p>Ton panier est vide — rien à payer pour l&rsquo;instant.</p>
        <a href="boutique.html" class="btn btn-fill">Voir la boutique</a>
      </div>`;
    return;
  }

  const subtotal = CartStore.subtotal();
  const shipping = subtotal >= 150 ? 0 : 6.9;
  const total = subtotal + shipping;

  const summaryLines = lines.map(l => `
    <div class="co-summary-line">
      <span class="co-summary-qty">${l.qty}×</span>
      <span class="co-summary-name">${l.product.name}</span>
      <span class="co-summary-price">${(l.product.price * l.qty).toFixed(0)}€</span>
    </div>`).join('');

  wrap.innerHTML = `
    <div class="checkout-layout">
      <form class="checkout-form" id="checkoutForm" novalidate>
        <div class="co-section">
          <h2>Contact</h2>
          <div class="co-field">
            <label for="coEmail">E-mail</label>
            <input type="email" id="coEmail" required placeholder="vous@exemple.com">
          </div>
        </div>

        <div class="co-section">
          <h2>Livraison</h2>
          <div class="co-row">
            <div class="co-field"><label for="coFirst">Prénom</label><input type="text" id="coFirst" required></div>
            <div class="co-field"><label for="coLast">Nom</label><input type="text" id="coLast" required></div>
          </div>
          <div class="co-field"><label for="coAddress">Adresse</label><input type="text" id="coAddress" required></div>
          <div class="co-row">
            <div class="co-field"><label for="coZip">Code postal</label><input type="text" id="coZip" required></div>
            <div class="co-field"><label for="coCity">Ville</label><input type="text" id="coCity" required></div>
          </div>
          <div class="co-field"><label for="coCountry">Pays</label><input type="text" id="coCountry" value="France" required></div>
        </div>

        <div class="co-section">
          <h2>Paiement</h2>
          <div class="co-field">
            <label for="coCard">Numéro de carte</label>
            <input type="text" id="coCard" required inputmode="numeric" placeholder="1234 5678 9012 3456" maxlength="19">
          </div>
          <div class="co-row">
            <div class="co-field"><label for="coExpiry">Expiration</label><input type="text" id="coExpiry" required placeholder="MM/AA" maxlength="5"></div>
            <div class="co-field"><label for="coCvc">CVC</label><input type="text" id="coCvc" required inputmode="numeric" placeholder="123" maxlength="3"></div>
          </div>
          <p class="co-fine">Paiement simulé à des fins de démonstration — aucune carte n&rsquo;est débitée.</p>
        </div>

        <button type="submit" class="btn btn-fill co-submit">Confirmer la commande — ${total.toFixed(0)}€</button>
      </form>

      <aside class="checkout-summary">
        <h2>Votre commande</h2>
        <div class="co-summary-lines">${summaryLines}</div>
        <div class="cart-summary-row"><span>Sous-total</span><span>${subtotal.toFixed(0)}€</span></div>
        <div class="cart-summary-row"><span>Livraison</span><span>${shipping === 0 ? 'Offerte' : shipping.toFixed(2) + '€'}</span></div>
        <div class="cart-summary-row cart-summary-total"><span>Total</span><span>${total.toFixed(0)}€</span></div>
      </aside>
    </div>`;

  /* Auto-format card number and expiry as the user types */
  const cardInput = document.getElementById('coCard');
  cardInput.addEventListener('input', () => {
    cardInput.value = cardInput.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  });
  const expiryInput = document.getElementById('coExpiry');
  expiryInput.addEventListener('input', () => {
    let v = expiryInput.value.replace(/\D/g, '').slice(0, 4);
    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
    expiryInput.value = v;
  });

  document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const orderNumber = 'ME-' + Math.floor(100000 + Math.random() * 900000);
    CartStore.clear();
    wrap.innerHTML = `
      <div class="order-confirm">
        <span class="order-confirm-check">✓</span>
        <h1>Merci pour votre commande</h1>
        <p>Une confirmation a été envoyée par e-mail. Votre numéro de commande :</p>
        <p class="order-number">${orderNumber}</p>
        <a href="boutique.html" class="btn btn-fill">Continuer mes achats</a>
      </div>`;
  });
});
