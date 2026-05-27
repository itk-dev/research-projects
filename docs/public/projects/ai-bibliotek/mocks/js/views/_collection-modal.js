import { el, toast, navigate } from "../util.js";
import { auth } from "../auth.js";
import { store } from "../store.js";
import { createCollection, addAssistantToCollection } from "../collections.js";

/* Modal for working with collections.
   - assistant provided → "Føj til samling": pick an existing or create + add.
   - assistant omitted   → "Opret ny samling": only the create form.
   opts.onCreated(collection) fires after a new collection is created. */
export function showCollectionModal(assistant = null, opts = {}) {
  const user = auth.currentUser();
  if (!user) { toast("Log ind for at bruge samlinger"); navigate("#/login"); return; }

  const backdrop = el("div", {
    class: "modal-backdrop",
    onclick: (e) => { if (e.target === backdrop) close(); }
  });
  const modal = el("div", { class: "modal", role: "dialog", "aria-modal": "true" });

  function close() { backdrop.remove(); }

  if (assistant) {
    modal.appendChild(el("h3", {}, "Føj til samling"));
    modal.appendChild(el("p", { class: "muted text-sm" }, `“${assistant.name}” gemmes i den valgte samling.`));

    const own = store.collectionsForUser(user.id);
    if (own.length) {
      const list = el("div", { class: "form-grid" });
      for (const c of own) {
        const already = c.assistantIds.includes(assistant.id);
        list.appendChild(el("button", {
          class: "btn btn-secondary",
          style: "justify-content:flex-start;",
          onclick: () => {
            if (already) { toast("Assistenten er allerede i samlingen."); close(); return; }
            addAssistantToCollection(c.id, assistant.id);
            toast(`Tilføjet til “${c.name}”`);
            close();
          }
        }, c.name + (already ? " · allerede tilføjet" : ` · ${c.assistantIds.length} assistenter`)));
      }
      modal.appendChild(list);
      modal.appendChild(el("hr", { class: "divider" }));
    }
  } else {
    modal.appendChild(el("h3", {}, "Opret ny samling"));
    modal.appendChild(el("p", { class: "muted text-sm" }, "Saml relaterede assistenter og del dem som et link."));
  }

  const form = el("form", {
    class: "form-grid",
    onsubmit: (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      const name = (data.name || "").trim();
      if (!name) { toast("Giv samlingen et navn"); return; }
      const c = createCollection(user.id, name, data.description || "");
      if (assistant) {
        addAssistantToCollection(c.id, assistant.id);
        toast(`Oprettet “${c.name}” og tilføjet assistent`);
      } else {
        toast(`Samling “${c.name}” oprettet`);
      }
      close();
      opts.onCreated?.(c);
    }
  }, [
    assistant ? el("strong", {}, "…eller opret en ny samling") : null,
    el("label", { class: "field" }, [
      "Navn",
      el("input", { type: "text", name: "name", required: true, placeholder: "f.eks. Borgerservice-assistenter", autofocus: true })
    ]),
    el("label", { class: "field" }, [
      "Beskrivelse (valgfri)",
      el("input", { type: "text", name: "description" })
    ]),
    el("div", { class: "modal-actions" }, [
      el("button", { type: "button", class: "btn btn-secondary", onclick: close }, "Annullér"),
      el("button", { type: "submit", class: "btn" }, assistant ? "Opret og tilføj" : "Opret samling")
    ])
  ]);
  modal.appendChild(form);

  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  // Focus the name input for fast keyboard flow
  const nameInput = modal.querySelector('input[name="name"]');
  nameInput?.focus();
}

/* Backwards-compatible alias (detail.js still imports this). */
export const showAddToCollectionModal = (assistant) => showCollectionModal(assistant);
