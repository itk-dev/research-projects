import { el, clear, navigate, toast } from "../util.js";
import { auth } from "../auth.js";
import { store } from "../store.js";
import { renderPubCard } from "./_pub-card.js";

export function render(root) {
  const user = auth.currentUser();
  if (!user) { navigate("#/login"); return; }

  function paint() {
    clear(root);
    root.appendChild(el("h1", {}, "Mine uploads"));
    root.appendChild(el("p", { class: "muted" },
      "Publikationer du har uploadet til kataloget. Du kan trække en upload tilbage — den fjernes også fra andres favoritter og samlinger."));

    const mine = store.uploadsByUser(user.id)
      .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

    if (!mine.length) {
      root.appendChild(el("div", { class: "empty card mt-4" }, [
        el("h2", {}, "Du har ikke uploadet noget endnu"),
        el("p", { class: "muted" }, "Bidrag med en publikation fra din myndighed for at gøre den søgbar i kataloget."),
        el("a", { class: "btn", href: "#/upload" }, "Upload publikation")
      ]));
      return;
    }

    const list = el("div", { class: "results-list mt-4" });
    mine.forEach(p => list.appendChild(renderPubCard(p, {
      extraAction: el("button", {
        class: "btn btn-danger btn-sm",
        onclick: () => {
          if (!confirm(`Slet uploaden "${p.title}"?\n\nPublikationen fjernes fra kataloget og alle samlinger.`)) return;
          store.deleteUpload(p.id);
          toast("Upload slettet");
          paint();
        }
      }, "Slet")
    })));
    root.appendChild(list);
  }

  paint();
}
