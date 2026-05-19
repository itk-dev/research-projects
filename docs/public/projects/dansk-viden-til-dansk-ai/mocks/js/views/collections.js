import { el, clear, navigate, toast } from "../util.js";
import { auth } from "../auth.js";
import { store } from "../store.js";
import { getPublication } from "../catalog.js";
import { removePublicationFromCollection, buildShareUrl, decodeShareablePayload } from "../collections.js";
import { renderPubCard } from "./_pub-card.js";
import { showCollectionModal } from "./_collection-modal.js";
import { iconHtml } from "../icons.js";

/* List of own collections */
export function render(root) {
  const user = auth.currentUser();
  if (!user) { navigate("#/login"); return; }

  function paint() {
    clear(root);

    const header = el("div", {
      class: "row wrap",
      style: "justify-content:space-between; align-items:flex-start; gap:16px; margin-bottom: 8px;"
    }, [
      el("div", {}, [
        el("h1", { style: "margin:0;" }, "Mine samlinger"),
        el("p", { class: "muted", style: "margin:4px 0 0;" },
          "Saml relaterede publikationer og del dem som et link – f.eks. til kolleger eller borgermøder.")
      ]),
      el("button", {
        class: "btn",
        html: `${iconHtml("plus")}<span>Opret ny samling</span>`,
        onclick: () => showCollectionModal(null, { onCreated: paint })
      })
    ]);
    root.appendChild(header);

    const own = store.collectionsForUser(user.id);
    if (!own.length) {
      root.appendChild(el("div", { class: "empty card mt-4" }, [
        el("h2", {}, "Du har ikke oprettet nogen samlinger endnu"),
        el("p", { class: "muted" }, "Klik på “Opret ny samling” for at komme i gang.")
      ]));
      return;
    }

    own.forEach(c => root.appendChild(renderCollectionCard(c, paint)));
  }

  paint();
}

function renderCollectionCard(c, refresh) {
  const card = el("section", { class: "card mt-4" });
  card.appendChild(el("div", { class: "row wrap", style: "justify-content:space-between; align-items:flex-start;" }, [
    el("div", {}, [
      el("h2", { style: "margin:0;" }, c.name),
      c.description ? el("p", { class: "muted", style: "margin:4px 0 0;" }, c.description) : null,
      el("p", { class: "muted text-sm" }, `${c.publicationIds.length} publikationer · opdateret ${new Date(c.createdAt).toLocaleDateString("da-DK")}`)
    ]),
    el("div", { class: "row" }, [
      el("button", {
        class: "btn btn-secondary btn-sm",
        html: `${iconHtml("link", { size: 16 })}<span>Kopier delelink</span>`,
        onclick: async () => {
          const url = buildShareUrl(c);
          try {
            await navigator.clipboard.writeText(url);
            toast("Delelink kopieret");
          } catch {
            prompt("Kopier delelinket:", url);
          }
        }
      }),
      el("a", {
        class: "btn btn-secondary btn-sm",
        href: `#/collection/${c.shareToken}`,
        title: "Åbn samlingsvisning"
      }, "Vis"),
      el("button", {
        class: "btn btn-danger btn-sm",
        onclick: () => {
          if (confirm(`Slet samlingen "${c.name}"?`)) {
            store.deleteCollection(c.id);
            refresh();
          }
        }
      }, "Slet")
    ])
  ]));

  if (!c.publicationIds.length) {
    card.appendChild(el("p", { class: "muted mt-3" }, "Endnu ingen publikationer. Tilføj fra en publikations side."));
    return card;
  }

  const list = el("div", { class: "results-list mt-3" });
  c.publicationIds.forEach(pid => {
    const p = getPublication(pid);
    if (!p) return;
    list.appendChild(renderPubCard(p, {
      extraAction: el("button", {
        class: "btn btn-ghost btn-sm",
        onclick: () => {
          removePublicationFromCollection(c.id, p.id);
          refresh();
        }
      }, "Fjern")
    }));
  });
  card.appendChild(list);
  return card;
}

/* Shared collection view (#/collection/<token>?d=<payload>) */
export function renderShared(root, query = {}, params = {}) {
  clear(root);
  const token = params.token;
  const localMatch = store.findCollectionByToken(token);
  let collection = localMatch;
  let publications;
  let isShared = false;

  if (query.d) {
    const decoded = decodeShareablePayload(query.d);
    if (decoded && decoded.shareToken === token) {
      isShared = true;
      collection = collection || {
        id: decoded.id,
        name: decoded.name,
        description: decoded.description,
        shareToken: decoded.shareToken,
        createdAt: decoded.createdAt,
        publicationIds: decoded.publications.map(p => p.id),
        ownerId: null
      };
      publications = decoded.publications;
    }
  }

  if (!collection) {
    root.appendChild(el("div", { class: "empty card" }, [
      el("h2", {}, "Samling ikke fundet"),
      el("p", { class: "muted" }, "Linket er ugyldigt eller udløbet. Bed afsenderen om at sende det fulde delelink igen."),
      el("a", { class: "btn", href: "#/" }, "Til forsiden")
    ]));
    return;
  }

  publications = publications || collection.publicationIds.map(id => getPublication(id)).filter(Boolean);

  root.appendChild(el("nav", { class: "muted text-sm mb-3" }, [
    el("a", { href: "#/collections" }, "Samlinger"), " / ", el("span", {}, collection.name)
  ]));
  root.appendChild(el("h1", {}, collection.name));
  if (collection.description) root.appendChild(el("p", { class: "muted" }, collection.description));

  if (isShared) {
    root.appendChild(el("div", { class: "share-notice" },
      "Du ser en delt samling. Publikationerne er indlejret i delelinket og kan tilgås uden login."));
  }

  if (!publications.length) {
    root.appendChild(el("div", { class: "empty card" }, [
      el("p", { class: "muted" }, "Samlingen er tom.")
    ]));
    return;
  }

  const list = el("div", { class: "results-list mt-3" });
  publications.forEach(p => list.appendChild(renderPubCard(p)));
  root.appendChild(list);
}
