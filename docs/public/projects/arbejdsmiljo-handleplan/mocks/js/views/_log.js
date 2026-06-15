import { el, formatDateTime } from "../util.js";
import { iconHtml } from "../icons.js";

const TYPE_ICON = {
  created: "document",
  updated: "edit",
  "action-added": "plus",
  "action-edited": "edit",
  "action-resolved": "check",
  "section-edited": "edit",
  reviewed: "shield",
  shared: "share"
};

// Human-readable labels for log types — used by the log filter dropdown.
export const LOG_TYPE_LABEL = {
  created: "Oprettet",
  updated: "Opdateret",
  "action-added": "Indsats tilføjet",
  "action-edited": "Indsats ændret",
  "action-resolved": "Indsats løst",
  "section-edited": "Sektion ændret",
  reviewed: "Revideret",
  shared: "Delt"
};

export function renderLog(log) {
  if (!log || log.length === 0) {
    return el("p", { class: "muted" }, "Ingen log-indgange endnu. Alle ændringer registreres automatisk.");
  }
  const sorted = [...log].sort((a, b) => (b.at || "").localeCompare(a.at || ""));
  return el("div", { class: "timeline" }, sorted.map(entry =>
    el("div", { class: "timeline-entry", dataset: { type: entry.type } }, [
      el("span", { class: "timeline-dot", html: iconHtml(TYPE_ICON[entry.type] || "edit", { size: 14 }) }),
      el("div", { class: "timeline-body" }, [
        el("p", { class: "summary" }, entry.summary),
        entry.details ? el("p", { class: "details" }, entry.details) : null,
        el("span", { class: "when" }, `${formatDateTime(entry.at)} · ${entry.userName || "Ukendt"}`)
      ])
    ])
  ));
}
