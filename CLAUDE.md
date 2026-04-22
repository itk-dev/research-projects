# ITKdev Research — Project Instructions

## Project overview

Research publishing site for ITKdev, built with VitePress and deployed to GitHub Pages. The theme and dev setup follow the ITK Dev documentation site conventions.

**Live site:** https://itk-dev.github.io/research-projects/
**Repository:** https://github.com/itk-dev/research-projects

## Structure

```
docs/                                    # VitePress source content root
docs/.vitepress/config.mts               # Site config (title, nav, search, meta)
docs/.vitepress/sidebar.mts              # Sidebar and nav definitions
docs/.vitepress/theme/index.ts           # Custom theme entry
docs/.vitepress/theme/custom.css         # ITK Dev brand colors + custom styles
docs/.vitepress/theme/DocLayout.vue      # Layout with author info + password gate
docs/.vitepress/theme/PasswordGate.vue   # Client-side password protection component
docs/.vitepress/theme/usePasswordAuth.ts # Auth composable (SHA-256 + sessionStorage)
docs/index.md                            # Landing page (VitePress home layout)
docs/about.md                            # About ITKdev Research
docs/public/robots.txt                   # SEO control (noindex)
docs/public/projects/<name>/mocks/       # Interactive HTML prototypes (static assets)
docs/projects/<project-name>/            # Each research project
  index.md                               # Main report
  mocks.md                               # Mocks listing page
  images/                                # Screenshots and figures
package.json                             # Node dependencies
docker-compose.yml                       # Docker dev environment
Taskfile.yml                             # Task automation (dev, build, lint)
.github/workflows/deploy.yml             # Auto-deploy on push to main
.github/workflows/verify_build.yml       # PR build verification
```

## Conventions

- All content is written in Markdown
- Interactive mocks are self-contained HTML files stored in `docs/public/projects/<name>/mocks/` so VitePress serves them as raw static assets
- Images are PNG screenshots stored alongside project markdown in `images/`
- Every project document starts with a project label: `<small>**Project:** Project Name</small>`
- Use VitePress custom containers for callouts: `::: info Title` / `::: warning Title`
- Mock links use absolute paths from the public root: `/projects/<name>/mocks/file.html`
- Mock buttons use the `mock-button` CSS class: `<a href="..." class="mock-button" target="_blank">Text ↗</a>`
- Theme uses ITK Dev brand colors (teal/cyan) with dark/light mode
- Site has `noindex, nofollow` meta tags and `robots.txt` to prevent crawling

## Password-protecting a project

Add frontmatter to any markdown file to require a password:

```yaml
---
protected: true
passwordHash: "<sha256-hash-of-password>"
passwordGroup: "project-name"
---
```

Generate the hash: `echo -n "your-password" | shasum -a 256 | cut -d ' ' -f 1`

Pages sharing the same `passwordGroup` only prompt once per browser session.

**Note:** This is client-side protection only. Content is in the HTML source. Adequate for casual access control, not for sensitive data.

## Adding a new research project

1. Create `docs/projects/<project-name>/` with at least an `index.md`
2. Add `<small>**Project:** Project Name</small>` at the top of each document
3. Add the project sidebar and nav entries in `docs/.vitepress/sidebar.mts`
4. Add a feature card on `docs/index.md` (VitePress features array in frontmatter)
5. If the project has mocks:
   - Create a `mocks.md` listing page in the project folder
   - Place mock HTML files in `docs/public/projects/<project-name>/mocks/`
   - Link to mocks with absolute paths: `/projects/<project-name>/mocks/file.html`

## Building locally

### With Docker (recommended)

```bash
task dev      # Start dev server via Docker + Traefik
task build    # Build static site
task open     # Open in browser
```

### Without Docker

```bash
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
