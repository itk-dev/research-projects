import { store, uid } from "./store.js";

function fakeHash(input) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return `h${h.toString(36)}`;
}

export const auth = {
  currentUser() {
    const session = store.getSession();
    if (!session) return null;
    return store.getUsers().find(u => u.id === session.userId) || null;
  },

  register({ email, name, organization, role, password }) {
    email = (email || "").trim().toLowerCase();
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
      role: role?.trim() || "Arbejdsmiljørepræsentant",
      passwordHash: fakeHash(password),
      createdAt: new Date().toISOString()
    };
    users.push(user);
    store.setUsers(users);
    store.setSession({ userId: user.id });
    return user;
  },

  login({ email, password }) {
    email = (email || "").trim().toLowerCase();
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

  // For seeding only
  _rawHash: fakeHash
};
