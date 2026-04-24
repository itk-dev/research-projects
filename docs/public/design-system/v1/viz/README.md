# Data viz helpers

Theme-aware wrappers for the three data-viz libraries prototypes
typically need. Everything is CDN-loaded in the prototype HTML; the
design system ships only thin theme/helper layers.

## Charts — Chart.js 4

```html
<link rel="stylesheet" href="/research-projects/design-system/v1/index.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7"></script>
<script src="/research-projects/design-system/v1/viz/chart-theme.js"></script>

<div class="ds">
  <canvas id="bar"></canvas>
</div>

<script>
new Chart(document.getElementById("bar"), {
  type: "bar",
  data: {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [{ label: "Revenue", data: [12, 19, 8, 15] }],
  },
});
</script>
```

`chart-theme.js` sets Chart.js global defaults (font, colors, gridlines,
tooltip) and auto-applies the ITK palette (teal → pink → coral → cyan →
green → sage → lime → teal-dark) in order when a dataset has no
`backgroundColor`. For pie/doughnut charts, the palette is spread across
data points.

## Maps — Leaflet 1.9

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<link rel="stylesheet" href="/research-projects/design-system/v1/index.css">
<link rel="stylesheet" href="/research-projects/design-system/v1/viz/leaflet-theme.css">
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js"></script>
<script src="/research-projects/design-system/v1/viz/leaflet-overlays.js"></script>

<div class="ds">
  <div id="map" style="height: 400px; border-radius: 10px;"></div>
</div>

<script>
const map = L.map("map").setView([56.1572, 10.2107], 13); // Aarhus center
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap",
}).addTo(map);

// Pin
dsMakePin(56.1572, 10.2107, { label: "1", popup: "<h4>City Hall</h4>" })
  .addTo(map);

// Accent-colored pin
dsMakePin(56.1510, 10.2040, { color: "accent", popup: "Aros" })
  .addTo(map);

// Heatmap
dsHeatmap([
  [56.1572, 10.2107, 0.8],
  [56.1540, 10.2080, 0.6],
  [56.1600, 10.2150, 0.9],
]).addTo(map);
</script>
```

The heatmap default gradient runs teal → cyan → coral → pink, which
telegraphs both the ITK brand and the aarhus.dk relation in a single
overlay.

## Sparklines — pure SVG

```html
<link rel="stylesheet" href="/research-projects/design-system/v1/index.css">

<div class="ds">
  <svg class="sparkline" viewBox="0 0 80 24" preserveAspectRatio="none">
    <path class="sparkline-area" d="M0,20 L10,16 L20,18 L30,10 L40,12 L50,6 L60,8 L70,4 L80,2 L80,24 L0,24 Z"/>
    <path d="M0,20 L10,16 L20,18 L30,10 L40,12 L50,6 L60,8 L70,4 L80,2"/>
  </svg>
</div>
```

`color: currentColor` — set the parent's `color` to tint the line (e.g.
`style="color: var(--ds-color-accent);"` for a pink sparkline).

## Files

- `chart-theme.js` — Chart.js global defaults + palette plugin
- `leaflet-theme.css` — themed Leaflet controls, popups, pins, clusters
- `leaflet-overlays.js` — `dsMakePin`, `dsHeatmap`, `dsCluster` helpers
