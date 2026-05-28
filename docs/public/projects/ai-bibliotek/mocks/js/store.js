/* localStorage-backed store. All state lives under the "ab:" prefix. */

const KEYS = {
  users: "ab:users",
  session: "ab:session",
  assistants: "ab:assistants",
  favorites: "ab:favorites",
  collections: "ab:collections"
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

  getUploads() { return read(KEYS.assistants, []); },
  setUploads(assistants) { write(KEYS.assistants, assistants); },
  addUpload(assistant) {
    const all = store.getUploads();
    all.push(assistant);
    store.setUploads(all);
  },
  deleteUpload(assistantId) {
    store.setUploads(store.getUploads().filter(a => a.id !== assistantId));
    // Also clean up any favorites and collection references to the dead assistant.
    store.setFavorites(store.getFavorites().filter(f => f.assistantId !== assistantId));
    const collections = store.getCollections();
    let changed = false;
    for (const c of collections) {
      const before = c.assistantIds.length;
      c.assistantIds = c.assistantIds.filter(id => id !== assistantId);
      if (c.assistantIds.length !== before) changed = true;
    }
    if (changed) store.setCollections(collections);
  },
  uploadsByUser(userId) {
    return store.getUploads().filter(a => a.uploadedBy === userId);
  },

  getFavorites() { return read(KEYS.favorites, []); },
  setFavorites(favs) { write(KEYS.favorites, favs); },
  toggleFavorite(userId, assistantId) {
    const all = store.getFavorites();
    const idx = all.findIndex(f => f.userId === userId && f.assistantId === assistantId);
    if (idx >= 0) {
      all.splice(idx, 1);
    } else {
      all.push({ userId, assistantId, addedAt: new Date().toISOString() });
    }
    store.setFavorites(all);
    return idx < 0;
  },
  isFavorite(userId, assistantId) {
    if (!userId) return false;
    return store.getFavorites().some(f => f.userId === userId && f.assistantId === assistantId);
  },
  favoritesForUser(userId) {
    return store.getFavorites().filter(f => f.userId === userId);
  },

  getCollections() { return read(KEYS.collections, []); },
  setCollections(cs) { write(KEYS.collections, cs); },
  addCollection(c) {
    const all = store.getCollections();
    all.push(c);
    store.setCollections(all);
  },
  updateCollection(id, patch) {
    const all = store.getCollections();
    const idx = all.findIndex(c => c.id === id);
    if (idx < 0) return null;
    all[idx] = { ...all[idx], ...patch };
    store.setCollections(all);
    return all[idx];
  },
  deleteCollection(id) {
    store.setCollections(store.getCollections().filter(c => c.id !== id));
  },
  collectionsForUser(userId) {
    return store.getCollections().filter(c => c.ownerId === userId);
  },
  findCollectionByToken(token) {
    return store.getCollections().find(c => c.shareToken === token) || null;
  }
};

export function uid(prefix = "id") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
