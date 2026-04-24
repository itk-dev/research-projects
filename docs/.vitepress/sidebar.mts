import type { DefaultTheme } from 'vitepress'

const climateNudging: DefaultTheme.SidebarItem[] = [
  {
    text: 'Climate Awareness Nudging',
    items: [
      { text: 'Overview', link: '/projects/climate-nudging/' },
      { text: 'Nudge Ideas', link: '/projects/climate-nudging/ideas' },
      { text: 'CO2 Research', link: '/projects/climate-nudging/co2-research' },
      { text: 'Integration Points', link: '/projects/climate-nudging/integration' },
      { text: 'Interactive Mocks', link: '/projects/climate-nudging/mocks' },
    ],
  },
]

const salaryNegotiation: DefaultTheme.SidebarItem[] = [
  {
    text: 'Lønforhandlingssystem',
    items: [
      { text: 'Overview', link: '/projects/salary-negotiation/' },
      { text: 'Estimeringsnotat', link: '/projects/salary-negotiation/estimeringsnotat' },
      { text: 'Interactive Mocks', link: '/projects/salary-negotiation/mocks' },
    ],
  },
]

const agenticOrchestration: DefaultTheme.SidebarItem[] = [
  {
    text: 'Agentic Orchestration Studio',
    items: [
      { text: 'Overview', link: '/projects/agentic-orchestration/' },
      { text: 'Open Source Landscape', link: '/projects/agentic-orchestration/open-source-landscape' },
      { text: 'Architecture Options', link: '/projects/agentic-orchestration/architecture' },
      { text: 'Considerations', link: '/projects/agentic-orchestration/considerations' },
      { text: 'Interactive Mocks', link: '/projects/agentic-orchestration/mocks' },
    ],
  },
]

const deltagAarhus: DefaultTheme.SidebarItem[] = [
  {
    text: 'deltag.aarhus.dk',
    items: [
      { text: 'Overview', link: '/projects/deltag-aarhus/' },
      { text: 'Redaktionelt indhold', link: '/projects/deltag-aarhus/editor-content-requirements' },
      { text: 'Interactive Mocks', link: '/projects/deltag-aarhus/mocks' },
    ],
  },
]

const wcagContrastChecker: DefaultTheme.SidebarItem[] = [
  {
    text: 'WCAG Contrast Checker',
    items: [
      { text: 'Overview', link: '/projects/wcag-contrast-checker/' },
      { text: 'Interactive Mocks', link: '/projects/wcag-contrast-checker/mocks' },
    ],
  },
]

const deltagAarhusTimeline: DefaultTheme.SidebarItem[] = [
  {
    text: 'Deltag Aarhus — Projekttidslinje',
    items: [
      { text: 'Overview', link: '/projects/deltag-aarhus-timeline/' },
      { text: 'Interactive Mocks', link: '/projects/deltag-aarhus-timeline/mocks' },
    ],
  },
]

const bookAarhus: DefaultTheme.SidebarItem[] = [
  {
    text: 'Book Aarhus',
    items: [
      { text: 'Overview', link: '/projects/book-aarhus/' },
      { text: 'Interactive Mocks', link: '/projects/book-aarhus/mocks' },
    ],
  },
]

const opkraevningsoverblik: DefaultTheme.SidebarItem[] = [
  {
    text: 'Opkrævningsoverblik',
    items: [
      { text: 'Overview', link: '/projects/opkraevningsoverblik/' },
      { text: 'Interactive Mocks', link: '/projects/opkraevningsoverblik/mocks' },
    ],
  },
]

const designSystem: DefaultTheme.SidebarItem[] = [
  {
    text: 'Design System',
    items: [
      { text: 'Overview', link: '/projects/design-system/' },
      { text: 'Tokens', link: '/projects/design-system/tokens' },
      { text: 'Components', link: '/projects/design-system/components' },
      { text: 'Diagrams', link: '/projects/design-system/diagrams' },
      { text: 'Data viz', link: '/projects/design-system/data-viz' },
      { text: 'Usage', link: '/projects/design-system/usage' },
    ],
  },
]

export function sidebar(): DefaultTheme.Sidebar {
  return {
    '/projects/climate-nudging/': climateNudging,
    '/projects/salary-negotiation/': salaryNegotiation,
    '/projects/agentic-orchestration/': agenticOrchestration,
    '/projects/deltag-aarhus/': deltagAarhus,
    '/projects/wcag-contrast-checker/': wcagContrastChecker,
    '/projects/deltag-aarhus-timeline/': deltagAarhusTimeline,
    '/projects/book-aarhus/': bookAarhus,
    '/projects/opkraevningsoverblik/': opkraevningsoverblik,
    '/projects/design-system/': designSystem,
  }
}

export function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Design System', link: '/projects/design-system/' },
    { text: 'About', link: '/about' },
  ]
}
