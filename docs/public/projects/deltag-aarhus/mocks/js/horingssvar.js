window.DeltagMock = window.DeltagMock || {};
var DM = window.DeltagMock;

/* ==========================================================================
   Rendering
   ========================================================================== */

function sortData(data, sortBy) {
  var sorted = data.slice();
  switch (sortBy) {
    case "likes":
      sorted.sort(function(a, b) { return b.likes - a.likes; });
      break;
    case "newest":
      sorted.sort(function(a, b) { return b.id - a.id; });
      break;
    case "oldest":
      sorted.sort(function(a, b) { return a.id - b.id; });
      break;
    case "comments":
      sorted.sort(function(a, b) { return b.comments - a.comments; });
      break;
  }
  return sorted;
}

function filterData(data, category) {
  if (category === "all") return data;
  return data.filter(function(item) { return item.category === category; });
}

DM.formatNumber = function(num) {
  return num.toLocaleString("da-DK");
};

function createCard(item, index) {
  var card = document.createElement("article");
  card.className = "horingssvar-card";
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", "Åbn høringssvar: " + item.title);
  card.dataset.index = index;

  var isOpen = DM.state.variant === "open";
  var likeClass = isOpen ? "horingssvar-card__like-btn" : "horingssvar-card__meta-item";
  var likeTag = isOpen ? "button" : "span";

  card.innerHTML =
    '<h3 class="horingssvar-card__title">' + item.title + '</h3>' +
    '<p class="horingssvar-card__description">' + item.description + '</p>' +
    '<div class="horingssvar-card__meta">' +
      '<span class="horingssvar-card__meta-item">' +
        '<i class="fa-regular fa-comment" aria-hidden="true"></i> ' +
        DM.formatNumber(item.comments) + ' kommentarer' +
      '</span>' +
      '<' + likeTag + ' class="' + likeClass + '" data-item-id="' + item.id + '">' +
        '<i class="fa-regular fa-thumbs-up" aria-hidden="true"></i> ' +
        '<span class="horingssvar-card__like-count">' + DM.formatNumber(item.likes) + '</span> synes om' +
      '</' + likeTag + '>' +
    '</div>';

  if (isOpen) {
    var likeBtn = card.querySelector(".horingssvar-card__like-btn");
    likeBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      item.likes++;
      likeBtn.querySelector(".horingssvar-card__like-count").textContent = DM.formatNumber(item.likes);
      likeBtn.classList.add("horingssvar-card__like-btn--liked");
      likeBtn.disabled = true;
    });
  }

  card.addEventListener("click", function() { DM.openModal(index); });
  card.addEventListener("keydown", function(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      DM.openModal(index);
    }
  });

  return card;
}

DM.renderGrid = function() {
  var state = DM.state;
  var grid = document.getElementById("horingssvar-grid");
  var countEl = document.getElementById("horingssvar-count");
  var paginationCount = document.getElementById("pagination-count");
  var showMoreBtn = document.getElementById("show-all-btn");

  state.filteredData = sortData(filterData(DM.horingssvarData, state.currentCategory), state.currentSort);

  grid.innerHTML = "";
  var shown = Math.min(state.visibleCount, state.filteredData.length);
  var displayData = state.filteredData.slice(0, shown);

  displayData.forEach(function(item, index) {
    grid.appendChild(createCard(item, index));
  });

  countEl.textContent = state.filteredData.length;
  paginationCount.textContent = "Viser 1 - " + shown + " af " + state.filteredData.length;

  if (shown >= state.filteredData.length) {
    showMoreBtn.style.display = "none";
  } else {
    showMoreBtn.textContent = "Vis flere";
    showMoreBtn.style.display = "";
  }
};
