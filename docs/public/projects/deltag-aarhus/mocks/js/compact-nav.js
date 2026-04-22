window.DeltagMock = window.DeltagMock || {};
var DM = window.DeltagMock;

/* ==========================================================================
   Compact Nav on Scroll
   ========================================================================== */

DM.initCompactNav = function() {
  var nav = document.querySelector(".nav");
  /* Hysteresis: different thresholds for compact/expand prevent jitter during slow scrolling */
  var compactAt = 80;
  var expandAt = 30;

  window.addEventListener("scroll", function() {
    var y = window.scrollY;
    if (!nav.classList.contains("nav--compact") && y > compactAt) {
      nav.classList.add("nav--compact");
    } else if (nav.classList.contains("nav--compact") && y < expandAt) {
      nav.classList.remove("nav--compact");
    }
  }, { passive: true } /* passive: true improves scroll performance by signaling no preventDefault */);
};
