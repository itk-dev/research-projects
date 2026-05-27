import { el, clear, parseHash, setActiveNav, navigate } from "./util.js";
import { auth } from "./auth.js";
import { store } from "./store.js";

import * as Home from "./views/home.js";
import * as Login from "./views/login.js";
import * as Upload from "./views/upload.js";
import * as Search from "./views/search.js";
import * as Detail from "./views/detail.js";
import * as Favorites from "./views/favorites.js";
import * as Collections from "./views/collections.js";
import * as Uploads from "./views/uploads.js";

const routes = [
  { test: (p) => p === "/" || p === "", view: Home, public: true, width: "wide" },
  { test: (p) => p === "/login", view: Login, public: true, width: "narrow" },
  { test: (p) => p === "/search", view: Search, public: true, width: "wide" },
  { test: (p) => p === "/upload", view: Upload, public: false, width: "wide" },
  { test: (p) => p === "/uploads", view: Uploads, public: false, width: "wide" },
  { test: (p) => p === "/favorites", view: Favorites, public: false, width: "wide" },
  { test: (p) => p === "/collections", view: Collections, public: false, width: "wide" },
  {
    test: (p) => p.startsWith("/assistant/"),
    view: Detail,
    public: true,
    width: "wide",
    params: (p) => ({ id: p.replace("/assistant/", "") })
  },
  {
    test: (p) => p.startsWith("/collection/"),
    view: { render: Collections.renderShared },
    public: true,
    width: "narrow",
    params: (p) => ({ token: p.replace("/collection/", "") })
  }
];

function renderUserArea() {
  const area = document.getElementById("user-area");
  if (!area) return;
  clear(area);
  const user = auth.currentUser();
  if (user) {
    area.appendChild(el("span", { class: "user-name", title: user.email },
      user.name + (user.organization ? ` · ${user.organization}` : "")));
    area.appendChild(el("button", {
      class: "btn btn-secondary btn-sm",
      onclick: () => {
        auth.logout();
        renderUserArea();
        renderAuthGuardedLinks();
        navigate("#/");
      }
    }, "Log ud"));
  } else {
    area.appendChild(el("a", { class: "btn btn-secondary btn-sm", href: "#/login" }, "Log ind"));
    area.appendChild(el("a", { class: "btn btn-sm", href: "#/login?mode=register" }, "Opret bruger"));
  }
}

function renderAuthGuardedLinks() {
  const loggedIn = !!auth.currentUser();
  document.querySelectorAll("[data-auth-required]").forEach(node => {
    node.style.display = loggedIn ? "" : "none";
  });
}

function route() {
  const { path, query } = parseHash();
  const root = document.getElementById("view-root");
  if (!root) return;

  const match = routes.find(r => r.test(path));
  if (!match) {
    clear(root);
    root.appendChild(el("div", { class: "empty card" }, [
      el("h2", {}, "Siden findes ikke"),
      el("a", { class: "btn", href: "#/" }, "Til forsiden")
    ]));
    return;
  }
  if (!match.public && !auth.currentUser()) {
    navigate("#/login");
    return;
  }

  const params = match.params ? match.params(path) : {};
  setActiveNav(`#${path}`);

  // Switch <main> container width per route.
  const mainEl = document.getElementById("main");
  if (mainEl) {
    mainEl.classList.toggle("container", match.width === "narrow");
    mainEl.classList.toggle("container-wide", match.width !== "narrow");
  }

  match.view.render(root, query, params);

  // Reset scroll on navigation
  window.scrollTo({ top: 0, behavior: "instant" });
}

window.addEventListener("hashchange", () => {
  renderUserArea();
  renderAuthGuardedLinks();
  route();
});

function wireNavToggle() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("primary-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  // Close after navigating
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  wireNavToggle();
  renderUserArea();
  renderAuthGuardedLinks();
  route();
});
