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

  // Mock video player — reveal a "this is a mock" note under the poster.
  // The poster stays in place; clicking play does not close the tooltip.
  document.querySelectorAll(".glossary-video").forEach(function(player) {
    player.addEventListener("click", function(e) {
      e.stopPropagation();
      var term = player.closest(".glossary-term");
      term.classList.add("glossary-term--video-played");
    });
  });

  // Close (X) button inside a tooltip
  document.querySelectorAll(".glossary-term__close").forEach(function(btn) {
    btn.addEventListener("click", function(e) {
      e.stopPropagation();
      var term = btn.closest(".glossary-term");
      term.classList.remove("glossary-term--open");
      term.classList.remove("glossary-term--video-played");
    });
  });

  // Close tooltips on outside click
  document.addEventListener("click", function() {
    document.querySelectorAll(".glossary-term--open").forEach(function(t) {
      t.classList.remove("glossary-term--open");
      t.classList.remove("glossary-term--video-played");
    });
  });
};
