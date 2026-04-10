# Review Conventions

Use these shortcodes inline in any project document to annotate feedback.

## Shortcodes

| Shortcode | Meaning | Example |
|---|---|---|
| `[CHANGE: ...]` | Reword or rework this section | `[CHANGE: soften the tone here]` |
| `[ADD: ...]` | Add new content at this location | `[ADD: mention GDPR implications]` |
| `[REMOVE]` | Delete this section or line | `[REMOVE]` |
| `[MOVE: ...]` | Move this content elsewhere | `[MOVE: belongs in the dashboard section]` |
| `[QUESTION: ...]` | Open question, needs discussion | `[QUESTION: is this estimate reliable?]` |
| `[GOOD: ...]` | Keep this — positive signal | `[GOOD: I like this phrasing]` |

## How it works

1. Add shortcodes directly in the markdown files, on the line above or next to the relevant content
2. Tell Claude to "process my annotations" or "apply my review"
3. Claude will apply all changes, preserve `[GOOD]` content as-is, and flag `[QUESTION]` items for discussion
4. All shortcodes are removed after processing
