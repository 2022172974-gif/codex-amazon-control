# Amazon Control v3.1 项目方案（三省六部）

**版本**: v1.0
**日期**: 2026-08-14

## 一、项目定位

Amazon Control 的目标不是“填表看结果”的普通后台，而是一个本地优先、可扩展、聊天驱动的 AI 亚马逊运营平台。用户通过自然语言管理选品、利润、广告、库存、Listing、内容、合规、上架和复盘；数据可以来自 API/IPA、CSV、JSON、拖入素材、本地文件和历史任务。

当前版本能运行，但仍是“规则路由 + JSON 存储”原型。本方案以已完成的审查报告和修复计划为基础，给出可落地的整体设计与实施顺序。

## 二、总体架构

```text
Electron Renderer（14 模块 + 聊天工作台）
        │
        ▼
Electron Preload（amazonControl Bridge）
        │
        ▼
Electron Main + 本地任务服务（127.0.0.1）
        │
        ├── AI Provider Registry（DeepSeek / OpenAI-compatible / 本地回退）
        ├── Connector Layer（SP-API / Ads API / REST / Webhook / 本地文件）
        ├── Skill & Tool Registry
        ├── Project & Approval Engine
        ├── Asset Library
        └── Local JSON Store（默认 D 盘，可配置）
```

核心原则：
- 聊天是主入口，模块页是高级编辑、预览、审批、历史和导出界面。
- AI 优先，本地规则兜底；无 Key 也能继续用。
- 读自动、写审批；任何后台写入都需要人工确认。
- 不锁死单一模型、单一图片/视频工具、单一连接器或单一站点。
- 默认 D 盘，但数据目录可配置，团队包可迁移。

## 三、六部职责分工

| 部门 | 负责内容 |
|------|----------|
| 户部 | 利润、广告、库存、数据、财务计算与字段规范 |
| 兵部 | 架构、安全、部署、连接器、性能与数据目录 |
| 刑部 | 合规、审批、质量、测试与风险清单 |
| 工部 | 前端 14 模块、聊天编排、自动上架、图片/视频执行 |
| 礼部 | 文档、品牌、多站点语言与用户体验 |
| 吏部 | 团队协作、项目包、角色权限与流程管理 |

## 四、核心系统设计

### 4.1 本地数据与安全底座

- 数据目录默认 `D:\AmazonControlData\app-store`，设置页可修改；Electron `userData` 同步重定向，避免 C 盘占用。
- 所有写文件使用“临时文件 + rename”原子替换；目录不存在时提供迁移或降级提示。
- 本地 HTTP 服务仅绑定 `127.0.0.1`，限制 Origin，写入接口使用本地随机 Token。
- IPC 校验调用来源；文件读取仅允许数据目录或用户明确选择的路径。
- `taskId`、导入 ID、素材 ID 强制 `^[A-Za-z0-9_-]+$`，写文件前验证解析路径。
- API 凭据使用系统安全存储或本地加密，日志只输出脱敏信息。

### 4.2 AI 编排层

- 新增 `ai-providers.json`，支持 DeepSeek、OpenAI-compatible、本地模型与规则回退。
- 聊天改为“AI 规划 + 工具调用 + 本地兜底”：每次请求携带项目、站点、素材、导入数据、历史消息、可用工具与权限。
- 回复结构固定：`usedContext`、`toolRuns`、`missingData`、`decision`、`confidence`、`nextActions`、`approvalStatus`。
- 多轮会话写入 `assistant-sessions.json`，支持追问“为什么”“改成什么”“下一步做什么”。

### 4.3 Connector 连接器层

- `connectors.json` 作为模板目录，`api-connections.json` 保存用户实例。
- 每种连接器声明：数据类型、字段、鉴权方式、同步方式、风险等级、适用模块。
- `testApiConnection` 与 `syncApiConnection` 共用鉴权逻辑；支持 Bearer、Basic、API Key Header、OAuth 基础流程。
- 同步结果分两路保存：`raw/*.raw.json` 原始快照 + `derived/*.analysis.json` 分析结果，不覆盖原始数据。
- 定时同步可配置间隔，默认 6 小时；失败保留错误、重试次数与最后状态。

### 4.4 素材资产库

- 修复 Electron 37 拖拽：preload 暴露 `webUtils.getPathForFile`，不再依赖 `file.path`。
- 导入图片、视频、CSV、JSON、链接、文件夹；文件夹可选择展开或保留为包。
- 素材元数据包含项目、站点、ASIN/SKU、标签、用途、原始路径、本地副本、预览。
- 删除素材时同步删除本地副本；支持按站点/ASIN/标签/模块筛选。
- 聊天可直接引用最新素材、指定素材或按条件筛选素材。

### 4.5 项目与团队

- `projects.json` 支持项目 CRUD：项目名、站点、币种、语言、数据源、连接器、成员备注。
- 任务、导入、素材、审批都绑定 `projectId`。
- 项目包导出/导入：包含项目设置、非敏感字段映射、任务结果、素材索引；默认排除密钥和 Token。
- 团队使用可通过项目包迁移数据目录，不需要每台电脑重新配置全部内容。

### 4.6 Skill/Tool 注册中心

- 新增 `skills.json`、`tool-registry.json`、`tool-runs.json`。
- 每个工具声明：能力、输入输出 Schema、适用模块、风险等级、审批要求、调用方式、失败回退。
- 聊天 Agent 可发现并调用工具；未接入的工具显示配置入口而不是报错。
- 支持图片/视频生成器、REST 工具、浏览器脚本、数据连接器、本地命令。

### 4.7 审批与执行中心

- 新增 `action-drafts.json` 状态机：`pending -> approved -> executing -> success/failed -> retry`。
- 高风险动作生成待审批草稿，UI 显示字段预览、风险、审批/驳回按钮。
- 审批通过后进入 `execution-queue.json`；低风险浏览器动作可执行，后台写入必须人工确认。
- 每次执行记录输入、输出、失败原因、重试状态，不自动改亚马逊后台。

### 4.8 14 模块工作台

每个模块独立实现输入、预览、结果、历史、导出：

| 模块 | 核心能力 |
|------|----------|
| 项目站点 | 多项目 CRUD、站点选择、团队包 |
| 数据接入 | CSV/JSON/API/手动、字段映射、预览、历史 |
| 选品验证 | 关键词、ASIN、价格带、评论壁垒、需求与竞争 |
| 利润财务 | 站点佣金、税费、FBA、头程、退货、盈亏平衡 ACoS |
| Listing 优化 | 标题、五点、描述、Search Terms、A+、关键词覆盖 |
| 广告诊断 | ACoS/ROAS/CTR/CVR/CPC、搜索词分层、否词、预算 |
| 数据分析 | 销量、流量、转化、异常归因、复盘 |
| 库存补货 | 覆盖天数、在途、安全库存、预测、仓储费 |
| 合规审查 | 站点认证、标签、敏感词、IP、账户健康 |
| 内容素材 | 主图、副图、A+、拍摄清单、素材引用 |
| 图片生成 | 多 Provider、Prompt、尺寸、风格、输出历史 |
| 视频生成 | 脚本、分镜、字幕、旁白、缺失镜头清单 |
| 素材来源 | 竞品素材溯源、站外渠道、红人机会、版权 |
| 执行中心 | 审批队列、低风险浏览器任务、执行记录 |

### 4.9 自动上架三路径

- 路径 A：生成可上传 Excel/CSV 草稿，用户人工上传。
- 路径 B：生成 SP-API/Feeds 提交草稿，审批后提交。
- 路径 C：生成浏览器辅助操作步骤，审批后由低风险脚本逐步引导。
- 三条路径统一展示字段预览、缺项清单、合规风险和失败重试信息。

### 4.10 图片与视频多 Provider

- 新增 `generator-providers` 配置：OpenAI 图片、Runway/Pika/Kling 视频、剪映工作流、本地脚本、任意 REST。
- 未配置 provider 时仍生成详细 brief；配置后可从模块页或聊天发起调用。
- 输出保存到素材库和 `generator-runs`，可回看历史并再次引用。

## 五、开发里程碑

| 里程碑 | 内容 | 完成标志 |
|--------|------|----------|
| M0 地基 | 安全、数据目录、原子写、端口单实例、基础测试 | 高危安全项清零，现有功能无回归 |
| M1 AI 与数据 | AI Provider、多轮聊天、连接器同步、字段映射、素材修复 | 聊天可真实推理，远程接口可同步 |
| M2 模块与执行 | 14 模块深度、审批执行、自动上架三路径、图片/视频 | 核心模块可交付，高风险不自动执行 |
| M3 交付与分享 | 项目包、团队协作、测试、打包 | `npm run dev` 与 `npm run package:win` 通过 |

## 六、验收标准

- 无 API Key 时本地规则仍可用；配置 DeepSeek 后聊天由模型决策。
- 同一 ASIN 在 US/DE/JP 项目下生成不同站点上下文的利润与合规结果。
- 广告、库存、业务 CSV 导入后能生成可复核诊断，原始数据不被截断或覆盖。
- 远程 API 同步保留原始快照，密钥不写入源码、日志或导出包。
- 高风险动作进入审批且不能自动改后台；审批后可进入执行队列。
- 14 个模块都有独立输入、结果、历史与导出，不再共用同一个占位模板。
- 项目包可导出并在另一台电脑导入，默认不包含密钥。
- 自动化测试与打包流程稳定，安装包包含最新源码。

## 七、风险与决策

- AI 外部模型可能延迟、限流或欠费：必须保留本地规则回退和失败提示。
- 远程 API 同步可能触发 SSRF 或限流：限制协议、主机、响应大小、重试次数。
- 密钥明文落盘是团队分享风险：优先本地加密，导出默认排除。
- 多站点计算需要准确费率：第一版用站点费率表 + 规则估算，后续通过 API/报告校准。
- 浏览器自动化只做低风险动作，后台写入全部人工审批。

## 八、推荐文件结构

```text
data/app-store/
  projects.json
  marketplaces.json
  connectors.json
  api-connections.json
  data-imports.json
  assets.json
  assets/files/
  raw/
  derived/
  approvals.json
  action-drafts.json
  execution-queue.json
  assistant-sessions.json
  ai-providers.json
  skills.json
  tool-registry.json
  tool-runs.json
  listing-drafts.json
  project-packages/
  activity.log.json
```

## 九、执行顺序建议

1. 先做 M0 地基：安全、数据目录、原子写、单实例、测试框架。
2. 再做 M1：AI Provider、聊天编排、连接器同步、字段映射、素材修复。
3. 然后做 M2：审批执行、14 模块深度、自动上架三路径、图片/视频。
4. 最后做 M3：项目包、团队协作、打包和发布。
