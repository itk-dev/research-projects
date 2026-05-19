/* Small shared utilities. */

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

export function escapeHtml(s) {
  if (s === null || s === undefined) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("da-DK", { year: "numeric", month: "long", day: "numeric" });
}

export function formatYear(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return isNaN(d) ? "" : String(d.getFullYear());
}

export function formatSize(bytes) {
  if (!bytes) return "—";
  const units = ["B", "kB", "MB", "GB"];
  let i = 0;
  let n = bytes;
  while (n >= 1024 && i < units.length - 1) { n /= 1024; i++; }
  return `${n.toFixed(n >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
}

export function toast(message) {
  const region = document.getElementById("toast-region");
  if (!region) return;
  const t = el("div", { class: "toast", role: "status" }, message);
  region.appendChild(t);
  setTimeout(() => { t.style.opacity = "0"; t.style.transition = "opacity 0.3s"; }, 2200);
  setTimeout(() => t.remove(), 2600);
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
  nav.querySelectorAll("a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === hash);
  });
}

export function b64encodeObject(obj) {
  const json = JSON.stringify(obj);
  // unicode-safe base64
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function b64decodeObject(s) {
  try {
    const padded = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4);
    const json = decodeURIComponent(escape(atob(padded)));
    return JSON.parse(json);
  } catch {
    return null;
  }
}
