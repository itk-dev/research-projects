window.DeltagMock = window.DeltagMock || {};
var DM = window.DeltagMock;

/* ==========================================================================
   Variant Switching (open / closed)
   ========================================================================== */

DM.initVariant = function() {
  var state = DM.state;
  var isOpen = state.variant === "open";
  var deadline = isOpen ? DM.config.deadlines.open : DM.config.deadlines.closed;

  /* Body class drives CSS-only visibility rules in variant.css */
  document.body.classList.add(isOpen ? "variant--open" : "variant--closed");

  /* Decision banner — hidden when hearing is still open */
  var decisionBanner = document.querySelector(".decision-banner");
  if (decisionBanner) {
    decisionBanner.style.display = isOpen ? "none" : "";
  }

  /* Status value */
  var statusBadge = document.getElementById("hearing-status-badge");
  if (statusBadge) {
    statusBadge.textContent = isOpen ? "Åben" : "Afsluttet";
  }

  /* Deadline display — show future date when open */
  var deadlineValue = document.getElementById("hearing-deadline-value");
  if (deadlineValue) {
    deadlineValue.textContent = deadline;
  }

  var bodyDeadline = document.getElementById("body-deadline");
  if (bodyDeadline) {
    bodyDeadline.textContent = deadline;
  }

  var bodyDeleteDate = document.getElementById("body-delete-date");
  if (bodyDeleteDate) {
    bodyDeleteDate.textContent = deadline;
  }

  /* Submit triggers — disabled when closed, active when open.
     Several buttons share the .js-submit-horingssvar class (header outline,
     above-list primary, below-list primary). The header outline button is
     hidden via CSS on the closed variant. */
  var submitBtns = document.querySelectorAll(".js-submit-horingssvar");
  submitBtns.forEach(function(btn) {
    if (isOpen) {
      btn.disabled = false;
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        if (DM.openMitIDModal) DM.openMitIDModal();
      });
    } else {
      btn.disabled = true;
    }
  });

  /* Highlight active variant link in mock banner */
  var variantLinks = document.querySelectorAll(".mock-banner__link--variant");
  variantLinks.forEach(function(link) {
    if (link.dataset.variant === state.variant) {
      link.classList.add("mock-banner__link--active");
    }
  });
};
