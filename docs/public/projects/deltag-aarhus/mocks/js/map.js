window.DeltagMock = window.DeltagMock || {};
var DM = window.DeltagMock;

/* ==========================================================================
   Map
   ========================================================================== */

DM.initMap = function() {
  var map = L.map("map", { scrollWheelZoom: false }).setView([56.18, 10.15], 12);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
  }).addTo(map);

  /* Hearing response locations on land around Skødstrup, Løgten and Aarhus.
     All points placed well inland to avoid the bay. */
  var responseLocations = [
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
    { lat: 56.175, lng: 10.080, count: 4, label: "Sabro" },
  ];

  var maxCount = Math.max.apply(null, responseLocations.map(function(l) { return l.count; }));

  responseLocations.forEach(function(loc) {
    var ratio = loc.count / maxCount;
    var radius = 20 + ratio * 60;
    var opacity = 0.25 + ratio * 0.4;

    L.circleMarker([loc.lat, loc.lng], {
      radius: radius,
      fillColor: "#3661d8",
      color: "#3661d8",
      weight: 1,
      fillOpacity: opacity,
      opacity: 0.6,
    })
      .addTo(map)
      .bindPopup(
        "<strong>" + loc.label + "</strong><br>" + loc.count + " høringssvar"
      );
  });
};
