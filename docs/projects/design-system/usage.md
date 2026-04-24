<small>**Project:** ITK Dev Design System</small>

# Usage

## Opting in

Add one `<link>` to your mock's HTML, then wrap your UI in `.ds`:

```html
<link rel="stylesheet" href="/research-projects/design-system/v1/index.css">

<div class="ds">
  <!-- your mock here -->
</div>
```

The `.ds` scope prevents the stylesheet from bleeding into surrounding
elements. This matters when a prototype mixes the design system with
Tailwind, an embedded iframe, or another framework.

## When to use it

**Use it** when:

- You're building a new prototype from scratch.
- The prototype represents an ITKdev-authored tool or concept (not an
  external product clone).
- You want to ship quickly without re-inventing buttons, modals, and tables.

**Skip it** when:

- The prototype must match an external product's visual language (like
  `deltag-aarhus` mimicking the real Aarhus Kommune portal).
- The prototype's purpose is to test or showcase other palettes (like
  `wcag-contrast-checker`).
- The prototype is highly stylized and the shared look would work against
  the concept.

Existing prototypes are intentionally not retrofitted.

## Versioning

The stylesheet is served from a versioned folder:
`/research-projects/design-system/v1/`.

- **Non-breaking changes** (new components, new tokens, bug fixes) land in
  `v1/` directly.
- **Breaking changes** (renamed tokens, removed classes) ship as a new
  `v2/` folder. Prototypes linked to `v1/` keep working unchanged.

Pin your prototype to the version you built against.

## Extending the system

If your prototype needs a variant that isn't covered, first consider
whether the need is general enough to add to `components.css`. If yes,
open a PR with the new variant + a playground entry. If not, add local
styles in your mock's own `<style>` block — use the design system's
tokens so the result still harmonizes:

```css
.my-custom-thing {
  padding: var(--ds-space-4);
  background: var(--ds-color-primary-soft);
  border-radius: var(--ds-radius-md);
}
```

## File layout

```
docs/public/design-system/v1/
  tokens.css       — custom properties
  base.css         — reset + body defaults
  components.css   — component classes
  index.css        — entry point (@imports the above)
  playground.html  — live gallery
  README.md        — quick reference
```

Rendered via VitePress's static asset serving — no build step, no bundler.
