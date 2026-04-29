<small>**Project:** ITK Dev Design System</small>

# Components

All components render correctly inside a `.ds` container. See the live
gallery below for rendered examples — this page documents the API.

<a href="/research-projects/design-system/v1/playground.html" class="mock-button" target="_blank">Open live playground ↗</a>

## Buttons

```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn">Default</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-accent">Accent (aarhus pink)</button>
```

Sizes: add `btn-sm` or `btn-lg`.

Shape: add `btn-pill` for fully rounded corners. Combines with any variant.

```html
<button class="btn btn-primary btn-pill">Primary pill</button>
<button class="btn btn-accent btn-pill">Accent pill</button>
```

## Badges

```html
<span class="badge">Default</span>
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-danger">Danger</span>
<span class="badge badge-info">Info</span>
```

## Cards

```html
<div class="card">Default card</div>
<div class="card card-bordered">Stronger border</div>
<div class="card card-elevated">Shadow, no border</div>

<div class="card">
  <div class="card-header">Title</div>
  <p>Body</p>
  <div class="card-footer">
    <button class="btn btn-primary btn-sm">Action</button>
  </div>
</div>
```

## Form fields

```html
<div class="form-field">
  <label class="form-label" for="name">Name</label>
  <input class="input" id="name" type="text" placeholder="Jane Doe">
  <span class="form-help">Use your full name.</span>
</div>

<select class="select">...</select>
<textarea class="textarea"></textarea>
```

Error state: add `style="border-color: var(--ds-color-danger);"` to the
input, plus a `<span class="form-error">`.

## Tables

```html
<div class="table-wrap">
  <table class="table table-zebra table-hover">
    <thead><tr><th>Project</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td>Climate Nudging</td><td><span class="badge badge-success">Active</span></td></tr>
    </tbody>
  </table>
</div>
```

Modifiers: `table-zebra` alternates row backgrounds; `table-hover` adds
hover highlighting.

## Modal

```html
<div class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <h3 class="modal-title">Confirm action</h3>
      <button class="modal-close" aria-label="Close">×</button>
    </div>
    <div class="modal-body">Body content.</div>
    <div class="modal-footer">
      <button class="btn">Cancel</button>
      <button class="btn btn-primary">Confirm</button>
    </div>
  </div>
</div>
```

Toggle visibility from your own JS — the design system ships CSS only.

## Sidebar nav

```html
<nav class="sidebar">
  <div class="sidebar-section">Workspace</div>
  <a class="sidebar-item is-active" href="#">Dashboard</a>
  <a class="sidebar-item" href="#">Projects</a>
</nav>
```

## Stat / metric card

```html
<div class="stat">
  <div class="stat-label">Active users</div>
  <div class="stat-value">1.248</div>
  <div class="stat-trend stat-trend-up">▲ 12%</div>
</div>
```

`stat-trend-up` (green) and `stat-trend-down` (red) indicate direction.

## Alerts

```html
<div class="alert alert-info">Info message</div>
<div class="alert alert-success">Success message</div>
<div class="alert alert-warning">Warning message</div>
<div class="alert alert-danger">Error message</div>
```

## Layout primitives

- `.ds-container` — centered, max-width 1200px
- `.ds-stack` — vertical rhythm between children (16px); `ds-stack-sm` /
  `ds-stack-lg` for tighter/looser spacing
- `.ds-cluster` — horizontal row, wraps, 12px gap
- `.ds-grid` — auto-fit grid, 240px minimum column width

## Line icons

A shared SVG sprite at `design-system/v1/icons.svg`. Reference any icon with `<use href="…#name"/>`. Sized via CSS class, tinted via `currentColor`.

```html
<svg class="ds-icon" aria-hidden="true">
  <use href="/research-projects/design-system/v1/icons.svg#home"/>
</svg>

<svg class="ds-icon ds-icon-lg" style="color: var(--ds-color-accent);">
  <use href="/research-projects/design-system/v1/icons.svg#leaf"/>
</svg>
```

Sizes: default (`1.25em`), `ds-icon-lg` (`1.75em`), `ds-icon-xl` (`2.25em`).

**Available icons**: `home`, `search`, `bell`, `user`, `users`, `calendar`, `calendar-check`, `folder`, `inbox`, `dashboard`, `chart`, `settings`, `car`, `school`, `vote`, `alert`, `trash`, `leaf`, `bike`, `plus`, `arrow-right`, `edit`, `check`, `more`, `export`, `map-pin`, `building`.

See the <a href="/research-projects/design-system/v1/playground.html" target="_blank">playground</a> for visual reference. Prefer these over emoji — emoji render inconsistently across platforms and don't inherit text color.

## Aarhus-inspired extensions

The following components carry the aarhus.dk visual relation — pastel
surfaces, softer shapes, pink accent. Use them to signal "same municipal
family" in prototypes that benefit from a warmer, more citizen-facing tone.

### Surface utilities

Pastel backgrounds you can apply to any element. Pair with `.card-soft`,
`.hero`, or plain `<section>`.

```html
<div class="card-soft surface-mint">Mint</div>
<div class="card-soft surface-cream">Cream</div>
<div class="card-soft surface-pale-blue">Pale blue</div>
<div class="card-soft surface-pale-pink">Pale pink</div>
<div class="card-soft surface-pale-aqua">Pale aqua</div>
<div class="card-soft surface-coral">Coral</div>
```

### Soft card

Larger radius (24px), no border. Meant to sit on a pastel surface or a
warm body background.

```html
<div class="card-soft surface-mint">
  <h4>Friendly tone</h4>
  <p>Softer shape for citizen-facing content.</p>
</div>
```

### Hero banner

Full-width promotional section with a big heading and an optional search
row. Add any surface utility for the background.

```html
<div class="hero surface-pale-blue">
  <h1 class="hero-title">Hvad leder du efter?</h1>
  <p class="hero-lede">Find services, høringer og aktuelle sager.</p>
  <div class="hero-search">
    <input class="input" type="search" placeholder="Søg…">
    <button class="btn btn-primary btn-pill">Søg</button>
  </div>
</div>
```

### Quick-link tile

Iconed service shortcut — hover lift, rounded icon bubble.

```html
<a class="quick-link" href="#">
  <span class="quick-link-icon">🚗</span>
  <span class="quick-link-title">Parkering</span>
  <span class="quick-link-desc">Zoner, tilladelser, betaling</span>
</a>
```

### Sparkline

CSS-sized, `currentColor`-tinted SVG. Put it in a table cell or next to
a stat. Tint by setting `color` on the parent (or via
`style="color: var(--ds-color-accent)"`).

```html
<svg class="sparkline" viewBox="0 0 80 24" preserveAspectRatio="none">
  <path class="sparkline-area" d="M0,18 L10,14 L20,16 L30,8 L40,10 L50,4 L60,6 L70,2 L80,3 L80,24 L0,24 Z"/>
  <path d="M0,18 L10,14 L20,16 L30,8 L40,10 L50,4 L60,6 L70,2 L80,3"/>
</svg>
```

## Mock banner

A shared "this is a mock" banner that every research prototype is
expected to load. Lives outside `.ds` so prototypes that opt out of the
design system can still use it. The companion script auto-injects the
markup and reserves 32 px of `padding-top` on `<body>`.

```html
<link rel="stylesheet" href="/research-projects/design-system/v1/mock-banner.css">
<script src="/research-projects/design-system/v1/mock-banner.js" defer></script>
```

Override the text with `data-banner-text`:

```html
<script src="/research-projects/design-system/v1/mock-banner.js" defer
        data-banner-text="MOCK — Custom prototype label"></script>
```

The default text is `"Dette er en mock-up, ikke det rigtige eller endelige produkt."`

A CI check (`npm run lint:mocks`) verifies that every HTML file under
`docs/public/projects/` references the script. If a prototype
deliberately uses a different banner — for example one that mimics an
external product's staging warning — add its path to the `ALLOWLIST` in
`scripts/check-mock-banners.mjs`.
