# Climate Awareness AI — Project Instructions

## Project overview

Research site for responsible AI usage, published via MkDocs + GitHub Pages.

## Structure

- `docs/` — all publishable content (MkDocs source)
- `docs/projects/<project-name>/` — each research project has its own folder
- `docs/projects/<project-name>/mocks/` — interactive HTML prototypes
- `docs/projects/<project-name>/images/` — screenshots and figures
- `mkdocs.yml` — site configuration and navigation

## Conventions

- All content is written in Markdown
- Interactive mocks are self-contained HTML files (no external dependencies)
- Images are PNG screenshots of the mocks
- Use MkDocs Material admonitions (`!!! info`, `!!! warning`) for callouts
- Internal links use relative paths

## Adding a new research project

1. Create `docs/projects/<project-name>/` with an `index.md`
2. Add the project to `nav:` in `mkdocs.yml`
3. Add a summary card on `docs/index.md`

## Building locally

```bash
pip install -r requirements.txt
mkdocs serve
```

## Deployment

Push to `main` — GitHub Actions deploys to GitHub Pages automatically.

## Review conventions

See `REVIEW-CONVENTIONS.md` for annotation shortcodes used during document review.
