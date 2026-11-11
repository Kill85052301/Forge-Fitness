/* One motion owner; content remains visible throughout every animation. */
(() => {
  if (document.documentElement.dataset.forgeMotionInitialized) return;
  document.documentElement.dataset.forgeMotionInitialized = 'true';

  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const compactScreen = window.matchMedia('(max-width: 1024px)');
  const completed = new WeakSet();
  const active = new Map();
  const pending = new Set();
  const sections = [...document.querySelectorAll('main > section')];
  let observer;
  let stopped = false;

  function settle(element) {
    completed.add(element);
    observer?.unobserve(element);
    pending.delete(element);
    if (pending.size === 0) observer?.disconnect();
    active.get(element)?.cancel();
    active.delete(element);
  }

  function enter(element, distance = 12, duration = 360, pageEntrance = false) {
    if (stopped || completed.has(element)) return;
    // Claim before starting: queued observer callbacks cannot replay this element.
    settle(element);
    if (preference.matches || element.contains(document.activeElement) ||
        element.matches(':target') || element.querySelector(':target')) return;
    // A shallow fade keeps already-painted content visible without a dark flash.
    // Only initial page entrances fade; scroll reveals retain their existing motion.
    // Read the current size without resize/orientation listeners that could replay effects.
    const compact = compactScreen.matches;
    if (compact) distance = Math.min(distance, pageEntrance ? 2 : 6);
    const frames = pageEntrance
      ? [{ opacity: compact ? .96 : .86, translate: `0 ${distance}px` }, { opacity: 1, translate: '0 0' }]
      : [{ translate: `0 ${distance}px` }, { translate: '0 0' }];
    const animation = element.animate(frames, {
      duration,
      easing: pageEntrance ? 'cubic-bezier(.22, .61, .36, 1)' : 'cubic-bezier(.2, .7, .3, 1)',
      iterations: 1
    });
    active.set(element, animation);
    // No fill or class toggles: finished effects return to the identical base state.
    animation.finished.then(() => {
      if (active.get(element) === animation) active.delete(element);
    }, () => {});
  }

  function stop() {
    stopped = true;
    observer?.disconnect();
    pending.clear();
    for (const animation of active.values()) animation.cancel();
    active.clear();
  }

  document.addEventListener('focusin', event => {
    const section = event.target.closest('main > section');
    if (section) settle(section);
    for (const element of active.keys()) {
      if (element.contains(event.target)) settle(element);
    }
  });
  preference.addEventListener('change', event => {
    if (event.matches) stop();
  });
  // Restoring from the back/forward cache must not resume stale entrance effects.
  window.addEventListener('pagehide', stop);
  window.addEventListener('pageshow', event => { if (event.persisted) stop(); });
  if (preference.matches || !Element.prototype.animate) return;

  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting || stopped || completed.has(entry.target)) continue;
        enter(entry.target);
      }
    }, { threshold: 0, rootMargin: '0px 0px 48px 0px' });
  }

  // Measure before applying motion; never animate a parent and its children.
  const viewportHeight = window.innerHeight;
  const positions = new Map(
    [...document.querySelectorAll('header, main > *')].map(element => [
      element, element.getBoundingClientRect()
    ])
  );
  const visible = [...positions].filter(([, rect]) => {
    return rect.top < viewportHeight && rect.bottom > 0;
  }).map(([element]) => element);
  const visibleElements = new Set(visible);
  sections.forEach(section => {
    if (visibleElements.has(section)) return;
    if (observer && positions.get(section).top >= viewportHeight) {
      pending.add(section);
    } else {
      completed.add(section);
    }
  });
  pending.forEach(section => observer.observe(section));
  visible.forEach(element => enter(element, 4, 520, true));
})();
