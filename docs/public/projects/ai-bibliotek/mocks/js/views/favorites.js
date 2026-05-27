import { el, clear, navigate } from "../util.js";
import { auth } from "../auth.js";
import { store } from "../store.js";
import { getAssistant } from "../catalog.js";
import { renderAssistantCard } from "./_assistant-card.js";

export function render(root) {
  const user = auth.currentUser();
  if (!user) { navigate("#/login"); return; }
  clear(root);

  function paint() {
    clear(root);
    root.appendChild(el("h1", {}, "Mine favoritter"));
    const favs = store.favoritesForUser(user.id);
    const assistants = favs.map(f => getAssistant(f.assistantId)).filter(Boolean);

    if (!assistants.length) {
      root.appendChild(el("div", { class: "empty card" }, [
        el("h2", {}, "Du har ingen favoritter endnu"),
        el("p", { class: "muted" }, "Marker en assistent med hjertet for at gemme den her."),
        el("a", { class: "btn", href: "#/search" }, "Find assistenter")
      ]));
      return;
    }

    const list = el("div", { class: "results-list" });
    assistants.forEach(a => list.appendChild(renderAssistantCard(a, {
      onFavoriteChange: (isFav) => { if (!isFav) paint(); }
    })));
    root.appendChild(list);
  }

  paint();
}
