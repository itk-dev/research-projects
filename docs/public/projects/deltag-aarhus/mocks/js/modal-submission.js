window.DeltagMock = window.DeltagMock || {};
var DM = window.DeltagMock;

/* ==========================================================================
   Høringssvar Submission Modal
   ========================================================================== */

DM.initSubmissionModal = function() {
  var controller = DM.createModalController("submission-modal-overlay", "submission-modal-close");
  var form = document.getElementById("submission-form");
  var modalBody = form.parentElement;

  DM.openSubmissionModal = controller.open;

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    /* Show success state inside the modal instead of alert */
    modalBody.innerHTML =
      '<div class="submission-success">' +
        '<i class="fa-solid fa-circle-check submission-success__icon" aria-hidden="true"></i>' +
        '<h3 class="submission-success__title">Tak for dit høringssvar!</h3>' +
        '<p class="submission-success__text">Dit høringssvar er modtaget og vil indgå i den politiske behandling af Lokalplan nr. 1237. Du modtager en bekræftelse på e-mail.</p>' +
        '<p class="submission-success__text" style="font-style: italic; color: var(--gray-400);">Dette er en mock — intet høringssvar er reelt indsendt.</p>' +
      '</div>';

    /* Auto-close after a few seconds */
    setTimeout(function() {
      controller.close();
      /* Restore form for next use (page will reload on variant switch anyway) */
    }, 3000);
  });
};
