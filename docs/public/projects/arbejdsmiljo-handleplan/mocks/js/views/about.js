import { el, clear } from "../util.js";

export function render(root) {
  clear(root);
  root.appendChild(el("section", { class: "page-head" }, [
    el("span", { class: "eyebrow" }, "Om prototypen"),
    el("h1", {}, "Arbejdsmiljøhandleplan — digital prototype")
  ]));
  root.appendChild(el("section", { class: "card" }, [
    el("p", { class: "lede" },
      "Denne prototype er en klikbar demo af, hvordan en digital arbejdsmiljøhandleplan " +
      "kunne se ud og fungere på tværs af afdelinger i Aarhus Kommune."),
    el("h3", { class: "mt-4" }, "Hvad findes her"),
    el("ul", {}, [
      el("li", {}, "Registrering og login (lokalt — ingen rigtig auth)."),
      el("li", {}, "Opret og redigér din afdelings handleplan med alle 9 sektioner fra BA-skabelonen."),
      el("li", {}, "Interaktiv risikomatrix (4×4) og automatisk farvet risikovurdering pr. action."),
      el("li", {}, "Log over alle ændringer pr. handleplan."),
      el("li", {}, "Deling via simuleret e-mail-link (banner + read-only modtagervisning)."),
      el("li", {}, "Advis-stribe og badges for ajourføringsdato.")
    ]),
    el("h3", { class: "mt-4" }, "Begrænsninger"),
    el("ul", {}, [
      el("li", {}, "Alt gemmes i din browsers localStorage — ingen backend."),
      el("li", {}, "Deling sender ingen rigtig e-mail; banneret viser hvor linket ville pege hen."),
      el("li", {}, "Adgangskoder hashes trivielt — kun til demo."),
    ])
  ]));
}
