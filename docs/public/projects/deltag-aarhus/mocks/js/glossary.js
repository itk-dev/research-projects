window.DeltagMock = window.DeltagMock || {};
var DM = window.DeltagMock;

/* ==========================================================================
   Glossary Tooltips
   ========================================================================== */

DM.initGlossary = function() {
  document.querySelectorAll(".glossary-term__icon").forEach(function(btn) {
    btn.addEventListener("click", function(e) {
      e.stopPropagation();
      var term = btn.closest(".glossary-term");
      var wasOpen = term.classList.contains("glossary-term--open");

      // Close all open tooltips
      document.querySelectorAll(".glossary-term--open").forEach(function(t) {
        t.classList.remove("glossary-term--open");
      });

      if (!wasOpen) {
        term.classList.add("glossary-term--open");
      }
    });
  });

  // Close tooltips on outside click
  document.addEventListener("click", function() {
    document.querySelectorAll(".glossary-term--open").forEach(function(t) {
      t.classList.remove("glossary-term--open");
    });
  });
};
