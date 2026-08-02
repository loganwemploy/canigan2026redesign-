# Ralph execution prompt

You are improving Canigan Health Options one verified story at a time.

Before acting:

- Read `.ralph/README.md`, `.ralph/prd.json`, `.ralph/claims.md`, and `.ralph/progress.md`.
- Preserve unrelated work and the frozen About Me section.
- Choose the highest-priority story whose `complete` value is `false`.
- Add an entry to `progress.md` with an understanding score and evidence score.
- The minimum score for both is `0.85`. If either is lower, write the exact clarification or research gap and stop.

During the story:

- Make the smallest coherent implementation.
- Use only claims permitted by `claims.md`.
- Do not name prescription weight-loss brands in public copy.
- Do not frame pregnancy as a weight-loss opportunity.
- Do not imply typical or guaranteed Ambassador earnings.
- Use the HSL forest palette; do not reintroduce red.

After the story:

- Run the story's listed checks.
- Record evidence, files changed, and remaining risk in `progress.md`.
- Set `complete` to `true` only when the checks pass.
- Stop after one story so the next loop begins from clean evidence.
