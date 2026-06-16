import type { DefaultTheme } from 'vitepress'

// The site has been archived and converted into a redirect shell that forwards
// visitors to the new platform (workspace.itkdev.dk). No in-site navigation is
// needed, so the sidebar and nav are intentionally empty.

export function sidebar(): DefaultTheme.Sidebar {
  return {}
}

export function nav(): DefaultTheme.NavItem[] {
  return []
}
