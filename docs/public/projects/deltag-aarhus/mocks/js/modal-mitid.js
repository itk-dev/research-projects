window.DeltagMock = window.DeltagMock || {};
var DM = window.DeltagMock;

/* ==========================================================================
   MitID Login Modal (mock)
   ========================================================================== */

DM.initMitIDModal = function() {
  var controller = DM.createModalController("mitid-modal-overlay", "mitid-modal-close");

  DM.openMitIDModal = controller.open;

  document.getElementById("mitid-approve-btn").addEventListener("click", function() {
    controller.close();
    /* Small delay so the close animation completes before opening the next modal */
    setTimeout(function() {
      if (DM.openSubmissionModal) DM.openSubmissionModal();
    }, 150);
  });
};
