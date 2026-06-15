import { store, uid } from "./store.js";
import { auth } from "./auth.js";
import { riskLevel } from "./risk.js";

const HASH = (s) => auth._rawHash(s);

const EMPLOYEES = [
  { name: "Mette Jensen",      email: "mette.jensen@aarhus.dk",      organization: "BA · Sekretariat" },
  { name: "Lars Andersen",     email: "lars.andersen@aarhus.dk",     organization: "BA · IT" },
  { name: "Sofie Holm",        email: "sofie.holm@aarhus.dk",        organization: "BA · Økonomi" },
  { name: "Kasper Lindberg",   email: "kasper.lindberg@aarhus.dk",   organization: "BA · Sekretariat" },
  { name: "Tina Olesen",       email: "tina.olesen@aarhus.dk",       organization: "BA · Personale" },
  { name: "Frederik Bach",     email: "frederik.bach@aarhus.dk",     organization: "BA · IT" },
  { name: "Camilla Thomsen",   email: "camilla.thomsen@aarhus.dk",   organization: "BA · HMU-sekretariat" },
  { name: "Henrik Vestergaard", email: "henrik.vestergaard@aarhus.dk", organization: "BA · Drift" },
  { name: "Line Pedersen",     email: "line.pedersen@aarhus.dk",     organization: "BA · Kommunikation" },
  { name: "Mikkel Nørgaard",   email: "mikkel.norgaard@aarhus.dk",   organization: "BA · Personale" },
  { name: "Anne-Marie Krogh",  email: "annemarie.krogh@aarhus.dk",   organization: "BA · Økonomi" },
  { name: "Rasmus Hjortshøj",  email: "rasmus.hjortshoj@aarhus.dk",  organization: "BA · Drift" }
];

function isoDaysFromNow(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function isoDaysAgo(days) { return isoDaysFromNow(-days); }
function isoTime(daysAgo, hoursAgo = 0) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(d.getHours() - hoursAgo);
  return d.toISOString();
}

function makeAction(partial) {
  const probability = partial.probability;
  const consequence = partial.consequence;
  const evaluationTrail = partial.evaluationTrail || [];
  return {
    id: uid("action"),
    createdAt: partial.createdAt || isoTime(20),
    // Merged "Placering & baggrund" — old location/background kept for the
    // read-tolerant fallback in locationBackgroundText().
    locationBackground: partial.locationBackground
      || [partial.location, partial.background].filter(Boolean).join(" — "),
    location: partial.location || "",
    background: partial.background || "",
    problem: partial.problem || "",
    probability,
    consequence,
    risk: riskLevel(probability, consequence),
    sickLeaveLinked: !!partial.sickLeaveLinked,
    solutionShort: partial.solutionShort || "",
    solutionLong: partial.solutionLong || "",
    responsible: partial.responsible || "",
    deadline: partial.deadline || "",
    // Latest evaluation text mirrors the newest trail entry for back-compat.
    evaluation: partial.evaluation || (evaluationTrail[0] && evaluationTrail[0].text) || "",
    evaluationTrail,
    handlinger: partial.handlinger || [],
    status: partial.status || "open"
  };
}

export function seedIfEmpty() {
  if (store.isSeeded()) return;

  // Users
  const anna = {
    id: uid("user"),
    email: "anna@aarhus.dk",
    name: "Anna Sørensen",
    organization: "BA · Sekretariat",
    role: "Arbejdsmiljørepræsentant",
    passwordHash: HASH("demo"),
    createdAt: isoTime(120)
  };
  const peter = {
    id: uid("user"),
    email: "peter@aarhus.dk",
    name: "Peter Madsen",
    organization: "BA · Sekretariat",
    role: "Arbejdsmiljøleder",
    passwordHash: HASH("demo"),
    createdAt: isoTime(120)
  };
  store.setUsers([anna, peter]);

  // Employees (for share-autocomplete)
  store.setEmployees(EMPLOYEES);

  // A demo plan owned by Anna — review due in 14 days (yellow badge).
  const planA = {
    id: uid("plan"),
    ownerId: anna.id,
    workplace: "BA Sekretariatet, Rådhuset",
    theme: "Rådhuset",
    amgMembers: [
      { name: "Anna Sørensen", role: "Arbejdsmiljørepræsentant" },
      { name: "Peter Madsen",  role: "Arbejdsmiljøleder" }
    ],
    createdAt: isoTime(180),
    updatedAt: isoTime(2),
    nextReviewDate: isoDaysFromNow(14),
    status: "active",

    actions: [
      makeAction({
        createdAt: isoTime(170),
        location: "Storrum 2.04",
        background: "APV-tilbagemelding",
        problem: "Flere oplever akustiske gener og dårlig koncentration i storrummet.",
        probability: 3, consequence: 2,
        solutionShort: "Indkøb af 6 akustikplader til vægmontering.",
        solutionLong: "Forebyggende: gennemgang af mødeprocedurer og afskærmning.",
        responsible: "Peter Madsen",
        deadline: isoDaysFromNow(30),
        evaluationTrail: [
          { id: uid("eval"), at: isoTime(20), userId: peter.id, userName: peter.name, text: "Akustikplader bestilt, leveres uge 24. Følges op næste runderingsdato." },
          { id: uid("eval"), at: isoTime(90), userId: anna.id, userName: anna.name, text: "Indhentet tilbud fra to leverandører. Afventer godkendelse af indkøb." }
        ],
        handlinger: [
          { id: uid("handling"), createdAt: isoTime(160), text: "Indhent tilbud på akustikplader", responsible: "Peter Madsen", deadline: isoDaysAgo(90), done: true },
          { id: uid("handling"), createdAt: isoTime(90), text: "Montér plader på nordvæg", responsible: "Ejendomsservice", deadline: isoDaysFromNow(20), done: false },
          { id: uid("handling"), createdAt: isoTime(40), text: "Gennemgå mødeprocedurer for storrummet", responsible: "Anna Sørensen", deadline: isoDaysFromNow(45), done: false }
        ],
        status: "in-progress"
      }),
      makeAction({
        createdAt: isoTime(120),
        location: "Trappe ved hovedindgang",
        background: "Nærvedulykke 12. januar",
        problem: "Glat trappe ved regnvejr — én medarbejder snublede.",
        probability: 2, consequence: 3,
        sickLeaveLinked: false,
        solutionShort: "Skridsikre striber pålægges.",
        solutionLong: "Aftale m. ejendomsservice om saltning ved varsel om frost.",
        responsible: "Henrik Vestergaard",
        deadline: isoDaysAgo(10),
        evaluationTrail: [
          { id: uid("eval"), at: isoTime(8), userId: peter.id, userName: peter.name, text: "Striber pålagt 5. marts. Ingen nye episoder." }
        ],
        handlinger: [
          { id: uid("handling"), createdAt: isoTime(110), text: "Bestil skridsikre striber", responsible: "Henrik Vestergaard", deadline: isoDaysAgo(40), done: true },
          { id: uid("handling"), createdAt: isoTime(100), text: "Aftal saltning ved frostvarsel med ejendomsservice", responsible: "Henrik Vestergaard", deadline: isoDaysAgo(20), done: true }
        ],
        status: "done"
      }),
      makeAction({
        createdAt: isoTime(45),
        location: "Hele afdelingen",
        background: "Trivselsmåling",
        problem: "Arbejdsmængde og tidspres scorer rødt på trivselsmålingen.",
        probability: 4, consequence: 3,
        sickLeaveLinked: true,
        solutionShort: "Workshop om prioritering og opgavefordeling.",
        solutionLong: "Strukturel gennemgang af opgaveporteføljen i MED-udvalget Q4.",
        responsible: "Anna Sørensen",
        deadline: isoDaysFromNow(45),
        handlinger: [
          { id: uid("handling"), createdAt: isoTime(40), text: "Planlæg workshop om prioritering", responsible: "Anna Sørensen", deadline: isoDaysFromNow(30), done: false }
        ],
        status: "open"
      })
    ],
    topRisks: {
      text: "Sekretariatet er primært kontorarbejde. Vi har særligt fokus på psykisk arbejdsmiljø (arbejdsmængde) og indeklima i åbne rum.",
      checks: { ulykker: true, mss: true, psykisk: true, stoej: true, indeklima: true }
    },
    yearWheel: [
      { task: "Møde i arbejdsmiljøgruppen", responsible: "AMG", months: [true, false, true, false, true, false, false, true, false, true, false, true] },
      { task: "Sygefraværsgennemgang",      responsible: "Peter Madsen",  months: [false, true, false, false, true, false, false, true, false, false, true, false] },
      { task: "Rundering (fysisk arbejdsmiljø)", responsible: "Anna Sørensen", months: [false, false, false, false, false, false, false, false, true, false, false, false] },
      { task: "Fysisk APV-måling",          responsible: "Peter Madsen",  months: [false, false, false, false, false, false, false, false, false, true, false, false] },
      { task: "Trivselsmåling (inkl. psykisk APV)", responsible: "Anna Sørensen", months: [false, false, false, false, false, false, false, false, false, false, true, false] }
    ],
    competence: [
      { who: "Anna Sørensen", what: "Obligatorisk arbejdsmiljøuddannelse + workshop om psykisk arbejdsmiljø", hours: 16 },
      { who: "Peter Madsen",  what: "Temadag: ledelse og arbejdsmiljø", hours: 8 }
    ],
    sickLeave: [
      { date: isoDaysAgo(80),  notes: "Q1: Sygefraværet stabilt. To længere forløb fulgt op via samtaler. Ingen klar sammenhæng med arbejdsmiljøet." },
      { date: isoDaysAgo(170), notes: "Q4 sidste år: Stigning i kort fravær i nov–dec. Sandsynligvis sæsonbetinget." }
    ],
    incidents: [
      { date: isoDaysAgo(95), description: "Nærvedulykke ved trappe (regnvejr).", cause: "Manglende skridsikring.", recurrence: "Tidligere hændelser i 2023.", followup: "Skridsikre striber pålagt — se handleplan." }
    ],
    accidents: [],
    deviations: [
      { description: "Forsinket gennemgang af APV (skulle være sket Q4).", cause: "Personaleudskiftning i AMG.", needsAction: true }
    ],

    log: [
      { id: uid("log"), at: isoTime(180), userId: anna.id, userName: anna.name, type: "created", summary: "Handleplan oprettet." },
      { id: uid("log"), at: isoTime(170), userId: anna.id, userName: anna.name, type: "action-added", summary: "Tilføjede action: 'Akustikgener i storrum 2.04'." },
      { id: uid("log"), at: isoTime(120), userId: peter.id, userName: peter.name, type: "action-added", summary: "Tilføjede action: 'Glat trappe ved hovedindgang'." },
      { id: uid("log"), at: isoTime(45),  userId: anna.id, userName: anna.name, type: "action-added", summary: "Tilføjede action: 'Arbejdsmængde — trivselsmåling rød'." },
      { id: uid("log"), at: isoTime(10),  userId: peter.id, userName: peter.name, type: "action-resolved", summary: "Markerede 'Glat trappe' som løst." },
      { id: uid("log"), at: isoTime(2),   userId: anna.id, userName: anna.name, type: "updated", summary: "Opdaterede AMG-medlemmer." }
    ],
    shares: []
  };

  // An empty plan owned by Peter — review overdue.
  const planB = {
    id: uid("plan"),
    ownerId: peter.id,
    workplace: "BA Drift, Brendstrupgårdsvej",
    theme: "Drift",
    amgMembers: [
      { name: "Peter Madsen", role: "Arbejdsmiljøleder" },
      { name: "Henrik Vestergaard", role: "Arbejdsmiljørepræsentant" }
    ],
    createdAt: isoTime(400),
    updatedAt: isoTime(400),
    nextReviewDate: isoDaysAgo(7),
    status: "active",
    actions: [],
    topRisks: { text: "", checks: {} },
    yearWheel: [],
    competence: [],
    sickLeave: [],
    incidents: [],
    accidents: [],
    deviations: [],
    log: [
      { id: uid("log"), at: isoTime(400), userId: peter.id, userName: peter.name, type: "created", summary: "Handleplan oprettet." }
    ],
    shares: []
  };

  store.setPlans([planA, planB]);
  store.markSeeded();
}
