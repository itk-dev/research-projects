import { el, clear, navigate, toast } from "../util.js";
import { auth } from "../auth.js";

export function render(root, query = {}) {
  clear(root);

  let mode = query.mode === "register" ? "register" : "login";

  const card = el("section", { class: "card auth-card" });

  function paint() {
    clear(card);
    const tabs = el("div", { class: "auth-tabs" }, [
      el("button", { class: mode === "login" ? "is-active" : "", onclick: () => { mode = "login"; paint(); } }, "Log ind"),
      el("button", { class: mode === "register" ? "is-active" : "", onclick: () => { mode = "register"; paint(); } }, "Opret bruger")
    ]);
    card.appendChild(tabs);
    card.appendChild(mode === "login" ? loginForm() : registerForm());
    if (mode === "login") {
      card.appendChild(el("div", { class: "demo-credentials" }, [
        el("strong", {}, "Demo-brugere: "),
        el("br"),
        "Anna Sørensen (AMR): ", el("code", {}, "anna@aarhus.dk"), " / ", el("code", {}, "demo"),
        el("br"),
        "Peter Madsen (AML): ", el("code", {}, "peter@aarhus.dk"), " / ", el("code", {}, "demo")
      ]));
    }
  }

  paint();
  root.appendChild(card);
}

function loginForm() {
  return el("form", {
    class: "form-grid",
    onsubmit: (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      try {
        const user = auth.login(data);
        toast(`Velkommen tilbage, ${user.name}`, "ok");
        navigate("#/");
      } catch (err) {
        toast(err.message, "error");
      }
    }
  }, [
    el("label", { class: "field" }, [
      "E-mail",
      el("input", { type: "email", name: "email", required: true, autocomplete: "email" })
    ]),
    el("label", { class: "field" }, [
      "Adgangskode",
      el("input", { type: "password", name: "password", required: true, autocomplete: "current-password" })
    ]),
    el("button", { class: "btn", type: "submit" }, "Log ind")
  ]);
}

function registerForm() {
  return el("form", {
    class: "form-grid",
    onsubmit: (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      try {
        const user = auth.register(data);
        toast(`Velkommen, ${user.name}`, "ok");
        navigate("#/");
      } catch (err) {
        toast(err.message, "error");
      }
    }
  }, [
    el("label", { class: "field" }, [
      "Navn",
      el("input", { type: "text", name: "name", required: true, autocomplete: "name" })
    ]),
    el("label", { class: "field" }, [
      "Rolle i arbejdsmiljøgruppen",
      el("select", { name: "role" }, [
        el("option", { value: "Arbejdsmiljørepræsentant" }, "Arbejdsmiljørepræsentant (AMR)"),
        el("option", { value: "Arbejdsmiljøleder" }, "Arbejdsmiljøleder (AML)"),
        el("option", { value: "Andet" }, "Andet")
      ])
    ]),
    el("label", { class: "field" }, [
      "Afdeling / organisation",
      el("input", { type: "text", name: "organization", placeholder: "f.eks. BA, Aarhus Kommune", autocomplete: "organization" })
    ]),
    el("label", { class: "field" }, [
      "E-mail",
      el("input", { type: "email", name: "email", required: true, autocomplete: "email" })
    ]),
    el("label", { class: "field" }, [
      "Adgangskode",
      el("input", { type: "password", name: "password", required: true, minlength: 4, autocomplete: "new-password" }),
      el("span", { class: "hint" }, "Mindst 4 tegn. Prototype – brug ikke en rigtig adgangskode.")
    ]),
    el("button", { class: "btn", type: "submit" }, "Opret bruger")
  ]);
}
