/* ITK Dev Design System — Leaflet overlay helpers (v1)
   Requires Leaflet (and leaflet.heat for heatmaps, leaflet.markercluster
   for clusters) to be loaded first.

   API:
     dsMakePin(lat, lng, { color, label, popup })
     dsHeatmap(points, { radius, blur, gradient })
     dsCluster(points, { popup })

   All return Leaflet layers — call .addTo(map) to render.
*/
(function () {
  if (typeof L === "undefined") {
    console.warn("[ds-leaflet-overlays] Leaflet not loaded yet");
    return;
  }

  function dsMakePin(lat, lng, opts) {
    opts = opts || {};
    var variant = opts.color ? " ds-pin-" + opts.color : "";
    var label = opts.label ? '<span class="ds-pin-label">' + opts.label + "</span>" : "";
    var html =
      '<div class="ds-pin' + variant + '">' +
      '<div class="ds-pin-bubble"></div>' +
      label +
      "</div>";

    var icon = L.divIcon({
      html: html,
      className: "",            // suppress Leaflet's default icon styles
      iconSize: [28, 36],
      iconAnchor: [14, 36],     // point at the tip
      popupAnchor: [0, -32],
    });

    var marker = L.marker([lat, lng], { icon: icon });
    if (opts.popup) marker.bindPopup(opts.popup);
    return marker;
  }

  // ITK teal → aarhus pink gradient (signals brand + relation in one stroke)
  var defaultHeatGradient = {
    0.2: "#007ba6",
    0.4: "#00b5c9",
    0.6: "#ff5f31",
    0.8: "#ee0043",
    1.0: "#b80134",
  };

  function dsHeatmap(points, opts) {
    if (typeof L.heatLayer !== "function") {
      console.warn("[ds-leaflet-overlays] leaflet.heat plugin not loaded");
      return null;
    }
    opts = opts || {};
    return L.heatLayer(points, {
      radius: opts.radius != null ? opts.radius : 25,
      blur: opts.blur != null ? opts.blur : 18,
      maxZoom: opts.maxZoom != null ? opts.maxZoom : 17,
      gradient: opts.gradient || defaultHeatGradient,
    });
  }

  function dsCluster(points, opts) {
    if (typeof L.markerClusterGroup !== "function") {
      console.warn("[ds-leaflet-overlays] leaflet.markercluster plugin not loaded");
      return null;
    }
    opts = opts || {};
    var group = L.markerClusterGroup();
    points.forEach(function (p) {
      var m = dsMakePin(p.lat, p.lng, {
        color: p.color,
        label: p.label,
        popup: p.popup,
      });
      group.addLayer(m);
    });
    return group;
  }

  window.dsMakePin = dsMakePin;
  window.dsHeatmap = dsHeatmap;
  window.dsCluster = dsCluster;
})();
