import { el, clear, navigate, toast, formatDate, formatDateShort, addMonths, todayISO, debounce } from "../util.js";
import { iconHtml } from "../icons.js";
import { store, uid } from "../store.js";
import { auth } from "../auth.js";
import { reviewStatus, reviewBadgeClass, recomputeAction, logEvent, planSummaryStats, actionsByRisk, locationBackgroundText, RISK_RANK } from "../plan-helpers.js";
import { renderActionRow } from "./_action-row.js";
import { renderRiskMatrix, renderRiskLegend } from "./_risk-matrix.js";
import { renderLog, LOG_TYPE_LABEL } from "./_log.js";
import { openShareModal } from "./_share-modal.js";
import { openEvaluationModal } from "./_evaluation-modal.js";
import { openHandlingerModal } from "./_handlinger-modal.js";

// Section 9 (Afvigelser) is intentionally hidden for now — it may be removed
// entirely, so it must not surface anywhere in the prototype.
const TABS = [
  { id: "actions",    label: "1. Handleplan" },
  { id: "risk",       label: "2. Risikovurdering" },
  { id: "top",        label: "3. Væsentligste forhold" },
  { id: "wheel",      label: "4. Årshjul" },
  { id: "competence", label: "5. Kompetencer" },
  { id: "sick",       label: "6. Sygefravær" },
  { id: "incidents",  label: "7. Hændelser" },
  { id: "accidents",  label: "8. Ulykker" },
  { id: "log",        label: "Log" }
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

export function render(root, query = {}, params = {}) {
  clear(root);
  const plan = store.getPlan(params.id);
  if (!plan) {
    root.appendChild(notFound());
    return;
  }
  const user = auth.currentUser();
  if (plan.ownerId !== user.id) {
    root.appendChild(el("div", { class: "card empty" }, [
      el("h2", {}, "Adgang nægtet"),
      el("p", {}, "Denne handleplan tilhører en anden bruger."),
      el("a", { class: "btn mt-3", href: "#/plans" }, "Tilbage til mine handleplaner")
    ]));
    return;
  }

  // Mutate plan locally; persist with savePlan(plan) after each change.
  const activeTab = TABS.find(t => t.id === query.tab) ? query.tab : "actions";
  const save = () => store.savePlan(plan);
  const saveAndLog = (type, summary, details) => {
    logEvent(plan, type, summary, details);
    save();
  };
  const goTab = (tabId) => { navigate(`#/plans/${plan.id}?tab=${tabId}`); };

  // Header + meta
  root.appendChild(renderHeader(plan, { saveAndLog, save }));
  // Tabs
  root.appendChild(renderTabs(activeTab, goTab));

  // Panel
  const panel = el("section");
  root.appendChild(panel);
  paintPanel();

  function paintPanel() {
    clear(panel);
    const ctx = { plan, save, saveAndLog, repaint: paintPanel };
    switch (activeTab) {
      case "actions":    panel.appendChild(renderActionsPanel(ctx)); break;
      case "risk":       panel.appendChild(renderRiskPanel(ctx)); break;
      case "top":        panel.appendChild(renderTopRisksPanel(ctx)); break;
      case "wheel":      panel.appendChild(renderYearWheelPanel(ctx)); break;
      case "competence": panel.appendChild(renderCompetencePanel(ctx)); break;
      case "sick":       panel.appendChild(renderSickLeavePanel(ctx)); break;
      case "incidents":  panel.appendChild(renderIncidentsPanel(ctx, "incidents", "Uønskede hændelser og nærvedulykker")); break;
      case "accidents":  panel.appendChild(renderIncidentsPanel(ctx, "accidents", "Arbejdsulykker med og uden fravær")); break;
      case "log":        panel.appendChild(renderLogPanel(ctx)); break;
    }
  }
}

function notFound() {
  return el("div", { class: "card empty" }, [
    el("h2", {}, "Handleplanen findes ikke"),
    el("a", { class: "btn mt-3", href: "#/plans" }, "Tilbage til mine handleplaner")
  ]);
}

/* ---------- Header / meta ---------- */

function renderHeader(plan, { saveAndLog, save }) {
  const status = reviewStatus(plan);
  const stats = planSummaryStats(plan);

  const wrap = el("section", { class: "meta-header" });

  // Breadcrumb
  wrap.appendChild(el("div", { class: "breadcrumb" }, [
    el("a", { href: "#/plans" }, "Mine handleplaner"),
    el("span", { class: "breadcrumb-sep" }, "/"),
    el("span", {}, plan.workplace || "Uden arbejdsplads")
  ]));

  // Title row
  wrap.appendChild(el("div", { class: "meta-title-row" }, [
    el("div", { class: "grow" }, [
      el("span", { class: "eyebrow" }, "Arbejdsmiljøhandleplan"),
      el("h1", {}, plan.workplace || "Uden arbejdsplads")
    ]),
    el("div", { class: "meta-actions" }, [
      el("button", {
        class: "btn btn-secondary",
        onclick: () => openShareModal(plan, () => location.hash = location.hash),
        html: iconHtml("share") + "<span>Del</span>"
      }),
      el("button", {
        class: "btn btn-accent",
        onclick: () => {
          plan.nextReviewDate = addMonths(todayISO(), 12);
          saveAndLog("reviewed", `Markeret som revideret. Næste revision ${formatDate(plan.nextReviewDate)}.`);
          toast("Handleplan markeret som revideret.", "ok");
          // Repaint by re-navigating to same route.
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        },
        html: iconHtml("check") + "<span>Markér som revideret</span>"
      })
    ])
  ]));

  // Status badge + stats
  wrap.appendChild(el("div", { class: "row wrap mb-4", style: "gap:12px" }, [
    el("span", { class: `badge ${reviewBadgeClass(status.kind)}` }, status.label),
    el("span", { class: "badge badge-neutral" }, `${stats.open} åbne / ${stats.total} indsatser`),
    stats.high > 0 ? el("span", { class: "badge badge-danger" }, `${stats.high} høj risiko`) : null
  ]));

  // Editable meta grid
  wrap.appendChild(renderMetaGrid(plan, saveAndLog, save));

  return wrap;
}

function renderMetaGrid(plan, saveAndLog, save) {
  const grid = el("dl", { class: "meta-grid" });

  // Workplace (inline edit on blur)
  grid.appendChild(metaCell("Arbejdsplads", el("input", {
    type: "text", value: plan.workplace || "",
    onchange: (e) => {
      const prev = plan.workplace;
      plan.workplace = e.target.value.trim();
      saveAndLog("updated", `Ændrede arbejdsplads fra "${prev || "—"}" til "${plan.workplace}".`);
    }
  })));

  // Theme — used to group plans on "Mine handleplaner".
  grid.appendChild(metaCell("Tema", el("input", {
    type: "text", value: plan.theme || "", placeholder: "Fx Rådhuset, Drift, Dagtilbud…",
    onchange: (e) => {
      const prev = plan.theme;
      plan.theme = e.target.value.trim();
      saveAndLog("updated", `Ændrede tema fra "${prev || "—"}" til "${plan.theme || "—"}".`);
    }
  })));

  grid.appendChild(metaCell("Oprettet", formatDate(plan.createdAt)));
  grid.appendChild(metaCell("Senest opdateret", formatDate(plan.updatedAt)));

  grid.appendChild(metaCell("Næste revisionsdato", el("input", {
    type: "date", value: plan.nextReviewDate || "",
    onchange: (e) => {
      plan.nextReviewDate = e.target.value;
      saveAndLog("updated", `Næste revisionsdato sat til ${formatDate(plan.nextReviewDate)}.`);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  })));

  // AMG members – simple inline list
  const membersWrap = el("div", {});
  function paintMembers() {
    clear(membersWrap);
    const list = el("div", { class: "amg-list" });
    (plan.amgMembers || []).forEach((m, i) => {
      list.appendChild(el("div", { class: "amg-row" }, [
        el("input", { type: "text", placeholder: "Navn", value: m.name || "",
          onchange: (e) => { m.name = e.target.value; saveAndLog("updated", "Opdaterede AMG-medlem."); } }),
        el("input", { type: "text", placeholder: "Rolle (AMR, AML…)", value: m.role || "",
          onchange: (e) => { m.role = e.target.value; saveAndLog("updated", "Opdaterede AMG-medlem."); } }),
        el("button", {
          class: "btn-icon", title: "Fjern", html: iconHtml("trash", { size: 14 }),
          onclick: () => {
            const removed = plan.amgMembers.splice(i, 1)[0];
            saveAndLog("updated", `Fjernede ${removed.name || "medlem"} fra AMG.`);
            paintMembers();
          }
        })
      ]));
    });
    membersWrap.appendChild(list);
    membersWrap.appendChild(el("button", {
      class: "btn btn-ghost btn-sm mt-2",
      onclick: () => {
        plan.amgMembers = plan.amgMembers || [];
        plan.amgMembers.push({ name: "", role: "" });
        paintMembers();
      },
      html: iconHtml("plus", { size: 14 }) + "<span>Tilføj medlem</span>"
    }));
  }
  paintMembers();
  grid.appendChild(metaCell("Arbejdsmiljøgruppens medlemmer", membersWrap, { fullWidth: true }));

  return grid;
}

function metaCell(label, content, { fullWidth = false } = {}) {
  const wrap = el("div", { style: fullWidth ? "grid-column:1 / -1" : "" });
  wrap.appendChild(el("dt", {}, label));
  const dd = el("dd", {});
  dd.appendChild(typeof content === "string" ? document.createTextNode(content) : content);
  wrap.appendChild(dd);
  return wrap;
}

/* ---------- Tabs ---------- */

function renderTabs(activeId, goTab) {
  return el("nav", { class: "tabs", role: "tablist" }, TABS.map(t =>
    el("button", {
      class: "tab-btn" + (t.id === activeId ? " is-active" : ""),
      onclick: () => goTab(t.id),
      role: "tab",
      "aria-selected": t.id === activeId
    }, t.label)
  ));
}

/* ---------- Section 1: Handleplan ---------- */

function renderActionsPanel(ctx) {
  const { plan, save, saveAndLog, repaint } = ctx;

  const wrap = el("section", { class: "card" });
  wrap.appendChild(el("div", { class: "section-head-bar" }, [
    el("div", { class: "info" }, [
      el("h2", {}, "Handleplan for løbende håndtering af risici og muligheder"),
      el("p", {}, "Notér de arbejdsmiljørisici og -muligheder I får kendskab til. Vurder med risikomatrixen i fane 2. Risikofarven opdateres automatisk når I vælger sandsynlighed og konsekvens.")
    ]),
    el("button", {
      class: "btn",
      onclick: () => {
        const a = {
          id: uid("action"),
          createdAt: todayISO(),
          locationBackground: "", location: "", background: "", problem: "",
          probability: null, consequence: null, risk: null,
          sickLeaveLinked: false,
          solutionShort: "", solutionLong: "",
          responsible: "", deadline: "",
          evaluation: "", evaluationTrail: [], handlinger: [],
          status: "open"
        };
        plan.actions = plan.actions || [];
        plan.actions.push(a);
        saveAndLog("action-added", "Tilføjede ny tom indsats.");
        repaint();
      },
      html: iconHtml("plus") + "<span>Tilføj indsats</span>"
    })
  ]));

  if (!plan.actions || plan.actions.length === 0) {
    wrap.appendChild(el("div", { class: "empty" }, [
      el("p", {}, "Ingen indsatser endnu. Tilføj den første ovenfor.")
    ]));
    return wrap;
  }

  const scroll = el("div", { class: "table-scroll" });
  const table = el("table", { class: "action-table" });
  table.appendChild(el("thead", {}, el("tr", {}, [
    el("th", {}, "Placering & baggrund"),
    el("th", {}, "Problem / observation"),
    el("th", {}, "Risikovurdering"),
    el("th", {}, "Løsning / handlinger"),
    el("th", {}, "Ansvarlig"),
    el("th", {}, "Frist"),
    el("th", {}, "Evaluering"),
    el("th", {}, "")
  ])));
  const tbody = el("tbody", {});
  // Highest risk first — sorts a copy, storage order is untouched.
  const label = (a) => (a.problem || locationBackgroundText(a) || "—").slice(0, 60);
  actionsByRisk(plan.actions).forEach(a => {
    const row = renderActionRow(a, {
      onChange: (changed, opts) => {
        recomputeAction(changed);
        save();
        // Re-sort when a risk score changes so the row moves to its new spot.
        if (opts && opts.repaintRow) repaint();
      },
      onDelete: (changed) => {
        plan.actions = plan.actions.filter(x => x.id !== changed.id);
        saveAndLog("action-edited", `Slettede indsats: "${label(changed)}".`);
        repaint();
      },
      onToggleStatus: (changed) => {
        changed.status = changed.status === "done" ? "open" : "done";
        saveAndLog(changed.status === "done" ? "action-resolved" : "action-edited",
          changed.status === "done"
            ? `Markerede som løst: "${label(changed)}".`
            : `Genåbnede indsats: "${label(changed)}".`);
        repaint();
      },
      onEvaluation: (changed, opts = {}) => {
        openEvaluationModal(changed, {
          readOnly: !!opts.readOnly,
          onSave: () => {
            saveAndLog("action-edited", `Tilføjede evaluering til indsats: "${label(changed)}".`);
            repaint();
          }
        });
      },
      onHandlinger: (changed, opts = {}) => {
        openHandlingerModal(changed, {
          readOnly: !!opts.readOnly,
          onChange: () => {
            saveAndLog("action-edited", `Opdaterede handlinger for indsats: "${label(changed)}".`);
            repaint();
          }
        });
      }
    });
    row.setAttribute("data-id", a.id);
    tbody.appendChild(row);
  });
  table.appendChild(tbody);
  scroll.appendChild(table);
  wrap.appendChild(scroll);

  return wrap;
}

/* ---------- Section 2: Risk matrix ---------- */

function renderRiskPanel({ plan }) {
  // Compute hottest cell: highest risk among open actions.
  let hot = null;
  (plan.actions || []).forEach(a => {
    if (a.status === "done") return;
    if (!a.probability || !a.consequence) return;
    if (!hot || RISK_RANK[a.risk] > RISK_RANK[hot.risk]) hot = a;
  });

  const wrap = el("section", { class: "card" });
  wrap.appendChild(el("div", { class: "section-head-bar" }, [
    el("div", { class: "info" }, [
      el("h2", {}, "Risikovurderingsværktøj"),
      el("p", {}, "Brug matrixen til at vurdere og prioritere de risici I får øje på. Sandsynlighed × konsekvens giver et farvekodet niveau. Når I vælger sandsynlighed og konsekvens i en indsats (fane 1), markeres feltet automatisk her.")
    ])
  ]));

  if (hot) {
    wrap.appendChild(el("p", { class: "muted" }, [
      "Højest prioriterede åbne indsats: ",
      el("strong", {}, (hot.problem || locationBackgroundText(hot) || "—").slice(0, 80)),
      ` (sandsynlighed ${hot.probability}, konsekvens ${hot.consequence})`
    ]));
  }

  wrap.appendChild(el("div", { class: "risk-matrix-wrap" }, [
    renderRiskMatrix({ highlight: hot ? { probability: hot.probability, consequence: hot.consequence } : null }),
    renderRiskLegend()
  ]));

  return wrap;
}

/* ---------- Section 3: Top risks ---------- */

const TOP_OPTIONS = [
  { key: "ulykker",   label: "Ulykker (fald, orden, oplæring, tilsyn)" },
  { key: "mss",       label: "Muskel- og skeletbesvær (arbejdsstillinger, ensidigt arbejde)" },
  { key: "psykisk",   label: "Psykisk arbejdsmiljø (krav, krænkende handlinger, jobusikkerhed)" },
  { key: "stoej",     label: "Støj (mennesker, maskiner, akustik)" },
  { key: "indeklima", label: "Indeklima (temperatur, træk, belysning)" }
];

function renderTopRisksPanel({ plan, saveAndLog }) {
  plan.topRisks = plan.topRisks || { text: "", checks: {} };
  const wrap = el("section", { class: "card" });
  wrap.appendChild(el("div", { class: "section-head-bar" }, [
    el("div", { class: "info" }, [
      el("h2", {}, "Væsentligste arbejdsmiljøforhold"),
      el("p", {}, "Beskriv hvad der fylder mest i jeres arbejdsmiljø, og marker de typiske risikokategorier I arbejder med.")
    ])
  ]));
  wrap.appendChild(el("label", { class: "field" }, [
    "Beskrivelse",
    el("textarea", {
      onchange: (e) => { plan.topRisks.text = e.target.value; saveAndLog("section-edited", "Opdaterede beskrivelsen af væsentligste arbejdsmiljøforhold."); },
      placeholder: "Beskriv hvad der fylder mest i jeres arbejdsmiljø…"
    }, plan.topRisks.text || "")
  ]));
  wrap.appendChild(el("div", { class: "field mt-3" }, [
    el("span", {}, "Typiske risikokategorier"),
    el("div", { class: "mt-2", style: "display:grid;gap:8px" }, TOP_OPTIONS.map(opt =>
      el("label", { class: "row", style: "gap:8px" }, [
        el("input", {
          type: "checkbox",
          checked: !!plan.topRisks.checks[opt.key],
          onchange: (e) => {
            plan.topRisks.checks[opt.key] = e.target.checked;
            saveAndLog("section-edited", `${e.target.checked ? "Markerede" : "Fjernede markering"}: ${opt.label}.`);
          }
        }),
        el("span", {}, opt.label)
      ])
    ))
  ]));
  return wrap;
}

/* ---------- Section 4: Year wheel ---------- */

function renderYearWheelPanel({ plan, saveAndLog, repaint }) {
  plan.yearWheel = plan.yearWheel || [];
  const wrap = el("section", { class: "card" });
  wrap.appendChild(el("div", { class: "section-head-bar" }, [
    el("div", { class: "info" }, [
      el("h2", {}, "Årshjul for arbejdsmiljøgruppens opgaver"),
      el("p", {}, "Notér de opgaver I arbejder med i året. Sæt kryds i den eller de måneder I planlægger at arbejde med opgaven.")
    ]),
    el("button", {
      class: "btn", html: iconHtml("plus") + "<span>Tilføj opgave</span>",
      onclick: () => {
        plan.yearWheel.push({ task: "", responsible: "", months: new Array(12).fill(false) });
        saveAndLog("section-edited", "Tilføjede opgave til årshjul.");
        repaint();
      }
    })
  ]));

  if (plan.yearWheel.length === 0) {
    wrap.appendChild(el("p", { class: "muted" }, "Ingen opgaver i årshjulet endnu."));
    return wrap;
  }

  const tableWrap = el("div", { class: "year-wheel" });
  const table = el("table", {});
  table.appendChild(el("thead", {}, el("tr", {}, [
    el("th", {}, "Opgave"),
    ...MONTHS.map(m => el("th", {}, m)),
    el("th", {}, "Ansvarlig"),
    el("th", {}, "")
  ])));
  const tbody = el("tbody", {});
  plan.yearWheel.forEach((row, idx) => {
    const tr = el("tr", {});
    tr.appendChild(el("td", {}, el("input", {
      type: "text", value: row.task || "", placeholder: "Opgavebeskrivelse",
      onchange: (e) => { row.task = e.target.value; saveAndLog("section-edited", "Opdaterede årshjul-opgave."); }
    })));
    for (let m = 0; m < 12; m++) {
      const td = el("td", { class: row.months[m] ? "month-on" : "" });
      td.appendChild(el("input", {
        type: "checkbox", checked: !!row.months[m],
        onchange: (e) => {
          row.months[m] = e.target.checked;
          td.classList.toggle("month-on", e.target.checked);
          saveAndLog("section-edited", `Markerede ${MONTHS[m]} for opgave "${row.task || "(uden navn)"}".`);
        }
      }));
      tr.appendChild(td);
    }
    tr.appendChild(el("td", {}, el("input", {
      type: "text", value: row.responsible || "", placeholder: "Ansvarlig",
      onchange: (e) => { row.responsible = e.target.value; saveAndLog("section-edited", "Opdaterede ansvarlig i årshjul."); }
    })));
    tr.appendChild(el("td", {}, el("button", {
      class: "btn-icon", title: "Slet", html: iconHtml("trash", { size: 14 }),
      onclick: () => {
        plan.yearWheel.splice(idx, 1);
        saveAndLog("section-edited", "Fjernede opgave fra årshjul.");
        repaint();
      }
    })));
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  tableWrap.appendChild(table);
  wrap.appendChild(tableWrap);
  return wrap;
}

/* ---------- Section 5: Competence ---------- */

function renderCompetencePanel({ plan, saveAndLog, repaint }) {
  plan.competence = plan.competence || [];
  return simpleListPanel({
    title: "Kompetenceudvikling for arbejdsmiljøgruppen",
    intro: "AML/AMR skal tilbydes kompetenceudvikling svarende til minimum 1,5 dag pr. år. Hold overblik her.",
    addLabel: "Tilføj kompetenceforløb",
    rows: plan.competence,
    columns: [
      { key: "who",   label: "Hvem",     placeholder: "Navn" },
      { key: "what",  label: "Hvad",     placeholder: "Kursus/forløb", grow: true },
      { key: "hours", label: "Omfang",   placeholder: "timer/dage", type: "text" }
    ],
    blank: () => ({ who: "", what: "", hours: "" }),
    sectionKey: "competence",
    saveAndLog, repaint
  });
}

/* ---------- Section 6: Sick leave ---------- */

function renderSickLeavePanel({ plan, saveAndLog, repaint }) {
  plan.sickLeave = plan.sickLeave || [];
  return simpleListPanel({
    title: "Sygefravær",
    intro: "Notér jeres gennemgange af sygefravær. Husk: hvis sygefraværet hænger sammen med arbejdsmiljøet, opret en indsats i fane 1.",
    addLabel: "Tilføj gennemgang",
    rows: plan.sickLeave,
    columns: [
      { key: "date", label: "Dato", type: "date" },
      { key: "notes", label: "Noter / observationer", placeholder: "Beskrivelse af gennemgangen", textarea: true, grow: true }
    ],
    blank: () => ({ date: todayISO(), notes: "" }),
    sectionKey: "sickLeave",
    saveAndLog, repaint
  });
}

/* ---------- Sections 7/8: Incidents and accidents ---------- */

function renderIncidentsPanel({ plan, saveAndLog, repaint }, key, title) {
  plan[key] = plan[key] || [];
  // NOTE: placeholder hrefs — swap in the real SafetyNet / ulykkeshåndbog URLs.
  const intro = key === "incidents"
    ? el("p", {}, [
        "Mindre hændelser og nærvedulykker uden fravær. Alle uønskede hændelser indberettes via ",
        el("a", { href: "#", target: "_blank", rel: "noopener" }, "SafetyNet"),
        "."
      ])
    : el("p", {}, [
        "Arbejdsulykker skal anmeldes inden 14 dage hvis hændelsen medfører fravær eller forventes at give erstatningsberettigede følger. ",
        el("a", { href: "#", target: "_blank", rel: "noopener" }, "Se ulykkeshåndbogen"),
        "."
      ]);
  return simpleListPanel({
    title,
    intro,
    addLabel: key === "incidents" ? "Tilføj hændelse" : "Tilføj ulykke",
    rows: plan[key],
    columns: [
      { key: "date", label: "Dato", type: "date" },
      { key: "description", label: "Beskrivelse", placeholder: "Hvad skete der?", textarea: true, grow: true },
      { key: "cause", label: "Årsag", placeholder: "Anvend analyseguide", textarea: true, grow: true },
      { key: "recurrence", label: "Tidligere?", placeholder: "Lignende hændelser før?", textarea: true },
      { key: "followup", label: "Opfølgning", placeholder: "Hvordan er der fulgt op?", textarea: true, grow: true }
    ],
    blank: () => ({ date: todayISO(), description: "", cause: "", recurrence: "", followup: "" }),
    sectionKey: key,
    saveAndLog, repaint
  });
}

/* ---------- Generic list panel ---------- */

function simpleListPanel({ title, intro, addLabel, rows, columns, blank, sectionKey, saveAndLog, repaint }) {
  const wrap = el("section", { class: "card" });
  // `intro` may be a plain string or a prebuilt node (e.g. with inline links).
  const introNode = typeof intro === "string" ? el("p", {}, intro) : intro;
  wrap.appendChild(el("div", { class: "section-head-bar" }, [
    el("div", { class: "info" }, [
      el("h2", {}, title),
      introNode
    ]),
    el("button", {
      class: "btn", html: iconHtml("plus") + "<span>" + addLabel + "</span>",
      onclick: () => { rows.push(blank()); saveAndLog("section-edited", addLabel + "."); repaint(); }
    })
  ]));

  if (rows.length === 0) {
    wrap.appendChild(el("p", { class: "muted" }, "Ingen indgange endnu."));
    return wrap;
  }

  const scroll = el("div", { class: "table-scroll" });
  const table = el("table", { class: "data-table" });
  table.appendChild(el("thead", {}, el("tr", {},
    [...columns.map(c => el("th", {}, c.label)), el("th", {}, "")])));
  const tbody = el("tbody", {});
  rows.forEach((row, idx) => {
    const tr = el("tr", {});
    columns.forEach(col => {
      const td = el("td", { style: col.grow ? "min-width:220px" : "" });
      if (col.type === "checkbox") {
        td.appendChild(el("input", {
          type: "checkbox", checked: !!row[col.key],
          onchange: (e) => { row[col.key] = e.target.checked; saveAndLog("section-edited", `Opdaterede ${title}.`); }
        }));
      } else if (col.type === "date") {
        td.appendChild(el("input", { type: "date", value: row[col.key] || "",
          onchange: (e) => { row[col.key] = e.target.value; saveAndLog("section-edited", `Opdaterede ${title}.`); } }));
      } else if (col.textarea) {
        td.appendChild(el("textarea", { placeholder: col.placeholder || "",
          onchange: (e) => { row[col.key] = e.target.value; saveAndLog("section-edited", `Opdaterede ${title}.`); }
        }, row[col.key] || ""));
      } else {
        td.appendChild(el("input", {
          type: col.type || "text", value: row[col.key] || "", placeholder: col.placeholder || "",
          onchange: (e) => { row[col.key] = e.target.value; saveAndLog("section-edited", `Opdaterede ${title}.`); }
        }));
      }
      tr.appendChild(td);
    });
    tr.appendChild(el("td", { style: "width:36px" }, el("button", {
      class: "btn-icon", title: "Slet", html: iconHtml("trash", { size: 14 }),
      onclick: () => {
        rows.splice(idx, 1);
        saveAndLog("section-edited", `Fjernede række fra ${title}.`);
        repaint();
      }
    })));
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  scroll.appendChild(table);
  wrap.appendChild(scroll);
  return wrap;
}

/* ---------- Log ---------- */

function renderLogPanel({ plan }) {
  const log = plan.log || [];
  const wrap = el("section", { class: "card" });
  wrap.appendChild(el("div", { class: "section-head-bar" }, [
    el("div", { class: "info" }, [
      el("h2", {}, "Historik / log"),
      el("p", {}, "Automatisk log over alle ændringer på denne handleplan. Nyeste øverst.")
    ])
  ]));

  let userFilter = "all";
  let typeFilter = "all";

  const users = [...new Set(log.map(e => e.userName).filter(Boolean))].sort();
  const types = [...new Set(log.map(e => e.type).filter(Boolean))].sort();

  const timelineWrap = el("div");
  function paintTimeline() {
    clear(timelineWrap);
    const filtered = log.filter(e =>
      (userFilter === "all" || e.userName === userFilter) &&
      (typeFilter === "all" || e.type === typeFilter));
    timelineWrap.appendChild(renderLog(filtered));
  }

  wrap.appendChild(el("div", { class: "log-filters" }, [
    el("label", { class: "field" }, [
      el("span", {}, "Bruger"),
      el("select", { onchange: (e) => { userFilter = e.target.value; paintTimeline(); } }, [
        el("option", { value: "all" }, "Alle brugere"),
        ...users.map(u => el("option", { value: u }, u))
      ])
    ]),
    el("label", { class: "field" }, [
      el("span", {}, "Handling"),
      el("select", { onchange: (e) => { typeFilter = e.target.value; paintTimeline(); } }, [
        el("option", { value: "all" }, "Alle handlinger"),
        ...types.map(t => el("option", { value: t }, LOG_TYPE_LABEL[t] || t))
      ])
    ])
  ]));

  wrap.appendChild(timelineWrap);
  paintTimeline();
  return wrap;
}
