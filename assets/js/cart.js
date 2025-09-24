const CART_KEY = 'aa8_cart_v1';

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function setCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  updateCartCount();
}

function addToCart(productId, quantity = 1) {
  const items = getCart();
  const existing = items.find(i => i.id === productId);
  if (existing) existing.qty += quantity; else items.push({ id: productId, qty: quantity });
  setCart(items);
}

function updateCartCount() {
  const countEl = document.getElementById('cartCount');
  if (!countEl) return;
  const total = getCart().reduce((sum, i) => sum + i.qty, 0);
  countEl.textContent = String(total);
}

window.CartApi = { getCart, setCart, addToCart, updateCartCount };

