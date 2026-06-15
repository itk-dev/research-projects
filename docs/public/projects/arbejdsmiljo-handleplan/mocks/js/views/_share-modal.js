import { el, clear, toast, formatDate } from "../util.js";
import { iconHtml } from "../icons.js";
import { store, uid } from "../store.js";
import { logEvent } from "../plan-helpers.js";

export function openShareModal(plan, onClose) {
  const recipients = [];

  const backdrop = el("div", { class: "modal-backdrop", onclick: (e) => {
    if (e.target === backdrop) close();
  }});
  const modal = el("div", { class: "modal" });
  backdrop.appendChild(modal);
  document.getElementById("modal-root").appendChild(backdrop);

  function close() {
    backdrop.remove();
    onClose && onClose();
  }

  paint();

  function paint() {
    clear(modal);
    modal.appendChild(el("div", { class: "row between" }, [
      el("h3", {}, "Del handleplan"),
      el("button", { class: "btn-icon", onclick: close, title: "Luk", html: iconHtml("close", { size: 16 }) })
    ]));
    modal.appendChild(el("p", { class: "muted" },
      "Modtagerne får et link til en read-only visning. Ingen rigtig mail bliver sendt i prototypen."));

    modal.appendChild(autocompleteField({
      employees: store.getEmployees(),
      onPick: (emp) => {
        if (!recipients.some(r => r.email === emp.email)) {
          recipients.push({ name: emp.name, email: emp.email, organization: emp.organization });
        }
        paint();
      },
      excludeEmails: recipients.map(r => r.email)
    }));

    if (recipients.length > 0) {
      modal.appendChild(el("div", { class: "recipients" }, recipients.map((r, i) =>
        el("span", { class: "recipient-chip" }, [
          el("strong", {}, r.name),
          " · ", r.email,
          el("button", {
            title: "Fjern",
            onclick: () => { recipients.splice(i, 1); paint(); },
            html: iconHtml("close", { size: 12 })
          })
        ])
      )));
    }

    modal.appendChild(el("div", { class: "modal-actions" }, [
      el("button", { class: "btn btn-secondary", onclick: close }, "Annullér"),
      el("button", {
        class: "btn",
        disabled: recipients.length === 0,
        onclick: () => sendShare(recipients),
        html: iconHtml("send") + "<span>Send link</span>"
      })
    ]));
  }

  function sendShare(list) {
    const token = uid("share").replace(/^share-/, "");
    const sentAt = new Date().toISOString();
    plan.shares = plan.shares || [];
    list.forEach(r => {
      plan.shares.push({ recipientEmail: r.email, recipientName: r.name, sentAt, token });
    });
    logEvent(plan, "shared",
      `Delte handleplanen med ${list.length} ${list.length === 1 ? "modtager" : "modtagere"}.`,
      list.map(r => r.name).join(", "));
    store.savePlan(plan);

    // Show "sent" banner state inside the modal
    clear(modal);
    modal.appendChild(el("h3", { html: iconHtml("check", { size: 22 }) + "<span style='margin-left:8px'>Mail med link er afsendt</span>" }));
    modal.appendChild(el("p", {},
      `Linket er sendt til ${list.map(r => r.name).join(", ")} (${formatDate(sentAt)}).`));
    modal.appendChild(el("div", { class: "notice notice-info mt-3" }, [
      el("span", { class: "notice-icon", html: iconHtml("eye", { size: 20 }) }),
      el("div", { class: "grow" }, [
        el("p", {}, el("strong", {}, "Sådan ser linket ud for modtageren:")),
        el("p", { class: "muted text-sm mono", style: "word-break:break-all" },
          `${location.origin}${location.pathname}#/shared/${token}`)
      ])
    ]));
    modal.appendChild(el("div", { class: "modal-actions" }, [
      el("button", { class: "btn btn-secondary", onclick: close }, "Luk"),
      el("a", {
        class: "btn",
        href: `#/shared/${token}`,
        target: "_blank",
        rel: "noopener",
        onclick: () => setTimeout(close, 100),
        html: iconHtml("arrowRight") + "<span>Åbn som modtager</span>"
      })
    ]));
    toast("Mail med link er afsendt (simuleret).", "ok");
  }
}

function autocompleteField({ employees, onPick, excludeEmails = [] }) {
  let query = "";
  let focusedIdx = -1;
  let lastInput;
  let lastListWrap;

  const wrap = el("div", { class: "autocomplete" });
  const input = el("input", {
    type: "text",
    placeholder: "Søg medarbejder eller indtast e-mail…",
    oninput: (e) => { query = e.target.value; focusedIdx = -1; paintList(); },
    onkeydown: (e) => {
      const results = filtered();
      if (e.key === "ArrowDown") { e.preventDefault(); focusedIdx = Math.min(focusedIdx + 1, results.length - 1); paintList(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); focusedIdx = Math.max(focusedIdx - 1, 0); paintList(); }
      else if (e.key === "Enter") {
        e.preventDefault();
        const pick = focusedIdx >= 0 ? results[focusedIdx] : results[0];
        if (pick) {
          onPick(pick);
          input.value = "";
          query = "";
          focusedIdx = -1;
        } else if (/^\S+@\S+\.\S+$/.test(query)) {
          onPick({ name: query.split("@")[0], email: query, organization: "" });
          input.value = "";
          query = "";
        }
      }
    }
  });
  lastInput = input;
  wrap.appendChild(input);
  const listWrap = el("div");
  lastListWrap = listWrap;
  wrap.appendChild(listWrap);
  paintList();

  function filtered() {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return employees
      .filter(e => !excludeEmails.includes(e.email))
      .filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        (e.organization || "").toLowerCase().includes(q)
      )
      .slice(0, 8);
  }

  function paintList() {
    clear(lastListWrap);
    const results = filtered();
    if (results.length === 0) return;
    const list = el("div", { class: "autocomplete-list" }, results.map((e, i) =>
      el("div", {
        class: "autocomplete-item" + (i === focusedIdx ? " is-focused" : ""),
        onmousedown: (ev) => { ev.preventDefault(); onPick(e); input.value = ""; query = ""; focusedIdx = -1; paintList(); }
      }, [
        el("span", { class: "ac-name" }, e.name),
        el("span", { class: "ac-meta" }, `${e.email} · ${e.organization || ""}`)
      ])
    ));
    lastListWrap.appendChild(list);
  }

  return wrap;
}
