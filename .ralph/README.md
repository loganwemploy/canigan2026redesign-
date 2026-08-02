# Canigan Ralph Loop

This directory is the source of truth for the audience-personalization rebuild.

## Loop contract

1. Read `PROMPT.md`, `prd.json`, `claims.md`, and `progress.md` in that order.
2. Select the highest-priority incomplete story in `prd.json`.
3. Score understanding from `0.00` to `1.00` before changing code.
4. Continue only at `0.85` or higher.
5. If confidence is lower, add a blocking question to `progress.md` and stop.
6. Implement one story, run its quality gates, then update both `prd.json` and `progress.md`.
7. Never weaken the claim rules in `claims.md` to make copy sound stronger.

The About Me section is frozen: its copy, image, and section composition are not part of this rebuild.
