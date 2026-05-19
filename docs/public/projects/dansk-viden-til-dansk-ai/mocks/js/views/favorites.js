import { el, clear, navigate } from "../util.js";
import { auth } from "../auth.js";
import { store } from "../store.js";
import { getPublication } from "../catalog.js";
import { renderPubCard } from "./_pub-card.js";

export function render(root) {
  const user = auth.currentUser();
  if (!user) { navigate("#/login"); return; }
  clear(root);

  function paint() {
    clear(root);
    root.appendChild(el("h1", {}, "Mine favoritter"));
    const favs = store.favoritesForUser(user.id);
    const pubs = favs.map(f => getPublication(f.publicationId)).filter(Boolean);

    if (!pubs.length) {
      root.appendChild(el("div", { class: "empty card" }, [
        el("h2", {}, "Du har ingen favoritter endnu"),
        el("p", { class: "muted" }, "Marker en publikation med hjertet for at gemme den her."),
        el("a", { class: "btn", href: "#/search" }, "Find publikationer")
      ]));
      return;
    }

    const list = el("div", { class: "results-list" });
    pubs.forEach(p => list.appendChild(renderPubCard(p, {
      onFavoriteChange: (isFav) => { if (!isFav) paint(); }
    })));
    root.appendChild(list);
  }

  paint();
}
