/* Minimal inline SVG line icons. Stroke uses currentColor so icons inherit
   the button/text color. */

const PATHS = {
  heart:    '<path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z"/>',
  "heart-filled": '<path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" fill="currentColor"/>',
  download: '<path d="M12 4v12"/><path d="m6 12 6 6 6-6"/><path d="M4 20h16"/>',
  upload:   '<path d="M12 20V8"/><path d="m6 12 6-6 6 6"/><path d="M4 4h16"/>',
  link:     '<path d="M9 15a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1"/><path d="M15 9a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/>',
  arrowLeft:'<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  arrowRight:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  check:    '<path d="m5 12 5 5L20 7"/>',
  document: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/>',
  plus:     '<path d="M12 5v14"/><path d="M5 12h14"/>',
  code:     '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>'
};

/** Return an HTML string for an icon. Use inside el({ html: ... }) or for
 *  composing with adjacent text via innerHTML. */
export function iconHtml(name, { size = 18, stroke = 2 } = {}) {
  const body = PATHS[name];
  if (!body) return "";
  return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

/** Return an SVG element node. */
export function icon(name, opts) {
  const wrap = document.createElement("span");
  wrap.style.display = "inline-flex";
  wrap.innerHTML = iconHtml(name, opts);
  return wrap.firstChild;
}
