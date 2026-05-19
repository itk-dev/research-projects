import { el, clear, escapeHtml, formatDate, formatSize, navigate, toast } from "../util.js";
import { getPublication, rightsLevelInfo } from "../catalog.js";
import { auth } from "../auth.js";
import { store } from "../store.js";
import { iconHtml } from "../icons.js";

const RISK_LABEL = { green: "Lav risiko", yellow: "Bør vurderes", red: "Kræver afklaring" };
const DOC_TYPE_LABEL = {
  rapport: "Rapport", analyse: "Analyse", strategi: "Strategi",
  vejledning: "Vejledning", evaluering: "Evaluering", hvidbog: "Hvidbog"
};

export function render(root, _query, params) {
  clear(root);
  const pub = getPublication(params.id);
  if (!pub) {
    root.appendChild(el("div", { class: "empty card" }, [
      el("h2", {}, "Publikation ikke fundet"),
      el("p", {}, "Linket peger ikke på en eksisterende publikation."),
      el("a", { class: "btn", href: "#/search" }, "Tilbage til søgning")
    ]));
    return;
  }

  const user = auth.currentUser();
  const isFav = user ? store.isFavorite(user.id, pub.id) : false;
  const rights = rightsLevelInfo(pub.rightsLevel);

  const grid = el("div", { class: "detail-grid" });
  const main = el("article", { class: "detail-main" });
  const meta = el("aside", { class: "detail-meta-aside" });
  const actionsAside = el("aside", { class: "detail-actions-aside" });

  // Breadcrumb above the grid keeps both columns aligned at the top.
  root.appendChild(el("nav", { class: "breadcrumb" }, [
    el("a", { href: "#/search" }, "Søg"),
    el("span", { class: "breadcrumb-sep", "aria-hidden": "true" }, "/"),
    el("span", {}, pub.publisher)
  ]));

  main.appendChild(el("p", { class: "eyebrow" }, DOC_TYPE_LABEL[pub.documentType] || pub.documentType));
  main.appendChild(el("h1", { html: escapeHtml(pub.title) }));
  if (pub.subtitle) main.appendChild(el("p", { class: "detail-subtitle", html: escapeHtml(pub.subtitle) }));

  main.appendChild(el("div", { class: "badges mb-4" }, [
    el("span", {
      class: "badge badge-rights",
      dataset: { level: String(pub.rightsLevel) },
      title: rights.description
    }, `Niveau ${pub.rightsLevel}: ${rights.title}`),
    el("span", {
      class: "badge badge-risk",
      dataset: { risk: pub.riskLevel }
    }, RISK_LABEL[pub.riskLevel] || RISK_LABEL.green)
  ]));

  main.appendChild(el("h2", {}, "Resume"));
  main.appendChild(el("div", { class: "resume-block" }, [
    el("p", { text: pub.summary })
  ]));

  if (pub.keywords?.length) {
    main.appendChild(el("h3", {}, "Emneord"));
    main.appendChild(el("div", { class: "chips" }, pub.keywords.map(k => el("span", { class: "chip" }, k))));
  }

  if (pub.personalDataFlags?.length || pub.thirdPartyContentFlags?.length) {
    main.appendChild(el("h3", { class: "mt-4" }, "Risikohensyn"));
    const ul = el("ul");
    pub.personalDataFlags?.forEach(f => ul.appendChild(el("li", {}, `Persondata: ${f}`)));
    pub.thirdPartyContentFlags?.forEach(f => ul.appendChild(el("li", {}, `Tredjepartsindhold: ${f}`)));
    main.appendChild(ul);
  }

  // Actions column (far right on wide viewports)
  const actions = el("div", { class: "detail-actions" });
  actions.appendChild(el("button", {
    class: "btn",
    html: `${iconHtml("download")}<span>Hent PDF (demo)</span>`,
    onclick: () => toast("Demo: download er ikke aktiv i prototypen.")
  }));

  function favLabel(active) {
    return `${iconHtml(active ? "heart-filled" : "heart")}<span>${active ? "Favorit" : "Føj til favoritter"}</span>`;
  }
  const favBtn = el("button", {
    class: "btn btn-secondary",
    html: favLabel(isFav),
    onclick: () => {
      const u = auth.currentUser();
      if (!u) { toast("Log ind for at gemme favoritter"); navigate("#/login"); return; }
      const now = store.toggleFavorite(u.id, pub.id);
      favBtn.innerHTML = favLabel(now);
    }
  });
  actions.appendChild(favBtn);

  actions.appendChild(el("button", {
    class: "btn btn-secondary",
    html: `${iconHtml("plus")}<span>Føj til samling</span>`,
    onclick: () => openAddToCollection(pub)
  }));
  actionsAside.appendChild(actions);

  // Metadata column (middle on wide viewports)
  meta.appendChild(el("p", { class: "eyebrow" }, "Detaljer"));
  const dl = el("dl", { class: "detail-meta" });
  appendMeta(dl, "Udgiver", pub.publisher);
  appendMeta(dl, "Forfatter(e)", (pub.authors || []).join(", "));
  appendMeta(dl, "Udgivet", formatDate(pub.publishedAt));
  appendMeta(dl, "Sprog", pub.language === "da" ? "Dansk" : pub.language);
  appendMeta(dl, "Målgruppe", pub.targetAudience);
  appendMeta(dl, "Geografisk omfang", pub.geographicScope);
  if (pub.subjectAreas?.length) appendMeta(dl, "Fagområde", pub.subjectAreas.join(", "));
  appendMeta(dl, "Filnavn", pub.fileName);
  appendMeta(dl, "Filstørrelse", formatSize(pub.fileSize));
  meta.appendChild(dl);

  grid.appendChild(main);
  grid.appendChild(meta);
  grid.appendChild(actionsAside);
  root.appendChild(grid);
}

function appendMeta(dl, label, value) {
  if (!value) return;
  dl.appendChild(el("dt", {}, label));
  dl.appendChild(el("dd", { text: value }));
}

async function openAddToCollection(pub) {
  const { showAddToCollectionModal } = await import("./_collection-modal.js");
  showAddToCollectionModal(pub);
}
