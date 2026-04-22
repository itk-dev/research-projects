<small>**Project:** Agentic Orchestration Studio</small>

# Interactive Mocks

Interactive HTML prototypes demonstrating the proposed platform. Open them to try the interactions directly in your browser.

---

**<a href="/projects/agentic-orchestration/mocks/unified-platform.html" target="_blank">Unified Platform ↗</a>**
A mock of the full orchestration studio showing how Flowable, n8n, and Grafana can feel like a single seamless platform. Click through eight views in the sidebar:

### Overview

- **Dashboard** — platform-wide analytics with stat cards (active processes, completions, hours saved, pending tasks), a 14-day bar chart with hover tooltips, and a donut chart breaking down work by type (human tasks, integrations, AI agents, automated)

### Processes

- **Process Map** — list of all processes with status, running instances, and completion metrics. Click a process to see its full BPMN-style flow with color-coded node types (agent, human task, n8n integration, gateway). Process detail shows live metrics including running instances (clickable — navigates to tasks), average completion time, human wait count, dependencies, and estimated time saved per case. The Parking Complaint process also demonstrates **process versioning**: a diff-style changes summary (v2.1 vs v2.0), a version history timeline with deployer and notes, and a "Deploy new version" button that opens a confirmation modal with deployment notes and stakeholder notification. Two example processes: Parking Complaint Handling and Employee Onboarding
- **My Tasks** — Kanban board with four columns (New, In Progress, Waiting, Done). Click a task to open the detail view showing full context, an AI-drafted response with approve/edit/regenerate/reject actions, a details sidebar (status, priority, assignee, SLA with countdown), linked external systems (KMD, SBSYS), and a process timeline showing completed and pending steps
- **Automations** — grid of n8n automation cards with name, description, connector tags, status, and run counts. Click the first card to see the detail view with statistics (runs, success rate, avg duration), numbered workflow steps (trigger → transform → validate → create → notify), connectors, and actions (Edit in n8n, View logs, Disable)

### Tools

- **AI Assistant** — chat interface with a history sidebar showing previous personal conversations. The assistant supports executable skills via slash commands (`/analyze-process`, `/check-status`, `/draft-automation`, `/explain-errors`). The example conversation demonstrates rich output including inline process flow diagrams, metrics analysis, code blocks (Flowable expressions), and optimization suggestions

### Admin

- **Agents** — management panel for AI agents (admin-only). Shows agent cards with name, role, skill tags, and usage stats. Click the first card to see the detail view with description, statistics (accuracy, response time), skills with descriptions, system access permissions, and actions. The "Create Agent" button opens a modal with three options: configure manually, AI-assisted setup, or chat about it. Three example agents: Complaint Classifier, Response Drafter, Onboarding Assistant
- **Operations** — Grafana-style monitoring for IT administrators. Shows infrastructure health (Flowable engine, n8n workers, PostgreSQL, alerts), an API response time chart (95th percentile, 24h) with y-axis labels and hover tooltips, errors by component, and a recent alerts table
- **Settings** — identity and access management configuration (admin-only). Shows Keycloak identity provider connection, SAML 2.0 / Microsoft Entra ID federation, AD group to platform role mapping table (AAK-IT-Admins → Administrator, etc.), and session management settings

### Governance

- **Role-based views** — use the "View as role" dropdown in the sidebar (below the user avatar) to switch between Administrator, Process Designer, and Caseworker. The UI adapts: caseworkers see only Dashboard, My Tasks, and AI Assistant; process designers also see Process Map and Automations; administrators see everything including Agents, Operations, and Settings. The user name and role label update per role.

### Modals

All creation flows (New Process, New Automation, Create Agent) use a consistent modal pattern offering three paths: design/configure manually, AI-assisted draft/setup, or chat about it with the AI assistant. The deploy confirmation modal includes deployment notes and stakeholder notification.
