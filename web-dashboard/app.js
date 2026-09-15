var UI_MODULES = [
  { id: 'assistant', group: '智能入口', title: '智能总控聊天', shortTitle: '聊天', summary: '直接提问、贴 ASIN、CSV、JSON、链接或文件路径，系统自动导入、路由、分析和保存。' },
  { id: 'agent-builder', group: '智能入口', title: 'Agent Builder', shortTitle: 'Agent', summary: '配置多智能体角色、模型、技能、权限、验证和可视化任务流。' },
  { id: 'profile', group: '基础建档', title: '项目站点', shortTitle: '站点', summary: '创建项目并选择站点，不默认锁定美国站。' },
  { id: 'api', group: '基础建档', title: '接口资产中心', shortTitle: 'API/IPA', summary: '查看已有接口、能拿什么数据、字段样例、最近同步和测试状态。' },
  { id: 'ingest', group: '基础建档', title: '数据导入中心', shortTitle: '导入', summary: '集中管理 CSV、JSON、API、手动指标、字段映射和导入历史。' },
  { id: 'selection', group: '产品增长', title: '选品验证', shortTitle: '选品', summary: 'ASIN、关键词、竞品机会、测款建议。' },
  { id: 'profit', group: '产品增长', title: '利润财务', shortTitle: '利润', summary: '售价、成本、FBA、佣金、ROI、盈亏平衡 ACoS。' },
  { id: 'listing', group: '产品增长', title: 'Listing 优化', shortTitle: 'Listing', summary: '标题、五点、描述、A+、关键词覆盖。' },
  { id: 'ads', group: '产品增长', title: '广告诊断', shortTitle: '广告', summary: 'ACoS、ROAS、CTR、CVR、搜索词、否词和预算。' },
  { id: 'data', group: '产品增长', title: '数据分析', shortTitle: '数据', summary: '销量、流量、转化、异常和业务复盘。' },
  { id: 'inventory', group: '产品增长', title: '库存补货', shortTitle: '库存', summary: '库存覆盖、补货点、断货和冗余风险。' },
  { id: 'compliance', group: '产品增长', title: '合规审查', shortTitle: '合规', summary: '认证、标签、Listing、IP、账户健康风险。' },
  { id: 'creative', group: '内容生产', title: '内容素材', shortTitle: '内容', summary: '主图、副图、A+、视频、拍摄清单。' },
  { id: 'asset-library', group: '内容生产', title: '素材库', shortTitle: '素材库', summary: '集中管理图片、视频、CSV、JSON、链接和素材包。' },
  { id: 'image', group: '内容生产', title: '图片生成', shortTitle: '图片', summary: '图片转图片、图片转视频、尺寸处理、云端生成和真实产物管理。' },
  { id: 'video', group: '内容生产', title: '视频生成', shortTitle: '视频', summary: '视频转图片、视频转视频、剪辑转码、云端生成和真实产物管理。' },
  { id: 'source', group: '内容生产', title: '素材来源', shortTitle: '素材', summary: '竞品素材、站外渠道、红人机会和版权风险。' },
  { id: 'launch', group: '执行交付', title: '自动上架草稿', shortTitle: '上架', summary: '生成 Listing 草稿和上传表格，不自动提交后台。' },
  { id: 'execution', group: '执行交付', title: '执行中心', shortTitle: '执行', summary: '低风险打开页面、截图、抓取公开信息和导出。' },
  { id: 'codex', group: '系统协作', title: 'Codex 修改', shortTitle: 'Codex', summary: '生成可复制给 Codex 的修改上下文。' },
  { id: 'recap', group: '系统协作', title: '复盘导出', shortTitle: '复盘', summary: '查看任务、导出 JSON/Markdown/CSV。' }
];

var MARKETPLACES = [
  { code: 'US', name: '美国站', marketplaceId: 'ATVPDKIKX0DER', region: 'NA', currency: 'USD', language: 'en-US', timezone: 'America/Los_Angeles', adsRegion: 'NA' },
  { code: 'CA', name: '加拿大站', marketplaceId: 'A2EUQ1WTGCTBG2', region: 'NA', currency: 'CAD', language: 'en-CA', timezone: 'America/Vancouver', adsRegion: 'NA' },
  { code: 'MX', name: '墨西哥站', marketplaceId: 'A1AM78C64UM0Y8', region: 'NA', currency: 'MXN', language: 'es-MX', timezone: 'America/Mexico_City', adsRegion: 'NA' },
  { code: 'UK', name: '英国站', marketplaceId: 'A1F83G8C2ARO7P', region: 'EU', currency: 'GBP', language: 'en-GB', timezone: 'Europe/London', adsRegion: 'EU' },
  { code: 'DE', name: '德国站', marketplaceId: 'A1PA6795UKMFR9', region: 'EU', currency: 'EUR', language: 'de-DE', timezone: 'Europe/Berlin', adsRegion: 'EU' },
  { code: 'FR', name: '法国站', marketplaceId: 'A13V1IB3VIYZZH', region: 'EU', currency: 'EUR', language: 'fr-FR', timezone: 'Europe/Paris', adsRegion: 'EU' },
  { code: 'IT', name: '意大利站', marketplaceId: 'APJ6JRA9NG5V4', region: 'EU', currency: 'EUR', language: 'it-IT', timezone: 'Europe/Rome', adsRegion: 'EU' },
  { code: 'ES', name: '西班牙站', marketplaceId: 'A1RKKUPIHCS9HS', region: 'EU', currency: 'EUR', language: 'es-ES', timezone: 'Europe/Madrid', adsRegion: 'EU' },
  { code: 'JP', name: '日本站', marketplaceId: 'A1VC38T7YXB528', region: 'FE', currency: 'JPY', language: 'ja-JP', timezone: 'Asia/Tokyo', adsRegion: 'FE' },
  { code: 'AU', name: '澳洲站', marketplaceId: 'A39IBJ37TRP1C6', region: 'FE', currency: 'AUD', language: 'en-AU', timezone: 'Australia/Sydney', adsRegion: 'FE' },
  { code: 'IN', name: '印度站', marketplaceId: 'A21TJRUUN4KGV', region: 'FE', currency: 'INR', language: 'en-IN', timezone: 'Asia/Kolkata', adsRegion: 'FE' },
  { code: 'BR', name: '巴西站', marketplaceId: 'A2Q3Y263D00KWC', region: 'NA', currency: 'BRL', language: 'pt-BR', timezone: 'America/Sao_Paulo', adsRegion: 'NA' }
];

var DEFAULT_CONNECTOR_CATALOG = [
  { connectorId: 'amazon-sp-api', name: 'Amazon SP-API', type: 'official', auth: 'lwa_iam', dataTypes: ['订单', '库存', 'FBA 费用', '结算', '业务报告', '商品目录'], fields: ['asin', 'sku', 'orders', 'units', 'revenue', 'inventory', 'fbaFee', 'referralFee'] },
  { connectorId: 'amazon-ads-api', name: 'Amazon Ads API', type: 'official', auth: 'oauth', dataTypes: ['广告活动', '广告组', '关键词', '搜索词', '预算', '花费与销售额'], fields: ['campaignName', 'adGroupName', 'targeting', 'searchTerm', 'impressions', 'clicks', 'spend', 'sales', 'orders'] },
  { connectorId: 'keepa', name: 'Keepa API', type: 'third_party', auth: 'api_key', dataTypes: ['价格历史', 'BSR 历史', 'Offer 数', 'Buy Box', '评论趋势'], fields: ['asin', 'price', 'bsr', 'offers', 'buyBoxPrice', 'rating', 'reviewCount'] },
  { connectorId: 'seller-tool', name: '卖家精灵/选品软件 API', type: 'third_party', auth: 'api_key', dataTypes: ['关键词', '竞品 ASIN', '搜索量', '竞争度', '类目机会'], fields: ['keyword', 'searchVolume', 'asin', 'category', 'price', 'reviews', 'rating', 'competitionScore'] },
  { connectorId: 'erp', name: 'ERP / 库存软件 API', type: 'third_party', auth: 'api_key_or_bearer', dataTypes: ['采购', '库存', '在途', '入仓', '头程', '结算'], fields: ['sku', 'asin', 'available', 'inbound', 'leadTimeDays', 'purchaseCost', 'storageFee'] },
  { connectorId: 'openai-compatible', name: 'OpenAI / AI 生成接口', type: 'ai', auth: 'api_key', dataTypes: ['图片 prompt', '视频脚本', 'Listing 文案', '运营建议'], fields: ['prompt', 'model', 'imageSize', 'duration', 'style', 'response'] },
  { connectorId: 'rest-api', name: '通用 REST API', type: 'third_party', auth: 'api_key_or_bearer', dataTypes: ['自定义商品数据', '广告数据', '库存数据', '销售数据'], fields: ['asin', 'sku', 'sales', 'spend', 'inventory', 'sessions', 'orders'] },
  { connectorId: 'webhook', name: 'Webhook 接收', type: 'webhook', auth: 'shared_secret', dataTypes: ['事件推送', '报表推送', '库存变化', '广告日报'], fields: ['eventType', 'marketplace', 'asin', 'payload', 'createdAt'] },
  { connectorId: 'local-json', name: '本地 JSON 同步', type: 'file', auth: 'none', dataTypes: ['本地结构化报表', '软件导出数据', '模拟 API 返回'], fields: ['rows', 'asin', 'sales', 'spend', 'inventory', 'sessions'] },
  { connectorId: 'csv-xlsx', name: 'CSV/XLSX 导入', type: 'file', auth: 'none', dataTypes: ['广告搜索词报告', '业务报告', '库存报告', '结算报告'], fields: ['date', 'asin', 'sku', 'sales', 'revenue', 'sessions', 'inventory', 'spend', 'orders'] }
];

var DEFAULT_TOOLS = [
  { id: 'profit-calc', name: '利润测算', kind: 'builtin', module: 'profit', risk: 'low', approvalRequired: false, description: '按站点币种计算净利率、ROI 和盈亏平衡 ACoS。' },
  { id: 'ad-diagnosis', name: '广告诊断', kind: 'builtin', module: 'ads', risk: 'low', approvalRequired: false, description: '诊断 ACoS、ROAS、CTR、CVR，生成否词和预算建议。' },
  { id: 'inventory-plan', name: '库存补货测算', kind: 'builtin', module: 'inventory', risk: 'low', approvalRequired: false, description: '计算覆盖天数、补货点、断货与冗余风险。' },
  { id: 'csv-stats', name: 'CSV/JSON 数据分析', kind: 'builtin', module: 'data', risk: 'low', approvalRequired: false, description: '汇总销量、流量、转化与异常，输出复盘。' },
  { id: 'listing-draft', name: 'Listing 草稿生成', kind: 'builtin', module: 'launch', risk: 'high', approvalRequired: true, description: '生成标题、五点、描述和上传表格，不自动提交后台。' },
  { id: 'compliance-check', name: '合规审查', kind: 'builtin', module: 'compliance', risk: 'medium', approvalRequired: true, description: '按站点输出认证、标签、Listing、IP 和账户健康风险。' },
  { id: 'image-brief', name: '图片生成 brief', kind: 'ai', module: 'image', risk: 'low', approvalRequired: false, description: '生成图片 prompt brief、尺寸规范和调用内容。' },
  { id: 'video-brief', name: '视频生成 brief', kind: 'ai', module: 'video', risk: 'low', approvalRequired: false, description: '生成短视频脚本、分镜、字幕、旁白和调用 brief。' }
];

var MODULE_TEMPLATES = {
  selection: { placeholder: '例如：德国站，分析 ASIN:B0XXXXXXXX 的利润和竞品机会，售价 29.99，成本 8.5，FBA 6.2。', samples: ['分析这个 ASIN 的利润和竞品机会', '判断 pet hair remover 是否适合测款', '用导入数据筛选可测产品'] },
  profit: { placeholder: '例如：售价 29.99，成本 8.5，FBA 6.2，帮我算净利率、ROI 和盈亏平衡 ACoS。', samples: ['计算净利率和 ROI', '判断广告成本还能不能继续烧', '做涨价/降价利润对比'] },
  listing: { placeholder: '例如：根据关键词和卖点生成德国站 Listing 标题、五点、描述和后台关键词。', samples: ['生成本地化 Listing 草稿', '检查关键词覆盖', '把素材卖点同步进 Listing'] },
  ads: { placeholder: '直接粘贴广告 CSV，例如 campaignName,searchTerm,spend,sales,orders,clicks,impressions。', samples: ['粘贴广告 CSV 自动诊断', '找出高花费低转化词', '生成否词候选清单'] },
  data: { placeholder: '粘贴业务数据 CSV/JSON，例如 date,asin,units,revenue,sessions,orders。', samples: ['分析近 30 天销量和转化', '解释业务波动原因', '生成业务复盘'] },
  inventory: { placeholder: '例如：库存 300，30天销量 180，采购周期 35 天，帮我算覆盖天数和补货点。', samples: ['计算库存覆盖天数', '判断是否会断货', '找冗余库存'] },
  compliance: { placeholder: '例如：日本站，上架一款小家电，检查认证、标签、Listing 和 IP 风险。', samples: ['检查日本站合规风险', '列出德国站认证资料', '检查 Listing 敏感词'] },
  creative: { placeholder: '例如：把这个产品拆成主图、副图、A+、视频和拍摄任务单。', samples: ['生成内容素材任务单', '把卖点转成拍摄清单', '生成新品素材计划'] },
  image: { placeholder: '例如：宠物除毛器，生成主图、场景图、尺寸图和 A+ 图片 prompt。', samples: ['生成图片 prompt brief', '生成 A+ 图片清单', '生成主图合规版'] },
  video: { placeholder: '例如：宠物除毛器，生成 30 秒短视频脚本、分镜、字幕和旁白。', samples: ['生成视频脚本和分镜', '生成字幕和旁白', '把卖点转成短视频 brief'] },
  source: { placeholder: '例如：分析竞品素材来源、站外渠道、红人机会和版权风险。', samples: ['分析竞品素材来源', '找站外渠道机会', '检查版权风险'] },
  launch: { placeholder: '例如：根据素材、关键词和产品参数，生成 Listing 草稿和上传表格。', samples: ['生成自动上架草稿', '输出可上传表格', '上架前进入合规检查'] },
  execution: { placeholder: '例如：打开竞品页面、截图、抓取公开信息并生成待执行清单。', samples: ['生成浏览器执行清单', '打开页面并截图', '导出报告清单'] },
  codex: { placeholder: '例如：把当前程序改成聊天优先，减少表单输入，自动导入 CSV 并生成结果。', samples: ['生成 Codex 修改上下文', '总结当前问题', '准备下一轮开发任务'] },
  recap: { placeholder: '例如：汇总最近任务，导出广告诊断、库存建议和 Listing 草稿。', samples: ['复盘最近任务', '导出当前结果', '汇总风险和动作'] },
  api: { placeholder: '例如：添加 Amazon Ads API，字段包含 campaignName、searchTerm、spend、sales，每 6 小时同步一次。', samples: ['添加 Amazon Ads API', '添加 Keepa API', '添加 OpenAI 图片/视频接口'] },
  ingest: { placeholder: '例如：导入德国站广告搜索词 CSV，映射 spend、sales、orders 字段并保存。', samples: ['保存广告 CSV', '保存业务 JSON', '导入库存表'] },
  profile: { placeholder: '例如：建立德国站宠物用品项目，后续用 API/CSV 混合数据分析利润、广告和库存。', samples: ['建立德国站项目', '建立日本站项目', '建立英国站项目'] }
  ,
  'agent-builder': { placeholder: '例如：创建一个广告诊断 Agent，允许读取广告和利润数据，调用广告诊断工具，并通过证据验证后输出。', samples: ['创建广告诊断 Agent', '验证当前流程', '用当前流程分析业务数据'] }
};

var state = {
  activeModule: localStorage.getItem('amazonControl.activeModule') || 'assistant',
  tabs: [],
  activeTabId: '',
  closedTabs: [],
  market: null,
  tasks: [],
  currentResult: null,
  apiConnections: [],
  connectorCatalog: DEFAULT_CONNECTOR_CATALOG,
  dataImports: [],
  projects: [],
  selectedProjectId: localStorage.getItem('amazonControl.projectId') || '',
  assets: [],
  assistantMessages: [],
  approvals: [],
  syncJobs: [],
  actionDrafts: [],
  executionQueue: [],
  skills: [],
  tools: [],
  toolRuns: [],
  listingDrafts: [],
  providerProfiles: [],
  providerRoutes: [],
  agents: [],
  agentFlows: [],
  workflowRuns: [],
  mediaRuns: [],
  mediaOperations: [],
  generatorRuns: [],
  verificationResults: [],
  usageSummary: null,
  projectPackages: [],
  codexStatus: null,
  runtimeMode: 'preview',
  dataImportEditingId: '',
  apiEditingId: '',
  providerEditingId: '',
  selectedAgentId: 'orchestrator',
  selectedAgentFlowId: 'default-business-flow',
  agentInspectorTab: 'agent',
  selectedCatalogId: 'amazon-ads-api',
  selectedConnectorValue: '',
  missionStage: 'idle',
  missionStartedAt: 0
};

var deckScene = {
  canvas: null,
  context: null,
  width: 0,
  height: 0,
  dpr: 1,
  nodes: [],
  edges: [],
  pulses: [],
  particles: [],
  ripples: [],
  lastTime: 0,
  paused: false,
  influenceX: 0,
  influenceY: 0,
  mouseX: 0,
  mouseY: 0,
  pointerX: 0,
  pointerY: 0,
  pointerActive: false,
  lastTelemetryAt: 0,
  frame: 0
};

var KINETIC_AGENTS = [
  { id: 'selection', code: 'SEL', label: '选品验证', hint: 'MARKET' },
  { id: 'ads', code: 'ADS', label: '广告诊断', hint: 'PPC' },
  { id: 'profit', code: 'FIN', label: '利润财务', hint: 'MARGIN' },
  { id: 'inventory', code: 'INV', label: '库存补货', hint: 'STOCK' },
  { id: 'listing', code: 'LST', label: 'Listing 优化', hint: 'CONTENT' },
  { id: 'compliance', code: 'CMP', label: '合规审查', hint: 'RISK' },
  { id: 'execution', code: 'EXE', label: '执行中心', hint: 'ACTION' }
];

function $(selector) {
  return document.querySelector(selector);
}

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, function (char) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
  });
}

function moduleInfo(id) {
  return UI_MODULES.find(function (item) { return item.id === id; }) || UI_MODULES[0];
}

function marketByCode(code) {
  return MARKETPLACES.find(function (item) { return item.code === code; }) || null;
}

function connectionById(id) {
  return state.apiConnections.find(function (item) { return item.id === id; }) || null;
}

function catalogById(id) {
  return (state.connectorCatalog || []).find(function (item) { return item.connectorId === id || item.id === id; }) || null;
}

function formatTime(value) {
  if (!value) return '从未';
  try { return new Date(value).toLocaleString('zh-CN'); } catch (_error) { return value; }
}

function safeJson(text, fallback) {
  try { return text ? JSON.parse(text) : fallback; } catch (_error) { return fallback; }
}

function createHttpBridge(baseUrl) {
  var root = baseUrl || 'http://127.0.0.1:8787';
  function request(path, options) {
    return fetch(root + path, Object.assign({ headers: { 'content-type': 'application/json', 'x-amazon-token': 'amazon-control-local-v1' } }, options || {})).then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok || data.error) throw new Error(data.error || ('HTTP ' + res.status));
        return data;
      });
    });
  }
  return {
    serviceBaseUrl: root,
    getAppState: function () { return request('/state'); },
    submitTask: function (payload) { return request('/tasks', { method: 'POST', body: JSON.stringify(payload) }); },
    listTasks: function () { return request('/tasks'); },
    getTask: function (taskId) { return request('/tasks/' + encodeURIComponent(taskId)); },
    importCsv: function (moduleKey, filePath) { return request('/import-csv', { method: 'POST', body: JSON.stringify({ module: moduleKey, filePath: filePath }) }); },
    exportTask: function (taskId, format) { return request('/export-task', { method: 'POST', body: JSON.stringify({ taskId: taskId, format: format }) }); },
    listApiConnections: function () { return request('/api/connections'); },
    saveApiConnection: function (payload) { return request('/api/connections', { method: 'POST', body: JSON.stringify(payload) }); },
    deleteApiConnection: function (id) { return request('/api/connections/' + encodeURIComponent(id), { method: 'DELETE' }); },
    testApiConnection: function (id) { return request('/api/connections/' + encodeURIComponent(id) + '/test', { method: 'POST', body: '{}' }); },
    syncApiConnection: function (id) { return request('/api/connections/' + encodeURIComponent(id) + '/sync', { method: 'POST', body: '{}' }); },
    listDataImports: function () { return request('/data/imports'); },
    saveDataImport: function (payload) { return request('/data/imports', { method: 'POST', body: JSON.stringify(payload) }); },
    deleteDataImport: function (id) { return request('/data/imports/' + encodeURIComponent(id), { method: 'DELETE' }); },
    previewDataSource: function (payload) { return request('/data/preview', { method: 'POST', body: JSON.stringify(payload) }); },
    listProjects: function () { return request('/projects'); },
    saveProject: function (payload) { return request('/projects', { method: 'POST', body: JSON.stringify(payload) }); },
    deleteProject: function (id) { return request('/projects/' + encodeURIComponent(id), { method: 'DELETE' }); },
    listApprovals: function () { return request('/approvals'); },
    listActionDrafts: function () { return request('/action-drafts'); },
    listExecutionQueue: function () { return request('/execution-queue'); },
    approveAction: function (id) { return request('/approvals/' + encodeURIComponent(id) + '/approve', { method: 'POST', body: '{}' }); },
    rejectAction: function (id) { return request('/approvals/' + encodeURIComponent(id) + '/reject', { method: 'POST', body: '{}' }); },
    executeApprovedAction: function (id) { return request('/action-drafts/' + encodeURIComponent(id) + '/execute', { method: 'POST', body: '{}' }); },
    listAssets: function (filters) {
      var params = new URLSearchParams(filters || {}).toString();
      return request('/assets' + (params ? '?' + params : ''));
    },
    importAssets: function (payload) { return request('/assets/import', { method: 'POST', body: JSON.stringify(payload) }); },
    uploadAssets: function (payload) { return request('/assets/upload', { method: 'POST', body: JSON.stringify(payload) }); },
    getAsset: function (assetId) { return request('/assets/' + encodeURIComponent(assetId)); },
    deleteAsset: function (assetId) { return request('/assets/' + encodeURIComponent(assetId), { method: 'DELETE' }); },
    listAssistantMessages: function () { return request('/assistant/messages'); },
    submitAssistantMessage: function (payload) { return request('/assistant/chat', { method: 'POST', body: JSON.stringify(payload) }); },
    codexStatus: function () { return request('/codex/status'); },
    submitCodexTask: function (payload) { return request('/codex/tasks', { method: 'POST', body: JSON.stringify(payload) }); },
    listSkills: function () { return request('/skills'); },
    discoverSkills: function (filters) {
      var params = new URLSearchParams(filters || {}).toString();
      return request('/skills/discover' + (params ? '?' + params : ''));
    },
    saveSkill: function (payload) { return request('/skills', { method: 'POST', body: JSON.stringify(payload) }); },
    deleteSkill: function (id) { return request('/skills/' + encodeURIComponent(id), { method: 'DELETE' }); },
    listTools: function () { return request('/tools'); },
    saveTool: function (payload) { return request('/tools', { method: 'POST', body: JSON.stringify(payload) }); },
    deleteTool: function (id) { return request('/tools/' + encodeURIComponent(id), { method: 'DELETE' }); },
    runTool: function (payload) { return request('/tools/' + encodeURIComponent(payload.toolId) + '/run', { method: 'POST', body: JSON.stringify(payload) }); },
    listToolRuns: function () { return request('/tool-runs'); },
    listListingDrafts: function () { return request('/listing-drafts'); },
    saveListingDraft: function (payload) { return request('/listing-drafts', { method: 'POST', body: JSON.stringify(payload) }); },
    deleteListingDraft: function (id) { return request('/listing-drafts/' + encodeURIComponent(id), { method: 'DELETE' }); },
    transitionListingDraft: function (id, status) { return request('/listing-drafts/' + encodeURIComponent(id) + '/transition', { method: 'POST', body: JSON.stringify({ status: status }) }); },
    exportListingDraftCsv: function (id) { return request('/listing-drafts/' + encodeURIComponent(id) + '/export', { method: 'POST', body: '{}' }); },
    listProjectPackages: function () { return request('/project-packages'); },
    exportProjectPackage: function (projectId) { return request('/project-packages/export', { method: 'POST', body: JSON.stringify({ projectId: projectId }) }); },
    importProjectPackage: function (filePath) { return request('/project-packages/import', { method: 'POST', body: JSON.stringify({ filePath: filePath }) }); },
    listProviderProfiles: function () { return request('/provider-profiles'); },
    saveProviderProfile: function (payload) { return request('/provider-profiles', { method: 'POST', body: JSON.stringify(payload) }); },
    deleteProviderProfile: function (id, force) { return request('/provider-profiles/' + encodeURIComponent(id) + (force ? '?force=1' : ''), { method: 'DELETE' }); },
    testProviderProfile: function (id) { return request('/provider-profiles/' + encodeURIComponent(id) + '/test', { method: 'POST', body: '{}' }); },
    listProviderRoutes: function () { return request('/provider-routes'); },
    saveProviderRoute: function (payload) { return request('/provider-routes', { method: 'POST', body: JSON.stringify(payload) }); },
    listAgents: function () { return request('/agents'); },
    saveAgent: function (payload) { return request('/agents', { method: 'POST', body: JSON.stringify(payload) }); },
    deleteAgent: function (id) { return request('/agents/' + encodeURIComponent(id), { method: 'DELETE' }); },
    listAgentFlows: function () { return request('/agent-flows'); },
    saveAgentFlow: function (payload) { return request('/agent-flows', { method: 'POST', body: JSON.stringify(payload) }); },
    publishAgentFlow: function (id) { return request('/agent-flows/' + encodeURIComponent(id) + '/publish', { method: 'POST', body: '{}' }); },
    listWorkflowRuns: function () { return request('/workflow-runs'); },
    getWorkflowRun: function (id) { return request('/workflow-runs/' + encodeURIComponent(id)); },
    submitWorkflowRun: function (payload) { return request('/workflow-runs', { method: 'POST', body: JSON.stringify(payload) }); },
    listMediaOperations: function () { return request('/media/operations'); },
    listMediaRuns: function () { return request('/media/runs'); },
    getMediaRun: function (id) { return request('/media/runs/' + encodeURIComponent(id)); },
    submitMediaRun: function (payload) { return request('/media/runs', { method: 'POST', body: JSON.stringify(payload) }); },
    cancelMediaRun: function (id) { return request('/media/runs/' + encodeURIComponent(id) + '/cancel', { method: 'POST', body: '{}' }); },
    deleteMediaRun: function (id) { return request('/media/runs/' + encodeURIComponent(id), { method: 'DELETE' }); },
    listVerificationResults: function (filters) {
      var params = new URLSearchParams(filters || {}).toString();
      return request('/verifications' + (params ? '?' + params : ''));
    },
    getUsageSummary: function (filters) {
      var params = new URLSearchParams(filters || {}).toString();
      return request('/usage' + (params ? '?' + params : ''));
    }
  };
}

function resolveBridge() {
  if (window.amazonControl && window.amazonControl.getAppState) {
    state.runtimeMode = 'electron';
    return Promise.resolve(window.amazonControl);
  }
  var bridge = createHttpBridge();
  window.amazonControl = bridge;
  return bridge.getAppState().then(function () {
    state.runtimeMode = 'http';
    return bridge;
  }).catch(function () {
    state.runtimeMode = 'preview';
    return createPreviewBridge();
  });
}

function createPreviewBridge() {
  return {
    getAppState: function () {
      return Promise.resolve({
        marketplaces: MARKETPLACES,
        connectorCatalog: DEFAULT_CONNECTOR_CATALOG,
        apiConnections: state.apiConnections || [],
        dataImports: state.dataImports || [],
        assets: state.assets || [],
        assistantMessages: state.assistantMessages || [],
        tasks: state.tasks || [],
        projects: state.projects || [],
        approvals: state.approvals || [],
        syncJobs: state.syncJobs || [],
        skills: state.skills || [],
        tools: state.tools && state.tools.length ? state.tools : DEFAULT_TOOLS,
        toolRuns: state.toolRuns || [],
        listingDrafts: state.listingDrafts || [],
        projectPackages: state.projectPackages || [],
        service: { dataDir: 'D:\\AmazonControlData\\app-store', preview: true }
      });
    },
    submitAssistantMessage: function (payload) {
      var fake = fakeTask({ module: payload.module || 'selection', marketplace: payload.marketplace, message: payload.message });
      var userMessage = { id: 'preview-msg-user-' + Date.now(), role: 'user', content: payload.message || '', createdAt: new Date().toISOString() };
      var assistantMessage = { id: 'preview-msg-assistant-' + Date.now(), role: 'assistant', content: fake.summary, suggestions: ['启动 npm run dev 可保存真实历史'], createdAt: new Date().toISOString() };
      state.assistantMessages = [assistantMessage, userMessage].concat(state.assistantMessages || []);
      return Promise.resolve({ task: fake, userMessage: userMessage, importedData: [], assistantMessage: assistantMessage });
    },
    submitTask: function (payload) { return Promise.resolve(fakeTask(payload)); },
    saveDataImport: function (payload) {
      var saved = Object.assign({ importId: 'preview-import-' + Date.now(), status: 'ready', rowCount: 0 }, payload);
      state.dataImports = [saved].concat(state.dataImports || []);
      return Promise.resolve(saved);
    },
    deleteDataImport: function (id) {
      state.dataImports = (state.dataImports || []).filter(function (item) { return item.importId !== id; });
      return Promise.resolve({ ok: true });
    },
    previewDataSource: function (payload) { return Promise.resolve(localPreviewData(payload)); },
    listProjects: function () { return Promise.resolve(state.projects || []); },
    saveProject: function (payload) {
      var now = new Date().toISOString();
      var project = Object.assign({ id: payload.id || 'preview-project-' + Date.now(), createdAt: now, updatedAt: now }, payload);
      state.projects = [project].concat((state.projects || []).filter(function (item) { return item.id !== project.id; }));
      return Promise.resolve(project);
    },
    deleteProject: function (id) {
      state.projects = (state.projects || []).filter(function (item) { return item.id !== id; });
      return Promise.resolve({ ok: true });
    },
    listApprovals: function () { return Promise.resolve(state.approvals || []); },
    listActionDrafts: function () { return Promise.resolve(state.actionDrafts || []); },
    listExecutionQueue: function () { return Promise.resolve(state.executionQueue || []); },
    approveAction: function (id) {
      var approval = (state.approvals || []).find(function (item) { return item.id === id; });
      if (approval) approval.status = 'approved';
      return Promise.resolve({ id: id, status: 'approved' });
    },
    rejectAction: function (id) {
      var approval = (state.approvals || []).find(function (item) { return item.id === id; });
      if (approval) approval.status = 'rejected';
      return Promise.resolve({ ok: true, status: 'rejected' });
    },
    executeApprovedAction: function (id) {
      var entry = { id: 'preview-exec-' + Date.now(), actionDraftId: id, status: 'waiting_human', createdAt: new Date().toISOString() };
      state.executionQueue = [entry].concat(state.executionQueue || []);
      return Promise.resolve(entry);
    },
    listAssets: function () { return Promise.resolve(state.assets || []); },
    importAssets: function (payload) {
      var now = new Date().toISOString();
      var imported = (payload.filePaths || []).map(function (filePath) {
        return { assetId: 'preview-asset-' + Math.random().toString(16).slice(2), name: filePath.split(/[\\/]/).pop(), kind: 'file', originalPath: filePath, marketplace: payload.marketplace || '', module: payload.module || '', importedAt: now };
      }).concat((payload.links || []).map(function (url) {
        return { assetId: 'preview-asset-' + Math.random().toString(16).slice(2), name: url, kind: 'link', url: url, marketplace: payload.marketplace || '', module: payload.module || '', importedAt: now };
      }));
      state.assets = imported.concat(state.assets || []);
      return Promise.resolve({ imported: imported, assets: state.assets });
    },
    uploadAssets: function (payload) {
      var now = new Date().toISOString();
      var imported = (payload.files || []).map(function (file) {
        var name = file.name || 'upload';
        var kind = /\.(png|jpe?g|webp|gif|bmp|tiff?|avif)$/i.test(name)
          ? 'image'
          : /\.(mp4|mov|avi|mkv|webm|m4v)$/i.test(name)
            ? 'video'
            : /\.csv$/i.test(name)
              ? 'csv'
              : /\.json$/i.test(name)
                ? 'json'
                : 'file';
        return { assetId: 'preview-asset-' + Math.random().toString(16).slice(2), name: name, kind: kind, sourceType: 'upload', url: file.dataUrl, previewUrl: file.dataUrl, marketplace: payload.marketplace || '', module: payload.module || '', importedAt: now };
      });
      state.assets = imported.concat(state.assets || []);
      return Promise.resolve({ imported: imported, errors: [], assets: state.assets });
    },
    deleteAsset: function (assetId) {
      state.assets = (state.assets || []).filter(function (asset) { return asset.assetId !== assetId; });
      return Promise.resolve({ ok: true });
    },
    saveApiConnection: function (payload) {
      var saved = Object.assign({ id: payload.id || 'preview-api-' + Date.now(), status: 'preview' }, payload);
      state.apiConnections = [saved].concat((state.apiConnections || []).filter(function (item) { return item.id !== saved.id; }));
      return Promise.resolve(saved);
    },
    deleteApiConnection: function (id) {
      state.apiConnections = (state.apiConnections || []).filter(function (item) { return item.id !== id; });
      return Promise.resolve({ ok: true });
    },
    testApiConnection: function () { return Promise.resolve({ ok: true, message: '预览模式：请用 npm run dev 启动完整版。' }); },
    syncApiConnection: function () { return Promise.resolve({ ok: true, message: '预览模式：请用 npm run dev 启动完整版。' }); },
    exportTask: function () { return Promise.reject(new Error('预览模式无法写出文件，请启动 Electron 完整版。')); },
    codexStatus: function () {
      return Promise.resolve({ available: false, mode: 'preview', provider: '', reason: '预览模式未连接本地服务。' });
    },
    submitCodexTask: function (payload) { return Promise.resolve(fakeTask(Object.assign({}, payload, { module: 'codex' }))); },
    listSkills: function () { return Promise.resolve(state.skills || []); },
    saveSkill: function (payload) {
      var skill = Object.assign({ id: payload.id || 'preview-skill-' + Date.now(), enabled: true }, payload);
      state.skills = [skill].concat((state.skills || []).filter(function (item) { return item.id !== skill.id; }));
      return Promise.resolve(skill);
    },
    deleteSkill: function (id) { state.skills = (state.skills || []).filter(function (item) { return item.id !== id; }); return Promise.resolve({ ok: true }); },
    listTools: function () { return Promise.resolve(state.tools || DEFAULT_TOOLS); },
    saveTool: function (payload) {
      var tool = Object.assign({ id: payload.id || 'preview-tool-' + Date.now(), status: 'available' }, payload);
      state.tools = [tool].concat((state.tools || DEFAULT_TOOLS).filter(function (item) { return item.id !== tool.id; }));
      return Promise.resolve(tool);
    },
    deleteTool: function (id) { state.tools = (state.tools || []).filter(function (item) { return item.id !== id; }); return Promise.resolve({ ok: true }); },
    runTool: function (payload) {
      var tool = (state.tools || DEFAULT_TOOLS).find(function (item) { return item.id === payload.toolId; }) || { module: 'data' };
      var task = fakeTask({ module: tool.module || 'data', message: payload.message || tool.description || '' });
      state.toolRuns = [{ runId: 'preview-run-' + Date.now(), toolId: tool.id, toolName: tool.name, taskId: task.taskId, status: 'completed', summary: task.summary, createdAt: new Date().toISOString() }].concat(state.toolRuns || []);
      return Promise.resolve(task);
    },
    listToolRuns: function () { return Promise.resolve(state.toolRuns || []); },
    listListingDrafts: function () { return Promise.resolve(state.listingDrafts || []); },
    saveListingDraft: function (payload) {
      var draft = Object.assign({ id: payload.id || 'preview-listing-' + Date.now(), status: 'draft', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }, payload);
      state.listingDrafts = [draft].concat((state.listingDrafts || []).filter(function (item) { return item.id !== draft.id; }));
      return Promise.resolve(draft);
    },
    deleteListingDraft: function (id) { state.listingDrafts = (state.listingDrafts || []).filter(function (item) { return item.id !== id; }); return Promise.resolve({ ok: true }); },
    transitionListingDraft: function (id, status) {
      var draft = (state.listingDrafts || []).find(function (item) { return item.id === id; });
      if (draft) { draft.status = status; draft.updatedAt = new Date().toISOString(); }
      return Promise.resolve(draft || { id: id, status: status });
    },
    exportListingDraftCsv: function () { return Promise.reject(new Error('预览模式无法写出文件，请启动 Electron 完整版。')); },
    listProjectPackages: function () { return Promise.resolve(state.projectPackages || []); },
    exportProjectPackage: function () { return Promise.reject(new Error('预览模式无法打包项目，请启动 Electron 完整版。')); },
    importProjectPackage: function () { return Promise.reject(new Error('预览模式无法导入项目包，请启动 Electron 完整版。')); }
  };
}

function renderRuntime() {
  var banner = $('#runtimeBanner');
  var status = $('#serviceStatus');
  var topStatus = $('#topRuntimeStatus');
  if (!banner || !status) return;
  if (state.runtimeMode === 'electron' || state.runtimeMode === 'http') {
    banner.className = 'runtime-banner connected';
    banner.textContent = state.runtimeMode === 'electron' ? 'Electron 完整版已连接，本地数据会保存到 D 盘。' : '网页预览已连接本地服务，可正常体验。';
    status.textContent = '本地服务已连接';
    if (topStatus) topStatus.textContent = '本地服务已连接';
  } else {
    banner.className = 'runtime-banner preview';
    banner.textContent = '当前是静态预览模式。请用 npm run dev 或 EXE 启动完整版，否则不会真实保存。';
    status.textContent = '预览模式';
    if (topStatus) topStatus.textContent = '预览模式';
  }
}

function pushDeckEvent(message, tone) {
  var ticker = $('#deckTicker');
  var tickerText = $('#deckTickerText');
  if (!ticker || !tickerText) return;
  var stamp = new Date().toLocaleTimeString('zh-CN', { hour12: false });
  tickerText.textContent = stamp + ' // ' + message;
  ticker.classList.remove('alert', 'success');
  if (tone) ticker.classList.add(tone);
  tickerText.classList.remove('tick');
  void tickerText.offsetWidth;
  tickerText.classList.add('tick');
}

function applyViewMode(mode, persist) {
  var reevoMode = mode !== 'ops';
  document.body.classList.toggle('reevo-mode', reevoMode);
  document.body.classList.toggle('ops-mode', !reevoMode);
  document.body.classList.remove('deck-mode');
  deckScene.paused = !reevoMode;
  var toggle = $('#deckModeToggle');
  if (toggle) {
    toggle.textContent = reevoMode ? 'REEVO MODE' : 'OPS MODE';
    toggle.setAttribute('aria-pressed', String(reevoMode));
  }
  if (persist) localStorage.setItem('amazonControl.viewMode.v2', reevoMode ? 'reevo' : 'ops');
  pushDeckEvent(reevoMode ? 'VIEW // REEVO MODE' : 'VIEW // OPS MODE', reevoMode ? 'success' : '');
}

function initViewMode() {
  var saved = localStorage.getItem('amazonControl.viewMode.v2') || 'reevo';
  applyViewMode(saved, false);
  var toggle = $('#deckModeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = document.body.classList.contains('reevo-mode') ? 'ops' : 'reevo';
      applyViewMode(next, true);
    });
  }
}

function resizeDeckCanvas() {
  var canvas = deckScene.canvas;
  if (!canvas) return;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  deckScene.width = width;
  deckScene.height = height;
  deckScene.dpr = dpr;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  deckScene.context.setTransform(dpr, 0, 0, dpr, 0, 0);
  buildDeckParticles();
}

function buildDeckScene() {
  var labels = [
    ['AI CORE', 0, 0, '#ff6a3d'],
    ['CHAT', 1, -90, '#5eead4'],
    ['DATA', 1, -30, '#5eead4'],
    ['ADS', 1, 30, '#ffb020'],
    ['PROFIT', 1, 90, '#5eead4'],
    ['LISTING', 1, 150, '#ffb020'],
    ['INVENTORY', 1, 210, '#5eead4'],
    ['US', 2, -90, '#5eead4'],
    ['DE', 2, -48, '#5eead4'],
    ['JP', 2, -6, '#ffb020'],
    ['UK', 2, 36, '#5eead4'],
    ['CA', 2, 78, '#5eead4'],
    ['AU', 2, 120, '#5eead4'],
    ['BR', 2, 162, '#ffb020'],
    ['MX', 2, 204, '#5eead4'],
    ['IN', 2, 246, '#5eead4'],
    ['API', 3, -120, '#5eead4'],
    ['MEDIA', 3, -20, '#ffb020'],
    ['COMPLIANCE', 3, 80, '#fb7185'],
    ['EXECUTION', 3, 180, '#5eead4']
  ];
  deckScene.nodes = labels.map(function (item) {
    var ring = item[1];
    var angle = item[2] * Math.PI / 180;
    var radius = ring === 0 ? 0 : ring === 1 ? .18 : ring === 2 ? .34 : .46;
    return {
      label: item[0],
      ring: ring,
      angle: angle,
      radius: radius,
      color: item[3]
    };
  });
  deckScene.edges = [];
  for (var index = 1; index < deckScene.nodes.length; index += 1) {
    deckScene.edges.push({ from: 0, to: index, phase: Math.random(), speed: .08 + Math.random() * .06 });
  }
  for (var start = 1; start <= 6; start += 1) {
    deckScene.edges.push({ from: start, to: start === 6 ? 1 : start + 1, phase: Math.random(), speed: .07 + Math.random() * .05 });
  }
  for (var outer = 7; outer <= 15; outer += 1) {
    deckScene.edges.push({ from: outer, to: outer === 15 ? 7 : outer + 1, phase: Math.random(), speed: .06 + Math.random() * .05 });
  }
  deckScene.pulses = [];
}

function buildDeckParticles() {
  var count = Math.min(120, Math.max(48, Math.floor(deckScene.width * deckScene.height / 16000)));
  var palette = ['#ff6a3d', '#5eead4', '#facc15', '#fb7185', '#7dd3fc'];
  deckScene.particles = [];
  for (var index = 0; index < count; index += 1) {
    deckScene.particles.push({
      x: Math.random() * deckScene.width,
      y: Math.random() * deckScene.height,
      vx: (Math.random() - .5) * .16,
      vy: (Math.random() - .5) * .16,
      size: .6 + Math.random() * 1.25,
      depth: .45 + Math.random() * .55,
      color: palette[Math.floor(Math.random() * palette.length)]
    });
  }
}

function burstDeckParticles(x, y, strength) {
  var forceScale = strength || 1;
  deckScene.ripples.push({ x: x, y: y, radius: 0, alpha: .85 });
  deckScene.particles.forEach(function (particle) {
    var dx = particle.x - x;
    var dy = particle.y - y;
    var distance = Math.sqrt(dx * dx + dy * dy) || 1;
    if (distance > 240) return;
    var force = (1 - distance / 240) * .55 * forceScale;
    particle.vx += dx / distance * force;
    particle.vy += dy / distance * force;
  });
}

function drawDeckParticles(ctx, delta, time, lightTheme) {
  var particles = deckScene.particles;
  var pointerX = deckScene.pointerX;
  var pointerY = deckScene.pointerY;
  particles.forEach(function (particle) {
    particle.x += particle.vx * delta * 60;
    particle.y += particle.vy * delta * 60;
    particle.vx *= .994;
    particle.vy *= .994;
    if (deckScene.pointerActive) {
      var dx = particle.x - pointerX;
      var dy = particle.y - pointerY;
      var distance = Math.sqrt(dx * dx + dy * dy) || 1;
      if (distance < 170) {
        var repel = (1 - distance / 170) * .018;
        particle.vx += dx / distance * repel;
        particle.vy += dy / distance * repel;
      }
    }
    var influence = .008 * particle.depth;
    particle.vx += deckScene.influenceX * influence;
    particle.vy += deckScene.influenceY * influence;
    particle.vx = Math.max(-.65, Math.min(.65, particle.vx));
    particle.vy = Math.max(-.65, Math.min(.65, particle.vy));
    if (particle.x < -20) particle.x = deckScene.width + 20;
    if (particle.x > deckScene.width + 20) particle.x = -20;
    if (particle.y < -20) particle.y = deckScene.height + 20;
    if (particle.y > deckScene.height + 20) particle.y = -20;
  });
  var maxDistance = lightTheme ? 102 : 124;
  ctx.lineWidth = lightTheme ? .52 : .62;
  for (var first = 0; first < particles.length; first += 1) {
    var a = particles[first];
    for (var second = first + 1; second < particles.length; second += 1) {
      var b = particles[second];
      var dx = a.x - b.x;
      var dy = a.y - b.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > maxDistance) continue;
      var alpha = (1 - distance / maxDistance) * (lightTheme ? .11 : .16);
      ctx.strokeStyle = lightTheme
        ? 'rgba(18, 18, 18, ' + alpha + ')'
        : 'rgba(94, 234, 212, ' + alpha + ')';
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }
  particles.forEach(function (particle) {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * particle.depth, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.globalAlpha = lightTheme ? .5 : .62;
    ctx.fill();
    ctx.globalAlpha = 1;
  });
  deckScene.ripples = deckScene.ripples.filter(function (ripple) {
    ripple.radius += delta * 220;
    ripple.alpha -= delta * .7;
    if (ripple.alpha <= 0) return false;
    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.strokeStyle = lightTheme
      ? 'rgba(249, 106, 26, ' + ripple.alpha * .55 + ')'
      : 'rgba(255, 106, 61, ' + ripple.alpha * .7 + ')';
    ctx.lineWidth = 1;
    ctx.stroke();
    return true;
  });
}

function nodePosition(node, index, time) {
  var width = deckScene.width;
  var height = deckScene.height;
  var centerX = width * .5 + deckScene.mouseX * 12 + deckScene.influenceX * 24;
  var centerY = height * .44 + deckScene.mouseY * 8 + deckScene.influenceY * 18;
  var pulse = node.ring === 0 ? 0 : Math.sin(time * .55 + index) * 5;
  var radius = Math.min(width, height) * node.radius;
  return {
    x: centerX + Math.cos(node.angle + time * (node.ring === 0 ? 0 : node.ring === 1 ? .018 : .008)) * (radius + pulse),
    y: centerY + Math.sin(node.angle + time * (node.ring === 0 ? 0 : node.ring === 1 ? .018 : .008)) * (radius * .62 + pulse)
  };
}

function deckSignal(type) {
  if (!deckScene.edges.length) return;
  var color = type === 'alert' ? '#fb7185' : type === 'success' ? '#5eead4' : type === 'route' ? '#facc15' : '#ff6a3d';
  var count = type === 'task' ? 18 : type === 'success' ? 14 : 9;
  for (var index = 0; index < count; index += 1) {
    var edge = deckScene.edges[Math.floor(Math.random() * deckScene.edges.length)];
    deckScene.pulses.push({ edge: edge, t: -Math.random() * .35, speed: .18 + Math.random() * .22, color: color });
  }
  var burstX = deckScene.pointerActive ? deckScene.pointerX : deckScene.width / 2;
  var burstY = deckScene.pointerActive ? deckScene.pointerY : deckScene.height / 2;
  burstDeckParticles(burstX, burstY, type === 'alert' ? 1.35 : type === 'success' ? .75 : 1);
}

function drawDeckScene(now) {
  var ctx = deckScene.context;
  var canvas = deckScene.canvas;
  if (!ctx || !canvas) return;
  if (!deckScene.lastTime) deckScene.lastTime = now;
  var delta = Math.min((now - deckScene.lastTime) / 1000, .05);
  deckScene.lastTime = now;
  var time = now / 1000;
  ctx.clearRect(0, 0, deckScene.width, deckScene.height);
  var lightTheme = document.body.classList.contains('reevo-mode');
  if (!deckScene.paused && !document.hidden) {
    drawDeckParticles(ctx, delta, time, lightTheme);
    ctx.save();
    ctx.globalCompositeOperation = lightTheme ? 'source-over' : 'lighter';
    var center = nodePosition(deckScene.nodes[0], 0, time);
    for (var ring = 1; ring <= 3; ring += 1) {
      ctx.beginPath();
      ctx.ellipse(center.x, center.y, Math.min(deckScene.width, deckScene.height) * (ring === 1 ? .18 : ring === 2 ? .34 : .46), Math.min(deckScene.width, deckScene.height) * (ring === 1 ? .11 : ring === 2 ? .21 : .29), 0, 0, Math.PI * 2);
      ctx.strokeStyle = lightTheme
        ? 'rgba(18, 18, 18, ' + (0.028 + ring * .008) + ')'
        : 'rgba(34, 211, 238, ' + (0.035 + ring * .012) + ')';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    var positions = deckScene.nodes.map(function (node, index) { return nodePosition(node, index, time); });
    deckScene.edges.forEach(function (edge) {
      var from = positions[edge.from];
      var to = positions[edge.to];
      var gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
      gradient.addColorStop(0, lightTheme ? 'rgba(18, 18, 18, .018)' : 'rgba(94, 234, 212, .025)');
      gradient.addColorStop(.5, lightTheme ? 'rgba(249, 106, 26, .13)' : 'rgba(255, 106, 61, .15)');
      gradient.addColorStop(1, lightTheme ? 'rgba(53, 139, 240, .02)' : 'rgba(94, 234, 212, .025)');
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = .7;
      ctx.stroke();
    });
    if (Math.random() < .12) {
      var idleEdge = deckScene.edges[Math.floor(Math.random() * deckScene.edges.length)];
      deckScene.pulses.push({ edge: idleEdge, t: 0, speed: .1 + Math.random() * .12, color: '#5eead4' });
    }
    deckScene.pulses = deckScene.pulses.filter(function (pulse) {
      pulse.t += delta * pulse.speed;
      if (pulse.t > 1.2) return false;
      if (pulse.t >= 0) {
        var from = positions[pulse.edge.from];
        var to = positions[pulse.edge.to];
        var x = from.x + (to.x - from.x) * pulse.t;
        var y = from.y + (to.y - from.y) * pulse.t;
        ctx.beginPath();
        ctx.arc(x, y, 1.7, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.shadowBlur = 14;
        ctx.shadowColor = pulse.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      return true;
    });
    positions.forEach(function (position, index) {
      var node = deckScene.nodes[index];
      var radius = node.ring === 0 ? 6 : node.ring === 1 ? 3.2 : 2.2;
      ctx.beginPath();
      ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.shadowBlur = node.ring === 0 ? 24 : 12;
      ctx.shadowColor = node.color;
      ctx.fill();
      ctx.shadowBlur = 0;
      if (node.ring !== 0) {
        ctx.font = '9px "Cascadia Mono", Consolas, monospace';
        ctx.fillStyle = lightTheme ? 'rgba(18, 18, 18, .42)' : 'rgba(234, 251, 244, .46)';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, position.x, position.y + 14);
      }
    });
    ctx.restore();
    if (now - deckScene.lastTelemetryAt > 500) {
      deckScene.lastTelemetryAt = now;
      var telemetry = $('#deckTelemetry');
      if (telemetry) telemetry.textContent = 'FIELD ' + deckScene.particles.length + ' / LIVE';
    }
  }
  deckScene.frame = window.requestAnimationFrame(drawDeckScene);
}

function initDeckCanvas() {
  var canvas = $('#deckCanvas');
  if (!canvas) return;
  deckScene.canvas = canvas;
  deckScene.context = canvas.getContext('2d');
  resizeDeckCanvas();
  buildDeckScene();
  window.addEventListener('resize', resizeDeckCanvas);
  window.addEventListener('mousemove', function (event) {
    deckScene.mouseX = (event.clientX / Math.max(window.innerWidth, 1) - .5) * 2;
    deckScene.mouseY = (event.clientY / Math.max(window.innerHeight, 1) - .5) * 2;
    deckScene.pointerX = event.clientX;
    deckScene.pointerY = event.clientY;
    deckScene.pointerActive = true;
  });
  document.addEventListener('pointerdown', function (event) {
    var interactive = event.target.closest('button, input, textarea, select, a, label');
    if (!interactive) burstDeckParticles(event.clientX, event.clientY, 1);
  });
  document.addEventListener('visibilitychange', function () {
    deckScene.lastTime = 0;
  });
  deckScene.frame = window.requestAnimationFrame(drawDeckScene);
}

function renderMissionTimeline() {
  var steps = ['INTENT', 'ROUTE', 'INGEST', 'ANALYZE', 'SAVE'];
  var stage = state.missionStage || (currentResultForTab(getActiveTab()) ? 'completed' : 'idle');
  var completed = stage === 'completed' ? steps.length : stage === 'running' ? 2 : stage === 'failed' ? 2 : 0;
  return '<div class="mission-timeline" aria-label="任务执行阶段">' + steps.map(function (step, index) {
    var className = index < completed ? 'done' : (stage === 'running' && index === completed ? 'active' : (stage === 'failed' && index === completed ? 'failed' : ''));
    return '<div class="mission-step ' + className + '">' + esc(step) + '</div>';
  }).join('') + '</div>';
}

function renderKineticDock() {
  return '<div class="kinetic-dock-shell">' +
    '<div class="kinetic-dock-head"><span>AGENT KINETIC DOCK</span><span class="kinetic-dock-status">SPRING LINKED</span></div>' +
    '<div id="kineticDock" class="kinetic-dock">' + KINETIC_AGENTS.map(function (agent) {
      return '<button class="kinetic-chip" data-agent="' + esc(agent.id) + '" type="button"><span class="kinetic-chip-node">' + esc(agent.code) + '</span><span class="kinetic-chip-copy"><strong>' + esc(agent.label) + '</strong><small>' + esc(agent.hint) + '</small></span></button>';
    }).join('') + '</div>' +
  '</div>';
}

function stageDeckInfluence(x, y, strength) {
  var width = Math.max(window.innerWidth, 1);
  var height = Math.max(window.innerHeight, 1);
  var factor = strength || 1;
  deckScene.influenceX = ((x / width) - .5) * 2 * factor;
  deckScene.influenceY = ((y / height) - .5) * 2 * factor;
}

function animateBootWithAnime() {
  if (!window.anime || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var spring = anime.spring({ stiffness: 145, damping: 15, mass: 1 });
  anime.animate('.boot-logo-wrap', {
    opacity: [0, 1],
    scale: [.35, 1],
    rotate: [-24, 0],
    duration: 920,
    ease: spring
  });
  anime.animate('.boot-logo', {
    scale: [.82, 1],
    duration: 1100,
    ease: spring
  });
  anime.animate('.boot-title', {
    opacity: [0, 1],
    translateY: [18, 0],
    duration: 680,
    delay: 80,
    ease: spring
  });
  anime.animate('.boot-subtitle', {
    opacity: [0, 1],
    translateY: [10, 0],
    duration: 520,
    delay: 150,
    ease: 'out(3)'
  });
  anime.animate('.boot-nodes span', {
    opacity: [0, 1],
    scale: [.2, 1],
    duration: 520,
    delay: anime.stagger(65),
    ease: spring
  });
  anime.animate('.boot-progress span', {
    opacity: [0, 1],
    scaleX: [0, 1],
    duration: 360,
    delay: anime.stagger(120),
    ease: 'out(3)'
  });
}

function animateWorkspaceKinetics() {
  if (!window.anime || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var panes = document.querySelectorAll('#moduleWorkspace .module-pane');
  if (panes.length) {
    anime.animate(panes, {
      opacity: [0, 1],
      translateY: [16, 0],
      scale: [.985, 1],
      duration: 620,
      delay: anime.stagger(38),
      ease: anime.spring({ stiffness: 155, damping: 17, mass: 1 })
    });
  }
  var metrics = document.querySelectorAll('#moduleWorkspace .metric-card');
  if (metrics.length) {
    anime.animate(metrics, {
      opacity: [0, 1],
      scale: [.92, 1],
      duration: 560,
      delay: anime.stagger(42),
      ease: anime.spring({ stiffness: 180, damping: 16 })
    });
  }
  initMagneticKinetics();
  initDraggableAgentChips();
  initScrollKinetics();
}

function initMagneticKinetics() {
  if (!window.anime || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  Array.prototype.forEach.call(document.querySelectorAll('.nav-item, .primary-button, .ghost-button, .catalog-card'), function (element) {
    if (element.dataset.magneticBound) return;
    element.dataset.magneticBound = 'true';
    var strength = element.classList.contains('nav-item') ? .08 : .045;
    element.addEventListener('pointermove', function (event) {
      var rect = element.getBoundingClientRect();
      var x = (event.clientX - rect.left - rect.width / 2) * strength;
      var y = (event.clientY - rect.top - rect.height / 2) * strength;
      anime.animate(element, { translateX: x, translateY: y, duration: 220, ease: 'out(3)' });
    });
    element.addEventListener('pointerleave', function () {
      anime.animate(element, {
        translateX: 0,
        translateY: 0,
        duration: 520,
        ease: anime.spring({ stiffness: 180, damping: 15 })
      });
    });
  });
}

function springBackDraggable(draggable, includeY) {
  if (!draggable || !window.anime) return;
  var position = { x: draggable.x, y: draggable.y };
  anime.animate(position, {
    x: 0,
    y: includeY ? 0 : position.y,
    duration: 820,
    ease: anime.spring({ stiffness: 190, damping: 16, mass: 1 }),
    onUpdate: function () {
      draggable.setX(position.x);
      if (includeY) draggable.setY(position.y);
    }
  });
}

function initDraggableAgentChips() {
  if (!window.anime || !anime.createDraggable || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  Array.prototype.forEach.call(document.querySelectorAll('.kinetic-chip'), function (chip) {
    if (chip.dataset.draggableBound) return;
    chip.dataset.draggableBound = 'true';
    var moved = false;
    anime.createDraggable(chip, {
      container: '#kineticDock',
      x: { snap: 0 },
      y: false,
      dragSpeed: 1.1,
      releaseStiffness: 210,
      releaseDamping: 17,
      releaseMass: 1,
      onGrab: function () {
        moved = false;
        chip.classList.add('is-dragging');
        deckSignal('task');
        anime.animate(chip.querySelector('.kinetic-chip-node'), {
          scale: [1, 1.32],
          rotate: [0, 360],
          duration: 520,
          ease: 'out(3)'
        });
      },
      onDrag: function (draggable) {
        moved = true;
        var rect = chip.getBoundingClientRect();
        stageDeckInfluence(rect.left + rect.width / 2, rect.top + rect.height / 2, .85);
        if (Math.random() < .08) deckSignal('route');
      },
      onRelease: function (draggable) {
        springBackDraggable(draggable, false);
      },
      onSettle: function () {
        chip.classList.remove('is-dragging');
        stageDeckInfluence(window.innerWidth / 2, window.innerHeight / 2, 0);
        deckSignal('success');
        anime.animate(chip.querySelector('.kinetic-chip-node'), {
          scale: 1,
          rotate: 0,
          duration: 650,
          ease: anime.spring({ stiffness: 190, damping: 15 })
        });
      }
    });
    chip.addEventListener('click', function () {
      if (!moved) switchModule(chip.dataset.agent);
    });
  });
}

function initKineticOrb() {
  var orb = $('#kineticOrb');
  if (!orb || !window.anime || !anime.createDraggable || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  anime.createDraggable(orb, {
    container: 'body',
    x: { snap: 0 },
    y: { snap: 0 },
    dragSpeed: 1.15,
    releaseStiffness: 190,
    releaseDamping: 16,
    releaseMass: 1,
    onGrab: function () {
      orb.classList.add('is-dragging');
      deckSignal('task');
    },
    onDrag: function () {
      var rect = orb.getBoundingClientRect();
      stageDeckInfluence(rect.left + rect.width / 2, rect.top + rect.height / 2, 1.15);
      if (Math.random() < .1) deckSignal('route');
    },
    onRelease: function (draggable) {
      springBackDraggable(draggable, true);
    },
    onSettle: function () {
      orb.classList.remove('is-dragging');
      stageDeckInfluence(window.innerWidth / 2, window.innerHeight / 2, 0);
      deckSignal('success');
    }
  });
}

function initKineticCursor() {
  var cursor = $('#kineticCursor');
  var coords = $('#kineticCoords');
  if (!cursor || !coords || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  window.addEventListener('pointermove', function (event) {
    cursor.classList.add('is-visible');
    cursor.style.transform = 'translate3d(' + event.clientX + 'px,' + event.clientY + 'px,0)';
    coords.textContent = String(event.clientX).padStart(3, '0') + ' / ' + String(event.clientY).padStart(3, '0');
  }, { passive: true });
  document.addEventListener('pointerdown', function () { cursor.classList.add('is-active'); });
  document.addEventListener('pointerup', function () { cursor.classList.remove('is-active'); });
  document.addEventListener('pointerleave', function () { cursor.classList.remove('is-visible'); });
  document.addEventListener('pointerenter', function () { cursor.classList.add('is-visible'); });
}

function initScrollKinetics() {
  if (!window.anime || !window.IntersectionObserver || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var targets = document.querySelectorAll('.metric-card, .artifact-card, .history-task, .preview-callout');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting || entry.target.dataset.scrollLinked) return;
      entry.target.dataset.scrollLinked = 'true';
      anime.animate(entry.target, {
        opacity: [0, 1],
        translateY: [18, 0],
        scale: [.97, 1],
        duration: 620,
        ease: anime.spring({ stiffness: 165, damping: 17 })
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: .16 });
  Array.prototype.forEach.call(targets, function (target) {
    if (!target.dataset.scrollLinked) observer.observe(target);
  });
}

function initAnimeMotion() {
  animateBootWithAnime();
  initKineticOrb();
  initKineticCursor();
}

function renderContextControls() {
  var marketSelect = $('#marketplaceSelect');
  marketSelect.innerHTML = '<option value="">请选择站点</option>' + MARKETPLACES.map(function (item) {
    return '<option value="' + esc(item.code) + '">' + esc(item.name) + ' / ' + esc(item.currency) + '</option>';
  }).join('');
  var selectedProject = (state.projects || []).find(function (item) { return item.id === state.selectedProjectId; }) || null;
  var savedMarket = localStorage.getItem('amazonControl.marketplace') || '';
  if (selectedProject) {
    marketSelect.value = selectedProject.marketplace || '';
  } else if (savedMarket) {
    marketSelect.value = savedMarket;
  }
  state.market = marketByCode(marketSelect.value);

  var connectorSelect = $('#connectorSelect');
  var connections = state.apiConnections || [];
  var catalog = state.connectorCatalog && state.connectorCatalog.length ? state.connectorCatalog : DEFAULT_CONNECTOR_CATALOG;
  connectorSelect.innerHTML = '<option value="">未选择接口</option>' + connections.map(function (item) {
    return '<option value="' + esc(item.id) + '">已配置：' + esc(item.name) + '</option>';
  }).join('') + catalog.map(function (item) {
    return '<option value="' + esc(item.connectorId) + '">模板：' + esc(item.name) + '</option>';
  }).join('');
  if (state.selectedConnectorValue) connectorSelect.value = state.selectedConnectorValue;
  else if (selectedProject && selectedProject.connectorId) connectorSelect.value = selectedProject.connectorId;

  $('#projectNameInput').value = selectedProject ? (selectedProject.name || '') : (localStorage.getItem('amazonControl.projectName') || '');
  $('#dataSourceSelect').value = localStorage.getItem('amazonControl.dataSource') || 'manual';
  if (selectedProject && selectedProject.dataSource) $('#dataSourceSelect').value = selectedProject.dataSource;
  updateContextBar();
}

function updateContextBar() {
  var code = $('#marketplaceSelect').value || '';
  state.market = marketByCode(code);
  localStorage.setItem('amazonControl.marketplace', code);
  localStorage.setItem('amazonControl.dataSource', $('#dataSourceSelect').value || 'manual');
  if (state.market) {
    $('#marketContext').textContent = state.market.name + ' / ' + state.market.currency;
    $('#marketMeta').textContent = state.market.language + ' / ' + state.market.region + ' / Ads ' + state.market.adsRegion;
  } else {
    $('#marketContext').textContent = '未选择站点';
    $('#marketMeta').textContent = '聊天分析前需要站点，避免币种和规则误判';
  }
  var topProjectContext = $('#topProjectContext');
  if (topProjectContext) {
    var projectName = $('#projectNameInput') && $('#projectNameInput').value ? $('#projectNameInput').value : '未命名项目';
    topProjectContext.textContent = projectName + ' / ' + (state.market ? state.market.name + ' / ' + state.market.currency : '未选择站点');
  }
  var selected = $('#connectorSelect').value || '';
  var conn = connectionById(selected);
  var catalog = catalogById(selected);
  if (conn) {
    $('#apiContext').textContent = conn.name + ' / ' + (conn.status || 'configured');
    $('#syncContext').textContent = '同步：' + formatTime(conn.lastSyncAt) + '，字段：' + ((conn.fieldMapping && Object.keys(conn.fieldMapping).join(', ')) || '按接口模板');
  } else if (catalog) {
    $('#apiContext').textContent = '模板：' + catalog.name;
    $('#syncContext').textContent = '字段：' + ((catalog.fields || []).slice(0, 4).join(', ') || '待配置');
  } else {
    $('#apiContext').textContent = '接口未配置';
    $('#syncContext').textContent = '同步：等待配置';
  }
}

function renderModuleNav() {
  var html = '';
  var groupLabels = { '产品增长': '运营', '内容生产': '内容', '基础建档': '系统', '系统协作': '系统', '执行交付': '系统', '智能入口': '系统' };
  var groupOrder = ['系统', '运营', '内容'];
  var byGroup = {};
  UI_MODULES.forEach(function (item) {
    var group = groupLabels[item.group] || item.group;
    byGroup[group] = byGroup[group] || [];
    byGroup[group].push(item);
  });
  groupOrder.forEach(function (group) {
    var items = byGroup[group] || [];
    if (!items.length) return;
    html += '<div class="nav-group">' + esc(group) + '</div>';
    items.forEach(function (item) {
      var isContent = group === '内容';
      html += '<button class="nav-item' + (state.activeModule === item.id ? ' active' : '') + (isContent ? ' nav-content' : '') + '"' + (state.activeModule === item.id ? ' aria-current="page"' : '') + ' data-module="' + esc(item.id) + '" title="' + esc(item.title) + '" type="button"><span class="nav-code">' + esc(String(item.shortTitle || item.title).slice(0, 2)) + '</span><span class="nav-copy"><strong>' + esc(item.title) + '</strong><small>' + esc(item.summary) + '</small></span><span class="nav-state"></span></button>';
    });
  });
  $('#moduleNav').innerHTML = html;
}

function browserTabTitle(moduleId) {
  return moduleId === 'newtab' ? '新标签页' : moduleInfo(moduleId).title;
}

function getActiveTab() {
  return state.tabs.find(function (tab) { return tab.id === state.activeTabId; }) || null;
}

function currentResultForTab(tab) {
  if (!tab || !tab.currentResultId) return null;
  return (state.tasks || []).find(function (task) { return task.taskId === tab.currentResultId; }) || null;
}

function setCurrentResult(task) {
  state.currentResult = task || null;
  var tab = getActiveTab();
  if (tab) tab.currentResultId = task ? task.taskId : '';
  saveBrowserTabs();
}

function setActiveTabStatus(status) {
  var tab = getActiveTab();
  if (!tab) return;
  tab.status = status;
  saveBrowserTabs();
  renderBrowserShell();
}

function createBrowserTab(moduleId, options) {
  var resolved = moduleId || 'newtab';
  return {
    id: 'tab-' + Date.now() + '-' + Math.random().toString(16).slice(2, 6),
    module: resolved,
    title: browserTabTitle(resolved),
    history: [resolved],
    historyIndex: 0,
    scrollTop: 0,
    currentResultId: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'idle'
  };
}

function saveBrowserTabs() {
  try {
    localStorage.setItem('amazonControl.browserTabs.v1', JSON.stringify({
      activeTabId: state.activeTabId,
      closedTabs: (state.closedTabs || []).slice(0, 12),
      tabs: (state.tabs || []).map(function (tab) {
        return {
          id: tab.id,
          module: tab.module,
          title: tab.title,
          history: tab.history,
          historyIndex: tab.historyIndex,
          scrollTop: tab.scrollTop,
          currentResultId: tab.currentResultId,
          createdAt: tab.createdAt,
          updatedAt: tab.updatedAt,
          status: tab.status
        };
      })
    }));
  } catch (_error) {
    // Storage is optional; tabs still work in memory.
  }
}

function restoreBrowserTabs() {
  var restored = null;
  try {
    restored = JSON.parse(localStorage.getItem('amazonControl.browserTabs.v1') || 'null');
  } catch (_error) {
    restored = null;
  }
  if (restored && Array.isArray(restored.tabs) && restored.tabs.length) {
    state.tabs = restored.tabs.map(function (tab) {
      var moduleId = tab.module === 'newtab' || moduleInfo(tab.module).id === tab.module ? tab.module : 'assistant';
      return {
        id: tab.id || 'tab-' + Date.now() + '-' + Math.random().toString(16).slice(2, 6),
        module: moduleId,
        title: tab.title || browserTabTitle(moduleId),
        history: Array.isArray(tab.history) && tab.history.length ? tab.history : [moduleId],
        historyIndex: Number.isFinite(tab.historyIndex) ? tab.historyIndex : 0,
        scrollTop: Number(tab.scrollTop || 0),
        currentResultId: tab.currentResultId || '',
        createdAt: tab.createdAt || new Date().toISOString(),
        updatedAt: tab.updatedAt || new Date().toISOString(),
        status: tab.status || 'idle'
      };
    });
    state.closedTabs = Array.isArray(restored.closedTabs) ? restored.closedTabs : [];
    state.activeTabId = state.tabs.some(function (tab) { return tab.id === restored.activeTabId; })
      ? restored.activeTabId
      : state.tabs[0].id;
    state.activeModule = getActiveTab().module;
    return;
  }
  var initial = createBrowserTab('newtab');
  state.tabs = [initial];
  state.activeTabId = initial.id;
  state.activeModule = 'newtab';
}

function activateTab(tabId, options) {
  var current = getActiveTab();
  if (current && current.id === tabId && !(options && options.force)) return;
  if (current) current.scrollTop = window.scrollY || 0;
  var target = state.tabs.find(function (tab) { return tab.id === tabId; });
  if (!target) return;
  state.activeTabId = target.id;
  state.activeModule = target.module;
  target.updatedAt = new Date().toISOString();
  localStorage.setItem('amazonControl.activeModule', target.module);
  saveBrowserTabs();
  renderModuleNav();
  renderWorkspace();
  window.requestAnimationFrame(function () { window.scrollTo(0, target.scrollTop || 0); });
}

function openTab(moduleId, options) {
  var resolved = moduleId || 'newtab';
  var forceNew = options && options.forceNew;
  if (!forceNew && resolved !== 'newtab') {
    var existing = state.tabs.find(function (tab) { return tab.module === resolved; });
    if (existing) {
      activateTab(existing.id, { force: true });
      return existing;
    }
  }
  var tab = createBrowserTab(resolved, options);
  state.tabs.push(tab);
  state.activeTabId = tab.id;
  state.activeModule = resolved;
  pushDeckEvent('TAB // ' + tab.title, '');
  deckSignal('route');
  saveBrowserTabs();
  renderModuleNav();
  renderWorkspace();
  return tab;
}

function closeTab(tabId) {
  var index = state.tabs.findIndex(function (tab) { return tab.id === tabId; });
  if (index < 0) return;
  var tab = state.tabs[index];
  state.closedTabs = [tab].concat(state.closedTabs || []).slice(0, 12);
  state.tabs.splice(index, 1);
  if (!state.tabs.length) {
    var replacement = createBrowserTab('newtab');
    state.tabs.push(replacement);
    state.activeTabId = replacement.id;
  } else if (state.activeTabId === tabId) {
    var next = state.tabs[Math.max(0, index - 1)];
    state.activeTabId = next.id;
  }
  var active = getActiveTab();
  state.activeModule = active ? active.module : 'newtab';
  saveBrowserTabs();
  renderModuleNav();
  renderWorkspace();
}

function restoreClosedTab() {
  var tab = (state.closedTabs || []).shift();
  if (!tab) return;
  state.tabs.push(tab);
  state.activeTabId = tab.id;
  state.activeModule = tab.module;
  saveBrowserTabs();
  renderModuleNav();
  renderWorkspace();
}

function navigateActiveTab(moduleId, options) {
  var tab = getActiveTab() || openTab(moduleId, { forceNew: true });
  var resolved = moduleId || 'newtab';
  tab.module = resolved;
  tab.title = browserTabTitle(resolved);
  tab.status = 'idle';
  tab.updatedAt = new Date().toISOString();
  if (!(options && options.replace)) {
    tab.history = tab.history.slice(0, tab.historyIndex + 1);
    if (tab.history[tab.historyIndex] !== resolved) {
      tab.history.push(resolved);
      tab.historyIndex = tab.history.length - 1;
    }
  } else {
    tab.history[tab.historyIndex] = resolved;
  }
  state.activeModule = resolved;
  saveBrowserTabs();
  renderModuleNav();
  renderWorkspace();
  return tab;
}

function navigateTabHistory(delta) {
  var tab = getActiveTab();
  if (!tab) return;
  var nextIndex = tab.historyIndex + delta;
  if (nextIndex < 0 || nextIndex >= tab.history.length) return;
  tab.historyIndex = nextIndex;
  tab.module = tab.history[nextIndex];
  tab.title = browserTabTitle(tab.module);
  state.activeModule = tab.module;
  saveBrowserTabs();
  renderModuleNav();
  renderWorkspace();
}

function switchModule(moduleId) {
  openTab(moduleId);
}

function renderTabStrip() {
  var strip = $('#browserTabStrip');
  if (!strip) return;
  strip.innerHTML = state.tabs.map(function (tab) {
    return '<button class="browser-tab' + (tab.id === state.activeTabId ? ' active' : '') + (tab.status === 'running' ? ' running' : tab.status === 'error' ? ' error' : '') + '" data-browser-tab="' + esc(tab.id) + '" draggable="true" type="button"><span class="browser-tab-dot"></span><span class="browser-tab-title">' + esc(tab.title) + '</span><span class="browser-tab-close" data-close-tab="' + esc(tab.id) + '">×</span></button>';
  }).join('');
}

function renderBrowserShell() {
  renderTabStrip();
  var tab = getActiveTab();
  var input = $('#browserOmnibox');
  var status = $('#browserStatus');
  var back = $('#browserBackButton');
  var forward = $('#browserForwardButton');
  if (input && document.activeElement !== input && tab) input.value = tab.module === 'newtab' ? '' : tab.module;
  if (status) status.textContent = tab ? (tab.status === 'running' ? 'RUNNING' : state.runtimeMode === 'http' ? 'LIVE' : 'READY') : 'READY';
  if (back && tab) back.disabled = tab.historyIndex <= 0;
  if (forward && tab) forward.disabled = tab.historyIndex >= tab.history.length - 1;
}

function renderNewTabBody() {
  var shortcuts = ['assistant', 'selection', 'ads', 'profit', 'inventory', 'listing', 'data', 'compliance', 'image', 'video', 'launch', 'api'];
  return '<div class="newtab-page">' +
    '<div class="newtab-hero"><span>NEW TAB</span><h2>选择下一步操作</h2><p>模块会以标签页打开，可以同时保留多个任务现场。</p></div>' +
    '<div class="newtab-grid">' + shortcuts.map(function (moduleId) {
      var info = moduleInfo(moduleId);
      return '<button class="newtab-card" data-module="' + esc(moduleId) + '" type="button"><span>' + esc(info.shortTitle) + '</span><strong>' + esc(info.title) + '</strong><small>' + esc(info.summary) + '</small></button>';
    }).join('') + '</div>' +
    '<div class="newtab-bottom"><section class="module-pane"><div class="pane-title">最近任务</div><div class="compact-list">' + renderHistoryList('recap') + '</div></section><section class="module-pane result-pane"><div class="pane-title">命令提示</div><div class="workflow-steps"><div><b>1</b><span>在地址栏输入模块名</span></div><div><b>2</b><span>输入 ASIN、文件路径或链接</span></div><div><b>3</b><span>输入自然语言交给智能总控</span></div></div></section></div>' +
  '</div>';
}

function renderWorkspace() {
  var tab = getActiveTab();
  if (!tab) {
    restoreBrowserTabs();
    tab = getActiveTab();
  }
  state.activeModule = tab.module;
  if (tab.module === 'newtab') {
    $('#moduleWorkspace').innerHTML = '<div class="workbench-card panel">' + renderNewTabBody() + '</div>';
    bindWorkspaceEvents();
    animateWorkspaceKinetics();
    renderBrowserShell();
    return;
  }
  var info = moduleInfo(state.activeModule);
  var html = '<div class="workbench-card panel">';
  html += '<div class="module-header"><div><span class="module-badge">' + esc(info.group) + '</span><h2>' + esc(info.title) + '</h2><p>' + esc(info.summary) + '</p></div><button class="ghost-button" type="button" data-module="assistant">回到聊天主入口</button></div>';
  if (state.activeModule === 'assistant') html += renderAssistantBody();
  else if (state.activeModule === 'agent-builder') html += renderAgentBuilderBody();
  else if (state.activeModule === 'api') html += renderApiBody();
  else if (state.activeModule === 'ingest') html += renderIngestBody();
  else if (state.activeModule === 'asset-library') html += renderAssetLibraryBody();
  else if (state.activeModule === 'profile') html += renderProfileBody();
  else if (state.activeModule === 'execution') html += renderExecutionBody();
  else if (state.activeModule === 'codex') html += renderCodexBody();
  else if (state.activeModule === 'recap') html += renderRecapBody();
  else if (state.activeModule === 'image') html += renderImageBody();
  else if (state.activeModule === 'video') html += renderVideoBody();
  else if (state.activeModule === 'launch') html += renderLaunchBody();
  else html += renderModuleBody(state.activeModule);
  if (['ingest', 'launch', 'execution', 'recap'].indexOf(state.activeModule) >= 0) {
    html += '<section class="module-pane module-evidence-pane module-evidence-wide"><div class="pane-title">AI 证据与验证</div>' + renderModuleEvidencePanel(state.activeModule) + '</section>';
  }
  html += '</div>';
  $('#moduleWorkspace').innerHTML = html;
  bindWorkspaceEvents();
  animateWorkspaceKinetics();
  renderBrowserShell();
}

function resolveModuleAlias(value) {
  var query = String(value || '').replace(/^amazon:\/\//i, '').trim().toLowerCase();
  if (!query) return '';
  if (query === 'newtab' || query === 'new-tab' || query === '新标签页') return 'newtab';
  var aliases = {
    chat: 'assistant',
    assistant: 'assistant',
    ads: 'ads',
    ppc: 'ads',
    profit: 'profit',
    finance: 'profit',
    inventory: 'inventory',
    stock: 'inventory',
    listing: 'listing',
    compliance: 'compliance',
    api: 'api',
    data: 'data',
    image: 'image',
    video: 'video',
    launch: 'launch',
    execution: 'execution'
  };
  if (aliases[query]) return aliases[query];
  var found = UI_MODULES.find(function (item) {
    return [item.id, item.title, item.shortTitle].some(function (text) {
      return String(text || '').toLowerCase().includes(query);
    });
  });
  return found ? found.id : '';
}

function applyBrowserCommand(value) {
  var raw = String(value || '').trim();
  if (!raw) return;
  var moduleId = resolveModuleAlias(raw);
  if (moduleId) {
    navigateActiveTab(moduleId);
    pushDeckEvent('OMNIBOX // ' + browserTabTitle(moduleId), 'success');
    return;
  }
  var asinMatch = raw.match(/\bB0[A-Z0-9]{8}\b/i);
  var targetModule = asinMatch ? 'selection' : 'assistant';
  navigateActiveTab(targetModule);
  window.setTimeout(function () {
    var selector = targetModule === 'assistant' ? '#assistantMessageInput' : '#taskMessageInput';
    var input = $(selector);
    if (input) {
      input.value = raw;
      input.focus();
    }
  }, 0);
  pushDeckEvent('OMNIBOX // TASK READY', '');
  deckSignal('task');
}

function renderBrowserSuggestions(query) {
  var box = $('#browserSuggestions');
  if (!box) return;
  var value = String(query || '').trim().toLowerCase();
  if (!value) {
    box.classList.add('hidden');
    box.innerHTML = '';
    return;
  }
  var matches = UI_MODULES.filter(function (item) {
    return [item.id, item.title, item.shortTitle].some(function (text) {
      return String(text || '').toLowerCase().includes(value);
    });
  }).slice(0, 7);
  box.innerHTML = matches.map(function (item) {
    return '<button class="browser-suggestion" type="button" data-browser-suggestion="' + esc(item.id) + '"><b>' + esc(item.shortTitle) + '</b><span>' + esc(item.title + ' / ' + item.summary) + '</span></button>';
  }).join('') || '<div class="browser-tabs-empty">按 Enter 作为任务发送</div>';
  box.classList.remove('hidden');
}

function initBrowserShell() {
  var strip = $('#browserTabStrip');
  var form = $('#browserOmniboxForm');
  var omnibox = $('#browserOmnibox');
  var suggestions = $('#browserSuggestions');
  if (!strip || !form || !omnibox || !suggestions) return;

  strip.addEventListener('click', function (event) {
    var closeButton = event.target.closest('[data-close-tab]');
    if (closeButton) {
      event.stopPropagation();
      closeTab(closeButton.getAttribute('data-close-tab'));
      return;
    }
    var tabButton = event.target.closest('[data-browser-tab]');
    if (tabButton) activateTab(tabButton.getAttribute('data-browser-tab'));
  });

  var dragTabId = '';
  strip.addEventListener('dragstart', function (event) {
    var tab = event.target.closest('[data-browser-tab]');
    if (!tab) return;
    dragTabId = tab.getAttribute('data-browser-tab');
    tab.classList.add('dragging');
    event.dataTransfer.effectAllowed = 'move';
  });
  strip.addEventListener('dragover', function (event) {
    event.preventDefault();
    var target = event.target.closest('[data-browser-tab]');
    Array.prototype.forEach.call(strip.querySelectorAll('.browser-tab'), function (tab) { tab.classList.remove('drop-target'); });
    if (target && target.getAttribute('data-browser-tab') !== dragTabId) target.classList.add('drop-target');
  });
  strip.addEventListener('drop', function (event) {
    event.preventDefault();
    var target = event.target.closest('[data-browser-tab]');
    if (!target || !dragTabId) return;
    var targetId = target.getAttribute('data-browser-tab');
    var fromIndex = state.tabs.findIndex(function (tab) { return tab.id === dragTabId; });
    var toIndex = state.tabs.findIndex(function (tab) { return tab.id === targetId; });
    if (fromIndex < 0 || toIndex < 0) return;
    var moved = state.tabs.splice(fromIndex, 1)[0];
    state.tabs.splice(toIndex, 0, moved);
    dragTabId = '';
    saveBrowserTabs();
    renderBrowserShell();
    if (window.anime) {
      anime.animate('.browser-tab', {
        scale: [.96, 1],
        duration: 360,
        delay: anime.stagger(18),
        ease: anime.spring({ stiffness: 180, damping: 16 })
      });
    }
  });
  strip.addEventListener('dragend', function () {
    dragTabId = '';
    Array.prototype.forEach.call(strip.querySelectorAll('.browser-tab'), function (tab) {
      tab.classList.remove('dragging', 'drop-target');
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    applyBrowserCommand(omnibox.value);
    suggestions.classList.add('hidden');
  });

  omnibox.addEventListener('input', function () { renderBrowserSuggestions(omnibox.value); });
  omnibox.addEventListener('focus', function () { if (omnibox.value) renderBrowserSuggestions(omnibox.value); });
  suggestions.addEventListener('click', function (event) {
    var button = event.target.closest('[data-browser-suggestion]');
    if (!button) return;
    var moduleId = button.getAttribute('data-browser-suggestion');
    omnibox.value = moduleId;
    suggestions.classList.add('hidden');
    navigateActiveTab(moduleId);
  });
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.browser-omnibox')) suggestions.classList.add('hidden');
  });

  $('#browserBackButton').addEventListener('click', function () { navigateTabHistory(-1); });
  $('#browserForwardButton').addEventListener('click', function () { navigateTabHistory(1); });
  $('#browserReloadButton').addEventListener('click', function () {
    refreshState(false).then(function () { renderWorkspace(); });
  });
  $('#browserNewTabButton').addEventListener('click', function () { openTab('newtab', { forceNew: true }); });

  document.addEventListener('keydown', function (event) {
    var mod = event.ctrlKey || event.metaKey;
    if (mod && event.key.toLowerCase() === 'l') {
      event.preventDefault();
      omnibox.focus();
      omnibox.select();
      return;
    }
    if (mod && event.key.toLowerCase() === 't') {
      event.preventDefault();
      openTab('newtab', { forceNew: true });
      return;
    }
    if (mod && event.key.toLowerCase() === 'w') {
      event.preventDefault();
      closeTab(state.activeTabId);
      return;
    }
    if (mod && event.shiftKey && event.key.toLowerCase() === 't') {
      event.preventDefault();
      restoreClosedTab();
      return;
    }
    if (mod && event.key === 'Tab') {
      event.preventDefault();
      var index = state.tabs.findIndex(function (tab) { return tab.id === state.activeTabId; });
      var next = event.shiftKey ? (index - 1 + state.tabs.length) % state.tabs.length : (index + 1) % state.tabs.length;
      activateTab(state.tabs[next].id);
      return;
    }
    if (event.altKey && event.key === 'ArrowLeft') {
      event.preventDefault();
      navigateTabHistory(-1);
      return;
    }
    if (event.altKey && event.key === 'ArrowRight') {
      event.preventDefault();
      navigateTabHistory(1);
    }
  });
}

function currentArtifactData(type) {
  var task = currentResultForTab(getActiveTab());
  if (!task || !task.artifacts) return null;
  var artifact = task.artifacts.find(function (item) {
    return item.type === type || (item.data && item.data.type === type);
  });
  return artifact ? (artifact.data || {}) : null;
}

function mediaAssets(kind) {
  return (state.assets || []).filter(function (asset) {
    var assetKind = String(asset.kind || asset.sourceType || '').toLowerCase();
    if (assetKind === kind) return true;
    if (kind === 'image' && ['photo', 'jpg', 'jpeg', 'png', 'webp'].indexOf(assetKind) >= 0) return true;
    if (kind === 'video' && ['mp4', 'mov', 'webm'].indexOf(assetKind) >= 0) return true;
    return false;
  });
}

function assetMediaSource(asset) {
  var source = asset.localPath || asset.originalPath || asset.url || asset.previewUrl || '';
  if (state.runtimeMode === 'http' && asset.assetId && asset.localPath) {
    var base = window.amazonControl && window.amazonControl.serviceBaseUrl
      ? window.amazonControl.serviceBaseUrl
      : 'http://127.0.0.1:8787';
    return base + '/assets/' + encodeURIComponent(asset.assetId) + '/file';
  }
  return source;
}

function mediaSourceUrl(source) {
  if (/^[a-zA-Z]:[\\/]/.test(source)) return 'file:///' + source.replace(/\\/g, '/');
  return source;
}

function renderMediaAssetList(kind) {
  var label = kind === 'video' ? '视频' : '图片';
  var assets = mediaAssets(kind);
  if (!assets.length) return '<div class="empty-state">暂无' + label + '素材，可在素材库导入。</div>';
  return '<div class="media-asset-list">' + assets.slice(0, 12).map(function (asset) {
    var source = assetMediaSource(asset);
    return '<div class="media-asset-row"><strong>' + esc(asset.name || asset.assetId) + '</strong><span>' + esc(asset.marketplace || '未绑定站点') + '</span><small>' + esc(source || asset.kind || 'asset') + '</small></div>';
  }).join('') + '</div>';
}

function renderMediaStage(kind, className, stageId) {
  var assets = mediaAssets(kind);
  var asset = assets.find(function (item) { return assetMediaSource(item); });
  var source = asset ? assetMediaSource(asset) : '';
  var stageClass = 'media-stage' + (className ? ' ' + className : '');
  var stageAttr = stageId ? ' id="' + esc(stageId) + '"' : '';
  var placeholder = '<div class="media-stage-placeholder"><span>未导入素材</span><small>' + (kind === 'video' ? '9:16 / 16:9' : '16:10') + '</small></div>';
  if (!source) return '<div class="' + stageClass + '"' + stageAttr + '>' + placeholder + '</div>';
  if (kind === 'video') {
    return '<div class="' + stageClass + '"' + stageAttr + '><video controls preload="metadata" src="' + esc(mediaSourceUrl(source)) + '"></video></div>';
  }
  return '<div class="' + stageClass + '"' + stageAttr + '><img src="' + esc(mediaSourceUrl(source)) + '" alt="' + esc(asset.name || 'image asset') + '"></div>';
}

function renderContentImportPanel(kind) {
  var isVideo = kind === 'video';
  var title = isVideo ? '视频素材导入' : '图片素材导入';
  var hint = isVideo ? '拖入 MP4、MOV、WebM、素材包或图片' : '拖入 JPG、PNG、WebP、GIF 或素材包';
  var button = isVideo ? '选择视频 / 图片 / 文件' : '选择图片 / 文件';
  var prefix = isVideo ? 'video' : 'image';
  var accept = isVideo ? 'video/*,image/*,.zip,.rar,.7z' : 'image/*,.zip,.rar,.7z';
  return '<section class="module-pane content-import-pane">' +
    '<div class="pane-title">' + title + '</div>' +
    '<div id="' + prefix + 'AssetDropZone" class="asset-drop-zone content-drop-zone" data-asset-drop-kind="' + kind + '" role="button" tabindex="0" aria-label="' + esc(title) + '，点击选择文件或拖拽到此处"><strong>DROP ' + kind.toUpperCase() + '</strong><span>' + hint + '</span><small>点击此区域也可以选择文件</small></div>' +
    '<textarea id="' + prefix + 'AssetPathInput" rows="3" placeholder="每行一个本地路径或链接"></textarea>' +
    '<div class="asset-file-picker-row"><input id="' + prefix + 'AssetFileInput" class="asset-file-input" type="file" multiple accept="' + esc(accept) + '" data-content-file-input="' + kind + '"><span>支持多选；网页模式单文件最高 128 MB</span></div>' +
    '<div class="button-row"><button class="ghost-button" type="button" data-content-select="' + kind + '">' + button + '</button><button class="primary-button" type="button" data-content-import="' + kind + '">导入路径 / 链接</button></div>' +
    '<div id="' + prefix + 'AssetImportMessage" class="muted"></div>' +
  '</section>';
}

var MEDIA_OPERATION_DEFS = [
  { id: 'image_to_image', label: '图片 → 图片', sourceKind: 'image', targetKind: 'image', capability: 'image' },
  { id: 'image_to_video', label: '图片 → 视频', sourceKind: 'image', targetKind: 'video', capability: 'video' },
  { id: 'video_to_images', label: '视频 → 图片', sourceKind: 'video', targetKind: 'image', capability: 'video' },
  { id: 'video_to_video', label: '视频 → 视频', sourceKind: 'video', targetKind: 'video', capability: 'video' }
];

function mediaOperationDef(operationId) {
  return MEDIA_OPERATION_DEFS.find(function (item) { return item.id === operationId; }) || MEDIA_OPERATION_DEFS[0];
}

function defaultMediaOperation(kind) {
  return kind === 'video' ? 'video_to_video' : 'image_to_image';
}

function mediaRunForModule(moduleId) {
  return (state.mediaRuns || []).find(function (run) {
    if (moduleId === 'video') return mediaOperationDef(run.operationId).targetKind === 'video';
    if (moduleId === 'image') return mediaOperationDef(run.operationId).targetKind === 'image';
    return true;
  });
}

function mediaArtifactSource(run, artifact) {
  if (!artifact) return '';
  if (state.runtimeMode === 'http' && artifact.assetId) {
    var base = window.amazonControl && window.amazonControl.serviceBaseUrl ? window.amazonControl.serviceBaseUrl : 'http://127.0.0.1:8787';
    return base + '/assets/' + encodeURIComponent(artifact.assetId) + '/file';
  }
  return mediaSourceUrl(artifact.localPath || artifact.path || '');
}

function renderMediaRunPreview(moduleId) {
  var run = mediaRunForModule(moduleId);
  if (!run) return '<div class="media-stage-placeholder"><span>还没有生成结果</span><small>选择模式并运行后，这里显示真实文件</small></div>';
  if (run.status === 'failed' || run.status === 'cancelled') {
    return '<div class="error-box">' + esc((run.errors && run.errors[0] && run.errors[0].message) || run.status) + '</div>';
  }
  if (run.status !== 'completed') {
    return '<div class="media-run-progress"><b>' + esc(run.status) + '</b><span>' + esc(run.progress || 0) + '%</span><progress max="100" value="' + esc(run.progress || 0) + '"></progress></div>';
  }
  var artifacts = run.artifacts || [];
  if (!artifacts.length) return '<div class="empty-state">任务完成但没有产物。</div>';
  return '<div class="generated-media-grid">' + artifacts.slice(0, 24).map(function (artifact) {
    var source = mediaArtifactSource(run, artifact);
    var media = artifact.kind === 'video'
      ? '<video controls preload="metadata" src="' + esc(source) + '"></video>'
      : '<img src="' + esc(source) + '" alt="' + esc(artifact.name || 'generated media') + '">';
    return '<div class="generated-media-item"><div class="generated-media-preview">' + media + '</div><strong>' + esc(artifact.name || artifact.kind) + '</strong><span>' + esc(artifact.width ? artifact.width + '×' + artifact.height : artifact.mimeType || '') + '</span><a href="' + esc(source) + '" download>下载文件</a></div>';
  }).join('') + '</div>';
}

function renderMediaProviderOptions(capability, selectedId) {
  var profiles = (state.providerProfiles || []).filter(function (profile) {
    return (profile.capabilities || []).indexOf(capability) >= 0 && profile.enabled !== false;
  });
  if (!profiles.length) return '<option value="">未配置 Provider</option>';
  return '<option value="">自动路由</option>' + profiles.map(function (profile) {
    return '<option value="' + esc(profile.id) + '"' + (profile.id === selectedId ? ' selected' : '') + '>' + esc(profile.name) + ' · ' + esc(profile.model || profile.providerKind) + '</option>';
  }).join('');
}

function renderMediaRunHistory(moduleId) {
  var runs = (state.mediaRuns || []).filter(function (run) {
    return moduleId === 'video' ? mediaOperationDef(run.operationId).targetKind === 'video' : mediaOperationDef(run.operationId).targetKind === 'image';
  }).slice(0, 8);
  if (!runs.length) return '<div class="empty-state">暂无媒体运行记录。</div>';
  return runs.map(function (run) {
    var def = mediaOperationDef(run.operationId);
    return '<div class="mini-card media-run-card"><strong>' + esc(def.label) + ' · ' + esc(run.status) + '</strong><span>' + esc(run.engine || 'local') + ' · ' + esc(formatTime(run.completedAt || run.startedAt)) + '</span><small>' + esc((run.artifacts || []).length) + ' 个产物 · ' + esc(run.providerId || '本地引擎') + '</small></div>';
  }).join('');
}

function renderMediaStudioBody(kind) {
  var defaultOperation = defaultMediaOperation(kind);
  var sourceKind = mediaOperationDef(defaultOperation).sourceKind;
  var compatibleAssets = (state.assets || []).filter(function (asset) {
    return String(asset.kind || '').toLowerCase() === sourceKind || (sourceKind === 'image' && /\.(png|jpe?g|webp)$/i.test(asset.name || ''));
  });
  return '<div class="media-studio">' +
    '<section class="module-pane media-operation-bar"><div>' +
      '<span class="module-badge">MEDIA STUDIO</span><h3>' + (kind === 'video' ? '视频生成与转换' : '图片生成与转换') + '</h3>' +
      '<p>本地引擎可直接生成真实文件；云端模式使用 API 与 AI 控制中心里的能力路由。</p>' +
    '</div><div class="media-operation-switch">' + MEDIA_OPERATION_DEFS.map(function (item) {
      return '<button type="button" data-media-operation="' + esc(item.id) + '" class="' + (item.id === defaultOperation ? 'active' : '') + '">' + esc(item.label) + '</button>';
    }).join('') + '</div></section>' +
    '<div class="module-grid media-studio-grid">' +
      '<section class="module-pane media-input-pane">' +
        '<div class="pane-title">任务设置</div>' +
        '<label>输出模式<select id="mediaOperationSelect">' + MEDIA_OPERATION_DEFS.map(function (item) {
          return '<option value="' + esc(item.id) + '"' + (item.id === defaultOperation ? ' selected' : '') + '>' + esc(item.label) + '</option>';
        }).join('') + '</select></label>' +
        '<label>执行引擎<select id="mediaEngineSelect"><option value="local" selected>本地真实处理（图片/视频）</option><option value="cloud">云端 AI Provider</option></select></label>' +
        '<label>Provider<select id="mediaProviderSelect">' + renderMediaProviderOptions(mediaOperationDef(defaultOperation).capability, '') + '</select></label>' +
        '<label>提示词 / 调整说明<textarea id="mediaPromptInput" rows="4" placeholder="例如：保留产品外形，生成干净的亚马逊主图；或把这段视频改成 9:16 并保留原声。"></textarea></label>' +
        '<div class="two-col"><label>宽度<input id="mediaWidthInput" type="number" value="' + (kind === 'video' ? '1080' : '2000') + '"></label><label>高度<input id="mediaHeightInput" type="number" value="' + (kind === 'video' ? '1920' : '2000') + '"></label></div>' +
        '<div class="two-col"><label>时长（秒）<input id="mediaDurationInput" type="number" value="6" min="1" max="300"></label><label>比例<select id="mediaRatioSelect"><option value="9:16">9:16 竖屏</option><option value="16:9">16:9 横屏</option><option value="1:1">1:1 方形</option></select></label></div>' +
        '<div class="two-col"><label>拆帧频率<input id="mediaFpsInput" type="number" value="1" min="0.1" step="0.1"></label><label>最大帧数<input id="mediaMaxFramesInput" type="number" value="12" min="1" max="300"></label></div>' +
        '<div class="button-row"><button id="submitMediaRunButton" class="primary-button" type="button">生成真实文件</button><button class="ghost-button" type="button" data-module="asset-library">打开素材库</button></div>' +
        '<div id="mediaStudioMessage" class="muted"></div>' +
      '</section>' +
      '<section class="module-pane media-result-pane"><div class="pane-title">真实产物预览</div><div id="mediaGeneratedPreview">' + renderMediaRunPreview(kind) + '</div></section>' +
      '<section class="module-pane"><div class="pane-title">选择输入素材</div><div class="media-source-list">' +
        (compatibleAssets.length
          ? compatibleAssets.slice(0, 60).map(function (asset) {
            return '<label class="media-source-item"><input type="checkbox" class="media-source-checkbox" value="' + esc(asset.assetId) + '" data-kind="' + esc(asset.kind || '') + '"><span>' + esc(asset.name || asset.assetId) + '</span><small>' + esc(asset.kind || '') + ' · ' + esc(formatTime(asset.importedAt)) + '</small></label>';
          }).join('')
          : '<div class="empty-state">没有可用的' + (kind === 'video' ? '视频' : '图片') + '素材。先导入素材，或切换模式后选择另一种输入。</div>') +
        '</div>' + renderContentImportPanel(kind) + '</section>' +
      '<section class="module-pane result-pane"><div class="pane-title">媒体运行历史</div><div class="compact-list">' + renderMediaRunHistory(kind) + '</div></section>' +
    '</div>' +
  '</div>';
}

function renderImageBody() {
  return renderMediaStudioBody('image');
}

function renderVideoScriptArea() {
  var data = currentArtifactData('video-brief');
  if (!data) return '<div class="media-note">运行后在这里生成脚本与分镜。</div>';
  var html = '';
  if (Array.isArray(data.scenes) && data.scenes.length) {
    html += '<div class="media-storyboard">' + data.scenes.map(function (scene, index) {
      return '<div class="storyboard-row"><b>' + (index + 1) + '</b><span>' + esc(scene) + '</span></div>';
    }).join('') + '</div>';
  }
  if (data.script) html += '<div class="media-text-block">' + esc(data.script) + '</div>';
  return html || '<div class="media-note">暂无脚本内容。</div>';
}

function renderVideoSubtitleArea() {
  var data = currentArtifactData('video-brief');
  if (!data) return '<div class="media-note">运行后在这里生成字幕与旁白。</div>';
  var subtitles = data.subtitles || data.captions || [];
  var voiceover = data.voiceover || data.narration || '';
  var html = '';
  if (Array.isArray(subtitles) && subtitles.length) {
    html += '<div class="media-storyboard">' + subtitles.map(function (line, index) {
      return '<div class="storyboard-row"><b>' + (index + 1) + '</b><span>' + esc(line) + '</span></div>';
    }).join('') + '</div>';
  }
  if (voiceover) html += '<div class="media-text-block">' + esc(voiceover) + '</div>';
  return html || '<div class="media-note">暂无字幕与旁白。</div>';
}

function renderVideoBody() {
  return renderMediaStudioBody('video');
}

function renderAssistantMessages() {
  var messages = (state.assistantMessages || []).slice(0, 50).reverse();
  if (!messages.length) {
    return '<div class="chat-empty"><strong>从这里开始</strong><span>你不需要先找模块。先选择站点，然后直接把问题、ASIN、CSV、JSON、链接或文件路径发给我。</span></div>';
  }
  return messages.map(function (message) {
    return '<div class="chat-message ' + esc(message.role || 'assistant') + '">' +
      '<div class="chat-meta">' + esc(message.role === 'user' ? '你' : '智能总控') + ' · ' + esc(formatTime(message.createdAt)) + (message.module ? ' · ' + esc(moduleInfo(message.module).title) : '') + '</div>' +
      '<div class="chat-content">' + esc(message.content || '').replace(/\n/g, '<br>') + '</div>' +
      (message.importedData && message.importedData.length ? '<div class="auto-import-list">' + message.importedData.map(function (item) { return '<span>已导入：' + esc(item.name) + ' · ' + esc(item.rowCount || 0) + ' 行</span>'; }).join('') + '</div>' : '') +
      (message.suggestions && message.suggestions.length ? '<div class="assistant-suggestions">' + message.suggestions.map(function (item) { return '<button data-assistant-prompt="' + esc(item) + '" type="button">' + esc(item) + '</button>'; }).join('') + '</div>' : '') +
    '</div>';
  }).join('');
}

function renderModuleBody(moduleId) {
  var template = MODULE_TEMPLATES[moduleId] || MODULE_TEMPLATES.selection;
  return '<div class="module-grid module-metrics-grid">' +
    '<section class="module-pane">' +
      '<div class="pane-title">高级输入</div>' +
      '<textarea id="taskMessageInput" rows="8" placeholder="' + esc(template.placeholder) + '"></textarea>' +
      renderMetricInputs(moduleId) +
      '<div class="button-row"><button id="submitTaskButton" class="primary-button" type="button">运行当前模块</button><button class="ghost-button" data-module="assistant" type="button">改用聊天自动处理</button></div>' +
      '<div class="pane-title spaced">快捷任务</div>' + renderQuickPrompts(template.samples || []) +
    '</section>' +
    '<section class="module-pane module-metrics-pane">' +
      '<div class="pane-title">关键指标</div>' +
      renderModuleMetrics() +
    '</section>' +
    '<section class="module-pane module-evidence-pane"><div class="pane-title">AI 证据与验证</div>' + renderModuleEvidencePanel(moduleId) + '</section>' +
    '<section class="module-pane result-pane"><div class="pane-title">结果 / 历史 / 导出</div><div id="resultPane">' + renderCurrentResult() + '</div><div class="button-row"><button id="exportJsonButton" class="ghost-button" type="button">导出 JSON</button><button id="exportMarkdownButton" class="ghost-button" type="button">导出 Markdown</button><button id="exportCsvButton" class="ghost-button" type="button">导出 CSV/表格</button></div><div class="compact-list history-block">' + renderHistoryList(moduleId) + '</div></section>' +
  '</div>';
}

function renderMetricInputs(moduleId) {
  if (['profit', 'selection'].indexOf(moduleId) >= 0) {
    return '<div class="metric-grid compact-metrics"><label>售价<input id="metricPrice" type="number" step="0.01"></label><label>成本<input id="metricCost" type="number" step="0.01"></label><label>FBA<input id="metricFba" type="number" step="0.01"></label><label>佣金<input id="metricReferral" type="number" step="0.01"></label><label>30天销量<input id="metricUnits" type="number"></label></div>';
  }
  if (moduleId === 'inventory') {
    return '<div class="metric-grid compact-metrics"><label>库存<input id="metricInventory" type="number"></label><label>30天销量<input id="metricUnits" type="number"></label><label>采购周期<input id="metricLeadTime" type="number" value="35"></label></div>';
  }
  if (moduleId === 'ads') {
    return '<div class="metric-grid compact-metrics"><label>花费<input id="metricSpend" type="number" step="0.01"></label><label>销售额<input id="metricSales" type="number" step="0.01"></label><label>订单<input id="metricOrders" type="number"></label><label>点击<input id="metricClicks" type="number"></label><label>曝光<input id="metricImpressions" type="number"></label></div>';
  }
  if (moduleId === 'data') {
    return '<div class="metric-grid compact-metrics"><label>销量<input id="metricUnits" type="number"></label><label>销售额<input id="metricSales" type="number" step="0.01"></label><label>流量<input id="metricSessions" type="number"></label><label>订单<input id="metricOrders" type="number"></label></div>';
  }
  if (moduleId === 'listing' || moduleId === 'launch') {
    return '<div class="metric-grid compact-metrics"><label>售价<input id="metricPrice" type="number" step="0.01"></label><label>成本<input id="metricCost" type="number" step="0.01"></label><label>30天销量<input id="metricUnits" type="number"></label></div>';
  }
  if (moduleId === 'compliance' || moduleId === 'source' || moduleId === 'creative') {
    return '<div class="metric-grid compact-metrics"><label>ASIN / 对象<input id="metricItem" placeholder="ASIN、品类或素材名称"></label></div>';
  }
  return '';
}

function renderModuleEvidencePanel(moduleId) {
  var task = currentResultForTab(getActiveTab());
  var run = (state.workflowRuns || []).find(function (item) { return item.module === moduleId; });
  var routeCapability = ['image', 'video', 'creative'].indexOf(moduleId) >= 0 ? (moduleId === 'video' ? 'video' : 'image') : moduleId === 'data' ? 'data' : 'reasoning';
  var route = (state.providerRoutes || []).find(function (item) { return item.capability === routeCapability && item.scopeType === 'global'; }) || {};
  var profile = (state.providerProfiles || []).find(function (item) { return item.id === (route.profileIds || [])[0]; });
  var verification = (run && run.verification) || { status: task ? 'local_rule' : 'pending', checks: [] };
  return '<div class="evidence-grid"><div><span>能力路线</span><strong>' + esc(profile ? profile.name : '本地规则 / 未配置 Provider') + '</strong></div>' +
    '<div><span>运行状态</span><strong>' + esc(run ? run.status : (task ? task.status : 'idle')) + '</strong></div>' +
    '<div><span>验证状态</span><strong>' + esc(verification.status || 'pending') + '</strong></div>' +
    '<div><span>真实产物</span><strong>' + esc(task && task.artifacts ? task.artifacts.length : 0) + '</strong></div></div>' +
    '<div class="compact-list">' + ((verification.checks || []).slice(0, 6).map(function (check) { return '<div class="mini-card"><strong>' + esc(check.code || check.label) + '</strong><span>' + esc(check.status) + '</span><small>' + esc(check.message || '') + '</small></div>'; }).join('') || '<div class="empty-state">运行模块后显示数据、工具、Provider 和验证证据。</div>') + '</div>';
}

function renderModuleMetrics() {
  var task = currentResultForTab(getActiveTab());
  if (!task) {
    return '<div class="empty-state">暂无当前结果。运行模块后，这里会汇总关键指标与建议动作。</div>';
  }
  var insights = task.insights || [];
  var actions = task.actions || [];
  if (!insights.length && !actions.length) {
    return '<div class="empty-state">当前结果暂无可用指标或建议动作。</div>';
  }
  var html = '';
  if (insights.length) {
    html += '<div class="module-metric-cards">' + insights.map(function (item) {
      return '<div class="metric-card"><b>' + esc(item.value) + '</b><span>' + esc(item.label) + '</span></div>';
    }).join('') + '</div>';
  }
  if (actions.length) {
    html += '<div class="pane-title spaced">建议动作</div><div class="action-list">' + actions.map(function (item) {
      return '<div class="action-row"><span class="priority ' + esc(item.priority || 'P2') + '">' + esc(item.priority || 'P2') + '</span>' + esc(item.text || '') + '</div>';
    }).join('') + '</div>';
  }
  return html;
}

function renderQuickPrompts(items) {
  return '<div class="quick-prompt-row">' + items.map(function (item) {
    return '<button class="quick-prompt" data-module-prompt="' + esc(item) + '" type="button">' + esc(item) + '</button>';
  }).join('') + '</div>';
}

var ARTIFACT_LABELS = {
  'ads-action-plan': '广告诊断报告',
  'business-review': '业务数据摘要',
  'replenishment-plan': '补货建议',
  'selection-brief': '选品机会报告',
  'profit-model': '利润测算报告',
  'listing-draft': 'Listing 草稿',
  'upload-table': '上传表格',
  'image-brief': '图片制作 Brief',
  'video-brief': '视频脚本 Brief',
  'connector-plan': '接口接入方案',
  'compliance-checklist': '合规检查清单'
};

var FIELD_LABELS = {
  asin: 'ASIN',
  keyword: '关键词',
  price: '售价',
  cost: '成本',
  fbaFee: 'FBA 费用',
  referralFee: '平台佣金',
  profit: '预估净利',
  margin: '净利率',
  roi: 'ROI',
  decision: '建议决策',
  spend: '广告花费',
  sales: '销售额',
  revenue: '销售额',
  orders: '订单数',
  clicks: '点击量',
  impressions: '曝光量',
  acos: 'ACoS',
  roas: 'ROAS',
  cvr: '转化率',
  ctr: '点击率',
  cpc: '单次点击成本',
  inventory: '可售库存',
  units30d: '30 天销量',
  daily: '日均销量',
  coverDays: '库存覆盖',
  reorderPoint: '建议补货点',
  leadTimeDays: '采购周期',
  units: '销量',
  sessions: '流量',
  title: '标题',
  bullets: '五点描述',
  description: '商品描述',
  searchTerms: '后台搜索词',
  imageSize: '图片尺寸',
  imageRatio: '画面比例',
  prompt: '图片 Prompt',
  sizes: '建议尺寸',
  duration: '视频时长',
  ratio: '画面方向',
  scenes: '分镜脚本',
  voiceover: '旁白文案',
  item: '审查对象',
  marketplace: '站点',
  rowCount: '数据行数'
};

function artifactLabel(type) {
  return ARTIFACT_LABELS[type] || String(type || '结果').replace(/-/g, ' ');
}

function humanFieldLabel(key) {
  return FIELD_LABELS[key] || key;
}

function humanDecision(value) {
  var map = {
    'Go / Test First': '可以进入测款',
    'Test First / Rework Offer': '先小规模测试，并优化报价',
    '需要补齐售价和成本': '需要补齐售价和成本'
  };
  return map[value] || value;
}

function reportMoney(value, marketplace) {
  var symbols = { USD: '$', CAD: 'C$', MXN: 'MX$', GBP: '£', EUR: '€', JPY: '¥', AUD: 'A$', INR: '₹', BRL: 'R$' };
  var currency = marketplace && marketplace.currency ? marketplace.currency : 'USD';
  var amount = Number(value || 0);
  var formatted = currency === 'JPY' ? Math.round(amount).toLocaleString('zh-CN') : amount.toFixed(2);
  return (symbols[currency] || currency + ' ') + formatted;
}

function humanArtifactValue(key, value, task) {
  if (value === null || value === undefined || value === '') return '未提供';
  if (key === 'decision') return humanDecision(value);
  if (key === 'marketplace' && typeof value === 'object') {
    return value.name ? value.name + ' / ' + (value.currency || '') : (value.code || '已记录');
  }
  if (Array.isArray(value)) {
    return value.map(function (item) {
      if (item && typeof item === 'object') return item.name || item.title || item.assetId || '素材';
      return item;
    }).join('、');
  }
  if (typeof value === 'object') return JSON.stringify(value);
  var numeric = Number(value);
  if (!Number.isFinite(numeric)) return String(value);
  if (/(margin|roi|acos|cvr|ctr|rate)$/i.test(key)) return (numeric * 100).toFixed(1) + '%';
  if (/(price|cost|fee|profit|revenue|sales|spend|spent|cpc)$/i.test(key)) {
    return reportMoney(numeric, marketByCode(task && task.marketplace));
  }
  if (key === 'coverDays') return numeric.toFixed(1) + ' 天';
  if (key === 'leadTimeDays') return numeric + ' 天';
  if (key === 'daily') return numeric.toFixed(2) + ' 件/天';
  return Number.isInteger(numeric) ? String(numeric) : numeric.toFixed(2);
}

function renderRowsTable(rows) {
  if (!Array.isArray(rows) || !rows.length) return '';
  var normalized = rows.map(function (row) {
    if (Array.isArray(row)) return row;
    if (row && typeof row === 'object') return Object.keys(row).map(function (key) { return row[key]; });
    return [row];
  });
  var first = rows[0];
  var headers = first && !Array.isArray(first) && typeof first === 'object'
    ? Object.keys(first)
    : normalized[0].map(function (_cell, index) { return '字段 ' + (index + 1); });
  return '<div class="table-wrap human-table"><table><thead><tr>' + headers.map(function (header) {
    return '<th>' + esc(humanFieldLabel(header)) + '</th>';
  }).join('') + '</tr></thead><tbody>' + normalized.slice(0, 12).map(function (row) {
    return '<tr>' + headers.map(function (_header, index) {
      var value = row[index];
      return '<td>' + esc(value === null || value === undefined ? '' : value) + '</td>';
    }).join('') + '</tr>';
  }).join('') + '</tbody></table>' + (rows.length > 12 ? '<p class="muted">仅展示前 12 行，共 ' + rows.length + ' 行。</p>' : '') + '</div>';
}

function renderHumanFields(data, task) {
  var hidden = { rows: true, usedAssets: true, columns: true };
  var keys = Object.keys(data || {}).filter(function (key) { return !hidden[key]; });
  if (!keys.length) return '<p class="muted">当前结果没有可展示的业务字段。</p>';
  return '<div class="human-field-grid">' + keys.map(function (key) {
    return '<div class="human-field"><span>' + esc(humanFieldLabel(key)) + '</span><strong>' + esc(humanArtifactValue(key, data[key], task)) + '</strong></div>';
  }).join('') + '</div>';
}

function renderMetricBlock(data, keys, task) {
  var available = keys.filter(function (key) { return data && data[key] !== undefined && data[key] !== null && data[key] !== ''; });
  if (!available.length) return '';
  return '<div class="human-metric-grid">' + available.map(function (key) {
    return '<div class="human-metric"><span>' + esc(humanFieldLabel(key)) + '</span><strong>' + esc(humanArtifactValue(key, data[key], task)) + '</strong></div>';
  }).join('') + '</div>';
}

function renderTextBlock(label, text, className) {
  if (!text) return '';
  return '<div class="human-text-block ' + esc(className || '') + '"><b>' + esc(label) + '</b><p>' + esc(text).replace(/\n/g, '<br>') + '</p></div>';
}

function renderArtifactContent(item, task) {
  var type = item.type || '';
  var data = item.data || {};
  if (type === 'ads-action-plan') {
    return renderMetricBlock(data, ['spend', 'sales', 'orders', 'clicks', 'impressions', 'acos', 'roas', 'cvr'], task) +
      renderRowsTable(data.rows) +
      renderTextBlock('怎么处理', task.actions && task.actions[0] && task.actions[0].text, 'accent');
  }
  if (type === 'business-review') {
    return renderMetricBlock(data, ['units', 'revenue', 'sessions', 'orders', 'cvr'], task) + renderRowsTable(data.rows);
  }
  if (type === 'replenishment-plan') {
    return renderMetricBlock(data, ['inventory', 'units30d', 'daily', 'coverDays', 'reorderPoint', 'leadTimeDays'], task) +
      renderTextBlock('补货判断', task.summary, 'accent');
  }
  if (type === 'selection-brief' || type === 'profit-model') {
    return renderMetricBlock(data, ['price', 'cost', 'fbaFee', 'referralFee', 'profit', 'margin', 'roi'], task) +
      renderTextBlock('决策建议', humanDecision(data.decision), 'accent');
  }
  if (type === 'listing-draft') {
    var bullets = Array.isArray(data.bullets) ? data.bullets : [];
    var terms = Array.isArray(data.searchTerms) ? data.searchTerms : String(data.generic_keywords || '').split(/[,，;；\s]+/).filter(Boolean);
    return renderTextBlock('标题', data.title || data.item_name, 'title') +
      (bullets.length ? '<div class="human-text-block"><b>五点描述</b><ol>' + bullets.map(function (item) { return '<li>' + esc(item) + '</li>'; }).join('') + '</ol></div>' : '') +
      renderTextBlock('商品描述', data.description || data.product_description) +
      (terms.length ? '<div class="keyword-chips">' + terms.map(function (item) { return '<span>' + esc(item) + '</span>'; }).join('') + '</div>' : '');
  }
  if (type === 'upload-table') {
    if (data.row && typeof data.row === 'object') return renderRowsTable([data.row]);
    return renderHumanFields(data, task);
  }
  if (type === 'image-brief') {
    return renderMetricBlock(data, ['imageSize', 'imageRatio'], task) +
      renderTextBlock('生成 Prompt', data.prompt, 'prompt') +
      (Array.isArray(data.sizes) && data.sizes.length ? '<div class="keyword-chips">' + data.sizes.map(function (item) { return '<span>' + esc(item) + '</span>'; }).join('') + '</div>' : '');
  }
  if (type === 'video-brief') {
    return renderMetricBlock(data, ['duration', 'ratio'], task) +
      (Array.isArray(data.scenes) && data.scenes.length ? '<div class="human-storyboard">' + data.scenes.map(function (scene, index) { return '<div><b>' + (index + 1) + '</b><span>' + esc(scene) + '</span></div>'; }).join('') + '</div>' : '') +
      renderTextBlock('旁白文案', data.voiceover);
  }
  if (type === 'connector-plan' && Array.isArray(data)) {
    return '<div class="human-connector-list">' + data.map(function (connector) {
      return '<div><strong>' + esc(connector.name) + '</strong><span>' + esc((connector.dataTypes || []).join('、')) + '</span><small>' + esc((connector.fields || []).join(', ')) + '</small></div>';
    }).join('') + '</div>';
  }
  if (type === 'compliance-checklist') {
    return renderHumanFields(data, task);
  }
  return renderHumanFields(data, task) + renderRowsTable(data.rows);
}

function renderHumanArtifact(item, task) {
  return '<section class="human-report">' +
    '<div class="human-report-head"><div><strong>' + esc(item.name || artifactLabel(item.type)) + '</strong><span>' + esc(artifactLabel(item.type)) + '</span></div></div>' +
    '<div class="human-report-body">' + renderArtifactContent(item, task) + '</div>' +
    '<details class="raw-data-details"><summary>查看原始数据</summary><pre>' + esc(JSON.stringify(item.data || {}, null, 2)) + '</pre></details>' +
  '</section>';
}

function renderCurrentResult() {
  var task = currentResultForTab(getActiveTab());
  if (!task) return '<div class="empty-state">还没有当前结果。你可以在聊天里发一句话、粘贴 CSV/JSON，系统会自动生成结果。</div>';
  var resultMarket = marketByCode(task.marketplace);
  var resultContext = resultMarket ? resultMarket.name + ' / ' + resultMarket.currency : (task.marketplace || '未记录站点');
  var html = '<div class="result-summary"><span>' + esc(moduleInfo(task.resolvedModule).title) + ' · ' + esc(resultContext) + ' · ' + esc(task.status) + '</span><strong>' + esc(task.summary || '') + '</strong></div>';
  html += renderMissionTimeline();
  html += '<div class="result-section"><b>洞察</b><div class="pair-list">' + (task.insights || []).map(function (item) { return '<div><span>' + esc(item.label) + '</span><strong>' + esc(item.value) + '</strong></div>'; }).join('') + '</div></div>';
  html += '<div class="result-section"><b>建议动作</b><div class="action-list">' + (task.actions || []).map(function (item) { return '<div class="action-row"><span class="priority ' + esc(item.priority || 'P2') + '">' + esc(item.priority || 'P2') + '</span>' + esc(item.text || '') + '</div>'; }).join('') + '</div></div>';
  html += '<div class="result-section"><b>风险</b>' + ((task.risks || []).length ? (task.risks || []).map(function (item) { return '<div class="risk-row"><span>!</span>' + esc(item) + '</div>'; }).join('') : '<div class="no-risk">暂无高风险提示。</div>') + '</div>';
  if (task.artifacts && task.artifacts.length) {
    html += '<div class="result-section"><b>业务结果</b><div class="human-report-list">' + task.artifacts.map(function (item) {
      return renderHumanArtifact(item, task);
    }).join('') + '</div></div>';
  }
  return html;
}

function renderHistoryList(moduleId) {
  var tasks = (state.tasks || []).filter(function (task) { return moduleId === 'recap' || !moduleId || task.resolvedModule === moduleId; }).slice(0, 12);
  if (!tasks.length) return '<div class="empty-state">暂无历史任务。</div>';
  return tasks.map(function (task) {
    return '<button class="mini-card history-task" data-task-id="' + esc(task.taskId) + '" type="button"><strong>' + esc(task.summary || task.taskId) + '</strong><span>' + esc(moduleInfo(task.resolvedModule).title) + ' · ' + esc(task.marketplace || '') + '</span><small>' + esc(formatTime(task.createdAt)) + '</small></button>';
  }).join('');
}

function renderImportList(limit) {
  var imports = (state.dataImports || []).slice(0, limit || 20);
  if (!imports.length) return '<div class="empty-state">还没有导入记录。你可以直接在聊天里粘贴 CSV/JSON 或文件路径。</div>';
  return imports.map(function (item) {
    return '<div class="mini-card"><strong>' + esc(item.name || item.importId) + '</strong><span>' + esc(item.sourceType) + ' · ' + esc(item.marketplace || '未绑定站点') + ' · ' + esc(moduleInfo(item.module || 'data').title) + '</span><small>' + esc(item.rowCount || 0) + ' 行 · ' + esc(formatTime(item.updatedAt || item.createdAt)) + '</small></div>';
  }).join('');
}

function renderProfileBody() {
  return '<div class="profile-dashboard">' +
    '<section class="module-pane command-pane"><div class="pane-title">当前项目上下文</div><div class="command-head"><strong>' + esc($('#projectNameInput').value || '未命名项目') + '</strong><span>' + esc(state.market ? state.market.name + ' / ' + state.market.currency + ' / ' + state.market.language : '请先选择站点') + '</span></div>' +
    '<div class="readiness-grid"><div class="' + (state.market ? 'ok' : 'needs-work') + '"><b>' + (state.market ? '1' : '0') + '</b><span>站点</span></div><div class="' + (state.apiConnections.length ? 'ok' : 'needs-work') + '"><b>' + state.apiConnections.length + '</b><span>接口</span></div><div class="' + (state.dataImports.length ? 'ok' : 'needs-work') + '"><b>' + state.dataImports.length + '</b><span>数据源</span></div></div>' +
    '<div class="button-row"><button id="saveProjectButton" class="primary-button" type="button">保存当前项目</button><button id="clearProjectButton" class="ghost-button" type="button">新建项目</button></div><div id="projectMessage" class="muted"></div></section>' +
    '<section class="module-pane"><div class="pane-title">已有项目</div><div class="compact-list">' + renderProjectList() + '</div><div class="pane-title spaced">建议流程</div><div class="workflow-steps">' + ['选择站点', '保存项目', '接入 API/IPA 或导入 CSV', '通过聊天提出运营问题', '自动保存原始数据和分析结果', '人工确认高风险动作', '复盘导出'].map(function (item, index) { return '<div><b>' + (index + 1) + '</b><span>' + esc(item) + '</span></div>'; }).join('') + '</div></section>' +
    '<section class="module-pane"><div class="pane-title">项目打包（分享 / 迁移）</div><div class="button-row"><button id="exportProjectPackageButton" class="primary-button" type="button">导出当前项目包</button></div><label>导入项目包文件路径<input id="importPackagePathInput" placeholder="D:\\AmazonControlData\\app-store\\project-packages\\project-xxx.json"></label><div class="button-row"><button id="importProjectPackageButton" class="ghost-button" type="button">导入项目包</button></div><div class="pane-title spaced">已有项目包</div><div class="compact-list">' + renderProjectPackageList() + '</div><div id="packageMessage" class="muted"></div></section>' +
  '</div>';
}

function renderProjectList() {
  if (!(state.projects || []).length) return '<div class="empty-state">还没有项目。在上方选择站点并填写项目名后点击“保存当前项目”。</div>';
  return state.projects.map(function (project) {
    return '<div class="mini-card"><strong>' + esc(project.name || project.id) + '</strong><span>' + esc(project.marketplace || '未选站点') + ' / ' + esc(project.currency || '') + ' / ' + esc(project.language || '') + '</span><small>' + esc(formatTime(project.updatedAt)) + '</small><div class="mini-actions"><button data-load-project="' + esc(project.id) + '" type="button">载入</button><button data-delete-project="' + esc(project.id) + '" type="button">删除</button></div></div>';
  }).join('');
}

function renderProjectPackageList() {
  if (!(state.projectPackages || []).length) return '<div class="empty-state">暂无项目包。导出后可用于团队分享或迁移到其他机器。</div>';
  return state.projectPackages.map(function (pkg) {
    var counts = pkg.counts || {};
    return '<div class="mini-card"><strong>' + esc(pkg.projectName || pkg.fileName) + '</strong><span>' + esc(pkg.marketplace || '') + ' · ' + esc(formatTime(pkg.createdAt)) + '</span><small>任务 ' + (counts.tasks || 0) + ' · 草稿 ' + (counts.listingDrafts || 0) + ' · 导入 ' + (counts.dataImports || 0) + ' · 素材 ' + (counts.assets || 0) + '</small><small>' + esc(pkg.filePath || '') + '</small></div>';
  }).join('');
}

function renderExecutionBody() {
  return '<div class="module-grid execution-workspace-grid">' +
    '<section class="module-pane"><div class="pane-title">待审批动作</div><div class="compact-list">' + renderApprovalList() + '</div><div class="pane-title spaced">动作草稿</div><div class="compact-list">' + renderActionDraftList() + '</div></section>' +
    '<section class="module-pane result-pane"><div class="pane-title">执行队列</div><div class="execution-mode-banner">执行中心当前为人工确认模式，不会自动修改亚马逊后台。</div><div class="compact-list">' + renderExecutionQueueList() + '</div><div class="button-row"><button id="copyExecutionChecklistButton" class="ghost-button" type="button">复制操作清单</button></div><div id="executionMessage" class="muted"></div></section>' +
  '</div>';
}

function renderApprovalList() {
  if (!(state.approvals || []).length) return '<div class="empty-state">暂无待审批动作。高风险任务会出现在这里。</div>';
  return state.approvals.map(function (approval) {
    return '<div class="mini-card"><strong>' + esc(approval.taskId || approval.id) + '</strong><span>' + esc(approval.module || '未知模块') + ' · ' + esc(approval.status || 'pending') + '</span><small>' + esc(approval.reason || '') + '</small><div class="mini-actions">' + (approval.status === 'pending' ? '<button data-approve-action="' + esc(approval.id) + '" type="button">批准</button><button data-reject-action="' + esc(approval.id) + '" type="button">驳回</button>' : '') + '</div></div>';
  }).join('');
}

function renderActionDraftList() {
  if (!(state.actionDrafts || []).length) return '<div class="empty-state">暂无动作草稿。</div>';
  return state.actionDrafts.map(function (draft) {
    return '<div class="mini-card"><strong>' + esc(draft.taskId || draft.id) + '</strong><span>' + esc(draft.module || '未知模块') + ' · ' + esc(draft.status || 'pending') + '</span><div class="mini-actions">' + (draft.status === 'approved' ? '<button data-execute-action="' + esc(draft.id) + '" type="button">进入执行队列</button>' : '') + '</div></div>';
  }).join('');
}

function renderExecutionQueueList() {
  if (!(state.executionQueue || []).length) return '<div class="empty-state">暂无执行队列。</div>';
  return state.executionQueue.map(function (entry) {
    return '<div class="mini-card"><strong>' + esc(entry.id) + '</strong><span>' + esc(entry.module || '未知模块') + ' · ' + esc(entry.status || 'waiting_human') + '</span><small>' + esc(entry.message || '') + '</small></div>';
  }).join('');
}

function copyExecutionChecklist() {
  var queue = state.executionQueue || [];
  if (!queue.length) {
    if ($('#executionMessage')) $('#executionMessage').textContent = '暂无执行队列可复制。';
    return;
  }
  var lines = queue.map(function (entry, index) {
    return (index + 1) + '. [' + (entry.module || '未知模块') + '] ' + (entry.message || entry.id || '') + '（状态：' + (entry.status || 'waiting_human') + '）';
  });
  copyText('亚马逊执行操作清单\n' + lines.join('\n') + '\n（人工确认模式，未自动提交亚马逊后台）');
  if ($('#executionMessage')) $('#executionMessage').textContent = '操作清单已复制到剪贴板。';
}

function renderAssetLibraryBody() {
  return '<div class="asset-library-layout">' +
    '<section class="asset-filter-bar module-pane"><div class="pane-title">素材库</div><div class="two-col"><label>搜索<input id="assetSearchInput" placeholder="名称 / ASIN / 标签"></label><label>类型<select id="assetTypeFilter"><option value="">全部</option><option value="image">图片</option><option value="video">视频</option><option value="csv">CSV</option><option value="json">JSON</option><option value="link">链接</option><option value="archive">素材包</option></select></label><label>站点<select id="assetMarketplaceFilter"><option value="">全部站点</option>' + MARKETPLACES.map(function (item) { return '<option value="' + esc(item.code) + '">' + esc(item.name) + '</option>'; }).join('') + '</select></label></div><div class="button-row"><button id="clearAssetFiltersButton" class="ghost-button" type="button">清空筛选</button><button id="exportAssetLibraryButton" class="ghost-button" type="button">导出素材清单</button></div></section>' +
    '<section class="module-pane asset-upload-pane"><div class="pane-title">导入素材</div><div id="assetLibraryDropZone" class="asset-drop-zone" data-asset-drop="true"><strong>DROP ASSETS</strong><span>拖入图片、视频、CSV、JSON、压缩包或链接</span></div><textarea id="assetPathInput" rows="3" placeholder="每行一个路径或链接"></textarea><div class="button-row"><button id="selectAssetFilesButton" class="ghost-button" type="button">选择图片/视频/文件</button><button id="importAssetsButton" class="primary-button" type="button">导入素材库</button></div><div id="assetImportMessage" class="muted"></div></section>' +
    '<section class="module-pane"><div class="pane-title">素材清单</div><div id="assetLibraryGrid" class="asset-grid">' + renderAssetLibraryGrid() + '</div></section>' +
  '</div>';
}

function assetLibraryFilters() {
  var query = $('#assetSearchInput') ? $('#assetSearchInput').value.toLowerCase() : '';
  var type = $('#assetTypeFilter') ? $('#assetTypeFilter').value : '';
  var market = $('#assetMarketplaceFilter') ? $('#assetMarketplaceFilter').value : '';
  return (state.assets || []).filter(function (asset) {
    if (type && asset.kind !== type) return false;
    if (market && asset.marketplace && asset.marketplace !== market) return false;
    if (query) {
      var haystack = [asset.name, asset.asin, asset.sku, (asset.tags || []).join(' ')].join(' ').toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

function renderAssetLibraryGrid() {
  var assets = assetLibraryFilters().slice(0, 200);
  if (!assets.length) return '<div class="empty-state">暂无匹配素材。可导入图片、视频、CSV、JSON、链接或素材包。</div>';
  return assets.map(function (asset) {
    var source = assetMediaSource(asset);
    return '<div class="asset-card mini-card"><div class="asset-thumb asset-thumb-placeholder">' + esc((asset.kind || 'file').toUpperCase()) + '</div><strong>' + esc(asset.name || asset.assetId) + '</strong><span>' + esc(asset.kind || 'file') + ' · ' + esc(asset.marketplace || '未绑定') + '</span><small>' + esc(source) + '</small><div class="mini-actions"><button data-asset-preview="' + esc(asset.assetId) + '" type="button">预览</button><button data-use-asset="' + esc(asset.assetId) + '" type="button">引用到聊天</button><button data-delete-asset="' + esc(asset.assetId) + '" type="button">删除</button></div></div>';
  }).join('');
}

function applyAssetLibraryFilters() {
  var grid = $('#assetLibraryGrid');
  if (grid) grid.innerHTML = renderAssetLibraryGrid();
}

function openAssetPreview(assetId) {
  var asset = (state.assets || []).find(function (item) { return item.assetId === assetId; });
  if (!asset) return;
  closeAssetPreview();
  var source = assetMediaSource(asset);
  var kind = String(asset.kind || asset.sourceType || 'file').toLowerCase();
  var imageKinds = ['image', 'photo', 'jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tif', 'tiff', 'avif'];
  var videoKinds = ['video', 'mp4', 'mov', 'avi', 'mkv', 'webm', 'm4v'];
  var mediaHtml;
  if (!source) {
    mediaHtml = '<div class="asset-dialog-file"><span>该素材没有可预览的本地文件或链接。</span></div>';
  } else if (imageKinds.indexOf(kind) >= 0) {
    mediaHtml = '<img class="asset-dialog-media" src="' + esc(mediaSourceUrl(source)) + '" alt="' + esc(asset.name || asset.assetId) + '">';
  } else if (videoKinds.indexOf(kind) >= 0) {
    mediaHtml = '<video class="asset-dialog-media" controls preload="metadata" src="' + esc(mediaSourceUrl(source)) + '"></video>';
  } else {
    mediaHtml = '<div class="asset-dialog-file"><span>类型：' + esc(kind) + '</span><span>路径：' + esc(source) + '</span></div>';
  }
  var backdrop = document.createElement('div');
  backdrop.className = 'asset-dialog-backdrop';
  backdrop.id = 'assetPreviewBackdrop';
  backdrop.innerHTML =
    '<div class="asset-dialog" role="dialog" aria-modal="true" aria-label="' + esc(asset.name || asset.assetId) + '">' +
      '<div class="asset-dialog-head"><strong>' + esc(asset.name || asset.assetId) + '</strong><button class="asset-dialog-close" data-close-asset-preview type="button" aria-label="关闭预览">×</button></div>' +
      '<div class="asset-dialog-body">' + mediaHtml + '</div>' +
      '<div class="asset-dialog-meta"><span>类型：' + esc(kind) + '</span><span>来源：' + esc(source || '未记录') + '</span></div>' +
    '</div>';
  backdrop.addEventListener('click', function (event) {
    if (event.target === backdrop) closeAssetPreview();
  });
  document.body.appendChild(backdrop);
}

function closeAssetPreview() {
  var backdrop = $('#assetPreviewBackdrop');
  if (backdrop) backdrop.remove();
}

function exportAssetLibraryJson() {
  var assets = assetLibraryFilters();
  var blob = new Blob([JSON.stringify(assets, null, 2)], { type: 'application/json;charset=utf-8' });
  var url = URL.createObjectURL(blob);
  var link = document.createElement('a');
  var stamp = new Date().toISOString().replace(/[:.]/g, '-');
  link.href = url;
  link.download = 'asset-library-' + stamp + '.json';
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
}

function saveCurrentProject() {
  var payload = Object.assign(payloadContext(), {
    name: $('#projectNameInput').value || '',
    marketplace: $('#marketplaceSelect').value || '',
    dataSource: $('#dataSourceSelect').value || 'manual',
    connectorId: $('#connectorSelect').value || ''
  });
  if (!payload.name && !payload.marketplace) {
    if ($('#projectMessage')) $('#projectMessage').textContent = '请先填写项目名或选择站点。';
    return;
  }
  window.amazonControl.saveProject(payload).then(function (project) {
    state.projects = [project].concat((state.projects || []).filter(function (item) { return item.id !== project.id; }));
    state.selectedProjectId = project.id;
    localStorage.setItem('amazonControl.projectId', project.id);
    if ($('#projectMessage')) $('#projectMessage').textContent = '已保存：' + project.name;
    renderContextControls();
    renderWorkspace();
  }).catch(function (error) {
    if ($('#projectMessage')) $('#projectMessage').textContent = error.message;
  });
}

function clearCurrentProject() {
  state.selectedProjectId = '';
  localStorage.removeItem('amazonControl.projectId');
  $('#projectNameInput').value = '';
  $('#marketplaceSelect').value = '';
  state.market = null;
  renderContextControls();
  renderWorkspace();
}

function loadProject(id) {
  var project = (state.projects || []).find(function (item) { return item.id === id; });
  if (!project) return;
  state.selectedProjectId = id;
  localStorage.setItem('amazonControl.projectId', id);
  $('#projectNameInput').value = project.name || '';
  $('#marketplaceSelect').value = project.marketplace || '';
  $('#dataSourceSelect').value = project.dataSource || 'manual';
  if (project.connectorId) $('#connectorSelect').value = project.connectorId;
  renderContextControls();
  renderWorkspace();
}

function deleteProject(id) {
  window.amazonControl.deleteProject(id).then(function () {
    state.projects = (state.projects || []).filter(function (item) { return item.id !== id; });
    if (state.selectedProjectId === id) clearCurrentProject();
    else renderWorkspace();
  }).catch(function (error) {
    if ($('#projectMessage')) $('#projectMessage').textContent = error.message;
  });
}

function runApprovalAction(action, id) {
  var runner = action === 'approve'
    ? window.amazonControl.approveAction(id)
    : action === 'reject'
      ? window.amazonControl.rejectAction(id)
      : window.amazonControl.executeApprovedAction(id);
  runner.then(function (result) {
    if (action === 'approve') {
      state.actionDrafts = [result].concat(state.actionDrafts || []);
    }
    if (action === 'execute') {
      state.executionQueue = [result].concat(state.executionQueue || []);
    }
    return refreshState(false);
  }).then(function () {
    if ($('#executionMessage')) $('#executionMessage').textContent = '操作完成，状态已更新。';
    renderWorkspace();
  }).catch(function (error) {
    if ($('#executionMessage')) $('#executionMessage').textContent = error.message;
  });
}

function selectedAgentFlow() {
  return (state.agentFlows || []).find(function (flow) { return flow.id === state.selectedAgentFlowId; })
    || (state.agentFlows || [])[0]
    || { id: '', name: '未配置流程', version: 0, nodes: [], edges: [] };
}

function clientValidateAgentFlow(flow) {
  var errors = [];
  var nodes = flow.nodes || [];
  var edges = flow.edges || [];
  var ids = {};
  nodes.forEach(function (node) {
    if (!node.id) errors.push('节点缺少 ID');
    if (ids[node.id]) errors.push('节点 ID 重复：' + node.id);
    ids[node.id] = true;
  });
  edges.forEach(function (edge) {
    if (!ids[edge.from] || !ids[edge.to]) errors.push('无效连线：' + edge.from + ' → ' + edge.to);
  });
  if (!nodes.some(function (node) { return node.type === 'verifier'; })) errors.push('流程缺少验证节点');
  if (!nodes.some(function (node) { return node.type === 'output'; })) errors.push('流程缺少输出节点');
  if (flow.risk === 'high' && !nodes.some(function (node) { return node.type === 'approval'; })) errors.push('高风险流程缺少审批节点');
  return errors;
}

function renderAgentFlowCanvas(flow) {
  var nodes = flow.nodes || [];
  var edges = flow.edges || [];
  var nodeMap = {};
  nodes.forEach(function (node) { nodeMap[node.id] = node; });
  var lines = edges.map(function (edge) {
    var from = nodeMap[edge.from];
    var to = nodeMap[edge.to];
    if (!from || !to) return '';
    return '<line x1="' + (Number(from.x || 0) + 110) + '" y1="' + (Number(from.y || 0) + 40) + '" x2="' + Number(to.x || 0) + '" y2="' + (Number(to.y || 0) + 40) + '" marker-end="url(#agent-arrow)"></line>';
  }).join('');
  return '<div id="agentFlowCanvas" class="agent-flow-canvas" data-flow-id="' + esc(flow.id) + '">' +
    '<svg class="agent-flow-svg" width="100%" height="100%"><defs><marker id="agent-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z"></path></marker></defs>' + lines + '</svg>' +
    nodes.map(function (node) {
      return '<button class="agent-flow-node node-' + esc(node.type) + '" style="left:' + Number(node.x || 0) + 'px;top:' + Number(node.y || 0) + 'px" data-agent-node="' + esc(node.id) + '" type="button"><span>' + esc(node.type) + '</span><strong>' + esc(node.label || node.id) + '</strong><small>' + esc(node.agentId || node.toolId || node.capability || '') + '</small></button>';
    }).join('') +
  '</div>';
}

function renderAgentInspector() {
  var agent = (state.agents || []).find(function (item) { return item.id === state.selectedAgentId; }) || (state.agents || [])[0] || {};
  return '<div class="two-col"><label>Agent 名称<input id="agentNameInput" value="' + esc(agent.name || '') + '"></label><label>角色<select id="agentRoleInput">' + ['orchestrator', 'specialist', 'executor', 'operator', 'verifier', 'memory'].map(function (role) { return '<option value="' + role + '"' + (agent.role === role ? ' selected' : '') + '>' + role + '</option>'; }).join('') + '</select></label><label>主能力<select id="agentCapabilityInput">' + ['chat', 'reasoning', 'image', 'video', 'speech', 'data', 'embedding'].map(function (capability) { return '<option value="' + capability + '"' + (agent.capability === capability ? ' selected' : '') + '>' + capability + '</option>'; }).join('') + '</select></label><label>记忆范围<select id="agentMemoryInput">' + ['run', 'asset', 'project', 'system'].map(function (scope) { return '<option value="' + scope + '"' + (agent.memoryScope === scope ? ' selected' : '') + '>' + scope + '</option>'; }).join('') + '</select></label></div>' +
    '<label>说明<textarea id="agentDescriptionInput" rows="3">' + esc(agent.description || '') + '</textarea></label>' +
    '<div class="two-col"><label>技能（逗号分隔）<input id="agentSkillsInput" value="' + esc((agent.skills || []).join(', ')) + '"></label><label>工具（逗号分隔）<input id="agentToolsInput" value="' + esc((agent.tools || []).join(', ')) + '"></label></div>' +
    '<div class="two-col"><label>权限（逗号分隔）<input id="agentPermissionsInput" value="' + esc((agent.permissions || []).join(', ')) + '"></label><label>并发<input id="agentConcurrencyInput" type="number" min="1" value="' + esc(agent.maxConcurrency || 1) + '"></label></div>' +
    '<div class="button-row"><button id="saveAgentButton" class="primary-button" type="button">保存 Agent</button><button id="newAgentButton" class="ghost-button" type="button">新建 Agent</button></div>' +
    '<div id="agentBuilderMessage" class="muted"></div>';
}

function renderAgentBuilderBody() {
  var flow = selectedAgentFlow();
  var validationErrors = clientValidateAgentFlow(flow);
  return '<div class="agent-builder-layout">' +
    '<section class="module-pane agent-builder-toolbar"><div><span class="module-badge">MULTI-AGENT</span><h3>' + esc(flow.name || 'Agent 流程') + '</h3><p>节点可拖动，流程发布后运行会冻结版本，验证通过才允许交付。</p></div><label class="agent-flow-select">流程<select id="agentFlowSelect">' + (state.agentFlows || []).map(function (item) { return '<option value="' + esc(item.id) + '"' + (item.id === flow.id ? ' selected' : '') + '>' + esc(item.name) + ' v' + esc(item.version) + '</option>'; }).join('') + '</select></label><div class="button-row"><button id="validateAgentFlowButton" class="ghost-button" type="button">验证流程</button><button id="saveAgentFlowButton" class="primary-button" type="button">保存流程</button><button id="publishAgentFlowButton" class="ghost-button" type="button">发布版本</button></div></section>' +
    '<div class="agent-builder-grid">' +
      '<aside class="module-pane agent-library-pane"><div class="pane-title">Agent 角色</div><div class="agent-role-list">' + (state.agents || []).map(function (agent) {
        return '<button class="agent-role-card ' + (agent.id === state.selectedAgentId ? 'active' : '') + '" data-select-agent="' + esc(agent.id) + '" type="button"><strong>' + esc(agent.name) + '</strong><span>' + esc(agent.role) + ' · ' + esc(agent.capability) + '</span><small>' + esc((agent.skills || []).slice(0, 2).join(' · ') || '无 Skill') + '</small></button>';
      }).join('') + '</div></aside>' +
      '<section class="module-pane agent-canvas-pane"><div class="pane-title">可视化任务图 <span class="pane-title-note">' + (validationErrors.length ? validationErrors.length + ' 个问题' : '结构有效') + '</span></div>' + renderAgentFlowCanvas(flow) + '<div class="agent-edge-editor"><select id="agentEdgeFromInput">' + (flow.nodes || []).map(function (node) { return '<option value="' + esc(node.id) + '">' + esc(node.label || node.id) + '</option>'; }).join('') + '</select><span>→</span><select id="agentEdgeToInput">' + (flow.nodes || []).map(function (node) { return '<option value="' + esc(node.id) + '">' + esc(node.label || node.id) + '</option>'; }).join('') + '</select><button id="addAgentEdgeButton" class="ghost-button" type="button">添加连线</button><button id="removeAgentEdgeButton" class="ghost-button" type="button">删除最后连线</button></div></section>' +
      '<aside class="module-pane agent-inspector-pane"><div class="pane-title">Agent 配置</div>' + renderAgentInspector() + '<div class="pane-title spaced">流程信息</div><div class="two-col"><label>流程名称<input id="agentFlowNameInput" value="' + esc(flow.name || '') + '"></label><label>风险<select id="agentFlowRiskInput"><option value="low"' + (flow.risk === 'low' ? ' selected' : '') + '>低</option><option value="medium"' + (flow.risk === 'medium' ? ' selected' : '') + '>中</option><option value="high"' + (flow.risk === 'high' ? ' selected' : '') + '>高</option></select></label></div></aside>' +
      '<section class="module-pane agent-run-pane"><div class="pane-title">测试运行</div><label>任务说明<textarea id="agentRunMessageInput" rows="4" placeholder="例如：美国站，分析这组广告数据并给出否词建议。"></textarea></label><div class="two-col"><label>模块<select id="agentRunModuleInput">' + UI_MODULES.filter(function (item) { return ['selection', 'profit', 'ads', 'data', 'inventory', 'listing', 'compliance', 'image', 'video'].indexOf(item.id) >= 0; }).map(function (item) { return '<option value="' + esc(item.id) + '">' + esc(item.title) + '</option>'; }).join('') + '</select></label><label>流程<select id="agentRunFlowInput">' + (state.agentFlows || []).map(function (item) { return '<option value="' + esc(item.id) + '"' + (item.id === flow.id ? ' selected' : '') + '>' + esc(item.name) + ' v' + esc(item.version) + '</option>'; }).join('') + '</select></label></div><div class="button-row"><button id="runAgentFlowButton" class="primary-button" type="button">运行流程</button></div><div id="agentRunMessage" class="muted"></div></section>' +
      '<section class="module-pane result-pane"><div class="pane-title">运行与验证记录</div><div class="compact-list">' + renderAgentRunHistory() + '</div></section>' +
    '</div>' +
  '</div>';
}

function renderAgentRunHistory() {
  var runs = (state.workflowRuns || []).slice(0, 10);
  if (!runs.length) return '<div class="empty-state">暂无 Agent 运行记录。</div>';
  return runs.map(function (run) {
    return '<div class="mini-card"><strong>' + esc(run.intent || run.runId) + '</strong><span>' + esc(run.flowId) + ' v' + esc(run.flowVersion) + ' · ' + esc(run.status) + '</span><small>验证：' + esc(run.verification && run.verification.status || 'pending') + ' · ' + esc(formatTime(run.completedAt || run.startedAt)) + '</small></div>';
  }).join('');
}

function renderApiBody() {
  var catalog = state.connectorCatalog && state.connectorCatalog.length ? state.connectorCatalog : DEFAULT_CONNECTOR_CATALOG;
  var capabilityLabels = {
    chat: '聊天',
    reasoning: '推理',
    image: '图片生成',
    video: '视频生成',
    speech: '语音',
    data: '数据连接',
    embedding: '向量检索'
  };
  return '<div class="api-control-center">' +
    '<section class="module-pane api-control-hero"><div><span class="module-badge">API & AI CONTROL CENTER</span><h3>能力路由总览</h3><p>每个能力独立选择主 Provider 和备用 Provider。切换后 Agent 与模块会立即按新路线调用。</p></div><div class="api-runtime-status"><span>运行模式</span><strong>' + esc(state.runtimeMode || 'preview') + '</strong></div></section>' +
    '<section class="capability-route-grid">' + Object.keys(capabilityLabels).map(function (capability) {
      var route = (state.providerRoutes || []).find(function (item) { return item.capability === capability && item.scopeType === 'global'; });
      var profileIds = route ? (route.profileIds || []) : [];
      var activeProfile = (state.providerProfiles || []).find(function (item) { return item.id === profileIds[0]; });
      return '<div class="capability-route-card"><span>' + esc(capabilityLabels[capability]) + '</span><strong>' + esc(activeProfile ? activeProfile.name : '未配置') + '</strong><small>备用：' + esc(((route && route.fallbackProfileIds) || []).map(function (id) { var item = (state.providerProfiles || []).find(function (profile) { return profile.id === id; }); return item ? item.name : id; }).join('、') || '无') + '</small><em>' + esc((state.providerProfiles || []).filter(function (item) { return (item.capabilities || []).indexOf(capability) >= 0; }).length) + ' 个可用 Profile</em></div>';
    }).join('') + '</section>' +
    '<div class="module-grid api-control-grid">' +
      '<section class="module-pane"><div class="pane-title">Provider Profiles</div><div class="provider-profile-list">' + renderProviderProfileList() + '</div></section>' +
      '<section class="module-pane"><div class="pane-title">添加 / 编辑 Provider</div>' + renderProviderForm() + '<div id="providerMessage" class="muted"></div></section>' +
      '<section class="module-pane"><div class="pane-title">能力路线</div>' + renderProviderRouteForm() + '<div id="providerRouteMessage" class="muted"></div></section>' +
      '<section class="module-pane"><div class="pane-title">用量与健康</div>' + renderUsageSummary() + '</section>' +
      '<section class="module-pane api-tools-pane"><div class="pane-title">工具与 Skill</div><div class="tool-grid">' + renderToolRegistryList() + '</div><div class="button-row"><button id="discoverSkillsButton" class="ghost-button" type="button">扫描 Codex Skills</button></div><div id="skillsDiscoveryPane" class="compact-list"></div><div class="pane-title spaced">注册工具</div><div class="two-col"><label>名称<input id="toolNameInput" placeholder="例如：库存日报分析"></label><label>类型<select id="toolKindInput"><option value="builtin">内置规则</option><option value="ai">AI 生成</option><option value="rest">REST 调用</option><option value="webhook">Webhook</option></select></label><label>归属模块<select id="toolModuleInput">' + UI_MODULES.filter(function (m) { return !['assistant', 'profile', 'recap', 'codex'].includes(m.id); }).map(function (m) { return '<option value="' + esc(m.id) + '">' + esc(m.title) + '</option>'; }).join('') + '</select></label><label>风险<select id="toolRiskInput"><option value="low">低</option><option value="medium">中</option><option value="high">高</option></select></label><label class="inline-check"><input id="toolApprovalRequiredInput" type="checkbox"> 需人工审批</label></div><label>描述<textarea id="toolDescriptionInput" rows="2" placeholder="这个工具能做什么、输入输出是什么"></textarea></label><div class="button-row"><button id="saveToolButton" class="primary-button" type="button">注册工具</button></div><div id="toolMessage" class="muted"></div></section>' +
      '<details class="module-pane legacy-api-pane"><summary>旧版连接器与同步</summary><div class="compact-list">' + renderApiConnections() + '</div><div class="catalog-list">' + catalog.slice(0, 8).map(function (item) { return '<button class="catalog-card" data-catalog-id="' + esc(item.connectorId) + '" type="button"><strong>' + esc(item.name) + '</strong><span>' + esc(item.type) + ' / ' + esc(item.auth) + '</span><small>' + esc((item.dataTypes || []).join('、')) + '</small></button>'; }).join('') + '</div></details>' +
    '</div>' +
  '</div>';
}

function renderProviderProfileList() {
  if (!(state.providerProfiles || []).length) return '<div class="empty-state">还没有 Provider。先添加一个 OpenAI-compatible、DeepSeek、通用 REST 或本地 Provider。</div>';
  return state.providerProfiles.map(function (profile) {
    return '<div class="provider-profile-card"><div><strong>' + esc(profile.name) + '</strong><span>' + esc(profile.providerKind) + ' · ' + esc((profile.capabilities || []).join(' / ')) + '</span><small>' + esc(profile.model || profile.endpoint || '本地能力') + ' · ' + esc(profile.status || 'configured') + '</small></div><div class="mini-actions"><button data-edit-provider="' + esc(profile.id) + '" type="button">编辑</button><button data-test-provider="' + esc(profile.id) + '" type="button">测试</button><button data-activate-provider="' + esc(profile.id) + '" type="button">设为当前</button><button data-delete-provider="' + esc(profile.id) + '" type="button">删除</button></div></div>';
  }).join('');
}

function renderProviderForm() {
  var profile = (state.providerProfiles || []).find(function (item) { return item.id === state.providerEditingId; }) || {};
  return '<div class="two-col"><label>名称<input id="providerNameInput" value="' + esc(profile.name || '') + '" placeholder="例如：主 OpenAI"></label><label>类型<select id="providerKindInput"><option value="openai-compatible">OpenAI-compatible</option><option value="deepseek">DeepSeek</option><option value="kling">Kling / 可灵类</option><option value="runway">Runway</option><option value="generic-rest">通用 REST</option><option value="local">本地引擎</option></select></label><label>能力<select id="providerCapabilityInput" multiple size="7">' + ['chat', 'reasoning', 'image', 'video', 'speech', 'data', 'embedding'].map(function (capability) { var selected = (profile.capabilities || []).indexOf(capability) >= 0; return '<option value="' + capability + '"' + (selected ? ' selected' : '') + '>' + capability + '</option>'; }).join('') + '</select></label><label>模型<input id="providerModelInput" value="' + esc(profile.model || '') + '" placeholder="模型名"></label></div>' +
    '<label>Endpoint<input id="providerEndpointInput" value="' + esc(profile.endpoint || '') + '" placeholder="https://api.example.com/v1"></label>' +
    '<div class="two-col"><label>鉴权<select id="providerAuthInput"><option value="bearer">Bearer</option><option value="api_key">API Key Header</option><option value="basic">Basic</option><option value="none">无</option></select></label><label>密钥<input id="providerSecretInput" type="password" placeholder="' + (profile.hasCredentials ? '已保存，留空不修改' : '输入本次会话密钥') + '"></label></div>' +
    '<label>请求映射 JSON<textarea id="providerRequestMappingInput" rows="3">{}</textarea></label>' +
    '<div class="button-row"><button id="saveProviderButton" class="primary-button" type="button">保存 Provider</button><button id="newProviderButton" class="ghost-button" type="button">新建</button></div>';
}

function renderProviderRouteForm() {
  var profiles = state.providerProfiles || [];
  return '<div class="two-col"><label>能力<select id="providerRouteCapabilityInput">' + ['chat', 'reasoning', 'image', 'video', 'speech', 'data', 'embedding'].map(function (capability) { return '<option value="' + capability + '">' + capability + '</option>'; }).join('') + '</select></label><label>作用域<select id="providerRouteScopeInput"><option value="global">全局</option><option value="project">当前项目</option><option value="agent">指定 Agent</option></select></label></div>' +
    '<label>作用域 ID<input id="providerRouteScopeIdInput" placeholder="全局留空；项目或 Agent 填 ID"></label>' +
    '<label>主 Provider<select id="providerRoutePrimaryInput"><option value="">未选择</option>' + profiles.map(function (profile) { return '<option value="' + esc(profile.id) + '">' + esc(profile.name) + '</option>'; }).join('') + '</select></label>' +
    '<label>备用 Provider<select id="providerRouteFallbackInput" multiple size="4">' + profiles.map(function (profile) { return '<option value="' + esc(profile.id) + '">' + esc(profile.name) + '</option>'; }).join('') + '</select></label>' +
    '<div class="two-col"><label>最大成本<input id="providerRouteMaxCostInput" type="number" value="0" min="0" step="0.01"></label><label>超时毫秒<input id="providerRouteTimeoutInput" type="number" value="60000" min="1000"></label></div>' +
    '<div class="button-row"><button id="saveProviderRouteButton" class="primary-button" type="button">保存路线</button></div>';
}

function renderUsageSummary() {
  var summary = state.usageSummary || { count: 0, amount: 0, currency: 'USD', byProvider: {} };
  return '<div class="readiness-grid"><div><b>' + esc(summary.count || 0) + '</b><span>调用记录</span></div><div><b>' + esc(summary.currency || 'USD') + ' ' + esc(Number(summary.amount || 0).toFixed(2)) + '</b><span>累计成本</span></div><div><b>' + esc(Object.keys(summary.byProvider || {}).length) + '</b><span>使用 Provider</span></div></div>' +
    '<div class="compact-list">' + (summary.recent || []).slice(0, 8).map(function (item) { return '<div class="mini-card"><strong>' + esc(item.providerId || 'unknown') + '</strong><span>' + esc(item.capability || '') + ' · ' + esc(item.status || '') + '</span><small>' + esc(item.currency || 'USD') + ' ' + esc(item.amount || 0) + ' · ' + esc(formatTime(item.createdAt)) + '</small></div>'; }).join('') + '</div>';
}

function renderApiConnections() {
  if (!state.apiConnections.length) return '<div class="empty-state">还没有配置接口。可以先选择模板，比如 Amazon Ads API、SP-API、Keepa、ERP、OpenAI/AI 生成接口。</div>';
  return state.apiConnections.map(function (conn) {
    return '<div class="mini-card"><strong>' + esc(conn.name) + '</strong><span>' + esc(conn.connectorId) + ' · ' + esc(conn.status || 'configured') + ' · 同步 ' + esc(formatTime(conn.lastSyncAt)) + '</span><small>字段：' + esc(conn.fieldMapping ? Object.keys(conn.fieldMapping).join(', ') : '按模板') + '</small><div class="mini-actions"><button data-edit-api="' + esc(conn.id) + '" type="button">编辑</button><button data-test-api="' + esc(conn.id) + '" type="button">测试</button><button data-sync-api="' + esc(conn.id) + '" type="button">同步</button></div></div>';
  }).join('');
}

function renderToolRegistryList() {
  var tools = state.tools && state.tools.length ? state.tools : DEFAULT_TOOLS;
  var riskLabel = { low: '低风险', medium: '中风险', high: '高风险' };
  return tools.map(function (tool) {
    return '<div class="mini-card tool-card"><strong>' + esc(tool.name) + '</strong><span>' + esc(tool.kind) + ' · ' + esc(tool.module || 'data') + ' · ' + (riskLabel[tool.risk] || tool.risk || '低风险') + (tool.approvalRequired ? ' · 需审批' : '') + '</span><small>' + esc(tool.description || '') + '</small><div class="mini-actions"><button data-run-tool="' + esc(tool.id) + '" type="button">运行</button><button data-delete-tool="' + esc(tool.id) + '" type="button">删除</button></div></div>';
  }).join('');
}

function renderToolRunsList() {
  if (!(state.toolRuns || []).length) return '<div class="empty-state">暂无工具运行记录。</div>';
  return (state.toolRuns || []).slice(0, 12).map(function (run) {
    return '<div class="mini-card"><strong>' + esc(run.toolName || run.toolId) + '</strong><span>' + esc(run.status || 'completed') + ' · ' + esc(formatTime(run.createdAt)) + '</span><small>' + esc(run.summary || '') + '</small></div>';
  }).join('');
}

function renderIngestBody() {
  return '<div class="module-grid ingest-workspace-grid">' +
    '<section class="module-pane"><div class="pane-title">导入数据</div><div class="two-col"><label>数据源名称<input id="ingestNameInput" placeholder="例如：德国站广告搜索词 8月"></label><label>来源类型<select id="ingestSourceTypeInput"><option value="csv">CSV</option><option value="json">JSON</option><option value="api">API</option><option value="manual">手动</option></select></label><label>归属模块<select id="ingestModuleInput">' + UI_MODULES.filter(function (m) { return !['assistant', 'profile', 'recap', 'codex'].includes(m.id); }).map(function (m) { return '<option value="' + esc(m.id) + '">' + esc(m.title) + '</option>'; }).join('') + '</select></label><label>文件路径<input id="ingestFilePathInput" placeholder="D:\\AmazonControlData\\source\\ads.csv"></label></div><div id="ingestDropZone" class="drop-zone">拖拽 CSV/JSON 到这里，或把文件路径粘贴到上面。</div><label>粘贴 CSV 或 JSON<textarea id="ingestCsvInput" rows="8" placeholder="campaignName,searchTerm,spend,sales,orders"></textarea></label><label>字段映射 JSON<textarea id="ingestMappingInput" rows="4">{ "spend": "spend", "sales": "sales", "orders": "orders" }</textarea></label><div class="button-row"><button id="previewIngestButton" class="ghost-button" type="button">预览校验</button><button id="saveIngestButton" class="primary-button" type="button">保存数据源</button><button id="clearIngestButton" class="ghost-button" type="button">清空</button></div></section>' +
    '<section class="module-pane"><div class="pane-title">预览 / 历史</div><div id="ingestPreviewPane" class="data-preview-card">等待预览。聊天自动导入的数据也会出现在这里。</div><div class="pane-title spaced">导入历史</div><div class="compact-list">' + renderImportList(20) + '</div></section>' +
  '</div>';
}

function renderCodexBody() {
  return '<div class="module-grid">' +
    '<section class="module-pane"><div class="pane-title">修改助手</div><label>希望 Codex 修改什么？<textarea id="codexPromptInput" rows="7" placeholder="' + esc(MODULE_TEMPLATES.codex.placeholder) + '"></textarea></label><label>补充上下文<textarea id="codexContextInput" rows="5" placeholder="例如：哪个页面慢、哪个接口缺字段、哪个交互不顺。"></textarea></label><div class="button-row"><button id="submitCodexButton" class="primary-button" type="button">生成 Codex 上下文</button></div><div id="codexMessage" class="muted"></div></section>' +
    '<section class="module-pane"><div class="pane-title">结果</div><div id="codexResultPane" class="codex-result">这里会生成可复制给 Codex 的完整修改任务。</div></section>' +
  '</div>';
}

function renderRecapBody() {
  return '<div class="module-grid">' +
    '<section class="module-pane"><div class="pane-title">任务历史</div><div class="compact-list">' + renderHistoryList('recap') + '</div></section>' +
    '<section class="module-pane result-pane"><div class="pane-title">当前结果 / 导出</div><div id="resultPane">' + renderCurrentResult() + '</div><div class="button-row"><button id="exportJsonButton" class="ghost-button" type="button">导出 JSON</button><button id="exportMarkdownButton" class="ghost-button" type="button">导出 Markdown</button><button id="exportCsvButton" class="ghost-button" type="button">导出 CSV/表格</button></div></section>' +
  '</div>';
}

function renderLaunchBody() {
  var template = MODULE_TEMPLATES.launch;
  return '<div class="module-grid launch-workspace-grid">' +
    '<section class="module-pane">' +
      '<div class="pane-title">自动生成上架草稿</div>' +
      '<textarea id="taskMessageInput" rows="5" placeholder="' + esc(template.placeholder) + '"></textarea>' +
      '<div class="button-row"><button id="submitTaskButton" class="primary-button" type="button">从素材/关键词生成草稿</button><button class="ghost-button" data-module="assistant" type="button">改用聊天</button></div>' +
      '<div class="pane-title spaced">快捷任务</div>' + renderQuickPrompts(template.samples || []) +
      '<div class="pane-title spaced">手动创建 / 编辑草稿</div>' +
      '<div class="two-col"><label>标题<input id="listingTitleInput" placeholder="Listing 标题"></label><label>SKU<input id="listingSkuInput" placeholder="SKU"></label><label>ASIN<input id="listingAsinInput" placeholder="ASIN"></label><label>售价<input id="listingPriceInput" type="number" step="0.01"></label></div>' +
      '<label>五点描述（每行一点）<textarea id="listingBulletsInput" rows="5"></textarea></label>' +
      '<label>商品描述<textarea id="listingDescriptionInput" rows="4"></textarea></label>' +
      '<label>后台搜索词（逗号分隔）<input id="listingSearchTermsInput" placeholder="pet hair remover, lint roller"></label>' +
      '<div class="button-row"><button id="saveListingDraftButton" class="primary-button" type="button">保存草稿</button></div>' +
      '<div id="launchMessage" class="muted"></div>' +
    '</section>' +
    '<section class="module-pane">' +
      '<div class="pane-title">上架草稿列表</div>' +
      '<div class="compact-list">' + renderListingDraftList() + '</div>' +
      '<div class="pane-title spaced">状态说明</div>' +
      '<div class="workflow-steps">' + ['draft 草稿', 'needs_review 待复核', 'approved 已批准', 'locked 已锁定', 'submitted 已提交', 'archived 归档'].map(function (item) { return '<div><b>' + esc(item) + '</b></div>'; }).join('') + '</div>' +
      '<div class="muted">只生成草稿和上传表格，不自动提交亚马逊后台。</div>' +
    '</section>' +
  '</div>';
}

function renderListingDraftList() {
  if (!(state.listingDrafts || []).length) return '<div class="empty-state">暂无上架草稿。可从素材/关键词自动生成，或手动填写保存。</div>';
  var statusLabel = { draft: '草稿', needs_review: '待复核', approved: '已批准', locked: '已锁定', submitted: '已提交', archived: '归档' };
  var transitions = {
    draft: [['needs_review', '提交复核'], ['archived', '归档']],
    needs_review: [['approved', '批准'], ['draft', '退回草稿'], ['archived', '归档']],
    approved: [['locked', '锁定'], ['draft', '退回草稿'], ['archived', '归档']],
    locked: [['submitted', '标记已提交'], ['archived', '归档']],
    submitted: [['archived', '归档']],
    archived: []
  };
  return state.listingDrafts.map(function (draft) {
    var buttons = (transitions[draft.status] || []).map(function (pair) {
      return '<button data-transition-listing="' + esc(draft.id) + '" data-status="' + esc(pair[0]) + '" type="button">' + esc(pair[1]) + '</button>';
    }).join('');
    return '<div class="mini-card"><strong>' + esc(draft.title || draft.sku || draft.id) + '</strong><span>' + esc(draft.marketplace || '未选站点') + ' · ' + (statusLabel[draft.status] || draft.status) + ' · ' + esc(formatTime(draft.updatedAt)) + '</span><small>' + esc((draft.bullets || [])[0] || draft.description || '') + '</small><div class="mini-actions">' + buttons + '<button data-export-listing="' + esc(draft.id) + '" type="button">导出 CSV</button><button data-delete-listing="' + esc(draft.id) + '" type="button">删除</button></div></div>';
  }).join('');
}

function bindWorkspaceEvents() {
  Array.prototype.forEach.call(document.querySelectorAll('[data-module]'), function (button) {
    button.addEventListener('click', function () { switchModule(button.dataset.module); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-assistant-prompt]'), function (button) {
    button.addEventListener('click', function () {
      switchModule('assistant');
      setTimeout(function () {
        var input = $('#assistantMessageInput');
        if (input) input.value = button.dataset.assistantPrompt;
      }, 0);
    });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-module-prompt]'), function (button) {
    button.addEventListener('click', function () {
      var input = $('#taskMessageInput');
      if (input) input.value = button.dataset.modulePrompt;
    });
  });
  Array.prototype.forEach.call(document.querySelectorAll('.history-task'), function (button) {
    button.addEventListener('click', function () { selectTask(button.dataset.taskId); });
  });
  var send = $('#sendAssistantButton');
  if (send) send.addEventListener('click', submitAssistantChat);
  var clear = $('#clearAssistantInputButton');
  if (clear) clear.addEventListener('click', function () { $('#assistantMessageInput').value = ''; });
  var importAssetsButton = $('#importAssetsButton');
  if (importAssetsButton) importAssetsButton.addEventListener('click', importAssetsFromInput);
  var selectAssetFilesButton = $('#selectAssetFilesButton');
  if (selectAssetFilesButton) selectAssetFilesButton.addEventListener('click', chooseAssetFiles);
  Array.prototype.forEach.call(document.querySelectorAll('[data-content-select]'), function (button) {
    button.addEventListener('click', function () { chooseContentFiles(button.dataset.contentSelect); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-content-import]'), function (button) {
    button.addEventListener('click', function () { importContentPaths(button.dataset.contentImport); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-content-file-input]'), function (input) {
    input.addEventListener('change', function () {
      var files = Array.prototype.slice.call(input.files || []);
      input.value = '';
      importSelectedContentFiles(files, input.dataset.contentFileInput);
    });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-media-operation]'), function (button) {
    button.addEventListener('click', function () {
      var select = $('#mediaOperationSelect');
      if (!select) return;
      select.value = button.dataset.mediaOperation;
      Array.prototype.forEach.call(document.querySelectorAll('[data-media-operation]'), function (item) {
        item.classList.toggle('active', item === button);
      });
      updateMediaOperationUi();
    });
  });
  var mediaOperationSelect = $('#mediaOperationSelect');
  if (mediaOperationSelect) {
    mediaOperationSelect.addEventListener('change', updateMediaOperationUi);
    updateMediaOperationUi();
  }
  var submitMediaRunButton = $('#submitMediaRunButton');
  if (submitMediaRunButton) submitMediaRunButton.addEventListener('click', submitMediaRunFromUi);
  Array.prototype.forEach.call(document.querySelectorAll('[data-edit-provider]'), function (button) {
    button.addEventListener('click', function () { editProviderProfile(button.dataset.editProvider); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-test-provider]'), function (button) {
    button.addEventListener('click', function () { testProviderFromUi(button.dataset.testProvider); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-activate-provider]'), function (button) {
    button.addEventListener('click', function () { activateProviderProfile(button.dataset.activateProvider); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-delete-provider]'), function (button) {
    button.addEventListener('click', function () { deleteProviderFromUi(button.dataset.deleteProvider); });
  });
  if ($('#saveProviderButton')) $('#saveProviderButton').addEventListener('click', saveProviderFromUi);
  if ($('#newProviderButton')) $('#newProviderButton').addEventListener('click', function () {
    state.providerEditingId = '';
    renderWorkspace();
  });
  if ($('#saveProviderRouteButton')) $('#saveProviderRouteButton').addEventListener('click', saveProviderRouteFromUi);
  if ($('#discoverSkillsButton')) $('#discoverSkillsButton').addEventListener('click', discoverSkillsFromUi);
  Array.prototype.forEach.call(document.querySelectorAll('[data-select-agent]'), function (button) {
    button.addEventListener('click', function () {
      state.selectedAgentId = button.dataset.selectAgent;
      renderWorkspace();
    });
  });
  if ($('#agentFlowSelect')) $('#agentFlowSelect').addEventListener('change', function () {
    state.selectedAgentFlowId = $('#agentFlowSelect').value;
    renderWorkspace();
  });
  if ($('#saveAgentButton')) $('#saveAgentButton').addEventListener('click', saveAgentFromUi);
  if ($('#newAgentButton')) $('#newAgentButton').addEventListener('click', function () {
    state.selectedAgentId = '';
    renderWorkspace();
  });
  if ($('#saveAgentFlowButton')) $('#saveAgentFlowButton').addEventListener('click', saveAgentFlowFromUi);
  if ($('#publishAgentFlowButton')) $('#publishAgentFlowButton').addEventListener('click', publishAgentFlowFromUi);
  if ($('#validateAgentFlowButton')) $('#validateAgentFlowButton').addEventListener('click', function () {
    var errors = clientValidateAgentFlow(selectedAgentFlow());
    setAgentBuilderMessage(errors.length ? errors.join('；') : '流程结构有效，可以发布。', errors.length ? 'error' : 'success');
  });
  if ($('#addAgentEdgeButton')) $('#addAgentEdgeButton').addEventListener('click', addAgentEdgeFromUi);
  if ($('#removeAgentEdgeButton')) $('#removeAgentEdgeButton').addEventListener('click', removeAgentEdgeFromUi);
  if ($('#runAgentFlowButton')) $('#runAgentFlowButton').addEventListener('click', runAgentFlowFromUi);
  bindAgentFlowCanvas();
  var assetSearchInput = $('#assetSearchInput');
  if (assetSearchInput) assetSearchInput.addEventListener('input', applyAssetLibraryFilters);
  var assetTypeFilter = $('#assetTypeFilter');
  if (assetTypeFilter) assetTypeFilter.addEventListener('change', applyAssetLibraryFilters);
  var assetMarketplaceFilter = $('#assetMarketplaceFilter');
  if (assetMarketplaceFilter) assetMarketplaceFilter.addEventListener('change', applyAssetLibraryFilters);
  var clearAssetFiltersButton = $('#clearAssetFiltersButton');
  if (clearAssetFiltersButton) clearAssetFiltersButton.addEventListener('click', function () {
    if ($('#assetSearchInput')) $('#assetSearchInput').value = '';
    if ($('#assetTypeFilter')) $('#assetTypeFilter').value = '';
    if ($('#assetMarketplaceFilter')) $('#assetMarketplaceFilter').value = '';
    applyAssetLibraryFilters();
  });
  var exportAssetLibraryButton = $('#exportAssetLibraryButton');
  if (exportAssetLibraryButton) exportAssetLibraryButton.addEventListener('click', exportAssetLibraryJson);
  var copyExecutionChecklistButton = $('#copyExecutionChecklistButton');
  if (copyExecutionChecklistButton) copyExecutionChecklistButton.addEventListener('click', copyExecutionChecklist);
  Array.prototype.forEach.call(document.querySelectorAll('[data-delete-asset]'), function (button) {
    button.addEventListener('click', function () { deleteAsset(button.dataset.deleteAsset); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-use-asset]'), function (button) {
    button.addEventListener('click', function () { appendAssetReference(button.dataset.useAsset); });
  });
  bindAssetDropZone('#assistantDropZone');
  bindAssetDropZone('#assetLibraryDropZone');
  bindAssetDropZone('#imageAssetDropZone');
  bindAssetDropZone('#videoAssetDropZone');
  bindDropZone('#ingestDropZone', '#ingestFilePathInput');
  var submit = $('#submitTaskButton');
  if (submit) submit.addEventListener('click', submitCurrentModule);
  var videoRatio = $('#videoRatioSelect');
  if (videoRatio) videoRatio.addEventListener('change', function () {
    var stage = $('#videoMediaStage');
    if (!stage) return;
    if (videoRatio.value === 'wide') {
      stage.classList.remove('media-stage--video');
      stage.classList.add('media-stage--wide');
    } else {
      stage.classList.remove('media-stage--wide');
      stage.classList.add('media-stage--video');
    }
  });
  var preview = $('#previewIngestButton');
  if (preview) preview.addEventListener('click', previewIngest);
  var saveIngest = $('#saveIngestButton');
  if (saveIngest) saveIngest.addEventListener('click', saveIngestSource);
  var clearIngest = $('#clearIngestButton');
  if (clearIngest) clearIngest.addEventListener('click', clearIngestEdit);
  var saveApi = $('#saveApiButton');
  if (saveApi) saveApi.addEventListener('click', saveApiConnection);
  var newApi = $('#newApiButton');
  if (newApi) newApi.addEventListener('click', clearApiForm);
  var testApi = $('#testApiButton');
  if (testApi) testApi.addEventListener('click', function () { runApiAction('test'); });
  var syncApi = $('#syncApiButton');
  if (syncApi) syncApi.addEventListener('click', function () { runApiAction('sync'); });
  var deleteApi = $('#deleteApiButton');
  if (deleteApi) deleteApi.addEventListener('click', deleteApiConnection);
  var saveTool = $('#saveToolButton');
  if (saveTool) saveTool.addEventListener('click', saveToolFromUi);
  Array.prototype.forEach.call(document.querySelectorAll('[data-run-tool]'), function (button) {
    button.addEventListener('click', function () { runToolFromUi(button.dataset.runTool); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-delete-tool]'), function (button) {
    button.addEventListener('click', function () { deleteToolFromUi(button.dataset.deleteTool); });
  });
  var saveListingDraftButton = $('#saveListingDraftButton');
  if (saveListingDraftButton) saveListingDraftButton.addEventListener('click', saveListingDraftFromUi);
  Array.prototype.forEach.call(document.querySelectorAll('[data-transition-listing]'), function (button) {
    button.addEventListener('click', function () { transitionListingDraftFromUi(button.dataset.transitionListing, button.dataset.status); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-export-listing]'), function (button) {
    button.addEventListener('click', function () { exportListingDraftFromUi(button.dataset.exportListing); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-delete-listing]'), function (button) {
    button.addEventListener('click', function () { deleteListingDraftFromUi(button.dataset.deleteListing); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-catalog-id]'), function (button) {
    button.addEventListener('click', function () { applyCatalogToForm(button.dataset.catalogId); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-edit-api]'), function (button) {
    button.addEventListener('click', function () { editApiConnection(button.dataset.editApi); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-test-api]'), function (button) {
    button.addEventListener('click', function () { runApiAction('test', button.dataset.testApi); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-sync-api]'), function (button) {
    button.addEventListener('click', function () { runApiAction('sync', button.dataset.syncApi); });
  });
  var saveProjectButton = $('#saveProjectButton');
  if (saveProjectButton) saveProjectButton.addEventListener('click', saveCurrentProject);
  var clearProjectButton = $('#clearProjectButton');
  if (clearProjectButton) clearProjectButton.addEventListener('click', clearCurrentProject);
  var exportProjectPackageButton = $('#exportProjectPackageButton');
  if (exportProjectPackageButton) exportProjectPackageButton.addEventListener('click', exportProjectPackageFromUi);
  var importProjectPackageButton = $('#importProjectPackageButton');
  if (importProjectPackageButton) importProjectPackageButton.addEventListener('click', importProjectPackageFromUi);
  Array.prototype.forEach.call(document.querySelectorAll('[data-load-project]'), function (button) {
    button.addEventListener('click', function () { loadProject(button.dataset.loadProject); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-delete-project]'), function (button) {
    button.addEventListener('click', function () { deleteProject(button.dataset.deleteProject); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-approve-action]'), function (button) {
    button.addEventListener('click', function () { runApprovalAction('approve', button.dataset.approveAction); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-reject-action]'), function (button) {
    button.addEventListener('click', function () { runApprovalAction('reject', button.dataset.rejectAction); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-execute-action]'), function (button) {
    button.addEventListener('click', function () { runApprovalAction('execute', button.dataset.executeAction); });
  });
  var codex = $('#submitCodexButton');
  if (codex) codex.addEventListener('click', submitCodexTask);
  var exportJson = $('#exportJsonButton');
  if (exportJson) exportJson.addEventListener('click', function () { exportCurrent('json'); });
  var exportMd = $('#exportMarkdownButton');
  if (exportMd) exportMd.addEventListener('click', function () { exportCurrent('markdown'); });
  var exportCsv = $('#exportCsvButton');
  if (exportCsv) exportCsv.addEventListener('click', function () { exportCurrent('csv'); });
}

function payloadContext() {
  var market = state.market || marketByCode($('#marketplaceSelect').value);
  return {
    projectId: state.selectedProjectId || '',
    projectName: $('#projectNameInput').value || '',
    marketplace: market ? market.code : '',
    marketplaceId: market ? market.marketplaceId : '',
    region: market ? market.region : '',
    currency: market ? market.currency : '',
    language: market ? market.language : '',
    dataSource: $('#dataSourceSelect').value || 'manual',
    connectorId: $('#connectorSelect').value || ''
  };
}

function submitAssistantChat() {
  var input = $('#assistantMessageInput');
  var message = input.value || '';
  var payload = Object.assign(payloadContext(), {
    module: 'assistant',
    message: message,
    assetIds: selectedAssistantAssetIds(),
    useLatestAssets: $('#useLatestAssetsInput') ? $('#useLatestAssetsInput').checked : true
  });
  state.missionStage = 'running';
  state.missionStartedAt = Date.now();
  setActiveTabStatus('running');
  pushDeckEvent('TASK // ROUTING INTENT', '');
  deckSignal('task');
  setAssistantBusy(true);
  window.amazonControl.submitAssistantMessage(payload).then(function (result) {
    if (result.task) setCurrentResult(result.task);
    if (result.task) state.tasks = [result.task].concat(state.tasks.filter(function (item) { return item.taskId !== result.task.taskId; }));
    if (result.importedData && result.importedData.length) state.dataImports = result.importedData.concat(state.dataImports);
    var userMessage = result.userMessage || { role: 'user', content: message, createdAt: new Date().toISOString() };
    state.assistantMessages = [result.assistantMessage, userMessage].concat(state.assistantMessages || []);
    state.missionStage = 'completed';
    setActiveTabStatus('idle');
    pushDeckEvent('TASK // ANALYSIS COMPLETE', 'success');
    deckSignal('success');
    input.value = '';
    renderWorkspace();
    return refreshState(false);
  }).catch(function (error) {
    state.missionStage = 'failed';
    setActiveTabStatus('error');
    showInlineError(error.message);
  }).finally(function () {
    setAssistantBusy(false);
  });
}

function setAssistantBusy(isBusy) {
  var button = $('#sendAssistantButton');
  if (button) button.textContent = isBusy ? '正在自动导入和分析...' : '发送并自动分析';
}

function submitCurrentModule() {
  var payload = Object.assign(payloadContext(), {
    module: state.activeModule,
    message: ($('#taskMessageInput') && $('#taskMessageInput').value) || defaultModuleMessage(state.activeModule),
    metrics: readMetricInputs(),
    parameters: readModuleParameters(),
    workflowStage: state.activeModule
  });
  if (!payload.marketplace) {
    showInlineError('请先在顶部选择站点，避免币种、语言和合规规则误判。');
    return;
  }
  state.missionStage = 'running';
  state.missionStartedAt = Date.now();
  setActiveTabStatus('running');
  pushDeckEvent('TASK // EXECUTING MODULE', '');
  deckSignal('task');
  window.amazonControl.submitTask(payload).then(function (task) {
    setCurrentResult(task);
    state.tasks = [task].concat(state.tasks.filter(function (item) { return item.taskId !== task.taskId; }));
    state.missionStage = 'completed';
    setActiveTabStatus('idle');
    pushDeckEvent('TASK // MODULE COMPLETE', 'success');
    deckSignal('success');
    renderWorkspace();
  }).catch(function (error) {
    state.missionStage = 'failed';
    setActiveTabStatus('error');
    showInlineError(error.message);
  });
}

function readMetricInputs() {
  return {
    price: $('#metricPrice') ? $('#metricPrice').value : undefined,
    cost: $('#metricCost') ? $('#metricCost').value : undefined,
    fbaFee: $('#metricFba') ? $('#metricFba').value : undefined,
    referralFee: $('#metricReferral') ? $('#metricReferral').value : undefined,
    units30d: $('#metricUnits') ? $('#metricUnits').value : undefined,
    inventory: $('#metricInventory') ? $('#metricInventory').value : undefined,
    leadTimeDays: $('#metricLeadTime') ? $('#metricLeadTime').value : undefined,
    spend: $('#metricSpend') ? $('#metricSpend').value : undefined,
    sales: $('#metricSales') ? $('#metricSales').value : undefined,
    orders: $('#metricOrders') ? $('#metricOrders').value : undefined,
    clicks: $('#metricClicks') ? $('#metricClicks').value : undefined,
    impressions: $('#metricImpressions') ? $('#metricImpressions').value : undefined
  };
}

function readModuleParameters() {
  return {
    imageSize: $('#imageSizeInput') ? $('#imageSizeInput').value : '',
    imageRatio: $('#imageRatioInput') ? $('#imageRatioInput').value : '',
    videoDuration: $('#videoDurationInput') ? $('#videoDurationInput').value : '',
    videoRatio: $('#videoRatioSelect') ? $('#videoRatioSelect').value : ''
  };
}

function defaultModuleMessage(moduleId) {
  var template = MODULE_TEMPLATES[moduleId] || MODULE_TEMPLATES.selection;
  return (template.samples && template.samples[0]) || template.placeholder || '运行当前模块';
}

function fakeTask(payload) {
  return {
    taskId: 'preview-' + Date.now(),
    resolvedModule: payload.module || 'selection',
    status: 'completed',
    marketplace: payload.marketplace,
    message: payload.message,
    createdAt: new Date().toISOString(),
    summary: '预览模式已生成结果。请用 npm run dev 或 EXE 启动完整版后，本地服务会自动保存历史和导出文件。',
    insights: [{ label: '输入', value: payload.message || '无' }, { label: '站点', value: payload.marketplace || '未选择' }],
    actions: [{ priority: 'P1', text: '启动完整版后可自动导入 CSV/JSON、保存原始快照并生成正式分析结果。' }],
    risks: [],
    artifacts: [{ type: 'preview', name: '预览产物', data: payload }]
  };
}

function previewIngest() {
  var payload = ingestPayload();
  window.amazonControl.previewDataSource(payload).then(function (preview) {
    $('#ingestPreviewPane').innerHTML = previewHtml(preview);
  }).catch(function (error) {
    $('#ingestPreviewPane').innerHTML = '<div class="error-box">' + esc(error.message) + '</div>';
  });
}

function saveIngestSource() {
  var payload = ingestPayload();
  if (!payload.name) {
    $('#ingestPreviewPane').innerHTML = '<div class="error-box">请先填写数据源名称。</div>';
    return;
  }
  window.amazonControl.saveDataImport(payload).then(function (saved) {
    state.dataImports = [saved].concat(state.dataImports.filter(function (item) { return item.importId !== saved.importId; }));
    renderWorkspace();
  }).catch(function (error) {
    $('#ingestPreviewPane').innerHTML = '<div class="error-box">' + esc(error.message) + '</div>';
  });
}

function ingestPayload() {
  var raw = $('#ingestCsvInput') ? $('#ingestCsvInput').value : '';
  var sourceType = $('#ingestSourceTypeInput') ? $('#ingestSourceTypeInput').value : 'csv';
  return Object.assign(payloadContext(), {
    importId: state.dataImportEditingId || '',
    name: $('#ingestNameInput') ? $('#ingestNameInput').value : '',
    sourceType: sourceType,
    module: $('#ingestModuleInput') ? $('#ingestModuleInput').value : 'data',
    workflowStage: 'ingest',
    filePath: $('#ingestFilePathInput') ? $('#ingestFilePathInput').value : '',
    fieldMapping: safeJson($('#ingestMappingInput') ? $('#ingestMappingInput').value : '{}', {}),
    csvText: sourceType === 'json' ? '' : raw,
    jsonText: sourceType === 'json' ? raw : ''
  });
}

function localPreviewData(payload) {
  var rows = payload.csvText ? payload.csvText.trim().split(/\r?\n/).map(function (line) { return line.split(','); }) : [];
  return { ok: true, sourceType: payload.sourceType, headers: rows[0] || [], rows: rows.slice(0, 10), sample: rows.slice(1, 4), rowCount: Math.max(rows.length - 1, 0), message: '预览模式：启动服务后可读取文件路径并保存记录。' };
}

function previewHtml(preview) {
  if (preview && preview.ok === false) {
    return '<div class="error-box">' + esc(preview.message || '数据预览失败。') + '</div>';
  }
  var html = '<div class="preview-callout"><b>来源</b><span>' + esc(preview.sourceType || '') + '</span></div>';
  html += '<div class="preview-callout"><b>字段</b><span>' + esc((preview.headers || []).join(', ') || '无') + '</span></div>';
  html += '<div class="preview-callout"><b>行数</b><span>' + esc(preview.rowCount || 0) + '</span></div>';
  if (preview.rows && preview.rows.length) {
    html += '<div class="table-wrap inline-table"><table><tbody>' + preview.rows.map(function (row) {
      return '<tr>' + (Array.isArray(row) ? row : Object.values(row)).map(function (cell) { return '<td>' + esc(cell) + '</td>'; }).join('') + '</tr>';
    }).join('') + '</tbody></table></div>';
  }
  if (preview.message) html += '<p class="muted">' + esc(preview.message) + '</p>';
  return html;
}

function clearIngestEdit() {
  state.dataImportEditingId = '';
  ['ingestNameInput', 'ingestFilePathInput', 'ingestCsvInput'].forEach(function (id) { if ($('#' + id)) $('#' + id).value = ''; });
  if ($('#ingestPreviewPane')) $('#ingestPreviewPane').innerHTML = '已清空，可以新增数据源。';
}

function bindDropZone(zoneSelector, targetSelector) {
  var zone = $(zoneSelector);
  var target = $(targetSelector);
  if (!zone || !target) return;
  zone.addEventListener('dragover', function (event) {
    event.preventDefault();
    zone.classList.add('dragging');
  });
  zone.addEventListener('dragleave', function () {
    zone.classList.remove('dragging');
  });
  zone.addEventListener('drop', function (event) {
    event.preventDefault();
    zone.classList.remove('dragging');
    var files = Array.prototype.slice.call(event.dataTransfer.files || []);
    var text = event.dataTransfer.getData('text/plain');
    var values = files.map(function (file) {
      if (window.amazonControl && window.amazonControl.getPathForFile) return window.amazonControl.getPathForFile(file);
      return file.path || file.name;
    }).filter(Boolean);
    if (text) values.push(text);
    if (!values.length) return;
    target.value = target.value ? target.value + '\n' + values.join('\n') : values.join('\n');
  });
}

function setAssetImportMessage(message, tone, kind) {
  var selector = kind === 'image'
    ? '#imageAssetImportMessage'
    : kind === 'video'
      ? '#videoAssetImportMessage'
      : '#assetImportMessage';
  var target = $(selector) || $('#assetImportMessage');
  if (!target) return;
  target.textContent = message;
  target.className = tone === 'error' ? 'error-box' : tone === 'success' ? 'success-box' : 'muted';
}

function fileToDataUrl(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function () { resolve(reader.result); };
    reader.onerror = function () { reject(reader.error || new Error('文件读取失败')); };
    reader.readAsDataURL(file);
  });
}

var MAX_BROWSER_UPLOAD_BYTES = 128 * 1024 * 1024;

function guessedAssetKind(file) {
  var type = String(file && file.type || '').toLowerCase();
  var name = String(file && file.name || '').toLowerCase();
  if (type.indexOf('image/') === 0 || /\.(png|jpe?g|webp|gif|bmp|tiff?|avif)$/.test(name)) return 'image';
  if (type.indexOf('video/') === 0 || /\.(mp4|mov|avi|mkv|webm|m4v)$/.test(name)) return 'video';
  if (type.indexOf('csv') >= 0 || /\.csv$/.test(name)) return 'csv';
  if (type.indexOf('json') >= 0 || /\.json$/.test(name)) return 'json';
  if (/\.(zip|rar|7z)$/.test(name)) return 'archive';
  return 'file';
}

function isAcceptedContentFile(file, kind) {
  if (!kind) return true;
  var fileKind = guessedAssetKind(file);
  if (fileKind === 'archive') return true;
  if (kind === 'image') return fileKind === 'image';
  if (kind === 'video') return fileKind === 'video' || fileKind === 'image';
  return fileKind === kind;
}

async function importDroppedAssetFiles(fileList, kind) {
  var files = Array.prototype.slice.call(fileList || []).filter(Boolean);
  if (!files.length) return;
  setAssetImportMessage('正在导入 ' + files.length + ' 个素材...', '', kind);
  var filePaths = [];
  var uploadFiles = [];
  var errors = [];
  for (const file of files) {
    var filePath = '';
    try {
      if (window.amazonControl && window.amazonControl.getPathForFile) {
        filePath = window.amazonControl.getPathForFile(file) || '';
      } else if (file.path) {
        filePath = file.path;
      }
    } catch (_error) {
      filePath = '';
    }
    if (filePath) {
      filePaths.push(filePath);
      continue;
    }
    if (file.size > MAX_BROWSER_UPLOAD_BYTES) {
      errors.push({ path: file.name, message: '网页导入单个文件不能超过 128 MB。' });
      continue;
    }
    try {
      uploadFiles.push({ name: file.name, type: file.type || '', dataUrl: await fileToDataUrl(file) });
    } catch (error) {
      errors.push({ path: file.name, message: error.message });
    }
  }
  var payload = Object.assign(payloadContext(), {
    module: state.activeModule === 'assistant' ? 'creative' : state.activeModule,
    usage: 'drag-drop',
    tags: ''
  });
  var imported = [];
  try {
    if (filePaths.length) {
      var localResult = await window.amazonControl.importAssets(Object.assign({}, payload, { filePaths: filePaths }));
      imported = imported.concat(localResult.imported || []);
      errors = errors.concat(localResult.errors || []);
      if (localResult.assets) state.assets = localResult.assets;
    }
    if (uploadFiles.length) {
      var uploadResult = await window.amazonControl.uploadAssets(Object.assign({}, payload, { files: uploadFiles }));
      imported = imported.concat(uploadResult.imported || []);
      errors = errors.concat(uploadResult.errors || []);
      if (uploadResult.assets) state.assets = uploadResult.assets;
    }
    renderWorkspace();
    var message = imported.length ? '素材导入成功：' + imported.length + ' 个。' : '没有导入素材。';
    if (errors.length) message += ' 失败 ' + errors.length + ' 个，首个错误：' + (errors[0].path || '') + ' - ' + (errors[0].message || '未知错误');
    setAssetImportMessage(message, errors.length ? 'error' : 'success', kind);
    pushDeckEvent('ASSETS // IMPORT ' + imported.length, errors.length ? 'alert' : 'success');
    deckSignal(errors.length ? 'alert' : 'success');
  } catch (error) {
    setAssetImportMessage(error.message, 'error', kind);
    pushDeckEvent('ASSETS // IMPORT FAILED', 'alert');
    deckSignal('alert');
  }
}

function bindAssetDropZone(selector) {
  var zone = $(selector);
  if (!zone || zone.dataset.assetDropBound) return;
  zone.dataset.assetDropBound = 'true';
  function chooseFromZone() {
    chooseContentFiles(zone.dataset.assetDropKind || '');
  }
  zone.addEventListener('click', chooseFromZone);
  zone.addEventListener('keydown', function (event) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    chooseFromZone();
  });
  zone.addEventListener('dragenter', function (event) {
    event.preventDefault();
    zone.classList.add('dragging');
  });
  zone.addEventListener('dragover', function (event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    zone.classList.add('dragging');
  });
  zone.addEventListener('dragleave', function (event) {
    if (!zone.contains(event.relatedTarget)) zone.classList.remove('dragging');
  });
  zone.addEventListener('drop', async function (event) {
    event.preventDefault();
    zone.classList.remove('dragging');
    var fileList = event.dataTransfer && event.dataTransfer.files;
    if (fileList && fileList.length) {
      var files = Array.prototype.slice.call(fileList);
      var kind = zone.dataset.assetDropKind || '';
      var accepted = kind ? files.filter(function (file) { return isAcceptedContentFile(file, kind); }) : files;
      if (kind && accepted.length !== files.length) {
        setAssetImportMessage('已忽略 ' + (files.length - accepted.length) + ' 个不符合当前素材类型的文件。', 'error', kind);
      }
      if (accepted.length) await importDroppedAssetFiles(accepted, kind);
      return;
    }
    var text = event.dataTransfer ? event.dataTransfer.getData('text/plain') : '';
    var values = String(text || '').split(/\r?\n/).map(function (line) { return line.trim(); }).filter(Boolean);
    if (!values.length) return;
    var links = values.filter(function (item) { return /^https?:\/\//i.test(item); });
    var paths = values.filter(function (item) { return !/^https?:\/\//i.test(item); });
    try {
      var result = await window.amazonControl.importAssets(Object.assign(payloadContext(), { filePaths: paths, links: links, usage: 'drag-drop' }));
      if (result.assets) state.assets = result.assets;
      renderWorkspace();
      setAssetImportMessage('拖拽导入成功：' + ((result.imported || []).length || 0) + ' 个素材。', 'success');
    } catch (error) {
      setAssetImportMessage(error.message, 'error');
    }
  });
}

function saveProviderFromUi() {
  var capabilitySelect = $('#providerCapabilityInput');
  var capabilities = capabilitySelect
    ? Array.prototype.slice.call(capabilitySelect.selectedOptions).map(function (option) { return option.value; })
    : [];
  var payload = {
    id: state.providerEditingId || '',
    name: $('#providerNameInput') ? $('#providerNameInput').value : '',
    providerKind: $('#providerKindInput') ? $('#providerKindInput').value : 'openai-compatible',
    capabilities: capabilities,
    endpoint: $('#providerEndpointInput') ? $('#providerEndpointInput').value : '',
    model: $('#providerModelInput') ? $('#providerModelInput').value : '',
    authMethod: $('#providerAuthInput') ? $('#providerAuthInput').value : 'bearer',
    requestMapping: safeJson($('#providerRequestMappingInput') ? $('#providerRequestMappingInput').value : '{}', {}),
    secret: $('#providerSecretInput') ? $('#providerSecretInput').value : ''
  };
  if (!payload.name || !payload.capabilities.length) {
    if ($('#providerMessage')) $('#providerMessage').textContent = '请填写名称并至少选择一种能力。';
    return;
  }
  window.amazonControl.saveProviderProfile(payload).then(function (profile) {
    state.providerEditingId = profile.id;
    state.providerProfiles = [profile].concat((state.providerProfiles || []).filter(function (item) { return item.id !== profile.id; }));
    if ($('#providerMessage')) $('#providerMessage').textContent = 'Provider 已保存。';
    return refreshState(false);
  }).then(function () {
    renderWorkspace();
  }).catch(function (error) {
    if ($('#providerMessage')) $('#providerMessage').textContent = error.message;
  });
}

function editProviderProfile(id) {
  state.providerEditingId = id;
  renderWorkspace();
}

function testProviderFromUi(id) {
  window.amazonControl.testProviderProfile(id).then(function (result) {
    if ($('#providerMessage')) $('#providerMessage').textContent = result.message;
    return refreshState(false);
  }).then(function () {
    renderWorkspace();
  }).catch(function (error) {
    if ($('#providerMessage')) $('#providerMessage').textContent = error.message;
  });
}

async function activateProviderProfile(id) {
  var profile = (state.providerProfiles || []).find(function (item) { return item.id === id; });
  if (!profile) return;
  for (const capability of profile.capabilities || []) {
    await window.amazonControl.saveProviderRoute({
      capability: capability,
      scopeType: 'global',
      scopeId: '',
      profileIds: [id]
    });
  }
  await refreshState(false);
  renderWorkspace();
}

function deleteProviderFromUi(id) {
  window.amazonControl.deleteProviderProfile(id, false).then(function (result) {
    if (result && result.ok === false) {
      if ($('#providerMessage')) $('#providerMessage').textContent = '该 Provider 正在被路线使用，请先重新分配路线。';
      return null;
    }
    state.providerProfiles = (state.providerProfiles || []).filter(function (item) { return item.id !== id; });
    if (state.providerEditingId === id) state.providerEditingId = '';
    if ($('#providerMessage')) $('#providerMessage').textContent = 'Provider 已删除。';
    return refreshState(false);
  }).then(function (result) {
    if (result !== null) renderWorkspace();
  }).catch(function (error) {
    if ($('#providerMessage')) $('#providerMessage').textContent = error.message;
  });
}

function saveProviderRouteFromUi() {
  var primary = $('#providerRoutePrimaryInput') ? $('#providerRoutePrimaryInput').value : '';
  var fallback = $('#providerRouteFallbackInput')
    ? Array.prototype.slice.call($('#providerRouteFallbackInput').selectedOptions).map(function (option) { return option.value; })
    : [];
  var payload = {
    capability: $('#providerRouteCapabilityInput') ? $('#providerRouteCapabilityInput').value : 'chat',
    scopeType: $('#providerRouteScopeInput') ? $('#providerRouteScopeInput').value : 'global',
    scopeId: $('#providerRouteScopeIdInput') ? $('#providerRouteScopeIdInput').value : '',
    profileIds: primary ? [primary] : [],
    fallbackProfileIds: fallback,
    maxCost: Number($('#providerRouteMaxCostInput') ? $('#providerRouteMaxCostInput').value : 0),
    timeoutMs: Number($('#providerRouteTimeoutInput') ? $('#providerRouteTimeoutInput').value : 60000)
  };
  window.amazonControl.saveProviderRoute(payload).then(function () {
    if ($('#providerRouteMessage')) $('#providerRouteMessage').textContent = '能力路线已保存。';
    return refreshState(false);
  }).then(function () {
    renderWorkspace();
  }).catch(function (error) {
    if ($('#providerRouteMessage')) $('#providerRouteMessage').textContent = error.message;
  });
}

function discoverSkillsFromUi() {
  window.amazonControl.discoverSkills({}).then(function (skills) {
    var pane = $('#skillsDiscoveryPane');
    if (!pane) return;
    pane.innerHTML = skills.length
      ? skills.slice(0, 40).map(function (skill) { return '<div class="mini-card"><strong>' + esc(skill.name) + '</strong><span>' + esc(skill.id) + '</span><small>' + esc(skill.description || skill.path) + '</small></div>'; }).join('')
      : '<div class="empty-state">未发现 Codex Skill。</div>';
  }).catch(function (error) {
    var pane = $('#skillsDiscoveryPane');
    if (pane) pane.innerHTML = '<div class="error-box">' + esc(error.message) + '</div>';
  });
}

function setAgentBuilderMessage(message, tone) {
  var target = $('#agentBuilderMessage');
  if (!target) return;
  target.textContent = message;
  target.className = tone === 'error' ? 'error-box' : tone === 'success' ? 'success-box' : 'muted';
}

function updateSelectedAgentFlow(mutator) {
  var flows = state.agentFlows || [];
  var flow = selectedAgentFlow();
  var clone = JSON.parse(JSON.stringify(flow));
  mutator(clone);
  state.agentFlows = [clone].concat(flows.filter(function (item) { return item.id !== clone.id; }));
}

function saveAgentFromUi() {
  var payload = {
    id: state.selectedAgentId || '',
    name: $('#agentNameInput') ? $('#agentNameInput').value : '',
    role: $('#agentRoleInput') ? $('#agentRoleInput').value : 'specialist',
    capability: $('#agentCapabilityInput') ? $('#agentCapabilityInput').value : 'reasoning',
    memoryScope: $('#agentMemoryInput') ? $('#agentMemoryInput').value : 'project',
    description: $('#agentDescriptionInput') ? $('#agentDescriptionInput').value : '',
    skills: ($('#agentSkillsInput') ? $('#agentSkillsInput').value : '').split(',').map(function (item) { return item.trim(); }).filter(Boolean),
    tools: ($('#agentToolsInput') ? $('#agentToolsInput').value : '').split(',').map(function (item) { return item.trim(); }).filter(Boolean),
    permissions: ($('#agentPermissionsInput') ? $('#agentPermissionsInput').value : '').split(',').map(function (item) { return item.trim(); }).filter(Boolean),
    maxConcurrency: Number($('#agentConcurrencyInput') ? $('#agentConcurrencyInput').value : 1)
  };
  window.amazonControl.saveAgent(payload).then(function (agent) {
    state.selectedAgentId = agent.id;
    state.agents = [agent].concat((state.agents || []).filter(function (item) { return item.id !== agent.id; }));
    setAgentBuilderMessage('Agent 已保存，版本 ' + agent.version + '。', 'success');
    renderWorkspace();
  }).catch(function (error) {
    setAgentBuilderMessage(error.message, 'error');
  });
}

function saveAgentFlowFromUi() {
  var flow = selectedAgentFlow();
  flow.name = $('#agentFlowNameInput') ? $('#agentFlowNameInput').value : flow.name;
  flow.risk = $('#agentFlowRiskInput') ? $('#agentFlowRiskInput').value : flow.risk;
  window.amazonControl.saveAgentFlow(flow).then(function (result) {
    state.agentFlows = [result.flow].concat((state.agentFlows || []).filter(function (item) { return item.id !== result.flow.id; }));
    state.selectedAgentFlowId = result.flow.id;
    setAgentBuilderMessage('流程已保存，版本 ' + result.flow.version + '。', 'success');
    renderWorkspace();
  }).catch(function (error) {
    setAgentBuilderMessage(error.message + ' ' + JSON.stringify(error.details || {}), 'error');
  });
}

function publishAgentFlowFromUi() {
  window.amazonControl.publishAgentFlow(state.selectedAgentFlowId).then(function (flow) {
    state.agentFlows = [flow].concat((state.agentFlows || []).filter(function (item) { return item.id !== flow.id; }));
    setAgentBuilderMessage('已发布流程版本 ' + flow.version + '。', 'success');
    renderWorkspace();
  }).catch(function (error) {
    setAgentBuilderMessage(error.message, 'error');
  });
}

function addAgentEdgeFromUi() {
  var from = $('#agentEdgeFromInput') ? $('#agentEdgeFromInput').value : '';
  var to = $('#agentEdgeToInput') ? $('#agentEdgeToInput').value : '';
  if (!from || !to || from === to) {
    setAgentBuilderMessage('请选择两个不同的节点。', 'error');
    return;
  }
  updateSelectedAgentFlow(function (flow) {
    if ((flow.edges || []).some(function (edge) { return edge.from === from && edge.to === to; })) return;
    flow.edges.push({ id: 'edge-' + Date.now(), from: from, to: to });
  });
  renderWorkspace();
}

function removeAgentEdgeFromUi() {
  updateSelectedAgentFlow(function (flow) { flow.edges = (flow.edges || []).slice(0, -1); });
  renderWorkspace();
}

function runAgentFlowFromUi() {
  var message = $('#agentRunMessageInput') ? $('#agentRunMessageInput').value : '';
  if (!message) {
    if ($('#agentRunMessage')) $('#agentRunMessage').textContent = '请先填写测试任务。';
    return;
  }
  window.amazonControl.submitWorkflowRun({
    flowId: $('#agentRunFlowInput') ? $('#agentRunFlowInput').value : state.selectedAgentFlowId,
    module: $('#agentRunModuleInput') ? $('#agentRunModuleInput').value : 'data',
    marketplace: state.market ? state.market.code : '',
    projectId: state.selectedProjectId || '',
    agentId: state.selectedAgentId || 'orchestrator',
    message: message
  }).then(function (run) {
    state.workflowRuns = [run].concat(state.workflowRuns || []);
    if ($('#agentRunMessage')) $('#agentRunMessage').textContent = '运行完成，验证：' + (run.verification && run.verification.status || 'pending');
    return refreshState(false);
  }).then(function () {
    renderWorkspace();
  }).catch(function (error) {
    if ($('#agentRunMessage')) $('#agentRunMessage').textContent = error.message;
  });
}

function bindAgentFlowCanvas() {
  var canvas = $('#agentFlowCanvas');
  if (!canvas) return;
  Array.prototype.forEach.call(canvas.querySelectorAll('[data-agent-node]'), function (nodeElement) {
    var nodeId = nodeElement.dataset.agentNode;
    var drag = null;
    nodeElement.addEventListener('pointerdown', function (event) {
      var rect = nodeElement.getBoundingClientRect();
      drag = { startX: event.clientX, startY: event.clientY, left: rect.left - canvas.getBoundingClientRect().left, top: rect.top - canvas.getBoundingClientRect().top };
      nodeElement.setPointerCapture(event.pointerId);
    });
    nodeElement.addEventListener('pointermove', function (event) {
      if (!drag) return;
      var left = Math.max(8, drag.left + event.clientX - drag.startX);
      var top = Math.max(8, drag.top + event.clientY - drag.startY);
      nodeElement.style.left = left + 'px';
      nodeElement.style.top = top + 'px';
    });
    nodeElement.addEventListener('pointerup', function (event) {
      if (!drag) return;
      var left = Math.max(8, drag.left + event.clientX - drag.startX);
      var top = Math.max(8, drag.top + event.clientY - drag.startY);
      updateSelectedAgentFlow(function (flow) {
        var node = (flow.nodes || []).find(function (item) { return item.id === nodeId; });
        if (node) {
          node.x = Math.round(left);
          node.y = Math.round(top);
        }
      });
      drag = null;
      var node = selectedAgentFlow().nodes.find(function (item) { return item.id === nodeId; });
      if (node && node.agentId) state.selectedAgentId = node.agentId;
      renderWorkspace();
    });
  });
}

function applyCatalogToForm(catalogId) {
  var catalog = catalogById(catalogId);
  if (!catalog) return;
  state.apiEditingId = '';
  state.selectedCatalogId = catalog.connectorId;
  $('#apiConnectorInput').value = catalog.connectorId;
  $('#apiNameInput').value = catalog.name;
  $('#apiTypeInput').value = catalog.type || 'third_party';
  $('#apiAuthInput').value = catalog.auth || 'api_key';
  $('#apiSyncModeInput').value = ['amazon-sp-api', 'amazon-ads-api', 'erp', 'local-json'].indexOf(catalog.connectorId) >= 0 ? 'scheduled' : 'manual';
  $('#apiSyncHoursInput').value = '6';
  $('#apiMappingInput').value = JSON.stringify(Object.fromEntries((catalog.fields || []).map(function (field) { return [field, field]; })), null, 2);
  $('#apiMessage').textContent = '已载入接口模板：' + catalog.name + '。请补充 Endpoint/路径和密钥后保存。';
}

function clearApiForm() {
  state.apiEditingId = '';
  state.selectedConnectorValue = '';
  var defaults = {
    apiNameInput: '',
    apiEndpointInput: '',
    apiMappingInput: '{\n  "spend": "spend",\n  "sales": "sales",\n  "orders": "orders"\n}',
    apiCredentialsInput: '{}'
  };
  Object.keys(defaults).forEach(function (id) {
    if ($('#' + id)) $('#' + id).value = defaults[id];
  });
  if ($('#apiTypeInput')) $('#apiTypeInput').value = 'third_party';
  if ($('#apiAuthInput')) $('#apiAuthInput').value = 'api_key';
  if ($('#apiSyncModeInput')) $('#apiSyncModeInput').value = 'manual';
  if ($('#apiSyncHoursInput')) $('#apiSyncHoursInput').value = '6';
  if ($('#apiMessage')) $('#apiMessage').textContent = '已清空，可新建接口连接。';
}

function saveApiConnection() {
  var payload = {
    id: state.apiEditingId || '',
    connectorId: $('#apiConnectorInput').value || state.selectedCatalogId || 'rest-api',
    name: $('#apiNameInput').value || '',
    type: $('#apiTypeInput').value || 'third_party',
    authMethod: $('#apiAuthInput').value || 'none',
    syncMode: $('#apiSyncModeInput').value || 'manual',
    syncIntervalHours: $('#apiSyncHoursInput').value || 6,
    endpoint: $('#apiEndpointInput').value || '',
    fieldMapping: safeJson($('#apiMappingInput').value, {}),
    credentials: safeJson($('#apiCredentialsInput').value, {})
  };
  if (!payload.name) {
    $('#apiMessage').textContent = '请先填写连接名称。';
    return;
  }
  window.amazonControl.saveApiConnection(payload).then(function (saved) {
    state.apiConnections = [saved].concat(state.apiConnections.filter(function (item) { return item.id !== saved.id; }));
    state.apiEditingId = saved.id;
    state.selectedConnectorValue = saved.id;
    $('#apiMessage').textContent = '已保存：' + saved.name;
    renderContextControls();
    renderWorkspace();
  }).catch(function (error) {
    $('#apiMessage').textContent = error.message;
  });
}

function editApiConnection(id) {
  var conn = connectionById(id);
  if (!conn) return;
  state.apiEditingId = conn.id;
  renderWorkspace();
  setTimeout(function () {
    $('#apiConnectorInput').value = conn.connectorId || 'rest-api';
    $('#apiNameInput').value = conn.name || '';
    $('#apiTypeInput').value = conn.type || 'third_party';
    $('#apiAuthInput').value = conn.authMethod || 'none';
    $('#apiSyncModeInput').value = conn.syncMode || 'manual';
    $('#apiSyncHoursInput').value = conn.syncIntervalHours || 6;
    $('#apiEndpointInput').value = conn.endpoint || '';
    $('#apiMappingInput').value = JSON.stringify(conn.fieldMapping || {}, null, 2);
    $('#apiCredentialsInput').value = '{}';
    $('#apiMessage').textContent = '正在编辑：' + (conn.name || conn.id);
  }, 0);
}

function deleteApiConnection() {
  if (!state.apiEditingId) {
    $('#apiMessage').textContent = '请先选择要删除的接口。';
    return;
  }
  window.amazonControl.deleteApiConnection(state.apiEditingId).then(function () {
    state.apiConnections = state.apiConnections.filter(function (conn) { return conn.id !== state.apiEditingId; });
    state.apiEditingId = '';
    renderContextControls();
    renderWorkspace();
  }).catch(function (error) {
    $('#apiMessage').textContent = error.message;
  });
}

function saveToolFromUi() {
  var payload = {
    name: $('#toolNameInput').value || '',
    kind: $('#toolKindInput').value || 'builtin',
    module: $('#toolModuleInput').value || 'data',
    risk: $('#toolRiskInput').value || 'low',
    approvalRequired: $('#toolApprovalRequiredInput') ? $('#toolApprovalRequiredInput').checked : false,
    description: $('#toolDescriptionInput').value || ''
  };
  if (!payload.name) {
    if ($('#toolMessage')) $('#toolMessage').textContent = '请先填写工具名称。';
    return;
  }
  window.amazonControl.saveTool(payload).then(function (tool) {
    state.tools = [tool].concat((state.tools || []).filter(function (item) { return item.id !== tool.id; }));
    if ($('#toolMessage')) $('#toolMessage').textContent = '已注册工具：' + tool.name;
    renderWorkspace();
  }).catch(function (error) {
    if ($('#toolMessage')) $('#toolMessage').textContent = error.message;
  });
}

function deleteToolFromUi(toolId) {
  window.amazonControl.deleteTool(toolId).then(function () {
    state.tools = (state.tools || []).filter(function (item) { return item.id !== toolId; });
    if ($('#toolMessage')) $('#toolMessage').textContent = '已删除工具。';
    renderWorkspace();
  }).catch(function (error) {
    if ($('#toolMessage')) $('#toolMessage').textContent = error.message;
  });
}

function runToolFromUi(toolId) {
  var tool = (state.tools || DEFAULT_TOOLS).find(function (item) { return item.id === toolId; });
  var message = $('#taskMessageInput') ? $('#taskMessageInput').value : '';
  if (!message && tool) message = tool.description || '';
  window.amazonControl.runTool({ toolId: toolId, message: message }).then(function (task) {
    setCurrentResult(task);
    if ($('#toolMessage')) $('#toolMessage').textContent = '已运行：' + (task.summary || '完成');
    refreshState(false).then(function () {
      setCurrentResult(task);
      renderWorkspace();
    });
  }).catch(function (error) {
    if ($('#toolMessage')) $('#toolMessage').textContent = error.message;
  });
}

function saveListingDraftFromUi() {
  var payload = {
    title: $('#listingTitleInput') ? $('#listingTitleInput').value : '',
    sku: $('#listingSkuInput') ? $('#listingSkuInput').value : '',
    asin: $('#listingAsinInput') ? $('#listingAsinInput').value : '',
    price: $('#listingPriceInput') ? $('#listingPriceInput').value : '',
    bullets: String($('#listingBulletsInput') ? $('#listingBulletsInput').value : '').split(/\n+/).map(function (line) { return line.trim(); }).filter(Boolean),
    description: $('#listingDescriptionInput') ? $('#listingDescriptionInput').value : '',
    searchTerms: String($('#listingSearchTermsInput') ? $('#listingSearchTermsInput').value : '').split(/[,，;；]+/).map(function (item) { return item.trim(); }).filter(Boolean),
    marketplace: state.market ? state.market.code : '',
    projectId: state.selectedProjectId || '',
    status: 'draft'
  };
  if (!payload.title && !payload.sku) {
    if ($('#launchMessage')) $('#launchMessage').textContent = '请至少填写标题或 SKU。';
    return;
  }
  window.amazonControl.saveListingDraft(payload).then(function (draft) {
    state.listingDrafts = [draft].concat((state.listingDrafts || []).filter(function (item) { return item.id !== draft.id; }));
    if ($('#launchMessage')) $('#launchMessage').textContent = '已保存草稿：' + (draft.title || draft.sku || draft.id);
    renderWorkspace();
  }).catch(function (error) {
    if ($('#launchMessage')) $('#launchMessage').textContent = error.message;
  });
}

function transitionListingDraftFromUi(id, status) {
  window.amazonControl.transitionListingDraft(id, status).then(function () {
    refreshState(false).then(function () {
      if ($('#launchMessage')) $('#launchMessage').textContent = '状态已更新。';
      renderWorkspace();
    });
  }).catch(function (error) {
    if ($('#launchMessage')) $('#launchMessage').textContent = error.message;
  });
}

function exportListingDraftFromUi(id) {
  window.amazonControl.exportListingDraftCsv(id).then(function (result) {
    if ($('#launchMessage')) $('#launchMessage').textContent = '已导出：' + result.filePath;
  }).catch(function (error) {
    if ($('#launchMessage')) $('#launchMessage').textContent = error.message;
  });
}

function deleteListingDraftFromUi(id) {
  window.amazonControl.deleteListingDraft(id).then(function () {
    state.listingDrafts = (state.listingDrafts || []).filter(function (item) { return item.id !== id; });
    renderWorkspace();
  }).catch(function (error) {
    if ($('#launchMessage')) $('#launchMessage').textContent = error.message;
  });
}

function exportProjectPackageFromUi() {
  var projectId = state.selectedProjectId || '';
  if (!projectId) {
    if ($('#packageMessage')) $('#packageMessage').textContent = '请先保存并选择一个项目。';
    return;
  }
  window.amazonControl.exportProjectPackage(projectId).then(function (result) {
    if ($('#packageMessage')) $('#packageMessage').textContent = '已导出：' + result.filePath;
    refreshState(false).then(function () { renderWorkspace(); });
  }).catch(function (error) {
    if ($('#packageMessage')) $('#packageMessage').textContent = error.message;
  });
}

function importProjectPackageFromUi() {
  var filePath = $('#importPackagePathInput') ? $('#importPackagePathInput').value : '';
  if (!filePath) {
    if ($('#packageMessage')) $('#packageMessage').textContent = '请填写项目包 JSON 文件路径。';
    return;
  }
  window.amazonControl.importProjectPackage(filePath).then(function (result) {
    if ($('#packageMessage')) $('#packageMessage').textContent = '已导入项目：' + (result.project ? result.project.name : result.projectId);
    refreshState(false).then(function () { renderWorkspace(); });
  }).catch(function (error) {
    if ($('#packageMessage')) $('#packageMessage').textContent = error.message;
  });
}

function runApiAction(action, explicitId) {
  var id = explicitId || state.apiEditingId || ($('#connectorSelect') && $('#connectorSelect').value);
  if (!connectionById(id)) {
    if ($('#apiMessage')) $('#apiMessage').textContent = '请先保存或选择一个已有接口连接。';
    return;
  }
  var runner = action === 'test' ? window.amazonControl.testApiConnection(id) : window.amazonControl.syncApiConnection(id);
  runner.then(function (result) {
    var message = result.message || '操作完成。';
    return refreshState(false).then(function () {
      renderWorkspace();
      if ($('#apiMessage')) $('#apiMessage').textContent = message;
    });
  }).catch(function (error) {
    if ($('#apiMessage')) $('#apiMessage').textContent = error.message;
  });
}

function submitCodexTask() {
  var prompt = $('#codexPromptInput').value || '';
  var context = $('#codexContextInput').value || '';
  if (!prompt) {
    $('#codexResultPane').innerHTML = '<div class="error-box">请先填写修改目标。</div>';
    return;
  }
  var payload = Object.assign(payloadContext(), {
    module: 'codex',
    message: prompt + (context ? '\n\n补充上下文：\n' + context : ''),
    metrics: {}
  });
  if (!payload.marketplace) payload.marketplace = 'DE';
  window.amazonControl.submitCodexTask(payload).then(function (task) {
    setCurrentResult(task);
    state.tasks = [task].concat(state.tasks.filter(function (item) { return item.taskId !== task.taskId; }));
    var text = codexContext(task);
    $('#codexResultPane').innerHTML = '<div class="codex-result-box"><strong>可复制给 Codex 的上下文</strong><textarea rows="14" readonly>' + esc(text) + '</textarea><div class="button-row"><button id="copyCodexContextButton" class="primary-button" type="button">复制上下文</button></div></div>';
    $('#copyCodexContextButton').addEventListener('click', function () { copyText(text); });
  }).catch(function (error) {
    $('#codexResultPane').innerHTML = '<div class="error-box">' + esc(error.message) + '</div>';
  });
}

function codexContext(task) {
  return [
    '# Amazon Control 修改任务',
    '项目：' + ($('#projectNameInput').value || '未命名'),
    '站点：' + (task.marketplace || (state.market && state.market.code) || '未选择'),
    '目标：' + (task.message || ''),
    '',
    '当前产品方向：聊天优先，用户可以粘贴 ASIN、CSV、JSON、链接和 D 盘路径，程序自动导入、路由、分析并保存。',
    '必须保留：D 盘本地存储、原始数据与分析结果分离、API/IPA 资产中心、高风险动作人工审批。',
    '重点模块：智能总控聊天、接口资产中心、数据导入中心、图片生成、视频生成、自动上架草稿、复盘导出。'
  ].join('\n');
}

function selectTask(taskId) {
  var task = (state.tasks || []).find(function (item) { return item.taskId === taskId; });
  if (!task) return;
  setCurrentResult(task);
  renderWorkspace();
}

function exportCurrent(format) {
  var current = currentResultForTab(getActiveTab());
  if (!current || !current.taskId) {
    showInlineError('请先运行或选择一个任务。');
    return;
  }
  window.amazonControl.exportTask(current.taskId, format || 'json').then(function (result) {
    showInlineSuccess('已导出：' + result.filePath);
  }).catch(function (error) {
    showInlineError(error.message);
  });
}

function showInlineError(message) {
  pushDeckEvent('ALERT // ' + String(message || 'UNKNOWN ERROR'), 'alert');
  deckSignal('alert');
  var target = $('#resultPane') || $('#moduleWorkspace');
  if (target) target.innerHTML = '<div class="error-box">' + esc(message) + '</div>';
}

function showInlineSuccess(message) {
  var target = $('#resultPane') || $('#moduleWorkspace');
  if (target) target.innerHTML = '<div class="success-box">' + esc(message) + '</div>';
}

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text);
}

function refreshState(rerender) {
  if (!window.amazonControl || !window.amazonControl.getAppState) return Promise.resolve();
  return window.amazonControl.getAppState().then(function (appState) {
    MARKETPLACES = appState.marketplaces || MARKETPLACES;
    state.tasks = appState.tasks || [];
    state.apiConnections = appState.apiConnections || [];
    state.connectorCatalog = appState.connectorCatalog || appState.connectors || [];
    state.dataImports = appState.dataImports || [];
    state.projects = appState.projects || [];
    state.assets = appState.assets || [];
    state.assistantMessages = appState.assistantMessages || [];
    state.approvals = appState.approvals || [];
    state.syncJobs = appState.syncJobs || [];
    state.actionDrafts = appState.actionDrafts || [];
    state.executionQueue = appState.executionQueue || [];
    state.skills = appState.skills || [];
    state.tools = appState.tools || [];
    state.toolRuns = appState.toolRuns || [];
    state.listingDrafts = appState.listingDrafts || [];
    state.providerProfiles = appState.providerProfiles || [];
    state.providerRoutes = appState.providerRoutes || [];
    state.agents = appState.agents || [];
    state.agentFlows = appState.agentFlows || [];
    state.workflowRuns = appState.workflowRuns || [];
    state.mediaRuns = appState.mediaRuns || [];
    state.mediaOperations = appState.mediaOperations || [];
    state.generatorRuns = appState.generatorRuns || [];
    state.verificationResults = appState.verificationResults || [];
    state.usageSummary = appState.usageSummary || null;
    state.projectPackages = appState.projectPackages || [];
    state.codexStatus = appState.codexStatus || state.codexStatus;
    if (!state.currentResult && state.tasks.length) state.currentResult = state.tasks[0];
    if (appState.service && appState.service.dataDir) $('#servicePath').textContent = appState.service.dataDir;
    renderContextControls();
    if (rerender !== false) {
      renderModuleNav();
      renderWorkspace();
    }
  });
}

function persistLocalContext() {
  localStorage.setItem('amazonControl.projectName', $('#projectNameInput').value || '');
}

function bindStaticEvents() {
  $('#projectNameInput').addEventListener('input', persistLocalContext);
  $('#marketplaceSelect').addEventListener('change', function () { updateContextBar(); renderWorkspace(); });
  $('#connectorSelect').addEventListener('change', function () {
    state.selectedConnectorValue = $('#connectorSelect').value || '';
    updateContextBar();
    if (state.activeModule === 'api') renderWorkspace();
  });
  $('#dataSourceSelect').addEventListener('change', function () { updateContextBar(); });
  $('#refreshStateButton').addEventListener('click', function () { refreshState(true); });
  $('#newTaskButton').addEventListener('click', function () {
    setCurrentResult(null);
    state.missionStage = 'idle';
    pushDeckEvent('TASK // CLEARED', '');
    renderWorkspace();
  });
  $('#openAssistantButton').addEventListener('click', function () { switchModule('assistant'); });
  $('#openCodexButton').addEventListener('click', function () { switchModule('codex'); });
  $('#openExportButton').addEventListener('click', function () { switchModule('recap'); });
  document.addEventListener('click', function (event) {
    var previewButton = event.target.closest('[data-asset-preview]');
    if (previewButton) {
      openAssetPreview(previewButton.getAttribute('data-asset-preview'));
      return;
    }
    if (event.target.closest('[data-close-asset-preview]')) closeAssetPreview();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeAssetPreview();
  });
}

function renderAssetList(limit) {
  var assets = (state.assets || []).slice(0, limit || 20);
  if (!assets.length) return '<div class="empty-state">暂无素材。可以导入图片、视频、CSV、JSON、素材包或链接。</div>';
  return assets.map(function (asset) {
    var label = asset.kind || asset.sourceType || 'asset';
    var source = assetMediaSource(asset);
    return '<div class="mini-card asset-card"><label class="asset-select"><input class="assistant-asset-checkbox" type="checkbox" value="' + esc(asset.assetId) + '"> <strong>' + esc(asset.name || asset.assetId) + '</strong></label><span>' + esc(label) + ' · ' + esc(asset.marketplace || '未绑定站点') + ' · ' + esc(asset.module || '自动判断') + '</span><small>' + esc(source) + '</small><div class="mini-actions"><button data-use-asset="' + esc(asset.assetId) + '" type="button">引用到聊天</button><button data-delete-asset="' + esc(asset.assetId) + '" type="button">删除记录</button></div></div>';
  }).join('');
}

function selectedAssistantAssetIds() {
  return Array.prototype.slice.call(document.querySelectorAll('.assistant-asset-checkbox:checked')).map(function (input) {
    return input.value;
  });
}

function importAssetsFromInput() {
  var raw = ($('#assetPathInput') && $('#assetPathInput').value) || '';
  var values = raw.split(/\r?\n/).map(function (line) { return line.trim(); }).filter(Boolean);
  var links = values.filter(function (item) { return /^https?:\/\//i.test(item); });
  var filePaths = values.filter(function (item) { return !/^https?:\/\//i.test(item); });
  if (!values.length) {
    if ($('#assetImportMessage')) $('#assetImportMessage').textContent = '请先选择文件，或每行粘贴一个素材路径/链接。';
    return;
  }
  var payload = Object.assign(payloadContext(), {
    filePaths: filePaths,
    links: links,
    module: state.activeModule === 'assistant' ? 'creative' : state.activeModule,
    usage: 'asset-library',
    tags: ''
  });
  window.amazonControl.importAssets(payload).then(function (result) {
    state.assets = result.assets || (result.imported || []).concat(state.assets || []);
    var importedCount = (result.imported || []).length || 0;
    var errors = result.errors || [];
    if ($('#assetImportMessage')) {
      var message = importedCount ? '已导入素材：' + importedCount + ' 个。' : '没有导入任何素材。';
      if (errors.length) {
        message += ' 失败 ' + errors.length + ' 个，首个错误：' + (errors[0].path || '') + ' - ' + (errors[0].message || '未知错误');
      }
      $('#assetImportMessage').textContent = message;
    }
    renderWorkspace();
  }).catch(function (error) {
    if ($('#assetImportMessage')) $('#assetImportMessage').textContent = error.message;
  });
}

function chooseAssetFiles() {
  var input = document.createElement('input');
  input.type = 'file';
  input.multiple = true;
  input.addEventListener('change', function () {
    if (input.files && input.files.length) importDroppedAssetFiles(input.files, '');
  });
  input.click();
}

function chooseContentFiles(kind) {
  var persistentInput = kind ? document.querySelector('#' + kind + 'AssetFileInput') : null;
  if (persistentInput) {
    persistentInput.value = '';
    persistentInput.click();
    return;
  }
  var input = document.createElement('input');
  input.type = 'file';
  input.multiple = true;
  input.accept = kind === 'image'
    ? 'image/*,.zip,.rar,.7z'
    : kind === 'video'
      ? 'video/*,image/*,.zip,.rar,.7z'
      : '*/*';
  input.addEventListener('change', function () {
    if (!input.files || !input.files.length) return;
    var files = Array.prototype.slice.call(input.files);
    var accepted = files.filter(function (file) { return isAcceptedContentFile(file, kind); });
    if (accepted.length !== files.length) {
      setAssetImportMessage('已忽略 ' + (files.length - accepted.length) + ' 个不符合当前类型的文件。', 'error', kind);
    }
    if (accepted.length) importDroppedAssetFiles(accepted, kind);
  });
  input.click();
}

function importSelectedContentFiles(fileList, kind) {
  var files = Array.prototype.slice.call(fileList || []).filter(Boolean);
  if (!files.length) return;
  var accepted = files.filter(function (file) { return isAcceptedContentFile(file, kind); });
  if (accepted.length !== files.length) {
    setAssetImportMessage('已忽略 ' + (files.length - accepted.length) + ' 个不符合当前类型的文件。', 'error', kind);
  }
  if (accepted.length) importDroppedAssetFiles(accepted, kind);
}

function selectedMediaAssetIds() {
  return Array.prototype.slice.call(document.querySelectorAll('.media-source-checkbox:checked')).map(function (input) {
    return input.value;
  });
}

function updateMediaOperationUi() {
  var select = $('#mediaOperationSelect');
  var providerSelect = $('#mediaProviderSelect');
  if (!select) return;
  var definition = mediaOperationDef(select.value);
  Array.prototype.forEach.call(document.querySelectorAll('.media-source-checkbox'), function (input) {
    var kind = input.dataset.kind || '';
    var compatible = kind === definition.sourceKind || (definition.sourceKind === 'image' && ['jpg', 'jpeg', 'png', 'webp'].indexOf(kind) >= 0);
    input.disabled = !compatible;
    if (!compatible) input.checked = false;
    if (input.parentElement) input.parentElement.classList.toggle('disabled', !compatible);
  });
  if (providerSelect) providerSelect.innerHTML = renderMediaProviderOptions(definition.capability, providerSelect.value);
  var submit = $('#submitMediaRunButton');
  if (submit) submit.textContent = definition.label + ' · 开始';
}

function submitMediaRunFromUi() {
  var select = $('#mediaOperationSelect');
  var button = $('#submitMediaRunButton');
  if (!select) return;
  var operationId = select.value;
  var definition = mediaOperationDef(operationId);
  var assetIds = selectedMediaAssetIds();
  if (!assetIds.length) {
    if ($('#mediaStudioMessage')) $('#mediaStudioMessage').textContent = '请至少选择一个符合当前输入类型的素材。';
    return;
  }
  var engine = $('#mediaEngineSelect') ? $('#mediaEngineSelect').value : 'local';
  var ratio = $('#mediaRatioSelect') ? $('#mediaRatioSelect').value : '1:1';
  var ratioParts = ratio.split(':').map(Number);
  var targetRatioWidth = ratioParts[0] || 1;
  var targetRatioHeight = ratioParts[1] || 1;
  var width = Number($('#mediaWidthInput') ? $('#mediaWidthInput').value : 0) || (definition.targetKind === 'video' ? 1080 : 2000);
  var height = Math.round(width * targetRatioHeight / targetRatioWidth);
  var payload = {
    operationId: operationId,
    engine: engine,
    providerId: $('#mediaProviderSelect') ? $('#mediaProviderSelect').value : '',
    assetIds: assetIds,
    module: state.activeModule,
    marketplace: state.market ? state.market.code : '',
    projectId: state.selectedProjectId || '',
    agentId: 'media-producer',
    options: {
      prompt: $('#mediaPromptInput') ? $('#mediaPromptInput').value : '',
      width: width,
      height: height,
      duration: Number($('#mediaDurationInput') ? $('#mediaDurationInput').value : 6),
      ratio: ratio,
      fps: Number($('#mediaFpsInput') ? $('#mediaFpsInput').value : 1),
      maxFrames: Number($('#mediaMaxFramesInput') ? $('#mediaMaxFramesInput').value : 12),
      muted: $('#mediaMutedInput') ? $('#mediaMutedInput').checked : true
    }
  };
  if (button) button.disabled = true;
  if ($('#mediaStudioMessage')) $('#mediaStudioMessage').textContent = '正在执行 ' + definition.label + '，请稍候...';
  window.amazonControl.submitMediaRun(payload).then(function (run) {
    state.mediaRuns = [run].concat(state.mediaRuns || []);
    if ($('#mediaStudioMessage')) $('#mediaStudioMessage').textContent = '已生成 ' + (run.artifacts || []).length + ' 个真实文件。';
    return refreshState(false);
  }).then(function () {
    renderWorkspace();
  }).catch(function (error) {
    if ($('#mediaStudioMessage')) $('#mediaStudioMessage').textContent = '生成失败：' + error.message;
    if (button) button.disabled = false;
  });
}

function importContentPaths(kind) {
  var input = document.querySelector('#' + kind + 'AssetPathInput');
  var values = String(input && input.value || '').split(/\r?\n/).map(function (line) { return line.trim(); }).filter(Boolean);
  if (!values.length) {
    setAssetImportMessage('请先粘贴素材路径或链接。', 'error', kind);
    return;
  }
  var links = values.filter(function (item) { return /^https?:\/\//i.test(item); });
  var filePaths = values.filter(function (item) { return !/^https?:\/\//i.test(item); });
  var payload = Object.assign(payloadContext(), {
    filePaths: filePaths,
    links: links,
    module: state.activeModule,
    usage: kind + '-content',
    tags: ''
  });
  window.amazonControl.importAssets(payload).then(function (result) {
    state.assets = result.assets || (result.imported || []).concat(state.assets || []);
    var importedCount = (result.imported || []).length || 0;
    var errors = result.errors || [];
    var message = importedCount ? '已导入 ' + importedCount + ' 个素材。' : '没有导入素材。';
    if (errors.length) message += ' 失败 ' + errors.length + ' 个：' + (errors[0].message || '未知错误');
    renderWorkspace();
    setAssetImportMessage(message, errors.length ? 'error' : 'success', kind);
  }).catch(function (error) {
    setAssetImportMessage(error.message, 'error', kind);
  });
}

function deleteAsset(assetId) {
  if (!window.amazonControl.deleteAsset) return;
  window.amazonControl.deleteAsset(assetId).then(function () {
    state.assets = (state.assets || []).filter(function (asset) { return asset.assetId !== assetId; });
    renderWorkspace();
  }).catch(function (error) {
    showInlineError(error.message);
  });
}

function appendAssetReference(assetId) {
  var asset = (state.assets || []).find(function (item) { return item.assetId === assetId; });
  if (!asset || !$('#assistantMessageInput')) return;
  var ref = '使用素材 ' + (asset.name || asset.assetId) + ' (' + asset.assetId + ')';
  $('#assistantMessageInput').value = $('#assistantMessageInput').value ? $('#assistantMessageInput').value + '\n' + ref : ref;
}

function renderAssistantBody() {
  return '<div class="assistant-layout">' +
    renderKineticDock() +
    '<section class="module-pane assistant-main">' +
      '<div class="pane-title">聊天输入</div>' +
      '<div class="input-guide"><span>ASIN</span><span>广告 CSV</span><span>业务 JSON</span><span>本地文件路径</span><span>网页链接</span><span>图片/视频素材</span><span>上架草稿</span></div>' +
      '<div id="assistantFeed" class="chat-feed">' + renderAssistantMessages() + '</div>' +
      '<div id="assistantDropZone" class="drop-zone asset-drop-zone" data-asset-drop="true"><strong>DROP ASSETS</strong><span>拖入 CSV、JSON、图片、视频、素材包或粘贴本地路径</span></div>' +
      '<div class="asset-import-box"><label>素材路径 / 链接<textarea id="assetPathInput" rows="3" placeholder="每行一个路径或链接，例如 D:\\\\素材\\\\main.jpg 或 https://..."></textarea></label><div class="button-row"><button id="selectAssetFilesButton" class="ghost-button" type="button">选择图片/视频/文件</button><button id="importAssetsButton" class="ghost-button" type="button">导入素材库</button><label class="inline-check"><input id="useLatestAssetsInput" type="checkbox" checked> 聊天自动使用最新素材</label></div><div id="assetImportMessage" class="muted"></div></div>' +
      '<textarea id="assistantMessageInput" rows="7" placeholder="例如：用最新导入的图片生成主图，或把图片转成视频。也可以粘贴 ASIN、CSV、JSON、链接或 D:\\\\路径。"></textarea>' +
      '<div class="button-row"><button id="sendAssistantButton" class="primary-button" type="button">发送并自动分析</button><button id="clearAssistantInputButton" class="ghost-button" type="button">清空输入</button></div>' +
      '<div class="quick-prompt-row">' + ['德国站 用最新素材生成 Listing 草稿和上传表格', '美国站 粘贴广告 CSV 后诊断 ACoS、ROAS 和否词', '把最新图片转成一个短视频', '把最新视频拆成关键帧图片', '分析这些素材缺少哪些镜头和图片'].map(function (text) { return '<button class="quick-prompt" data-assistant-prompt="' + esc(text) + '" type="button">' + esc(text) + '</button>'; }).join('') + '</div>' +
    '</section>' +
    '<aside class="module-pane result-pane">' +
      '<div class="pane-title">自动结果</div>' +
      '<div id="resultPane">' + renderCurrentResult() + '</div>' +
      '<div class="pane-title spaced">素材资产库</div>' +
      '<div class="compact-list">' + renderAssetList(8) + '</div>' +
      '<div class="pane-title spaced">自动导入的数据</div>' +
      '<div class="compact-list">' + renderImportList(6) + '</div>' +
    '</aside>' +
  '</div>';
}

function initBootSequence() {
  var screen = $('#bootScreen');
  if (!screen) return;
  var log = $('#bootLog');
  var progress = Array.prototype.slice.call(screen.querySelectorAll('.boot-progress span'));
  var messages = [
    'CORE / ONLINE',
    'MARKETPLACE MATRIX / READY',
    'AGENT ROUTER / STANDBY',
    'DATA VAULT / MOUNTED',
    'COMMAND DECK / READY'
  ];
  var timers = [];
  var finished = false;

  function clearTimers() {
    timers.forEach(function (timer) { clearTimeout(timer); });
    timers = [];
  }

  function finish() {
    if (finished) return;
    finished = true;
    clearTimers();
    screen.classList.add('boot-exit');
    screen.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('booting');
    document.removeEventListener('keydown', handleKey);
    pushDeckEvent('BOOT SEQUENCE // COMPLETE', 'success');
    window.setTimeout(function () {
      if (screen.parentNode) screen.remove();
    }, 520);
  }

  function activate(index) {
    if (finished) return;
    if (log) log.textContent = messages[index];
    if (progress[index]) progress[index].classList.add('active');
  }

  function handleKey(event) {
    if (['Escape', 'Enter', ' '].indexOf(event.key) >= 0) finish();
  }

  document.body.classList.add('booting');
  document.addEventListener('keydown', handleKey);
  screen.addEventListener('click', finish);
  messages.forEach(function (_message, index) {
    timers.push(window.setTimeout(function () { activate(index); }, index * 260));
  });
  timers.push(window.setTimeout(finish, 1720));
}

function boot() {
  initBootSequence();
  initViewMode();
  initDeckCanvas();
  initAnimeMotion();
  restoreBrowserTabs();
  initBrowserShell();
  renderContextControls();
  renderModuleNav();
  renderWorkspace();
  bindStaticEvents();
  resolveBridge().then(function (bridge) {
    window.amazonControl = bridge;
    renderRuntime();
    return refreshState(true);
  }).catch(function (error) {
    renderRuntime();
    showInlineError('服务连接失败：' + error.message);
  });
}

boot();
