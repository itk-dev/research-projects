import { daysUntil, addMonths, todayISO } from "./util.js";
import { store, uid } from "./store.js";
import { auth } from "./auth.js";
import { riskLevel } from "./risk.js";

export const REVIEW_WARN_DAYS = 30;

export function reviewStatus(plan) {
  const d = daysUntil(plan.nextReviewDate);
  if (d === null) return { kind: "unknown", label: "Ingen revisionsdato", days: null };
  if (d < 0) return { kind: "overdue", label: `Overskredet (${Math.abs(d)} dage)`, days: d };
  if (d <= REVIEW_WARN_DAYS) return { kind: "warn", label: `Skal revideres om ${d} dage`, days: d };
  return { kind: "ok", label: `Revideres om ${d} dage`, days: d };
}

export function reviewBadgeClass(kind) {
  return { ok: "badge-ok", warn: "badge-warn", overdue: "badge-danger", unknown: "badge-neutral" }[kind] || "badge-neutral";
}

export function emptyPlan({ ownerId, workplace, theme, amgMembers = [], nextReviewDate }) {
  const now = new Date().toISOString();
  return {
    id: uid("plan"),
    ownerId,
    workplace: workplace || "",
    theme: theme || "",
    amgMembers,
    createdAt: now,
    updatedAt: now,
    nextReviewDate: nextReviewDate || addMonths(todayISO(), 12),
    status: "active",
    actions: [],
    topRisks: { text: "", checks: {} },
    yearWheel: [],
    competence: [],
    sickLeave: [],
    incidents: [],
    accidents: [],
    deviations: [],
    log: [],
    shares: []
  };
}

export function logEvent(plan, type, summary, details) {
  const user = auth.currentUser();
  const entry = {
    id: uid("log"),
    at: new Date().toISOString(),
    userId: user?.id || "",
    userName: user?.name || "Ukendt",
    type,
    summary,
    ...(details ? { details } : {})
  };
  plan.log = plan.log || [];
  plan.log.unshift(entry);
  return entry;
}

export function recomputeAction(action) {
  action.risk = riskLevel(action.probability, action.consequence);
  return action;
}

// Risk ranking used to sort indsatser with the highest risk first.
export const RISK_RANK = { high: 4, moderate: 3, small: 2, accept: 1 };

// Highest-risk-first; unscored actions sort last. Sorts a shallow copy so the
// stored order is never mutated.
export function actionsByRisk(actions) {
  return [...(actions || [])].sort(
    (a, b) => (RISK_RANK[b.risk] || 0) - (RISK_RANK[a.risk] || 0)
  );
}

// Merged "Placering & baggrund". New actions store `locationBackground`; older
// ones fall back to joining the legacy `location` + `background` fields.
export function locationBackgroundText(action) {
  if (action.locationBackground) return action.locationBackground;
  return [action.location, action.background].filter(Boolean).join(" — ");
}

export function planSummaryStats(plan) {
  const actions = plan.actions || [];
  const open = actions.filter(a => a.status !== "done").length;
  const high = actions.filter(a => a.risk === "high" && a.status !== "done").length;
  return { total: actions.length, open, high };
}

export function userPlans(userId) {
  return store.plansForUser(userId).sort((a, b) =>
    (b.updatedAt || "").localeCompare(a.updatedAt || ""));
}
