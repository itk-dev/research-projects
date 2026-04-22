window.DeltagMock = window.DeltagMock || {};
var DM = window.DeltagMock;

/* ==========================================================================
   Horingssvar Modal Content
   ========================================================================== */

DM.updateModalContent = function() {
  var state = DM.state;
  var item = state.filteredData[state.currentModalIndex];
  if (!item) return;

  document.getElementById("modal-title").textContent = item.title;
  document.getElementById("modal-author").textContent = item.author;
  document.getElementById("modal-date").textContent = item.date;
  document.getElementById("modal-comments-count").textContent = DM.formatNumber(item.comments) + " kommentarer";

  var likesEl = document.getElementById("modal-likes-count");
  likesEl.textContent = DM.formatNumber(item.likes) + " synes om";

  /* Make the likes stat clickable in the open variant */
  var likeStat = likesEl.parentElement;
  if (state.variant === "open") {
    likeStat.classList.add("modal__stat--interactive");
    likeStat.setAttribute("role", "button");
    likeStat.setAttribute("tabindex", "0");
    likeStat.style.cursor = "pointer";

    var likeHandler = function(e) {
      e.preventDefault();
      item.likes++;
      likesEl.textContent = DM.formatNumber(item.likes) + " synes om";
      likeStat.classList.add("modal__stat--liked");
      likeStat.removeEventListener("click", likeHandler);
      likeStat.removeEventListener("keydown", likeKeyHandler);
      likeStat.style.cursor = "default";
      likeStat.removeAttribute("role");
      likeStat.removeAttribute("tabindex");
    };
    var likeKeyHandler = function(e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); likeHandler(e); }
    };

    likeStat.addEventListener("click", likeHandler);
    likeStat.addEventListener("keydown", likeKeyHandler);
  }

  var descEl = document.getElementById("modal-description");
  descEl.innerHTML = item.fullDescription
    .split("\n\n")
    .map(function(p) { return "<p>" + p + "</p>"; })
    .join("");

  // Comments
  var commentsSection = document.getElementById("modal-comments");
  var commentsTitle = commentsSection.querySelector(".modal__comments-title");
  commentsSection.innerHTML = "";
  commentsSection.appendChild(commentsTitle);

  if (item.commentsList && item.commentsList.length > 0) {
    var visibleComments = item.commentsList.slice(0, state.commentsVisible);
    visibleComments.forEach(function(comment) {
      var commentEl = document.createElement("div");
      commentEl.className = "modal__comment";
      commentEl.innerHTML =
        '<span class="modal__comment-author">' + comment.author + '</span>' +
        '<span class="modal__comment-date">' + comment.date + '</span>' +
        '<p class="modal__comment-text">' + comment.text + '</p>';
      commentsSection.appendChild(commentEl);
    });

    var remaining = item.commentsList.length - state.commentsVisible;
    if (remaining > 0) {
      var showMoreBtn = document.createElement("button");
      showMoreBtn.className = "modal__comments-show-more";
      showMoreBtn.textContent = "Vis flere kommentarer (" + remaining + " mere)";
      showMoreBtn.addEventListener("click", function() {
        /* Progressive disclosure: load next batch on click */
        state.commentsVisible += state.COMMENTS_PER_PAGE;
        DM.updateModalContent();
      });
      commentsSection.appendChild(showMoreBtn);
    }
  }

  /* Comment form — only shown in the open variant */
  if (state.variant === "open") {
    var commentForm = document.createElement("form");
    commentForm.className = "modal__comment-form";
    commentForm.innerHTML =
      '<label for="modal-comment-input" class="modal__comment-form-label">Skriv en kommentar</label>' +
      '<textarea id="modal-comment-input" class="modal__comment-input" placeholder="Skriv en kommentar..." required></textarea>' +
      '<button type="submit" class="btn-primary modal__comment-submit">Tilføj kommentar</button>';
    commentsSection.appendChild(commentForm);

    commentForm.addEventListener("submit", function(e) {
      e.preventDefault();
      var textarea = commentForm.querySelector("textarea");
      var text = textarea.value.trim();
      if (!text) return;

      item.commentsList.push({
        author: "Maria Jensen (dig)",
        date: "I dag",
        text: text
      });
      item.comments++;
      textarea.value = "";
      DM.updateModalContent();
    });
  }

  // Navigation
  var prevBtn = document.getElementById("modal-prev");
  var nextBtn = document.getElementById("modal-next");
  var counter = document.getElementById("modal-counter");

  prevBtn.disabled = state.currentModalIndex === 0;
  nextBtn.disabled = state.currentModalIndex === state.filteredData.length - 1;
  counter.textContent = (state.currentModalIndex + 1) + " af " + state.filteredData.length;
};

DM.navigateModal = function(direction) {
  var state = DM.state;
  var newIndex = state.currentModalIndex + direction;
  if (newIndex < 0 || newIndex >= state.filteredData.length) return;
  state.currentModalIndex = newIndex;
  /* Reset to first page when switching to a different item */
  state.commentsVisible = state.COMMENTS_PER_PAGE;
  DM.updateModalContent();
  window.history.replaceState(null, "", "#svar-" + state.filteredData[state.currentModalIndex].id);
};
