/* Shared publication card used in search results, favorites, collections. */

import { el, escapeHtml, formatYear, toast } from "../util.js";
import { auth } from "../auth.js";
import { store } from "../store.js";
import { rightsLevelInfo } from "../catalog.js";
import { iconHtml } from "../icons.js";

const RISK_LABEL = { green: "Lav risiko", yellow: "Bør vurderes", red: "Kræver afklaring" };
const DOC_TYPE_LABEL = {
  rapport: "Rapport",
  analyse: "Analyse",
  strategi: "Strategi",
  vejledning: "Vejledning",
  evaluering: "Evaluering",
  hvidbog: "Hvidbog"
};

export function renderPubCard(p, opts = {}) {
  const user = auth.currentUser();
  const isFav = user ? store.isFavorite(user.id, p.id) : false;
  const rights = rightsLevelInfo(p.rightsLevel);

  const favBtn = el("button", {
    class: "btn-icon" + (isFav ? " is-on" : ""),
    title: isFav ? "Fjern favorit" : "Tilføj som favorit",
    "aria-label": isFav ? "Fjern favorit" : "Tilføj som favorit",
    html: iconHtml(isFav ? "heart-filled" : "heart"),
    onclick: (e) => {
      e.preventDefault();
      const u = auth.currentUser();
      if (!u) {
        toast("Log ind for at gemme favoritter");
        window.location.hash = "#/login";
        return;
      }
      const nowFav = store.toggleFavorite(u.id, p.id);
      favBtn.classList.toggle("is-on", nowFav);
      favBtn.setAttribute("aria-label", nowFav ? "Fjern favorit" : "Tilføj som favorit");
      favBtn.title = nowFav ? "Fjern favorit" : "Tilføj som favorit";
      favBtn.innerHTML = iconHtml(nowFav ? "heart-filled" : "heart");
      if (opts.onFavoriteChange) opts.onFavoriteChange(nowFav);
    }
  });

  const card = el("article", { class: "pub-card" }, [
    el("div", {}, [
      el("h3", {}, [
        el("a", { href: `#/publication/${p.id}`, html: escapeHtml(p.title) })
      ]),
      el("div", { class: "meta" },
        `${p.publisher} · ${formatYear(p.publishedAt)}` + (p.source === "user" ? " · uploadet" : "")),
      el("p", { class: "summary", text: trim(p.summary, 240) }),
      el("div", { class: "badges" }, [
        el("span", { class: "badge badge-doctype" }, DOC_TYPE_LABEL[p.documentType] || p.documentType || "Publikation"),
        el("span", {
          class: "badge badge-rights",
          dataset: { level: String(p.rightsLevel) },
          title: rights.description
        }, `Niveau ${p.rightsLevel}: ${rights.title}`),
        el("span", {
          class: "badge badge-risk",
          dataset: { risk: p.riskLevel || "green" }
        }, RISK_LABEL[p.riskLevel] || RISK_LABEL.green)
      ])
    ]),
    el("div", { class: "actions" }, [
      favBtn,
      opts.extraAction || null
    ])
  ]);
  return card;
}

function trim(s, n) {
  if (!s) return "";
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
