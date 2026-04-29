/*
 * Auto-injects a "this is a mock" banner at the top of the page.
 *
 * Usage:
 *   <link rel="stylesheet" href="/research-projects/design-system/v1/mock-banner.css">
 *   <script src="/research-projects/design-system/v1/mock-banner.js" defer
 *           data-banner-text="Optional override"></script>
 *
 * Idempotent: a second invocation is a no-op.
 * Text priority: data-banner-text on the script tag > existing
 * .mock-banner markup in the page > built-in default.
 */
(function () {
  const DEFAULT_TEXT = 'Dette er en mock-up, ikke det rigtige eller endelige produkt.';
  const BANNER_HEIGHT = '32px';

  function init() {
    if (!document.body) return;

    const existing = document.querySelector('.mock-banner');
    const script = document.currentScript
      || document.querySelector('script[src*="mock-banner.js"]');
    const override = script && script.getAttribute('data-banner-text');

    let banner = existing;
    if (!banner) {
      banner = document.createElement('div');
      banner.className = 'mock-banner';
      banner.setAttribute('role', 'note');
      document.body.insertBefore(banner, document.body.firstChild);
    }

    if (override) {
      banner.textContent = override;
    } else if (!banner.textContent.trim()) {
      banner.textContent = DEFAULT_TEXT;
    }

    document.body.style.paddingTop = BANNER_HEIGHT;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
