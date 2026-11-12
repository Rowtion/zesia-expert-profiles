[English](README.md) | 简体中文

# 则灵（zesia）· 专家 Profile

面向 Agent 的可追溯咨询方法。每份 Profile 定义专业能力的适用范围、应检查的证据，以及这些检查如何改变建议。当前包含软件、数据、科学、产品和商业方向的 **12 个细分专家及 1 个通用回退专家**。

## 浏览专家

| Profile | 决策重点 |
| --- | --- |
| [后端架构](profiles/backend-architecture.json) | 状态归属、幂等、并发、API 契约与迁移 |
| [运行时排障](profiles/runtime-debugging.json) | 复现、竞争假设、区分性测试与回归检查 |
| [服务可靠性](profiles/service-reliability.json) | 故障控制、重试放大、不确定副作用与恢复 |
| [安全审查](profiles/security-review.json) | 威胁模型、授权边界、凭证及有证据支持的发现 |
| [数据管线](profiles/data-pipeline.json) | 行粒度、Schema 演进、重放与对账 |
| [统计推断](profiles/statistical-inference.json) | 估计目标、独立采样单位、不确定性与多重检验 |
| [因果推断](profiles/causal-inference.json) | 干预效应、识别、混杂与分阶段上线 |
| [实验设计](profiles/experiment-design.json) | 随机化、主要结局、护栏、功效与停止规则 |
| [生物信息学](profiles/bioinformatics.json) | 实验设计、生物学重复、参考兼容性与批次效应 |
| [产品需求](profiles/product-requirements.json) | 不完整需求、有边界的交付物与可观察验收 |
| [用户研究](profiles/user-research.json) | 方法选择、参与者独立性、综合归纳与泛化 |
| [财务分析](profiles/financial-analysis.json) | 财务口径、营运资金、差异与敏感性分析 |
| [通用咨询](profiles/general.json) | 缺乏足够专家上下文时的决策支持 |

[catalog.json](catalog.json) 提供发现元数据，包括路由说明和相邻专家之间的边界。

## 使用 Profile

1. 根据当前决策匹配专家的 `scope`、`useWhen` 和 `distinguishFrom`。
2. 将有条件的诊断检查、证据要求、质量检查和风险规则与咨询策略一起加载。
3. 提供实际目标、原始回复、用户反馈、已尝试操作、观察结果及相关资料。
4. 在结果中记录 Profile 版本及来源，并用证据复核建议。

诊断检查包含四个操作部分；下面保留机器可读字段与原始英文示例：

```json
{
  "id": "effective-n",
  "when": "When observations share people, sites or time periods",
  "check": "Identify the independent sampling unit and clustering or repeated measurements.",
  "decisionImpact": "Use uncertainty aligned with effective replication rather than the raw row count.",
  "sourceRefs": ["primary"]
}
```

`sourceRefs` 对应 Profile 的 `sources` 数组。完整机器契约见 [expert-profile.schema.json](schema/expert-profile.schema.json)，字段语义、更新规则和接入方式见[规范](docs/specification.md)。

## 验证

要求 Node.js 24+、pnpm 10.29.3。

```sh
pnpm install --frozen-lockfile
pnpm test
```

验证覆盖 JSON Schema、来源与相邻专家引用、原始来源文件字节及许可证哈希，并检查发现目录与 Profile 是否一致。验证在本地运行，不需要模型凭证。

## 整理原则与证据

细分专家参考 Agency Agents、Scientific Agents、VoltAgent 和 Claude Skills 的选定内容。每项改编保留来源路径、不可变提交、SHA-256、许可信息、相关段落和修改说明；原始公开资料与版权声明保存在 [third_party/consultant-profiles](third_party/consultant-profiles)。

当前标记为 `engineering_curated`，更广泛的专业验证仍待完成。早期合成对照观察到有用的方法细节，也发现仍有过度表述；专家提示词还增加了 token 和延迟。这些观察支持继续评估，不能证明稳定的准确率或成本优势。[评估指南](docs/evaluation.md)说明可复现的对照方法。

领域知识服务状态为 `not_connected`。`knowledgePolicy` 只规定未来接入所需的优选来源和刷新条件，当前知识时效性与专业适用性需要按实际决策独立核实。

新增专家前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)，证明其独立决策边界、可追溯的有条件方法，以及可接受/不可接受结论示例。

本项目自行编写的内容使用 MIT；改编内容同时保留 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) 中的原始 MIT 声明，分发时需一并保留。
