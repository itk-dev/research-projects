<small>**Project:** ITK Dev Design System</small>

# Data viz

For interactive charts, graphs, and maps inside prototype HTML files.
The design system ships thin theme/helper layers on top of established
libraries — Chart.js for charts, Leaflet for maps, pure SVG for
sparklines. No npm dependencies added; libraries are CDN-loaded.

<a href="/research-projects/design-system/v1/playground.html#charts" class="mock-button" target="_blank">See live examples in playground ↗</a>

## Charts — Chart.js

`chart-theme.js` sets Chart.js global defaults to the ITK palette
(teal → pink → coral → cyan → green → sage → lime → teal-dark). Datasets
with no `backgroundColor` pick up a color automatically in that order.

```html
<link rel="stylesheet" href="/research-projects/design-system/v1/index.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7"></script>
<script src="/research-projects/design-system/v1/viz/chart-theme.js"></script>

<div class="ds">
  <canvas id="revenue" height="180"></canvas>
</div>

<script>
new Chart(document.getElementById("revenue"), {
  type: "bar",
  data: {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [{ label: "Revenue (kr)", data: [120, 190, 80, 150] }],
  },
});
</script>
```

Supported out of the box: bar, line, doughnut, pie, radar, polarArea,
bubble, scatter. For pie and doughnut charts, the palette is spread
across individual data points.

## Maps — Leaflet

`leaflet-theme.css` themes controls, popups, and attribution.
`leaflet-overlays.js` provides three helpers.

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<link rel="stylesheet" href="/research-projects/design-system/v1/index.css">
<link rel="stylesheet" href="/research-projects/design-system/v1/viz/leaflet-theme.css">
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js"></script>
<script src="/research-projects/design-system/v1/viz/leaflet-overlays.js"></script>

<div class="ds">
  <div id="map" style="height: 420px; border-radius: 10px;"></div>
</div>

<script>
const map = L.map("map").setView([56.1572, 10.2107], 13); // Aarhus centre
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap",
}).addTo(map);

// Themed teardrop pin
dsMakePin(56.1572, 10.2107, {
  label: "1",
  popup: "<h4>Rådhuset</h4>Aarhus City Hall",
}).addTo(map);

// Pink accent pin (signals aarhus relation)
dsMakePin(56.1539, 10.2006, {
  color: "accent",
  popup: "<h4>Aros</h4>Kunstmuseum",
}).addTo(map);

// Heatmap overlay
dsHeatmap([
  [56.1572, 10.2107, 0.8],
  [56.1540, 10.2080, 0.6],
  [56.1600, 10.2150, 0.9],
]).addTo(map);
</script>
```

### Pin colors

Pass `color` to `dsMakePin()`:

| Value | Resulting color |
|---|---|
| (none) | primary (teal) |
| `"accent"` | pink |
| `"success"` | green |
| `"warning"` | yellow |
| `"danger"` | red |

### Heatmap gradient

Default gradient runs teal → cyan → coral → pink — ITK brand crossed with
the aarhus.dk accent. Override with a `gradient` option if your data
tells a different story:

```js
dsHeatmap(points, {
  gradient: { 0.3: "#89bd23", 0.6: "#f5b800", 1.0: "#e44930" },
});
```

### Clustering

Load `leaflet.markercluster` and use `dsCluster()`:

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css">
<script src="https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"></script>
```

```js
const group = dsCluster([
  { lat: 56.1572, lng: 10.2107, popup: "Rådhuset" },
  { lat: 56.1539, lng: 10.2006, color: "accent", popup: "Aros" },
  // ...many more
]);
group.addTo(map);
```

## Sparklines — pure SVG

For inline micro-charts in table cells or next to stats. No library.

```html
<svg class="sparkline" viewBox="0 0 80 24" preserveAspectRatio="none">
  <path class="sparkline-area" d="M0,18 L10,14 L20,16 L30,8 L40,10 L50,4 L60,6 L70,2 L80,3 L80,24 L0,24 Z"/>
  <path d="M0,18 L10,14 L20,16 L30,8 L40,10 L50,4 L60,6 L70,2 L80,3"/>
</svg>
```

Size via the container (default 80×24). Tint by setting `color` on the
parent — `color: var(--ds-color-accent)` turns it pink.

## Why these libraries

- **Chart.js** is already used in the `opkraevningsoverblik` mock (same
  version, 4.4.7). Familiar, zero-config, ~80KB gzipped.
- **Leaflet** is already used in the `deltag-aarhus` mock. Open source,
  works with OpenStreetMap tiles, well-supported plugin ecosystem
  (heatmap, clustering, routing).
- **Sparklines as SVG** — no dependency justifies itself when 10 lines
  of inline markup achieves the same outcome.

## The aarhus.dk connection

Palettes and overlays deliberately echo aarhus.dk's visual language
(pink accent, pastel surfaces in dashboards, teal → pink heatmap
gradient) without copying the site. Prototypes using the design system
should read as "from the same family" at a glance.
