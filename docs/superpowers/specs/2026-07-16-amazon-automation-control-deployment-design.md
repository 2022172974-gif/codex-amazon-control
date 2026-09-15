# CodeX 亚马逊全链路自动化总控部署设计

日期：2026-07-16

## 1. 目标

在 `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控` 中，按用户提供的 v3.0 完整配置包创建标准化总控项目结构，并将用户现有项目中的 6 份模块规范手册整合为对应模块目录下的 `AGENTS.md`。

本次采用用户确认的方案 1：

- 严格按配置包创建目标目录结构和模块命名
- 以用户现有文件作为模块手册来源
- 统一命名差异，避免后续路由和维护混乱

## 2. 范围

本次部署包含：

- 创建根目录 `AGENTS.md`
- 创建 `config/column_mapping.yaml`
- 创建标准目录：
  - `config/`
  - `data/raw/`
  - `data/processed/`
  - `reports/`
  - `skills/`
  - `选品与开发/`
  - `亚马逊广告分析/`
  - `亚马逊合规与分析审查/`
  - `数据分析/`
  - `图片与剪辑/`
  - `商品视频来源图片来源商品/`
- 为上述 6 个模块写入对应 `AGENTS.md`

本次不包含：

- 实现各模块脚本、测试代码、自动化流程
- 安装 Chrome 扩展或 MCP
- 执行浏览器自动化实际连通性测试
- 从零重构用户旧项目目录

## 3. 目标结构

目标结构以配置包为准：

```text
codex亚马逊自动化总控/
├── AGENTS.md
├── config/
│   └── column_mapping.yaml
├── data/
│   ├── raw/
│   └── processed/
├── reports/
├── skills/
├── 选品与开发/
│   └── AGENTS.md
├── 亚马逊广告分析/
│   └── AGENTS.md
├── 亚马逊合规与分析审查/
│   └── AGENTS.md
├── 数据分析/
│   └── AGENTS.md
├── 图片与剪辑/
│   └── AGENTS.md
└── 商品视频来源图片来源商品/
    └── AGENTS.md
```

## 4. 来源映射

模块内容来源按以下规则确定：

| 目标模块 | 目标文件 | 来源 |
|---|---|---|
| 选品与开发 | `选品与开发/AGENTS.md` | `D:\HuaweiMoveData\Users\YANGJUN\Documents\选品与开发\AGENTS.md` |
| 亚马逊广告分析 | `亚马逊广告分析/AGENTS.md` | `D:\HuaweiMoveData\Users\YANGJUN\Documents\亚马逊广告分析\AGENTS.md` |
| 亚马逊合规与分析审查 | `亚马逊合规与分析审查/AGENTS.md` | `D:\HuaweiMoveData\Users\YANGJUN\Documents\亚马逊合格与分析审查\AGENTS.md` |
| 数据分析 | `数据分析/AGENTS.md` | `D:\HuaweiMoveData\Users\YANGJUN\Documents\xwechat_files\wxid_in7358saird122_1ef0\msg\file\2026-07\CodeX亚马逊数据分析项目规范手册完整版版本v1.docx` |
| 图片与剪辑 | `图片与剪辑/AGENTS.md` | `D:\HuaweiMoveData\Users\YANGJUN\Documents\xwechat_files\wxid_in7358saird122_1ef0\msg\file\2026-07\CodeX跨境电商多媒体智能制作项目规范手册完整版版本v1.docx`，如解析失败则回退到 `D:\HuaweiMoveData\Users\YANGJUN\Documents\图片与剪辑\docs\handbook\CodeX_跨境电商多媒体智能制作规范手册.md` |
| 商品视频来源图片来源商品 | `商品视频来源图片来源商品/AGENTS.md` | `D:\HuaweiMoveData\Users\YANGJUN\Documents\商品视频来源图片来源商品站外推广来源分析、\docs\项目规范手册.md` |

## 5. 命名统一规则

部署时统一采用配置包内正式命名：

- `亚马逊合格与分析审查` 统一为 `亚马逊合规与分析审查`
- `商品视频来源图片来源商品站外推广来源分析、` 的内容统一归入 `商品视频来源图片来源商品`

此规则只影响新总控项目结构，不修改用户原始来源目录。

## 6. 内容写入策略

### 6.1 根总控文件

根 `AGENTS.md` 直接使用用户附件中的 v3.0 总控内容，不做语义改写，仅做必要的格式保持。

### 6.2 列名映射

`config/column_mapping.yaml` 直接使用用户附件中的 YAML 映射，不做字段增删。

### 6.3 模块手册

模块 `AGENTS.md` 以来源文件原文为主，必要时只做以下处理：

- 从 docx 提取纯文本并保存为 Markdown 结构
- 保留原有标题、规则、触发词和流程
- 不主动删减业务规则
- 不把多个模块内容混写到同一文件

### 6.4 编码处理

由于部分现有 `AGENTS.md` 在 PowerShell 中显示为乱码，实施时需要按文件原始字节读取并以 UTF-8 写入目标文件，避免因终端默认编码导致内容损坏。

## 7. 验证方案

完成部署后执行基础静态验证：

1. 检查根目录是否生成 `AGENTS.md`
2. 检查 `config/column_mapping.yaml` 是否存在且字段完整
3. 检查 6 个模块目录及各自 `AGENTS.md` 是否存在
4. 抽查根 `AGENTS.md` 中是否包含：
   - 模块概览
   - 路由规则
   - 跨项目引用语法
   - 浏览器自动化说明
5. 抽查 `数据分析/AGENTS.md` 是否含有销售、流量、竞品、库存四类分析内容
6. 抽查 `图片与剪辑/AGENTS.md` 是否含有全自动模式与交互协作模式

本次不执行需要外部依赖的动态验证项，例如：

- `@Chrome 打开百度首页`
- 上传 CSV 识别列名
- 跨项目引用真实调用
- 快速注册项目命令真实执行

## 8. 风险与处理

### 8.1 编码风险

风险：旧文件可能不是 UTF-8，直接读取会乱码。

处理：优先使用原始附件、Markdown 源文件或 docx 结构化提取；如必须读取旧 `AGENTS.md`，采用字节级复制或更稳妥编码路径。

### 8.2 内容差异风险

风险：现有来源文件与配置包中的模块名称不一致。

处理：结构以配置包为准，内容以来源文件为准，并在本设计中显式记录映射关系。

### 8.3 docx 提取风险

风险：docx 提取后段落结构可能紧凑，影响可读性。

处理：在写入目标 `AGENTS.md` 时做最小必要的段落整理，但不改变原意。

### 8.4 非 git 仓库

风险：无法按规范提交设计文档版本。

处理：保留设计文档落盘；由于当前目录不是 git 仓库，本次不执行 commit。

## 9. 实施顺序

1. 创建标准目录结构
2. 写入根 `AGENTS.md`
3. 写入 `config/column_mapping.yaml`
4. 提取并写入 6 个模块 `AGENTS.md`
5. 进行静态验证
6. 输出结果与未执行项说明

## 10. 成功标准

满足以下条件即视为部署完成：

- 配置包要求的标准结构全部存在
- 根总控文件与列名映射文件已写入
- 6 个模块均有非空 `AGENTS.md`
- 目录命名与配置包一致
- 验证项 1-6 全部通过
