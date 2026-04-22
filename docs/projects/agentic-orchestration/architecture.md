<small>**Project:** Agentic Orchestration Studio</small>

# Architecture Options

Two proposed architectures for an open-source orchestration platform, from comprehensive to minimal.

---

## Option A: Full Composed Stack

Maximum flexibility. Covers all four capabilities (Map, Automate, Orchestrate, Analyze) with best-of-breed tools at each layer.

### Components

| Layer                        | Tool                    | Role                                                                                         |
| ---------------------------- | ----------------------- | -------------------------------------------------------------------------------------------- |
| **Process engine**           | Flowable                | BPMN 2.0 process execution, CMMN case management, DMN decision tables, human task management |
| **Process modeler**          | BPMN.io                 | Web-based visual BPMN editor, embeddable in our UI                                           |
| **Agent orchestration**      | LangGraph               | AI agent workflows — classification, summarization, decision support, with human-in-the-loop |
| **Integration & automation** | n8n                     | 400+ connectors to external systems (forms, case management, email, APIs)                    |
| **RPA**                      | Robot Framework         | Desktop/browser/API automation for legacy systems                                            |
| **Operations monitoring**    | Grafana + OpenTelemetry | Infrastructure health, alerting, detailed analytics (IT/admin only)                          |
| **Data store**               | PostgreSQL              | Shared database for process state, audit logs, analytics                                     |
| **Identity**                 | Keycloak                | Single sign-on, role-based access, municipal AD integration                                  |

### How it fits together

```
┌─────────────────────────────────────────────────────────┐
│                    Web Frontend                          │
│        (Process maps, dashboards, task inbox)            │
├────────────┬────────────┬────────────┬──────────────────┤
│  BPMN.io   │  Task UI   │  Dashboard │   Admin          │
│  (modeler) │  (inbox)   │  (custom)  │   (config)       │
├────────────┴────────────┴────────────┴──────────────────┤
│                   API Gateway                            │
├────────────┬────────────┬────────────┬──────────────────┤
│  Flowable  │  LangGraph │    n8n     │ Robot Framework  │
│  (BPMN/    │  (agents)  │  (integr.) │ (RPA)            │
│   CMMN/    │            │            │                  │
│   DMN)     │            │            │                  │
├────────────┴────────────┴────────────┴──────────────────┤
│              Keycloak (identity/SSO)                     │
├─────────────────────────────────────────────────────────┤
│    PostgreSQL    │    OpenTelemetry    │    Grafana      │
│    (state/audit) │    (telemetry)      │    (dashboards) │
└─────────────────────────────────────────────────────────┘
                          │
            ┌─────────────┼─────────────┐
            │             │             │
        ┌───┴───┐   ┌────┴───┐   ┌────┴───┐
        │ KMD   │   │ SBSYS  │   │OS2Forms│
        │       │   │        │   │        │
        └───────┘   └────────┘   └────────┘
         (external systems / backends)
```

### Interaction patterns

1. **Process designer** uses BPMN.io to model a process visually
2. **Flowable** executes the BPMN process, routing between automated steps and human tasks
3. At an "agent step", Flowable delegates to **LangGraph** which runs the AI agent(s)
4. At an "integration step", Flowable triggers **n8n** workflows to talk to external systems
5. At an "RPA step", Flowable triggers a **Robot Framework** job for legacy system automation
6. **Human-in-the-loop** tasks appear in a task inbox UI, powered by Flowable's task service
7. The **platform dashboard** (custom, built into the web frontend) shows process stats, task counts, hours saved, and ROI to all users
8. **OpenTelemetry** collects infrastructure metrics from all components; **Grafana** provides detailed operational dashboards, alerting, and ad-hoc analytics for IT/admins
9. **Keycloak** handles authentication and role-based access across all components

### Strengths

- Full coverage of Map, Automate, Orchestrate, Analyze
- Each component is replaceable (no vendor lock-in)
- Scales independently per layer
- Standards-based (BPMN 2.0, OpenTelemetry, OIDC)

### Risks

- Integration complexity — 6+ components to connect and maintain
- Requires strong DevOps capability
- More moving parts = more potential failure points
- Longer time to first value

---

## Option B: Minimal Viable Stack

Fastest path to a working platform. Three components covering the core needs.

::: info See the mock
The <a href="/research-projects/projects/agentic-orchestration/mocks/unified-platform.html" target="_blank">Unified Platform mock ↗</a> demonstrates how these three components can feel like a single seamless platform.
:::

### Components

| Layer                            | Tool     | Role                                           |
| -------------------------------- | -------- | ---------------------------------------------- |
| **Process engine + human tasks** | Flowable | BPMN execution, case management, task inbox |
| **Integration & automation** | n8n | External system connectors, simple automations |
| **Platform dashboard** | Custom (built-in) | Process stats, task overview, hours saved — for all users |
| **Operations monitoring** | Grafana + OpenTelemetry | Infrastructure health, alerting, ad-hoc analytics — for IT/admins |

### How it fits together

```
┌─────────────────────────────────────┐
│            Web Frontend              │
│    (Process maps, task inbox,        │
│     dashboards)                      │
├──────────────┬──────────────────────┤
│   Flowable   │        n8n           │
│  (BPMN +     │   (integrations      │
│   tasks +    │    + automations)    │
│   dashboard) │                      │
├──────────────┴──────────────────────┤
│     PostgreSQL    │  OpenTelemetry  │
├───────────────────┤  + Grafana     │
│   (state/audit)   │  (ops only)    │
└───────────────────┴─────────────────┘
                  │
        ┌─────────┼─────────┐
        │         │         │
    ┌───┴──┐  ┌──┴───┐  ┌──┴────┐
    │ KMD  │  │SBSYS │  │OS2Forms│
    └──────┘  └──────┘  └───────┘
```

### What you get

- **Map:** BPMN process modeling via Flowable's built-in modeler (or BPMN.io added later)
- **Automate:** n8n handles integrations and simple automations
- **Orchestrate:** Flowable manages process execution and human-in-the-loop
- **Analyze:** Platform dashboard shows process stats and ROI to all users; Grafana provides operational monitoring for IT

### What you don't get (yet)

- AI agent orchestration (add LangGraph when ready)
- RPA for legacy desktop apps (add Robot Framework when needed)
- Advanced analytics / ROI measurement (evolve the platform dashboard)

### Strengths

- Three components — manageable to operate
- Fast to stand up (weeks, not months)
- Proves the concept before investing in the full stack
- Each component has a large, active community

### Growth path

```
Minimal stack (Phase 1)
  └─ + LangGraph (Phase 2: AI agents)
       └─ + Robot Framework (Phase 3: RPA)
            └─ + Keycloak (Phase 4: SSO/roles)
                 └─ + BPMN.io (Phase 5: visual modeler)
```

---

## Two Dashboard Layers

An important distinction: the platform has **two kinds of dashboards** serving different audiences.

### Platform dashboard (built into the app)

This is what all users see — process owners, caseworkers, managers. It shows:

- Active processes, completion rates, task counts
- Hours saved, estimated ROI
- Process bottlenecks (where are things stuck?)
- Personal task overview

This is a custom-built part of the web frontend, pulling data from Flowable's process engine and PostgreSQL. It does not require Grafana.

### Operations dashboard (Grafana — IT/admins only)

This is where IT monitors the platform itself. It shows:

- Infrastructure health — is Flowable responding? n8n queue depth? Database connections?
- Error rates and alerting — "n8n automation X has failed 3 times in the last hour"
- Detailed analytics — ad-hoc queries like "average completion time for building permits by month over the last year"
- SLA monitoring — "3 tasks have breached their 48-hour SLA"
- Resource utilization — CPU, memory, disk across all components

Grafana connects to OpenTelemetry (for infrastructure metrics) and PostgreSQL (for process data). It's accessible via a separate URL or linked from an admin section in the platform.

| | Platform dashboard | Grafana (ops) |
|---|---|---|
| **Audience** | Everyone | IT / admins |
| **Purpose** | Business value, task overview | Infrastructure health, alerting |
| **Data source** | Flowable + PostgreSQL | OpenTelemetry + PostgreSQL |
| **Built by** | Us (part of the app) | Configuration (Grafana dashboards) |
| **Access** | Main navigation | Admin section / separate URL |

---

## Deployment

Both options should be deployed as containers (Docker/Kubernetes) for consistency and scalability. All components support containerized deployment.

### Infrastructure requirements (minimal stack)

| Component  | CPU         | Memory    | Storage   |
| ---------- | ----------- | --------- | --------- |
| Flowable   | 2 cores     | 4 GB      | 10 GB     |
| n8n        | 1 core      | 2 GB      | 5 GB      |
| Grafana    | 1 core      | 1 GB      | 5 GB      |
| PostgreSQL | 2 cores     | 4 GB      | 50 GB     |
| **Total**  | **6 cores** | **11 GB** | **70 GB** |

This fits comfortably on a single server or a small Kubernetes cluster.

---

## Recommendation

**Start with Option B.** Get a working platform with one real process running end-to-end. Use it to demonstrate value and build organizational buy-in. Then grow toward Option A based on actual needs, not assumptions.
