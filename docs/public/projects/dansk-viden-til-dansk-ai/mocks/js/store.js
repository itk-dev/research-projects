/* localStorage-backed store. All state lives under the "dv:" prefix. */

const KEYS = {
  users: "dv:users",
  session: "dv:session",
  uploads: "dv:uploads",
  favorites: "dv:favorites",
  collections: "dv:collections"
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

  getUploads() { return read(KEYS.uploads, []); },
  setUploads(uploads) { write(KEYS.uploads, uploads); },
  addUpload(pub) {
    const all = store.getUploads();
    all.push(pub);
    store.setUploads(all);
  },
  deleteUpload(pubId) {
    store.setUploads(store.getUploads().filter(p => p.id !== pubId));
    // Also clean up any favorites and collection references to the dead pub.
    store.setFavorites(store.getFavorites().filter(f => f.publicationId !== pubId));
    const collections = store.getCollections();
    let changed = false;
    for (const c of collections) {
      const before = c.publicationIds.length;
      c.publicationIds = c.publicationIds.filter(id => id !== pubId);
      if (c.publicationIds.length !== before) changed = true;
    }
    if (changed) store.setCollections(collections);
  },
  uploadsByUser(userId) {
    return store.getUploads().filter(p => p.uploadedBy === userId);
  },

  getFavorites() { return read(KEYS.favorites, []); },
  setFavorites(favs) { write(KEYS.favorites, favs); },
  toggleFavorite(userId, pubId) {
    const all = store.getFavorites();
    const idx = all.findIndex(f => f.userId === userId && f.publicationId === pubId);
    if (idx >= 0) {
      all.splice(idx, 1);
    } else {
      all.push({ userId, publicationId: pubId, addedAt: new Date().toISOString() });
    }
    store.setFavorites(all);
    return idx < 0;
  },
  isFavorite(userId, pubId) {
    if (!userId) return false;
    return store.getFavorites().some(f => f.userId === userId && f.publicationId === pubId);
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
