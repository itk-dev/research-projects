<small>**Project:** Agentic Orchestration Studio</small>

# Open Source Landscape

A comprehensive analysis of open-source tools that could form the building blocks of an orchestration platform for Aarhus Kommune.

---

## Summary

No single open-source platform combines process mapping, orchestration, agent support, human-in-the-loop, and analytics in one product. **Flowable** comes closest — it uniquely combines BPMN/CMMN/DMN engines with a new agent engine and strong human task management. For a full platform, we need to compose multiple tools.

---

## 1. Workflow & Process Orchestration

| Tool | License | Self-hosted | Human-in-the-loop | Maturity | Best for |
|---|---|---|---|---|---|
| **Apache Airflow** | Apache 2.0 | Yes | Native (since 3.1) | Very high | Data/ML pipelines, scheduled workflows |
| **Temporal.io** | MIT | Yes | Via signals | Very high | Long-running stateful workflows |
| **n8n** | Fair-code | Yes | Via wait nodes | High | Visual automation, integrations |
| **Windmill** | AGPLv3 | Yes | Via approval steps | Growing | Fast execution, multi-language |
| **Prefect** | Apache 2.0 | Yes | Basic | High | Python data pipelines |
| **Conductor** | Apache 2.0 | Yes | Native | Medium-high | Massive scale, LLM integration |

### Apache Airflow
Mature, battle-tested DAG-based orchestration. 25k+ GitHub stars. Airflow 3.1 (2026) added native human-in-the-loop with approve/reject operators. 32% of users now have GenAI/MLOps use cases. Python-only. Not designed for BPMN process mapping.

### Temporal.io
Durable execution — workflows survive crashes and resume exactly where they left off. Code-first (Go, Java, Python, TypeScript, C#). Used by Stripe, Netflix, NVIDIA. No visual designer, requires developer skills. MIT licensed.

### n8n
Visual workflow builder with 400+ integrations. Self-hostable, data stays on your infrastructure. Strong AI agent node (2026). Not designed for formal BPMN. Fair-code license (some enterprise features require paid license).

### Windmill
13x faster than Airflow in benchmarks. Supports 10+ languages. Built-in app builder for dashboards. Suspend/resume releases workers. AGPLv3 community edition.

### Conductor (Netflix/Orkes)
Built for billions of executions. Native AI/LLM integration with 14+ providers. Human-in-the-loop approval built in. Netflix handed maintenance to Orkes (commercial company).

---

## 2. BPM & Process Mapping

| Tool | License | BPMN 2.0 | Human tasks | Agent support | Notes |
|---|---|---|---|---|---|
| **Flowable** | Apache 2.0 | Full | Excellent | Yes (new engine) | Strongest overall candidate |
| **Camunda 7 forks** | Apache 2.0 | Full | Excellent | Via connectors | CIB seven, Operaton |
| **jBPM** | Apache 2.0 | Full | Excellent | Limited | Red Hat/IBM backed |
| **BPMN.io** | Permissive | Modeler only | N/A | N/A | Best visual editor, not a runtime |

### Flowable (recommended)
Full BPMN 2.0, CMMN (case management), and DMN (decision tables) engines. Apache 2.0 open-source core. New agent engine (2025–2026) for multi-agent orchestration alongside BPMN/CMMN. Strong human task service with claiming, assignment, forms, delegation. Java-based, embeddable or standalone. **The AI Studio and visual designer are commercially licensed — the engines are open source.**

### Camunda situation
Camunda 7 Community Edition is now End of Life. Camunda 8 requires a commercial license for production. Two open-source forks continue the Camunda 7 codebase:

- **CIB seven** — Apache 2.0, backed by CIB Group
- **Operaton** — Apache 2.0, community-driven

Both are viable alternatives if Flowable doesn't fit.

### BPMN.io
Best-in-class web-based BPMN 2.0 visual modeler. Embeddable JavaScript library. Read/write standard BPMN 2.0 XML. **Modeler only — not an execution engine.** Pair with Flowable or similar for runtime.

---

## 3. Agent Orchestration

| Tool | License | Languages | Human-in-the-loop | Community | Notes |
|---|---|---|---|---|---|
| **LangGraph** | MIT | Python, JS | First-class | Very high (126k+) | Most popular, graph-based |
| **CrewAI** | MIT | Python | Supported | High (45k+) | Role-based agents, fast |
| **MS Agent Framework** | MIT | .NET, Python | First-class | High (27k+) | Just hit 1.0 (April 2026) |

### LangGraph / LangChain
Most popular agent framework. Graph-based stateful orchestration. Human-in-the-loop is first-class — workflows can be interrupted, state inspected/modified, then resumed. Deep Agents (2026) for planning and subagents. MCP integration. LangSmith (observability) is commercial.

### CrewAI
Role-based multi-agent collaboration. 5.76x faster than LangGraph in some benchmarks. MIT licensed, no LangChain dependency. 100+ tools, memory management. Event-driven Flows for complex pipelines.

### Microsoft Agent Framework (AutoGen + Semantic Kernel)
Production-ready 1.0 shipped April 2026. Multiple orchestration patterns (sequential, concurrent, group chat, handoff). Workflow pause/resume for external input. A2A and MCP support. .NET and Python. Enterprise validation (KPMG, BMW).

---

## 4. RPA

| Tool | License | Platform | Visual designer | Notes |
|---|---|---|---|---|
| **Robot Framework** | Apache 2.0 | Cross-platform | No | Most mature, keyword-driven |
| **TagUI** | Apache 2.0 | Cross-platform | No | Simple, AI Singapore |
| **OpenRPA** | MPL 2.0 | Windows only | Yes | Drag-and-drop, OpenFlow integration |

### Robot Framework (recommended)
Mature, widely-used. Keyword-driven (accessible to non-developers). Extensive library ecosystem (browser, desktop, Excel, APIs). Python-extensible. No built-in orchestration — needs a separate scheduler/orchestrator. Free forever.

### OpenRPA
Visual drag-and-drop designer. Windows automation (SAP, Java, browsers, Office, mainframes). Integrates with Node-RED (OpenFlow) for orchestration. Smaller community, single primary maintainer.

---

## 5. Low-Code & Integration

| Tool | License | Integrations | AI support | Self-hosted |
|---|---|---|---|---|
| **n8n** | Fair-code | 400+ | AI agent node | Yes |
| **Activepieces** | MIT | 644+ | Native AI agents, MCP | Yes |
| **Automatisch** | AGPL-3.0 | ~50 | No | Yes |

### n8n (recommended for integration layer)
400+ integrations, visual builder, self-hostable. Strong AI agent node. Data stays on infrastructure. Fair-code license means some enterprise features require payment, but the community edition is comprehensive.

### Activepieces
644+ integrations, MIT core. All 280+ connectors available as MCP servers. Growing rapidly, but less mature than n8n.

---

## Feature Comparison Matrix

| Capability | Flowable | n8n | LangGraph | Airflow | Temporal | Conductor |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| Visual process mapping (BPMN) | **Yes** | No | No | No | No | No |
| Process execution | **Yes** | Yes | Yes | Yes | Yes | Yes |
| Human-in-the-loop | **Excellent** | Basic | **Excellent** | Good | Good | Good |
| AI agent orchestration | **Yes** (new) | Basic | **Excellent** | Limited | Limited | Good |
| 400+ integrations | No | **Yes** | No | Limited | No | No |
| Case management (CMMN) | **Yes** | No | No | No | No | No |
| Decision tables (DMN) | **Yes** | No | No | No | No | No |
| Analytics dashboards | Commercial | Basic | Commercial | Good | Basic | Basic |
| Self-hosted | **Yes** | **Yes** | **Yes** | **Yes** | **Yes** | **Yes** |
| License | Apache 2.0 | Fair-code | MIT | Apache 2.0 | MIT | Apache 2.0 |

---

## Denmark & Public Sector Considerations

### OS2 alignment
Aarhus Kommune is part of the OS2 network (84% of Danish municipalities). Any solution should follow OS2 principles:

- Open source, prevent vendor lock-in
- Shared development across municipalities
- 25 open-source products already shared across 98 municipalities

Building an orchestration platform as an OS2 product would multiply the value and share the development cost.

### Data sovereignty
Self-hosted solutions are essential for GDPR compliance and municipal data policies. All recommended tools support self-hosting.

### Denmark's Digitalisation Strategy (2026)
DKK 740M budget with focus on AI advancement. An Agentic Orchestration Studio aligns directly with this strategy.

---

## Sources

- [Flowable](https://www.flowable.com/) — [GitHub](https://github.com/flowable/flowable-engine) — [Open Source](https://www.flowable.com/open-source)
- [BPMN.io](https://bpmn.io/) — [GitHub](https://github.com/bpmn-io)
- [LangGraph](https://www.langchain.com/langgraph) — [GitHub](https://github.com/langchain-ai/langgraph)
- [CrewAI](https://crewai.com/) — [GitHub](https://github.com/crewaiinc/crewai)
- [Microsoft Agent Framework](https://learn.microsoft.com/en-us/agent-framework/overview/) — [GitHub](https://github.com/microsoft/semantic-kernel)
- [n8n](https://n8n.io/) — [GitHub](https://github.com/n8n-io/n8n)
- [Activepieces](https://www.activepieces.com/) — [GitHub](https://github.com/activepieces/activepieces)
- [Apache Airflow](https://airflow.apache.org/) — [Airflow 3.1 HITL](https://airflow.apache.org/blog/airflow-3.1.0/)
- [Temporal.io](https://temporal.io/) — [GitHub](https://github.com/temporalio/temporal)
- [Conductor OSS](https://conductor-oss.org/) — [GitHub](https://github.com/conductor-oss/conductor)
- [Robot Framework](https://robotframework.org/) — [RPA Framework](https://rpaframework.org/)
- [OpenRPA](https://openiap.io/openrpa) — [GitHub](https://github.com/open-rpa/openrpa)
- [CIB seven](https://cibseven.org/en/) (Camunda 7 fork)
- [Operaton](https://operaton.org/) (Camunda 7 fork)
- [OS2 Denmark](https://interoperable-europe.ec.europa.eu/collection/open-source-observatory-osor/os2-public-collaboration-open-source)
