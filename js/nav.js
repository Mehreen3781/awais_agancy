function setupNavToggle() {
  const header = document.querySelector('.navbar');
  if (!header) return;
  const nav = header.querySelector('.nav-right');
  const toggle = header.querySelector('.nav-toggle');
  if (!nav || !toggle) return;

  function closeMenu() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on link click and outside click
  nav.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.tagName === 'A') closeMenu();
  });
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('open')) return;
    if (!header.contains(e.target)) closeMenu();
  });
}

document.addEventListener('DOMContentLoaded', setupNavToggle);

