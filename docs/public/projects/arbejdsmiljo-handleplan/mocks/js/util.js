export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === false || v === null || v === undefined) continue;
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k === "text") node.textContent = v;
    else if (k.startsWith("on") && typeof v === "function") {
      node.addEventListener(k.slice(2).toLowerCase(), v);
    } else if (k === "dataset") {
      Object.assign(node.dataset, v);
    } else if (v === true) {
      node.setAttribute(k, "");
    } else {
      node.setAttribute(k, v);
    }
  }
  for (const child of [].concat(children)) {
    if (child === null || child === undefined || child === false) continue;
    node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
  }
  return node;
}

export function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

export function navigate(hash) {
  window.location.hash = hash;
}

export function parseHash() {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  const [path, queryString = ""] = raw.split("?");
  const query = {};
  for (const part of queryString.split("&")) {
    if (!part) continue;
    const [k, v = ""] = part.split("=");
    query[decodeURIComponent(k)] = decodeURIComponent(v.replace(/\+/g, " "));
  }
  return { path, query };
}

export function setActiveNav(hash) {
  const nav = document.querySelector(".site-nav");
  if (!nav) return;
  const links = [...nav.querySelectorAll("a")];
  const hrefs = links.map(a => a.getAttribute("href"));
  // Prefer the longest matching href (exact or proper parent). A parent
  // match requires that the next char in `hash` is "/" so "#/plans/new"
  // does not also light up "#/plans".
  let best = null;
  for (const href of hrefs) {
    if (href === hash) { best = href; break; }
    if (href !== "#/" && hash.startsWith(href) && hash[href.length] === "/") {
      if (!best || href.length > best.length) best = href;
    }
  }
  links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === best));
}

export function toast(message, kind = "") {
  const region = document.getElementById("toast-region");
  if (!region) return;
  const t = el("div", { class: "toast" + (kind ? " toast-" + kind : ""), role: "status" }, message);
  region.appendChild(t);
  setTimeout(() => { t.style.opacity = "0"; t.style.transition = "opacity 0.3s"; }, 2400);
  setTimeout(() => t.remove(), 2800);
}

export function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("da-DK", { year: "numeric", month: "long", day: "numeric" });
}

export function formatDateShort(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("da-DK", { year: "numeric", month: "2-digit", day: "2-digit" });
}

export function formatDateTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return "";
  return d.toLocaleString("da-DK", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function daysUntil(iso) {
  if (!iso) return null;
  const target = new Date(iso);
  if (isNaN(target)) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
}

export function relativeDays(iso) {
  const d = daysUntil(iso);
  if (d === null) return "";
  if (d === 0) return "i dag";
  if (d === 1) return "i morgen";
  if (d === -1) return "i går";
  if (d > 0) return `om ${d} dage`;
  return `for ${Math.abs(d)} dage siden`;
}

export function addMonths(iso, months) {
  const d = iso ? new Date(iso) : new Date();
  if (isNaN(d)) return null;
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function escapeHtml(s) {
  if (s === null || s === undefined) return "";
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// Wires up dialog focus management on a modal: moves focus into the dialog,
// keeps Tab/Shift+Tab cycling within it, closes on Escape, and restores focus
// to whatever was focused before it opened. Returns a teardown function that the
// caller must run from its own close() (after removing the backdrop) so focus
// returns to the trigger instead of falling back to the top of the page.
export function trapFocus(container, onClose) {
  const previouslyFocused = document.activeElement;

  const focusable = () => [...container.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )].filter(node => node.offsetParent !== null);

  const onKeydown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose && onClose();
      return;
    }
    if (e.key !== "Tab") return;
    const items = focusable();
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  container.addEventListener("keydown", onKeydown);

  // Move initial focus into the dialog.
  const initial = focusable()[0];
  if (initial) initial.focus();

  return function release() {
    container.removeEventListener("keydown", onKeydown);
    if (previouslyFocused && typeof previouslyFocused.focus === "function") {
      previouslyFocused.focus();
    }
  };
}

export function debounce(fn, ms = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}
