<small>**Project:** ITK Dev Design System</small>

# Design System

A shared, opt-in visual language for ITKdev Research prototypes. Plain CSS
+ design tokens, no build step, no framework.

::: info Opt in
This design system is **opt-in**. Existing prototypes that match an
external product (like `deltag-aarhus`) or test other palettes (like
`wcag-contrast-checker`) should not include it.
:::

## Quick start

Add one stylesheet to your mock's HTML, then wrap your UI in a `.ds`
container:

```html
<link rel="stylesheet" href="/research-projects/design-system/v1/index.css">

<div class="ds">
  <button class="btn btn-primary">Primary action</button>
</div>
```

The `.ds` wrapper scopes every style — nothing leaks to the rest of the
page, so you can safely mix this with Tailwind or other frameworks.

## What's in it

- **[Tokens](/projects/design-system/tokens)** — colors, typography, spacing, radii, shadows.
- **[Components](/projects/design-system/components)** — buttons, cards, badges, form inputs, tables, modals, sidebar nav, stat cards, alerts.
- **[Usage](/projects/design-system/usage)** — how to opt in, versioning, extension guidance.

## Live playground

<a href="/research-projects/design-system/v1/playground.html" class="mock-button" target="_blank">Open playground ↗</a>

Every component variant, rendered with the ITK Dev palette on a single
scrollable page.

## Example pages

The same components, assembled into realistic layouts:

<a href="/research-projects/design-system/v1/examples/website.html" class="mock-button" target="_blank">Citizen-facing webpage ↗</a>
<a href="/research-projects/design-system/v1/examples/app.html" class="mock-button" target="_blank">Admin app dashboard ↗</a>

Each example links to the others via a demo nav at the top, so you can
compare patterns side-by-side.

## Branding

The design system uses ITK Dev's teal and cyan as its primary palette,
derived from the logo:

- **Teal** `#007BA6` — primary actions, links, focus rings
- **Cyan** `#00B5C9` — secondary accent, info states
- **Green** `#008D3D` — success
- **Red** `#E44930` — danger
