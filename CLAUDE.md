# ITKdev Research — Project Instructions

## Project overview

Research publishing site for ITKdev, built with VitePress and deployed to GitHub Pages. The theme and dev setup follow the ITK Dev documentation site conventions.

**Live site:** https://itk-dev.github.io/research-projects/
**Repository:** https://github.com/itk-dev/research-projects

## Structure

```
docs/                                        # VitePress source content root
docs/.vitepress/config.mts                   # Site config (title, nav, search, base path, meta)
docs/.vitepress/sidebar.mts                  # Sidebar and nav definitions per project
docs/.vitepress/theme/index.ts               # Custom theme entry (extends default)
docs/.vitepress/theme/custom.css             # ITK Dev brand colors + custom styles
docs/.vitepress/theme/DocLayout.vue          # Layout with author info, password gate, custom home features
docs/.vitepress/theme/PasswordGate.vue       # Client-side password protection component
docs/.vitepress/theme/HomeFeatures.vue       # Custom home page feature cards with "Last edited" dates
docs/.vitepress/theme/projectDates.data.js   # Build-time data loader — reads git timestamps per project
docs/index.md                                # Landing page (VitePress home layout with feature cards)
docs/about.md                                # About ITKdev Research
docs/public/robots.txt                       # SEO control (noindex)
docs/public/projects/<name>/mocks/           # Interactive HTML prototypes (static assets)
docs/public/design-system/v1/                # Shared opt-in design system (tokens + components)
docs/projects/design-system/                 # Design system documentation pages
docs/projects/<project-name>/                # Each research project
  index.md                                   # Main report / overview
  mocks.md                                   # Mocks listing page
  images/                                    # Screenshots and figures (optional)
package.json                                 # Node dependencies (VitePress + Mermaid)
.nvmrc                                       # Node version pin (22 LTS)
docker-compose.yml                           # Docker dev environment (Node + Nginx + Traefik)
Taskfile.yml                                 # Task automation (dev, build, lint)
.github/workflows/deploy.yml                 # Auto-deploy on push to main
.github/workflows/verify_build.yml           # PR build verification
```

## Current projects

| Folder | Project | Protected |
|--------|---------|-----------|
| `climate-nudging` | Climate Awareness Nudging | No |
| `salary-negotiation` | Lønforhandlingssystem | Yes |
| `agentic-orchestration` | Agentic Orchestration Studio | No |
| `deltag-aarhus` | deltag.aarhus.dk | No |
| `wcag-contrast-checker` | WCAG Contrast Checker | No |
| `deltag-aarhus-timeline` | Deltag Aarhus — Projekttidslinje | No |
| `book-aarhus` | Book Aarhus | No |
| `opkraevningsoverblik` | Opkrævningsoverblik | No |
| `roboway` | Roboway | No |

## Conventions

- All content is written in Markdown
- Interactive mocks are self-contained HTML files in `docs/public/projects/<name>/mocks/` — VitePress serves them as raw static assets without processing
- Every project document starts with: `<small>**Project:** Project Name</small>`
- Use VitePress custom containers for callouts: `::: info Title` / `::: warning Title`
- Mock links must include the base path prefix and open in a new tab:
  ```html
  <a href="/research-projects/projects/<name>/mocks/file.html" class="mock-button" target="_blank">Text ↗</a>
  ```
- Theme uses ITK Dev brand colors (teal/cyan) with dark/light mode
- Site has `noindex, nofollow` meta tags and `robots.txt` to prevent crawling
- Home page feature cards automatically show "Last edited" dates from git history

## Design system (opt-in)

Shared visual language for new prototypes. Lives at `docs/public/design-system/v1/` and is served as static assets.

- **Opt in** from a mock's HTML:
  ```html
  <link rel="stylesheet" href="/research-projects/design-system/v1/index.css">
  <div class="ds"> ... </div>
  ```
- **Scope**: all classes are nested under `.ds` to prevent leakage.
- **Versioning**: pinned at `v1/`; breaking changes ship as `v2/` without touching `v1/`.
- **Docs**: see `/projects/design-system/` (Overview, Tokens, Components, Usage) and the live playground at `/research-projects/design-system/v1/playground.html`.
- **Do not retrofit** existing prototypes. Skip the system for prototypes that mimic an external product (`deltag-aarhus`) or test other palettes (`wcag-contrast-checker`).

## Password-protecting a project

Add frontmatter to every markdown file in the project:

```yaml
---
protected: true
passwordHash: "<sha256-hash-of-password>"
passwordGroup: "project-name"
---
```

Generate the hash: `echo -n "your-password" | shasum -a 256 | cut -d ' ' -f 1`

Pages sharing the same `passwordGroup` only prompt once per browser session. The password gate hides the sidebar and outline while locked.

**Note:** Client-side protection only. Content is in the HTML source. Adequate for casual access control, not for sensitive data.

## Adding a new research project

1. Create `docs/projects/<project-name>/` with at least an `index.md`
2. Add `<small>**Project:** Project Name</small>` at the top of each document
3. Add a sidebar section in `docs/.vitepress/sidebar.mts`
4. Add a feature card in `docs/index.md` frontmatter (the `link` field must match the sidebar path — the `projectDates.data.js` loader uses it to look up git timestamps)
5. If the project has mocks:
   - Create a `mocks.md` listing page in the project folder
   - Place mock HTML files in `docs/public/projects/<project-name>/mocks/`
   - Link to mocks with the base path prefix: `/research-projects/projects/<name>/mocks/file.html`
   - Use `target="_blank"` on all mock links to bypass VitePress's client-side router
6. Update `CHANGELOG.md`

## Building locally

### With Docker (recommended)

```bash
task dev      # Start dev server via Docker + Traefik at http://research.local.itkdev.dk
task build    # Build static site
task open     # Open in browser
```

### Without Docker

```bash
nvm use       # Switch to Node 22 (from .nvmrc)
npm install
npm run docs:dev      # Dev server at http://localhost:5173
npm run docs:build    # Build to _site/
npm run docs:preview  # Preview built site
```

## Deployment

Push to `main` — GitHub Actions deploys to GitHub Pages automatically.

GitHub Pages source must be set to **GitHub Actions** in repo settings.

## Review conventions

See `REVIEW-CONVENTIONS.md` for annotation shortcodes used during document review.
