import { el, clear, parseHash, setActiveNav, navigate } from "./util.js";
import { auth } from "./auth.js";
import { seedIfEmpty } from "./seed.js";

import * as Home from "./views/home.js";
import * as Login from "./views/login.js";
import * as PlanList from "./views/plan-list.js";
import * as PlanNew from "./views/plan-new.js";
import * as PlanEdit from "./views/plan-edit.js";
import * as PlanShared from "./views/plan-shared.js";
import * as About from "./views/about.js";

const routes = [
  { test: (p) => p === "/" || p === "", view: Home, public: false, width: "wide" },
  { test: (p) => p === "/login", view: Login, public: true, width: "narrow" },
  { test: (p) => p === "/about", view: About, public: true, width: "narrow" },
  { test: (p) => p === "/plans", view: PlanList, public: false, width: "wide" },
  { test: (p) => p === "/plans/new", view: PlanNew, public: false, width: "narrow" },
  {
    test: (p) => p.startsWith("/plans/"),
    view: PlanEdit,
    public: false,
    width: "wide",
    params: (p) => ({ id: p.replace("/plans/", "") })
  },
  {
    test: (p) => p.startsWith("/shared/"),
    view: PlanShared,
    public: true,
    width: "wide",
    params: (p) => ({ token: p.replace("/shared/", "") })
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
        navigate("#/login");
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

  const mainEl = document.getElementById("main");
  if (mainEl) {
    mainEl.classList.toggle("container", match.width === "narrow");
    mainEl.classList.toggle("container-wide", match.width !== "narrow");
  }

  match.view.render(root, query, params);
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
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  seedIfEmpty();
  wireNavToggle();
  renderUserArea();
  renderAuthGuardedLinks();
  route();
});
