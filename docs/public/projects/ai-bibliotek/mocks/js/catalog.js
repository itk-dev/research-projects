/* Catalog: merges seeded assistants with user-shared assistants, plus search/filter. */

import { store } from "./store.js";

/* Framework labels. Designed so more frameworks can be added later. */
export const FRAMEWORK_LABEL = {
  openwebui: "OpenWebUI"
};

/* Data sensitivity levels — what the assistant is intended/approved for.
   Replaces the old green/yellow/red risk concept. */
export const DATA_SENSITIVITY = [
  {
    level: "almindelige",
    title: "Almindelige personoplysninger",
    description: "Beregnet til almindelige personoplysninger og ikke-følsomt indhold."
  },
  {
    level: "fortrolige",
    title: "Fortrolige data",
    description: "Beregnet til fortrolige data — kræver passende organisatoriske foranstaltninger."
  },
  {
    level: "personfoelsomme",
    title: "Personfølsomme data",
    description: "Beregnet til personfølsomme oplysninger (særlige kategorier) — kræver skærpet beskyttelse."
  }
];

export function dataSensitivityInfo(level) {
  return DATA_SENSITIVITY.find(d => d.level === level) || DATA_SENSITIVITY[0];
}

export function getAllAssistants() {
  const seeded = window.SEED_ASSISTANTS || [];
  const uploads = store.getUploads();
  return [...uploads, ...seeded];
}

export function getAssistant(id) {
  return getAllAssistants().find(a => a.id === id) || null;
}

/* Return the most recent version of an assistant (versions are stored newest-first). */
export function latestVersion(assistant) {
  if (!assistant?.versions?.length) return null;
  return assistant.versions[0];
}

/* Search + filter
   filters: {
     q: string,
     kommuner: Set<string>,
     languageModels: Set<string>,
     frameworks: Set<string>,
     sensitivities: Set<string>
   }
*/
export function searchAssistants(filters) {
  const q = (filters.q || "").trim().toLowerCase();
  const tokens = q ? q.split(/\s+/).filter(Boolean) : [];

  return getAllAssistants().filter(a => {
    if (tokens.length) {
      const hay = [
        a.name, a.tagline, a.description, a.originKommune,
        a.languageModel,
        (a.tags || []).join(" ")
      ].filter(Boolean).join(" ").toLowerCase();
      if (!tokens.every(t => hay.includes(t))) return false;
    }
    if (filters.kommuner?.size && !filters.kommuner.has(a.originKommune)) return false;
    if (filters.languageModels?.size && !filters.languageModels.has(a.languageModel)) return false;
    if (filters.frameworks?.size && !filters.frameworks.has(a.framework)) return false;
    if (filters.sensitivities?.size && !filters.sensitivities.has(a.dataSensitivity)) return false;
    return true;
  });
}

/* Build facet counts based on a base set (pre-filtered or all). */
export function buildFacets(base) {
  const facets = {
    kommuner: new Map(),
    languageModels: new Map(),
    frameworks: new Map(),
    sensitivities: new Map()
  };
  for (const a of base) {
    inc(facets.kommuner, a.originKommune);
    inc(facets.languageModels, a.languageModel);
    inc(facets.frameworks, a.framework);
    inc(facets.sensitivities, a.dataSensitivity);
  }
  return facets;
}
function inc(map, key) {
  if (key === undefined || key === null || key === "") return;
  map.set(key, (map.get(key) || 0) + 1);
}
