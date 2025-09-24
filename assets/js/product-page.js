function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function sliderTemplate(product) {
  const images = product.images || [];
  const slides = images.map(src => `<img src="${src}" alt="${product.title}">`).join('');
  const thumbs = images.map((src, i) => `<img data-idx="${i}" src="${src}" alt="${product.title} thumb ${i+1}">`).join('');
  const video = product.video ? `
    <div class="video-wrap">
      <video src="${product.video}" controls preload="metadata" style="width:100%;height:auto;background:#000"></video>
    </div>` : '';

  return `
  <div class="slider" data-index="0">
    <div class="slides">${slides}</div>
    <div class="thumbs">${thumbs}</div>
    ${video}
  </div>`;
}

function attachSliderLogic(root) {
  const slider = root.querySelector('.slider');
  if (!slider) return;
  const slides = slider.querySelector('.slides');
  const thumbs = slider.querySelectorAll('.thumbs img');
  const update = (idx) => {
    slides.style.transform = `translateX(-${idx * 100}%)`;
    thumbs.forEach((t, i) => t.classList.toggle('active', i === idx));
  };
  thumbs.forEach((img, i) => {
    img.addEventListener('click', () => update(i));
  });
  update(0);
}

async function renderProductDetail() {
  const container = document.getElementById('productDetail');
  if (!container) return;
  const id = getQueryParam('id');
  try {
    const products = await window.ProductsApi.fetchProducts();
    const list = Array.isArray(products) ? products : products.items || [];
    const product = list.find(p => String(p.id) === String(id)) || list[0];
    if (!product) {
      container.innerHTML = '<p style="color:#fca5a5">Product not found.</p>';
      return;
    }
    container.innerHTML = `
      <div class="detail-media">${sliderTemplate(product)}</div>
      <div class="detail-body">
        <h1>${product.title}</h1>
        <p>${product.description || product.shortDescription || ''}</p>
        <p class="price">${new Intl.NumberFormat(undefined, { style: 'currency', currency: product.currency || 'GBP' }).format(product.price)}</p>
        <div style="display:flex;gap:10px;margin-top:10px">
          <button id="addToCart" class="btn btn-primary" data-id="${product.id}">Add to Cart</button>
          <a class="btn btn-secondary" href="index.html">Continue Shopping</a>
        </div>
      </div>
    `;
    attachSliderLogic(container);
    const addBtn = document.getElementById('addToCart');
    addBtn?.addEventListener('click', () => {
      const pid = addBtn.getAttribute('data-id');
      if (pid) {
        window.CartApi.addToCart(pid, 1);
        addBtn.textContent = 'Added ✓';
        setTimeout(() => (addBtn.textContent = 'Add to Cart'), 1000);
      }
    });
  } catch (e) {
    container.innerHTML = `<p style="color:#fca5a5">Failed to load product.</p>`;
    // eslint-disable-next-line no-console
    console.error(e);
  }
  window.CartApi.updateCartCount();
}

document.addEventListener('DOMContentLoaded', renderProductDetail);

