window.DeltagMock = window.DeltagMock || {};
var DM = window.DeltagMock;

/* ==========================================================================
   Per-mock config

   Defaults describe the Vosnæs vindmølle-mock so /mocks/index.html keeps
   working without any extra setup. A sibling mock (e.g. /mocks/uniparken/)
   sets window.DeltagMock.config before this file loads to override fields.
   ========================================================================== */

var defaults = {
  planNumber: "1237",
  hearingTitle: "Vindmøller ved Vosnæs",
  deadlines: {
    open: "14. oktober 2025",
    closed: "14. august 2025"
  },
  map: {
    center: [56.18, 10.15],
    zoom: 12,
    clusters: [
      { lat: 56.209, lng: 10.148, count: 45, label: "Skødstrup" },
      { lat: 56.192, lng: 10.175, count: 32, label: "Løgten" },
      { lat: 56.155, lng: 10.210, count: 28, label: "Aarhus C" },
      { lat: 56.178, lng: 10.120, count: 22, label: "Lystrup" },
      { lat: 56.168, lng: 10.195, count: 18, label: "Risskov" },
      { lat: 56.218, lng: 10.105, count: 15, label: "Hjortshøj" },
      { lat: 56.148, lng: 10.125, count: 12, label: "Brabrand" },
      { lat: 56.195, lng: 10.095, count: 10, label: "Trige" },
      { lat: 56.162, lng: 10.165, count: 8, label: "Vejlby" },
      { lat: 56.140, lng: 10.165, count: 6, label: "Viby" },
      { lat: 56.175, lng: 10.080, count: 4, label: "Sabro" }
    ]
  },
  dataset: "vosnaes"
};

var override = DM.config || {};
DM.config = {
  planNumber: override.planNumber || defaults.planNumber,
  hearingTitle: override.hearingTitle || defaults.hearingTitle,
  deadlines: {
    open: (override.deadlines && override.deadlines.open) || defaults.deadlines.open,
    closed: (override.deadlines && override.deadlines.closed) || defaults.deadlines.closed
  },
  map: {
    center: (override.map && override.map.center) || defaults.map.center,
    zoom: (override.map && override.map.zoom) || defaults.map.zoom,
    clusters: (override.map && override.map.clusters) || defaults.map.clusters
  },
  dataset: override.dataset || defaults.dataset
};
