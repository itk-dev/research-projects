import { el, clear, formatDateTime, trapFocus } from "../util.js";
import { iconHtml } from "../icons.js";
import { uid } from "../store.js";
import { auth } from "../auth.js";

// Modal for an indsats' evaluation: a textarea for a new status entry plus the
// trail of previous evaluations (newest first). Each entry is stamped with the
// current user and time, mirroring the log timeline.
//
// onSave(entry, action) is called after a new entry is added so the caller can
// persist and log. The modal mutates action.evaluationTrail / action.evaluation.
// readOnly hides the "add" controls (e.g. for a resolved indsats) — the history
// can still be viewed.
export function openEvaluationModal(action, { onSave, readOnly = false } = {}) {
  action.evaluationTrail = action.evaluationTrail || [];
  // Migrate a legacy single evaluation string into the trail once.
  if (action.evaluation && action.evaluationTrail.length === 0) {
    action.evaluationTrail.push({
      id: uid("eval"), at: action.createdAt || new Date().toISOString(),
      userId: "", userName: "—", text: action.evaluation
    });
  }

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

  paint();
  // Trap focus inside the dialog and restore it to the trigger on close. Set up
  // after the first paint so there is focusable content to land on.
  const releaseFocus = trapFocus(modal, close);

  function paint() {
    clear(modal);
    modal.appendChild(el("div", { class: "row between" }, [
      el("h3", {}, "Evaluering / status"),
      el("button", { class: "btn-icon", onclick: close, title: "Luk", html: iconHtml("close", { size: 16 }) })
    ]));
    modal.appendChild(el("p", { class: "muted" }, readOnly
      ? "Indsatsen er løst. Genåbn den for at tilføje en ny evaluering. Historikken kan ses nedenfor."
      : "Tilføj en ny status. Tidligere evalueringer bevares som en historik, så I kan følge udviklingen over tid."));

    if (readOnly) {
      modal.appendChild(el("div", { class: "modal-actions" }, [
        el("button", { class: "btn btn-secondary", onclick: close }, "Luk")
      ]));
    } else {
      const ta = el("textarea", { rows: 4, placeholder: "Skriv en ny evaluering eller status…" });
      modal.appendChild(el("label", { class: "field" }, ["Ny evaluering", ta]));

      modal.appendChild(el("div", { class: "modal-actions" }, [
        el("button", { class: "btn btn-secondary", onclick: close }, "Luk"),
        el("button", {
          class: "btn", html: iconHtml("plus") + "<span>Tilføj evaluering</span>",
          onclick: () => {
            const text = ta.value.trim();
            if (!text) return;
            const user = auth.currentUser();
            const entry = {
              id: uid("eval"),
              at: new Date().toISOString(),
              userId: user?.id || "",
              userName: user?.name || "Ukendt",
              text
            };
            action.evaluationTrail.unshift(entry);
            action.evaluation = text;
            onSave && onSave(entry, action);
            paint();
          }
        })
      ]));
    }

    // Trail
    modal.appendChild(el("h4", { class: "modal-subhead" },
      `Tidligere evalueringer (${action.evaluationTrail.length})`));
    if (action.evaluationTrail.length === 0) {
      modal.appendChild(el("p", { class: "muted" }, "Ingen evalueringer endnu."));
    } else {
      modal.appendChild(el("div", { class: "eval-trail" }, action.evaluationTrail.map(entry =>
        el("div", { class: "eval-trail-item" }, [
          el("p", { class: "eval-trail-text" }, entry.text),
          el("span", { class: "eval-trail-meta" }, `${formatDateTime(entry.at)} · ${entry.userName || "Ukendt"}`)
        ])
      )));
    }
  }
}
