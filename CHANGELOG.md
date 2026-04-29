# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added — Shared mock banner
- New shared mock banner under `docs/public/design-system/v1/mock-banner.{css,js}` — auto-injects a "this is a mock" strip across the top of every prototype, with optional `data-banner-text` override
- CI check `npm run lint:mocks` (wired into `.github/workflows/verify_build.yml`) fails the build if a prototype HTML file under `docs/public/projects/` doesn't reference the shared banner; allowlist supported for deliberate exceptions (currently `deltag-aarhus`)
- Migrated all eight prototypes (opkraevningsoverblik, salary-negotiation, climate-nudging × 3, agentic-orchestration, book-aarhus, deltag-aarhus-timeline, wcag-contrast-checker) onto the shared component, removing six per-prototype banner copies

### Fixed
- Mock button (`Åbn prototypen`) hover state — text now stays white against the brand background instead of inheriting the default link color, which made the label nearly invisible

### Added — Opkrævningsoverblik BBR-beregner
- New "Beregner" tab in the Opkrævningsoverblik prototype that calculates four BBR-driven municipal fees: rottebekæmpelse (with the >250 m² rate split), renovation, skorstensfejer, and ejendomsskat (grundskyld)
- Editable mock-BBR data (grundareal, grundværdi, bygninger med type/m²/ildsteder) per test user with per-field reset and live recalculation
- "Hvad-hvis" scenario chips: add carport (30 m²), install brændeovn, expand bolig (+25 m²), reset all
- "Se beregning →" link from each charge detail view that switches to the calculator and highlights the relevant card
- New `skorstensfejer` charge type added to the chargeTypes registry and to Anders/Lars test data

### Added — Design System (v1)
- Opt-in design system at `docs/public/design-system/v1/` — plain CSS + tokens using ITK Dev teal/cyan brand palette
- Tokens for colors, typography (Inter), spacing, radii, shadows, transitions
- Components: buttons, badges, cards, form inputs, tables, modal, sidebar nav, stat cards, alerts
- Live playground at `/research-projects/design-system/v1/playground.html`
- VitePress documentation pages (Overview, Tokens, Components, Usage) and top-nav entry

### Changed — Design System (v1.1, aarhus.dk relation + data viz)
- Added aarhus-inspired pink accent (`#ee0043`) and coral (`#ff5f31`), pastel surface utilities (mint, cream, pale-blue, pale-pink, pale-aqua, coral), and `--ds-radius-pill` / `--ds-radius-2xl`
- Warmed body background to `#f5f4f2` and text to `#202423` to harmonize with aarhus.dk without copying it
- New component variants: `btn-accent`, `btn-pill`, `card-soft`, `hero`, `quick-link`, `sparkline`
- New viz helpers at `design-system/v1/viz/` — Chart.js theme (palette defaults), Leaflet theme CSS, `dsMakePin` / `dsHeatmap` / `dsCluster` overlay helpers
- New docs pages: `/projects/design-system/diagrams` (Mermaid examples) and `/projects/design-system/data-viz` (Chart.js, Leaflet, sparklines)
- Playground expanded with pastel swatches, pill/accent buttons, hero banner, quick-link tiles, three themed Chart.js charts, a Leaflet map with pins + heatmap, and sparklines in a table

### Added — Roboway Project
- Robot fleet management prototype for Aarhus Kommune ("Last Mile" / autonomous delivery robots)
- Single-page mock with seven views: dashboard, live Leaflet map, fleet overview, zone admin, incidents, analytics, and operator portal — DA/EN toggle, responsive

### Added — Opkrævningsoverblik Project
- Consolidated municipal charges overview prototype for Aarhus Kommune citizens
- Interactive mock with login, dashboard, status indicator, charge list, filtering, and 5-year history chart

### Added
- "Last edited" dates on home page project cards, sourced from git commit timestamps
- Custom HomeFeatures component replacing default VitePress feature cards
- Build-time data loader for project git timestamps

### Added — WCAG Contrast Checker Project
- Color contrast accessibility tool for analyzing WCAG AA/AAA compliance
- Interactive prototype with CSV upload, manual input, and Danish municipal sample palettes

### Added — Deltag Aarhus Projekttidslinje Project
- Interactive citizen engagement timeline for "Stationspladsen i Hjortshøj"
- Responsive vertical/horizontal layout with milestone navigation

### Added — Book Aarhus Project
- Resource booking application prototype for rooms and facilities in Aarhus Kommune
- Search, filtering, favorites, and responsive room cards

### Added — deltag.aarhus.dk Project
- Hearing detail page prototype for Aarhus Kommune's citizen participation platform
- Interactive mock with 784 simulated hearing responses, filtering, sorting, MitID login, submission form
- Variant switching between open and closed hearing states
- Statistics (SVG line chart, category breakdown), interactive map, glossary tooltips
- Editor content requirements document (redaktionelt indhold)

### Changed
- Migrated from MkDocs + Material theme to VitePress
- Adopted ITK Dev brand colors (teal/cyan) replacing neutral black/grey palette
- Restructured project to follow ITK Dev documentation site conventions
- Added Docker dev environment with Nginx + Traefik (docker-compose.yml)
- Added Taskfile.yml for dev/build/lint automation
- Added client-side password gate component for protecting individual projects
- Added VitePress home layout with hero and project feature cards
- Moved interactive mock HTML files to docs/public/ (served as raw static assets)
- Replaced MkDocs admonitions (!!! info/warning) with VitePress custom containers (::: info/warning)
- Replaced MkDocs Material button syntax with HTML mock-button links
- Updated GitHub Actions to use Node.js + VitePress instead of Python + MkDocs
- Added PR build verification workflow

### Added
- MkDocs site with Material theme for publishing research as GitHub Pages
- GitHub Actions workflow for automatic deployment on push to main
- Landing page with project index
- About page
- CLAUDE.md with project-specific instructions
- REVIEW-CONVENTIONS.md for document annotation workflow
- Custom CSS for neutral theme (black/grey palette, subtle links)
- Theme override with noindex/nofollow meta tags and robots.txt
- Interactive Mocks listing page for each project

### Added — Climate Nudging Project
- Main research report with findings, design principles, and recommendations
- 17 nudge ideas across 4 categories (pre-request, in-session, post-session, systemic)
- CO2 research document with published literature review and per-query estimates
- Guidance to hosting providers on data transparency for qualified CO2 estimates
- Integration points analysis for Open WebUI, Claude Code, and API/proxy layers
- Interactive HTML mock: Leaf indicator (prompt complexity hint with color states)
- Interactive HTML mock: Session cost ticker (running CO2 estimate with equivalences)
- Interactive HTML mock: Personal usage dashboard (charts, tips, equivalence picker)
- Screenshot images of all three mocks

### Added — Lønforhandlingssystem Project
- Pitch document with problem statement, solution overview, user roles, integrations (SD Løn, FK Organisation), technical prerequisites (API, OIDC, datalimiter), and benefits
- Interactive HTML mock: Salary negotiation workflow with three tabs (personaleleder, HR-behandling, chefgodkendelse)
- Mocks listing page

### Added — Agentic Orchestration Studio Project
- Main research report with pitch, problem statement, and recommendations
- Open source landscape analysis across 5 categories (orchestration, BPM, agents, RPA, integration)
- Feature comparison matrix of 15+ open-source tools
- Two architecture options: full composed stack and minimal viable stack
- Considerations document covering roles, security, OS2Forms, scalability, and funding
- Denmark/OS2 public sector alignment analysis

### Changed
- Rebranded site from "AI Research — Aarhus Kommune" to "ITKdev Research"
- Replaced green theme with neutral black/grey palette
- Simplified navigation: sidebar-only, one project expanded at a time
- Made about page generic for all research projects
- Added project label at top of each document
