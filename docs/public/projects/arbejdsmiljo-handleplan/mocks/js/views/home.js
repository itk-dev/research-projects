import { el, clear, formatDate } from "../util.js";
import { iconHtml } from "../icons.js";
import { auth } from "../auth.js";
import { userPlans, reviewStatus, planSummaryStats } from "../plan-helpers.js";
import { renderPlanRow } from "./plan-list.js";

export function render(root) {
  clear(root);
  const user = auth.currentUser();
  const plans = userPlans(user.id);

  const overdue = plans.filter(p => reviewStatus(p).kind === "overdue");
  const dueSoon = plans.filter(p => reviewStatus(p).kind === "warn");

  // Hero header
  root.appendChild(el("section", { class: "hero" }, [
    el("span", { class: "eyebrow" }, `Velkommen, ${user.name.split(" ")[0]}`),
    el("h1", { class: "hero-title", html: 'Din afdelings <em>arbejdsmiljø&shy;handleplan</em>' }),
    el("p", { class: "lede" },
      "Hold styr på risici, indsatser og ajourføring. Alt er samlet ét sted — " +
      "med automatisk log over hvad der ændres, og adviser når en handleplan skal revideres."),
    el("div", { class: "hero-cta" }, [
      el("a", { class: "btn", href: "#/plans/new", html: iconHtml("plus") + "<span>Opret ny handleplan</span>" }),
      el("a", { class: "btn btn-secondary", href: "#/plans" }, "Mine handleplaner")
    ])
  ]));

  // Notice strip for overdue / due-soon
  if (overdue.length > 0) {
    root.appendChild(noticeStrip(
      "danger",
      `Du har ${overdue.length} ${overdue.length === 1 ? "handleplan der er overskredet" : "handleplaner der er overskredet"}.`,
      `Markér som revideret når I har gennemgået dem.`
    ));
  } else if (dueSoon.length > 0) {
    root.appendChild(noticeStrip(
      "warn",
      `${dueSoon.length} ${dueSoon.length === 1 ? "handleplan skal" : "handleplaner skal"} revideres inden 30 dage.`,
      `Vi sender en påmindelse på e-mail når datoen nærmer sig.`
    ));
  } else if (plans.length > 0) {
    root.appendChild(noticeStrip(
      "ok",
      "Alle dine handleplaner er ajourført.",
      "Næste revision er mere end en måned ude i fremtiden."
    ));
  }

  // KPI tiles
  const totalActions = plans.reduce((sum, p) => sum + planSummaryStats(p).total, 0);
  const openActions = plans.reduce((sum, p) => sum + planSummaryStats(p).open, 0);
  const highRisk = plans.reduce((sum, p) => sum + planSummaryStats(p).high, 0);

  root.appendChild(el("section", { class: "kpi-grid" }, [
    kpi("Mine handleplaner", plans.length),
    kpi("Aktive indsatser", openActions, "info"),
    kpi("Høj risiko (åbne)", highRisk, highRisk > 0 ? "danger" : "ok"),
    kpi("Skal revideres ≤30 d.", dueSoon.length + overdue.length, (dueSoon.length + overdue.length) > 0 ? "warn" : "ok")
  ]));

  // Recent plans
  root.appendChild(el("section", {}, [
    el("div", { class: "row between mb-3" }, [
      el("h2", {}, "Mine handleplaner"),
      el("a", { class: "btn btn-ghost btn-sm", href: "#/plans" }, "Se alle")
    ]),
    plans.length === 0
      ? emptyState()
      : el("div", { class: "plan-list" }, plans.slice(0, 5).map(p => renderPlanRow(p)))
  ]));
}

function kpi(label, value, kind = "") {
  return el("div", { class: "kpi-card" + (kind ? ` is-${kind}` : "") }, [
    el("span", { class: "label" }, label),
    el("span", { class: "value" }, String(value))
  ]);
}

function noticeStrip(kind, headline, sub) {
  return el("div", { class: `notice notice-${kind}` }, [
    el("span", { class: "notice-icon", html: iconHtml(kind === "ok" ? "check" : "bell", { size: 22 }) }),
    el("div", { class: "grow" }, [
      el("p", {}, [el("strong", {}, headline)]),
      el("p", { class: "muted text-sm" }, sub)
    ])
  ]);
}

function emptyState() {
  return el("div", { class: "card empty" }, [
    el("div", { class: "empty-illus", html: iconHtml("document", { size: 28 }) }),
    el("h2", {}, "Ingen handleplaner endnu"),
    el("p", {}, "Opret den første handleplan for din afdeling."),
    el("a", { class: "btn mt-3", href: "#/plans/new" }, "Opret handleplan")
  ]);
}
