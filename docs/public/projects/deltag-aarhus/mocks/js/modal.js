window.DeltagMock = window.DeltagMock || {};
var DM = window.DeltagMock;

/* ==========================================================================
   Modal Utilities
   ========================================================================== */

/**
 * Creates a reusable modal controller for any overlay/close-button pair.
 * Returns { open, close } functions.
 */
DM.createModalController = function(overlayId, closeButtonId) {
  var overlayEl = document.getElementById(overlayId);
  var closeBtn = document.getElementById(closeButtonId);

  function open() {
    overlayEl.hidden = false;
    overlayEl.classList.add("modal-overlay--open");
    document.body.classList.add("modal-open");
    closeBtn.focus();
  }

  function close() {
    overlayEl.hidden = true;
    overlayEl.classList.remove("modal-overlay--open");
    document.body.classList.remove("modal-open");
  }

  // Wire close button
  closeBtn.addEventListener("click", close);

  // Click outside to close
  overlayEl.addEventListener("click", function(e) {
    if (e.target === overlayEl) close();
  });

  return { open: open, close: close, overlay: overlayEl };
};

/* ==========================================================================
   Horingssvar Modal
   ========================================================================== */

var previousFocus = null;

DM.openModal = function(index) {
  var state = DM.state;
  state.currentModalIndex = index;
  state.commentsVisible = state.COMMENTS_PER_PAGE;
  previousFocus = document.activeElement;

  DM.updateModalContent();

  var overlay = document.getElementById("modal-overlay");
  overlay.hidden = false;
  overlay.classList.add("modal-overlay--open");
  document.body.classList.add("modal-open");

  // Update URL hash
  window.history.replaceState(null, "", "#svar-" + state.filteredData[index].id);

  // Focus the close button
  overlay.querySelector(".modal__close").focus();
};

DM.closeModal = function() {
  var state = DM.state;
  var overlay = document.getElementById("modal-overlay");

  overlay.hidden = true;
  overlay.classList.remove("modal-overlay--open");
  document.body.classList.remove("modal-open");
  state.currentModalIndex = -1;
  window.history.replaceState(null, "", window.location.pathname);

  if (previousFocus) {
    previousFocus.focus();
  }
};

/* ==========================================================================
   Focus Trap
   ========================================================================== */

DM.initFocusTrap = function() {
  var overlay = document.getElementById("modal-overlay");

  overlay.addEventListener("keydown", function(e) {
    if (e.key !== "Tab") return;

    var focusable = overlay.querySelectorAll(
      'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
    );
    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
};
