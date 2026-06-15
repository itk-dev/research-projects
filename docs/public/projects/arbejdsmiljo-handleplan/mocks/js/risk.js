// Matrix from arbejdsmiljo-handleplan-skabelon.docx — section 2.
// Rows = sandsynlighed (1..4), cols = konsekvens (1..4).
const TABLE = [
  null,                                       // pad index 0
  [null, "accept", "accept", "small",    "small"],
  [null, "accept", "small",  "moderate", "moderate"],
  [null, "small",  "moderate", "moderate", "high"],
  [null, "small",  "moderate", "high",     "high"]
];

export function riskLevel(probability, consequence) {
  const p = Number(probability), c = Number(consequence);
  if (!p || !c || p < 1 || p > 4 || c < 1 || c > 4) return null;
  return TABLE[p][c];
}

export const RISK_META = {
  accept:   { label: "Acceptabel risiko", short: "Acceptabel", note: "Ingen indsats eller handling krævet." },
  small:    { label: "Lille risiko",      short: "Lille",      note: "Handling sættes i gang, hvis det er teknisk eller økonomisk muligt." },
  moderate: { label: "Moderat risiko",    short: "Moderat",    note: "Handling sættes i gang med fokus på forebyggelse. Typisk tidshorisont 1–3 mdr." },
  high:     { label: "Høj risiko",        short: "Høj",        note: "Handling sættes i gang straks." }
};

export const PROBABILITY_LABELS = {
  1: "Usandsynligt",
  2: "Sjældent",
  3: "Muligt",
  4: "Sandsynligt"
};

export const CONSEQUENCE_LABELS = {
  1: "Lille belastning eller tilskadekomst",
  2: "Nogen belastning eller tilskadekomst",
  3: "Alvorlig belastning eller tilskadekomst",
  4: "Katastrofal belastning eller tilskadekomst"
};
