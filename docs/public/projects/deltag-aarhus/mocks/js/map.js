window.DeltagMock = window.DeltagMock || {};
var DM = window.DeltagMock;

/* ==========================================================================
   Map
   ========================================================================== */

DM.initMap = function() {
  var mapConfig = DM.config.map;
  var map = L.map("map", { scrollWheelZoom: false }).setView(mapConfig.center, mapConfig.zoom);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
  }).addTo(map);

  var responseLocations = mapConfig.clusters;
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
