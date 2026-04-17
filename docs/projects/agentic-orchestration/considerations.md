<small>**Project:** Agentic Orchestration Studio</small>

# Considerations

Open questions and areas that need clarification before moving from research to implementation.

---

## Target Audience

**Who is the platform for?**

| Audience                   | What they need                                    | Priority  |
| -------------------------- | ------------------------------------------------- | --------- |
| **IT developers**          | APIs, code-level orchestration, agent development | Phase 1   |
| **Process owners**         | Visual process mapping, monitoring dashboards     | Phase 1–2 |
| **Business unit managers** | ROI dashboards, process status overview           | Phase 2   |
| **Caseworkers**            | Task inbox (human-in-the-loop), process status    | Phase 1   |
| **Municipal leadership**   | Strategic overview, aggregate business value      | Phase 3   |

!!! warning "Open question"
The platform's UI complexity depends entirely on this answer. If only IT uses it, we can be more technical. If process owners need to model processes themselves, we need a polished visual modeler.

---

## Roles and Permissions

**Who can do what?**

| Role             | Map processes | Deploy automations | Handle tasks | View dashboards | Admin |
| ---------------- | :-----------: | :----------------: | :----------: | :-------------: | :---: |
| Administrator    |      Yes      |        Yes         |     Yes      |       Yes       |  Yes  |
| Process designer |      Yes      |         No         |      No      |       Yes       |  No   |
| Developer        |      Yes      |        Yes         |      No      |       Yes       |  No   |
| Caseworker       |      No       |         No         |     Yes      |     Limited     |  No   |
| Manager          |      No       |         No         |      No      |       Yes       |  No   |

!!! warning "Open questions"
    - How does this map to existing municipal AD groups?
    - Should permissions be per-process or global?
    - Who approves deploying a new automation to production?
    - Do we need an approval workflow for process changes themselves?

---

## Existing Systems Integration

**Day-one integrations to plan for:**

| System                          | Type                        | Integration approach                    |
| ------------------------------- | --------------------------- | --------------------------------------- |
| **KMD** (various)               | Case management, finance    | n8n connector or REST API               |
| **SBSYS**                       | Document/case management    | n8n connector or REST API               |
| **OS2Forms**                    | Form submission             | Webhook trigger                         |
| **Active Directory / Entra ID** | Identity, groups            | Keycloak federation (or direct OIDC)    |
| **Email (Exchange)**            | Notifications, task routing | n8n email connector                     |
| **Existing RPA bots**           | Current automations         | Robot Framework migration or API bridge |

!!! warning "Open question"
What other systems are critical? We need an inventory of systems currently involved in automated processes.

---

## Security and Data Sovereignty

### Data classification

- What data flows through the platform? Personal data (CPR numbers)? Sensitive case data?
- If AI agents process municipal data, where does inference happen? On-premise only?
- Audit trail requirements — what must be logged and for how long?

### Network architecture

- Should the platform run in the municipality's existing infrastructure?
- DMZ placement for components that receive external input (e.g., form submissions)?
- Network segmentation between process engine, agent layer, and external integrations?

### Compliance

- GDPR data processing agreements for any cloud components
- Danish public sector security requirements (ISO 27001, ISAE 3402?)
- Data retention and right-to-deletion in process logs

!!! warning "Open question"
A security review must happen before any prototype handles real data. The PoC should use synthetic data only.

---

## Scalability

### User scaling

| Scenario               | Users       | Implications                         |
| ---------------------- | ----------- | ------------------------------------ |
| IT team only           | 10–30       | Minimal infrastructure, simple auth  |
| IT + process owners    | 50–200      | Need visual tools, role-based access |
| Org-wide (caseworkers) | 1,000–5,000 | Task inbox at scale, SSO required    |
| Cross-municipal (OS2)  | 10,000+     | Multi-tenant, shared infrastructure  |

A key advantage of open-source: no per-user licensing. The platform scales with infrastructure, not license cost.

### Technical scaling

The minimal stack (Flowable + n8n + Grafana + PostgreSQL) handles hundreds of concurrent processes on modest hardware. For thousands, add:

- PostgreSQL read replicas
- Flowable async executors
- n8n worker scaling
- Redis for caching

---

## OS2 Collaboration

### The opportunity

If we build this as an OS2 product, we:

- Share development costs across municipalities
- Get contributions from other IT departments
- Establish a standard for process orchestration in Danish public sector
- Align with Denmark's Digitalisation Strategy (DKK 740M for AI, 2026)

### Questions

- [ ] Is there existing interest from other municipalities?
- [ ] Would this fit under an existing OS2 product group, or need a new one?
- [ ] What governance model? OS2 standard operating procedures?
- [ ] Should we present at an OS2 event to gauge interest?

---

## Funding and Business Case

### How to sell it internally

The key argument is not "we need a cool platform" — it's:

1. **Fragmentation has a cost** — maintaining N separate automations in N different systems costs more than one shared platform
2. **Visibility has value** — leadership can't invest in what they can't see or measure
3. **Scaling is blocked** — without shared tooling, every new automation starts from scratch
4. **Vendor risk** — commercial platforms create dependency; open-source creates sovereignty

### What to quantify

- [ ] How many automations exist today? In how many different systems?
- [ ] What is the annual maintenance cost of the current fragmented approach?
- [ ] How many FTEs are spent on manual process steps that could be automated?
- [ ] What is the estimated time-to-value for a new automation today vs. with a shared platform?

### Funding models

- Internal IT budget (Phase 1: PoC)
- Digitalisation strategy funds (Phase 2: pilot)
- OS2 co-funding if other municipalities join (Phase 3: production)

---

## Next Steps to Resolve

| Question                                | Owner             | Deadline |
| --------------------------------------- | ----------------- | -------- |
| Define target audience and roles        | Project team      | TBD      |
| Inventory current automations           | IT department     | TBD      |
| Security classification of process data | IT security       | TBD      |
| OS2 interest from other municipalities  | Project lead      | TBD      |
| Quantify cost of current fragmentation  | Business analysis | TBD      |
