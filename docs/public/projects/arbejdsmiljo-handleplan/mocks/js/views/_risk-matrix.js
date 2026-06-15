import { el } from "../util.js";
import { riskLevel, RISK_META, PROBABILITY_LABELS, CONSEQUENCE_LABELS } from "../risk.js";

export function renderRiskMatrix({ highlight = null } = {}) {
  // highlight = { probability, consequence } – cell to outline.
  const grid = el("div", { class: "risk-matrix" });

  // Top-left empty corner
  grid.appendChild(el("div", { class: "rm-cell rm-head rm-axis-label" },
    "Sandsynlighed ↓ / Konsekvens →"));
  // Column headers (consequence 1..4)
  for (let c = 1; c <= 4; c++) {
    grid.appendChild(el("div", { class: "rm-cell rm-head" }, [
      el("div", {}, `${CONSEQUENCE_LABELS[c]}`),
      el("div", { style: "opacity:.7" }, `(${c})`)
    ]));
  }

  // Rows: for each probability
  for (let p = 1; p <= 4; p++) {
    grid.appendChild(el("div", { class: "rm-cell rm-row-head" }, [
      el("div", {}, `${PROBABILITY_LABELS[p]}`),
      el("div", { style: "opacity:.7" }, `(${p})`)
    ]));
    for (let c = 1; c <= 4; c++) {
      const r = riskLevel(p, c);
      const isHl = highlight && highlight.probability === p && highlight.consequence === c;
      grid.appendChild(el("div", {
        class: "rm-cell" + (isHl ? " is-highlight" : ""),
        dataset: { risk: r }
      }, RISK_META[r].short));
    }
  }
  return grid;
}

export function renderRiskLegend() {
  return el("div", { class: "risk-legend" }, Object.entries(RISK_META).map(([key, m]) =>
    el("div", { class: "item" }, [
      el("span", { class: "swatch", dataset: { risk: key } }),
      el("div", {}, [
        el("span", { class: "legend-title" }, m.label),
        el("span", { class: "legend-body" }, m.note)
      ])
    ])
  ));
}
