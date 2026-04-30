<small>**Project:** Climate Awareness Nudging</small>

# Integration Points — Where to Nudge

## Open WebUI

Open WebUI is a self-hosted frontend for LLMs. It has a plugin/pipeline system and customizable UI.

### UI-level integration points

| Location | Nudge type | Difficulty | Notes |
|---|---|---|---|
| **Chat input area** | Prompt complexity hint (leaf icon) | Low | Add icon next to send button that reacts to prompt length |
| **Chat input area** | "Do you need AI for this?" tooltip | Medium | Requires simple query classification |
| **Sidebar / header** | Session cost ticker | Low | Small text showing running estimate |
| **New chat screen** | Purpose selector tags | Low | Optional tags: Learning / Work / Exploring / Fun |
| **After N messages** | Conversation length banner | Low | Dismissable info banner |
| **Response footer** | Per-response cost estimate | Low | Small text below each AI response |
| **Settings / Profile** | Personal usage dashboard | Medium | New page with charts and equivalences |
| **Admin panel** | Org-wide usage dashboard | Medium | Aggregated, anonymized stats |
| **Model selector** | Model efficiency labels | Low | Show relative cost/efficiency per model |

### Technical approaches in Open WebUI

1. **Pipelines (server-side)** — intercept requests/responses, add metadata (token count, estimated cost), inject nudge logic
2. **Custom JS/CSS injection** — Open WebUI supports custom scripts; lightweight UI nudges can be added this way
3. **Filter pipelines** — analyze prompts before sending, can add pre-request nudges
4. **Response metadata** — attach cost estimates to responses, render in UI

### Specific pipeline ideas

- **Token counter pipeline** — counts input/output tokens, converts to estimated energy/CO2, attaches as metadata
- **Simplicity detector pipeline** — classifies if a query is "too simple for AI", suggests alternatives
- **Redundancy detector pipeline** — compares new prompt to recent conversation history, flags repetition
- **Chain detector pipeline** — detects "generate-then-summarize" patterns across org conversations

---

## Claude Code (CLI)

Claude Code is a terminal-based AI coding assistant. Nudging here must respect the CLI paradigm — concise, non-intrusive, text-based.

### Integration points

| Location | Nudge type | Difficulty | Notes |
|---|---|---|---|
| **Status line** | Session token/cost counter | Low | Already has a status line — add cost estimate |
| **After response** | Per-response cost footnote | Low | Small line showing tokens used + estimate |
| **Session end** | Session summary | Low | "This session: X tokens, ~Yg CO2" |
| **Periodic (every N messages)** | Reflection prompt | Low | "Long session — would a fresh start be more efficient?" |
| **Model selection** | Efficiency suggestion | Medium | "This task might work with Haiku (10x cheaper/greener)" |
| **Hooks (post-response)** | Custom awareness hook | Low | Users can add shell hooks that display info after each response |

### Technical approaches in Claude Code

1. **Hooks system** — Claude Code supports pre/post hooks; a post-response hook could display cost info
2. **Custom status line** — configure the status line to show running cost estimates
3. **MCP server** — build a small MCP server that tracks usage and provides cost data
4. **Wrapper script** — a thin shell wrapper that tracks and reports on Claude Code usage

### Specific implementation ideas

- **Post-response hook** — shell script that reads token count from the response and displays a one-line cost estimate
- **Session summary hook** — on session end, display total usage and CO2 equivalent
- **Weekly digest** — cron job that aggregates usage data and emails/displays a weekly summary
- **`.claude/climate-config`** — user config for preferred equivalence units, nudge frequency, etc.

---

## General (platform-agnostic)

### API/proxy layer

For organizations running their own AI gateway (like AarhusAI), a proxy layer can:

1. **Log all requests/responses** with token counts and model info
2. **Inject response headers** with cost metadata
3. **Serve a dashboard** aggregating usage across all frontends
4. **Apply rate-based nudges** — if a user exceeds a threshold, add a gentle note to the next response
5. **Detect organizational patterns** — like AI-generated-text-to-AI-summarize chains

For self-hosted inference where the gateway sits on the same machines as the GPUs, [carbontracker](https://carbontracker.info/) is a natural fit for the measurement layer: it samples real hardware power draw and combines it with regional grid carbon intensity, replacing bottom-up token-based estimates with measured energy. Wrap inference calls with the Python library or run the CLI alongside the workload, then attach the resulting per-request energy/CO2 to the response headers proposed in [CO2 Research § 5](co2-research.md#5-guidance-to-hosting-providers). For hosted models (OpenAI, Anthropic, etc.) carbontracker can't reach the hardware, so estimates remain the only option until providers expose telemetry themselves.

### Shared components

Regardless of frontend, these components are reusable:

- **Cost estimation library** — token count → energy → CO2 conversion
- **Equivalence formatter** — "Xg CO2" → human-friendly comparison
- **Usage storage** — lightweight database for tracking per-user usage over time
- **Nudge rule engine** — configurable rules for when/how to nudge
