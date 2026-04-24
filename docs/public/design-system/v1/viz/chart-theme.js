/* ITK Dev Design System — Chart.js theme (v1)
   Include AFTER Chart.js on the page. Sets global defaults so every
   Chart.js chart inherits the ITK palette, font, and muted gridlines.
   Usage:
     <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7"></script>
     <script src="/research-projects/design-system/v1/viz/chart-theme.js"></script>
*/
(function () {
  if (typeof Chart === "undefined") {
    console.warn("[ds-chart-theme] Chart.js not loaded yet");
    return;
  }

  // Palette rotation — teal primary, pink/coral accents signal aarhus relation,
  // then supporting hues for high-cardinality data.
  var palette = [
    "#007ba6", // teal-500 (primary)
    "#ee0043", // pink-500 (accent)
    "#ff5f31", // coral-500
    "#00b5c9", // cyan-400
    "#008d3d", // green-500
    "#73bc99", // sage-500
    "#89bd23", // lime-500
    "#00698e", // teal-600
  ];

  Chart.defaults.font.family =
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  Chart.defaults.font.size = 13;
  Chart.defaults.color = "#495057";            // gray-700
  Chart.defaults.borderColor = "#e9ecef";      // gray-200

  Chart.defaults.elements.bar.borderRadius = 4;
  Chart.defaults.elements.line.tension = 0.3;
  Chart.defaults.elements.point.radius = 3;
  Chart.defaults.elements.point.hoverRadius = 5;

  Chart.defaults.plugins.legend.labels.boxWidth = 12;
  Chart.defaults.plugins.legend.labels.boxHeight = 12;
  Chart.defaults.plugins.legend.labels.padding = 16;

  Chart.defaults.plugins.tooltip.backgroundColor = "rgba(32,36,35,0.95)"; // text-primary
  Chart.defaults.plugins.tooltip.titleFont = { weight: "600" };
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.cornerRadius = 6;

  // Auto-apply palette when datasets don't specify colors.
  var originalInit = Chart.prototype.update;
  Chart.register({
    id: "ds-palette",
    beforeUpdate: function (chart) {
      chart.data.datasets.forEach(function (ds, i) {
        var color = palette[i % palette.length];
        if (ds.backgroundColor == null) {
          if (chart.config.type === "line") {
            ds.backgroundColor = hexToRgba(color, 0.15);
            ds.borderColor = color;
            ds.pointBackgroundColor = color;
          } else if (chart.config.type === "pie" || chart.config.type === "doughnut") {
            // Spread palette across data points for categorical charts.
            ds.backgroundColor = ds.data.map(function (_, j) {
              return palette[j % palette.length];
            });
          } else {
            ds.backgroundColor = color;
            ds.borderColor = color;
          }
        }
      });
    },
  });

  function hexToRgba(hex, alpha) {
    var h = hex.replace("#", "");
    var r = parseInt(h.substring(0, 2), 16);
    var g = parseInt(h.substring(2, 4), 16);
    var b = parseInt(h.substring(4, 6), 16);
    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
  }

  // Expose palette for manual use.
  window.dsChartPalette = palette;
})();
