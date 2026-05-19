import { el, clear } from "../util.js";
import { searchPublications, buildFacets, rightsLevelInfo, getAllPublications } from "../catalog.js";
import { renderPubCard } from "./_pub-card.js";

const DOC_TYPE_LABEL = {
  rapport: "Rapport",
  analyse: "Analyse",
  strategi: "Strategi",
  vejledning: "Vejledning",
  evaluering: "Evaluering",
  hvidbog: "Hvidbog"
};

const RISK_LABEL = { green: "Grøn (lav)", yellow: "Gul (vurder)", red: "Rød (kræver afklaring)" };
const RECENT_KEY = "dv:recent-searches";
const FACET_OPEN_KEY = "dv:facet-open";
const FACET_DEFAULT_OPEN = new Set(["Myndighed", "Dokumenttype"]);

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
    publishers: new Set(),
    documentTypes: new Set(),
    subjectAreas: new Set(),
    years: new Set(),
    rightsLevels: new Set(),
    riskLevels: new Set()
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
    const results = searchPublications(state);
    const facets = buildFacets(getAllPublications());

    renderAside();
    renderMain(results);
    renderContext(results);
    syncUrl();

    function renderAside() {
      clear(aside);
      aside.appendChild(el("h3", { style: "margin-top:0;" }, "Filtre"));

      aside.appendChild(facetGroup("Myndighed", facets.publishers, state.publishers));
      aside.appendChild(facetGroup("Dokumenttype", facets.documentTypes, state.documentTypes, (k) => DOC_TYPE_LABEL[k] || k));
      aside.appendChild(facetGroup("Fagområde", facets.subjectAreas, state.subjectAreas));
      aside.appendChild(facetGroup("År", facets.years, state.years, null, true));
      aside.appendChild(facetGroup(
        "Rettighedsniveau",
        facets.rightsLevels,
        state.rightsLevels,
        (k) => `${k}. ${rightsLevelInfo(Number(k)).title}`,
        true,
        (k) => Number(k)
      ));
      aside.appendChild(facetGroup("Risiko (persondata)", facets.riskLevels, state.riskLevels, (k) => RISK_LABEL[k] || k));

      if (anyFilter()) {
        aside.appendChild(el("button", {
          class: "btn btn-secondary btn-sm mt-3",
          onclick: () => {
            ["publishers","documentTypes","subjectAreas","years","rightsLevels","riskLevels"].forEach(k => state[k].clear());
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
          el("h2", {}, "Ingen publikationer matcher"),
          el("p", { class: "muted" }, "Prøv at slække på filtrene eller skriv en bredere søgning.")
        ]));
        return;
      }

      const list = el("div", { class: "results-list" });
      results.forEach(p => list.appendChild(renderPubCard(p)));
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

      // Training data callout for high-rights matches
      const trainable = results.filter(r => r.rightsLevel >= 5).length;
      if (trainable > 0) {
        const callout = el("aside", { class: "context-aside" });
        callout.appendChild(el("h3", {}, "Til træningsdatabank"));
        callout.appendChild(el("p", { class: "context-empty" }, `${trainable} af resultaterne kan bruges til AI-træning (niveau 5+).`));
        context.appendChild(callout);
      }
    }

    function collectActiveChips() {
      const chips = [];
      if (state.q) {
        chips.push(makeChip(`"${state.q}"`, () => { state.q = ""; update(); }));
      }
      state.publishers.forEach(v => chips.push(makeChip(v, () => { state.publishers.delete(v); update(); })));
      state.documentTypes.forEach(v => chips.push(makeChip(DOC_TYPE_LABEL[v] || v, () => { state.documentTypes.delete(v); update(); })));
      state.subjectAreas.forEach(v => chips.push(makeChip(v, () => { state.subjectAreas.delete(v); update(); })));
      state.years.forEach(v => chips.push(makeChip(v, () => { state.years.delete(v); update(); })));
      state.rightsLevels.forEach(v => chips.push(makeChip(`Niveau ${v}`, () => { state.rightsLevels.delete(v); update(); })));
      state.riskLevels.forEach(v => chips.push(makeChip(RISK_LABEL[v] || v, () => { state.riskLevels.delete(v); update(); })));
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

  function facetGroup(label, counts, selectedSet, labelFn, sortNumeric, parseFn) {
    let entries = [...counts.entries()];
    if (sortNumeric) {
      entries.sort((a, b) => Number(a[0]) - Number(b[0]));
    } else {
      entries.sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0]), "da"));
    }

    const ul = el("ul");
    for (const [key, count] of entries) {
      const value = parseFn ? parseFn(key) : key;
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
    return state.publishers.size || state.documentTypes.size || state.subjectAreas.size
      || state.years.size || state.rightsLevels.size || state.riskLevels.size;
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
