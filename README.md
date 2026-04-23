# ITKdev Research

Research publishing site for [ITKdev](https://github.com/itk-dev) — a development team at Aarhus Kommune.

**Live site:** https://itk-dev.github.io/research-projects/

## What is this?

We publish research, prototypes, and evaluations on topics relevant to our work. Each project includes written findings and interactive HTML mocks that demonstrate proposed solutions.

## Projects

| Project | Description |
|---------|-------------|
| **Climate Awareness Nudging** | How to nudge AI users toward climate awareness without guilt-tripping or blocking workflows |
| **Lønforhandlingssystem** | Structured salary negotiation system replacing Excel-based processes (password-protected) |
| **Agentic Orchestration Studio** | Open-source platform for mapping, automating, and orchestrating business processes |
| **deltag.aarhus.dk** | Hearing detail page prototype for citizen participation with 784 simulated responses |
| **WCAG Contrast Checker** | Color accessibility tool for WCAG AA/AAA compliance analysis |
| **Deltag Aarhus — Projekttidslinje** | Interactive citizen engagement project timeline |
| **Book Aarhus** | Resource booking app prototype for rooms and facilities |
| **Opkrævningsoverblik** | Consolidated overview of municipal charges for citizens |

## Development

### Prerequisites

- Node.js 22 (see `.nvmrc`)
- Docker + Traefik (for `task dev`)

### Quick start

```bash
npm install
npm run docs:dev
```

Open http://localhost:5173

### With Docker

```bash
task dev      # Start via Docker + Traefik at http://research.local.itkdev.dk
task build    # Build static site
task open     # Open in browser
```

### Other commands

```bash
npm run docs:build      # Build to _site/
npm run docs:preview    # Preview built site
task lint:check         # Check markdown standards
```

## Deployment

Push to `main` — GitHub Actions builds with VitePress and deploys to GitHub Pages automatically.

## Tech stack

- [VitePress](https://vitepress.dev/) — static site generator
- ITK Dev brand theme with dark/light mode
- Client-side password protection for sensitive projects
- Docker + Nginx + Traefik dev environment
- GitHub Actions CI/CD

## Contributing

See [CLAUDE.md](CLAUDE.md) for project conventions and instructions on adding new projects.
