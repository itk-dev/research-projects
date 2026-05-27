import { el, clear, navigate, toast } from "../util.js";
import { auth } from "../auth.js";
import { store } from "../store.js";
import { renderAssistantCard } from "./_assistant-card.js";

export function render(root) {
  const user = auth.currentUser();
  if (!user) { navigate("#/login"); return; }

  function paint() {
    clear(root);
    root.appendChild(el("h1", {}, "Mine assistenter"));
    root.appendChild(el("p", { class: "muted" },
      "Assistenter du har delt til biblioteket. Du kan trække en assistent tilbage — den fjernes også fra andres favoritter og samlinger."));

    const mine = store.uploadsByUser(user.id)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    if (!mine.length) {
      root.appendChild(el("div", { class: "empty card mt-4" }, [
        el("h2", {}, "Du har ikke delt nogen assistenter endnu"),
        el("p", { class: "muted" }, "Del en assistent fra din myndighed for at gøre den tilgængelig for andre kommuner."),
        el("a", { class: "btn", href: "#/upload" }, "Del assistent")
      ]));
      return;
    }

    const list = el("div", { class: "results-list mt-4" });
    mine.forEach(a => list.appendChild(renderAssistantCard(a, {
      extraAction: el("button", {
        class: "btn btn-danger btn-sm",
        onclick: () => {
          if (!confirm(`Slet assistenten "${a.name}"?\n\nDen fjernes fra biblioteket og alle samlinger.`)) return;
          store.deleteUpload(a.id);
          toast("Assistent slettet");
          paint();
        }
      }, "Slet")
    })));
    root.appendChild(list);
  }

  paint();
}
