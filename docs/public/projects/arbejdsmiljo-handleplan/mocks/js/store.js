const KEYS = {
  users: "amh:users",
  session: "amh:session",
  plans: "amh:plans",
  employees: "amh:employees",
  seeded: "amh:seeded"
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const store = {
  getUsers() { return read(KEYS.users, []); },
  setUsers(users) { write(KEYS.users, users); },

  getSession() { return read(KEYS.session, null); },
  setSession(session) {
    if (session) write(KEYS.session, session);
    else localStorage.removeItem(KEYS.session);
  },

  getPlans() { return read(KEYS.plans, []); },
  setPlans(plans) { write(KEYS.plans, plans); },
  getPlan(id) { return store.getPlans().find(p => p.id === id) || null; },
  addPlan(plan) {
    const all = store.getPlans();
    all.push(plan);
    store.setPlans(all);
  },
  updatePlan(id, patch) {
    const all = store.getPlans();
    const idx = all.findIndex(p => p.id === id);
    if (idx < 0) return null;
    all[idx] = { ...all[idx], ...patch, updatedAt: new Date().toISOString() };
    store.setPlans(all);
    return all[idx];
  },
  savePlan(plan) {
    const all = store.getPlans();
    const idx = all.findIndex(p => p.id === plan.id);
    plan.updatedAt = new Date().toISOString();
    if (idx < 0) all.push(plan);
    else all[idx] = plan;
    store.setPlans(all);
    return plan;
  },
  deletePlan(id) {
    store.setPlans(store.getPlans().filter(p => p.id !== id));
  },
  plansForUser(userId) {
    return store.getPlans().filter(p => p.ownerId === userId);
  },
  findPlanByShareToken(token) {
    return store.getPlans().find(p =>
      (p.shares || []).some(s => s.token === token)
    ) || null;
  },

  getEmployees() { return read(KEYS.employees, []); },
  setEmployees(list) { write(KEYS.employees, list); },

  isSeeded() { return read(KEYS.seeded, false); },
  markSeeded() { write(KEYS.seeded, true); }
};

export function uid(prefix = "id") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
