English | [简体中文](README.zh-CN.md)

# ZESIA Expert Profiles

Source-traceable consultation methods for agents, maintained by ZESIA.

Each profile defines when its expertise applies, the evidence to inspect, and how those checks should change a recommendation. The initial collection contains **12 specialist profiles and one general fallback** across software, data, science, product and business.

## Browse the profiles

| Profile | Decision focus |
| --- | --- |
| [Backend architecture](profiles/backend-architecture.json) | State ownership, idempotency, concurrency, API contracts and migrations |
| [Runtime debugging](profiles/runtime-debugging.json) | Reproduction, competing hypotheses, discriminating tests and regression checks |
| [Service reliability](profiles/service-reliability.json) | Incident containment, retry amplification, ambiguous effects and recovery |
| [Security review](profiles/security-review.json) | Threat models, authorization boundaries, secrets and supported findings |
| [Data pipelines](profiles/data-pipeline.json) | Row grain, schema evolution, replay and reconciliation |
| [Statistical inference](profiles/statistical-inference.json) | Estimands, independent sampling units, uncertainty and multiplicity |
| [Causal inference](profiles/causal-inference.json) | Intervention effects, identification, confounding and staggered rollout |
| [Experiment design](profiles/experiment-design.json) | Randomization, primary outcomes, guardrails, power and stopping rules |
| [Bioinformatics](profiles/bioinformatics.json) | Assay design, biological replication, reference compatibility and batch effects |
| [Product requirements](profiles/product-requirements.json) | Incomplete requirements, bounded deliverables and observable acceptance |
| [User research](profiles/user-research.json) | Method choice, participant independence, synthesis and generalization |
| [Financial analysis](profiles/financial-analysis.json) | Financial basis, working capital, variance and sensitivity |
| [General consultation](profiles/general.json) | Decisions with insufficient specialist context |

[catalog.json](catalog.json) provides discovery metadata, including routing descriptions and boundaries between adjacent experts.

## Use a profile

1. Select an expert whose `scope`, `useWhen` and `distinguishFrom` fit the current decision.
2. Load its conditional diagnostic checks, evidence requirements, quality checks and risk rules alongside your consultation policy.
3. Supply the actual objective, original response, feedback, attempted actions, observed outcomes and relevant materials.
4. Record the profile version and sources with the result. Review the recommendation against the evidence.

A diagnostic check has four operational parts.

```json
{
  "id": "effective-n",
  "when": "When observations share people, sites or time periods",
  "check": "Identify the independent sampling unit and clustering or repeated measurements.",
  "decisionImpact": "Use uncertainty aligned with effective replication rather than the raw row count.",
  "sourceRefs": ["primary"]
}
```

`sourceRefs` resolves to the profile's `sources` array. The complete machine-readable contract is [expert-profile.schema.json](schema/expert-profile.schema.json). See the [specification](docs/specification.md) for field semantics, update rules and integration guidance.

## Validate

Use Node.js 24 or newer and pnpm 10.29.3.

```sh
pnpm install --frozen-lockfile
pnpm test
```

Validation checks every profile against JSON Schema, resolves source and neighbor references, verifies original source bytes and license hashes, and compares the discovery catalog with the profiles. Validation runs locally without a model credential.

## Curation and evidence

The specialist profiles adapt selected material from Agency Agents, Scientific Agents, VoltAgent and Claude Skills. Each adaptation retains source paths, immutable commits, SHA-256 hashes, license information, relevant sections and a description of changes. Original public reference material and copyright notices are preserved under [third_party/consultant-profiles](third_party/consultant-profiles).

Profiles are currently marked `engineering_curated`, with broader professional validation pending. Initial synthetic comparisons found useful methodological detail and remaining overstatements. Specialist prompting also added tokens and latency. These observations support further evaluation, and do not establish a consistent accuracy or cost advantage. The [evaluation guide](docs/evaluation.md) describes a reproducible comparison process.

The domain knowledge service has `not_connected` status. `knowledgePolicy` specifies preferred sources and refresh triggers for a future connection. Current knowledge and professional suitability require independent verification for the actual decision.

## Contribute

Follow [CONTRIBUTING.md](CONTRIBUTING.md). A proposed profile should demonstrate a distinct decision boundary, conditional methods with provenance, and examples of acceptable and unacceptable conclusions.

## License

MIT for ZESIA-authored material. Adapted material also carries the original MIT notices described in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Retain the applicable notices when redistributing.
