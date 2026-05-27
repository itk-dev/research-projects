import { el, clear, escapeHtml, formatDate, navigate, toast } from "../util.js";
import { getAssistant, dataSensitivityInfo, FRAMEWORK_LABEL, latestVersion } from "../catalog.js";
import { auth } from "../auth.js";
import { store } from "../store.js";
import { iconHtml } from "../icons.js";

const SENSITIVITY_LABEL = {
  almindelige: "Almindelige personoplysninger",
  fortrolige: "Fortrolige data",
  personfoelsomme: "Personfølsomme data"
};

export function render(root, _query, params) {
  clear(root);
  const assistant = getAssistant(params.id);
  if (!assistant) {
    root.appendChild(el("div", { class: "empty card" }, [
      el("h2", {}, "Assistent ikke fundet"),
      el("p", {}, "Linket peger ikke på en eksisterende assistent."),
      el("a", { class: "btn", href: "#/search" }, "Tilbage til kataloget")
    ]));
    return;
  }

  const user = auth.currentUser();
  const isFav = user ? store.isFavorite(user.id, assistant.id) : false;
  const sensitivity = dataSensitivityInfo(assistant.dataSensitivity);
  const versions = assistant.versions || [];

  const grid = el("div", { class: "detail-grid" });
  const main = el("article", { class: "detail-main" });
  const meta = el("aside", { class: "detail-meta-aside" });
  const actionsAside = el("aside", { class: "detail-actions-aside" });

  root.appendChild(el("nav", { class: "breadcrumb" }, [
    el("a", { href: "#/search" }, "Katalog"),
    el("span", { class: "breadcrumb-sep", "aria-hidden": "true" }, "/"),
    el("span", {}, assistant.originKommune)
  ]));

  main.appendChild(el("p", { class: "eyebrow" }, `${assistant.originKommune} · ${assistant.languageModel}`));
  main.appendChild(el("h1", { html: escapeHtml(assistant.name) }));
  if (assistant.tagline) main.appendChild(el("p", { class: "detail-subtitle", html: escapeHtml(assistant.tagline) }));

  main.appendChild(el("div", { class: "badges mb-4" }, [
    el("span", { class: "badge badge-framework" }, FRAMEWORK_LABEL[assistant.framework] || assistant.framework),
    el("span", {
      class: "badge badge-sensitivity",
      dataset: { level: assistant.dataSensitivity },
      title: sensitivity.description
    }, SENSITIVITY_LABEL[assistant.dataSensitivity] || sensitivity.title)
  ]));

  // --- Tabbed sections ---
  const tabs = [
    { id: "beskrivelse", label: "Beskrivelse" },
    { id: "modelkort", label: "Modelkort" },
    { id: "readme", label: "Readme" },
    { id: "viden", label: "Viden" },
    { id: "json", label: "JSON" }
  ];

  const tabBar = el("div", { class: "auth-tabs", role: "tablist", "aria-label": "Assistentdetaljer" });
  const panel = el("div", { class: "tab-panel mt-4" });

  function showTab(id) {
    tabBar.querySelectorAll("button").forEach(b => {
      const active = b.dataset.tab === id;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
    });
    clear(panel);
    panel.appendChild(renderPanel(id));
  }

  tabs.forEach((t, i) => {
    tabBar.appendChild(el("button", {
      type: "button",
      role: "tab",
      "data-tab": t.id,
      class: i === 0 ? "is-active" : "",
      "aria-selected": i === 0 ? "true" : "false",
      onclick: () => showTab(t.id)
    }, t.label));
  });

  main.appendChild(tabBar);
  main.appendChild(panel);
  showTab("beskrivelse");

  function renderPanel(id) {
    if (id === "beskrivelse") {
      const wrap = el("div", {});
      wrap.appendChild(multiline(assistant.description));
      if (assistant.tags?.length) {
        wrap.appendChild(el("h3", { class: "mt-4" }, "Tags"));
        const aiSet = new Set(assistant.aiTags || []);
        wrap.appendChild(el("div", { class: "chips" }, assistant.tags.map(tag =>
          el("span", {
            class: "chip",
            title: aiSet.has(tag) ? "AI-foreslået tag" : null
          }, aiSet.has(tag) ? `${tag} · AI-foreslået` : tag))));
      }
      return wrap;
    }
    if (id === "modelkort") {
      const wrap = el("div", {});
      wrap.appendChild(el("h3", { style: "margin-top:0;" }, "Modelkort"));
      wrap.appendChild(el("p", { class: "muted" }, "Sprogmodel og hensyn ved brug af assistenten."));
      wrap.appendChild(multiline(assistant.modelCard));
      return wrap;
    }
    if (id === "readme") {
      const wrap = el("div", {});
      wrap.appendChild(multiline(assistant.readme));
      return wrap;
    }
    if (id === "viden") {
      const wrap = el("div", {});
      wrap.appendChild(el("h3", { style: "margin-top:0;" }, "Vidensopskrift"));
      wrap.appendChild(el("p", { class: "muted" },
        "Selve videns- og datafilerne kan ikke deles mellem kommuner. Hver kommune leverer sit eget grundlag efter denne opskrift."));
      wrap.appendChild(multiline(assistant.knowledgeRecipe));
      return wrap;
    }
    if (id === "json") {
      return renderJsonPanel();
    }
    return el("div", {});
  }

  function renderJsonPanel() {
    const wrap = el("div", {});
    wrap.appendChild(el("h3", { style: "margin-top:0;" }, "Eksportér konfiguration"));
    wrap.appendChild(el("p", { class: "muted" },
      "Vælg en version og eksportér assistentens OpenWebUI-JSON. Importér filen i din egen OpenWebUI."));

    if (!versions.length) {
      wrap.appendChild(el("p", { class: "muted" }, "Ingen versioner tilgængelige."));
      return wrap;
    }

    let selected = versions[0];

    const select = el("select", {
      "aria-label": "Vælg version",
      onchange: (e) => {
        selected = versions[e.target.selectedIndex] || versions[0];
        renderJson();
      }
    }, versions.map(v =>
      el("option", { value: v.version }, `v${v.version} · ${formatDate(v.releasedAt)}`)));

    const exportBtn = el("button", {
      class: "btn",
      html: `${iconHtml("download")}<span>Eksportér JSON</span>`,
      onclick: () => downloadVersion(assistant, selected)
    });

    wrap.appendChild(el("div", { class: "row wrap", style: "gap:12px; align-items:flex-end; margin-bottom:12px;" }, [
      el("label", { class: "field", style: "margin:0;" }, ["Version", select]),
      exportBtn
    ]));

    const notes = el("p", { class: "muted text-sm" });
    const pre = el("pre", { class: "code-block", style: "white-space:pre; overflow:auto; max-height:420px; background:var(--color-surface-2); padding:16px; border-radius:8px; border:1px solid var(--color-line);" });

    function renderJson() {
      notes.textContent = selected.notes ? `Ændringer: ${selected.notes}` : "";
      pre.innerHTML = escapeHtml(JSON.stringify(selected.json, null, 2));
    }
    renderJson();

    wrap.appendChild(notes);
    wrap.appendChild(pre);
    return wrap;
  }

  // --- Actions column ---
  const actions = el("div", { class: "detail-actions" });
  actions.appendChild(el("button", {
    class: "btn",
    html: `${iconHtml("download")}<span>Hjemtag (eksportér JSON)</span>`,
    onclick: () => {
      const v = latestVersion(assistant);
      if (!v) { toast("Ingen version at eksportere"); return; }
      downloadVersion(assistant, v);
    }
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
      const now = store.toggleFavorite(u.id, assistant.id);
      favBtn.innerHTML = favLabel(now);
    }
  });
  actions.appendChild(favBtn);

  actions.appendChild(el("button", {
    class: "btn btn-secondary",
    html: `${iconHtml("plus")}<span>Føj til samling</span>`,
    onclick: () => openAddToCollection(assistant)
  }));
  actionsAside.appendChild(actions);

  // --- Metadata column ---
  meta.appendChild(el("p", { class: "eyebrow" }, "Detaljer"));
  const dl = el("dl", { class: "detail-meta" });
  appendMeta(dl, "Oprindelseskommune", assistant.originKommune);
  appendMeta(dl, "Sprogmodel", assistant.languageModel);
  appendMeta(dl, "Rammeværk", FRAMEWORK_LABEL[assistant.framework] || assistant.framework);
  appendMeta(dl, "Datafølsomhed", SENSITIVITY_LABEL[assistant.dataSensitivity] || sensitivity.title);
  if (assistant.approvedFor?.length) {
    appendMeta(dl, "Godkendt til", assistant.approvedFor.map(l => SENSITIVITY_LABEL[l] || l).join(", "));
  }
  appendMeta(dl, "Dato oprettet", formatDate(assistant.createdAt));
  appendMeta(dl, "Dato opdateret", formatDate(assistant.updatedAt));
  appendMeta(dl, "Antal versioner", String(versions.length));
  meta.appendChild(dl);

  grid.appendChild(main);
  grid.appendChild(meta);
  grid.appendChild(actionsAside);
  root.appendChild(grid);
}

/* Split a multi-paragraph string into <p> elements, preserving single line
   breaks inside a paragraph via white-space:pre-wrap. */
function multiline(text) {
  const wrap = el("div", { class: "resume-block" });
  const blocks = String(text || "").split(/\n{2,}/);
  blocks.forEach(b => {
    if (!b.trim()) return;
    wrap.appendChild(el("p", { style: "white-space:pre-wrap;", text: b }));
  });
  if (!wrap.childNodes.length) wrap.appendChild(el("p", { class: "muted" }, "Ingen tekst."));
  return wrap;
}

/* Trigger a real download of the version's JSON via a Blob + object URL. */
function downloadVersion(assistant, version) {
  const data = JSON.stringify(version.json, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const slug = (version.json?.id || assistant.id || "assistant").replace(/[^a-z0-9-]+/gi, "-");
  const a = document.createElement("a");
  a.href = url;
  a.download = `${slug}-v${version.version}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast(`Eksporterede ${slug}-v${version.version}.json`);
}

function appendMeta(dl, label, value) {
  if (!value) return;
  dl.appendChild(el("dt", {}, label));
  dl.appendChild(el("dd", { text: value }));
}

async function openAddToCollection(assistant) {
  const { showAddToCollectionModal } = await import("./_collection-modal.js");
  showAddToCollectionModal(assistant);
}
