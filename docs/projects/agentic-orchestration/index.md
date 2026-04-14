<small>**Project:** Agentic Orchestration Studio · **Status:** Draft · **Date:** April 2026</small>

# Agentic Orchestration Studio

**A shared platform for mapping, automating, orchestrating, and measuring business processes in Aarhus Kommune.**

---

## Introduction

Aarhus Kommune is increasingly adopting AI agents, RPA bots, and workflow automations across departments. But these efforts are fragmented — each initiative lives in isolation, with no shared overview, no common tooling, and no way to measure the collective business value.

This project explores whether we can build a **shared orchestration platform** that gives the organization:

- A **visual map** of automated processes
- Tools to **orchestrate** agents, RPA, and workflows together
- **Human-in-the-loop** routing when decisions need a person
- **Dashboards** showing where processes are and what value they deliver
- **Visibility into dependencies** on backend systems — useful for procurement and architecture planning

The inspiration comes from TwoDay's commercial Agentic Orchestration Studio (AOS), presented at OffDig 2025. The question is: **can we build this ourselves, using open-source components, tailored to our context, security requirements, and scale?**

And beyond replicating what exists — can we go further? Can we have an **AI assistant built into the platform** that helps users design, refine, and optimize their process flows?

---

## The Problem

Today, automation in the municipality looks like this:

- **RPA bots** run in one system, managed by one team
- **AI agents** are developed in another context, with different tooling
- **Workflow automations** (form processing, case routing) live in yet another silo
- **No shared overview** — nobody can see all automations in one place
- **No measured business value** — we can't tell leadership what the return on investment is
- **No visibility into human-in-the-loop steps** — where do processes need human intervention, and how long does that take?
- **No dependency map** — when a backend system changes, which automations break?
- **Scaling is hard** — each new automation is a standalone effort with its own infrastructure

This makes it difficult to prioritize, to scale, and to make a strategic case for further investment.

---

## What TwoDay's AOS Does

TwoDay's Agentic Orchestration Studio is organized around four capabilities:

### Map

Visual process mapping — documenting what a process looks like, who's involved, what systems it touches, and where automation is possible.

### Automate

Building the automations themselves — connecting AI agents, RPA bots, and integrations into executable workflows.

### Orchestrate

Running and managing automations in production — routing tasks between bots and humans, handling exceptions, managing dependencies, and ensuring processes complete end-to-end.

### Analyze

Measuring the effect — dashboards showing process throughput, error rates, time savings, and documented business value (ROI).

**Key strengths of the AOS approach:**

- Everything in one place — mapping, execution, monitoring
- Built-in AI that suggests process optimizations
- Human-in-the-loop as a first-class concept
- Dependency visibility to backend systems
- Business value measurement built in

**The limitation:** It's a commercial platform. Licensing costs scale with users, creating a potential barrier to broad adoption across 30,000+ municipal employees. And it's a dependency on a single vendor.

---

## The Open-Source Opportunity

!!! info "Full analysis"
See the [Open Source Landscape](open-source-landscape.md) for detailed tool-by-tool evaluation.

### Key finding

**No single open-source tool covers all four capabilities (Map, Automate, Orchestrate, Analyze).** But strong tools exist for each layer, and they can be composed into a platform.

### The strongest candidates

| Capability                            | Best open-source option                | Notes                                                                                           |
| ------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Process mapping (BPMN)**            | Flowable + BPMN.io                     | Industry-standard BPMN 2.0. Flowable also has case management (CMMN) and decision tables (DMN). |
| **Agent orchestration**               | LangGraph or Microsoft Agent Framework | Both MIT-licensed. LangGraph has the largest community. Microsoft's framework just hit 1.0.     |
| **Workflow automation & integration** | n8n or Activepieces                    | 400–600+ connectors. Visual builders. Self-hosted.                                              |
| **RPA**                               | Robot Framework                        | Mature, Apache 2.0, huge ecosystem. Keyword-driven (accessible).                                |
| **Monitoring & analytics**            | OpenTelemetry + Grafana                | Industry standard. Flexible dashboards.                                                         |

### Flowable stands out

Flowable is the closest thing to a single platform because it uniquely combines:

- BPMN 2.0 process engine (mapping + execution)
- CMMN case management (adaptive processes)
- DMN decision tables
- Human task management (first-class)
- A new **agent engine** (2025–2026) for AI agent orchestration alongside BPMN

The open-source edition (Apache 2.0) covers the engines. The visual design studio and AI features are commercially licensed — but the core is solid and self-hostable.

---

## Agent-Assisted Process Design

A differentiator beyond what TwoDay offers: an **AI assistant embedded in the platform** that helps users create and improve process flows.

### What it could do

| Capability | Example |
|---|---|
| **Propose flows** | "I need to handle citizen parking complaints" → agent generates a BPMN draft with steps, decision points, and human tasks |
| **Suggest automations** | Agent analyzes a manual process and highlights which steps could be automated, with which tools |
| **Identify integrations** | "This step needs data from SBSYS" → agent suggests the n8n connector and maps the fields |
| **Refine existing flows** | Agent reviews a running process and suggests optimizations based on actual execution data (bottlenecks, error rates) |
| **Research patterns** | "How do other municipalities handle building permits?" → agent searches templates and best practices |

### How it would work

The assistant would be a LangGraph agent with access to:

- **The BPMN modeler** — it can read and generate BPMN 2.0 XML, proposing flows visually
- **The integration catalog** — it knows which n8n connectors are available and what they do
- **Existing process templates** — it learns from flows already built on the platform
- **Execution analytics** — it can read Grafana metrics to identify bottlenecks and suggest improvements

The user interacts via a chat panel alongside the process modeler. The agent proposes, the user approves and refines — keeping the human in control while removing the blank-canvas problem.

### Why this matters

Most process mapping tools assume the user already knows what the process should look like. But process owners often don't — they know the outcome they want, not the optimal flow. An AI assistant bridges that gap and dramatically lowers the barrier to entry.

---

## Recommended Architecture

!!! info "Full details"
See [Architecture Options](architecture.md) for detailed stack descriptions.

### Option A: Full composed stack

For maximum flexibility and full coverage of all four capabilities:

| Layer                       | Tool                        | Role                                         |
| --------------------------- | --------------------------- | -------------------------------------------- |
| Process mapping & execution | **Flowable**                | BPMN/CMMN/DMN engines, human task management |
| Visual process modeler      | **BPMN.io**                 | Web-based BPMN editor, embeddable            |
| Agent orchestration         | **LangGraph**               | AI agent workflows with human-in-the-loop    |
| Integration & automation    | **n8n**                     | 400+ connectors, visual workflow builder     |
| RPA                         | **Robot Framework**         | Desktop/browser/API automation               |
| Monitoring & dashboards     | **Grafana + OpenTelemetry** | Process metrics, SLAs, ROI tracking          |

### Option B: Minimal viable stack

For a faster start with fewer moving parts:

| Layer                                    | Tool         |
| ---------------------------------------- | ------------ |
| Process mapping, execution & human tasks | **Flowable** |
| Integration & automation                 | **n8n**      |
| Monitoring                               | **Grafana**  |

Option B gets us Map + Orchestrate + basic Analyze with three components. Agent orchestration and RPA can be added later as the platform matures.

---

## Why Build vs. Buy

| Factor                | Build (open-source)                           | Buy (TwoDay AOS)                        |
| --------------------- | --------------------------------------------- | --------------------------------------- |
| **Licensing cost**    | Free (open-source core)                       | Per-user licensing — expensive at scale |
| **Customization**     | Full control, tailored to our context         | Limited to vendor's roadmap             |
| **Security**          | Self-hosted, full data sovereignty            | Depends on deployment model             |
| **Vendor dependency** | None (open standards, replaceable components) | Single vendor lock-in                   |
| **Time to value**     | Longer — requires development and integration | Shorter — turnkey platform              |
| **Maintenance**       | Our responsibility                            | Vendor-managed                          |
| **Community**         | Open-source communities, OS2 collaboration    | Vendor support                          |
| **Scalability**       | Unlimited users, no license barriers          | License cost scales with users          |

**Our position:** We have the technical capability to build this. The open-source components are mature. And building on open standards means we can share the platform with other municipalities through OS2 — multiplying the value.

The risk is development effort and maintenance. A phased approach (start minimal, grow based on proven value) mitigates this.

---

## Open Questions

!!! info "Full details"
See [Considerations](considerations.md) for all open questions and discussion points.

Key questions to resolve:

- [ ] **Target audience** — who uses this? IT only, or also process owners and business units?
- [ ] **Roles and permissions** — who can map, who can orchestrate, who can just monitor?
- [ ] **OS2Forms 2.0** — is this the future form system, and should our platform integrate or replace parts of it?
- [ ] **Existing systems** — what integrations are needed on day one? (KMD, SBSYS, etc.)
- [ ] **Security model** — classification of data flowing through the platform
- [ ] **Funding** — what's the investment case? Can we quantify the cost of fragmentation?
- [ ] **OS2 collaboration** — interest from other municipalities in co-developing?

---

## Next Steps

1. **Validate the concept** — present this research to stakeholders, test appetite
2. **Map current automations** — inventory what's already running across departments
3. **Proof of concept** — stand up the minimal stack (Flowable + n8n + Grafana) with one real process
4. **Create interactive mocks** — UI prototypes for the "dashboard" and "process map" views to sell the vision
5. **Engage OS2** — explore co-development with other municipalities
6. **Business case** — quantify the cost of fragmentation vs. the cost of building

---

## Sources

- TwoDay AOS: [twoday.com/services/applied-ai/aos](https://www.twoday.com/services/applied-ai/aos)
- OffDig presentation: "Fra AI-eksperimenter til dokumenteret forretningsværdi" (March 2025)
- See [Open Source Landscape](open-source-landscape.md) for all tool-specific sources
