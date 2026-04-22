window.DeltagMock = window.DeltagMock || {};
var DM = window.DeltagMock;

/* ==========================================================================
   Material Document Modal
   ========================================================================== */

DM.initMaterialModal = function() {
  var controller = DM.createModalController("material-modal-overlay", "material-modal-close");
  var trigger = document.getElementById("material-lokalplan");

  trigger.addEventListener("click", function(e) {
    e.preventDefault();
    controller.open();
  });
};
