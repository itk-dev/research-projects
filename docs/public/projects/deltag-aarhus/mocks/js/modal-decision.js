window.DeltagMock = window.DeltagMock || {};
var DM = window.DeltagMock;

/* ==========================================================================
   Decision Modal
   ========================================================================== */

DM.initDecisionModal = function() {
  var controller = DM.createModalController("decision-modal-overlay", "decision-modal-close");
  var openBtn = document.getElementById("open-decision-modal");

  openBtn.addEventListener("click", function(e) {
    e.preventDefault();
    controller.open();
  });
};
