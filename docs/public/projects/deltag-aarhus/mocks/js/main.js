window.DeltagMock = window.DeltagMock || {};
var DM = window.DeltagMock;

/* ==========================================================================
   Initialization
   ========================================================================== */

function init() {
  var state = DM.state;
  var overlay = document.getElementById("modal-overlay");

  DM.renderGrid();
  DM.initDropdowns();

  // Show More
  document.getElementById("show-all-btn").addEventListener("click", function() {
    state.visibleCount += state.ITEMS_PER_PAGE;
    DM.renderGrid();
  });

  // Modal close
  overlay.querySelector(".modal__close").addEventListener("click", DM.closeModal);

  overlay.addEventListener("click", function(e) {
    if (e.target === overlay) DM.closeModal();
  });

  // Modal navigation
  document.getElementById("modal-prev").addEventListener("click", function() { DM.navigateModal(-1); });
  document.getElementById("modal-next").addEventListener("click", function() { DM.navigateModal(1); });

  // Keyboard
  document.addEventListener("keydown", function(e) {
    if (state.currentModalIndex === -1) return;

    switch (e.key) {
      case "Escape":
        DM.closeModal();
        break;
      case "ArrowLeft":
        DM.navigateModal(-1);
        break;
      case "ArrowRight":
        DM.navigateModal(1);
        break;
    }
  });

  // Focus trap in modal
  DM.initFocusTrap();

  // Close dropdowns on outside click
  document.addEventListener("click", function() {
    document.querySelectorAll(".dropdown__menu--open").forEach(function(m) {
      m.classList.remove("dropdown__menu--open");
    });
    document.querySelectorAll('.dropdown__button[aria-expanded="true"]').forEach(function(b) {
      b.setAttribute("aria-expanded", "false");
    });
  });

  // Deep-link: open modal from URL hash
  var hash = window.location.hash;
  if (hash.indexOf("#svar-") === 0) {
    var id = parseInt(hash.replace("#svar-", ""), 10);
    var index = state.filteredData.findIndex(function(item) { return item.id === id; });
    if (index !== -1) {
      DM.openModal(index);
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  init();
  DM.initMap();
  DM.initMaterialModal();
  DM.initDecisionModal();
  DM.initGlossary();
  DM.initCompactNav();
  DM.initVariant();
  DM.initMitIDModal();
  DM.initSubmissionModal();
});
