window.DeltagMock = window.DeltagMock || {};
var DM = window.DeltagMock;

/* ==========================================================================
   Variant Switching (open / closed)
   ========================================================================== */

DM.initVariant = function() {
  var state = DM.state;
  var isOpen = state.variant === "open";

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
    deadlineValue.textContent = isOpen ? "14. oktober 2025" : "14. august 2025";
  }

  var bodyDeadline = document.getElementById("body-deadline");
  if (bodyDeadline) {
    bodyDeadline.textContent = isOpen ? "14. oktober 2025" : "14. august 2025";
  }

  var bodyDeleteDate = document.getElementById("body-delete-date");
  if (bodyDeleteDate) {
    bodyDeleteDate.textContent = isOpen ? "14. oktober 2025" : "14. august 2025";
  }

  /* Submit button — disabled when closed, active when open */
  var submitBtn = document.getElementById("submit-horingssvar-btn");
  if (submitBtn) {
    if (isOpen) {
      submitBtn.disabled = false;
      submitBtn.addEventListener("click", function(e) {
        e.preventDefault();
        if (DM.openMitIDModal) DM.openMitIDModal();
      });
    } else {
      submitBtn.disabled = true;
    }
  }

  /* Highlight active variant link in mock banner */
  var variantLinks = document.querySelectorAll(".mock-banner__link--variant");
  variantLinks.forEach(function(link) {
    if (link.dataset.variant === state.variant) {
      link.classList.add("mock-banner__link--active");
    }
  });
};
