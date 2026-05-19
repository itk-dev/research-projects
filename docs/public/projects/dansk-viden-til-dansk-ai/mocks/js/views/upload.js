import { el, clear, navigate, toast, formatSize } from "../util.js";
import { auth } from "../auth.js";
import { store, uid } from "../store.js";
import { RIGHTS_LEVELS } from "../catalog.js";
import { iconHtml, icon as iconNode } from "../icons.js";

const DOC_TYPES = ["rapport", "analyse", "strategi", "vejledning", "evaluering", "hvidbog"];
const DOC_TYPE_LABEL = {
  rapport: "Rapport", analyse: "Analyse", strategi: "Strategi",
  vejledning: "Vejledning", evaluering: "Evaluering", hvidbog: "Hvidbog"
};

const PERSONAL_DATA_OPTIONS = [
  { value: "navne", label: "Indeholder navngivne personer", risk: "yellow" },
  { value: "citater", label: "Indeholder citater fra borgere/medarbejdere", risk: "yellow" },
  { value: "billeder", label: "Indeholder fotos af personer", risk: "yellow" },
  { value: "smaa-grupper", label: "Statistik på små populationer (<10 personer)", risk: "red" },
  { value: "saerlige", label: "Indeholder særlige kategorier af persondata (helbred, etnicitet m.m.)", risk: "red" }
];

const THIRD_PARTY_OPTIONS = [
  { value: "billeder", label: "Stockfotos eller indkøbte billeder", risk: "yellow" },
  { value: "data", label: "Datavisualiseringer fra ekstern leverandør", risk: "yellow" },
  { value: "kort", label: "Kortmateriale med tredjepartsrettigheder", risk: "yellow" },
  { value: "konsulent", label: "Hele eller dele udarbejdet af ekstern konsulent uden videreoverdragelse", risk: "red" }
];

export function render(root) {
  const user = auth.currentUser();
  if (!user) {
    navigate("#/login");
    return;
  }
  clear(root);

  const state = { step: 1, file: null, draft: null };

  // Page-level shell (title + alert) renders once, sits outside the step card.
  root.appendChild(el("header", { class: "page-head" }, [
    el("h1", { style: "margin:0 0 8px;" }, "Upload publikation"),
    el("p", { class: "lede", style: "margin:0;" },
      "Bidrag med en publikation fra din myndighed til kataloget. AI hjælper med metadata og resume — du bekræfter rettighederne.")
  ]));

  root.appendChild(el("aside", {
    class: "alert alert-rights",
    role: "note",
    "aria-label": "Rettighedsansvar"
  }, [
    el("span", { class: "alert-mark", "aria-hidden": "true" }),
    el("p", {},
      "Du har som uploader ansvaret for, at din myndighed har rettighederne til at stille publikationen til rådighed for de valgte formål.")
  ]));

  const layout = el("div", { class: "upload-layout" });
  const stepNav = el("nav", { class: "step-rail", "aria-label": "Trin i upload" });
  const container = el("div", { class: "upload-step" });
  layout.appendChild(stepNav);
  layout.appendChild(container);
  root.appendChild(layout);

  paint();

  function paint() {
    renderStepRail();
    clear(container);
    if (state.step === 1) container.appendChild(renderPick());
    else if (state.step === 2) container.appendChild(renderReview());
    else container.appendChild(renderReceipt());
  }

  function renderStepRail() {
    clear(stepNav);
    const stepDefs = [
      { n: 1, title: "Vælg fil", hint: "Træk eller vælg din PDF" },
      { n: 2, title: "Gennemgang", hint: "Tjek AI-forslag og rettigheder" },
      { n: 3, title: "Kvittering", hint: "Delelink til din publikation" }
    ];
    stepDefs.forEach(({ n, title, hint }) => {
      const status = state.step === n ? "active" : state.step > n ? "done" : "todo";
      stepNav.appendChild(el("div", { class: `step-item step-${status}` }, [
        el("span", { class: "step-num" }, status === "done" ? iconNode("check") : String(n).padStart(2, "0")),
        el("div", { class: "step-text" }, [
          el("span", { class: "step-title" }, title),
          el("span", { class: "step-hint" }, hint)
        ])
      ]));
    });
  }

  function renderPick() {
    const card = el("section", { class: "card" });

    const input = el("input", {
      type: "file",
      accept: "application/pdf,.pdf,.doc,.docx,.odt",
      style: "display:none;",
      onchange: (e) => acceptFile(e.target.files[0])
    });

    const drop = el("div", {
      class: "dropzone",
      tabindex: "0",
      role: "button",
      "aria-label": "Vælg fil eller træk hertil",
      onclick: () => input.click(),
      onkeydown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); input.click(); } },
      ondragover: (e) => { e.preventDefault(); drop.classList.add("is-dragover"); },
      ondragleave: () => drop.classList.remove("is-dragover"),
      ondrop: (e) => {
        e.preventDefault();
        drop.classList.remove("is-dragover");
        const f = e.dataTransfer?.files?.[0];
        if (f) acceptFile(f);
      }
    }, [
      el("p", { html: iconHtml("document", { size: 36, stroke: 1.5 }) }),
      el("p", { style: "font-weight:600;" }, "Træk filen hertil"),
      el("p", { class: "muted" }, "eller klik for at vælge"),
      input
    ]);

    card.appendChild(drop);
    return card;
  }

  function acceptFile(file) {
    if (!file) return;
    state.file = file;
    state.step = 2;
    state.draft = null;
    paint();
    // Simulate AI processing
    setTimeout(() => {
      state.draft = simulateAiExtraction(file);
      paint();
    }, 1800);
  }

  function renderReview() {
    const card = el("section", { class: "card" });
    if (!state.draft) {
      card.appendChild(el("div", { style: "text-align:center; padding: 32px 0;" }, [
        el("div", { class: "spinner" }),
        el("p", { style: "font-weight:600;" }, "AI analyserer publikationen…"),
        el("p", { class: "muted" }, `Læser "${state.file?.name || "fil"}" (${formatSize(state.file?.size || 0)}) og foreslår metadata.`)
      ]));
      return card;
    }

    const d = state.draft;
    card.appendChild(el("h2", {}, "Gennemgå AI-forslag"));
    card.appendChild(el("p", { class: "muted" }, "AI har foreslået metadata baseret på publikationens indhold. Ret efter behov, og vælg rettighedsniveau før udgivelse."));

    const form = el("form", {
      onsubmit: (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const pub = buildPublication(d, fd, state.file);
        store.addUpload(pub);
        state.draft = pub;
        state.step = 3;
        paint();
        toast("Publikation udgivet");
      }
    });

    form.appendChild(el("div", { class: "form-grid" }, [
      el("label", { class: "field" }, ["Titel", el("input", { type: "text", name: "title", value: d.title, required: true })]),
      el("label", { class: "field" }, ["Undertitel", el("input", { type: "text", name: "subtitle", value: d.subtitle || "" })]),
      el("label", { class: "field" }, ["Resume",
        el("textarea", { name: "summary", required: true }, d.summary)
      ]),
      el("div", { class: "form-grid cols-2" }, [
        el("label", { class: "field" }, ["Udgiver", el("input", { type: "text", name: "publisher", value: d.publisher, required: true })]),
        el("label", { class: "field" }, ["Udgivelsesdato", el("input", { type: "date", name: "publishedAt", value: d.publishedAt })])
      ]),
      el("div", { class: "form-grid cols-2" }, [
        el("label", { class: "field" }, [
          "Dokumenttype",
          el("select", { name: "documentType" },
            DOC_TYPES.map(t => el("option", { value: t, selected: t === d.documentType }, DOC_TYPE_LABEL[t])))
        ]),
        el("label", { class: "field" }, ["Sprog",
          el("select", { name: "language" }, [
            el("option", { value: "da", selected: d.language === "da" }, "Dansk"),
            el("option", { value: "en", selected: d.language === "en" }, "Engelsk")
          ])
        ])
      ]),
      el("label", { class: "field" }, [
        "Emneord (komma-separeret)",
        el("input", { type: "text", name: "keywords", value: (d.keywords || []).join(", ") })
      ]),
      el("div", { class: "form-grid cols-2" }, [
        el("label", { class: "field" }, ["Fagområde (komma-separeret)",
          el("input", { type: "text", name: "subjectAreas", value: (d.subjectAreas || []).join(", ") })]),
        el("label", { class: "field" }, ["Målgruppe",
          el("input", { type: "text", name: "targetAudience", value: d.targetAudience || "" })])
      ]),
      el("label", { class: "field" }, ["Geografisk omfang",
        el("input", { type: "text", name: "geographicScope", value: d.geographicScope || "" })])
    ]));

    form.appendChild(el("hr", { class: "divider" }));
    form.appendChild(el("h3", {}, "Rettighedsniveau"));
    form.appendChild(el("p", { class: "muted" }, "Vælg det højeste niveau, din myndighed kan stå inde for. Niveauet styrer, om publikationen kan bruges til AI-træning."));

    const rl = el("div", { class: "rights-list" });
    RIGHTS_LEVELS.forEach(r => {
      rl.appendChild(el("label", {}, [
        el("input", { type: "radio", name: "rightsLevel", value: String(r.level), required: true, checked: r.level === d.rightsLevel }),
        el("div", {}, [
          el("div", { class: "rl-title" }, `${r.level}. ${r.title}`),
          el("div", { class: "rl-desc" }, r.description)
        ])
      ]));
    });
    form.appendChild(rl);

    form.appendChild(el("hr", { class: "divider" }));
    form.appendChild(el("h3", {}, "Risikohensyn"));
    form.appendChild(el("p", { class: "muted" }, "Marker forhold der gælder publikationen. Markeringer styrer den automatiske risikoklassifikation."));

    const pdGroup = el("div", { class: "check-list" });
    pdGroup.appendChild(el("strong", {}, "Persondata"));
    PERSONAL_DATA_OPTIONS.forEach(o => {
      const checked = (d.personalDataFlags || []).some(f => f.includes(o.value) || f === o.label);
      pdGroup.appendChild(el("label", {}, [
        el("input", { type: "checkbox", name: "personalDataFlags", value: o.label, "data-risk": o.risk, checked }),
        el("span", {}, o.label)
      ]));
    });
    form.appendChild(pdGroup);

    const tpGroup = el("div", { class: "check-list mt-3" });
    tpGroup.appendChild(el("strong", {}, "Tredjepartsindhold"));
    THIRD_PARTY_OPTIONS.forEach(o => {
      const checked = (d.thirdPartyContentFlags || []).some(f => f.includes(o.value) || f === o.label);
      tpGroup.appendChild(el("label", {}, [
        el("input", { type: "checkbox", name: "thirdPartyContentFlags", value: o.label, "data-risk": o.risk, checked }),
        el("span", {}, o.label)
      ]));
    });
    form.appendChild(tpGroup);

    const riskPreview = el("p", { class: "muted mt-3" });
    function updateRiskPreview() {
      const risk = computeRisk(form);
      const label = { green: "Grøn", yellow: "Gul", red: "Rød" }[risk];
      riskPreview.innerHTML = `Automatisk risikoniveau: <span class="badge badge-risk" data-risk="${risk}">${label}</span>`;
    }
    form.addEventListener("change", updateRiskPreview);
    updateRiskPreview();
    form.appendChild(riskPreview);

    form.appendChild(el("div", { class: "right mt-5" }, [
      el("button", {
        type: "button",
        class: "btn btn-secondary",
        onclick: () => { state.step = 1; state.file = null; paint(); },
        html: `${iconHtml("arrowLeft")}<span>Vælg anden fil</span>`
      }),
      el("button", { type: "submit", class: "btn" }, "Udgiv publikation")
    ]));
    card.appendChild(form);
    return card;
  }

  function renderReceipt() {
    const pub = state.draft;
    const card = el("section", { class: "card" });
    card.appendChild(el("h2", {
      html: `${iconHtml("check", { size: 22 })} <span>Publikation udgivet</span>`,
      style: "display:flex; align-items:center; gap:8px; color: var(--color-ok);"
    }));
    card.appendChild(el("p", {}, `"${pub.title}" er nu tilgængelig i kataloget.`));
    card.appendChild(el("div", { class: "muted text-sm mb-4" }, `Permalink: ${window.location.origin}${window.location.pathname}#/publication/${pub.id}`));
    card.appendChild(el("div", { class: "row wrap" }, [
      el("a", { class: "btn", href: `#/publication/${pub.id}` }, "Gå til publikation"),
      el("button", {
        class: "btn btn-secondary",
        onclick: () => {
          state.step = 1; state.file = null; state.draft = null; paint();
        }
      }, "Upload en til"),
      el("a", { class: "btn btn-ghost", href: "#/search" }, "Tilbage til kataloget")
    ]));
    return card;
  }
}

function computeRisk(form) {
  const checked = [...form.querySelectorAll('input[type="checkbox"]:checked')];
  if (checked.some(c => c.dataset.risk === "red")) return "red";
  if (checked.some(c => c.dataset.risk === "yellow")) return "yellow";
  return "green";
}

function buildPublication(draft, fd, file) {
  const personalDataFlags = fd.getAll("personalDataFlags");
  const thirdPartyContentFlags = fd.getAll("thirdPartyContentFlags");

  // Compute risk from selected options (same logic as the live preview)
  const PD_RISK = Object.fromEntries(PERSONAL_DATA_OPTIONS.map(o => [o.label, o.risk]));
  const TP_RISK = Object.fromEntries(THIRD_PARTY_OPTIONS.map(o => [o.label, o.risk]));
  const allRisks = [
    ...personalDataFlags.map(f => PD_RISK[f] || "green"),
    ...thirdPartyContentFlags.map(f => TP_RISK[f] || "green")
  ];
  const riskLevel = allRisks.includes("red") ? "red"
    : allRisks.includes("yellow") ? "yellow" : "green";

  return {
    id: uid("pub"),
    title: (fd.get("title") || "").trim(),
    subtitle: (fd.get("subtitle") || "").trim(),
    summary: (fd.get("summary") || "").trim(),
    authors: draft.authors || [],
    publisher: (fd.get("publisher") || "").trim(),
    publishedAt: fd.get("publishedAt") || new Date().toISOString().slice(0, 10),
    language: fd.get("language") || "da",
    documentType: fd.get("documentType") || "rapport",
    subjectAreas: splitList(fd.get("subjectAreas")),
    keywords: splitList(fd.get("keywords")),
    targetAudience: (fd.get("targetAudience") || "").trim(),
    geographicScope: (fd.get("geographicScope") || "").trim(),
    rightsLevel: Number(fd.get("rightsLevel") || 2),
    riskLevel,
    personalDataFlags,
    thirdPartyContentFlags,
    fileName: file?.name || draft.fileName,
    fileSize: file?.size || draft.fileSize || 0,
    mimeType: file?.type || "application/pdf",
    uploadedBy: auth.currentUser()?.id ?? null,
    uploadedAt: new Date().toISOString(),
    source: "user"
  };
}

function splitList(s) {
  if (!s) return [];
  return String(s).split(",").map(x => x.trim()).filter(Boolean);
}

/* Fake AI extraction — generates plausible metadata from the filename. */
function simulateAiExtraction(file) {
  const name = (file?.name || "publikation.pdf").replace(/\.[^.]+$/, "");
  const cleaned = name.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  const titled = cleaned.replace(/\b\w/g, c => c.toUpperCase());

  const lower = cleaned.toLowerCase();
  const docType = /strateg/.test(lower) ? "strategi"
    : /analyse/.test(lower) ? "analyse"
    : /vejledning/.test(lower) ? "vejledning"
    : /evaluering/.test(lower) ? "evaluering"
    : /hvidbog/.test(lower) ? "hvidbog"
    : "rapport";

  const guessedSubjects = [];
  const subjectMap = {
    klima: "klima", energi: "energi", sundhed: "sundhed", uddannelse: "uddannelse",
    digital: "digitalisering", miljø: "miljø", miljo: "miljø", transport: "transport",
    bolig: "bolig", ai: "ai", data: "data", ældre: "ældre", aeldre: "ældre"
  };
  for (const [k, v] of Object.entries(subjectMap)) {
    if (lower.includes(k) && !guessedSubjects.includes(v)) guessedSubjects.push(v);
  }
  if (!guessedSubjects.length) guessedSubjects.push("offentlig forvaltning");

  const user = auth.currentUser();
  const publisher = user?.organization || "Min Myndighed";

  const summary = `Denne publikation præsenterer ${cleaned ? cleaned.toLowerCase() : "et fagligt emne"} i en dansk offentlig kontekst. Den indeholder analyser, anbefalinger og baggrundsmateriale udarbejdet af ${publisher} og henvender sig til fagprofessionelle, beslutningstagere og borgere. Indholdet kan indgå i videre arbejde med digitalisering, viden­deling og offentlig formidling.`;

  return {
    title: titled || "Ny publikation",
    subtitle: "",
    summary,
    authors: [publisher],
    publisher,
    publishedAt: new Date().toISOString().slice(0, 10),
    language: "da",
    documentType: docType,
    subjectAreas: guessedSubjects,
    keywords: guessedSubjects.slice(0, 4),
    targetAudience: "Fagprofessionelle, borgere",
    geographicScope: "Danmark",
    rightsLevel: 3,
    personalDataFlags: [],
    thirdPartyContentFlags: [],
    fileName: file?.name || "publikation.pdf",
    fileSize: file?.size || 0,
    mimeType: file?.type || "application/pdf"
  };
}
