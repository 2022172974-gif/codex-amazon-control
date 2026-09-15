# Amazon Control 剩余深度设计

本文件汇总三个子代理（后端注册中心、前端模块深度、安全测试）给出的最终设计，供后续实现直接引用。

## 后端能力

- Skill/Tool Registry：新增 `skills.json`、`tool-registry.json`、`tool-runs.json`；提供 CRUD 与 `runSkill/runTool`。工具声明 input/output schema、风险、审批要求、调用方式、fallback。
- Project Package：新增 `project-packages/` 目录；导出项目、任务、资产索引、非敏感字段映射；默认脱敏 `credential|password|secret|token|apiKey|authorization` 等敏感键。
- Listing Drafts：新增 `listing-drafts.json`；状态机 `draft -> needs_review -> approved -> locked -> submitted/archived`，导出上传 CSV。
- Generator Providers：新增 `generator-providers.json`、`generator-runs.json`；统一 OpenAI-compatible 图片、Runway/Pika/Kling 视频、剪映工作流、任意 REST；异步任务用 `remoteJobId` + 轮询。

## 前端模块

12 个仍共用 `renderModuleBody` 的模块需要独立工作区，字段清单见设计输出。通用结构为“输入区 + 预览区 + 结果区 + 历史区 + 导出区”。优先补 selection、profit、ads、data、inventory，再补 listing、compliance、source、creative，最后 image、video、launch。

另需：
- 素材库独立页，含筛选、缩略图、引用、导出。
- Codex 页显示真实 `codexStatus`，不伪装已连接。
- 执行中心明确“待人工执行队列”，并给队列项完成/重试/复制操作清单按钮。

## 安全与测试

- 凭据优先 Electron `safeStorage`/DPAPI 加密，非 Electron 环境用 AES-256-GCM 回退；连接列表只返回脱敏值。
- IPC 校验 sender，开启 `sandbox: true`、CSP、窗口导航限制。
- 统一数据目录解析与旧 `data/app-store` 迁移。
- `package.json` 增加 `test/verify` 脚本；当前已加入 `npm test` 并跑通 `test/smoke.test.js`。

## 推荐顺序

1. 先完成 Skill/Tool Registry 数据层与安全白名单。
2. 再完成 Listing Drafts 与 Generator Providers 同步图片。
3. 完成 Project Package 导入导出。
4. 完成 12 模块专属工作区和素材库独立页。
5. 最后接凭据加密、IPC 加固、完整测试与打包验证。
