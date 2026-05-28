import { el, clear, navigate, escapeHtml } from "../util.js";
import { getAllAssistants } from "../catalog.js";
import { iconHtml } from "../icons.js";

/* Future features teased on the home page but not wired to real routes. */
const COMING_SOON = [
  "Deling af tools",
  "Deling af skills",
  "Ratings",
  "API",
  "Abonnér på ændringer",
  "Testcases"
];

export function render(root) {
  clear(root);

  const all = getAllAssistants();
  const kommuneCount = new Set(all.map(a => a.originKommune)).size;
  const modelCount = new Set(all.map(a => a.languageModel)).size;

  const searchBlock = el("section", { class: "home-search", "aria-label": "Søg i kataloget" }, [
    el("p", { class: "eyebrow" }, "Find en assistent"),
    el("form", {
      class: "home-search-form",
      role: "search",
      onsubmit: (e) => {
        e.preventDefault();
        const q = new FormData(e.target).get("q") || "";
        navigate(`#/search?q=${encodeURIComponent(q.trim())}`);
      }
    }, [
      el("input", {
        type: "search",
        name: "q",
        placeholder: "Søg efter borgerservice, referat, journalisering…",
        "aria-label": "Søg"
      }),
      el("button", { class: "btn", type: "submit" }, "Søg")
    ])
  ]);

  const hero = el("section", { class: "hero" }, [
    el("p", { class: "eyebrow" }, "Del & hjemtag · dansk offentlig AI"),
    el("h1", { class: "hero-title" }, [
      "Et fælles bibliotek over ",
      el("em", {}, "kommunale"),
      " AI-assistenter."
    ]),
    el("p", { class: "lede" },
      "Find, del og hjemtag AI-assistenter bygget af danske myndigheder. Når én kommune løser en opgave, kan resten hjemtage assistenten, eksportere konfigurationen og køre den lokalt — så gode løsninger skalerer nationalt."),

    el("dl", { class: "hero-stats" }, [
      el("div", {}, [
        el("dt", {}, "Assistenter"),
        el("dd", {}, String(all.length))
      ]),
      el("div", {}, [
        el("dt", {}, "Kommuner"),
        el("dd", {}, String(kommuneCount))
      ]),
      el("div", {}, [
        el("dt", {}, "Sprogmodeller"),
        el("dd", {}, String(modelCount))
      ])
    ])
  ]);

  const recent = [...all]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 8);

  const railEl = el("div", { class: "recent-rail" },
    recent.map(a => renderRailCard(a))
  );

  function scrollRail(direction) {
    const firstCard = railEl.querySelector(".rail-card");
    const step = firstCard ? firstCard.getBoundingClientRect().width + 16 : 320;
    railEl.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  const prevBtn = el("button", {
    class: "rail-nav rail-nav-prev",
    type: "button",
    "aria-label": "Forrige",
    onclick: () => scrollRail(-1),
    html: iconHtml("arrowLeft", { size: 18 })
  });
  const nextBtn = el("button", {
    class: "rail-nav rail-nav-next",
    type: "button",
    "aria-label": "Næste",
    onclick: () => scrollRail(1),
    html: iconHtml("arrowRight", { size: 18 })
  });

  const rail = el("section", { class: "recent-section" }, [
    el("div", { class: "section-head" }, [
      el("p", { class: "eyebrow" }, "Senest opdateret"),
      el("a", { class: "section-link", href: "#/search" }, "Se hele kataloget →")
    ]),
    el("div", { class: "recent-rail-wrap" }, [
      railEl,
      el("div", { class: "rail-nav-bar" }, [prevBtn, nextBtn])
    ])
  ]);

  const aboutSection = el("section", { class: "card mt-5 how-it-works" }, [
    el("p", { class: "eyebrow" }, "Sådan virker det"),
    el("ol", { class: "steps-list" }, [
      el("li", {}, el("span", { class: "step-body" }, [el("strong", {}, "Opret bruger"), " og log ind som repræsentant for din myndighed."])),
      el("li", {}, el("span", { class: "step-body" }, [el("strong", {}, "Find en assistent"), " – søg og filtrér på kommune, sprogmodel og datafølsomhed."])),
      el("li", {}, el("span", { class: "step-body" }, [el("strong", {}, "Hjemtag"), " – eksportér assistentens JSON og følg vidensopskriften, der beskriver hvilke data du selv skal levere."])),
      el("li", {}, el("span", { class: "step-body" }, [el("strong", {}, "Tilpas lokalt"), " – importér i din egen OpenWebUI, tilføj kommunens viden og tag den i brug."]))
    ])
  ]);

  const comingSoon = el("section", { class: "card mt-5" }, [
    el("p", { class: "eyebrow" }, "Kommer snart"),
    el("p", { class: "muted", style: "margin:4px 0 0;" },
      "Funktioner vi arbejder på til kommende versioner. De er ikke aktive endnu."),
    el("div", { class: "coming-soon-grid", "aria-label": "Kommende funktioner" },
      COMING_SOON.map(label => el("span", {
        class: "coming-soon-chip",
        "aria-disabled": "true",
        title: "Kommer snart"
      }, [label, el("span", { class: "cs-tag" }, "snart")]))
    )
  ]);

  root.appendChild(hero);
  root.appendChild(searchBlock);
  root.appendChild(rail);
  root.appendChild(aboutSection);
  root.appendChild(comingSoon);
}

function renderRailCard(a) {
  return el("a", {
    class: "rail-card",
    href: `#/assistant/${a.id}`
  }, [
    el("span", { class: "rail-meta" }, `${a.originKommune} · ${a.languageModel}`),
    el("span", { class: "rail-title", html: escapeHtml(a.name) }),
    el("span", { class: "rail-summary", text: trim(a.description, 110) })
  ]);
}

function trim(s, n) {
  if (!s) return "";
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
