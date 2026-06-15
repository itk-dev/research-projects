import { el, clear, formatDate } from "../util.js";
import { iconHtml } from "../icons.js";
import { store } from "../store.js";
import { RISK_META, PROBABILITY_LABELS, CONSEQUENCE_LABELS } from "../risk.js";
import { reviewStatus, reviewBadgeClass, planSummaryStats, actionsByRisk, locationBackgroundText } from "../plan-helpers.js";
import { renderRiskMatrix, renderRiskLegend } from "./_risk-matrix.js";
import { renderLog } from "./_log.js";

export function render(root, query, params) {
  clear(root);
  const plan = store.findPlanByShareToken(params.token);
  if (!plan) {
    root.appendChild(el("div", { class: "card empty" }, [
      el("h2", {}, "Linket er ikke gyldigt"),
      el("p", {}, "Delelinket findes ikke i denne browsers data. Måske er det udløbet, eller du åbner det fra en anden computer end demoen blev oprettet på.")
    ]));
    return;
  }

  const share = (plan.shares || []).find(s => s.token === params.token);
  const status = reviewStatus(plan);
  const stats = planSummaryStats(plan);

  // Banner
  root.appendChild(el("div", { class: "shared-banner" }, [
    el("span", { html: iconHtml("eye") }),
    el("div", { class: "grow" }, [
      el("strong", {}, "Delt arbejdsmiljøhandleplan"),
      " — du ser denne version som modtager. ",
      share ? el("span", { class: "muted text-sm" },
        `Sendt til ${share.recipientName || share.recipientEmail} d. ${formatDate(share.sentAt)}.`) : null
    ])
  ]));

  // Meta header (read-only)
  root.appendChild(el("section", { class: "meta-header" }, [
    el("span", { class: "eyebrow" }, "Arbejdsmiljøhandleplan"),
    el("h1", {}, plan.workplace || "Uden arbejdsplads"),
    el("div", { class: "row wrap mt-3", style: "gap:12px" }, [
      el("span", { class: `badge ${reviewBadgeClass(status.kind)}` }, status.label),
      el("span", { class: "badge badge-neutral" }, `${stats.open} åbne / ${stats.total} indsatser`),
      stats.high > 0 ? el("span", { class: "badge badge-danger" }, `${stats.high} høj risiko`) : null
    ]),
    el("dl", { class: "meta-grid mt-4" }, [
      cell("Arbejdsmiljøgruppens medlemmer", (plan.amgMembers || []).map(m => `${m.name}${m.role ? " ("+m.role+")" : ""}`).filter(Boolean).join(" · ") || "—"),
      cell("Oprettet", formatDate(plan.createdAt)),
      cell("Senest opdateret", formatDate(plan.updatedAt)),
      cell("Næste revisionsdato", plan.nextReviewDate ? formatDate(plan.nextReviewDate) : "—")
    ])
  ]));

  // Section 1: actions
  root.appendChild(section("1. Handleplan", [
    (plan.actions || []).length === 0
      ? el("p", { class: "muted" }, "Ingen indsatser endnu.")
      : renderActionsRead(plan.actions)
  ]));

  // Section 2: risk matrix
  root.appendChild(section("2. Risikovurderingsværktøj",
    el("div", { class: "risk-matrix-wrap" }, [renderRiskMatrix(), renderRiskLegend()])
  ));

  // Section 3
  const tr = plan.topRisks || { text: "", checks: {} };
  root.appendChild(section("3. Væsentligste arbejdsmiljøforhold", [
    tr.text ? el("p", {}, tr.text) : el("p", { class: "muted" }, "Ingen beskrivelse."),
    el("ul", {}, Object.entries(tr.checks || {}).filter(([, v]) => v).map(([k]) =>
      el("li", {}, ({ ulykker: "Ulykker", mss: "Muskel- og skeletbesvær", psykisk: "Psykisk arbejdsmiljø", stoej: "Støj", indeklima: "Indeklima" }[k] || k))
    ))
  ]));

  // Section 4
  root.appendChild(section("4. Årshjul", renderYearWheelRead(plan.yearWheel || [])));

  // Section 5
  root.appendChild(section("5. Kompetenceudvikling",
    renderListRead(plan.competence, [
      { key: "who", label: "Hvem" }, { key: "what", label: "Hvad" }, { key: "hours", label: "Omfang" }
    ])));

  // Section 6
  root.appendChild(section("6. Sygefravær",
    renderListRead(plan.sickLeave, [
      { key: "date", label: "Dato" }, { key: "notes", label: "Noter" }
    ])));

  // Section 7
  root.appendChild(section("7. Uønskede hændelser og nærvedulykker",
    renderListRead(plan.incidents, [
      { key: "date", label: "Dato" }, { key: "description", label: "Beskrivelse" },
      { key: "cause", label: "Årsag" }, { key: "followup", label: "Opfølgning" }
    ])));

  // Section 8
  root.appendChild(section("8. Arbejdsulykker",
    renderListRead(plan.accidents, [
      { key: "date", label: "Dato" }, { key: "description", label: "Beskrivelse" },
      { key: "cause", label: "Årsag" }, { key: "followup", label: "Opfølgning" }
    ])));

  // Section 9 (Afvigelser) intentionally omitted — hidden across the prototype.

  // Log
  root.appendChild(section("Historik / log", renderLog(plan.log || [])));
}

function section(title, body) {
  return el("section", { class: "card" }, [
    el("h2", {}, title),
    ...[].concat(body).filter(Boolean)
  ]);
}

function cell(label, content) {
  const w = el("div", {});
  w.appendChild(el("dt", {}, label));
  w.appendChild(el("dd", {}, content));
  return w;
}

function renderActionsRead(actions) {
  const scroll = el("div", { class: "table-scroll" });
  const table = el("table", { class: "data-table" });
  table.appendChild(el("thead", {}, el("tr", {}, [
    el("th", {}, "Placering & baggrund"), el("th", {}, "Problem"), el("th", {}, "Risiko"),
    el("th", {}, "Løsning / handlinger"), el("th", {}, "Ansvarlig"),
    el("th", {}, "Frist"), el("th", {}, "Status")
  ])));
  const tbody = el("tbody", {});
  // Highest risk first, matching the editable view.
  actionsByRisk(actions).forEach(a => {
    const handlingerCount = (a.handlinger || []).length;
    const tr = el("tr", { class: a.status === "done" ? "is-done" : "" });
    tr.appendChild(el("td", {}, [
      el("strong", {}, locationBackgroundText(a) || "—"),
      a.createdAt ? el("span", { class: "inline-meta" }, `Oprettet ${formatDate(a.createdAt)}`) : null
    ]));
    tr.appendChild(el("td", {}, a.problem || "—"));
    tr.appendChild(el("td", {}, a.risk
      ? el("span", { class: "risk-pill", dataset: { risk: a.risk } }, RISK_META[a.risk].short + ` (S${a.probability}·K${a.consequence})`)
      : el("span", { class: "muted text-sm" }, "Ikke vurderet")
    ));
    tr.appendChild(el("td", {}, [
      a.solutionLong || "—",
      handlingerCount > 0
        ? el("span", { class: "inline-meta" }, `${handlingerCount} ${handlingerCount === 1 ? "handling" : "handlinger"}`)
        : null
    ]));
    tr.appendChild(el("td", {}, a.responsible || "—"));
    tr.appendChild(el("td", {}, a.deadline ? formatDate(a.deadline) : "—"));
    tr.appendChild(el("td", {}, el("span", {
      class: "badge " + (a.status === "done" ? "badge-ok" : a.status === "in-progress" ? "badge-info" : "badge-neutral")
    }, a.status === "done" ? "Løst" : a.status === "in-progress" ? "I gang" : "Åben")));
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  scroll.appendChild(table);
  return scroll;
}

function renderYearWheelRead(rows) {
  if (rows.length === 0) return el("p", { class: "muted" }, "Ingen opgaver.");
  const MONTHS = ["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"];
  const wrap = el("div", { class: "year-wheel" });
  const t = el("table", {});
  t.appendChild(el("thead", {}, el("tr", {},
    [el("th", {}, "Opgave"), ...MONTHS.map(m => el("th", {}, m)), el("th", {}, "Ansvarlig")])));
  const tbody = el("tbody", {});
  rows.forEach(r => {
    const tr = el("tr", {});
    tr.appendChild(el("td", {}, r.task || "—"));
    for (let m = 0; m < 12; m++) {
      tr.appendChild(el("td", { class: r.months[m] ? "month-on" : "" }, r.months[m] ? "✓" : ""));
    }
    tr.appendChild(el("td", {}, r.responsible || "—"));
    tbody.appendChild(tr);
  });
  t.appendChild(tbody);
  wrap.appendChild(t);
  return wrap;
}

function renderListRead(rows, columns) {
  if (!rows || rows.length === 0) return el("p", { class: "muted" }, "Ingen indgange.");
  const scroll = el("div", { class: "table-scroll" });
  const table = el("table", { class: "data-table" });
  table.appendChild(el("thead", {}, el("tr", {}, columns.map(c => el("th", {}, c.label)))));
  const tbody = el("tbody", {});
  rows.forEach(r => {
    const tr = el("tr", {});
    columns.forEach(c => {
      let v = r[c.key];
      if (c.boolean) v = v ? "Ja" : "Nej";
      if (c.key === "date" && v) v = formatDate(v);
      tr.appendChild(el("td", {}, v || "—"));
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  scroll.appendChild(table);
  return scroll;
}
