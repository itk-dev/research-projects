import { el, clear, navigate, toast } from "../util.js";
import { auth, DEMO_USERS, MUNICIPALITIES } from "../auth.js";

export function render(root, query = {}) {
  clear(root);

  let mode = query.mode === "register" ? "register" : "login";

  const card = el("section", { class: "card auth-card" });

  function paint() {
    clear(card);
    const tabs = el("div", { class: "auth-tabs" }, [
      el("button", {
        class: mode === "login" ? "is-active" : "",
        onclick: () => { mode = "login"; paint(); }
      }, "Log ind"),
      el("button", {
        class: mode === "register" ? "is-active" : "",
        onclick: () => { mode = "register"; paint(); }
      }, "Opret bruger")
    ]);
    card.appendChild(tabs);

    if (mode === "login") {
      const form = loginForm();
      card.appendChild(form);
      card.appendChild(demoUsersBox(form));
    } else {
      card.appendChild(registerForm());
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
        toast(`Velkommen tilbage, ${user.name}`);
        navigate("#/");
      } catch (err) {
        toast(err.message);
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

/* Prototype-only: ready-made logins. Clicking one fills the form fields. */
function demoUsersBox(form) {
  const fill = (email, password) => {
    form.querySelector('input[name="email"]').value = email;
    form.querySelector('input[name="password"]').value = password;
  };

  return el("div", { class: "demo-users" }, [
    el("p", { class: "demo-users-head" }, "Prototype – prøv med en testbruger"),
    ...DEMO_USERS.map(d =>
      el("button", {
        type: "button",
        class: "demo-user",
        onclick: () => fill(d.email, d.password)
      }, [
        el("span", { class: "demo-user-name" }, `${d.name} · ${d.organization}`),
        el("span", { class: "demo-user-cred" }, `${d.email} / ${d.password}`)
      ])
    ),
    el("p", { class: "hint demo-users-foot" }, "Klik en bruger for at udfylde felterne.")
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
        toast(`Velkommen, ${user.name}`);
        navigate("#/");
      } catch (err) {
        toast(err.message);
      }
    }
  }, [
    el("label", { class: "field" }, [
      "Navn",
      el("input", { type: "text", name: "name", required: true, autocomplete: "name" })
    ]),
    el("label", { class: "field" }, [
      "Myndighed eller organisation",
      el("select", { name: "organization", required: true }, [
        el("option", { value: "", disabled: true, selected: true }, "Vælg myndighed …"),
        ...MUNICIPALITIES.map(m =>
          el("option", { value: m.name }, `${m.name} (${m.domain})`)
        )
      ]),
      el("span", { class: "hint" }, "Kun whitelistede myndigheder. Kontakt os for at få din myndighed tilføjet.")
    ]),
    el("label", { class: "field" }, [
      "E-mail",
      el("input", { type: "email", name: "email", required: true, autocomplete: "email" }),
      el("span", { class: "hint" }, "Skal være din arbejdsmail på myndighedens domæne (f.eks. @aarhus.dk).")
    ]),
    el("label", { class: "field" }, [
      "Adgangskode",
      el("input", { type: "password", name: "password", required: true, minlength: 4, autocomplete: "new-password" }),
      el("span", { class: "hint" }, "Mindst 4 tegn. Prototype – brug ikke en rigtig adgangskode.")
    ]),
    el("button", { class: "btn", type: "submit" }, "Opret bruger")
  ]);
}
