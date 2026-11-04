# Evaluating a profile

Use representative decisions and complete configuration snapshots to test whether a profile helps the target consultant model.

## Comparison

For each case, compare the same core consultation policy and model with a general fallback, a curated specialist, and optionally the complete upstream profile. Keep the input, model settings, tool access and output budget consistent. Repeat across cases and runs before drawing performance conclusions.

Cases should include incomplete context, failed prior attempts, disagreement between the user and original agent, cross-domain constraints and decisions requiring current evidence. Supplied facts should distinguish a precise diagnosis from a plausible-sounding general answer.

## Review rubric

| Dimension | Review question |
| --- | --- |
| Intent | Does the recommendation address the actual decision and explicit user feedback? |
| Evidence | Are observed facts, missing information and hypotheses distinguished? |
| Method | Are the specialist method's assumptions and limits respected? |
| Actionability | Can the original agent take a concrete next step with observable success criteria? |
| Boundaries | Are uncertain effects, permissions and consequential assumptions handled accurately? |
| Cost | What are the actual input/output tokens, retries and billed or reported costs? |
| Latency | What does the end-to-end request take, including routing and retrieval? |

Separate structural validation from professional review. A valid JSON response can still contain unsupported factual claims or an invalid method.

## Initial observations

An initial Zesia pilot used four synthetic cases involving staggered rollout, fully confounded omics, ambiguous payment effects and biased user interviews. General and matched-specialist conditions were each called once per case, then repeated after targeted edits to three profiles.

The repeated comparison produced useful domain detail alongside remaining overstatements. The specialist condition's reported reference inference cost was about 24.5% higher in that small sample. This pilot does not establish a stable quality improvement. Results from another model or task collection require their own assessment.

## Evidence handling

Store complete inputs, responses, core policy, profile snapshots, exact model IDs, sources, usage, routing and review notes in an evaluation record. Use synthetic or authorized de-identified cases for public contributions. The repository excludes private task data, credentials and local runtime captures.
