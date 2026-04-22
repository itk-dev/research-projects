/* Shared application state. All modules read/write through DM.state to keep mutations traceable. */
window.DeltagMock = window.DeltagMock || {};

window.DeltagMock.state = {
  variant: new URLSearchParams(window.location.search).get("variant") === "closed" ? "closed" : "open",
  currentSort: "comments",
  currentCategory: "all",
  visibleCount: 16,
  currentModalIndex: -1,
  filteredData: window.DeltagMock.horingssvarData.slice(),
  ITEMS_PER_PAGE: 16,
  COMMENTS_PER_PAGE: 5,
  commentsVisible: 5
};
