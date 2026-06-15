import { el, clear, navigate, toast, addMonths, todayISO } from "../util.js";
import { iconHtml } from "../icons.js";
import { auth } from "../auth.js";
import { store } from "../store.js";
import { emptyPlan, logEvent, userPlans } from "../plan-helpers.js";

export function render(root) {
  clear(root);
  const user = auth.currentUser();

  // Existing themes for the user, offered as datalist suggestions.
  const existingThemes = [...new Set(userPlans(user.id).map(p => p.theme).filter(Boolean))].sort();

  // Local state for AMG members (default: the current user).
  const members = [
    { name: user.name, role: user.role || "" },
    { name: "", role: "" }
  ];

  root.appendChild(el("section", { class: "page-head" }, [
    el("a", { href: "#/plans", class: "breadcrumb" }, [
      el("span", { html: iconHtml("arrowLeft", { size: 14 }) }),
      el("span", { style: "margin-left:6px" }, "Tilbage til mine handleplaner")
    ]),
    el("span", { class: "eyebrow" }, "Opret handleplan"),
    el("h1", {}, "Ny arbejdsmiljøhandleplan"),
    el("p", { class: "lede" }, "Udfyld de overordnede oplysninger. Du kan tilføje indsatser, " +
      "risikovurdering og resten af sektionerne bagefter.")
  ]));

  const card = el("section", { class: "card" });
  root.appendChild(card);

  function paint() {
    clear(card);
    card.appendChild(el("form", {
      class: "form-grid",
      onsubmit: (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        if (!data.workplace?.trim()) {
          toast("Angiv hvilken arbejdsplads handleplanen dækker.", "error");
          return;
        }
        const cleanMembers = members
          .filter(m => m.name.trim())
          .map(m => ({ name: m.name.trim(), role: m.role.trim() }));
        const plan = emptyPlan({
          ownerId: user.id,
          workplace: data.workplace.trim(),
          theme: (data.theme || "").trim(),
          amgMembers: cleanMembers,
          nextReviewDate: data.nextReviewDate || addMonths(todayISO(), 12)
        });
        logEvent(plan, "created", `Handleplan oprettet for "${plan.workplace}".`);
        store.addPlan(plan);
        toast("Handleplan oprettet.", "ok");
        navigate(`#/plans/${plan.id}`);
      }
    }, [
      el("label", { class: "field" }, [
        "Arbejdsplads(er) som arbejdsmiljøgruppen dækker *",
        el("input", { type: "text", name: "workplace", required: true,
          placeholder: "f.eks. BA Sekretariatet, Rådhuset" })
      ]),
      el("label", { class: "field" }, [
        "Tema",
        el("input", { type: "text", name: "theme", list: "theme-suggestions",
          placeholder: "Fx Rådhuset, Drift, Dagtilbud…" }),
        el("datalist", { id: "theme-suggestions" },
          existingThemes.map(t => el("option", { value: t }))),
        el("span", { class: "hint" }, "Bruges til at gruppere handleplaner på “Mine handleplaner”. Kan ændres senere.")
      ]),
      el("div", { class: "field" }, [
        el("span", {}, "Arbejdsmiljøgruppens medlemmer"),
        renderMembersEditor(),
        el("button", {
          type: "button",
          class: "btn btn-ghost btn-sm mt-2",
          onclick: () => { members.push({ name: "", role: "" }); paint(); },
          html: iconHtml("plus") + "<span>Tilføj medlem</span>"
        })
      ]),
      el("label", { class: "field" }, [
        "Næste revisionsdato",
        el("input", { type: "date", name: "nextReviewDate", value: addMonths(todayISO(), 12) }),
        el("span", { class: "hint" }, "Vi minder dig på dashboard når datoen nærmer sig. Standard: 12 måneder.")
      ]),
      el("div", { class: "row right" }, [
        el("a", { class: "btn btn-secondary", href: "#/plans" }, "Annullér"),
        el("button", { class: "btn", type: "submit" }, "Opret handleplan")
      ])
    ]));
  }

  function renderMembersEditor() {
    return el("div", { class: "amg-list mt-2" }, members.map((m, i) =>
      el("div", { class: "amg-row" }, [
        el("input", { type: "text", placeholder: "Navn", value: m.name,
          oninput: (e) => { members[i].name = e.target.value; } }),
        el("input", { type: "text", placeholder: "Rolle (AMR, AML…)", value: m.role,
          oninput: (e) => { members[i].role = e.target.value; } }),
        el("button", {
          type: "button", class: "btn-icon", title: "Fjern medlem",
          disabled: members.length <= 1,
          onclick: () => { if (members.length > 1) { members.splice(i, 1); paint(); } },
          html: iconHtml("trash", { size: 16 })
        })
      ])
    ));
  }

  paint();
}
