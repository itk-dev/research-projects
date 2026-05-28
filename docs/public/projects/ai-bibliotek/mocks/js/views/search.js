import { el, clear } from "../util.js";
import { searchAssistants, buildFacets, getAllAssistants, FRAMEWORK_LABEL } from "../catalog.js";
import { renderAssistantCard } from "./_assistant-card.js";

const SENSITIVITY_LABEL = {
  almindelige: "Almindelige personoplysninger",
  fortrolige: "Fortrolige data",
  personfoelsomme: "Personfølsomme data"
};

const RECENT_KEY = "ab:recent-searches";
const FACET_OPEN_KEY = "ab:facet-open";
const FACET_DEFAULT_OPEN = new Set(["Kommune", "Sprogmodel"]);

function loadFacetOpen() {
  try { return new Set(JSON.parse(localStorage.getItem(FACET_OPEN_KEY) || "null") || FACET_DEFAULT_OPEN); }
  catch { return new Set(FACET_DEFAULT_OPEN); }
}
function persistFacetOpen(set) {
  localStorage.setItem(FACET_OPEN_KEY, JSON.stringify([...set]));
}

function loadRecentSearches() {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); } catch { return []; }
}
function pushRecentSearch(q) {
  if (!q) return;
  const list = loadRecentSearches().filter(x => x !== q);
  list.unshift(q);
  localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 6)));
}

export function render(root, query = {}) {
  clear(root);

  const state = {
    q: query.q || "",
    kommuner: new Set(),
    languageModels: new Set(),
    frameworks: new Set(),
    sensitivities: new Set()
  };

  if (state.q) pushRecentSearch(state.q);

  const openFacets = loadFacetOpen();
  const layout = el("div", { class: "search-layout" });
  const aside = el("aside", { class: "facet-aside", "aria-label": "Filtre" });
  const main = el("div", { style: "min-width: 0;" });
  const context = el("div", { class: "context-rail" });
  layout.appendChild(aside);
  layout.appendChild(main);
  layout.appendChild(context);
  root.appendChild(layout);

  function update() {
    const results = searchAssistants(state);
    const facets = buildFacets(getAllAssistants());

    renderAside();
    renderMain(results);
    renderContext(results);
    syncUrl();

    function renderAside() {
      clear(aside);
      aside.appendChild(el("h3", { style: "margin-top:0;" }, "Filtre"));

      aside.appendChild(facetGroup("Kommune", facets.kommuner, state.kommuner));
      aside.appendChild(facetGroup("Sprogmodel", facets.languageModels, state.languageModels));
      aside.appendChild(facetGroup("Rammeværk", facets.frameworks, state.frameworks, (k) => FRAMEWORK_LABEL[k] || k));
      aside.appendChild(facetGroup("Datafølsomhed", facets.sensitivities, state.sensitivities, (k) => SENSITIVITY_LABEL[k] || k));

      if (anyFilter()) {
        aside.appendChild(el("button", {
          class: "btn btn-secondary btn-sm mt-3",
          onclick: () => {
            ["kommuner","languageModels","frameworks","sensitivities"].forEach(k => state[k].clear());
            update();
          }
        }, "Nulstil filtre"));
      }
    }

    function renderMain(results) {
      clear(main);
      const formChildren = [
        el("input", { type: "search", name: "q", value: state.q, placeholder: "Søg…", "aria-label": "Søg" })
      ];
      if (state.q) {
        formChildren.push(el("button", {
          class: "btn btn-secondary",
          type: "button",
          onclick: () => { state.q = ""; update(); }
        }, "Nulstil"));
      }
      formChildren.push(el("button", { class: "btn", type: "submit" }, "Søg"));

      const header = el("div", { class: "results-header" }, [
        el("form", {
          role: "search",
          style: "flex:1; display:flex; gap:8px; max-width:560px;",
          onsubmit: (e) => {
            e.preventDefault();
            state.q = (new FormData(e.target).get("q") || "").trim();
            if (state.q) pushRecentSearch(state.q);
            update();
          }
        }, formChildren),
        el("span", { class: "count" }, `${results.length} resultat${results.length === 1 ? "" : "er"}`)
      ]);
      main.appendChild(header);

      if (!results.length) {
        main.appendChild(el("div", { class: "empty card" }, [
          el("h2", {}, "Ingen assistenter matcher"),
          el("p", { class: "muted" }, "Prøv at slække på filtrene eller skriv en bredere søgning.")
        ]));
        return;
      }

      const list = el("div", { class: "results-list" });
      results.forEach(a => list.appendChild(renderAssistantCard(a)));
      main.appendChild(list);
    }

    function renderContext(results) {
      clear(context);

      // Active filters
      const filtersCard = el("aside", { class: "context-aside" });
      filtersCard.appendChild(el("h3", {}, "Aktive filtre"));
      const chips = collectActiveChips();
      if (chips.length) {
        const wrap = el("div", { class: "active-filters" }, chips);
        filtersCard.appendChild(wrap);
      } else {
        filtersCard.appendChild(el("p", { class: "context-empty" }, "Ingen filtre aktive."));
      }
      context.appendChild(filtersCard);

      // Recent searches
      const recent = loadRecentSearches();
      if (recent.length) {
        const recentCard = el("aside", { class: "context-aside" });
        recentCard.appendChild(el("h3", {}, "Seneste søgninger"));
        const ul = el("ul", { class: "recent-searches" });
        recent.forEach(q => {
          ul.appendChild(el("li", {}, el("a", {
            href: "#",
            onclick: (e) => { e.preventDefault(); state.q = q; update(); }
          }, q)));
        });
        recentCard.appendChild(ul);
        context.appendChild(recentCard);
      }

      // "Klar til hjemtagning" callout — all catalog assistants can be exported.
      if (results.length) {
        const callout = el("aside", { class: "context-aside" });
        callout.appendChild(el("h3", {}, "Klar til hjemtagning"));
        callout.appendChild(el("p", { class: "context-empty" }, `Alle ${results.length} resultat${results.length === 1 ? "" : "er"} kan eksporteres som OpenWebUI-JSON og køres lokalt.`));
        context.appendChild(callout);
      }
    }

    function collectActiveChips() {
      const chips = [];
      if (state.q) {
        chips.push(makeChip(`"${state.q}"`, () => { state.q = ""; update(); }));
      }
      state.kommuner.forEach(v => chips.push(makeChip(v, () => { state.kommuner.delete(v); update(); })));
      state.languageModels.forEach(v => chips.push(makeChip(v, () => { state.languageModels.delete(v); update(); })));
      state.frameworks.forEach(v => chips.push(makeChip(FRAMEWORK_LABEL[v] || v, () => { state.frameworks.delete(v); update(); })));
      state.sensitivities.forEach(v => chips.push(makeChip(SENSITIVITY_LABEL[v] || v, () => { state.sensitivities.delete(v); update(); })));
      return chips;
    }
  }

  function makeChip(label, onRemove) {
    return el("button", {
      class: "filter-chip",
      type: "button",
      onclick: onRemove,
      "aria-label": `Fjern filter: ${label}`
    }, [label, el("span", { class: "filter-chip-x", "aria-hidden": "true" }, "×")]);
  }

  function facetGroup(label, counts, selectedSet, labelFn) {
    let entries = [...counts.entries()];
    entries.sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0]), "da"));

    const ul = el("ul");
    for (const [key, count] of entries) {
      const value = key;
      const checked = selectedSet.has(value);
      ul.appendChild(el("li", {}, el("label", {}, [
        el("input", {
          type: "checkbox",
          checked,
          onchange: (e) => {
            if (e.target.checked) selectedSet.add(value);
            else selectedSet.delete(value);
            update();
          }
        }),
        el("span", {}, labelFn ? labelFn(key) : key),
        el("span", { class: "count" }, String(count))
      ])));
    }

    // Force-open if the group has an active filter, otherwise respect user preference.
    const isOpen = selectedSet.size > 0 || openFacets.has(label);
    const summary = el("summary", {}, [
      el("h4", {}, label),
      el("span", { class: "facet-chevron", "aria-hidden": "true" })
    ]);
    const details = el("details", {
      class: "facet-group",
      open: isOpen,
      ontoggle: (e) => {
        if (e.target.open) openFacets.add(label);
        else openFacets.delete(label);
        persistFacetOpen(openFacets);
      }
    }, [summary, ul]);

    return details;
  }

  function anyFilter() {
    return state.kommuner.size || state.languageModels.size
      || state.frameworks.size || state.sensitivities.size;
  }

  function syncUrl() {
    const params = [];
    if (state.q) params.push(`q=${encodeURIComponent(state.q)}`);
    const hash = "#/search" + (params.length ? `?${params.join("&")}` : "");
    if (window.location.hash !== hash) {
      history.replaceState(null, "", hash);
    }
  }

  update();
}
