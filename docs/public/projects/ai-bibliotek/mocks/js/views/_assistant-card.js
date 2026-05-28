/* Shared assistant card used in search results, favorites, collections. */

import { el, escapeHtml, toast } from "../util.js";
import { auth } from "../auth.js";
import { store } from "../store.js";
import { FRAMEWORK_LABEL, dataSensitivityInfo } from "../catalog.js";
import { iconHtml } from "../icons.js";

const SENSITIVITY_LABEL = {
  almindelige: "Almindelige",
  fortrolige: "Fortrolige",
  personfoelsomme: "Personfølsomme"
};

export function renderAssistantCard(a, opts = {}) {
  const user = auth.currentUser();
  const isFav = user ? store.isFavorite(user.id, a.id) : false;
  const sensitivity = dataSensitivityInfo(a.dataSensitivity);

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
      const nowFav = store.toggleFavorite(u.id, a.id);
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
        el("a", { href: `#/assistant/${a.id}`, html: escapeHtml(a.name) })
      ]),
      el("div", { class: "meta" },
        `${a.originKommune} · ${a.languageModel}` + (a.source === "user" ? " · delt af dig" : "")),
      el("p", { class: "summary", text: trim(a.description, 240) }),
      el("div", { class: "badges" }, [
        el("span", { class: "badge badge-framework" }, FRAMEWORK_LABEL[a.framework] || a.framework || "Rammeværk"),
        el("span", {
          class: "badge badge-sensitivity",
          dataset: { level: a.dataSensitivity || "almindelige" },
          title: sensitivity.description
        }, SENSITIVITY_LABEL[a.dataSensitivity] || sensitivity.title)
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
