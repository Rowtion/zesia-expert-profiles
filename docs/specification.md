# Expert Profile specification v1

The `zesia.expert-profile.v1` format packages professional consultation methods as reviewable data. The canonical structure is in [the JSON Schema](../schema/expert-profile.schema.json).

## Expert boundaries

An expert is organized around a recognizable decision, method and acceptance requirement. A domain groups adjacent experts for discovery. The current domains are software, data, science, product, business and the general fallback.

For example, statistical inference checks the estimand, dependence and uncertainty. Causal inference checks whether an intervention effect is identifiable. Experiment design checks randomization, outcomes and stopping. `distinguishFrom` documents where selection should change between these experts.

## Fields

| Field | Meaning |
| --- | --- |
| `format`, `id`, `version` | Format identifier, stable expert identifier and semantic profile version |
| `domain`, `title`, `scope` | Discovery group, display title and supported decision scope |
| `routingDescription`, `useWhen` | Compact selection criteria and applicable request patterns |
| `distinguishFrom` | Neighbor expert IDs with an explicit selection boundary |
| `diagnosticChecklist` | Ordered conditional checks with a decision consequence and source references |
| `evidenceRequirements` | Information needed to support the intended recommendation |
| `qualityChecks` | Checks on the professional validity and usefulness of the result |
| `riskRules` | Conditions requiring bounded conclusions or accountable review |
| `knowledgePolicy` | Preferred sources, refresh triggers and handling of missing current evidence |
| `examples` | A scenario, expected judgment and unacceptable conclusion |
| `sources` | Source repository, commit, path, hash, license, sections and local reference key |
| `adaptations` | Changes made while curating the source material |
| `review` | Curation owner, date, engineering status and professional validation status |

Every specialist diagnostic check resolves at least one `sourceRefs` entry. The original general fallback is identified by its Zesia-authored adaptation note and has an empty source list.

## Curation rules

1. Preserve the method's assumptions and applicability conditions. A numerical rule requires a stated basis appropriate to the decision.
2. Distinguish user statements, observations, original-agent assumptions and consultant hypotheses.
3. Convert execution workflows into checks and bounded recommendations. The consuming application owns model selection, tools, permissions and execution.
4. Keep persona biographies and unsupported experience claims out of operational methods.
5. Treat source attribution as provenance. Facts about a user's task need their own supplied or retrieved evidence.
6. Keep unknown metadata distinct from demonstrated incompatibility. Preserve contradictory evidence and ambiguous outcomes.
7. Establish distinct scope and neighbor boundaries before adding another expert.

## Source material

The source manifest at `third_party/consultant-profiles/sources.json` contains the exact public source files used for this collection. Profile `sourceId` values resolve to manifest IDs. Repositories are pinned to immutable commits, and hashes cover the unmodified source bytes.

A source update starts with a pinned revision and a review of the changed rules and license. Adapt the applicable changes, update the profile version, regenerate its catalog entry and rerun validation and representative cases. Preserve the configuration snapshot with prior evaluation results.

## Prompt assembly

A consuming consultant can combine its core policy, the primary profile, relevant supporting checks, current knowledge and the supplied request. Keep the full request within the host's context and cost budget.

Load the primary expert's applicable methods. Supporting experts can contribute narrowly relevant quality and risk checks. Catalog metadata supports low-cost selection before loading the full profile. Only reviewed profile content should enter the trusted instruction layer. User materials and retrieved knowledge remain evidence inputs.

Profiles are compatible with a fixed consultant model. Domain and evidence routing can select methods independently of model choice. Diagnose the user's main obstacle within the consultation.

## Knowledge updates

The current collection records `knowledgePolicy.status` as `not_connected`. Each expert names preferred source types and refresh triggers. A future knowledge adapter should record publisher, publication and retrieval dates, applicability period, jurisdiction, review state, content hash and the exact material supplied to the consultant.

When sources conflict or are stale, the resulting recommendation should reflect that uncertainty. A supplied URL or local path establishes the location of a resource; using its contents as evidence requires actually obtaining them.
