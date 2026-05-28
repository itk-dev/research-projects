import { el, clear, navigate, toast } from "../util.js";
import { auth } from "../auth.js";
import { store, uid } from "../store.js";
import { DATA_SENSITIVITY } from "../catalog.js";
import { iconHtml, icon as iconNode } from "../icons.js";

export function render(root) {
  const user = auth.currentUser();
  if (!user) {
    navigate("#/login");
    return;
  }
  clear(root);

  // state.parsed holds the parsed OWUI JSON; state.draft holds suggested metadata.
  const state = { step: 1, rawJson: null, parsed: null, draft: null, published: null };

  root.appendChild(el("header", { class: "page-head" }, [
    el("h1", { style: "margin:0 0 8px;" }, "Del assistent"),
    el("p", { class: "lede", style: "margin:0;" },
      "Del en AI-assistent fra din myndighed med de andre kommuner. Indsæt assistentens OpenWebUI-JSON — AI foreslår metadata, og du bekræfter datagrundlaget.")
  ]));

  root.appendChild(el("aside", {
    class: "alert alert-rights",
    role: "note",
    "aria-label": "Ansvar"
  }, [
    el("span", { class: "alert-mark", "aria-hidden": "true" }),
    el("p", {},
      "Du har som deler ansvaret for, at assistenten kan deles, og at det beskrevne datagrundlag ikke indeholder data, der ikke må deles. Selve videns- og datafiler deles ikke — kun konfigurationen og en opskrift på datagrundlaget.")
  ]));

  const layout = el("div", { class: "upload-layout" });
  const stepNav = el("nav", { class: "step-rail", "aria-label": "Trin i deling" });
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
      { n: 1, title: "Indsæt JSON", hint: "Vælg fil eller indsæt OWUI-JSON" },
      { n: 2, title: "Gennemgang", hint: "Tjek AI-forslag og datafølsomhed" },
      { n: 3, title: "Kvittering", hint: "Permalink til din assistent" }
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
      accept: "application/json,.json",
      style: "display:none;",
      onchange: (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => acceptJson(String(reader.result));
        reader.readAsText(file);
      }
    });

    const drop = el("div", {
      class: "dropzone",
      tabindex: "0",
      role: "button",
      "aria-label": "Vælg JSON-fil eller træk hertil",
      onclick: () => input.click(),
      onkeydown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); input.click(); } },
      ondragover: (e) => { e.preventDefault(); drop.classList.add("is-dragover"); },
      ondragleave: () => drop.classList.remove("is-dragover"),
      ondrop: (e) => {
        e.preventDefault();
        drop.classList.remove("is-dragover");
        const f = e.dataTransfer?.files?.[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = () => acceptJson(String(reader.result));
        reader.readAsText(f);
      }
    }, [
      el("p", { html: iconHtml("document", { size: 36, stroke: 1.5 }) }),
      el("p", { style: "font-weight:600;" }, "Træk OpenWebUI-JSON hertil"),
      el("p", { class: "muted" }, "eller klik for at vælge en .json-fil"),
      input
    ]);
    card.appendChild(drop);

    card.appendChild(el("hr", { class: "divider" }));

    const form = el("form", {
      onsubmit: (e) => {
        e.preventDefault();
        const raw = new FormData(e.target).get("json") || "";
        acceptJson(String(raw));
      }
    }, [
      el("label", { class: "field" }, [
        "…eller indsæt JSON direkte",
        el("textarea", {
          name: "json",
          rows: "8",
          placeholder: '{\n  "id": "min-assistent",\n  "name": "Min assistent",\n  "base_model_id": "llama3.1:70b",\n  ...\n}'
        })
      ]),
      el("div", { class: "right" }, [
        el("button", { type: "submit", class: "btn" }, "Analysér JSON")
      ])
    ]);
    card.appendChild(form);

    return card;
  }

  function acceptJson(raw) {
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      toast("Kunne ikke læse JSON. Tjek at formatet er gyldigt.");
      return;
    }
    state.rawJson = raw;
    state.parsed = parsed;
    state.step = 2;
    state.draft = null;
    paint();
    // Simulate brief AI processing of the parsed config.
    setTimeout(() => {
      state.draft = suggestMetadata(parsed);
      paint();
    }, 1400);
  }

  function renderReview() {
    const card = el("section", { class: "card" });
    if (!state.draft) {
      card.appendChild(el("div", { style: "text-align:center; padding: 32px 0;" }, [
        el("div", { class: "spinner" }),
        el("p", { style: "font-weight:600;" }, "AI analyserer assistenten…"),
        el("p", { class: "muted" }, "Læser konfigurationen og foreslår metadata.")
      ]));
      return card;
    }

    const d = state.draft;
    card.appendChild(el("h2", {}, "Gennemgå AI-forslag"));
    card.appendChild(el("p", { class: "muted" }, "AI har foreslået metadata ud fra den indsatte konfiguration. Ret efter behov, og vælg datafølsomhed før deling."));

    const form = el("form", {
      onsubmit: (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const assistant = buildAssistant(d, fd, state.parsed);
        store.addUpload(assistant);
        state.published = assistant;
        state.step = 3;
        paint();
        toast("Assistent delt");
      }
    });

    form.appendChild(el("div", { class: "form-grid" }, [
      el("label", { class: "field" }, ["Navn", el("input", { type: "text", name: "name", value: d.name, required: true })]),
      el("label", { class: "field" }, ["Tagline (kort beskrivelse)", el("input", { type: "text", name: "tagline", value: d.tagline || "" })]),
      el("label", { class: "field" }, ["Beskrivelse",
        el("textarea", { name: "description", required: true }, d.description)
      ]),
      el("div", { class: "form-grid cols-2" }, [
        el("label", { class: "field" }, ["Oprindelseskommune", el("input", { type: "text", name: "originKommune", value: d.originKommune, required: true })]),
        el("label", { class: "field" }, ["Sprogmodel", el("input", { type: "text", name: "languageModel", value: d.languageModel, required: true })])
      ]),
      el("label", { class: "field" }, [
        "Tags (komma-separeret)",
        el("input", { type: "text", name: "tags", value: (d.tags || []).join(", ") })
      ]),
      el("label", { class: "field" }, ["Vidensopskrift (hvad kommunen selv skal levere)",
        el("textarea", { name: "knowledgeRecipe", rows: "4" }, d.knowledgeRecipe || "")
      ])
    ]));

    form.appendChild(el("hr", { class: "divider" }));
    form.appendChild(el("h3", {}, "Datafølsomhed"));
    form.appendChild(el("p", { class: "muted" }, "Vælg hvilke data assistenten er beregnet til. Det styrer, hvordan assistenten må anvendes."));

    const rl = el("div", { class: "rights-list" });
    DATA_SENSITIVITY.forEach(s => {
      rl.appendChild(el("label", {}, [
        el("input", { type: "radio", name: "dataSensitivity", value: s.level, required: true, checked: s.level === d.dataSensitivity }),
        el("div", {}, [
          el("div", { class: "rl-title" }, s.title),
          el("div", { class: "rl-desc" }, s.description)
        ])
      ]));
    });
    form.appendChild(rl);

    form.appendChild(el("div", { class: "right mt-5" }, [
      el("button", {
        type: "button",
        class: "btn btn-secondary",
        onclick: () => { state.step = 1; state.parsed = null; state.draft = null; paint(); },
        html: `${iconHtml("arrowLeft")}<span>Indsæt anden JSON</span>`
      }),
      el("button", { type: "submit", class: "btn" }, "Del assistent")
    ]));
    card.appendChild(form);
    return card;
  }

  function renderReceipt() {
    const a = state.published;
    const card = el("section", { class: "card" });
    card.appendChild(el("h2", {
      html: `${iconHtml("check", { size: 22 })} <span>Assistent delt</span>`,
      style: "display:flex; align-items:center; gap:8px; color: var(--color-ok);"
    }));
    card.appendChild(el("p", {}, `"${a.name}" er nu tilgængelig i biblioteket og kan hjemtages af andre kommuner.`));
    card.appendChild(el("div", { class: "muted text-sm mb-4" }, `Permalink: ${window.location.origin}${window.location.pathname}#/assistant/${a.id}`));
    card.appendChild(el("div", { class: "row wrap" }, [
      el("a", { class: "btn", href: `#/assistant/${a.id}` }, "Gå til assistent"),
      el("button", {
        class: "btn btn-secondary",
        onclick: () => {
          state.step = 1; state.parsed = null; state.rawJson = null; state.draft = null; state.published = null; paint();
        }
      }, "Del en til"),
      el("a", { class: "btn btn-ghost", href: "#/search" }, "Tilbage til kataloget")
    ]));
    return card;
  }
}

function buildAssistant(draft, fd, parsed) {
  const now = new Date().toISOString().slice(0, 10);
  return {
    id: uid("asst"),
    name: (fd.get("name") || "").trim(),
    tagline: (fd.get("tagline") || "").trim(),
    description: (fd.get("description") || "").trim(),
    originKommune: (fd.get("originKommune") || "").trim(),
    languageModel: (fd.get("languageModel") || "").trim(),
    framework: "openwebui",
    dataSensitivity: fd.get("dataSensitivity") || "almindelige",
    approvedFor: [fd.get("dataSensitivity") || "almindelige"],
    tags: splitList(fd.get("tags")),
    aiTags: draft.aiTags || [],
    readme: draft.readme || "",
    modelCard: draft.modelCard || "",
    knowledgeRecipe: (fd.get("knowledgeRecipe") || "").trim(),
    versions: [
      {
        version: "1.0.0",
        releasedAt: new Date().toISOString(),
        notes: "Første version delt via AI Bibliotek.",
        json: parsed
      }
    ],
    createdAt: now,
    updatedAt: now,
    uploadedBy: auth.currentUser()?.id ?? null,
    source: "user"
  };
}

function splitList(s) {
  if (!s) return [];
  return String(s).split(",").map(x => x.trim()).filter(Boolean);
}

/* Suggest metadata from a parsed OpenWebUI-shaped JSON object.
   This stands in for an AI extraction step. */
function suggestMetadata(parsed) {
  const user = auth.currentUser();
  const originKommune = user?.organization || "Min Kommune";

  const name = parsed?.name || "Ny assistent";
  const description = parsed?.meta?.description
    || parsed?.params?.system
    || "Beskrivelse mangler — tilføj en kort forklaring af hvad assistenten gør.";
  const languageModel = parsed?.base_model_id || parsed?.model || "ukendt model";
  const tags = (parsed?.meta?.tags || [])
    .map(t => (typeof t === "string" ? t : t?.name))
    .filter(Boolean);

  return {
    name,
    tagline: "",
    description,
    originKommune,
    languageModel,
    tags: tags.length ? tags : ["assistent"],
    aiTags: tags.slice(0, 2),
    dataSensitivity: "almindelige",
    readme: `# ${name}\n\n${description}`,
    modelCard: `Sprogmodel: ${languageModel}.\nKontekstvindue: ${parsed?.params?.num_ctx || "ukendt"}.\nTemperatur: ${parsed?.params?.temperature ?? "ukendt"}.\n\nHensyn: Gennemgå system-prompten og tilpas den til din kommune før brug.`,
    knowledgeRecipe: (parsed?.knowledge?.length)
      ? parsed.knowledge.map((k, i) => `${i + 1}. Levér lokalt: ${k.name}${k.note ? ` (${k.note})` : ""}.`).join("\n")
      : "Beskriv her hvilke videns- og datafiler den enkelte kommune selv skal levere."
  };
}
