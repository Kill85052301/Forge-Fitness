/* Mobile disclosure only; tablet/desktop keep their original navigation. */
(() => {
  const header = document.querySelector('header');
  const button = header?.querySelector('.menu-toggle');
  const nav = header?.querySelector('nav');
  if (!button || !nav || button.dataset.initialized) return;
  button.dataset.initialized = 'true';
  const mobile = window.matchMedia('(max-width: 600px)');

  function setOpen(open, restoreFocus = false) {
    const expanded = mobile.matches && open;
    if (mobile.matches && !expanded && nav.contains(document.activeElement)) {
      // Never leave keyboard focus inside a collapsed, inert disclosure.
      button.focus({ preventScroll: true });
    } else if (restoreFocus) {
      button.focus({ preventScroll: true });
    }
    button.setAttribute('aria-expanded', String(expanded));
    button.setAttribute('aria-label', expanded ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    header.classList.toggle('is-menu-open', expanded);
    nav.inert = mobile.matches && !expanded;
  }

  button.addEventListener('click', () => {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      setOpen(false, true);
    }
  });
  // A breakpoint change updates disclosure state, never entrance/reveal animations.
  mobile.addEventListener('change', () => {
    if (!mobile.matches && document.activeElement === button) {
      nav.querySelector('[aria-current="page"]')?.focus({ preventScroll: true });
    }
    setOpen(false);
  });
  window.addEventListener('pageshow', event => { if (event.persisted) setOpen(false); });
  button.hidden = false;
  setOpen(false);
  document.documentElement.classList.add('mobile-menu-ready');
})();
