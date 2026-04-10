<small>**Project:** Climate Awareness Nudging</small>

# Nudge Ideas

## Core Design Principles

1. **Inform, don't shame** — show data neutrally, let the user draw conclusions
2. **Low friction** — awareness should not interrupt workflow
3. **Contextual** — nudge at decision points, not constantly
4. **Actionable** — give the user something they can actually do differently
5. **Opt-in depth** — summary by default, details on demand

---

## Nudge Categories

### A. Pre-request Nudges (before the user sends a prompt)

1. **Prompt complexity hint** — a subtle indicator showing estimated resource usage based on prompt length/complexity (e.g., a small leaf icon that changes color: green → yellow → orange). *Next step: create a UI mock of this.*
2. **"Save by doing it yourself"** — for simple queries, tie the nudge to the session cost ticker: "Check the time on your device and save ~Xg CO2" / "Calculate this yourself and save ~Xg CO2". Makes the saving tangible rather than abstract.
3. **Purpose selector** — optional tag when starting a conversation: "Learning", "Exploration", "Work task", "Just chatting". Not enforced, but makes users reflect. If the organization has skills or tools available (e.g., a calculator, search engine, templates), surface these as alternatives alongside the selector.
4. **Audience-aware suggestions** — instead of nudging output format directly, prompt the user to consider their audience: "Who will read this? If it's a colleague, bullet points may be more respectful of their time — and use less compute." This reframes efficiency as better communication, not just resource saving. *Open question: how to detect when this nudge applies — keyword triggers ("write an email", "draft a report") or prompt length thresholds?*

### B. In-session Nudges (during a conversation)

5. **Session cost ticker** — a small, unobtrusive counter showing estimated CO2/energy for the current session, using relatable everyday equivalences (e.g., "~ 3g CO2 · ≈ boiling water for 1 cup of tea"). Users can choose their preferred equivalence unit in settings.
6. **Conversation length awareness** — after N messages, offer a concrete action rather than an abstract question: "This conversation is getting long. Want me to summarize it into a single focused prompt you can start fresh with?" Provides a button/action so the user doesn't have to do the condensing themselves. *Open question: validate whether this actually reduces total token usage — a summary + new conversation might cost more than continuing.*
7. **Redundancy detection** — if the user asks the same question rephrased, suggest: "This looks similar to your earlier question. Want to refine that answer instead?"
8. **Generation size awareness** — when requesting long-form output, a note: "Generating 2000 words uses ~Xg CO2. Do you need the full length, or would a summary work?" *Priority: this is a high-impact nudge — implement early.*

### C. Post-session / Dashboard Nudges

9. **Personal usage dashboard** — weekly/monthly summary of usage with relatable equivalences. Expand the equivalence library beyond driving/phone charging to everyday activities: boiling a kettle, cups of tea, slices of toast, minutes of hot shower. Let users pick their preferred unit. (e.g., "This week: 45 queries ≈ 12g CO2 ≈ boiling water for 8 cups of tea")
10. **Usage trends** — show if usage is increasing/decreasing over time. Flag significant spikes with a neutral note: "Your usage was 3x higher than usual this week."
11. **Value reflection** — "Of your 45 queries this week, which were most valuable to your work?" (optional self-rating)
12. **Team/org comparison** — anonymized comparison: "Your usage is typical / above average / below average for your team" (use carefully — can backfire)
13. **Tips feed** — contextual tips based on usage patterns: "You often generate long texts. Consider bullet points — they use less compute and are often more useful"

### D. Systemic / Workflow Nudges

14. **AI chain detection** — detect patterns like "generate long text → someone else summarizes it" and suggest: "Could this be a bullet list from the start?"
15. **Batch encouragement** — "You've started 5 separate conversations today. Batching related questions in one conversation can be more efficient"
16. **Model selection nudge** — when a simpler model would suffice: "This looks like a simple task. A lighter model would use 10x less energy and give the same result"
17. **Cache/reuse awareness** — "This question has been asked before in your org. Here's the previous answer — reuse it?"

---

## Equivalence Examples (making CO2 tangible)

### AI usage
- 1 LLM query ≈ 1-10g CO2 (varies widely by model/length)
- 1 image generation ≈ 2-5g CO2
- 1 Google search ≈ 0.2g CO2

### Everyday activities (for relatable comparisons)
- Boiling a kettle ≈ 15g CO2
- Toasting a slice of bread ≈ 30g CO2
- Making a cup of coffee ≈ 50-100g CO2 (full production chain)
- Sending an email ≈ 4g CO2
- 1 minute of hot shower ≈ 90g CO2
- 1 hour of Netflix ≈ 36g CO2
- 1 washing machine cycle ≈ 500g CO2
- 1 km by car ≈ 120g CO2

*Note: These numbers are approximate and debated. Transparency about uncertainty is itself a form of honesty. Consider showing ranges rather than point estimates.*

---

## Anti-patterns to Avoid

- **Guilt counters** — a big red number counting up creates anxiety, not awareness
- **Blocking flows** — never prevent the user from doing their work
- **False precision** — don't claim exact CO2 numbers when estimates vary 10x
- **Moralizing tone** — "You're wasting resources" will drive users away
- **Gamification that backfires** — leaderboards can create shame or competitive waste-reduction that hurts productivity
