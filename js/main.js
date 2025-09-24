import { getProducts } from './data.js';

const productsGrid = document.getElementById('productsGrid');
const cartCount = document.getElementById('cartCount');
const yearSpan = document.getElementById('year');

function loadCartCount() {
  try {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cartCount.textContent = String(cart.length);
  } catch {
    cartCount.textContent = '0';
  }
}

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const firstImage = product.images?.[0] || 'assets/placeholder.svg';
  const priceAmount = (product.price && typeof product.price.amount === 'number') ? product.price.amount : (typeof product.priceGBP === 'number' ? product.priceGBP : 0);
  const currency = (product.price && product.price.currency) ? product.price.currency : (typeof product.priceGBP === 'number' ? 'GBP' : '');
  cart.push({ productId: product.id, name: product.name, image: firstImage, price: priceAmount, currency, ts: Date.now() });
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCartCount();
}

function getCurrencySymbol(currency) {
  switch ((currency || '').toUpperCase()) {
    case 'USD': return '$';
    case 'GBP': return '£';
    case 'EUR': return '€';
    default: return '';
  }
}

function getDisplayPrice(product) {
  if (product.price && typeof product.price.amount === 'number') {
    return `${getCurrencySymbol(product.price.currency)}${product.price.amount.toFixed(2)}`;
  }
  if (typeof product.priceGBP === 'number') {
    return `£${product.priceGBP.toFixed(2)}`;
  }
  return '';
}

function createProductCard(product) {
  const firstImage = product.images?.[0] || '/assets/placeholder.svg';
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${firstImage}" alt="${product.name}">
    <div class="card-body">
      <div class="card-title">${product.name}</div>
      <div class="muted">${product.short}</div>
      <div class="row">
        <div class="price">${getDisplayPrice(product)}</div>
        <div class="row">
          <a class="btn ghost" href="/product.html?id=${encodeURIComponent(product.id)}">View</a>
          <button class="btn primary" data-id="${product.id}">Buy</button>
        </div>
      </div>
    </div>
  `;
  const buyBtn = card.querySelector('button');
  buyBtn.addEventListener('click', () => addToCart(product));
  return card;
}

async function renderProducts() {
  const list = await getProducts();
  productsGrid.innerHTML = '';
  list.forEach(p => productsGrid.appendChild(createProductCard(p)));
}

async function init() {
  yearSpan.textContent = String(new Date().getFullYear());
  loadCartCount();
  await renderProducts();
}

document.addEventListener('DOMContentLoaded', init);

