/* Cart + wishlist state, persisted in localStorage (this is a static
   site with no backend). Loaded on every page, after products.js and
   before main.js/page-specific scripts. */

const CART_KEY = 'maisoneva_cart';
const WISHLIST_KEY = 'maisoneva_wishlist';

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

const CartStore = {
  get() { return readJSON(CART_KEY, []); },
  save(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    document.dispatchEvent(new CustomEvent('cart:change'));
  },
  add(productId, qty = 1, size = 'M', color = null) {
    const items = this.get();
    const existing = items.find(i => i.id === productId && i.size === size && i.color === color);
    if (existing) existing.qty += qty;
    else items.push({ id: productId, qty, size, color });
    this.save(items);
    return items;
  },
  updateQty(index, qty) {
    const items = this.get();
    if (items[index]) {
      items[index].qty = Math.max(1, qty);
      this.save(items);
    }
    return items;
  },
  remove(index) {
    const items = this.get();
    items.splice(index, 1);
    this.save(items);
    return items;
  },
  clear() { this.save([]); },
  count() { return this.get().reduce((sum, i) => sum + i.qty, 0); },
  lines() {
    return this.get().map((item, index) => {
      const product = (typeof PRODUCTS !== 'undefined') ? PRODUCTS.find(p => p.id === item.id) : null;
      return { ...item, index, product };
    }).filter(line => line.product);
  },
  subtotal() {
    return this.lines().reduce((sum, l) => sum + l.product.price * l.qty, 0);
  }
};

const WishlistStore = {
  get() { return readJSON(WISHLIST_KEY, []); },
  save(ids) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
    document.dispatchEvent(new CustomEvent('wishlist:change'));
  },
  has(id) { return this.get().includes(id); },
  toggle(id) {
    let ids = this.get();
    if (ids.includes(id)) ids = ids.filter(x => x !== id);
    else ids.push(id);
    this.save(ids);
    return ids;
  },
  remove(id) {
    this.save(this.get().filter(x => x !== id));
  },
  count() { return this.get().length; },
  products() {
    if (typeof PRODUCTS === 'undefined') return [];
    return this.get().map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  }
};
