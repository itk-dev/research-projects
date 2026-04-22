# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

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
