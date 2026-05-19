/* Catalog: merges seeded publications with user uploads, plus search/filter. */

import { store } from "./store.js";

export const RIGHTS_LEVELS = [
  { level: 1, title: "Kun registrering i kataloget", description: "Publikationen kan findes i kataloget, men ikke vises eller downloades direkte." },
  { level: 2, title: "Offentlig visning og download", description: "Publikationen kan ses og hentes af alle besøgende." },
  { level: 3, title: "Tekstudtræk til søgning og analyse", description: "Tekst kan udtrækkes til søgeindeks og analyser, men ikke videredistribueres." },
  { level: 4, title: "Brug i offentlige RAG-løsninger", description: "Indhold kan bruges i offentlige retrieval-augmented systemer." },
  { level: 5, title: "Brug til evaluering og finjustering", description: "Tekst kan bruges til evaluering og finjustering af sprogmodeller." },
  { level: 6, title: "Brug til egentlig modeltræning", description: "Tekst indgår i datagrundlag til træning af danske sprogmodeller." },
  { level: 7, title: "Fri videreanvendelse under åben licens", description: "Indhold kan genbruges frit under en åben licens." }
];

export function getAllPublications() {
  const seeded = window.SEED_PUBLICATIONS || [];
  const uploads = store.getUploads();
  return [...uploads, ...seeded];
}

export function getPublication(id) {
  return getAllPublications().find(p => p.id === id) || null;
}

export function rightsLevelInfo(level) {
  return RIGHTS_LEVELS.find(r => r.level === level) || RIGHTS_LEVELS[0];
}

/* Search + filter
   filters: {
     q: string,
     publishers: Set<string>,
     documentTypes: Set<string>,
     subjectAreas: Set<string>,
     years: Set<string>,
     rightsLevels: Set<number>,
     riskLevels: Set<string>
   }
*/
export function searchPublications(filters) {
  const q = (filters.q || "").trim().toLowerCase();
  const tokens = q ? q.split(/\s+/).filter(Boolean) : [];

  return getAllPublications().filter(p => {
    if (tokens.length) {
      const hay = [
        p.title, p.subtitle, p.summary, p.publisher,
        (p.keywords || []).join(" "),
        (p.subjectAreas || []).join(" "),
        (p.authors || []).join(" ")
      ].filter(Boolean).join(" ").toLowerCase();
      if (!tokens.every(t => hay.includes(t))) return false;
    }
    if (filters.publishers?.size && !filters.publishers.has(p.publisher)) return false;
    if (filters.documentTypes?.size && !filters.documentTypes.has(p.documentType)) return false;
    if (filters.subjectAreas?.size) {
      const has = (p.subjectAreas || []).some(s => filters.subjectAreas.has(s));
      if (!has) return false;
    }
    if (filters.years?.size) {
      const y = String(new Date(p.publishedAt).getFullYear());
      if (!filters.years.has(y)) return false;
    }
    if (filters.rightsLevels?.size && !filters.rightsLevels.has(p.rightsLevel)) return false;
    if (filters.riskLevels?.size && !filters.riskLevels.has(p.riskLevel)) return false;
    return true;
  });
}

/* Build facet counts based on a base set (pre-filtered or all). */
export function buildFacets(base) {
  const facets = {
    publishers: new Map(),
    documentTypes: new Map(),
    subjectAreas: new Map(),
    years: new Map(),
    rightsLevels: new Map(),
    riskLevels: new Map()
  };
  for (const p of base) {
    inc(facets.publishers, p.publisher);
    inc(facets.documentTypes, p.documentType);
    (p.subjectAreas || []).forEach(s => inc(facets.subjectAreas, s));
    inc(facets.years, String(new Date(p.publishedAt).getFullYear()));
    inc(facets.rightsLevels, p.rightsLevel);
    inc(facets.riskLevels, p.riskLevel);
  }
  return facets;
}
function inc(map, key) {
  if (key === undefined || key === null || key === "") return;
  map.set(key, (map.get(key) || 0) + 1);
}
