# Amazon Control 多部门审查报告

**审查日期**: 2026-08-14

## 结论

项目不是“不能运行”，而是“能运行但核心承诺未兑现”。当前实际版本是“规则路由原型 + 本地 JSON 存储”：基础链路可工作，但真实 AI 编排、远程 API 同步、多项目管理、审批执行闭环、图片/视频多 Provider、自动上架三路径和 14 页面深度仍处于占位或简化状态。

冒烟测试已验证：服务可启动、12 站点上下文可返回、聊天可自动路由、素材可导入并复制到本地、任务可落盘。

## 高风险问题

- 聊天不是真实 AI：`submitAssistantMessageWithAssets` 调用的是规则路由与硬编码分析，`getCodexStatus` 明确返回 `available: false`，没有模型调用、多轮上下文、工具调用记录或置信度。核心卖点不可验收。
- 远程 API/IPA 同步未真正实现：`syncApiConnection` 只读取本地文件；`testApiConnection` 未使用鉴权头；SP-API/Ads 所需 OAuth、签名、分页、限流均缺失；密钥以明文写入 `api-connections.json`。
- 安全边界过宽：IPC 与本地 HTTP 可读取任意路径、打开任意路径；`Access-Control-Allow-Origin: *` 允许任意网页读写本地服务；`taskId` 未校验可路径穿越；SSRF 与超大文件读取风险未处理。
- 项目建档未持久化：页面只写 `localStorage`，服务端 `projects.json` 只有读取函数，没有保存/编辑/删除 API；多项目、团队共享和项目包导出均为空。
- 审批与执行无闭环：高风险任务只写入 `approvals.json`，没有审批 UI、批准/拒绝、执行队列、失败重试；`executionQueue` 从未写入。
- 自动上架只有 Listing 草稿和上传表数据，没有 SP-API/Feeds、浏览器辅助提交，也没有三路径选择。
- 图片/视频生成只有 brief：没有 provider 选择、真实调用、素材回写素材库或输出历史。
- 14 页面大量共用 `renderModuleBody`：广告、库存、数据、利润、Listing、合规、图片、视频、上架等页面只有文本输入和通用结果区，交互深度不足。

## 中风险问题

- 字段映射未真正进入分析：`fieldMapping` 只保存不应用，`config/column_mapping.yaml` 未被读取。
- 原始数据被截断：`previewDataSource` 只保留前 20 行，`saveDataImport` 把预览结果当原始快照，违反“原始数据不覆盖”承诺。
- 利润模型过简：固定 15% 佣金，未扣 VAT/GST、退货、头程、仓储和汇率；US/DE/JP 只是换文案和币种，公式与阈值未按站点变化。
- 盈亏平衡 ACoS、CTR、CPC、目标 ACoS、搜索词分层、安全库存、在途库存、需求预测均未实现。
- `sales` 被当作销量兜底，可能导致库存和数据模块把销售额误当销量，补货建议失真。
- Electron 37 下拖拽使用 `file.path` 已不可用，只能拿到文件名，拖拽导入会失败；需改用 `webUtils.getPathForFile`。
- 端口冲突、单实例锁、数据目录迁移、写入原子性未处理；数据目录硬编码 D 盘，只能靠环境变量覆盖。
- 素材删除副本问题已修复，但数据导入/连接删除时 `raw`/`derived` 快照仍会残留。
- 前端存在重复 `renderAssistantBody` 定义，且部分“正在连接服务”的 UI 状态容易让用户误以为完整功能已启用。
- 没有自动化测试，只有手工冒烟；`release` 安装包时间早于最新源码，需要重新打包验证。

## 低风险与待整理

- 数字解析不兼容欧式 `12,50` 等格式；CSV 只支持逗号且自动识别容易误判聊天文本。
- `parseJsonLoose` 对多段 JSON 不稳定；预览服务器路径判断缺少分隔符校验。
- `submitCodexTask` 无站点时默认德国站，可能造成静默误判。
- 样例 `marketplaces.json` 缺少 `taxNote/fbaNote/spApiEndpoint`，与代码内置站点表不一致。

## 优先修复顺序

1. 接入真实 AI provider 与多轮上下文，保留本地规则回退。
2. 建立工具注册表、审批执行状态机和项目持久化。
3. 修复 Electron 拖拽路径、远程 API 同步、数据目录可配置。
4. 补齐利润/广告/库存/数据真实计算字段，避免错账。
5. 完成图片/视频多 Provider、自动上架三路径和模块页深度。
6. 补自动化测试并重新打包验证。

详细可执行计划见 `amazon-control-validation-plan.md`。
