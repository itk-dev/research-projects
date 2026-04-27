# ITK Dev Design System — v1

Plain CSS + design tokens for ITKdev Research prototypes. Opt-in.

## Quick start

Add the stylesheet and wrap your UI in `.ds`:

```html
<link rel="stylesheet" href="/research-projects/design-system/v1/index.css">

<div class="ds">
  <button class="btn btn-primary">Primary action</button>
</div>
```

That's it. Styles are scoped under `.ds` so they won't leak into
prototypes that mix this with Tailwind or another framework.

## What's included

- **tokens.css** — colors (ITK teal/cyan brand scale + grayscale + semantic),
  typography (Inter via Google Fonts), spacing, radii, shadows, transitions.
- **base.css** — scoped reset, body defaults, focus styles, layout primitives
  (`ds-container`, `ds-stack`, `ds-cluster`, `ds-grid`).
- **components.css** — buttons, badges, cards, form inputs, tables, modals,
  sidebar nav, stat cards, alerts.
- **playground.html** — live gallery of every component.

## Playground

Open `/research-projects/design-system/v1/playground.html` in a browser to
see every component variant rendered with the ITK Dev palette.

## Versioning

This folder is pinned at `v1/`. Breaking changes will ship as `v2/`, so
prototypes linking to `v1/index.css` keep working unchanged.

## When NOT to use this

- Prototypes that need to match an external product's visual language
  (e.g. `deltag-aarhus` mimics the real Aarhus Kommune site and should
  keep its own styles).
- Prototypes whose purpose is to test other palettes (e.g.
  `wcag-contrast-checker`).

Skip this stylesheet entirely for those cases.
