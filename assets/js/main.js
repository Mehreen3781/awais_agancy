document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Render products on index
  if (document.getElementById('productGrid')) {
    window.ProductsApi.renderProductGrid('all');
  }

  // Buy buttons delegation
  document.body.addEventListener('click', async (e) => {
    const target = e.target;
    if (target && target.matches && target.matches('button[data-action="buy"]')) {
      const id = target.getAttribute('data-id');
      if (id) {
        window.CartApi.addToCart(id, 1);
        target.textContent = 'Added ✓';
        setTimeout(() => (target.textContent = 'Buy'), 1000);
      }
    }
  });

  window.CartApi.updateCartCount();

  // Simple smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const href = a.getAttribute('href');
      if (href && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          ev.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});

