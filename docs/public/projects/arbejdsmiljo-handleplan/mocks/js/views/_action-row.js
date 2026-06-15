import { el, clear, formatDate } from "../util.js";
import { iconHtml } from "../icons.js";
import { riskLevel, RISK_META, PROBABILITY_LABELS, CONSEQUENCE_LABELS } from "../risk.js";
import { locationBackgroundText } from "../plan-helpers.js";

// Closes any open expandable-text popover. `restoreFocus` returns focus to the
// trigger button so keyboard users stay inside the indsats row instead of being
// dropped at the top of the page; we skip it for click-outside, where focus
// should follow wherever the user clicked.
let activePopover = null;
let activeTrigger = null;
function closeActivePopover({ restoreFocus = false } = {}) {
  if (activePopover) {
    activePopover.remove();
    activePopover = null;
    const trigger = activeTrigger;
    activeTrigger = null;
    if (restoreFocus && trigger) trigger.focus();
  }
}
document.addEventListener("mousedown", (e) => {
  if (activePopover && !activePopover.contains(e.target) && !e.target.closest(".expandable-preview")) {
    closeActivePopover();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && activePopover) closeActivePopover({ restoreFocus: true });
});

function expandableText({ value, placeholder, onChange, muted = false, title = "", help = "" }) {
  const wrap = el("div", { class: "expandable" });
  const preview = el("button", {
    type: "button",
    class: "expandable-preview" + (muted ? " is-muted" : "") + (!value ? " is-empty" : ""),
    onclick: (e) => {
      e.stopPropagation();
      openPopover();
    }
  });

  function paintPreview() {
    clear(preview);
    if (value) {
      preview.appendChild(el("span", { class: "expandable-text" }, value));
    } else {
      preview.appendChild(el("span", { class: "expandable-placeholder" }, placeholder));
    }
    preview.appendChild(el("span", { class: "expandable-edit-hint", html: iconHtml("edit", { size: 12 }) }));
  }
  paintPreview();

  function openPopover() {
    closeActivePopover();
    const rect = preview.getBoundingClientRect();
    const popover = el("div", { class: "expandable-popover" });
    if (title) {
      popover.appendChild(el("div", { class: "expandable-popover-head" }, [
        el("strong", { class: "expandable-popover-title" }, title),
        help ? el("span", { class: "expandable-popover-help" }, help) : null
      ]));
    }
    const ta = el("textarea", {
      placeholder,
      rows: 6,
      onkeydown: (e) => {
        if (e.key === "Escape") { e.preventDefault(); closeActivePopover({ restoreFocus: true }); }
      }
    }, value || "");
    const actions = el("div", { class: "expandable-actions" }, [
      el("button", {
        type: "button", class: "btn btn-secondary btn-sm",
        onclick: () => closeActivePopover({ restoreFocus: true })
      }, "Annullér"),
      el("button", {
        type: "button", class: "btn btn-sm",
        onclick: () => {
          const next = ta.value;
          if (next !== value) {
            value = next;
            onChange && onChange(value);
          }
          paintPreview();
          preview.classList.toggle("is-empty", !value);
          closeActivePopover({ restoreFocus: true });
        }
      }, "Gem")
    ]);
    popover.appendChild(ta);
    popover.appendChild(actions);

    popover.style.position = "fixed";
    popover.style.top = `${rect.bottom + 4}px`;
    popover.style.left = `${rect.left}px`;
    popover.style.minWidth = `${Math.max(rect.width, 320)}px`;

    document.body.appendChild(popover);
    activePopover = popover;
    activeTrigger = preview;

    // Keep on screen
    requestAnimationFrame(() => {
      const pr = popover.getBoundingClientRect();
      if (pr.right > window.innerWidth - 8) {
        popover.style.left = `${Math.max(8, window.innerWidth - pr.width - 8)}px`;
      }
      if (pr.bottom > window.innerHeight - 8) {
        popover.style.top = `${Math.max(8, rect.top - pr.height - 4)}px`;
      }
      ta.focus();
      ta.setSelectionRange(ta.value.length, ta.value.length);
    });
  }

  wrap.appendChild(preview);
  return wrap;
}

export function renderActionRow(action, { onChange, onDelete, onToggleStatus, onEvaluation, onHandlinger, readOnly = false }) {
  const tr = el("tr", {});
  const handlingerCount = (action.handlinger || []).length;
  if (readOnly) {
    tr.appendChild(el("td", {}, [
      el("strong", {}, locationBackgroundText(action) || "—"),
      action.createdAt ? el("span", { class: "inline-meta" }, `Oprettet ${formatDate(action.createdAt)}`) : null
    ]));
    tr.appendChild(el("td", { class: "a-problem" }, action.problem || "—"));
    tr.appendChild(el("td", {}, riskCell(action)));
    tr.appendChild(el("td", {}, [
      action.solutionLong || "—",
      handlingerCount > 0
        ? el("span", { class: "inline-meta" }, `${handlingerCount} ${handlingerCount === 1 ? "handling" : "handlinger"}`)
        : null
    ]));
    tr.appendChild(el("td", {}, action.responsible || "—"));
    tr.appendChild(el("td", {}, action.deadline || "—"));
    tr.appendChild(el("td", {}, action.evaluation || "—"));
    return tr;
  }

  // A "done" indsats is shown as a muted, non-editable summary. Fields can only
  // be changed after reopening it (the prominent green check on the right).
  if (action.status === "done") {
    tr.classList.add("is-resolved");
    tr.appendChild(el("td", { class: "a-location" }, [
      el("span", { class: "resolved-text" }, locationBackgroundText(action) || "—"),
      action.createdAt ? el("span", { class: "inline-meta" }, `Oprettet ${formatDate(action.createdAt)}`) : null
    ]));
    tr.appendChild(el("td", { class: "a-problem" },
      el("span", { class: "resolved-text" }, action.problem || "—")));
    tr.appendChild(el("td", { class: "a-risk" }, riskCell(action)));
    tr.appendChild(el("td", { class: "a-solution" }, [
      el("span", { class: "resolved-text" }, action.solutionLong || "—"),
      el("div", { class: "a-handlinger-control mt-2" }, [
        el("button", {
          type: "button", class: "btn btn-secondary btn-sm a-cell-btn",
          title: "Vis handlinger",
          onclick: () => onHandlinger && onHandlinger(action, { readOnly: true }),
          html: iconHtml("eye", { size: 14 }) +
            `<span>Vis handlinger</span>` +
            (handlingerCount ? `<span class="count-badge">${handlingerCount}</span>` : "")
        })
      ])
    ]));
    tr.appendChild(el("td", { class: "a-responsible" }, el("span", { class: "resolved-text" }, action.responsible || "—")));
    tr.appendChild(el("td", { class: "a-deadline" }, el("span", { class: "resolved-text" }, action.deadline || "—")));
    const resolvedEvalCount = (action.evaluationTrail || []).length || (action.evaluation ? 1 : 0);
    tr.appendChild(el("td", { class: "a-evaluation" }, [
      action.evaluation
        ? el("span", { class: "eval-latest resolved-text" }, action.evaluation)
        : el("span", { class: "muted text-sm" }, "Ingen evaluering"),
      el("button", {
        type: "button", class: "btn btn-secondary btn-sm mt-2 a-cell-btn",
        title: "Vis evaluering og historik",
        onclick: () => onEvaluation && onEvaluation(action, { readOnly: true }),
        html: iconHtml("eye", { size: 14 }) +
          `<span>Vis</span>` +
          (resolvedEvalCount ? `<span class="count-badge">${resolvedEvalCount}</span>` : "")
      })
    ]));
    tr.appendChild(el("td", { class: "a-actions" }, [
      el("div", { class: "a-actions-resolved" }, [
        el("button", {
          class: "resolved-check",
          title: "Genåbn indsats for at redigere",
          onclick: () => onToggleStatus && onToggleStatus(action),
          html: iconHtml("check", { size: 16 }) + "<span>Løst</span>"
        }),
        el("button", {
          class: "btn-icon",
          title: "Slet",
          onclick: () => onDelete && onDelete(action),
          html: iconHtml("trash", { size: 16 })
        })
      ])
    ]));
    return tr;
  }

  const update = (key, value) => {
    action[key] = value;
    if (key === "probability" || key === "consequence") {
      action.probability = Number(action.probability) || null;
      action.consequence = Number(action.consequence) || null;
      action.risk = riskLevel(action.probability, action.consequence);
      onChange && onChange(action, { repaintRow: true });
    } else {
      onChange && onChange(action);
    }
  };

  tr.appendChild(el("td", { class: "a-location" }, [
    expandableText({
      value: locationBackgroundText(action),
      placeholder: "Placering og baggrund",
      title: "Placering & baggrund",
      help: "Hvor er forholdet, og hvad gav anledning til indsatsen? Fx “Storrum 2.04 — APV-tilbagemelding” eller “Trappe ved hovedindgang — nærvedulykke”.",
      onChange: (v) => update("locationBackground", v)
    }),
    el("label", { class: "action-created" }, [
      el("span", { class: "action-created-label" }, "Oprettet"),
      el("input", { type: "date", value: (action.createdAt || "").slice(0, 10),
        onchange: (e) => update("createdAt", e.target.value) })
    ])
  ]));

  tr.appendChild(el("td", { class: "a-problem" }, [
    expandableText({
      value: action.problem,
      placeholder: "Beskriv problem/observation",
      onChange: (v) => update("problem", v)
    })
  ]));

  tr.appendChild(el("td", { class: "a-risk" }, [
    el("div", { class: "risk-selects" }, [
      el("label", { class: "field risk-select-field" }, [
        el("span", { class: "risk-select-label" }, "Sandsynlighed"),
        el("select", { class: "risk-select", onchange: (e) => update("probability", e.target.value) }, [
          el("option", { value: "" }, "Vælg…"),
          ...[1,2,3,4].map(n => el("option", { value: n, selected: action.probability === n },
            `${n} · ${PROBABILITY_LABELS[n]}`))
        ])
      ]),
      el("label", { class: "field risk-select-field" }, [
        el("span", { class: "risk-select-label" }, "Konsekvens"),
        el("select", { class: "risk-select", onchange: (e) => update("consequence", e.target.value) }, [
          el("option", { value: "" }, "Vælg…"),
          ...[1,2,3,4].map(n => el("option", { value: n, selected: action.consequence === n },
            `${n} · ${CONSEQUENCE_LABELS[n].split(" ")[0]}`))
        ])
      ])
    ]),
    el("div", { class: "mt-2" }, riskCell(action)),
    el("label", { class: "row mt-2", style: "font-size:0.8rem; color:var(--color-text-muted); gap:6px" }, [
      el("input", { type: "checkbox", checked: !!action.sickLeaveLinked,
        onchange: (e) => update("sickLeaveLinked", e.target.checked) }),
      "Knyttet til sygefravær"
    ])
  ]));

  tr.appendChild(el("td", { class: "a-solution" }, [
    expandableText({
      value: action.solutionLong,
      placeholder: "Forebyggelse lang sigt",
      onChange: (v) => update("solutionLong", v)
    }),
    el("div", { class: "a-handlinger-control mt-2" }, [
      el("button", {
        type: "button",
        class: "btn btn-secondary btn-sm a-cell-btn",
        title: "Åbn og redigér handlinger",
        onclick: () => onHandlinger && onHandlinger(action),
        html: iconHtml("edit", { size: 14 }) +
          `<span>Åbn handlinger</span>` +
          (handlingerCount ? `<span class="count-badge">${handlingerCount}</span>` : "")
      })
    ])
  ]));

  tr.appendChild(el("td", { class: "a-responsible" }, [
    el("input", { type: "text", placeholder: "Ansvarlig", value: action.responsible || "",
      onchange: (e) => update("responsible", e.target.value) })
  ]));

  tr.appendChild(el("td", { class: "a-deadline" }, [
    el("input", { type: "date", value: action.deadline || "",
      onchange: (e) => update("deadline", e.target.value) })
  ]));

  const evalCount = (action.evaluationTrail || []).length
    || (action.evaluation ? 1 : 0);
  tr.appendChild(el("td", { class: "a-evaluation" }, [
    action.evaluation
      ? el("span", { class: "eval-latest" }, action.evaluation)
      : el("span", { class: "muted text-sm" }, "Ingen evaluering"),
    el("button", {
      type: "button",
      class: "btn btn-secondary btn-sm mt-2 a-cell-btn",
      title: "Åbn evaluering og historik",
      onclick: () => onEvaluation && onEvaluation(action),
      html: iconHtml("edit", { size: 14 }) +
        `<span>Åbn evaluering</span>` +
        (evalCount ? `<span class="count-badge">${evalCount}</span>` : "")
    })
  ]));

  tr.appendChild(el("td", { class: "a-actions" }, [
    el("button", {
      class: "btn-icon",
      title: action.status === "done" ? "Genåbn" : "Markér som løst",
      onclick: () => onToggleStatus && onToggleStatus(action),
      html: iconHtml(action.status === "done" ? "history" : "check", { size: 16 })
    }),
    el("button", {
      class: "btn-icon",
      title: "Slet",
      style: "margin-top:4px",
      onclick: () => onDelete && onDelete(action),
      html: iconHtml("trash", { size: 16 })
    })
  ]));

  return tr;
}

function riskCell(action) {
  const r = action.risk;
  if (!r) return el("span", { class: "muted text-sm" }, "Vurder for resultat");
  return el("span", { class: "risk-pill", dataset: { risk: r } }, RISK_META[r].label);
}
