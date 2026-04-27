<small>**Project:** ITK Dev Design System</small>

# Diagrams

Mermaid is wired into VitePress via `vitepress-plugin-mermaid`. Use it
inside any research project's Markdown for flowcharts, sequence diagrams,
gantt charts, and more.

::: info Tip
Diagrams live in Markdown, not in prototypes. For interactive charts
inside mock HTML files, see [Data viz](/projects/design-system/data-viz).
:::

## Flowchart

```mermaid
flowchart LR
  A[User request] --> B{Authenticated?}
  B -->|Yes| C[Load dashboard]
  B -->|No| D[Redirect to login]
  C --> E[Show personalised feed]
  D --> F[MitID]
  F --> C
```

## Sequence diagram

```mermaid
sequenceDiagram
  autonumber
  participant Citizen
  participant Portal
  participant Backend
  participant Notifier

  Citizen->>Portal: Submit hearing response
  Portal->>Backend: POST /hearings/42/responses
  Backend-->>Portal: 201 Created
  Portal-->>Citizen: Confirmation screen
  Backend->>Notifier: Queue email receipt
  Notifier-->>Citizen: Email with reference
```

## State diagram

```mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> InReview: submit
  InReview --> Approved: approve
  InReview --> Draft: request changes
  Approved --> Published: publish
  Published --> Archived: archive
  Archived --> [*]
```

## Gantt

```mermaid
gantt
  title Project timeline
  dateFormat  YYYY-MM-DD
  section Research
  User interviews          :a1, 2026-02-01, 14d
  Synthesis                :after a1, 7d
  section Design
  Wireframes               :2026-02-22, 10d
  Prototyping              :2026-03-04, 14d
  section Build
  Backend API              :2026-03-18, 21d
  Frontend                 :2026-03-25, 21d
```

## Pie

```mermaid
pie title Traffic sources
  "Organic" : 42
  "Direct" : 28
  "Referral" : 18
  "Campaign" : 12
```

## ER diagram

```mermaid
erDiagram
  CITIZEN ||--o{ RESPONSE : submits
  HEARING ||--o{ RESPONSE : receives
  HEARING {
    int id
    string title
    date deadline
  }
  RESPONSE {
    int id
    int hearing_id
    int citizen_id
    text content
  }
  CITIZEN {
    int id
    string name
    string mitid
  }
```

## Theming

Mermaid respects VitePress's light/dark mode automatically. For
per-diagram tweaks, start the code block with `%%{init: ...}%%`:

````markdown
```mermaid
%%{init: { "theme": "base", "themeVariables": {
  "primaryColor": "#007ba6",
  "primaryTextColor": "#fff",
  "lineColor": "#495057"
}}}%%
flowchart LR
  A --> B
```
````
