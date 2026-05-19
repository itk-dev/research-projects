/* Collections + share-URL encoding.
   Because the prototype has no backend, a share token alone can't transfer
   the collection between browsers. To make sharing actually demo-able, we
   base64-encode the collection payload (with publication snapshots) into
   the URL after the token. The token still uniquely identifies the
   collection for the owner. */

import { store, uid } from "./store.js";
import { getPublication } from "./catalog.js";
import { b64encodeObject, b64decodeObject } from "./util.js";

export function createCollection(ownerId, name, description = "") {
  const collection = {
    id: uid("col"),
    name: name.trim(),
    description: description.trim(),
    ownerId,
    publicationIds: [],
    createdAt: new Date().toISOString(),
    shareToken: Math.random().toString(36).slice(2, 10)
  };
  store.addCollection(collection);
  return collection;
}

export function addPublicationToCollection(collectionId, pubId) {
  const all = store.getCollections();
  const c = all.find(x => x.id === collectionId);
  if (!c) return null;
  if (!c.publicationIds.includes(pubId)) {
    c.publicationIds.push(pubId);
    store.setCollections(all);
  }
  return c;
}

export function removePublicationFromCollection(collectionId, pubId) {
  const all = store.getCollections();
  const c = all.find(x => x.id === collectionId);
  if (!c) return null;
  c.publicationIds = c.publicationIds.filter(id => id !== pubId);
  store.setCollections(all);
  return c;
}

/* Encode a snapshot of the collection (with the actual publications)
   into a base64 string suitable for embedding in the URL hash. */
export function encodeShareablePayload(collection) {
  const publications = collection.publicationIds
    .map(id => getPublication(id))
    .filter(Boolean);
  return b64encodeObject({
    id: collection.id,
    name: collection.name,
    description: collection.description,
    shareToken: collection.shareToken,
    createdAt: collection.createdAt,
    publications
  });
}

export function decodeShareablePayload(encoded) {
  return b64decodeObject(encoded);
}

export function buildShareUrl(collection) {
  const payload = encodeShareablePayload(collection);
  // Use full URL so user can copy and open in a fresh browser
  const base = window.location.href.split("#")[0];
  return `${base}#/collection/${collection.shareToken}?d=${payload}`;
}
