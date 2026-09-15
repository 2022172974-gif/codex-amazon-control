# CodeX 亚马逊全链路自动化总控

面向亚马逊运营团队的本地桌面工作台。项目将选品、广告、合规、数据、图片与视频、素材溯源和浏览器辅助任务统一到一个 Electron 应用中，并支持多站点、多数据源、本地任务记录和专家工作流。

## 核心能力

- 7 个主业务模块：选品与开发、广告分析、合规审查、数据分析、图片与剪辑、素材来源、浏览器自动化。
- 5 个专家工作流：利润与财务、Listing 优化、评论与口碑、库存与补货、API 数据中心。
- 本地媒体处理：图片转图片、图片转视频、视频转图片、视频转视频。
- AI Provider Profiles 与按 Agent、项目、全局优先级解析的能力路由。
- 8 个默认 Agent，以及支持校验、发布和测试运行的 Agent Builder。
- 凭据在桌面端使用 Electron `safeStorage` 加密，在浏览器模式下仅保留于当前会话。
- 高风险动作进入人工审批队列，包括预算、竞价、申诉、Listing 和采购变更。

## 运行要求

- Windows 10/11 x64
- Node.js 20 或更高版本
- npm 10 或更高版本

## 开发运行

```powershell
npm install
npm run dev
```

启动本地插件服务：

```powershell
npm run service
```

## 测试与打包

```powershell
npm test
npm run package:win
```

构建产物输出到：

```text
release/Amazon-Control-4.0.0-Setup.exe
```

安装程序采用 NSIS，支持选择安装目录并创建桌面快捷方式。

## 数据与安全

- 运行时数据保存到本地 `data/` 目录，不应提交到 Git。
- 安装包、构建缓存和本地报告保存在 `release/` 与 `output/`，默认已忽略。
- 请勿在仓库、`README`、配置文件或提交记录中写入 API Key、Token、Cookie 或账号密码。
- 本项目中的外部操作默认遵循低风险自动化边界，高风险动作必须由人工确认。

## 项目结构

```text
electron/          Electron 桌面入口与预加载桥接
plugin-service/   本地 HTTP 服务、工作流与数据存储
web-dashboard/    桌面端界面
test/             Node.js 自动化测试
docs/             产品设计与技术说明
选品与开发/        选品业务说明
亚马逊广告分析/     广告业务说明
亚马逊合规与分析审查/ 合规业务说明
数据分析/          数据业务说明
图片与剪辑/        内容生产业务说明
商品视频来源图片来源商品/ 素材溯源业务说明
```

## 版本

当前桌面版本：`4.0.0`
