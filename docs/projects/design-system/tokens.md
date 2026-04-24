<small>**Project:** ITK Dev Design System</small>

# Tokens

All values live in [`tokens.css`](https://github.com/itk-dev/research-projects/blob/main/docs/public/design-system/v1/tokens.css)
as CSS custom properties. Reference them by name — never hardcode hex
values in components.

## Colors

### Brand — teal (primary)

| Token | Hex |
|---|---|
| `--ds-teal-50` | `#e6f2f6` |
| `--ds-teal-100` | `#cce4ed` |
| `--ds-teal-500` | `#007ba6` (primary) |
| `--ds-teal-600` | `#00698e` (hover) |
| `--ds-teal-700` | `#005876` (active) |

### Brand — cyan (secondary)

| Token | Hex |
|---|---|
| `--ds-cyan-400` | `#00b5c9` |
| `--ds-cyan-500` | `#00a5cd` |

### Brand — supporting

| Token | Hex | Intent |
|---|---|---|
| `--ds-green-500` | `#008d3d` | success |
| `--ds-red-500` | `#e44930` | danger |
| `--ds-yellow-500` | `#f5b800` | warning |
| `--ds-lime-500` | `#89bd23` | accent |
| `--ds-sage-500` | `#73bc99` | accent |

### Accent — aarhus.dk relation

Pink and coral borrowed from aarhus.dk. Use the pink for
high-visibility secondary CTAs (`.btn-accent`) and the coral sparingly
for warm highlights.

| Token | Hex | Intent |
|---|---|---|
| `--ds-pink-500` | `#ee0043` | aarhus accent, `--ds-color-accent` |
| `--ds-pink-100` | `#fddce6` | soft pink background |
| `--ds-coral-500` | `#ff5f31` | warm accent |
| `--ds-coral-100` | `#ffe1d7` | soft coral background |

### Pastel surfaces

Soft section backgrounds — the visual tell that connects prototypes to
the aarhus.dk look. Use on `.card-soft`, `.hero`, or any section.

| Token | Hex |
|---|---|
| `--ds-surface-mint` | `#aeead9` |
| `--ds-surface-cream` | `#fef4c1` |
| `--ds-surface-pale-blue` | `#ebeffb` |
| `--ds-surface-pale-pink` | `#f1dede` |
| `--ds-surface-pale-aqua` | `#daedf3` |
| `--ds-surface-coral` | `#ffd7c4` |

### Grayscale

`--ds-gray-50` through `--ds-gray-900`, plus `--ds-white` and `--ds-black`.

### Semantic aliases

Prefer semantic tokens in component styles — they adapt if the palette
shifts.

| Token | Maps to |
|---|---|
| `--ds-text-primary` | `--ds-gray-900` |
| `--ds-text-secondary` | `--ds-gray-700` |
| `--ds-text-muted` | `--ds-gray-600` |
| `--ds-text-link` | `--ds-teal-600` |
| `--ds-bg-page` | `--ds-gray-50` |
| `--ds-bg-surface` | `--ds-white` |
| `--ds-bg-subtle` | `--ds-gray-100` |
| `--ds-border-default` | `--ds-gray-300` |
| `--ds-border-focus` | `--ds-teal-500` |
| `--ds-color-primary` | `--ds-teal-500` |
| `--ds-color-success` | `--ds-green-500` |
| `--ds-color-warning` | `--ds-yellow-500` |
| `--ds-color-danger` | `--ds-red-500` |
| `--ds-color-info` | `--ds-cyan-500` |
| `--ds-color-accent` | `--ds-pink-500` |

## Typography

- **Font family**: Inter, loaded from Google Fonts with system fallbacks.
- **Monospace**: `ui-monospace` stack for code.

Size scale: `--ds-fs-xs` (12px) → `--ds-fs-5xl` (48px), in steps that
cover body, heading, and display sizes.

Weights: `--ds-fw-regular` (400), `--ds-fw-medium` (500),
`--ds-fw-semibold` (600), `--ds-fw-bold` (700).

Line heights: `--ds-lh-tight` (1.25), `--ds-lh-snug` (1.4),
`--ds-lh-body` (1.5), `--ds-lh-loose` (1.7).

## Spacing

4px base scale: `--ds-space-1` (4px) through `--ds-space-8` (64px).

| Token | Value |
|---|---|
| `--ds-space-1` | 4px |
| `--ds-space-2` | 8px |
| `--ds-space-3` | 12px |
| `--ds-space-4` | 16px |
| `--ds-space-5` | 24px |
| `--ds-space-6` | 32px |
| `--ds-space-7` | 48px |
| `--ds-space-8` | 64px |

## Radii

`--ds-radius-sm` (3px), `--ds-radius-md` (6px), `--ds-radius-lg` (10px),
`--ds-radius-xl` (16px), `--ds-radius-2xl` (24px), `--ds-radius-pill`
(fully rounded), `--ds-radius-full` (alias for `pill`).

## Shadows

`--ds-shadow-sm`, `--ds-shadow-md`, `--ds-shadow-lg`, and
`--ds-shadow-focus` for focus rings.

## Transitions

`--ds-transition-fast` (120ms), `--ds-transition` (180ms),
`--ds-transition-slow` (300ms) — all `ease-out`.
