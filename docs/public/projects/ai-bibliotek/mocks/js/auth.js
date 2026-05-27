/* Fake auth — passwords are obfuscated with a trivial hash for demo only.
   Do not reuse this anywhere real. */

import { store, uid } from "./store.js";

function fakeHash(input) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return `h${h.toString(36)}`;
}

/* Ready-made demo logins shown on the login screen so reviewers can try the
   gated flows without registering. Plaintext passwords are intentional here. */
export const DEMO_USERS = [
  { id: "demo-aarhus", name: "Mette Sørensen", organization: "Aarhus Kommune", email: "mette@aarhus.dk", password: "demo1234" },
  { id: "demo-odense", name: "Jonas Holm", organization: "Odense Kommune", email: "jonas@odense.dk", password: "demo1234" }
];

export const auth = {
  currentUser() {
    const session = store.getSession();
    if (!session) return null;
    return store.getUsers().find(u => u.id === session.userId) || null;
  },

  register({ email, name, organization, password }) {
    email = email.trim().toLowerCase();
    if (!email || !password || !name) {
      throw new Error("Udfyld navn, e-mail og adgangskode.");
    }
    if (password.length < 4) {
      throw new Error("Adgangskoden skal være mindst 4 tegn.");
    }
    const users = store.getUsers();
    if (users.some(u => u.email === email)) {
      throw new Error("En bruger med denne e-mail findes allerede.");
    }
    const user = {
      id: uid("user"),
      email,
      name: name.trim(),
      organization: organization?.trim() || "",
      passwordHash: fakeHash(password),
      createdAt: new Date().toISOString()
    };
    users.push(user);
    store.setUsers(users);
    store.setSession({ userId: user.id });
    return user;
  },

  login({ email, password }) {
    email = email.trim().toLowerCase();
    const user = store.getUsers().find(u => u.email === email);
    if (!user || user.passwordHash !== fakeHash(password)) {
      throw new Error("Forkert e-mail eller adgangskode.");
    }
    store.setSession({ userId: user.id });
    return user;
  },

  logout() {
    store.setSession(null);
  },

  /* Idempotent: inserts any demo user whose email isn't already present. */
  seedDemoUsers() {
    const users = store.getUsers();
    let changed = false;
    for (const d of DEMO_USERS) {
      if (users.some(u => u.email === d.email)) continue;
      users.push({
        id: d.id,
        email: d.email,
        name: d.name,
        organization: d.organization,
        passwordHash: fakeHash(d.password),
        createdAt: new Date().toISOString()
      });
      changed = true;
    }
    if (changed) store.setUsers(users);
  }
};
