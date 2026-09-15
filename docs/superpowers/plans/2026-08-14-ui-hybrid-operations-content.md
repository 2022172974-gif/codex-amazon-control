# UI 混合模式实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** 将当前 Amazon Control 前端升级为“运营高密度 + 内容媒体优先”的双区工作台，并加入分层动效。

**Architecture:** 保持原生 HTML/CSS/JS，不重构后端。CSS 只新增覆盖层，DOM 只改 `web-dashboard/app.js` 的渲染函数和 `index.html` 的外壳。

**Tech Stack:** Electron、原生 HTML/CSS/JS、Cascadia Mono、现有 `web-dashboard/styles.css`。

---

### Task 1: 设计令牌与全局外壳

**Files:**
- Modify: `web-dashboard/styles.css`
- Modify: `web-dashboard/index.html`

- [x] **Step 1: 在 CSS 末尾追加覆盖变量**

```css
:root {
  --op-canvas: #f2f6f4;
  --media-stage: #10241d;
  --signal: #0e7c60;
  --info: #3f6fae;
  --warn: #d69b2e;
  --risk: #c14b3f;
  --mono: "Cascadia Mono", "JetBrains Mono", Consolas, monospace;
}
```

- [x] **Step 2: 在 `index.html` 的 `.app-shell` 前增加顶部状态轨容器**

```html
<header class="top-rail">
  <div class="top-rail-left"><strong>Amazon Control</strong></div>
  <div id="topProjectContext" class="top-rail-center">项目 / 站点 / 币种</div>
  <div id="topRuntimeStatus" class="top-rail-right">本地服务检测中</div>
</header>
```

- [x] **Step 3: 运行 `node --check web-dashboard/app.js` 确认 HTML/CSS 未破坏 JS**

---

### Task 2: 侧边导航分组与模块状态

**Files:**
- Modify: `web-dashboard/app.js:295-309`

- [x] **Step 1: 修改 `renderModuleNav()`，给运营/内容/系统加分组**

```js
var groups = { '产品增长': '运营', '内容生产': '内容', '基础建档': '系统', '系统协作': '系统', '执行交付': '系统', '智能入口': '系统' };
```

- [x] **Step 2: 当前模块加 `aria-current="page"` 和 `data-module="' + item.id + '"`，内容组导航加 `nav-content` 类**

- [x] **Step 3: 运行 `node --check web-dashboard/app.js`**

---

### Task 3: 运营页模板

**Files:**
- Modify: `web-dashboard/app.js:369-380`

- [x] **Step 1: 替换 `renderModuleBody` 外壳，增加三栏和指标区**

```js
return '<section class="module-workspace">' +
  '<aside class="module-input-pane">' + existingInput + '</aside>' +
  '<section class="module-metrics-pane">' + renderModuleMetrics(moduleId) + '</section>' +
  '<section class="module-output-pane">' + renderCurrentResult() + renderHistoryList(moduleId) + '</section>' +
'</section>';
```

- [x] **Step 2: 保留原输入框、快捷任务和导出按钮，避免丢功能**

- [x] **Step 3: 运行 `npm test`**

---

### Task 4: 内容页媒体舞台

**Files:**
- Modify: `web-dashboard/app.js`
- Modify: `web-dashboard/styles.css`

- [x] **Step 1: 为 `image` 和 `video` 增加独立渲染分支**

```js
if (state.activeModule === 'image') html += renderImageBody();
if (state.activeModule === 'video') html += renderVideoBody();
```

- [x] **Step 2: `renderImageBody()` 返回参数区、`16:10` 预览舞台、素材引用和历史区**

- [x] **Step 3: 追加 CSS**

```css
.media-stage { aspect-ratio: 16 / 10; background: var(--media-stage); border-radius: 10px; }
```

- [x] **Step 4: 运行 `node --check web-dashboard/app.js`**

---

### Task 5: 素材库独立页

**Files:**
- Modify: `web-dashboard/app.js`
- Modify: `web-dashboard/styles.css`

- [x] **Step 1: 保留已新增的 `asset-library` 模块和 `renderAssetLibraryBody`**

- [x] **Step 2: 为素材卡增加 `data-asset-preview`，点击打开媒体预览层**

- [x] **Step 3: 运行 `npm test`**

---

### Task 6: 审批执行页

**Files:**
- Modify: `web-dashboard/app.js`
- Modify: `web-dashboard/styles.css`

- [x] **Step 1: `renderExecutionBody` 顶部加人工确认提示**

```html
<div class="execution-mode-banner">执行中心当前为人工确认模式，不会自动修改亚马逊后台。</div>
```

- [x] **Step 2: 队列卡片增加“复制操作清单”按钮，绑定 `copyExecutionChecklist`**

- [x] **Step 3: 运行 `npm test`**

---

### Task 7: 动效系统

**Files:**
- Modify: `web-dashboard/styles.css`

- [x] **Step 1: 追加模块切换和卡片错峰动效**

```css
.module-workspace { animation: module-enter 180ms ease both; }
.media-card { transition: transform 140ms ease, box-shadow 140ms ease; }
.media-card:hover { transform: translateY(-2px); }
@keyframes module-enter { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
```

- [x] **Step 2: 打开页面验证过渡不阻塞输入**

---

### Task 8: 响应式与冒烟

**Files:**
- Modify: `web-dashboard/styles.css`

- [x] **Step 1: 增加中屏 2 栏、窄屏 1 栏断点**

```css
@media (max-width: 960px) { .module-workspace { grid-template-columns: 1fr; } }
```

- [x] **Step 2: 运行 `npm test` 和 `node --check web-dashboard/app.js`**
