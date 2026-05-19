import { el, clear, navigate, escapeHtml } from "../util.js";
import { getAllPublications } from "../catalog.js";
import { iconHtml } from "../icons.js";

export function render(root) {
  clear(root);

  const all = getAllPublications();
  const publisherCount = new Set(all.map(p => p.publisher)).size;
  const trainableCount = all.filter(p => p.rightsLevel >= 5).length;

  const searchBlock = el("section", { class: "home-search", "aria-label": "Søg i kataloget" }, [
    el("p", { class: "eyebrow" }, "Find offentlig viden"),
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
        placeholder: "Søg efter rapporter, analyser, strategier…",
        "aria-label": "Søg"
      }),
      el("button", { class: "btn", type: "submit" }, "Søg")
    ])
  ]);

  const hero = el("section", { class: "hero" }, [
    el("p", { class: "eyebrow" }, "Offentlig viden · dansk AI"),
    el("h1", { class: "hero-title" }, [
      "Et fælles katalog over ",
      el("em", {}, "dansk"),
      " offentlig viden."
    ]),
    el("p", { class: "lede" },
      "Find, gem og bidrag med rapporter, analyser og strategier fra danske myndigheder – og hjælp med at bygge et rettighedsclearet datagrundlag for danske sprogmodeller."),

    el("dl", { class: "hero-stats" }, [
      el("div", {}, [
        el("dt", {}, "Publikationer"),
        el("dd", {}, String(all.length))
      ]),
      el("div", {}, [
        el("dt", {}, "Myndigheder"),
        el("dd", {}, String(publisherCount))
      ]),
      el("div", {}, [
        el("dt", {}, "Egnet til AI-træning"),
        el("dd", {}, String(trainableCount))
      ])
    ])
  ]);

  const recent = [...all]
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 8);

  const railEl = el("div", { class: "recent-rail" },
    recent.map(p => renderRailCard(p))
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
      el("p", { class: "eyebrow" }, "Senest tilføjet"),
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
      el("li", {}, el("span", { class: "step-body" }, [el("strong", {}, "Upload publikation"), " – AI foreslår metadata, resume og rettighedsniveau."])),
      el("li", {}, el("span", { class: "step-body" }, [el("strong", {}, "Godkend og udgiv"), " – du har ansvaret for rettighederne, ligesom på Open Data DK."])),
      el("li", {}, el("span", { class: "step-body" }, [el("strong", {}, "Søg og deling"), " – brugere finder dit indhold, kan gemme favoritter og dele samlinger."]))
    ])
  ]);

  root.appendChild(hero);
  root.appendChild(searchBlock);
  root.appendChild(rail);
  root.appendChild(aboutSection);
}

function renderRailCard(p) {
  return el("a", {
    class: "rail-card",
    href: `#/publication/${p.id}`
  }, [
    el("span", { class: "rail-meta" }, `${p.publisher} · ${new Date(p.publishedAt).getFullYear()}`),
    el("span", { class: "rail-title", html: escapeHtml(p.title) }),
    el("span", { class: "rail-summary", text: trim(p.summary, 110) })
  ]);
}

function trim(s, n) {
  if (!s) return "";
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
