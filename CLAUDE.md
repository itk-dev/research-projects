# ITKdev Research — Project Instructions

## Project overview

Research publishing site for ITKdev, built with MkDocs + Material theme and deployed to GitHub Pages.

**Live site:** https://itk-dev.github.io/research-projects/
**Repository:** https://github.com/itk-dev/research-projects

## Structure

```
docs/                              # All publishable content (MkDocs source)
docs/index.md                      # Landing page — lists all projects
docs/about.md                      # About ITKdev Research
docs/stylesheets/custom.css        # Custom theme overrides
docs/projects/<project-name>/      # Each research project
  index.md                         # Main report
  mocks/                           # Interactive HTML prototypes
  mocks.md                         # Mocks listing page
  images/                          # Screenshots and figures
mkdocs.yml                         # Site config and navigation
overrides/main.html                # Theme override (noindex meta tag)
requirements.txt                   # Python dependencies
.github/workflows/deploy.yml       # Auto-deploy on push to main
```

## Conventions

- All content is written in Markdown
- Interactive mocks are self-contained (no external dependencies). Small mocks use a single HTML file. Larger mocks may split CSS and JS into co-located files with the same base name (e.g. `unified-platform.html`, `.css`, `.js`)
- Images are PNG screenshots of the mocks
- Every project document starts with a project label: `<small>**Project:** Project Name</small>`
- Use MkDocs Material admonitions (`!!! info`, `!!! warning`) for callouts
- Internal links use relative paths
- Theme is neutral (black/grey) — no bright colors
- Site has `noindex, nofollow` meta tags and `robots.txt` to prevent crawling

## Adding a new research project

1. Create `docs/projects/<project-name>/` with at least an `index.md`
2. Add `<small>**Project:** Project Name</small>` at the top of each document
3. Add the project as a new nav section in `mkdocs.yml`:
   ```yaml
   - Project Name:
       - Overview: projects/<project-name>/index.md
       - ...: projects/<project-name>/....md
   ```
4. Add a summary card on `docs/index.md`
5. If the project has mocks, create a `mocks.md` listing page and a `mocks/` folder

## Building locally

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

Then open http://127.0.0.1:8000

## Deployment

Push to `main` — GitHub Actions deploys to GitHub Pages automatically.

GitHub Pages source must be set to **GitHub Actions** in repo settings.

## Review conventions

See `REVIEW-CONVENTIONS.md` for annotation shortcodes used during document review.
