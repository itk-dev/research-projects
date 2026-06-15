import { el, clear, todayISO, trapFocus } from "../util.js";
import { iconHtml } from "../icons.js";
import { uid } from "../store.js";

// Modal for the concrete "Handlinger" (tasks) belonging to an indsats. Each
// handling has a description, ansvarlig, frist and a done flag. onChange(action)
// is called after every mutation so the caller can persist and refresh the row
// count. readOnly disables all editing (e.g. for a resolved indsats) — the list
// can still be viewed.
export function openHandlingerModal(action, { onChange, readOnly = false } = {}) {
  action.handlinger = action.handlinger || [];

  const backdrop = el("div", { class: "modal-backdrop", onclick: (e) => {
    if (e.target === backdrop) close();
  }});
  const modal = el("div", { class: "modal modal-wide" });
  backdrop.appendChild(modal);
  document.getElementById("modal-root").appendChild(backdrop);

  function close() {
    releaseFocus();
    backdrop.remove();
  }
  const touched = () => onChange && onChange(action);

  paint();
  // Trap focus inside the dialog and restore it to the trigger on close. Set up
  // after the first paint so there is focusable content to land on.
  const releaseFocus = trapFocus(modal, close);

  function paint() {
    clear(modal);
    modal.appendChild(el("div", { class: "row between" }, [
      el("h3", {}, "Handlinger"),
      el("button", { class: "btn-icon", onclick: close, title: "Luk", html: iconHtml("close", { size: 16 }) })
    ]));
    modal.appendChild(el("p", { class: "muted" }, readOnly
      ? "Indsatsen er løst. Genåbn den for at redigere handlinger."
      : "Bryd indsatsen ned i konkrete handlinger med ansvarlig og frist. Sæt flueben når en handling er udført."));

    if (action.handlinger.length === 0) {
      modal.appendChild(el("p", { class: "muted" }, readOnly
        ? "Ingen handlinger." : "Ingen handlinger endnu. Tilføj den første nedenfor."));
    } else {
      modal.appendChild(el("div", { class: "handling-list" }, action.handlinger.map((h, i) =>
        el("div", { class: "handling-row" + (h.done ? " is-done" : "") }, [
          el("label", { class: "handling-check", title: h.done ? "Udført" : "Ikke udført" }, [
            el("input", { type: "checkbox", checked: !!h.done, disabled: readOnly,
              onchange: (e) => { h.done = e.target.checked; touched(); paint(); } })
          ]),
          el("div", { class: "handling-fields" }, [
            el("input", { type: "text", class: "handling-text", placeholder: "Handling", value: h.text || "", disabled: readOnly,
              onchange: (e) => { h.text = e.target.value; touched(); } }),
            el("div", { class: "handling-meta" }, [
              el("input", { type: "text", placeholder: "Ansvarlig", value: h.responsible || "", disabled: readOnly,
                onchange: (e) => { h.responsible = e.target.value; touched(); } }),
              el("input", { type: "date", value: h.deadline || "", disabled: readOnly,
                onchange: (e) => { h.deadline = e.target.value; touched(); } })
            ])
          ]),
          readOnly ? null : el("button", {
            class: "btn-icon", title: "Slet handling", html: iconHtml("trash", { size: 14 }),
            onclick: () => { action.handlinger.splice(i, 1); touched(); paint(); }
          })
        ])
      )));
    }

    modal.appendChild(el("div", { class: "modal-actions" }, [
      el("button", { class: "btn btn-secondary", onclick: close }, "Luk"),
      readOnly ? null : el("button", {
        class: "btn", html: iconHtml("plus") + "<span>Tilføj handling</span>",
        onclick: () => {
          action.handlinger.push({
            id: uid("handling"), createdAt: todayISO(),
            text: "", responsible: "", deadline: "", done: false
          });
          touched();
          paint();
        }
      })
    ]));
  }
}
