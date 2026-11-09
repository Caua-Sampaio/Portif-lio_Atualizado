/* =========================================================
   SCRIPT.JS
   1. Menu do celular (☰)
   2. Animação de entrada das seções ao rolar a página
   ========================================================= */

/* ---------- 1. MENU DO CELULAR ---------- */
const header = document.querySelector('.site-header');
const toggle = header.querySelector('.menu-toggle');

function setMenu(open) {
  header.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
}

toggle.addEventListener('click', () => setMenu(!header.classList.contains('open')));
header.querySelectorAll('.nav-links a').forEach(link =>
  link.addEventListener('click', () => setMenu(false))
);

/* ---------- 2. ANIMAÇÃO AO ROLAR ---------- */
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js');

  // Grades cujos filhos entram um depois do outro
  const GRIDS = '.services-grid, .projects-grid, .testimonials-grid, .steps, .skills-grid, .timeline';

  const items = [...document.querySelectorAll('main > section:not(.hero) .container > *')]
    .filter(el => !el.matches(GRIDS));

  document.querySelectorAll(GRIDS).forEach(grid =>
    [...grid.children].forEach((child, i) => {
      child.dataset.delay = i * 80;
      items.push(child);
    })
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = Number(el.dataset.delay || 0);

      el.style.transitionDelay = delay + 'ms';
      el.classList.add('in');
      observer.unobserve(el);

      // Depois da animação, devolve o elemento ao estado normal
      setTimeout(() => {
        el.classList.remove('rv', 'in');
        el.style.transitionDelay = '';
      }, 900 + delay);
    });
  }, { threshold: 0.12 });

  items.forEach(el => { el.classList.add('rv'); observer.observe(el); });
}
