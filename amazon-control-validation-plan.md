# Plan: Amazon Control 验证与修复计划

**Generated**: 2026-08-13

## Overview

项目能启动，核心本地任务服务、聊天路由、素材导入、CSV/JSON 预览和历史 JSON 落盘的基础链路可运行。冒烟测试已验证 12 个站点、聊天自动路由、素材复制与本地保存正常。

但当前版本与“可扩展 AI 运营平台”的目标仍有明显落差。最核心的问题是：聊天不是真正调用 AI，而是规则分析；远程 API 只“测试”不“同步”；多项目、审批执行和 14 页面深度大多是占位实现。本计划只做规划，不直接改业务代码。

## Prerequisites

- Node.js 与 Electron 环境可用。
- `npm run dev` 可启动完整版，`npm run package:win` 可打包。
- 保持 D 盘默认数据目录，但新增可配置数据目录能力。
- 保持“读自动、写审批”的安全边界。
- 后续开发以 `PROJECT_BRIEF.md`、`CURRENT_PLAN.md`、`DECISIONS.json`、`NEXT_TASKS.md` 为上下文源。

## Dependency Graph

```text
T0 ──┬── T1 ──┬── T8 ──┐
     │        │         │
T4 ──┼── T5 ──┼── T6 ───┼── T10
     │        │         │
T3 ──┼── T9 ──┼── T2 ───┘
     │        │
     └── T11 ─┘
```

## Tasks

### T0: 共享 AI 响应契约与工具注册契约
- **depends_on**: []
- **location**: `plugin-service/server.js`, `docs/`
- **description**: 定义 AI 助手一次 turn 的统一返回结构：`usedContext`、`toolRuns`、`missingData`、`decision`、`confidence`、`nextActions`、`approvalRequired`。定义工具/技能注册项的输入 schema、输出 schema、风险等级、适用模块和审批要求。T1/T6/T7/T8/T10 都消费这份契约。
- **validation**: JSON schema 文件可被 Node 读取；T1 的本地规则回退和 AI 返回都能映射到同一结构。
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T1: AI Provider 与真实聊天编排
- **depends_on**: [T0, T4]
- **location**: `plugin-service/server.js`, `web-dashboard/app.js`
- **description**: 将 `submitAssistantMessageWithAssets` 从纯规则分析升级为“AI 优先 + 本地规则回退”。支持 OpenAI-compatible 与 DeepSeek；聊天请求携带项目、站点、素材、导入数据、历史任务、权限上下文；返回 T0 结构。需要处理 provider 超时、畸形响应、上下文长度截断、token 上限和 prompt-injection 防护；无 Key 时明确回退。
- **validation**: 无 API Key 时规则回退可运行；配置 provider 后聊天响应来自模型且符合 T0 结构；密钥不进入源码或日志；有超时与回退触发条件。
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T2: Connector 鉴权与异步远程同步
- **depends_on**: [T4, T6]
- **location**: `plugin-service/server.js`, `electron/main.js`, `electron/preload.js`, `web-dashboard/app.js`
- **description**: 让 `testApiConnection` 和 `syncApiConnection` 支持 HTTPS 请求、鉴权头、字段映射、分页终止、超时/重试/退避、响应大小限制和 JSON 解析失败处理。保留 raw/derived 分离，原子写入，原始数据不覆盖。同步接口通过 IPC 异步返回，前端显示进度/状态。高风险写操作先进入审批。
- **validation**: 本地 mock 接口返回非空行并落盘；SP-API/Ads/Keepa/ERP 模板按字段映射生成结果；超时/重试/分页终止可验证；凭据脱敏显示。
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T3: 修复 Electron 拖拽文件路径
- **depends_on**: []
- **location**: `electron/preload.js`, `web-dashboard/app.js`
- **description**: Electron 37 中 `File.path` 已不可靠，当前 `file.path || file.name` 只拿到文件名。改为在 preload 暴露 `webUtils.getPathForFile(file)`，拖拽导入使用真实绝对路径。
- **validation**: 拖入任意目录的图片/CSV 后，素材库和导入中心显示正确路径并成功复制/读取。
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T4: 可配置数据目录与迁移
- **depends_on**: []
- **location**: `electron/main.js`, `plugin-service/server.js`, `web-dashboard/app.js`
- **description**: 保留 D 盘默认值，新增设置页数据目录选择；在 `app.whenReady` 前设置 `userData`，在 `createTaskService` 前完成迁移决策；迁移需备份、冲突处理、只读/跨卷/Unicode 路径检查、中断回滚。避免 C 盘占用。
- **validation**: 改目录后项目、历史、接口、素材能恢复；默认值仍为 D 盘；迁移失败可回滚；设置页显示实际路径。
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T5: 多项目管理持久化
- **depends_on**: [T4]
- **location**: `plugin-service/server.js`, `electron/main.js`, `electron/preload.js`, `web-dashboard/app.js`
- **description**: 新增项目 CRUD API/IPC；项目绑定站点、币种、语言、数据源、连接器；任务带 `projectId`；定义删除/级联策略和旧任务回填规则。项目建档页不再只依赖 localStorage。
- **validation**: 创建 US/DE/JP 项目后重开仍存在；删除项目时有明确级联策略；同一 ASIN 在不同项目下带对应站点上下文。
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T6: 审批模型与执行中心
- **depends_on**: [T0, T4, T5]
- **location**: `plugin-service/server.js`, `electron/main.js`, `electron/preload.js`, `web-dashboard/app.js`
- **description**: 先定义风险分类与完整写风险矩阵，再实现审批状态机和执行队列。提供 `approveAction`、`executeApprovedAction`，具备幂等、重试、回滚和审计回放。执行中心只执行低风险浏览器辅助动作或生成待执行清单；写入后台保留人工确认，不自动提交。
- **validation**: 高危任务进入审批且不能自动改后台；审批通过只进入执行队列或导出清单；重复执行幂等；审批/执行记录可恢复。
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T7: 14 个模块交互深度补齐
- **depends_on**: [T0, T2, T5, T6, T9]
- **location**: `web-dashboard/app.js`, `web-dashboard/index.html`, `web-dashboard/styles.css`, `plugin-service/server.js`
- **description**: 将通用“文本输入 + 结果”骨架扩展为各模块专属表单、预览、字段映射、结果、历史、导出。明确枚举 14 个模块，并保证每个模块展示已用数据、缺失数据、推理、风险、动作、审批和历史。重点补广告、库存、数据、利润、Listing、合规、图片、视频、上架、素材来源。
- **validation**: 每个模块页都有独立输入与输出；广告/库存/数据导入后生成更细诊断；页面不再只显示同质化占位结果。
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T8: 图片与视频多 Provider 调用
- **depends_on**: [T0, T1, T2, T9]
- **location**: `plugin-service/server.js`, `web-dashboard/app.js`
- **description**: 在 brief 基础上增加生成器选择、参数、尺寸/时长、素材引用、输出历史、本地下载/缩略图和长任务状态。支持多个图片/视频 provider，不锁死单一剪映或 OpenAI；未配置生成器时仍输出 brief。
- **validation**: 可从文字/素材生成 brief；配置 provider 后能发起调用或给出明确待接入错误；输出文件有本地路径和可回看历史。
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T9: 素材资产库收尾
- **depends_on**: [T3, T4, T6]
- **location**: `plugin-service/server.js`, `web-dashboard/app.js`
- **description**: 删除素材时同步清理已复制文件，删除前校验 `localPath` 在资产目录内，容忍文件已不存在，阻止删除被引用资产；补齐按 ASIN/标签/站点筛选和重复导入幂等处理；支持素材引用到图片/视频/Listing。
- **validation**: 删除资产后本地副本同步清理；路径越界不触发删除；筛选和引用正常；重开后资产索引仍存在。
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T10: 自动化测试与回归
- **depends_on**: [T1, T2, T3, T4, T5, T6, T7, T8, T9]
- **location**: `plugin-service/server.js`, `web-dashboard/app.js`, `package.json`
- **description**: 引入测试运行器与 fixtures，补单元测试和最小端到端冒烟测试；覆盖路由、利润/ACoS/库存计算、CSV/JSON 导入、接口同步、审批幂等、迁移回滚、安全素材删除、导出和持久化。新增 `npm test` 脚本。
- **validation**: `npm test` 通过；`npm run dev` 可启动；`npm run package:win` 能生成安装包。
- **status**: Not Completed
- **log**:
- **files edited/created**:

### T11: 可扩展性与团队交付补齐
- **depends_on**: [T0, T4, T6]
- **location**: `plugin-service/server.js`, `electron/main.js`, `electron/preload.js`, `web-dashboard/app.js`
- **description**: 补齐计划之外的明确承诺：skill/tool 注册中心、多智能体配置、助手会话与 tool-run 历史、项目包导入/导出、SP-API/Feeds/浏览器辅助上架执行、浏览器自动化集成。密钥默认不导出。
- **validation**: 工具可按 schema 注册并被聊天发现；项目包导入/导出不泄露密钥；上架执行保持审批门槛；浏览器动作仅限低风险清单。
- **status**: Not Completed
- **log**:
- **files edited/created**:

## Parallel Execution Groups

| Wave | Tasks | Can Start When |
|------|-------|----------------|
| 1 | T0, T3, T4 | Immediately |
| 2 | T1, T5 | T0/T4 complete |
| 3 | T6 | T0/T4/T5 complete |
| 4 | T2, T9 | T4/T6 complete; T9 also needs T3 |
| 5 | T7, T8 | T0/T1/T2/T5/T6/T9 complete |
| 6 | T10 | All preceding complete |
| 7 | T11 | T0/T4/T6 complete; can run with T10 |

## Testing Strategy

- 保留并扩展当前冒烟测试：服务启动、聊天路由、素材导入、导出。
- 用临时数据目录验证，避免污染真实 D 盘数据。
- 每次改动后运行 `node --check`，前端加载后检查控制台错误与中文乱码。
- 打包前用 Playwright 截图检查桌面与移动宽度。
- 对迁移、远程同步、审批幂等、素材删除增加失败路径测试。

## Risks & Mitigations

- AI 层接入外部模型可能增加延迟或需要 Key，必须保留本地规则回退，避免无 Key 时功能失效。
- 远程 API 同步容易触发限流或 SSRF，需限制协议、超时、重试和响应大小。
- 本地 HTTP 服务 CORS 为 `*`，需加 origin 校验或本地 token，避免浏览器源 CSRF。
- 密钥明文落盘存在分享风险，至少保持默认不导出，并考虑本地加密。
- 多项目与可配置数据目录会影响既有数据，必须做备份、冲突处理和可回滚迁移。
