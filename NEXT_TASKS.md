# Amazon Control 压缩上下文

后续新会话只读本文件与 `PROJECT_BRIEF.md`、`CURRENT_PLAN.md`、`DECISIONS.json`，不必重放长聊天。

## 当前状态

- 技术栈：Electron 37 + Node 原生 HTTP + 原生 HTML/CSS/JS + 本地 JSON。
- 数据目录默认 `D:\AmazonControlData\app-store`；Electron `userData` 已重定向到 D 盘。
- 已完成：多站点、项目 CRUD、聊天 AI-first 本地回退、远程 API 同步、素材库、审批执行队列、Skill/Tool Registry、Listing Drafts、Project Package（项目打包导出/导入，脱敏分享迁移）、本地 token/Origin/路径防护、CSP、sandbox、路径校验、CORS、工具审批、素材 HTTP 预览、Aether Deck 动能层、浏览器式多标签工作台和 14 项自动化测试。
- 运行：`npm run dev`；测试：`npm test`；打包：`npm run package:win`。

## 下一步（按优先级）

1. 完成 12 个模块专属工作区，替换通用 `renderModuleBody`。
2. 完成 Generator Providers 后端闭环（Skill/Tool Registry、Listing Drafts、Project Package 已完成）。
3. 完成图片/视频多 Provider 与输出入库。
4. 完成 API 凭据加密、连接器配置审批、完整测试与代码签名。

## 关键文件

- `plugin-service/server.js`：任务服务、路由、AI、连接器、项目、审批。
- `electron/main.js`、`electron/preload.js`：Electron 主进程与桥。
- `web-dashboard/app.js`、`styles.css`、`index.html`：前端工作台。
- `docs/FINAL-DESIGN-REMAINING.md`：剩余能力的详细设计。
- `test/smoke.test.js`：最小冒烟测试。
