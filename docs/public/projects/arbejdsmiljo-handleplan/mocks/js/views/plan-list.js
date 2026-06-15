import { el, clear, formatDate, debounce } from "../util.js";
import { iconHtml } from "../icons.js";
import { auth } from "../auth.js";
import { userPlans, reviewStatus, reviewBadgeClass, planSummaryStats } from "../plan-helpers.js";

const NO_THEME = "__none__";

export function render(root) {
  clear(root);
  const user = auth.currentUser();
  const plans = userPlans(user.id);

  root.appendChild(el("section", { class: "page-head full" }, [
    el("div", { class: "row between" }, [
      el("div", {}, [
        el("span", { class: "eyebrow" }, "Mine handleplaner"),
        el("h1", {}, `${plans.length} ${plans.length === 1 ? "handleplan" : "handleplaner"}`)
      ]),
      el("a", { class: "btn", href: "#/plans/new", html: iconHtml("plus") + "<span>Opret ny</span>" })
    ])
  ]));

  if (plans.length === 0) {
    root.appendChild(el("div", { class: "card empty" }, [
      el("div", { class: "empty-illus", html: iconHtml("document", { size: 28 }) }),
      el("h2", {}, "Ingen handleplaner endnu"),
      el("p", {}, "Opret din afdelings første handleplan."),
      el("a", { class: "btn mt-3", href: "#/plans/new" }, "Opret handleplan")
    ]));
    return;
  }

  // Filter state — a user with a broad role can otherwise face a long list.
  let search = "";
  let themeFilter = "all";
  const themes = [...new Set(plans.map(p => p.theme).filter(Boolean))].sort();

  const listWrap = el("div");

  function matches(p) {
    const q = search.trim().toLowerCase();
    if (themeFilter === NO_THEME && p.theme) return false;
    if (themeFilter !== "all" && themeFilter !== NO_THEME && p.theme !== themeFilter) return false;
    if (!q) return true;
    const haystack = [
      p.workplace,
      p.theme,
      ...(p.amgMembers || []).map(m => m.name)
    ].filter(Boolean).join(" ").toLowerCase();
    return haystack.includes(q);
  }

  function paintList() {
    clear(listWrap);
    const visible = plans.filter(matches);
    if (visible.length === 0) {
      listWrap.appendChild(el("p", { class: "muted mt-3" }, "Ingen handleplaner matcher din søgning."));
      return;
    }
    renderGrouped(listWrap, visible);
  }

  const onSearch = debounce((v) => { search = v; paintList(); }, 150);

  const filters = el("div", { class: "list-filters" }, [
    el("label", { class: "field grow" }, [
      el("span", {}, "Søg"),
      el("input", {
        type: "search", placeholder: "Søg på arbejdsplads, medlem eller tema…",
        oninput: (e) => onSearch(e.target.value)
      })
    ]),
    el("label", { class: "field" }, [
      el("span", {}, "Tema"),
      el("select", { onchange: (e) => { themeFilter = e.target.value; paintList(); } }, [
        el("option", { value: "all" }, "Alle temaer"),
        ...themes.map(t => el("option", { value: t }, t)),
        el("option", { value: NO_THEME }, "Uden tema")
      ])
    ])
  ]);

  root.appendChild(filters);
  root.appendChild(listWrap);
  paintList();
}

// Render plans grouped under their theme heading; "Uden tema" last.
function renderGrouped(container, plans) {
  const groups = new Map();
  plans.forEach(p => {
    const key = p.theme || NO_THEME;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(p);
  });

  const themed = [...groups.keys()].filter(k => k !== NO_THEME).sort();
  const ordered = groups.has(NO_THEME) ? [...themed, NO_THEME] : themed;

  ordered.forEach(key => {
    container.appendChild(el("div", { class: "plan-group-head" }, [
      el("span", { class: "eyebrow" }, key === NO_THEME ? "Uden tema" : `Tema: ${key}`),
      el("span", { class: "count-badge" }, String(groups.get(key).length))
    ]));
    container.appendChild(el("div", { class: "plan-list" }, groups.get(key).map(p => renderPlanRow(p))));
  });
}

export function renderPlanRow(plan) {
  const status = reviewStatus(plan);
  const stats = planSummaryStats(plan);
  return el("a", { class: "plan-row", href: `#/plans/${plan.id}` }, [
    el("div", {}, [
      el("div", { class: "meta" }, plan.amgMembers.map(m => m.name).filter(Boolean).join(" · ") || "—"),
      el("h3", {}, plan.workplace || "Uden arbejdsplads"),
      el("div", { class: "row wrap", style: "gap:16px" }, [
        el("span", { class: "muted text-sm" }, `${stats.open} åbne / ${stats.total} indsatser`),
        stats.high > 0 ? el("span", { class: "badge badge-danger" }, `${stats.high} høj risiko`) : null,
        el("span", { class: "muted text-sm" }, `Senest opdateret ${formatDate(plan.updatedAt)}`)
      ])
    ]),
    el("div", { class: "right-side" }, [
      el("span", { class: `badge ${reviewBadgeClass(status.kind)}` }, status.label),
      plan.nextReviewDate
        ? el("span", { class: "muted text-sm" }, `Næste revision: ${formatDate(plan.nextReviewDate)}`)
        : null
    ])
  ]);
}
