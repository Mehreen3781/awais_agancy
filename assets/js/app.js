document.addEventListener('DOMContentLoaded', () => {
  // Init AOS
  if (window.AOS) {
    AOS.init({
      duration: 600,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic'
    });
  }

  // Elements
  const searchInput = document.getElementById('searchInput');
  const filterButtons = document.querySelectorAll('.filter-group .btn');
  const productCards = document.querySelectorAll('.product-card');
  const cartCountEl = document.getElementById('cartCount');
  const backToTop = document.getElementById('backToTop');
  const contactForm = document.getElementById('contactForm');
  const signinForm = document.getElementById('signinForm');

  // Cart count (persist)
  const getCartCount = () => parseInt(localStorage.getItem('tt_cart_count') || '0', 10);
  const setCartCount = (value) => localStorage.setItem('tt_cart_count', String(value));
  const updateCartBadge = () => { cartCountEl.textContent = String(getCartCount()); };
  updateCartBadge();

  // Toast
  const cartToastEl = document.getElementById('cartToast');
  const cartToast = cartToastEl ? new bootstrap.Toast(cartToastEl, { delay: 1800 }) : null;

  // Add to cart buttons
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = getCartCount() + 1;
      setCartCount(next);
      updateCartBadge();
      if (cartToast) {
        const name = btn.getAttribute('data-product') || 'Product';
        cartToastEl.querySelector('.toast-body').innerHTML = `<i class="bi bi-bag-check me-2"></i> Added <strong>${name}</strong> to cart`;
        cartToast.show();
      }
    });
  });

  // Filters
  const getActiveCategory = () => {
    const active = document.querySelector('.filter-group .btn.active');
    return active ? active.getAttribute('data-filter') : 'all';
  };

  const applyFilters = () => {
    const term = (searchInput?.value || '').trim().toLowerCase();
    const category = getActiveCategory();

    productCards.forEach(card => {
      const title = (card.getAttribute('data-title') || '').toLowerCase();
      const cat = card.getAttribute('data-category') || '';
      const matchTerm = !term || title.includes(term) || cat.toLowerCase().includes(term);
      const matchCategory = category === 'all' || cat === category;
      const visible = matchTerm && matchCategory;
      card.closest('.col-6, .col-md-4, .col-lg-3').classList.toggle('d-none', !visible);
    });
  };

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });

  // Back to top
  const onScroll = () => {
    if (window.scrollY > 200) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Active nav auto-highlight by path
  const currentPath = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const normalized = href.split('/').pop();
    if (normalized === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  // Basic form handling
  const handleForm = (form, type) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      const formData = new FormData(form);
      const entries = Object.fromEntries(formData.entries());
      console.log(`${type} form submitted`, entries);
      const toastEl = document.getElementById('cartToast');
      if (toastEl) {
        toastEl.querySelector('.toast-body').innerHTML = `<i class="bi bi-check2-circle me-2"></i>${type} submitted successfully`;
        const t = new bootstrap.Toast(toastEl, { delay: 1500 });
        t.show();
      }
      form.reset();
      form.classList.remove('was-validated');
    });
  };
  if (contactForm) handleForm(contactForm, 'Message');
  if (signinForm) handleForm(signinForm, 'Sign in');
});


