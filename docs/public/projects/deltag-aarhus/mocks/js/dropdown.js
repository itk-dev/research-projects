window.DeltagMock = window.DeltagMock || {};
var DM = window.DeltagMock;

/* ==========================================================================
   Dropdowns
   ========================================================================== */

DM.initDropdowns = function() {
  document.querySelectorAll(".dropdown").forEach(function(dropdown) {
    var button = dropdown.querySelector(".dropdown__button");
    var menu = dropdown.querySelector(".dropdown__menu");
    var items = dropdown.querySelectorAll(".dropdown__item");
    var buttonText = dropdown.querySelector(".dropdown__button-text");

    button.addEventListener("click", function(e) {
      e.stopPropagation();
      // Close other dropdowns
      document.querySelectorAll(".dropdown__menu--open").forEach(function(m) {
        if (m !== menu) m.classList.remove("dropdown__menu--open");
      });
      document.querySelectorAll('.dropdown__button[aria-expanded="true"]').forEach(function(b) {
        if (b !== button) b.setAttribute("aria-expanded", "false");
      });

      var isOpen = menu.classList.toggle("dropdown__menu--open");
      button.setAttribute("aria-expanded", isOpen);
    });

    items.forEach(function(item) {
      item.addEventListener("click", function() {
        var value = item.dataset.value;
        buttonText.textContent = item.textContent;

        items.forEach(function(i) {
          i.classList.remove("dropdown__item--active");
          i.setAttribute("aria-selected", "false");
        });
        item.classList.add("dropdown__item--active");
        item.setAttribute("aria-selected", "true");

        menu.classList.remove("dropdown__menu--open");
        button.setAttribute("aria-expanded", "false");

        if (dropdown.dataset.dropdown === "sort") {
          DM.state.currentSort = value;
        } else if (dropdown.dataset.dropdown === "category") {
          DM.state.currentCategory = value;
        }

        DM.state.visibleCount = DM.state.ITEMS_PER_PAGE;
        DM.renderGrid();
      });
    });
  });
};
