// Data-driven products for easy future updates. Update /data/products.json only.
async function fetchProducts() {
  const response = await fetch('data/products.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('Failed to load products');
  return await response.json();
}

function formatCurrency(value, currency) {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(value);
  } catch (e) {
    return `${value} ${currency}`; // simple fallback
  }
}

function buildProductCard(product) {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <div class="card-media">
      <img src="${product.images?.[0]}" alt="${product.title}" loading="lazy" />
      ${product.tag ? `<span class="badge">${product.tag}</span>` : ''}
    </div>
    <div class="card-body">
      <h3 class="card-title">${product.title}</h3>
      <p class="card-desc">${product.shortDescription ?? ''}</p>
      <div class="price">${formatCurrency(product.price, product.currency || 'GBP')}</div>
    </div>
    <div class="card-actions">
      <button class="btn btn-primary" data-action="buy" data-id="${product.id}">Buy</button>
      <a class="btn btn-secondary" href="product.html?id=${encodeURIComponent(product.id)}">View</a>
    </div>
  `;
  return div;
}

async function renderProductGrid(filter) {
  const container = document.getElementById('productGrid');
  if (!container) return;
  container.innerHTML = '';
  try {
    const products = await fetchProducts();
    const list = Array.isArray(products) ? products : products.items || [];
    const filtered = filter && filter !== 'all' ? list.filter(p => (p.tags || []).includes(filter)) : list;
    filtered.forEach(p => container.appendChild(buildProductCard(p)));
  } catch (err) {
    container.innerHTML = `<p style="color:#fca5a5">Failed to load products.</p>`;
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

function setupNavFilters() {
  document.querySelectorAll('[data-filter]').forEach(link => {
    link.addEventListener('click', e => {
      const filter = link.getAttribute('data-filter');
      if (!filter) return;
      renderProductGrid(filter);
    });
  });
}

window.ProductsApi = { fetchProducts, renderProductGrid };

