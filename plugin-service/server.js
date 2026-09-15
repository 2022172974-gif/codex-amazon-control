const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const v4Contracts = require('./v4-contracts');
const mediaEngine = require('./media-engine');

const DEFAULT_DATA_DIR = process.env.AMAZON_CONTROL_DATA_DIR || 'D:\\AmazonControlData\\app-store';
const DEFAULT_PORT = Number(process.env.PORT || process.env.AMAZON_CONTROL_PORT || 8787);
const LOCAL_TOKEN = process.env.AMAZON_CONTROL_TOKEN || 'amazon-control-local-v1';
const SIX_HOURS = 6 * 60 * 60 * 1000;
const MAX_ASSET_UPLOAD_BYTES = 128 * 1024 * 1024;
const MAX_JSON_BODY_BYTES = 180 * 1024 * 1024;
const LOCAL_ORIGIN_PATTERN = /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/i;

const MARKETPLACES = [
  { code: 'US', name: '美国站', marketplaceId: 'ATVPDKIKX0DER', region: 'NA', currency: 'USD', language: 'en-US', timezone: 'America/Los_Angeles', adsRegion: 'NA', spApiEndpoint: 'https://sellingpartnerapi-na.amazon.com', taxNote: '按州处理销售税；利润先保留税费提醒。', fbaNote: '北美 FBA 以尺寸段和重量估算，建议后续导入费用报告校准。' },
  { code: 'CA', name: '加拿大站', marketplaceId: 'A2EUQ1WTGCTBG2', region: 'NA', currency: 'CAD', language: 'en-CA', timezone: 'America/Vancouver', adsRegion: 'NA', spApiEndpoint: 'https://sellingpartnerapi-na.amazon.com', taxNote: '关注 GST/HST、跨境物流和本地退货成本。', fbaNote: '配送半径更分散，库存覆盖要更保守。' },
  { code: 'MX', name: '墨西哥站', marketplaceId: 'A1AM78C64UM0Y8', region: 'NA', currency: 'MXN', language: 'es-MX', timezone: 'America/Mexico_City', adsRegion: 'NA', spApiEndpoint: 'https://sellingpartnerapi-na.amazon.com', taxNote: '关注进口、增值税、本地履约和西语关键词。', fbaNote: '跨境入仓和退货周期需要额外安全边际。' },
  { code: 'UK', name: '英国站', marketplaceId: 'A1F83G8C2ARO7P', region: 'EU', currency: 'GBP', language: 'en-GB', timezone: 'Europe/London', adsRegion: 'EU', spApiEndpoint: 'https://sellingpartnerapi-eu.amazon.com', taxNote: '复核 VAT、UKCA、包装和消费者权益要求。', fbaNote: 'VAT 会明显影响含税售价和净利。' },
  { code: 'DE', name: '德国站', marketplaceId: 'A1PA6795UKMFR9', region: 'EU', currency: 'EUR', language: 'de-DE', timezone: 'Europe/Berlin', adsRegion: 'EU', spApiEndpoint: 'https://sellingpartnerapi-eu.amazon.com', taxNote: '关注 VAT、包装法、德语关键词、CE/材料合规。', fbaNote: '德国退货率和合规要求通常需要更保守的利润线。' },
  { code: 'FR', name: '法国站', marketplaceId: 'A13V1IB3VIYZZH', region: 'EU', currency: 'EUR', language: 'fr-FR', timezone: 'Europe/Paris', adsRegion: 'EU', spApiEndpoint: 'https://sellingpartnerapi-eu.amazon.com', taxNote: '关注 VAT、EPR、法语标签和本地合规。', fbaNote: '内容本地化和标签要求会影响上架节奏。' },
  { code: 'IT', name: '意大利站', marketplaceId: 'APJ6JRA9NG5V4', region: 'EU', currency: 'EUR', language: 'it-IT', timezone: 'Europe/Rome', adsRegion: 'EU', spApiEndpoint: 'https://sellingpartnerapi-eu.amazon.com', taxNote: '关注 VAT、意大利语 Listing 和本地消费者偏好。', fbaNote: '建议单独监控物流时效和退货。' },
  { code: 'ES', name: '西班牙站', marketplaceId: 'A1RKKUPIHCS9HS', region: 'EU', currency: 'EUR', language: 'es-ES', timezone: 'Europe/Madrid', adsRegion: 'EU', spApiEndpoint: 'https://sellingpartnerapi-eu.amazon.com', taxNote: '关注 VAT、西语关键词和本地配送体验。', fbaNote: '价格带敏感度较高，测款预算要控制。' },
  { code: 'JP', name: '日本站', marketplaceId: 'A1VC38T7YXB528', region: 'FE', currency: 'JPY', language: 'ja-JP', timezone: 'Asia/Tokyo', adsRegion: 'FE', spApiEndpoint: 'https://sellingpartnerapi-fe.amazon.com', taxNote: '关注日文关键词、PSE、食品接触、药机法等本地规则。', fbaNote: '尺寸、包装、说明书和评价信任度影响更大。' },
  { code: 'AU', name: '澳洲站', marketplaceId: 'A39IBJ37TRP1C6', region: 'FE', currency: 'AUD', language: 'en-AU', timezone: 'Australia/Sydney', adsRegion: 'FE', spApiEndpoint: 'https://sellingpartnerapi-fe.amazon.com', taxNote: '关注 GST、澳洲本地标准和配送时效。', fbaNote: '市场体量较小，库存策略要防止冗余。' },
  { code: 'IN', name: '印度站', marketplaceId: 'A21TJRUUN4KGV', region: 'FE', currency: 'INR', language: 'en-IN', timezone: 'Asia/Kolkata', adsRegion: 'FE', spApiEndpoint: 'https://sellingpartnerapi-fe.amazon.com', taxNote: '关注 GST、本地发票、价格带和准入要求。', fbaNote: '价格敏感度高，需要更细费用拆解。' },
  { code: 'BR', name: '巴西站', marketplaceId: 'A2Q3Y263D00KWC', region: 'NA', currency: 'BRL', language: 'pt-BR', timezone: 'America/Sao_Paulo', adsRegion: 'NA', spApiEndpoint: 'https://sellingpartnerapi-na.amazon.com', taxNote: '关注复杂税费、进口成本和本地配送。', fbaNote: '税费与履约不确定性较高，测款要更谨慎。' }
];

const MODULES = {
  assistant: { title: '智能总控聊天', shortTitle: '聊天', summary: '用自然语言、ASIN、CSV、JSON、链接和文件路径直接驱动导入、路由、分析和结果保存。' },
  profile: { title: '项目站点', shortTitle: '站点', summary: '创建项目、选择站点、绑定币种、语言、区域和数据范围。' },
  api: { title: '接口资产中心', shortTitle: 'API/IPA', summary: '管理官方 API、第三方 API、Webhook、本地文件和定时同步。' },
  ingest: { title: '数据导入中心', shortTitle: '导入', summary: '集中管理 CSV、JSON、API、手动指标、字段映射和导入历史。' },
  selection: { title: '选品验证', shortTitle: '选品', summary: '市场调研、竞品分析、机会评分、测款方案。' },
  profit: { title: '利润财务', shortTitle: '利润', summary: '净利率、ROI、盈亏平衡 ACoS、费用拆解和止损判断。' },
  listing: { title: 'Listing 优化', shortTitle: 'Listing', summary: '标题、五点、描述、A+、关键词覆盖和转化诊断。' },
  ads: { title: '广告诊断', shortTitle: '广告', summary: 'ACoS、ROAS、CTR、CVR、否词、预算和关键词分层。' },
  data: { title: '数据分析', shortTitle: '数据', summary: '销售趋势、流量转化、异常、业务报表理解。' },
  inventory: { title: '库存补货', shortTitle: '库存', summary: '库存覆盖、补货点、断货风险、冗余库存和清货建议。' },
  compliance: { title: '合规审查', shortTitle: '合规', summary: '认证、标签、Listing、IP、账户健康和申诉风险。' },
  creative: { title: '内容素材', shortTitle: '内容', summary: '主图、副图、A+、拍摄清单、图片和视频制作任务单。' },
  image: { title: '图片生成', shortTitle: '图片', summary: '图片转图片、图片转视频、尺寸处理、云端生成和真实产物管理。' },
  video: { title: '视频生成', shortTitle: '视频', summary: '视频转图片、视频转视频、剪辑转码、云端生成和真实产物管理。' },
  source: { title: '素材来源', shortTitle: '素材', summary: '竞品素材、站外渠道、红人机会和版权风险。' },
  launch: { title: '自动上架草稿', shortTitle: '上架', summary: '识别素材，生成 Listing 草稿和可上传表格，不自动提交后台。' },
  execution: { title: '执行中心', shortTitle: '执行', summary: '低风险打开页面、截图、抓取公开信息、导出和待执行清单。' },
  codex: { title: 'Codex 修改', shortTitle: 'Codex', summary: '把当前问题整理成可复制给 Codex 的修改上下文。' },
  recap: { title: '复盘导出', shortTitle: '复盘', summary: '导出任务结果、复盘报告、Listing 草稿和数据分析。' }
};

const WORKBENCH_PAGES = Object.keys(MODULES).map((id) => ({ id, module: id }));

const CONNECTOR_CATALOG = [
  { connectorId: 'amazon-sp-api', name: 'Amazon SP-API', type: 'official', auth: 'lwa_iam', dataTypes: ['订单', '库存', 'FBA 费用', '结算', '业务报告', '商品目录'], fields: ['asin', 'sku', 'orders', 'units', 'revenue', 'inventory', 'fbaFee', 'referralFee'], targetModules: ['selection', 'profit', 'data', 'inventory', 'compliance', 'launch'], setupHint: '需要 LWA、IAM、Refresh Token、Seller ID 和 Marketplace ID。' },
  { connectorId: 'amazon-ads-api', name: 'Amazon Ads API', type: 'official', auth: 'oauth', dataTypes: ['广告活动', '广告组', '关键词', '搜索词', '预算', '花费与销售额'], fields: ['campaignName', 'adGroupName', 'targeting', 'searchTerm', 'impressions', 'clicks', 'spend', 'sales', 'orders'], targetModules: ['ads', 'profit', 'data'], setupHint: '需要 OAuth、Profile ID 和广告区域。' },
  { connectorId: 'keepa', name: 'Keepa API', type: 'third_party', auth: 'api_key', dataTypes: ['价格历史', 'BSR 历史', 'Offer 数', 'Buy Box', '评论趋势'], fields: ['asin', 'price', 'bsr', 'offers', 'buyBoxPrice', 'rating', 'reviewCount'], targetModules: ['selection', 'profit', 'listing', 'source'], setupHint: '填写 Keepa API Key，按请求消耗 token。' },
  { connectorId: 'seller-tool', name: '卖家精灵/选品软件 API', type: 'third_party', auth: 'api_key', dataTypes: ['关键词', '竞品 ASIN', '搜索量', '竞争度', '类目机会'], fields: ['keyword', 'searchVolume', 'asin', 'category', 'price', 'reviews', 'rating', 'competitionScore'], targetModules: ['selection', 'listing', 'ads'], setupHint: '按第三方软件文档填写 Endpoint、Key 和字段映射。' },
  { connectorId: 'erp', name: 'ERP / 库存软件 API', type: 'third_party', auth: 'api_key_or_bearer', dataTypes: ['采购', '库存', '在途', '入仓', '头程', '结算'], fields: ['sku', 'asin', 'available', 'inbound', 'leadTimeDays', 'purchaseCost', 'storageFee'], targetModules: ['inventory', 'profit', 'data'], setupHint: '适合接入库存、采购、在途和结算数据。' },
  { connectorId: 'openai-compatible', name: 'OpenAI / AI 生成接口', type: 'ai', auth: 'api_key', dataTypes: ['图片 prompt', '视频脚本', 'Listing 文案', '运营建议'], fields: ['prompt', 'model', 'imageSize', 'duration', 'style', 'response'], targetModules: ['image', 'video', 'listing', 'codex'], setupHint: '用于图片 brief、视频 brief、Listing 和修改上下文。第一版只保存接口配置，不把密钥写入源码。' },
  { connectorId: 'rest-api', name: '通用 REST API', type: 'third_party', auth: 'api_key_or_bearer', dataTypes: ['自定义商品数据', '广告数据', '库存数据', '销售数据'], fields: ['asin', 'sku', 'sales', 'spend', 'inventory', 'sessions', 'orders'], targetModules: ['selection', 'ads', 'data', 'inventory', 'profit'], setupHint: '适配任意 HTTP 数据软件接口，通过字段映射进入模块。' },
  { connectorId: 'webhook', name: 'Webhook 接收', type: 'webhook', auth: 'shared_secret', dataTypes: ['事件推送', '报表推送', '库存变化', '广告日报'], fields: ['eventType', 'marketplace', 'asin', 'payload', 'createdAt'], targetModules: ['data', 'inventory', 'ads'], setupHint: '第一版保存配置和模拟记录，真实接收端可后续扩展。' },
  { connectorId: 'local-json', name: '本地 JSON 同步', type: 'file', auth: 'none', dataTypes: ['本地结构化报表', '软件导出数据', '模拟 API 返回'], fields: ['rows', 'asin', 'sales', 'spend', 'inventory', 'sessions'], targetModules: ['selection', 'ads', 'data', 'inventory', 'profit'], setupHint: '填写 D 盘 JSON 文件路径，可预览 rows 数量并保留原始快照。' },
  { connectorId: 'csv-xlsx', name: 'CSV/XLSX 导入', type: 'file', auth: 'none', dataTypes: ['广告搜索词报告', '业务报告', '库存报告', '结算报告'], fields: ['date', 'asin', 'sku', 'sales', 'revenue', 'sessions', 'inventory', 'spend', 'orders'], targetModules: ['ads', 'data', 'inventory', 'profit'], setupHint: '当前优先支持 CSV 文本和路径；XLSX 预留适配入口。' }
];

const DEFAULT_TOOL_REGISTRY = [
  { id: 'profit-calc', name: '利润测算', kind: 'builtin', module: 'profit', description: '按站点币种计算售价、成本、FBA、佣金后的净利率、ROI 和盈亏平衡 ACoS。', inputSchema: ['price', 'cost', 'fba', 'referral', 'units'], outputSchema: ['netMargin', 'roi', 'breakevenAcos', 'actions'], risk: 'low', approvalRequired: false, targetModules: ['profit', 'selection'] },
  { id: 'ad-diagnosis', name: '广告诊断', kind: 'builtin', module: 'ads', description: '从广告 CSV 或指标诊断 ACoS、ROAS、CTR、CVR，生成否词、预算和关键词分层建议。', inputSchema: ['spend', 'sales', 'orders', 'clicks', 'impressions', 'csvText'], outputSchema: ['acos', 'roas', 'cvr', 'actions'], risk: 'low', approvalRequired: false, targetModules: ['ads', 'profit'] },
  { id: 'inventory-plan', name: '库存补货测算', kind: 'builtin', module: 'inventory', description: '根据库存、销量和采购周期计算覆盖天数、补货点、断货与冗余风险。', inputSchema: ['inventory', 'units30d', 'leadTimeDays'], outputSchema: ['coverageDays', 'reorderPoint', 'risks', 'actions'], risk: 'low', approvalRequired: false, targetModules: ['inventory', 'data'] },
  { id: 'csv-stats', name: 'CSV/JSON 数据分析', kind: 'builtin', module: 'data', description: '汇总销量、流量、转化与异常，输出趋势和业务复盘。', inputSchema: ['csvText', 'jsonText', 'filePath'], outputSchema: ['insights', 'actions', 'rows'], risk: 'low', approvalRequired: false, targetModules: ['data', 'inventory', 'ads'] },
  { id: 'listing-draft', name: 'Listing 草稿生成', kind: 'builtin', module: 'launch', description: '识别卖点和关键词，生成标题、五点、描述和可上传表格，不自动提交后台。', inputSchema: ['message', 'keywords', 'assets'], outputSchema: ['title', 'bullets', 'description', 'table'], risk: 'high', approvalRequired: true, targetModules: ['launch', 'listing'] },
  { id: 'compliance-check', name: '合规审查', kind: 'builtin', module: 'compliance', description: '按站点输出认证、标签、Listing、IP 和账户健康风险。', inputSchema: ['message', 'marketplace'], outputSchema: ['risks', 'actions'], risk: 'medium', approvalRequired: true, targetModules: ['compliance', 'launch'] },
  { id: 'image-brief', name: '图片生成 brief', kind: 'ai', module: 'image', description: '生成主图、副图、A+ 图片的 prompt brief、尺寸规范和调用内容。', inputSchema: ['message', 'style', 'size'], outputSchema: ['prompts', 'specs'], risk: 'low', approvalRequired: false, targetModules: ['image', 'creative'] },
  { id: 'video-brief', name: '视频生成 brief', kind: 'ai', module: 'video', description: '生成短视频脚本、分镜、字幕、旁白和调用 brief。', inputSchema: ['message', 'duration', 'ratio'], outputSchema: ['script', 'scenes', 'subtitles', 'voiceover'], risk: 'low', approvalRequired: false, targetModules: ['video', 'creative'] }
];

const LISTING_DRAFT_TRANSITIONS = {
  draft: ['needs_review', 'archived'],
  needs_review: ['approved', 'draft', 'archived'],
  approved: ['locked', 'draft', 'archived'],
  locked: ['submitted', 'archived'],
  submitted: ['archived'],
  archived: []
};

const SENSITIVE_KEY_PATTERN = /(credential|password|secret|token|apiKey|apikey|authorization|access_key|client_secret|refresh_token|private_key)/i;

const ROUTES = [
  ['api', ['api', 'ipa', '接口', 'sp-api', 'ads api', 'erp', 'webhook', 'keepa', '连接器', '授权', '同步']],
  ['image', ['图片生成', 'ai图片', '主图生成', '副图生成', 'a+图片', '生图', 'prompt', '海报']],
  ['video', ['视频生成', 'ai视频', '短视频', '分镜', '脚本', '字幕', '旁白', '剪辑']],
  ['launch', ['自动上架', '上架', '上传表格', 'listing草稿', '模板表', '批量上传']],
  ['profit', ['净利', '毛利', 'roi', '利润', '盈亏', '费用', '佣金', 'fba', 'price', 'cost', 'margin', 'profit']],
  ['listing', ['listing', '标题', '五点', '描述', 'a+', '关键词覆盖', '转化优化', '文案']],
  ['ads', ['广告', 'acos', 'tacos', 'roas', '否词', '预算', '竞价', '搜索词', 'campaign', 'campaignname', 'adgroup', 'searchterm', 'impressions', 'clicks', 'cpc', 'spend']],
  ['inventory', ['库存', '补货', '断货', '冗余', '库龄', '周转', 'inventory', 'available', 'inbound', 'leadtime', 'stock']],
  ['compliance', ['合规', '风险', '审查', '认证', '申诉', '变体', '健康', '侵权', 'ip']],
  ['data', ['数据', '看板', '销量', '趋势', '流量', '转化', '预测', 'sessions', 'orders', 'units', 'revenue', 'traffic', 'cvr']],
  ['creative', ['图片', '视频', 'ps', '剪映', '做图', '剪辑', '主图', '副图', '素材包']],
  ['source', ['素材来源', '图片来源', '视频来源', '站外', '红人', '渠道', 'tiktok', 'instagram']],
  ['execution', ['浏览器', '@chrome', '打开网页', '抓取', '截图', '填表', '下载报告']],
  ['selection', ['选品', '调研', '竞品', '测款', '开发', 'asin', '关键词机会', '市场']]
];

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
}

function safeId(value) {
  return /^[A-Za-z0-9_-]+$/.test(String(value || ''));
}

function assertSafeLocalPath(filePath) {
  const value = String(filePath || '');
  if (!value || value.includes('..') || !path.isAbsolute(value)) throw new Error('invalid_local_path');
  return path.resolve(value);
}

function safeString(value) {
  return String(value ?? '').trim();
}

function number(value, fallback = 0) {
  const parsed = Number(String(value ?? '').replace(/[^\d.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function money(value, marketplace) {
  const symbols = { USD: '$', CAD: 'C$', MXN: 'MX$', GBP: '£', EUR: '€', JPY: '¥', AUD: 'A$', INR: '₹', BRL: 'R$' };
  const currency = marketplace?.currency || 'USD';
  const amount = Number(value || 0);
  return `${symbols[currency] || currency} ${currency === 'JPY' ? Math.round(amount) : amount.toFixed(2)}`;
}

function percent(value) {
  return `${(Number(value || 0) * 100).toFixed(1)}%`;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readJson(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (_error) {
    try {
      fs.copyFileSync(filePath, `${filePath}.corrupt-${Date.now()}`);
    } catch (_copyError) {
      // Keep the original fallback path if the backup copy also fails.
    }
    return fallback;
  }
}

function writeJson(filePath, value) {
  ensureDir(path.dirname(filePath));
  const tempPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(value, null, 2), 'utf8');
  fs.renameSync(tempPath, filePath);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  const source = String(text || '');
  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];
    if (char === '"' && source[i + 1] === '"' && quoted) {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === ',' && !quoted) {
      row.push(cell.trim());
      cell = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && source[i + 1] === '\n') i += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }
  if (cell || row.length) {
    row.push(cell.trim());
    if (row.some(Boolean)) rows.push(row);
  }
  return rows;
}

function rowsToObjects(rows) {
  if (!Array.isArray(rows) || rows.length < 2) return [];
  const headers = rows[0].map((header, index) => safeString(header) || `field_${index + 1}`);
  return rows.slice(1).map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ''])));
}

function normalizeRows(input = {}) {
  if (Array.isArray(input.rows)) return input.rows;
  if (Array.isArray(input.csvObjects)) return input.csvObjects;
  if (Array.isArray(input.csvRows)) return rowsToObjects(input.csvRows);
  if (input.csvText) return rowsToObjects(parseCsv(input.csvText));
  if (input.jsonText) return rowsFromJsonData(parseJsonLoose(input.jsonText));
  const filePaths = Array.isArray(input.filePaths) ? input.filePaths : (input.filePath ? [input.filePath] : []);
  const rowsFromFiles = [];
  for (const filePath of filePaths) {
    if (!filePath) continue;
    try {
      const safePath = assertSafeLocalPath(filePath);
      if (!fs.existsSync(safePath) || fs.statSync(safePath).isDirectory()) continue;
      const text = fs.readFileSync(safePath, 'utf8');
      const parsed = String(safePath).toLowerCase().endsWith('.json')
        ? rowsFromJsonData(parseJsonLoose(text))
        : rowsToObjects(parseCsv(text));
      rowsFromFiles.push(...parsed);
    } catch (_error) {
      // Ignore unreadable files and continue with whatever else is available.
    }
  }
  if (rowsFromFiles.length) return rowsFromFiles;
  return [];
}

function rowValue(row, names, fallback = 0) {
  const found = Object.entries(row || {}).find(([key]) => names.some((name) => key.toLowerCase().replace(/\s+/g, '').includes(name)));
  return found ? number(found[1], fallback) : fallback;
}

function sumRows(rows, names) {
  return rows.reduce((total, row) => total + rowValue(row, names, 0), 0);
}

function avgRows(rows, names) {
  if (!rows.length) return 0;
  return sumRows(rows, names) / rows.length;
}

function marketplaceByCode(code) {
  const value = safeString(code).toUpperCase();
  return MARKETPLACES.find((item) => item.code === value || item.marketplaceId === value) || null;
}

function marketplaceFromPayload(payload = {}) {
  return marketplaceByCode(payload.marketplace || payload.marketplaceCode || payload.marketplaceId);
}

function detectMarketplaceInText(text = '') {
  const source = ` ${String(text).toLowerCase()} `;
  const aliases = [
    ['US', ['美国', '美站', 'us', 'usa', 'america']],
    ['CA', ['加拿大', '加站', 'ca', 'canada']],
    ['MX', ['墨西哥', 'mx', 'mexico']],
    ['UK', ['英国', '英站', 'uk', 'gb']],
    ['DE', ['德国', '德站', 'de', 'germany']],
    ['FR', ['法国', '法站', 'fr', 'france']],
    ['IT', ['意大利', '意站', 'it', 'italy']],
    ['ES', ['西班牙', '西站', 'es', 'spain']],
    ['JP', ['日本', '日站', 'jp', 'japan']],
    ['AU', ['澳洲', '澳大利亚', 'au', 'australia']],
    ['IN', ['印度', '印度站', 'india']],
    ['BR', ['巴西', '巴西站', 'brazil']]
  ];
  for (const [code, words] of aliases) {
    if (words.some((word) => /[a-z]/.test(word) ? new RegExp(`\\b${word}\\b`, 'i').test(source) : source.includes(word))) return code;
  }
  return '';
}

function extractAsin(text = '') {
  const match = String(text).match(/\bB0[A-Z0-9]{8}\b/i);
  return match ? match[0].toUpperCase() : '';
}

function extractKeyword(text = '') {
  const textValue = String(text || '');
  const patterns = [
    /关键词[:：]\s*([^\n,，;；]+)/i,
    /keyword[:：]\s*([^\n,，;；]+)/i,
    /分析\s+([a-zA-Z0-9\u4e00-\u9fa5\s-]{2,40})\s*(?:关键词|市场|机会)?/
  ];
  for (const pattern of patterns) {
    const match = textValue.match(pattern);
    if (match) return match[1].trim();
  }
  return '';
}

function stripPathSurrounding(value) {
  return String(value || '')
    .trim()
    .replace(/^["'“”‘’`]+/, '')
    .replace(/["'“”‘’`]+$/, '')
    .trim();
}

function stripPathTailNoise(value) {
  return String(value || '')
    .replace(/[，。、；：！？；,;:!?…)）】》」』]+$/g, '')
    .trim();
}

function resolveExistingPath(rawValue) {
  const original = stripPathSurrounding(rawValue);
  const candidates = [original, stripPathTailNoise(original)];
  if (original.includes(' ')) {
    const segments = original.split(/\s+/).filter(Boolean);
    for (let index = segments.length - 1; index > 0; index -= 1) {
      candidates.push(stripPathTailNoise(segments.slice(0, index).join(' ')));
    }
  }
  candidates.push(stripPathTailNoise(original.split(/[，。、；！？;,!?…]/)[0]));
  for (const candidate of candidates) {
    const clean = stripPathSurrounding(candidate);
    if (clean && fs.existsSync(clean)) return clean;
  }
  return stripPathSurrounding(stripPathTailNoise(original));
}

function stripLinkTail(value) {
  return String(value || '')
    .replace(/[)\]}》】」』，。、；：！？;,:!?…"'“”‘’\s]+$/g, '')
    .replace(/\.+$/g, '')
    .trim();
}

function extractLinksAndPaths(text = '') {
  const value = String(text || '');
  const links = [];
  const paths = [];
  const linkPattern = /https?:\/\/[^\s<>"'“”‘’]+/gi;
  const pathPattern = /(?:[A-Za-z]:[\\/]|\\\\)[^\r\n<>|"'“”‘’]+/gi;
  for (const match of value.matchAll(linkPattern) || []) {
    const cleaned = stripLinkTail(match[0]);
    if (cleaned && !links.includes(cleaned)) links.push(cleaned);
  }
  for (const match of value.matchAll(pathPattern) || []) {
    const resolved = resolveExistingPath(match[0]);
    if (resolved && !paths.includes(resolved)) paths.push(resolved);
  }
  return { links, paths };
}

function mediaKind(filePath = '') {
  const ext = path.extname(String(filePath)).toLowerCase();
  if (['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp', '.tif', '.tiff', '.avif'].includes(ext)) return 'image';
  if (['.mp4', '.mov', '.avi', '.mkv', '.webm', '.m4v'].includes(ext)) return 'video';
  if (ext === '.csv') return 'csv';
  if (ext === '.json') return 'json';
  if (['.zip', '.rar', '.7z'].includes(ext)) return 'archive';
  return 'file';
}

function mediaContentType(filePath = '') {
  const types = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.bmp': 'image/bmp',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.mov': 'video/quicktime',
    '.webm': 'video/webm',
    '.m4v': 'video/x-m4v',
    '.csv': 'text/csv; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8'
  };
  return types[path.extname(String(filePath)).toLowerCase()] || 'application/octet-stream';
}

function assetSummary(asset = {}) {
  const labels = { image: 'Image asset', video: 'Video asset', csv: 'CSV data', json: 'JSON data', archive: 'Asset package', link: 'Link', file: 'File' };
  return `${labels[asset.kind] || 'Asset'}: ${asset.name || asset.assetId}`;
}

function detectCsvBlock(text = '') {
  const lines = String(text || '').split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const commaLines = lines.filter((line) => line.includes(','));
  if (commaLines.length < 2) return '';
  const start = lines.findIndex((line) => line.includes(','));
  return lines.slice(start).join('\n');
}

function parseJsonLoose(text = '') {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (_error) {
    const match = String(text).match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (!match) return null;
    try { return JSON.parse(match[1]); } catch (__error) { return null; }
  }
}

function rowsFromJsonData(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.rows)) return data.rows;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.records)) return data.records;
  if (typeof data === 'object') return [data];
  return [];
}

function authHeaders(connection = {}) {
  const credentials = connection.credentials || {};
  const token = credentials.bearerToken || credentials.accessToken || credentials.token || credentials.apiKey || credentials.api_key;
  const result = {};
  if (token && connection.authMethod !== 'oauth') result.Authorization = `Bearer ${token}`;
  if (connection.authMethod === 'basic' && credentials.username) {
    result.Authorization = `Basic ${Buffer.from(`${credentials.username}:${credentials.password || ''}`).toString('base64')}`;
  }
  return result;
}

function applyFieldMapping(row, mapping) {
  const target = {};
  for (const [targetKey, sourceKey] of Object.entries(mapping || {})) {
    if (!sourceKey) continue;
    if (typeof sourceKey === 'string' && Object.prototype.hasOwnProperty.call(row, sourceKey)) target[targetKey] = row[sourceKey];
    else if (typeof sourceKey === 'object' && sourceKey !== null) target[targetKey] = sourceKey;
    else target[targetKey] = '';
  }
  return Object.keys(target).length ? target : row;
}

function extractMetricsFromText(text = '') {
  const source = String(text || '');
  const pairs = {};
  const patterns = {
    price: /(售价|价格|price)\s*[:：]?\s*([\d.]+)/i,
    cost: /(成本|采购|cost|cogs)\s*[:：]?\s*([\d.]+)/i,
    fbaFee: /(fba|配送费|fba费)\s*[:：]?\s*([\d.]+)/i,
    referralFee: /(佣金|referral)\s*[:：]?\s*([\d.]+)/i,
    spend: /(花费|spend|cost)\s*[:：]?\s*([\d.]+)/i,
    sales: /(广告销售额|销售额|sales|revenue)\s*[:：]?\s*([\d.]+)/i,
    orders: /(订单|orders)\s*[:：]?\s*([\d.]+)/i,
    clicks: /(点击|clicks)\s*[:：]?\s*([\d.]+)/i,
    impressions: /(曝光|impressions)\s*[:：]?\s*([\d.]+)/i,
    inventory: /(库存|available|inventory|stock)\s*[:：]?\s*([\d.]+)/i,
    units30d: /(30天销量|月销量|units30d|units)\s*[:：]?\s*([\d.]+)/i,
    leadTimeDays: /(采购周期|补货周期|leadtime)\s*[:：]?\s*([\d.]+)/i
  };
  for (const [key, pattern] of Object.entries(patterns)) {
    const match = source.match(pattern);
    if (match) pairs[key] = number(match[2], 0);
  }
  return pairs;
}

function routeModule(payload = {}) {
  if (payload.module && payload.module !== 'auto' && payload.module !== 'assistant') return payload.module;
  const rows = normalizeRows(payload);
  const headers = rows[0] ? Object.keys(rows[0]).join(' ') : '';
  const rawText = `${payload.message || ''} ${payload.keyword || ''} ${payload.asin || ''} ${headers}`;
  const text = rawText.toLowerCase();
  const metrics = { ...(payload.metrics || {}), ...extractMetricsFromText(payload.message || '') };
  const hasAny = (words) => words.some((word) => rawText.includes(word) || text.includes(String(word).toLowerCase()));
  if ((metrics.inventory || metrics.units30d || metrics.leadTimeDays || hasAny(['inventory', 'stock', 'available', 'leadtime'])) && hasAny(['库存', '补货', '断货', '覆盖', '采购周期', 'inventory', 'stock', 'leadtime'])) return 'inventory';
  if (hasAny(['自动上架', '上传表格', '批量上传', '上架草稿', 'launch', 'upload table', 'listing draft'])) return 'launch';
  if (hasAny(['视频', '短视频', '分镜', '旁白', '字幕', 'video', 'storyboard', 'voiceover', 'script'])) return 'video';
  if (hasAny(['图片生成', '主图', '副图', '生图', 'image', 'picture', 'photo', 'prompt'])) return 'image';
  const found = ROUTES.find(([, words]) => words.some((word) => text.includes(word.toLowerCase())));
  return found ? found[0] : 'selection';
}

function inferMediaOperation(message, moduleKey, assets = []) {
  const text = String(message || '').toLowerCase();
  const imageAssets = assets.filter((asset) => asset.localPath || asset.originalPath).filter((asset) => mediaKind(asset.localPath || asset.originalPath) === 'image');
  const videoAssets = assets.filter((asset) => asset.localPath || asset.originalPath).filter((asset) => mediaKind(asset.localPath || asset.originalPath) === 'video');
  if (/视频转图片|视频变图片|拆帧|关键帧|视频截图/.test(text) && videoAssets.length) return 'video_to_images';
  if (/图片转视频|图片变视频|图生视频|照片变视频|用图片生成视频/.test(text) && imageAssets.length) return 'image_to_video';
  if (/视频转视频|重新剪辑|转码|改比例|改尺寸/.test(text) && videoAssets.length) return 'video_to_video';
  if (moduleKey === 'video' && videoAssets.length) return 'video_to_video';
  if (moduleKey === 'video' && imageAssets.length) return 'image_to_video';
  if (moduleKey === 'image' && videoAssets.length) return 'video_to_images';
  if (moduleKey === 'image' && imageAssets.length) return 'image_to_image';
  return '';
}

function createTaskService(options = {}) {
  const dataDir = options.dataDir || DEFAULT_DATA_DIR;
  const dirs = {
    root: dataDir,
    results: path.join(dataDir, 'results'),
    exports: path.join(dataDir, 'exports'),
    raw: path.join(dataDir, 'raw'),
    derived: path.join(dataDir, 'derived'),
    assets: path.join(dataDir, 'assets'),
    assetFiles: path.join(dataDir, 'assets', 'files'),
    generatedMedia: path.join(dataDir, 'assets', 'files', 'generated'),
    projectPackages: path.join(dataDir, 'project-packages')
  };
  const files = {
    tasks: path.join(dataDir, 'tasks.json'),
    settings: path.join(dataDir, 'settings.json'),
    marketplaces: path.join(dataDir, 'marketplaces.json'),
    connectors: path.join(dataDir, 'connectors.json'),
    apiConnections: path.join(dataDir, 'api-connections.json'),
    dataImports: path.join(dataDir, 'data-imports.json'),
    assets: path.join(dataDir, 'assets.json'),
    assistantMessages: path.join(dataDir, 'assistant-messages.json'),
    projects: path.join(dataDir, 'projects.json'),
    approvals: path.join(dataDir, 'approvals.json'),
    actionDrafts: path.join(dataDir, 'action-drafts.json'),
    executionQueue: path.join(dataDir, 'execution-queue.json'),
    syncJobs: path.join(dataDir, 'sync-jobs.json'),
    skills: path.join(dataDir, 'skills.json'),
    toolRegistry: path.join(dataDir, 'tool-registry.json'),
    toolRuns: path.join(dataDir, 'tool-runs.json'),
    listingDrafts: path.join(dataDir, 'listing-drafts.json'),
    providerProfiles: path.join(dataDir, 'provider-profiles.json'),
    providerRoutes: path.join(dataDir, 'provider-routes.json'),
    credentialVault: path.join(dataDir, 'credential-vault.json'),
    agents: path.join(dataDir, 'agents.json'),
    agentFlows: path.join(dataDir, 'agent-flows.json'),
    workflowRuns: path.join(dataDir, 'workflow-runs.json'),
    mediaRuns: path.join(dataDir, 'media-runs.json'),
    generatorRuns: path.join(dataDir, 'generator-runs.json'),
    verificationResults: path.join(dataDir, 'verification-results.json'),
    usageLedger: path.join(dataDir, 'usage-ledger.json'),
    activity: path.join(dataDir, 'activity.log.json')
  };
  let server = null;
  let syncTimer = null;
  const sessionProviderSecrets = new Map();
  const mediaAbortControllers = new Map();

  function ensureStore() {
    Object.values(dirs).forEach(ensureDir);
    const defaults = {
      [files.tasks]: [],
      [files.settings]: { dataDir, syncIntervalHours: 6, createdAt: new Date().toISOString() },
      [files.marketplaces]: MARKETPLACES,
      [files.connectors]: CONNECTOR_CATALOG.map((item) => ({ id: item.connectorId, status: item.type === 'official' ? 'not_configured' : 'available', ...item })),
      [files.apiConnections]: [],
      [files.dataImports]: [],
      [files.assets]: [],
      [files.assistantMessages]: [],
      [files.projects]: [],
      [files.approvals]: [],
      [files.actionDrafts]: [],
      [files.executionQueue]: [],
      [files.syncJobs]: [],
      [files.skills]: [],
      [files.toolRegistry]: DEFAULT_TOOL_REGISTRY,
      [files.toolRuns]: [],
      [files.listingDrafts]: [],
      [files.providerProfiles]: [],
      [files.providerRoutes]: v4Contracts.createDefaultProviderRoutes(),
      [files.credentialVault]: { version: 1, entries: {}, updatedAt: new Date().toISOString() },
      [files.agents]: v4Contracts.DEFAULT_AGENTS,
      [files.agentFlows]: v4Contracts.DEFAULT_AGENT_FLOWS,
      [files.workflowRuns]: [],
      [files.mediaRuns]: [],
      [files.generatorRuns]: [],
      [files.verificationResults]: [],
      [files.usageLedger]: [],
      [files.activity]: []
    };
    for (const [filePath, value] of Object.entries(defaults)) {
      if (!fs.existsSync(filePath)) writeJson(filePath, value);
    }
    if (!readJson(files.providerProfiles, []).length && readJson(files.apiConnections, []).length) {
      migrateLegacyProviders();
    }
  }

  function logActivity(entry) {
    const current = readJson(files.activity, []);
    writeJson(files.activity, [{ ...entry, createdAt: new Date().toISOString() }, ...current].slice(0, 2000));
  }

  function listTasks() {
    return readJson(files.tasks, []);
  }

  function getTask(taskId) {
    return listTasks().find((task) => task.taskId === taskId) || null;
  }

  function saveTask(task) {
    const tasks = listTasks();
    writeJson(files.tasks, [task, ...tasks.filter((item) => item.taskId !== task.taskId)].slice(0, 1000));
    writeJson(path.join(dirs.results, `${task.taskId}.json`), task);
    logActivity({ type: 'task.saved', taskId: task.taskId, module: task.resolvedModule, status: task.status });
    return task;
  }

  function analysisFor(moduleKey, payload, rows, marketplace) {
    const metrics = { ...(payload.metrics || {}), ...extractMetricsFromText(payload.message || '') };
    const asin = payload.asin || extractAsin(payload.message || '');
    const keyword = payload.keyword || extractKeyword(payload.message || '');
    const text = safeString(payload.message);
    const assets = Array.isArray(payload.assets) ? payload.assets : [];
    const assetText = assets.length ? assets.map(assetSummary).join('；') : '';
    const ctx = `${marketplace.name} / ${marketplace.currency} / ${marketplace.language}`;

    if (moduleKey === 'ads') {
      const spend = rows.length ? sumRows(rows, ['spend', 'cost', '花费']) : number(metrics.spend);
      const sales = rows.length ? sumRows(rows, ['sales', 'revenue', '销售额']) : number(metrics.sales);
      const orders = rows.length ? sumRows(rows, ['orders', 'purchases', '订单']) : number(metrics.orders);
      const clicks = rows.length ? sumRows(rows, ['clicks', '点击']) : number(metrics.clicks);
      const impressions = rows.length ? sumRows(rows, ['impressions', '曝光']) : number(metrics.impressions);
      const acos = sales > 0 ? spend / sales : 0;
      const roas = spend > 0 ? sales / spend : 0;
      const cvr = clicks > 0 ? orders / clicks : 0;
      return {
        summary: `${ctx} 广告诊断完成：ACoS ${percent(acos)}，ROAS ${roas.toFixed(2)}，CVR ${percent(cvr)}。`,
        insights: [
          { label: '花费', value: money(spend, marketplace) },
          { label: '广告销售额', value: money(sales, marketplace) },
          { label: '订单', value: String(orders || '缺失') },
          { label: '点击/曝光', value: `${clicks || '缺失'} / ${impressions || '缺失'}` },
          { label: '站点上下文', value: `${marketplace.adsRegion} 广告区域，${marketplace.language} 关键词语境` }
        ],
        actions: [
          { priority: acos > 0.45 ? 'P0' : 'P1', text: acos > 0.45 ? '先暂停或降价高花费低转化词，避免预算继续失血。' : '把预算优先转移到有订单且 ACoS 可控的词。' },
          { priority: 'P1', text: '搜索词按“成交词 / 观察词 / 否词候选”分层，并保留人工审批后再改后台。' },
          { priority: 'P2', text: '补齐 CTR、CVR、CPC 后可以生成更细的竞价调整表。' }
        ],
        risks: sales <= 0 && spend > 0 ? ['有广告花费但没有销售额，建议先检查 Listing 转化和关键词相关性。'] : [],
        artifacts: [{ type: 'ads-action-plan', name: '广告诊断动作清单', data: { spend, sales, orders, clicks, impressions, acos, roas, cvr, rows: rows.slice(0, 20) } }]
      };
    }

    if (moduleKey === 'data') {
      const units = rows.length ? sumRows(rows, ['units', 'unitsSold', '销量']) : number(metrics.units30d);
      const revenue = rows.length ? sumRows(rows, ['revenue', 'sales', '销售额']) : number(metrics.revenue || metrics.sales);
      const sessions = rows.length ? sumRows(rows, ['sessions', 'traffic', '流量']) : number(metrics.sessions);
      const orders = rows.length ? sumRows(rows, ['orders', '订单']) : number(metrics.orders);
      const cvr = sessions > 0 ? orders / sessions : 0;
      return {
        summary: `${ctx} 数据分析完成：识别到 ${rows.length || '手动'} 条数据，销量 ${units || '缺失'}，销售额 ${money(revenue, marketplace)}。`,
        insights: [
          { label: '销量', value: String(units || '缺失') },
          { label: '销售额', value: money(revenue, marketplace) },
          { label: '流量/订单', value: `${sessions || '缺失'} / ${orders || '缺失'}` },
          { label: '转化率', value: sessions > 0 ? percent(cvr) : '缺少 sessions 无法计算' }
        ],
        actions: [
          { priority: 'P1', text: '把广告、库存和业务报告放进同一项目，下一步做“销量变化原因”联动解释。' },
          { priority: cvr && cvr < 0.08 ? 'P1' : 'P2', text: cvr && cvr < 0.08 ? '转化偏低，优先检查主图、价格、评价和优惠券。' : '保留本周数据作为复盘基线，持续比较环比趋势。' }
        ],
        risks: rows.length < 3 ? ['数据样本偏少，趋势判断只能作为初步参考。'] : [],
        artifacts: [{ type: 'business-review', name: '数据分析摘要', data: { units, revenue, sessions, orders, cvr, rows: rows.slice(0, 20) } }]
      };
    }

    if (moduleKey === 'inventory') {
      const inventory = rows.length ? sumRows(rows, ['inventory', 'available', '库存', 'stock']) : number(metrics.inventory);
      const units30d = rows.length ? sumRows(rows, ['units', 'unitsSold', '销量']) : number(metrics.units30d);
      const leadTimeDays = number(metrics.leadTimeDays, 35);
      const daily = units30d > 0 ? units30d / 30 : 0;
      const coverDays = daily > 0 ? inventory / daily : 0;
      const reorderPoint = Math.ceil(daily * (leadTimeDays + 10));
      return {
        summary: `${ctx} 库存补货判断完成：库存覆盖约 ${coverDays ? coverDays.toFixed(1) : '未知'} 天，建议补货点 ${reorderPoint || '待补数据'} 件。`,
        insights: [
          { label: '可售库存', value: String(inventory || '缺失') },
          { label: '30 天销量', value: String(units30d || '缺失') },
          { label: '采购周期', value: `${leadTimeDays} 天` },
          { label: '覆盖天数', value: coverDays ? `${coverDays.toFixed(1)} 天` : '缺少销量或库存' }
        ],
        actions: [
          { priority: coverDays && coverDays < leadTimeDays + 10 ? 'P0' : 'P1', text: coverDays && coverDays < leadTimeDays + 10 ? '进入人工审批补货清单，避免断货。' : '继续观察销售速度，按安全库存线复核下一次补货。' },
          { priority: 'P2', text: '导入在途、库龄和仓储费后，可以判断冗余库存与清货优先级。' }
        ],
        risks: coverDays && coverDays < 20 ? ['库存覆盖偏低，存在断货风险。'] : [],
        artifacts: [{ type: 'replenishment-plan', name: '补货建议表', data: { inventory, units30d, daily, coverDays, reorderPoint, leadTimeDays } }]
      };
    }

    if (moduleKey === 'profit' || moduleKey === 'selection') {
      const price = number(metrics.price || payload.price, 0);
      const cost = number(metrics.cost || payload.cost, 0);
      const fbaFee = number(metrics.fbaFee || payload.fbaFee, 0);
      const referralFee = number(metrics.referralFee || (price ? price * 0.15 : 0), 0);
      const profit = price - cost - fbaFee - referralFee;
      const margin = price > 0 ? profit / price : 0;
      const roi = cost > 0 ? profit / cost : 0;
      const decision = price && margin < 0.18 ? 'Test First / Rework Offer' : price ? 'Go / Test First' : '需要补齐售价和成本';
      return {
        summary: moduleKey === 'selection'
          ? `${ctx} 选品验证完成：${asin || keyword || '当前产品'} 初步建议 ${decision}。`
          : `${ctx} 利润测算完成：预估净利 ${money(profit, marketplace)}，净利率 ${price ? percent(margin) : '缺失'}。`,
        insights: [
          { label: 'ASIN/关键词', value: asin || keyword || '未提供' },
          { label: '售价', value: price ? money(price, marketplace) : '缺失' },
          { label: '成本/FBA/佣金', value: `${money(cost, marketplace)} / ${money(fbaFee, marketplace)} / ${money(referralFee, marketplace)}` },
          { label: '净利率 / ROI', value: price ? `${percent(margin)} / ${percent(roi)}` : '需补售价成本' },
          { label: '站点提醒', value: `${marketplace.taxNote} ${marketplace.fbaNote}` }
        ],
        actions: [
          { priority: price ? 'P1' : 'P0', text: price ? '补充竞品价格、评论数、BSR 和广告预估 CPC，形成 Go / No-Go 决策。' : '先补齐售价、采购成本、FBA 费，才能判断利润红线。' },
          { priority: 'P1', text: '如果要测款，先生成最小预算、关键词包、Listing 草稿和合规清单。' }
        ],
        risks: margin && margin < 0.18 ? ['净利率偏低，广告、退货或税费波动可能迅速吞掉利润。'] : [],
        artifacts: [{ type: moduleKey === 'selection' ? 'selection-brief' : 'profit-model', name: moduleKey === 'selection' ? '选品机会摘要' : '利润测算表', data: { asin, keyword, price, cost, fbaFee, referralFee, profit, margin, roi, decision } }]
      };
    }

    if (moduleKey === 'listing' || moduleKey === 'launch') {
      const coreKeyword = keyword || asin || '目标关键词';
      const title = `${coreKeyword} - 本地化高转化 Amazon Listing 标题草稿`;
      const row = {
        item_sku: payload.sku || '',
        external_product_id: asin || '',
        item_name: title,
        bullet_point1: '突出核心使用场景和用户痛点',
        bullet_point2: '强调材质、尺寸、兼容性或套装价值',
        bullet_point3: '说明安装/使用便利性和售后承诺',
        product_description: `面向 ${marketplace.name} 的本地化描述草稿，需要人工复核合规词和真实参数。`,
        generic_keywords: coreKeyword
      };
      return {
        summary: `${ctx} ${moduleKey === 'launch' ? '上架草稿' : 'Listing 优化'}已生成：只输出可上传草稿，不自动提交亚马逊后台。`,
        insights: [
          { label: '核心对象', value: coreKeyword },
          { label: '语言', value: marketplace.language },
          { label: '已引用素材', value: assetText || '未选择素材，按文字和数据生成草稿' },
          { label: '人工确认', value: '标题、五点、图片、合规词和类目必须人工复核' }
        ],
        actions: [
          { priority: 'P1', text: '把产品参数、卖点、竞品差评和关键词一起补进来，可生成更完整版本。' },
          { priority: 'P0', text: '上架前进入合规审查，不自动提交后台。' }
        ],
        risks: ['Listing 和上架表格是草稿，不能替代类目模板与合规人工复核。'],
        artifacts: [
          { type: 'listing-draft', name: 'Listing 草稿', data: { ...row, usedAssets: assets } },
          { type: 'upload-table', name: '亚马逊上传表格草稿', data: { columns: Object.keys(row), row } }
        ]
      };
    }

    if (moduleKey === 'image') {
      const parameters = payload.parameters || {};
      const imageSize = safeString(parameters.imageSize) || '2000x2000';
      const imageRatio = safeString(parameters.imageRatio) || '16:10';
      return {
        summary: `${ctx} 图片生成 brief 已完成：可复制到 OpenAI/AI 图片接口或交给设计师执行。`,
        insights: [
          { label: '素材来源', value: assetText || extractLinksAndPaths(text).links.concat(extractLinksAndPaths(text).paths).join(' / ') || '未提供，按文字生成' },
          { label: '尺寸建议', value: `${imageSize}，画面比例 ${imageRatio}` },
          { label: '风格', value: '真实电商摄影，干净背景，突出使用场景和差异化卖点' }
        ],
        actions: [
          { priority: 'P1', text: '先生成主图合规版，再生成场景图、尺寸图、对比图和 A+ 模块图。' },
          { priority: 'P2', text: '如果接入 OpenAI/AI 生成接口，可把 brief 直接作为 prompt 请求体。' }
        ],
        risks: ['主图不得加入违规文字、夸张功效或非真实配件。'],
        artifacts: [{ type: 'image-brief', name: '图片生成调用 Brief', data: { prompt: `为 ${marketplace.name} Amazon 商品生成电商图片，尺寸 ${imageSize}，比例 ${imageRatio}：${text || '突出核心卖点、场景和包装'}。参考素材：${assetText || '无'}。风格真实、清晰、高转化，避免侵权和夸大承诺。`, imageSize, imageRatio, sizes: [imageSize, '1464x600', '970x600'], usedAssets: assets } }]
      };
    }

    if (moduleKey === 'video') {
      const parameters = payload.parameters || {};
      const videoDuration = safeString(parameters.videoDuration) || '15-30s';
      const videoRatio = safeString(parameters.videoRatio) || 'vertical';
      return {
        summary: `${ctx} 视频生成 brief 已完成：包含短视频脚本、分镜、字幕和旁白方向。`,
        insights: [
          { label: '视频结构', value: `${videoDuration}，${videoRatio === 'wide' ? '16:9 横屏' : '9:16 竖屏'}` },
          { label: '语言', value: marketplace.language },
          { label: '已引用素材', value: assetText || '未选择素材，先生成通用脚本和缺失镜头清单' },
          { label: '输出', value: '适合给剪映、AI 视频工具或拍摄团队使用' }
        ],
        actions: [
          { priority: 'P1', text: '补充产品真实素材、用户痛点和竞品缺点后，可生成更强分镜。' },
          { priority: 'P2', text: '接入视频生成 API 后，可将分镜表转成外部模型调用 brief。' }
        ],
        risks: ['视频脚本必须避免无法证明的功效、医疗化表达和侵权素材。'],
        artifacts: [{ type: 'video-brief', name: '视频脚本与分镜', data: { duration: videoDuration, ratio: videoRatio, scenes: ['痛点开场', '产品解决方案', '细节特写', '使用前后对比', '购买理由'], voiceover: `面向 ${marketplace.name} 用户，用本地化语言说明产品解决的问题。`, sourceText: text, usedAssets: assets } }]
      };
    }

    if (moduleKey === 'api') {
      return {
        summary: `${ctx} 接口需求已记录：可在接口资产中心配置官方 API、第三方 API、Webhook 或本地 JSON。`,
        insights: CONNECTOR_CATALOG.slice(0, 6).map((item) => ({ label: item.name, value: `${item.dataTypes.join('、')}；字段：${item.fields.join(', ')}` })),
        actions: [
          { priority: 'P1', text: '先保存连接器资产，再测试连接；未授权时仍可用 CSV/JSON 继续分析。' },
          { priority: 'P1', text: '定时同步默认 6 小时一次，原始数据和分析结果分开保存。' }
        ],
        risks: ['密钥只应保存在本地配置，不要写入源码或聊天内容。'],
        artifacts: [{ type: 'connector-plan', name: '接口接入方案', data: CONNECTOR_CATALOG }]
      };
    }

    if (moduleKey === 'compliance') {
      return {
        summary: `${ctx} 合规审查完成：已输出认证、标签、Listing、IP 和账户健康风险清单。`,
        insights: [
          { label: '站点规则', value: marketplace.taxNote },
          { label: '审查对象', value: asin || keyword || text.slice(0, 60) || '未提供' },
          { label: '执行边界', value: '只生成清单和申诉指引，不自动提交后台' }
        ],
        actions: [
          { priority: 'P0', text: '上架或改 Listing 前先补齐认证、标签、类目准入和禁用词检查。' },
          { priority: 'P1', text: '如涉及品牌词、外观专利或竞品素材，先进入 IP 风险复核。' }
        ],
        risks: ['合规结论是规则提示，不能替代当地法规或平台最终审核。'],
        artifacts: [{ type: 'compliance-checklist', name: '合规清单', data: { marketplace, item: asin || keyword || text } }]
      };
    }

    return {
      summary: `${ctx} ${MODULES[moduleKey]?.title || moduleKey} 已生成初步结果。`,
      insights: [
        { label: '输入', value: text || asin || keyword || '未提供' },
        { label: '站点', value: ctx },
        { label: '数据行数', value: String(rows.length) }
      ],
      actions: [
        { priority: 'P1', text: '继续通过聊天补充 ASIN、链接、CSV、JSON 或 D 盘文件路径，系统会自动导入并重算。' },
        { priority: 'P2', text: '如要执行高风险动作，会先进入审批队列，不直接改后台。' }
      ],
      risks: [],
      artifacts: [{ type: `${moduleKey}-brief`, name: `${MODULES[moduleKey]?.title || moduleKey} 结果`, data: { text, rows: rows.slice(0, 20) } }]
    };
  }

  function submitTask(input = {}) {
    const marketplace = marketplaceFromPayload(input);
    if (!marketplace) throw new Error('请先选择站点，或在消息里写明美国站、德国站、日本站等。');
    const resolvedModule = routeModule(input);
    const rows = normalizeRows(input);
    const taskAssets = Array.isArray(input.assets) ? input.assets : assetsForAssistant(input, extractLinksAndPaths(input.message || ''));
    const now = new Date().toISOString();
    const ruleAnalysis = analysisFor(resolvedModule, { ...input, assets: taskAssets }, rows, marketplace);
    const ai = input.aiAnalysis && typeof input.aiAnalysis === 'object' ? input.aiAnalysis : null;
    const analysis = ai && ai.summary
      ? {
          summary: String(ai.summary),
          insights: Array.isArray(ai.insights) ? ai.insights : ruleAnalysis.insights,
          actions: Array.isArray(ai.actions) ? ai.actions : ruleAnalysis.actions,
          risks: Array.isArray(ai.risks) ? ai.risks : ruleAnalysis.risks,
          artifacts: ruleAnalysis.artifacts
        }
      : ruleAnalysis;
    const highRisk = ['launch', 'execution', 'compliance'].includes(resolvedModule) || input.permissionMode === 'approval';
    const task = {
      taskId: input.taskId || makeId('task'),
      projectId: input.projectId || '',
      projectName: input.projectName || '',
      module: input.module || 'auto',
      resolvedModule,
      status: 'completed',
      summary: analysis.summary,
      insights: analysis.insights,
      actions: analysis.actions,
      risks: analysis.risks,
      artifacts: analysis.artifacts,
      decision: ai?.decision || ruleAnalysis.decision || '',
      confidence: ai?.confidence ?? null,
      missingData: Array.isArray(ai?.missingData) ? ai.missingData : [],
      nextActions: Array.isArray(ai?.nextActions) ? ai.nextActions : [],
      usedContext: {
        assets: taskAssets.map((asset) => ({
          assetId: asset.assetId,
          name: asset.name,
          kind: asset.kind,
          originalPath: asset.originalPath || '',
          localPath: asset.localPath || '',
          url: asset.url || ''
        })),
        dataRows: rows.length
      },
      asin: input.asin || extractAsin(input.message || ''),
      keyword: input.keyword || extractKeyword(input.message || ''),
      message: input.message || '',
      metrics: input.metrics || {},
      parameters: input.parameters || {},
      attachments: input.attachments || [],
      permissionMode: input.permissionMode || (highRisk ? 'approval' : 'suggest'),
      approvalStatus: highRisk ? 'required' : 'not_required',
      executableActions: highRisk ? [{ type: 'approval_required', text: '高风险动作只生成待确认清单，不自动执行。' }] : [],
      dataSource: input.dataSource || (rows.length ? 'csv' : 'manual'),
      connectorId: input.connectorId || '',
      workflowStage: input.workflowStage || resolvedModule,
      marketplace: marketplace.code,
      marketplaceId: marketplace.marketplaceId,
      region: marketplace.region,
      currency: marketplace.currency,
      language: marketplace.language,
      createdAt: now
    };
    if (highRisk) {
      const approvals = readJson(files.approvals, []);
      writeJson(files.approvals, [{ id: makeId('approval'), taskId: task.taskId, module: resolvedModule, status: 'pending', reason: '高风险动作需要人工确认', createdAt: now }, ...approvals].slice(0, 500));
    }
    const saved = saveTask(task);
    if (['listing', 'launch'].includes(resolvedModule)) {
      const draftArtifact = (analysis.artifacts || []).find((item) => item.type === 'listing-draft');
      if (draftArtifact && draftArtifact.data) {
        const data = draftArtifact.data;
        saveListingDraft({
          sourceTaskId: saved.taskId,
          projectId: saved.projectId,
          marketplace: saved.marketplace,
          marketplaceId: saved.marketplaceId,
          currency: saved.currency,
          language: saved.language,
          sku: data.item_sku || input.sku || '',
          asin: data.external_product_id || saved.asin || '',
          title: data.item_name || '',
          bullets: [data.bullet_point1, data.bullet_point2, data.bullet_point3, data.bullet_point4, data.bullet_point5].filter(Boolean),
          description: data.product_description || '',
          searchTerms: String(data.generic_keywords || '').split(/[;,、\s]+/).filter(Boolean),
          status: 'draft'
        });
      }
    }
    return saved;
  }

  function previewDataSource(input = {}) {
    const fail = (message, sourceType = input.sourceType || 'file') => ({
      ok: false,
      sourceType,
      headers: [],
      rows: [],
      rowCount: 0,
      sample: [],
      message
    });
    if (input.csvText) {
      const rows = parseCsv(input.csvText);
      return { ok: true, sourceType: 'csv', headers: rows[0] || [], rows: rows.slice(0, 20), rowCount: Math.max(rows.length - 1, 0), sample: rows.slice(1, 6) };
    }
    if (input.jsonText) {
      const rows = rowsFromJsonData(parseJsonLoose(input.jsonText));
      return { ok: true, sourceType: 'json', headers: Object.keys(rows[0] || {}), rows: rows.slice(0, 20), rowCount: rows.length, sample: rows.slice(0, 6) };
    }
    if (input.filePath) {
      let safePath;
      try {
        safePath = assertSafeLocalPath(input.filePath);
      } catch (_error) {
        return fail('文件路径无效：请填写本机绝对路径，且不要包含 .. 路径段。');
      }
      if (!fs.existsSync(safePath)) return fail(`文件不存在：${safePath}`);
      let stat;
      try {
        stat = fs.statSync(safePath);
      } catch (error) {
        return fail(`无法读取文件：${error.message}`);
      }
      if (stat.isDirectory()) return fail('当前选择的是文件夹，请选择 CSV 或 JSON 文件。');
      const ext = path.extname(safePath).toLowerCase();
      if (!['.csv', '.json'].includes(ext)) return fail('当前只支持读取 CSV 或 JSON 文件。');
      const text = fs.readFileSync(safePath, 'utf8');
      if (ext === '.json') return previewDataSource({ jsonText: text });
      return previewDataSource({ csvText: text });
    }
    if (input.connectionId || input.connectorId) {
      const connection = readJson(files.apiConnections, []).find((item) => item.id === input.connectionId);
      const catalog = CONNECTOR_CATALOG.find((item) => item.connectorId === (connection?.connectorId || input.connectorId));
      return { ok: true, sourceType: 'api', headers: Object.keys(connection?.fieldMapping || {}).length ? Object.keys(connection.fieldMapping) : catalog?.fields || [], rows: [], rowCount: Number(connection?.lastSyncCount || 0), sample: [], message: connection ? '已读取接口配置。同步后会保留原始快照和分析结果。' : '请选择或保存接口连接。' };
    }
    return { ok: true, sourceType: input.sourceType || 'manual', headers: Object.keys(input.metrics || {}), rows: [], rowCount: 0, sample: [], message: '手动数据无需文件预览。' };
  }

  function listDataImports() {
    return readJson(files.dataImports, []);
  }

  function saveDataImport(input = {}) {
    const imports = listDataImports();
    const importId = input.importId || makeId('import');
    const existing = imports.find((item) => item.importId === importId) || {};
    const preview = previewDataSource(input);
    if (preview.ok === false) throw new Error(preview.message || '数据文件预览失败。');
    const fullRows = normalizeRows(input);
    const now = new Date().toISOString();
    const rawSnapshot = {
      importId,
      sourceType: input.sourceType || input.dataSource || preview.sourceType || 'manual',
      marketplace: input.marketplace || existing.marketplace || '',
      module: input.module || existing.module || 'data',
      csvText: input.csvText || '',
      jsonText: input.jsonText || '',
      filePath: input.filePath || '',
      rows: fullRows,
      createdAt: now
    };
    const rawPath = path.join(dirs.raw, `${importId}.raw.json`);
    writeJson(rawPath, rawSnapshot);
    const item = {
      ...existing,
      importId,
      name: input.name || existing.name || `聊天自动导入 ${importId}`,
      sourceType: rawSnapshot.sourceType,
      marketplace: rawSnapshot.marketplace,
      module: rawSnapshot.module,
      workflowStage: input.workflowStage || existing.workflowStage || 'ingest',
      connectionId: input.connectionId || existing.connectionId || '',
      connectorId: input.connectorId || existing.connectorId || '',
      filePath: input.filePath || existing.filePath || '',
      fieldMapping: normalizeJsonField(input.fieldMapping, existing.fieldMapping || {}),
      headers: Object.keys(fullRows[0] || {}).length ? Object.keys(fullRows[0]) : (preview.headers || []),
      rowCount: fullRows.length || preview.rowCount || 0,
      sample: fullRows.slice(0, 6),
      rawPath,
      status: preview.ok ? 'ready' : 'failed',
      message: preview.message || '已保存原始数据快照。',
      updatedAt: now,
      createdAt: existing.createdAt || now
    };
    writeJson(files.dataImports, [item, ...imports.filter((entry) => entry.importId !== importId)].slice(0, 1000));
    logActivity({ type: 'data.import.saved', importId, module: item.module, marketplace: item.marketplace, rawPath });
    return item;
  }

  function normalizeJsonField(value, fallback = {}) {
    if (!value) return fallback;
    if (typeof value === 'string') {
      try { return JSON.parse(value); } catch (_error) { return { raw: value }; }
    }
    return value;
  }

  function importCsv(moduleKey, filePath) {
    const safePath = assertSafeLocalPath(filePath);
    const text = fs.readFileSync(safePath, 'utf8');
    const rows = parseCsv(text);
    return { module: moduleKey, headers: rows[0] || [], rows: rows.slice(0, 31), rowCount: Math.max(rows.length - 1, 0), ready: true, dataSource: 'csv' };
  }

  function appendAssistantMessages(messages) {
    const current = readJson(files.assistantMessages, []);
    writeJson(files.assistantMessages, [...messages, ...current].slice(0, 1000));
  }

  function listAssistantMessages() {
    return readJson(files.assistantMessages, []);
  }

  function assistantSuggestions(task) {
    if (!task) return ['先选择站点，然后发 ASIN/CSV/链接', '粘贴广告 CSV 自动诊断', '把产品素材发来生成上架草稿'];
    const map = {
      ads: ['把这份广告报表生成否词清单', '继续分析预算怎么转移', '导出 JSON'],
      inventory: ['按采购周期生成补货清单', '检查断货风险', '导入在途库存'],
      launch: ['生成可上传 Listing 表格', '进入合规审查', '生成图片 brief'],
      image: ['继续生成视频 brief', '转成 A+ 图片清单', '生成上架草稿'],
      video: ['把分镜转成拍摄清单', '生成字幕和旁白', '进入内容素材页'],
      selection: ['继续算利润', '生成测款方案', '做 Listing 草稿']
    };
    return map[task.resolvedModule] || ['继续补充数据', '导出结果', '生成下一步执行清单'];
  }

  function buildAssistantReply(task, importedData = []) {
    const lines = [
      task.summary,
      importedData.length ? `我已自动保存 ${importedData.length} 个数据源，原始数据没有被覆盖。` : '这次没有检测到可导入的数据，我先按文字内容分析。',
      `已路由到：${MODULES[task.resolvedModule]?.title || task.resolvedModule}。`,
      task.actions?.[0]?.text ? `优先动作：${task.actions[0].text}` : ''
    ].filter(Boolean);
    return lines.join('\n');
  }

  function submitAssistantMessage(input = {}) {
    const now = new Date().toISOString();
    const message = safeString(input.message || input.text || '');
    const userMessage = { id: makeId('msg'), role: 'user', content: message, createdAt: now };
    if (!message) {
      const reply = { id: makeId('msg'), role: 'assistant', status: 'idle', content: '你可以直接发 ASIN、广告 CSV、库存表、JSON、网页链接或 D 盘文件路径，我会自动判断模块并保存结果。', createdAt: now, suggestions: ['分析 ASIN 利润', '粘贴广告 CSV', '生成上架草稿'] };
      appendAssistantMessages([reply, userMessage]);
      return { userMessage, assistantMessage: reply, importedData: [], suggestions: reply.suggestions };
    }
    const marketplaceCode = input.marketplace || detectMarketplaceInText(message);
    const marketplace = marketplaceByCode(marketplaceCode);
    if (!marketplace) {
      const reply = { id: makeId('msg'), role: 'assistant', status: 'needs_marketplace', content: '我已经理解你的任务，但为了避免误判站点，需要先选择或说清楚站点。比如：德国站、美国站、日本站。', createdAt: now, suggestions: ['德国站分析这个 ASIN', '美国站粘贴广告 CSV', '日本站生成上架草稿'] };
      appendAssistantMessages([reply, userMessage]);
      return { userMessage, assistantMessage: reply, importedData: [], suggestions: reply.suggestions };
    }

    const csvText = input.csvText || detectCsvBlock(message);
    const jsonData = parseJsonLoose(input.jsonText || message);
    const linkInfo = extractLinksAndPaths(message);
    const moduleKey = input.module && input.module !== 'assistant' ? input.module : routeModule({ ...input, message, csvText, jsonText: input.jsonText });
    const importedData = [];

    if (csvText) {
      importedData.push(saveDataImport({ name: `聊天导入 CSV - ${MODULES[moduleKey]?.title || moduleKey}`, sourceType: 'csv', marketplace: marketplace.code, module: moduleKey, workflowStage: 'assistant-chat', csvText }));
    }
    if (jsonData) {
      importedData.push(saveDataImport({ name: `聊天导入 JSON - ${MODULES[moduleKey]?.title || moduleKey}`, sourceType: 'json', marketplace: marketplace.code, module: moduleKey, workflowStage: 'assistant-chat', jsonText: JSON.stringify(jsonData, null, 2) }));
    }
    for (const filePath of linkInfo.paths) {
      if (fs.existsSync(filePath)) {
        importedData.push(saveDataImport({ name: `聊天导入文件 - ${path.basename(filePath)}`, sourceType: filePath.toLowerCase().endsWith('.json') ? 'json' : 'csv', marketplace: marketplace.code, module: moduleKey, workflowStage: 'assistant-chat', filePath }));
      }
    }

    const task = submitTask({
      ...input,
      module: moduleKey,
      marketplace: marketplace.code,
      asin: input.asin || extractAsin(message),
      keyword: input.keyword || extractKeyword(message),
      message,
      metrics: { ...extractMetricsFromText(message), ...(input.metrics || {}) },
      attachments: [...(input.attachments || []), ...linkInfo.links, ...linkInfo.paths],
      dataSource: importedData.length ? 'mixed' : (input.dataSource || 'manual'),
      csvText,
      jsonText: jsonData ? JSON.stringify(jsonData) : input.jsonText,
      workflowStage: 'assistant-chat',
      permissionMode: input.permissionMode || 'suggest'
    });

    const assistantMessage = {
      id: makeId('msg'),
      role: 'assistant',
      status: task.status,
      taskId: task.taskId,
      module: task.resolvedModule,
      content: buildAssistantReply(task, importedData),
      importedData,
      suggestions: assistantSuggestions(task),
      createdAt: new Date().toISOString()
    };
    appendAssistantMessages([assistantMessage, userMessage]);
    logActivity({ type: 'assistant.chat.completed', taskId: task.taskId, module: task.resolvedModule, imports: importedData.length });
    return { userMessage, assistantMessage, task, importedData, suggestions: assistantMessage.suggestions };
  }

  function resolveAiConnection() {
    const route = resolveProviderRoute('chat');
    const routedProfile = route.profileId ? providerProfileById(route.profileId) : null;
    if (routedProfile && routedProfile.enabled !== false && routedProfile.endpoint) {
      return {
        id: routedProfile.id,
        providerId: routedProfile.id,
        connectorId: routedProfile.providerKind || 'openai-compatible',
        type: 'ai',
        endpoint: routedProfile.endpoint,
        authMethod: routedProfile.authMethod,
        headers: routedProfile.headers || {},
        credentials: {
          model: routedProfile.model || 'deepseek-chat',
          timeoutMs: routedProfile.limits?.timeoutMs || 30000
        }
      };
    }
    const connections = readJson(files.apiConnections, []);
    return connections.find((connection) => {
      return connection.enabled
        && (connection.connectorId === 'openai-compatible' || connection.type === 'ai')
        && connection.endpoint
        && Object.keys(connection.credentials || {}).length;
    }) || null;
  }

  function aiChatEndpoint(connection) {
    const endpoint = safeString(connection.endpoint || '').replace(/\/+$/, '');
    return /\/chat\/completions$/i.test(endpoint) ? endpoint : `${endpoint}/chat/completions`;
  }

  function aiChatHeaders(connection) {
    if (connection.providerId) {
      const profile = providerProfileById(connection.providerId);
      if (profile) return Object.assign({ 'content-type': 'application/json' }, providerAuthHeaders(profile));
    }
    return Object.assign({ 'content-type': 'application/json' }, authHeaders(connection));
  }

  async function analyzeWithAi(connection, context) {
    const credentials = connection.credentials || {};
    const model = credentials.model || 'deepseek-chat';
    const response = await fetch(aiChatEndpoint(connection), {
      method: 'POST',
      headers: aiChatHeaders(connection),
      signal: AbortSignal.timeout(Number(credentials.timeoutMs || 30000)),
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          {
            role: 'system',
            content: 'You are an Amazon operations agent. Reply with valid JSON only. The JSON must contain exactly these keys: summary (string), insights (array of {label,value}), actions (array of {priority,text}), risks (array of strings), decision (string), confidence (number 0-1), missingData (array of strings), nextActions (array of strings). Do not use markdown fences.'
          },
          { role: 'user', content: JSON.stringify(context, null, 2) }
        ]
      })
    });
    if (!response.ok) throw new Error(`AI provider HTTP ${response.status}`);
    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content || '';
    const parsed = parseJsonLoose(content);
    if (!parsed || typeof parsed !== 'object') throw new Error('AI provider did not return parseable JSON');
    return parsed;
  }

  async function submitAssistantMessageWithAssets(input = {}) {
    const now = new Date().toISOString();
    const message = safeString(input.message || input.text || '');
    const userMessage = { id: makeId('msg'), role: 'user', content: message, createdAt: now };
    if (!message) {
      const reply = {
        id: makeId('msg'),
        role: 'assistant',
        status: 'idle',
        content: '你可以直接发送 ASIN、CSV、JSON、网页链接、本地文件路径或已导入素材。我会结合当前站点和素材库处理。',
        createdAt: now,
        suggestions: ['导入产品图片', '用最新素材生成 Listing 草稿', '分析广告 CSV']
      };
      appendAssistantMessages([reply, userMessage]);
      return { userMessage, assistantMessage: reply, importedData: [], importedAssets: [], suggestions: reply.suggestions };
    }

    const marketplaceCode = input.marketplace || detectMarketplaceInText(message);
    const marketplace = marketplaceByCode(marketplaceCode);
    if (!marketplace) {
      const reply = {
        id: makeId('msg'),
        role: 'assistant',
        status: 'needs_marketplace',
        content: '我已经理解任务，但需要先确定站点，才能正确使用币种、语言、合规规则和 FBA 假设。',
        createdAt: now,
        suggestions: ['德国站使用最新素材', '美国站分析广告 CSV', '日本站生成 Listing 草稿']
      };
      appendAssistantMessages([reply, userMessage]);
      return { userMessage, assistantMessage: reply, importedData: [], importedAssets: [], suggestions: reply.suggestions };
    }

    const csvText = input.csvText || detectCsvBlock(message);
    const jsonData = parseJsonLoose(input.jsonText || message);
    const linkInfo = extractLinksAndPaths(message);
    const moduleKey = input.module && input.module !== 'assistant'
      ? input.module
      : routeModule({ ...input, message, csvText, jsonText: input.jsonText });
    const importedData = [];
    const importedAssets = [];

    if (csvText) {
      importedData.push(saveDataImport({ name: `聊天导入 CSV - ${MODULES[moduleKey]?.title || moduleKey}`, sourceType: 'csv', marketplace: marketplace.code, module: moduleKey, workflowStage: 'assistant-chat', csvText }));
    }
    if (jsonData) {
      importedData.push(saveDataImport({ name: `聊天导入 JSON - ${MODULES[moduleKey]?.title || moduleKey}`, sourceType: 'json', marketplace: marketplace.code, module: moduleKey, workflowStage: 'assistant-chat', jsonText: JSON.stringify(jsonData, null, 2) }));
    }

    for (const filePath of linkInfo.paths) {
      if (!fs.existsSync(filePath)) continue;
      const kind = mediaKind(filePath);
      if (kind === 'csv' || kind === 'json') {
        importedData.push(saveDataImport({ name: `聊天导入文件 - ${path.basename(filePath)}`, sourceType: kind, marketplace: marketplace.code, module: moduleKey, workflowStage: 'assistant-chat', filePath }));
      } else {
        importedAssets.push(...importAssets({
          filePaths: [filePath],
          marketplace: marketplace.code,
          module: moduleKey,
          projectName: input.projectName || '',
          asin: input.asin || extractAsin(message),
          tags: input.tags || '',
          usage: 'assistant-chat'
        }).imported);
      }
    }

    if (linkInfo.links.length) {
      importedAssets.push(...importAssets({
        links: linkInfo.links,
        marketplace: marketplace.code,
        module: moduleKey,
        projectName: input.projectName || '',
        asin: input.asin || extractAsin(message),
        tags: input.tags || '',
        usage: 'assistant-chat'
      }).imported);
    }

    const selectedAssets = assetsForAssistant({ ...input, message }, linkInfo);
    const assets = [...importedAssets, ...selectedAssets].filter((asset, index, all) => {
      const key = asset.assetId || asset.originalPath || asset.url;
      return key && all.findIndex((item) => (item.assetId || item.originalPath || item.url) === key) === index;
    });
    const mediaOperation = input.mediaOperation || inferMediaOperation(message, moduleKey, assets);
    let mediaRun = null;
    if (mediaOperation) {
      try {
        mediaRun = await submitMediaRun({
          operationId: mediaOperation,
          engine: input.engine || 'local',
          providerId: input.providerId || '',
          assetIds: assets.map((asset) => asset.assetId).filter(Boolean),
          sourcePaths: assets.map((asset) => asset.localPath || asset.originalPath).filter(Boolean),
          module: moduleKey,
          marketplace: marketplace.code,
          projectId: input.projectId || '',
          projectName: input.projectName || '',
          agentId: 'media-producer',
          options: {
            prompt: message,
            ...(input.options || {}),
            ...(input.parameters || {})
          }
        });
      } catch (error) {
        logActivity({ type: 'assistant.media.failed', module: moduleKey, operation: mediaOperation, error: error.message });
      }
    }

    const aiConnection = resolveAiConnection();
    let aiAnalysis = null;
    if (aiConnection) {
      try {
        aiAnalysis = await analyzeWithAi(aiConnection, {
          marketplace: marketplace.code,
          currency: marketplace.currency,
          language: marketplace.language,
          module: moduleKey,
          message,
          asin: input.asin || extractAsin(message),
          keyword: input.keyword || extractKeyword(message),
          metrics: { ...extractMetricsFromText(message), ...(input.metrics || {}) },
          parameters: input.parameters || {},
          assets: assets.map(assetSummary),
          importedData: importedData.map((item) => ({ name: item.name, sourceType: item.sourceType, rowCount: item.rowCount }))
        });
      } catch (error) {
        logActivity({ type: 'assistant.ai.fallback', module: moduleKey, error: error.message });
      }
    }

    const task = mediaRun
      ? {
        taskId: mediaRun.runId,
        resolvedModule: mediaOperationDefinition(mediaOperation).targetKind === 'video' ? 'video' : 'image',
        marketplace: marketplace.code,
        status: mediaRun.status,
        summary: `${mediaOperationDefinition(mediaOperation).label}完成，已生成 ${(mediaRun.artifacts || []).length} 个真实媒体文件。`,
        artifacts: mediaRun.artifacts || [],
        actions: [{ priority: 'P1', text: '检查真实产物，并可在素材库中继续引用。' }],
        missingData: [],
        risks: [],
        createdAt: mediaRun.startedAt
      }
      : submitTask({
        ...input,
        module: moduleKey,
        marketplace: marketplace.code,
        asin: input.asin || extractAsin(message),
        keyword: input.keyword || extractKeyword(message),
        message,
        metrics: { ...extractMetricsFromText(message), ...(input.metrics || {}) },
        attachments: [...(input.attachments || []), ...linkInfo.links, ...linkInfo.paths],
        filePaths: linkInfo.paths,
        assets,
        dataSource: importedData.length ? 'mixed' : (input.dataSource || 'manual'),
        csvText,
        jsonText: jsonData ? JSON.stringify(jsonData) : input.jsonText,
        workflowStage: 'assistant-chat',
        permissionMode: input.permissionMode || 'suggest',
        aiAnalysis
      });

    const assistantMessage = {
      id: makeId('msg'),
      role: 'assistant',
      status: task.status,
      taskId: task.taskId,
      module: task.resolvedModule,
      content: [
        task.summary,
        importedData.length ? `已导入 ${importedData.length} 个数据源。` : '',
        importedAssets.length ? `已导入 ${importedAssets.length} 个素材。` : '',
        assets.length ? `本次分析使用了 ${assets.length} 个素材作为上下文。` : '本次没有使用素材上下文。',
        mediaRun ? `已生成真实媒体文件 ${(mediaRun.artifacts || []).length} 个。` : '',
        task.actions?.[0]?.text ? `优先动作：${task.actions[0].text}` : ''
      ].filter(Boolean).join('\n'),
      importedData,
      importedAssets,
      suggestions: assistantSuggestions(task),
      createdAt: new Date().toISOString()
    };
    appendAssistantMessages([assistantMessage, userMessage]);
    logActivity({ type: 'assistant.chat.completed', taskId: task.taskId, module: task.resolvedModule, imports: importedData.length, assets: importedAssets.length });
    return { userMessage, assistantMessage, task, mediaRun, importedData, importedAssets, suggestions: assistantMessage.suggestions };
  }

  function maskConnection(connection) {
    const masked = { ...(connection || {}) };
    const credentials = masked.credentials || {};
    masked.credentials = {};
    for (const [key, value] of Object.entries(credentials)) {
      const text = String(value || '');
      masked.credentials[key] = text.length <= 4 ? '****' : `${text.slice(0, 2)}****${text.slice(-2)}`;
    }
    masked.hasCredentials = Object.keys(credentials).length > 0;
    return masked;
  }

  function listApiConnections() {
    return readJson(files.apiConnections, []).map(maskConnection);
  }

  function saveApiConnection(input = {}) {
    const connections = readJson(files.apiConnections, []);
    const id = input.id || makeId('conn');
    const existing = connections.find((item) => item.id === id) || {};
    const catalog = CONNECTOR_CATALOG.find((item) => item.connectorId === input.connectorId) || {};
    const now = new Date().toISOString();
    const connection = {
      ...existing,
      id,
      connectorId: input.connectorId || existing.connectorId || catalog.connectorId || 'rest-api',
      name: input.name || existing.name || catalog.name || '未命名接口',
      type: input.type || existing.type || catalog.type || 'third_party',
      authMethod: input.authMethod || existing.authMethod || catalog.auth || 'none',
      endpoint: input.endpoint || existing.endpoint || '',
      headers: normalizeJsonField(input.headers, existing.headers || {}),
      fieldMapping: normalizeJsonField(input.fieldMapping, existing.fieldMapping || {}),
      credentials: input.credentials && Object.keys(input.credentials).length ? input.credentials : existing.credentials || {},
      syncMode: input.syncMode || existing.syncMode || 'manual',
      syncIntervalHours: Number(input.syncIntervalHours || existing.syncIntervalHours || 6),
      enabled: input.enabled !== false,
      notes: input.notes || existing.notes || '',
      status: 'configured',
      updatedAt: now,
      createdAt: existing.createdAt || now
    };
    writeJson(files.apiConnections, [connection, ...connections.filter((item) => item.id !== id)].slice(0, 500));
    logActivity({ type: 'api.connection.saved', id, connectorId: connection.connectorId });
    scheduleAutoSync();
    return maskConnection(connection);
  }

  function deleteApiConnection(id) {
    writeJson(files.apiConnections, readJson(files.apiConnections, []).filter((item) => item.id !== id));
    logActivity({ type: 'api.connection.deleted', id });
    scheduleAutoSync();
    return { ok: true };
  }

  async function testApiConnection(id) {
    const connections = readJson(files.apiConnections, []);
    const connection = connections.find((item) => item.id === id);
    if (!connection) throw new Error('连接不存在');
    connection.lastTestAt = new Date().toISOString();
    if (!connection.endpoint || connection.type === 'file' || connection.type === 'webhook' || fs.existsSync(connection.endpoint)) {
      connection.status = 'connected';
      connection.lastTestStatus = 'ok';
      writeJson(files.apiConnections, connections);
      return { ok: true, message: '连接配置可用。真实 API 授权后可执行同步。' };
    }
    try {
      const response = await fetch(connection.endpoint, {
        method: 'GET',
        headers: Object.assign({}, connection.headers || {}, authHeaders(connection)),
        signal: AbortSignal.timeout(8000)
      });
      connection.status = response.ok ? 'connected' : 'failed';
      connection.lastTestStatus = `http_${response.status}`;
      writeJson(files.apiConnections, connections);
      return { ok: response.ok, message: response.ok ? '连接测试通过。' : `接口返回 HTTP ${response.status}。` };
    } catch (error) {
      connection.status = 'failed';
      connection.lastTestStatus = error.message;
      writeJson(files.apiConnections, connections);
      return { ok: false, message: `连接测试失败：${error.message}` };
    }
  }

  async function syncApiConnection(id, reason = 'manual') {
    const connections = readJson(files.apiConnections, []);
    const connection = connections.find((item) => item.id === id);
    if (!connection) throw new Error('连接不存在');
    const now = new Date().toISOString();
    let rows = [];
    const endpoint = safeString(connection.endpoint || '');
    if (endpoint && fs.existsSync(endpoint)) {
      const text = fs.readFileSync(endpoint, 'utf8');
      rows = endpoint.toLowerCase().endsWith('.json') ? rowsFromJsonData(parseJsonLoose(text)) : rowsToObjects(parseCsv(text));
    } else if (/^https?:\/\//i.test(endpoint)) {
      const headers = Object.assign({}, connection.headers || {}, authHeaders(connection));
      const response = await fetch(endpoint, {
        method: 'GET',
        headers,
        signal: AbortSignal.timeout(15000)
      });
      if (!response.ok) throw new Error(`同步请求返回 HTTP ${response.status}`);
      const contentType = String(response.headers.get('content-type') || '');
      const text = await response.text();
      if (contentType.includes('json') || endpoint.toLowerCase().includes('json')) {
        rows = rowsFromJsonData(parseJsonLoose(text));
      } else {
        rows = rowsToObjects(parseCsv(text));
      }
    }
    if (connection.fieldMapping && Object.keys(connection.fieldMapping || {}).length) {
      rows = rows.map((row) => applyFieldMapping(row, connection.fieldMapping));
    }
    const syncId = makeId('sync');
    const raw = { syncId, connectionId: id, connectorId: connection.connectorId, reason, fetchedAt: now, rawPreserved: true, rows };
    const rawPath = path.join(dirs.raw, `${syncId}.raw.json`);
    writeJson(rawPath, raw);
    const derived = { syncId, connectionId: id, connectorId: connection.connectorId, analyzedAt: now, summary: `${connection.name} 已同步 ${rows.length} 行数据，原始数据已独立保存。`, fields: rows[0] ? Object.keys(rows[0]) : (CONNECTION_FIELDS(connection.connectorId)), rawPath };
    const derivedPath = path.join(dirs.derived, `${syncId}.analysis.json`);
    writeJson(derivedPath, derived);
    connection.lastSyncAt = now;
    connection.lastSyncCount = rows.length;
    connection.lastRawPath = rawPath;
    connection.lastDerivedPath = derivedPath;
    connection.status = 'synced';
    writeJson(files.apiConnections, connections);
    writeJson(files.syncJobs, [{ id: syncId, connectionId: id, reason, rawPath, derivedPath, createdAt: now }, ...readJson(files.syncJobs, [])].slice(0, 1000));
    logActivity({ type: 'api.connection.synced', id, reason, rows: rows.length });
    return { ok: true, rows: rows.length, rawPath, derivedPath, message: derived.summary };
  }

  function CONNECTION_FIELDS(connectorId) {
    return CONNECTOR_CATALOG.find((item) => item.connectorId === connectorId)?.fields || [];
  }

  async function runDueSyncs() {
    const connections = readJson(files.apiConnections, []);
    const now = Date.now();
    for (const connection of connections) {
      if (!connection.enabled || connection.syncMode !== 'scheduled') continue;
      const interval = Number(connection.syncIntervalHours || 6) * 60 * 60 * 1000;
      const last = connection.lastSyncAt ? Date.parse(connection.lastSyncAt) : 0;
      if (!last || now - last >= interval) {
        try { await syncApiConnection(connection.id, 'scheduled'); } catch (error) { logActivity({ type: 'api.sync.failed', id: connection.id, error: error.message }); }
      }
    }
  }

  function scheduleAutoSync() {
    if (syncTimer) clearInterval(syncTimer);
    runDueSyncs();
    syncTimer = setInterval(runDueSyncs, Math.min(SIX_HOURS, 10 * 60 * 1000));
  }

  function providerProfileById(id) {
    return readJson(files.providerProfiles, []).find((item) => item.id === id) || null;
  }

  function maskProviderProfile(profile) {
    const { secret, credentials, ...safe } = profile || {};
    const vault = readJson(files.credentialVault, { entries: {} });
    return {
      ...safe,
      hasCredentials: sessionProviderSecrets.has(profile?.id) || Boolean(vault.entries?.[profile?.id]?.ciphertext),
      secretStored: Boolean(vault.entries?.[profile?.id]?.ciphertext)
    };
  }

  function listProviderProfiles() {
    return readJson(files.providerProfiles, []).map(maskProviderProfile);
  }

  function saveProviderProfile(input = {}) {
    const profiles = readJson(files.providerProfiles, []);
    const id = safeId(input.id) ? input.id : makeId('provider');
    const existing = profiles.find((item) => item.id === id) || {};
    const profile = v4Contracts.normalizeProviderProfile({
      ...existing,
      ...input,
      id,
      createdAt: existing.createdAt
    });
    if (!profile.capabilities.length) throw new Error('provider_capability_required');
    if (input.secret) sessionProviderSecrets.set(id, String(input.secret));
    if (input.clearSecret) {
      sessionProviderSecrets.delete(id);
      const vault = readJson(files.credentialVault, { version: 1, entries: {} });
      delete vault.entries[id];
      vault.updatedAt = new Date().toISOString();
      writeJson(files.credentialVault, vault);
    }
    writeJson(files.providerProfiles, [profile, ...profiles.filter((item) => item.id !== id)].slice(0, 500));
    logActivity({ type: 'provider.saved', providerId: id, capabilities: profile.capabilities });
    return maskProviderProfile(profile);
  }

  function deleteProviderProfile(id) {
    const profiles = readJson(files.providerProfiles, []);
    const routes = readJson(files.providerRoutes, []);
    const inUse = routes.filter((route) => (route.profileIds || []).includes(id) || (route.fallbackProfileIds || []).includes(id));
    if (inUse.length && !arguments[1]?.force) {
      return { ok: false, code: 'provider_in_use', routes: inUse.map((item) => item.id) };
    }
    writeJson(files.providerProfiles, profiles.filter((item) => item.id !== id));
    writeJson(files.providerRoutes, routes.map((route) => ({
      ...route,
      profileIds: (route.profileIds || []).filter((item) => item !== id),
      fallbackProfileIds: (route.fallbackProfileIds || []).filter((item) => item !== id),
      updatedAt: new Date().toISOString()
    })));
    const vault = readJson(files.credentialVault, { version: 1, entries: {} });
    delete vault.entries[id];
    vault.updatedAt = new Date().toISOString();
    writeJson(files.credentialVault, vault);
    sessionProviderSecrets.delete(id);
    logActivity({ type: 'provider.deleted', providerId: id });
    return { ok: true, providerId: id };
  }

  function listProviderRoutes() {
    return readJson(files.providerRoutes, v4Contracts.createDefaultProviderRoutes());
  }

  function saveProviderRoute(input = {}) {
    const routes = listProviderRoutes();
    const capability = String(input.capability || 'chat');
    if (!v4Contracts.CAPABILITY_IDS.includes(capability)) throw new Error('invalid_provider_capability');
    const scopeType = ['global', 'project', 'agent'].includes(input.scopeType) ? input.scopeType : 'global';
    const scopeId = scopeType === 'global' ? '' : String(input.scopeId || '');
    if (scopeType !== 'global' && !scopeId) throw new Error('route_scope_id_required');
    const id = input.id || `route-${capability}-${scopeType}-${scopeId || 'default'}`;
    const profileIds = Array.isArray(input.profileIds) ? input.profileIds.filter((item) => providerProfileById(item)) : [];
    const fallbackProfileIds = Array.isArray(input.fallbackProfileIds) ? input.fallbackProfileIds.filter((item) => providerProfileById(item)) : [];
    const route = {
      id,
      capability,
      scopeType,
      scopeId,
      profileIds,
      fallbackProfileIds,
      maxCost: number(input.maxCost, 0),
      currency: String(input.currency || 'USD'),
      timeoutMs: Math.max(1000, Number(input.timeoutMs || (capability === 'video' ? 300000 : 60000))),
      maxRetries: Math.max(0, Number(input.maxRetries || 1)),
      enabled: input.enabled !== false,
      updatedAt: new Date().toISOString()
    };
    writeJson(files.providerRoutes, [route, ...routes.filter((item) => item.id !== id)].slice(0, 2000));
    logActivity({ type: 'provider.route.saved', routeId: id, capability, scopeType, scopeId });
    return route;
  }

  function resolveProviderRoute(capability, context = {}) {
    return v4Contracts.resolveProviderRoute(listProviderRoutes(), capability, context);
  }

  function providerExecutionChain(capability, context = {}) {
    const route = resolveProviderRoute(capability, context);
    const ids = [route.profileId, ...(route.fallbackProfileIds || [])].filter(Boolean);
    const profiles = ids.map(providerProfileById).filter((item) => item && item.enabled !== false);
    return { route, profiles };
  }

  function setProviderSecret(providerId, secret) {
    if (!providerProfileById(providerId)) throw new Error('provider_not_found');
    if (secret) sessionProviderSecrets.set(providerId, String(secret));
    else sessionProviderSecrets.delete(providerId);
    return { ok: true, providerId, hasCredentials: Boolean(secret) };
  }

  function setEncryptedProviderCredential(providerId, ciphertext) {
    if (!providerProfileById(providerId)) throw new Error('provider_not_found');
    const vault = readJson(files.credentialVault, { version: 1, entries: {} });
    vault.entries[providerId] = {
      ciphertext: String(ciphertext || ''),
      updatedAt: new Date().toISOString()
    };
    vault.updatedAt = new Date().toISOString();
    writeJson(files.credentialVault, vault);
    return { ok: true, providerId };
  }

  function listEncryptedProviderCredentials() {
    const vault = readJson(files.credentialVault, { version: 1, entries: {} });
    return Object.entries(vault.entries || {}).map(([providerId, entry]) => ({ providerId, ...entry }));
  }

  function providerAuthHeaders(profile) {
    const secret = sessionProviderSecrets.get(profile.id) || '';
    const headers = { ...(profile.headers || {}) };
    if (!secret) return headers;
    if (profile.authMethod === 'basic') {
      headers.Authorization = `Basic ${Buffer.from(secret).toString('base64')}`;
    } else if (profile.authMethod === 'api_key') {
      headers['x-api-key'] = secret;
    } else if (profile.authMethod !== 'none') {
      headers.Authorization = `Bearer ${secret}`;
    }
    return headers;
  }

  async function testProviderProfile(id) {
    const profiles = readJson(files.providerProfiles, []);
    const profile = profiles.find((item) => item.id === id);
    if (!profile) throw new Error('provider_not_found');
    const startedAt = Date.now();
    let ok = true;
    let message = 'Provider 配置可用。';
    if (profile.profileKind !== 'local' && profile.endpoint) {
      const endpoint = profile.testEndpoint || profile.endpoint;
      try {
        if (profile.authMethod !== 'none' && !sessionProviderSecrets.has(profile.id) && !readJson(files.credentialVault, { entries: {} }).entries?.[profile.id]) {
          throw new Error('provider_credential_missing');
        }
        const response = await fetch(endpoint, {
          method: profile.testMethod || 'GET',
          headers: providerAuthHeaders(profile),
          signal: AbortSignal.timeout(Math.min(Number(profile.limits?.timeoutMs || 15000), 30000))
        });
        ok = response.ok;
        message = ok ? 'Provider 连接测试通过。' : `Provider 返回 HTTP ${response.status}。`;
      } catch (error) {
        ok = false;
        message = `Provider 连接测试失败：${error.message}`;
      }
    }
    const latencyMs = Date.now() - startedAt;
    const updated = profiles.map((item) => item.id === id ? {
      ...item,
      status: ok ? 'connected' : 'failed',
      lastTestAt: new Date().toISOString(),
      lastTestStatus: ok ? 'ok' : 'failed',
      lastLatencyMs: latencyMs,
      health: { state: ok ? 'healthy' : 'unhealthy', message }
    } : item);
    writeJson(files.providerProfiles, updated);
    return { ok, message, latencyMs, providerId: id };
  }

  function recordUsage(entry = {}) {
    const usage = readJson(files.usageLedger, []);
    const record = {
      id: entry.id || makeId('usage'),
      providerId: safeString(entry.providerId),
      capability: safeString(entry.capability),
      runId: safeString(entry.runId),
      projectId: safeString(entry.projectId),
      amount: number(entry.amount, 0),
      currency: safeString(entry.currency) || 'USD',
      quantity: number(entry.quantity, 0),
      unit: safeString(entry.unit) || 'request',
      status: safeString(entry.status) || 'completed',
      createdAt: new Date().toISOString()
    };
    writeJson(files.usageLedger, [record, ...usage].slice(0, 10000));
    return record;
  }

  function getUsageSummary(filters = {}) {
    const since = filters.since ? Date.parse(filters.since) : 0;
    const usage = readJson(files.usageLedger, []).filter((item) => {
      if (filters.providerId && item.providerId !== filters.providerId) return false;
      if (filters.projectId && item.projectId !== filters.projectId) return false;
      return !since || Date.parse(item.createdAt) >= since;
    });
    const byProvider = {};
    const byCapability = {};
    let amount = 0;
    for (const item of usage) {
      amount += Number(item.amount || 0);
      byProvider[item.providerId || 'unknown'] = (byProvider[item.providerId || 'unknown'] || 0) + Number(item.amount || 0);
      byCapability[item.capability || 'unknown'] = (byCapability[item.capability || 'unknown'] || 0) + Number(item.amount || 0);
    }
    return { count: usage.length, amount, currency: filters.currency || 'USD', byProvider, byCapability, recent: usage.slice(0, 50) };
  }

  function migrateLegacyProviders() {
    const connections = readJson(files.apiConnections, []);
    const profiles = readJson(files.providerProfiles, []);
    const routes = listProviderRoutes();
    let profilesCreated = 0;
    let routesUpdated = 0;
    for (const connection of connections) {
      if (profiles.some((item) => item.legacyConnectionId === connection.id)) continue;
      const ai = connection.type === 'ai' || connection.connectorId === 'openai-compatible';
      const capabilities = ai ? ['chat', 'reasoning', 'image', 'video'] : ['data'];
      const id = makeId('provider');
      const profile = v4Contracts.normalizeProviderProfile({
        id,
        name: connection.name || connection.connectorId || 'Legacy Provider',
        providerKind: connection.connectorId || 'rest-api',
        profileKind: connection.type === 'file' ? 'local' : 'cloud',
        type: connection.type || 'third_party',
        capabilities,
        endpoint: connection.endpoint || '',
        model: connection.credentials?.model || '',
        authMethod: connection.authMethod || 'bearer',
        credentialRef: `legacy:${connection.id}`,
        headers: connection.headers || {},
        enabled: connection.enabled !== false,
        legacyConnectionId: connection.id,
        notes: connection.notes || ''
      });
      profiles.push(profile);
      profilesCreated += 1;
      const secret = connection.credentials?.apiKey || connection.credentials?.api_key || connection.credentials?.token || connection.credentials?.bearerToken;
      if (secret) sessionProviderSecrets.set(id, String(secret));
      for (const capability of capabilities) {
        const index = routes.findIndex((route) => route.capability === capability && route.scopeType === 'global');
        if (index >= 0) {
          const existingIds = routes[index].profileIds || [];
          if (!existingIds.includes(id)) {
            routes[index] = { ...routes[index], profileIds: [...existingIds, id], updatedAt: new Date().toISOString() };
            routesUpdated += 1;
          }
        } else {
          routes.push({
            id: `route-${capability}-global`,
            capability,
            scopeType: 'global',
            scopeId: '',
            profileIds: [id],
            fallbackProfileIds: [],
            maxCost: 0,
            currency: 'USD',
            timeoutMs: capability === 'video' ? 300000 : 60000,
            maxRetries: 1,
            enabled: true,
            updatedAt: new Date().toISOString()
          });
          routesUpdated += 1;
        }
      }
    }
    if (profilesCreated) writeJson(files.providerProfiles, profiles.slice(0, 500));
    if (routesUpdated) writeJson(files.providerRoutes, routes);
    if (profilesCreated || routesUpdated) logActivity({ type: 'provider.migrated', profilesCreated, routesUpdated });
    return { profilesCreated, routesUpdated, migratedAt: new Date().toISOString() };
  }

  function resolveMediaSources(input = {}) {
    const assets = readJson(files.assets, []);
    const assetPaths = (Array.isArray(input.assetIds) ? input.assetIds : [])
      .map((assetId) => assets.find((item) => item.assetId === assetId))
      .filter(Boolean)
      .map((asset) => asset.localPath || asset.originalPath)
      .filter(Boolean);
    const explicitPaths = (Array.isArray(input.sourcePaths) ? input.sourcePaths : [input.sourcePath])
      .filter(Boolean)
      .map((item) => assertSafeLocalPath(item));
    const paths = [...assetPaths, ...explicitPaths];
    if (!paths.length) throw new Error('media_source_required');
    for (const source of paths) {
      if (!fs.existsSync(source) || !fs.statSync(source).isFile()) throw new Error(`media_source_not_found:${source}`);
    }
    return paths;
  }

  function mediaOperationDefinition(operationId) {
    const definitions = {
      image_to_image: { label: '图片转图片', sourceKind: 'image', targetKind: 'image', capability: 'image' },
      image_to_video: { label: '图片转视频', sourceKind: 'image', targetKind: 'video', capability: 'video' },
      video_to_images: { label: '视频转图片', sourceKind: 'video', targetKind: 'image', capability: 'video' },
      video_to_video: { label: '视频转视频', sourceKind: 'video', targetKind: 'video', capability: 'video' }
    };
    return definitions[operationId] || null;
  }

  function pathValue(value, expression) {
    if (!expression) return undefined;
    return String(expression).replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean).reduce((current, key) => {
      if (current == null) return undefined;
      return current[key];
    }, value);
  }

  async function downloadProviderResult(url, headers, targetBase) {
    const response = await fetch(url, { headers, signal: AbortSignal.timeout(120000) });
    if (!response.ok) throw new Error(`provider_download_http_${response.status}`);
    const contentType = String(response.headers.get('content-type') || '');
    const extension = contentType.includes('video') ? '.mp4' : contentType.includes('webp') ? '.webp' : contentType.includes('png') ? '.png' : '.jpg';
    const target = `${targetBase}${extension}`;
    fs.writeFileSync(target, Buffer.from(await response.arrayBuffer()));
    return target;
  }

  async function runCloudMediaOperation(profile, operationId, sourcePaths, options, runId) {
    if (!profile || !profile.endpoint) throw new Error('provider_not_configured');
    const definition = mediaOperationDefinition(operationId);
    const secretNeeded = profile.authMethod && profile.authMethod !== 'none';
    if (secretNeeded && !sessionProviderSecrets.has(profile.id)) throw new Error('provider_credential_missing');
    const source = sourcePaths[0];
    const sourceData = fs.readFileSync(source);
    const sourceMime = mediaContentType(source);
    const sourceDataUrl = `data:${sourceMime};base64,${sourceData.toString('base64')}`;
    const mapping = profile.requestMapping || {};
    const requestBody = {
      model: profile.model || (definition.capability === 'video' ? profile.videoModel : profile.imageModel) || '',
      prompt: options.prompt || '',
      operation: operationId,
      source: sourceDataUrl,
      source_name: path.basename(source),
      ...(mapping.body && typeof mapping.body === 'object' ? mapping.body : {})
    };
    if (definition.targetKind === 'video') {
      requestBody.duration = Number(options.duration || 6);
      requestBody.ratio = options.ratio || '9:16';
    } else {
      requestBody.size = options.size || `${Number(options.width || 2000)}x${Number(options.height || 2000)}`;
    }
    const response = await fetch(profile.endpoint, {
      method: mapping.method || 'POST',
      headers: {
        'content-type': 'application/json',
        ...(providerAuthHeaders(profile)),
        ...(mapping.headers || {})
      },
      body: JSON.stringify(requestBody),
      signal: AbortSignal.timeout(Math.min(Number(profile.limits?.timeoutMs || 300000), 600000))
    });
    const text = await response.text();
    let data;
    try { data = text ? JSON.parse(text) : {}; } catch (_error) { throw new Error('provider_invalid_json'); }
    if (!response.ok) throw new Error(`provider_http_${response.status}:${data.error || text.slice(0, 200)}`);
    const responseMapping = profile.responseMapping || {};
    let outputUrl = pathValue(data, responseMapping.urlPath || 'data.0.url');
    let outputBase64 = pathValue(data, responseMapping.base64Path || 'data.0.b64_json');
    let pollUrl = pathValue(data, responseMapping.pollUrlPath || 'poll_url');
    if (!outputUrl && !outputBase64 && pollUrl) {
      const maxPolls = Math.max(1, Number(profile.limits?.maxPolls || 60));
      for (let attempt = 0; attempt < maxPolls; attempt += 1) {
        await new Promise((resolve) => setTimeout(resolve, Math.max(500, Number(profile.limits?.pollIntervalMs || 2000))));
        const pollResponse = await fetch(pollUrl, { headers: providerAuthHeaders(profile), signal: AbortSignal.timeout(30000) });
        if (!pollResponse.ok) throw new Error(`provider_poll_http_${pollResponse.status}`);
        data = await pollResponse.json();
        outputUrl = pathValue(data, responseMapping.urlPath || 'data.0.url') || pathValue(data, 'output.0.url') || pathValue(data, 'url');
        outputBase64 = pathValue(data, responseMapping.base64Path || 'data.0.b64_json') || pathValue(data, 'output.0.b64_json');
        pollUrl = pathValue(data, responseMapping.pollUrlPath || 'poll_url') || pollUrl;
        const status = String(pathValue(data, responseMapping.statusPath || 'status') || '').toLowerCase();
        if (outputUrl || outputBase64) break;
        if (['failed', 'error', 'cancelled', 'canceled'].includes(status)) throw new Error(`provider_job_${status}`);
        if (!['queued', 'pending', 'processing', 'running', ''].includes(status)) break;
      }
    }
    const base = path.join(dirs.generatedMedia, runId, `${operationId}-cloud`);
    ensureDir(path.dirname(base));
    let outputPath;
    if (outputBase64) {
      const clean = String(outputBase64).replace(/^data:[^,]+,/, '');
      outputPath = `${base}${definition.targetKind === 'video' ? '.mp4' : '.png'}`;
      fs.writeFileSync(outputPath, Buffer.from(clean, 'base64'));
    } else if (outputUrl) {
      outputPath = await downloadProviderResult(outputUrl, providerAuthHeaders(profile), base);
    } else {
      throw new Error('provider_result_missing');
    }
    const artifact = definition.targetKind === 'video'
      ? mediaEngine.videoMetadata(outputPath)
      : await mediaEngine.imageMetadata(outputPath);
    return { ok: true, operationId, artifacts: [artifact], metadata: { engine: 'cloud', providerId: profile.id } };
  }

  function listMediaOperations() {
    return v4Contracts.MEDIA_OPERATION_IDS.map((operationId) => ({ operationId, ...mediaOperationDefinition(operationId) }));
  }

  function listMediaRuns() {
    return readJson(files.mediaRuns, []);
  }

  function getMediaRun(runId) {
    return listMediaRuns().find((item) => item.runId === runId) || null;
  }

  async function submitMediaRun(input = {}) {
    const operationId = String(input.operationId || '');
    const definition = mediaOperationDefinition(operationId);
    if (!definition) throw new Error('invalid_media_operation');
    const sourcePaths = resolveMediaSources(input);
    const runId = makeId('media');
    const outputDir = path.join(dirs.generatedMedia, runId);
    ensureDir(outputDir);
    const chain = input.providerId
      ? { route: { profileId: input.providerId }, profiles: [providerProfileById(input.providerId)].filter(Boolean) }
      : providerExecutionChain(definition.capability, {
        agentId: input.agentId || 'media-producer',
        projectId: input.projectId
      });
    const providerId = chain.route.profileId || '';
    let activeProviderId = providerId;
    const requestedEngine = input.engine || 'auto';
    const engine = requestedEngine === 'auto' ? (chain.profiles.length ? 'cloud' : 'local') : requestedEngine;
    const controller = new AbortController();
    mediaAbortControllers.set(runId, controller);
    const run = {
      runId,
      operationId,
      status: 'running',
      progress: 1,
      engine,
      providerId,
      projectId: input.projectId || '',
      marketplace: input.marketplace || '',
      sourceAssets: input.assetIds || [],
      sourcePaths,
      options: input.options || {},
      artifacts: [],
      errors: [],
      startedAt: new Date().toISOString(),
      completedAt: '',
      updatedAt: new Date().toISOString()
    };
    writeJson(files.mediaRuns, [run, ...listMediaRuns().filter((item) => item.runId !== runId)].slice(0, 2000));
    try {
      let result;
      if (engine === 'cloud') {
        if (!chain.profiles.length) throw new Error('provider_not_configured');
        let lastError = null;
        for (const profile of chain.profiles) {
          try {
            result = await runCloudMediaOperation(profile, operationId, sourcePaths, input.options || {}, runId);
            activeProviderId = profile.id;
            break;
          } catch (error) {
            lastError = error;
            logActivity({ type: 'provider.fallback', providerId: profile.id, capability: definition.capability, error: error.message });
          }
        }
        if (!result && requestedEngine === 'auto') {
          logActivity({ type: 'provider.fallback.local', capability: definition.capability, error: lastError?.message || 'provider_execution_failed' });
          result = await mediaEngine.runMediaOperation({
            operationId,
            sourcePaths,
            outputDir,
            options: input.options || {},
            signal: controller.signal
          });
          activeProviderId = '';
        } else if (!result) {
          throw lastError || new Error('provider_execution_failed');
        }
      } else {
        result = await mediaEngine.runMediaOperation({
          operationId,
          sourcePaths,
          outputDir,
          options: input.options || {},
          signal: controller.signal,
          onProgress: (progress) => {
            const current = getMediaRun(runId);
            if (!current || current.status !== 'running') return;
            writeJson(files.mediaRuns, [{ ...current, progress: Math.min(95, current.progress + 5), progressDetail: progress, updatedAt: new Date().toISOString() }, ...listMediaRuns().filter((item) => item.runId !== runId)].slice(0, 2000));
          }
        });
      }
      const imported = importAssets({
        filePaths: result.artifacts.map((item) => item.path),
        projectId: input.projectId || '',
        marketplace: input.marketplace || '',
        module: input.module || (definition.targetKind === 'video' ? 'video' : 'image'),
        usage: 'generated-media',
        tags: `generated,${operationId}`
      });
      const assetByPath = new Map((imported.imported || []).map((asset) => [asset.originalPath, asset]));
      const artifacts = result.artifacts.map((item) => ({
        ...item,
        assetId: assetByPath.get(item.path)?.assetId || '',
        localPath: item.path
      }));
      const completed = {
        ...run,
        status: 'completed',
        progress: 100,
        providerId: activeProviderId,
        artifacts,
        metadata: result.metadata,
        cost: result.cost || { amount: 0, currency: 'USD' },
        completedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      writeJson(files.mediaRuns, [completed, ...listMediaRuns().filter((item) => item.runId !== runId)].slice(0, 2000));
      writeJson(files.generatorRuns, [{
        runId: makeId('generator'),
        mediaRunId: runId,
        operationId,
        engine,
        providerId: activeProviderId,
        status: 'completed',
        artifacts: artifacts.map((item) => item.path),
        createdAt: new Date().toISOString()
      }, ...readJson(files.generatorRuns, [])].slice(0, 2000));
      if (activeProviderId) {
        recordUsage({
          providerId: activeProviderId,
          capability: definition.capability,
          runId,
          projectId: input.projectId || '',
          amount: Number(result.cost?.amount || 0),
          currency: result.cost?.currency || 'USD'
        });
      }
      logActivity({ type: 'media.completed', runId, operationId, engine, providerId: activeProviderId, artifacts: artifacts.length });
      return completed;
    } catch (error) {
      const failed = {
        ...run,
        status: error.code === 'media_run_cancelled' || error.message === 'media_run_cancelled' ? 'cancelled' : 'failed',
        errors: [{ code: error.code || 'media_failed', message: error.message, details: error.details || '' }],
        completedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      writeJson(files.mediaRuns, [failed, ...listMediaRuns().filter((item) => item.runId !== runId)].slice(0, 2000));
      logActivity({ type: 'media.failed', runId, operationId, error: error.message });
      throw error;
    } finally {
      mediaAbortControllers.delete(runId);
    }
  }

  function cancelMediaRun(runId) {
    const controller = mediaAbortControllers.get(runId);
    if (controller) controller.abort();
    const run = getMediaRun(runId);
    if (!run) throw new Error('media_run_not_found');
    const cancelled = { ...run, status: 'cancelled', completedAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    writeJson(files.mediaRuns, [cancelled, ...listMediaRuns().filter((item) => item.runId !== runId)].slice(0, 2000));
    return cancelled;
  }

  function deleteMediaRun(runId) {
    const run = getMediaRun(runId);
    if (!run) throw new Error('media_run_not_found');
    for (const artifact of run.artifacts || []) {
      if (artifact.assetId) {
        try { deleteAsset(artifact.assetId); } catch (_error) { /* Continue cleaning remaining artifacts. */ }
      }
    }
    const outputDir = path.resolve(dirs.generatedMedia, runId);
    const root = path.resolve(dirs.generatedMedia);
    if (outputDir.startsWith(root + path.sep) && fs.existsSync(outputDir)) {
      fs.rmSync(outputDir, { recursive: true, force: true });
    }
    writeJson(files.mediaRuns, listMediaRuns().filter((item) => item.runId !== runId));
    writeJson(files.generatorRuns, readJson(files.generatorRuns, []).filter((item) => item.mediaRunId !== runId));
    logActivity({ type: 'media.deleted', runId });
    return { ok: true, runId };
  }

  function listAgents() {
    return readJson(files.agents, v4Contracts.DEFAULT_AGENTS);
  }

  function saveAgent(input = {}) {
    const agents = listAgents();
    const id = safeId(input.id) ? input.id : makeId('agent');
    const existing = agents.find((item) => item.id === id) || {};
    const capabilities = Array.isArray(input.capabilities)
      ? input.capabilities
      : [input.capability || existing.capability || 'reasoning'];
    const agent = {
      ...existing,
      id,
      name: safeString(input.name || existing.name) || '未命名 Agent',
      role: safeString(input.role || existing.role) || 'specialist',
      description: safeString(input.description || existing.description),
      capability: capabilities.find((item) => v4Contracts.CAPABILITY_IDS.includes(item)) || 'reasoning',
      capabilities: capabilities.filter((item, index, list) => v4Contracts.CAPABILITY_IDS.includes(item) && list.indexOf(item) === index),
      skills: Array.isArray(input.skills) ? input.skills.map(safeString).filter(Boolean) : (existing.skills || []),
      tools: Array.isArray(input.tools) ? input.tools.map(safeString).filter(Boolean) : (existing.tools || []),
      permissions: Array.isArray(input.permissions) ? input.permissions.map(safeString).filter(Boolean) : (existing.permissions || []),
      memoryScope: safeString(input.memoryScope || existing.memoryScope) || 'project',
      maxConcurrency: Math.max(1, Number(input.maxConcurrency || existing.maxConcurrency || 1)),
      budget: input.budget && typeof input.budget === 'object' ? input.budget : (existing.budget || { amount: 0, currency: 'USD', period: 'run' }),
      retries: Math.max(0, Number(input.retries ?? existing.retries ?? 1)),
      outputSchema: input.outputSchema && typeof input.outputSchema === 'object' ? input.outputSchema : (existing.outputSchema || {}),
      version: Math.max(1, Number(existing.version || 1) + (existing.id ? 1 : 0)),
      enabled: input.enabled !== false,
      createdAt: existing.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    writeJson(files.agents, [agent, ...agents.filter((item) => item.id !== id)].slice(0, 500));
    logActivity({ type: 'agent.saved', agentId: id, version: agent.version });
    return agent;
  }

  function deleteAgent(id) {
    const used = listAgentFlows().filter((flow) => JSON.stringify(flow.nodes || []).includes(id));
    if (used.length) return { ok: false, code: 'agent_in_use', flows: used.map((item) => item.id) };
    writeJson(files.agents, listAgents().filter((item) => item.id !== id));
    logActivity({ type: 'agent.deleted', agentId: id });
    return { ok: true, agentId: id };
  }

  function listAgentFlows() {
    return readJson(files.agentFlows, v4Contracts.DEFAULT_AGENT_FLOWS);
  }

  function validateAgentFlow(flow, options) {
    return v4Contracts.validateAgentFlow(flow, options);
  }

  function saveAgentFlow(input = {}) {
    const flows = listAgentFlows();
    const id = safeId(input.id) ? input.id : makeId('flow');
    const existing = flows.find((item) => item.id === id) || {};
    const flow = v4Contracts.normalizeAgentFlow({
      ...existing,
      ...input,
      id,
      version: existing.version || input.version || 1,
      createdAt: existing.createdAt
    });
    const validation = validateAgentFlow(flow, { requireVerifier: input.requireVerifier !== false });
    if (!validation.valid && input.allowInvalid !== true) {
      const error = new Error('invalid_agent_flow');
      error.details = validation;
      throw error;
    }
    writeJson(files.agentFlows, [flow, ...flows.filter((item) => item.id !== id)].slice(0, 500));
    logActivity({ type: 'agent_flow.saved', flowId: id, version: flow.version });
    return { flow, validation };
  }

  function publishAgentFlow(id) {
    const flows = listAgentFlows();
    const existing = flows.find((item) => item.id === id);
    if (!existing) throw new Error('agent_flow_not_found');
    const validation = validateAgentFlow(existing, { requireVerifier: true });
    if (!validation.valid) {
      const error = new Error('invalid_agent_flow');
      error.details = validation;
      throw error;
    }
    const published = {
      ...existing,
      status: 'published',
      version: Number(existing.version || 1) + (existing.status === 'published' ? 1 : 0),
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    writeJson(files.agentFlows, [published, ...flows.filter((item) => item.id !== id)]);
    logActivity({ type: 'agent_flow.published', flowId: id, version: published.version });
    return published;
  }

  function listWorkflowRuns() {
    return readJson(files.workflowRuns, []);
  }

  function getWorkflowRun(runId) {
    return listWorkflowRuns().find((item) => item.runId === runId) || null;
  }

  function saveWorkflowRun(run) {
    const normalized = v4Contracts.normalizeWorkflowRun(run);
    writeJson(files.workflowRuns, [normalized, ...listWorkflowRuns().filter((item) => item.runId !== normalized.runId)].slice(0, 2000));
    if (normalized.verification) {
      const verification = {
        id: makeId('verification'),
        runId: normalized.runId,
        ...normalized.verification,
        createdAt: new Date().toISOString()
      };
      writeJson(files.verificationResults, [verification, ...readJson(files.verificationResults, [])].slice(0, 5000));
    }
    return normalized;
  }

  async function submitWorkflowRun(input = {}) {
    const flows = listAgentFlows();
    const flow = flows.find((item) => item.id === input.flowId)
      || flows.find((item) => input.mediaOperation && item.id === 'default-media-flow')
      || flows.find((item) => item.id === 'default-business-flow')
      || flows[0];
    if (!flow) throw new Error('agent_flow_not_found');
    const validation = validateAgentFlow(flow, { requireVerifier: true });
    if (!validation.valid) {
      const error = new Error('invalid_agent_flow');
      error.details = validation;
      throw error;
    }
    let task;
    if (input.mediaOperation) {
      const mediaRun = await submitMediaRun({
        ...input,
        engine: input.engine || 'local',
        options: input.options || input.mediaOptions || {}
      });
      const definition = mediaOperationDefinition(input.mediaOperation);
      task = {
        taskId: mediaRun.runId,
        resolvedModule: definition.targetKind === 'video' ? 'video' : 'image',
        marketplace: input.marketplace || '',
        status: mediaRun.status,
        summary: `${definition.label}完成，生成 ${(mediaRun.artifacts || []).length} 个真实文件。`,
        artifacts: mediaRun.artifacts || [],
        actions: [{ priority: 'P1', text: '检查真实产物并在素材库中引用。' }],
        missingData: [],
        errors: mediaRun.errors || [],
        createdAt: mediaRun.startedAt
      };
    } else {
      task = submitTask({
        ...input,
        module: input.module || 'assistant'
      });
    }
    const operationMode = input.mediaOperation ? mediaOperationDefinition(input.mediaOperation) : null;
    const route = resolveProviderRoute(input.capability || (operationMode ? operationMode.capability : input.module === 'image' || input.module === 'video' ? 'image' : 'reasoning'), {
      agentId: input.agentId || 'orchestrator',
      projectId: input.projectId
    });
    const checks = [
      { code: 'task_completed', status: task.status === 'completed' ? 'passed' : 'failed', message: task.summary || task.status },
      { code: 'artifact_present', status: (task.artifacts || []).length ? 'passed' : 'failed', message: `${(task.artifacts || []).length} artifact(s)` },
      { code: 'provider_resolved', status: route.profileId ? 'passed' : 'warning', message: route.profileId || '使用本地规则或未配置 Provider' }
    ];
    const verification = {
      status: checks.some((item) => item.status === 'failed') ? 'failed' : 'passed',
      checks,
      verifiedBy: 'evidence-verifier'
    };
    const run = saveWorkflowRun({
      runId: makeId('run'),
      conversationId: input.conversationId || '',
      projectId: input.projectId || '',
      marketplace: input.marketplace || task.marketplace || '',
      module: task.resolvedModule || input.module || 'assistant',
      intent: input.intent || input.message || task.summary || '',
      sourceMediaType: input.sourceMediaType || '',
      targetMediaType: input.targetMediaType || '',
      mediaOperation: input.mediaOperation || '',
      flowId: flow.id,
      flowVersion: flow.version,
      agentId: input.agentId || 'orchestrator',
      agentVersion: (listAgents().find((item) => item.id === (input.agentId || 'orchestrator')) || {}).version || 1,
      providerRouteSnapshot: route,
      inputAssets: Array.isArray(input.inputAssets) ? input.inputAssets : [],
      agentSteps: [
        { agentId: 'orchestrator', role: 'planner', status: 'completed', summary: `选择流程 ${flow.name}` },
        { agentId: input.agentId || 'business-analyst', role: 'specialist', status: 'completed', summary: task.summary },
        { agentId: 'evidence-verifier', role: 'verifier', status: verification.status, summary: `${checks.length} checks` }
      ],
      toolRuns: task.toolRuns || [],
      artifacts: task.artifacts || [],
      verification,
      missingData: task.missingData || [],
      actions: task.actions || [],
      approval: { status: task.approvalStatus || 'not_required' },
      cost: { amount: 0, currency: 'USD', estimated: true },
      errors: task.errors || [],
      status: verification.status === 'failed' ? 'failed' : 'completed',
      progress: 100,
      startedAt: task.createdAt,
      completedAt: new Date().toISOString()
    });
    logActivity({ type: 'workflow.completed', runId: run.runId, flowId: flow.id, status: run.status });
    return run;
  }

  function deleteDataImport(id) {
    writeJson(files.dataImports, listDataImports().filter((item) => item.importId !== id));
    logActivity({ type: 'data.import.deleted', id });
    return { ok: true };
  }

  function listAssets(filters = {}) {
    const assets = readJson(files.assets, []);
    return assets.filter((asset) => {
      if (filters.marketplace && asset.marketplace && asset.marketplace !== filters.marketplace) return false;
      if (filters.projectId && asset.projectId && asset.projectId !== filters.projectId) return false;
      if (filters.module && asset.module && asset.module !== filters.module) return false;
      if (filters.kind && asset.kind !== filters.kind) return false;
      if (filters.asin && asset.asin && String(asset.asin).toUpperCase() !== String(filters.asin).toUpperCase()) return false;
      if (filters.tag && !(asset.tags || []).includes(filters.tag)) return false;
      return true;
    });
  }

  function getAsset(assetId) {
    return readJson(files.assets, []).find((asset) => asset.assetId === assetId) || null;
  }

  function getAssetFileInfo(assetId) {
    const asset = getAsset(assetId);
    if (!asset || !asset.localPath) return null;
    const root = path.resolve(dirs.assetFiles);
    const filePath = path.resolve(asset.localPath);
    const relative = path.relative(root, filePath);
    if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) return null;
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return null;
    return { asset, filePath, contentType: mediaContentType(filePath) };
  }

  function copyAssetFile(sourcePath, assetId) {
    if (!sourcePath || !fs.existsSync(sourcePath)) return '';
    const stat = fs.statSync(sourcePath);
    if (stat.isDirectory()) return '';
    const ext = path.extname(sourcePath);
    const target = path.join(dirs.assetFiles, `${assetId}${ext}`);
    ensureDir(path.dirname(target));
    fs.copyFileSync(sourcePath, target);
    return target;
  }

  function normalizeTags(value) {
    if (Array.isArray(value)) return value.map(safeString).filter(Boolean);
    return String(value || '').split(/[,，\s]+/).map(safeString).filter(Boolean);
  }

  function importAssets(input = {}) {
    const current = readJson(files.assets, []);
    const now = new Date().toISOString();
    const filePaths = Array.isArray(input.filePaths) ? input.filePaths : [];
    const links = Array.isArray(input.links) ? input.links : [];
    const manualItems = Array.isArray(input.assets) ? input.assets : [];
    const created = [];
    const errors = [];

    for (const filePath of filePaths) {
      let sourcePath;
      try {
        sourcePath = assertSafeLocalPath(filePath);
      } catch (_error) {
        errors.push({ path: safeString(filePath), message: '路径必须是本机绝对路径，且不能包含 .. 路径段。' });
        continue;
      }
      const assetId = makeId('asset');
      let exists = false;
      let stat = null;
      try {
        exists = fs.existsSync(sourcePath);
        stat = exists ? fs.statSync(sourcePath) : null;
      } catch (error) {
        errors.push({ path: sourcePath, message: `无法读取路径：${error.message}` });
        continue;
      }
      if (!exists) {
        errors.push({ path: sourcePath, message: '文件或文件夹不存在。' });
        continue;
      }
      if (!stat.isDirectory() && !stat.isFile()) {
        errors.push({ path: sourcePath, message: '该路径不是可导入的文件或文件夹。' });
        continue;
      }
      const kind = stat.isDirectory() ? 'folder' : mediaKind(sourcePath);
      let localPath = '';
      if (kind !== 'folder') {
        try {
          localPath = copyAssetFile(sourcePath, assetId);
        } catch (error) {
          errors.push({ path: sourcePath, message: `复制文件失败：${error.message}` });
          continue;
        }
      }
      created.push({
        assetId,
        name: path.basename(sourcePath) || sourcePath,
        kind,
        sourceType: 'file',
        originalPath: sourcePath,
        localPath,
        exists: true,
        sizeBytes: stat.isFile() ? stat.size : 0,
        projectId: input.projectId || '',
        projectName: input.projectName || '',
        marketplace: input.marketplace || '',
        module: input.module || '',
        asin: input.asin || '',
        sku: input.sku || '',
        tags: normalizeTags(input.tags),
        usage: input.usage || '',
        notes: input.notes || '',
        importedAt: now,
        updatedAt: now
      });
    }

    for (const url of links) {
      const assetId = makeId('asset');
      const linkKind = mediaKind(safeString(url).split('?')[0]);
      created.push({
        assetId,
        name: input.name || safeString(url).replace(/^https?:\/\//, '').slice(0, 80),
        kind: linkKind === 'file' ? 'link' : linkKind,
        sourceType: 'link',
        url: safeString(url),
        projectId: input.projectId || '',
        projectName: input.projectName || '',
        marketplace: input.marketplace || '',
        module: input.module || '',
        asin: input.asin || '',
        sku: input.sku || '',
        tags: normalizeTags(input.tags),
        usage: input.usage || '',
        notes: input.notes || '',
        importedAt: now,
        updatedAt: now
      });
    }

    for (const item of manualItems) {
      const assetId = item.assetId || makeId('asset');
      created.push({
        assetId,
        name: item.name || item.url || item.originalPath || assetId,
        kind: item.kind || mediaKind(item.originalPath || item.name || ''),
        sourceType: item.sourceType || 'manual',
        originalPath: item.originalPath || '',
        localPath: item.localPath || '',
        url: item.url || '',
        projectId: item.projectId || input.projectId || '',
        projectName: item.projectName || input.projectName || '',
        marketplace: item.marketplace || input.marketplace || '',
        module: item.module || input.module || '',
        asin: item.asin || input.asin || '',
        sku: item.sku || input.sku || '',
        tags: normalizeTags(item.tags || input.tags),
        usage: item.usage || input.usage || '',
        notes: item.notes || input.notes || '',
        importedAt: item.importedAt || now,
        updatedAt: now
      });
    }

    writeJson(files.assets, [...created, ...current].slice(0, 3000));
    logActivity({ type: 'assets.imported', count: created.length, marketplace: input.marketplace || '', module: input.module || '' });
    return { imported: created, errors, assets: listAssets({ marketplace: input.marketplace || '' }) };
  }

  function uploadAssets(input = {}) {
    const current = readJson(files.assets, []);
    const now = new Date().toISOString();
    const filesToUpload = Array.isArray(input.files) ? input.files : [];
    const created = [];
    const errors = [];
    for (const file of filesToUpload) {
      const name = path.basename(safeString(file && file.name) || 'upload.bin');
      const dataUrl = safeString(file && file.dataUrl);
      const match = dataUrl.match(/^data:([^;,]+)?;base64,([a-z0-9+/=\s]+)$/i);
      if (!match) {
        errors.push({ path: name, message: '上传数据格式无效。' });
        continue;
      }
      let buffer;
      try {
        buffer = Buffer.from(match[2].replace(/\s+/g, ''), 'base64');
      } catch (_error) {
        errors.push({ path: name, message: '上传内容无法解码。' });
        continue;
      }
      if (!buffer.length) {
        errors.push({ path: name, message: '上传文件为空。' });
        continue;
      }
      if (buffer.length > MAX_ASSET_UPLOAD_BYTES) {
        errors.push({ path: name, message: `单个上传文件不能超过 ${Math.round(MAX_ASSET_UPLOAD_BYTES / 1024 / 1024)} MB。` });
        continue;
      }
      const assetId = makeId('asset');
      const target = path.join(dirs.assetFiles, `${assetId}${path.extname(name).toLowerCase()}`);
      try {
        ensureDir(path.dirname(target));
        fs.writeFileSync(target, buffer);
      } catch (error) {
        errors.push({ path: name, message: `保存上传文件失败：${error.message}` });
        continue;
      }
      created.push({
        assetId,
        name,
        kind: mediaKind(name),
        sourceType: 'upload',
        originalPath: '',
        localPath: target,
        exists: true,
        sizeBytes: buffer.length,
        projectId: input.projectId || '',
        projectName: input.projectName || '',
        marketplace: input.marketplace || '',
        module: input.module || '',
        asin: input.asin || '',
        sku: input.sku || '',
        tags: normalizeTags(input.tags),
        usage: input.usage || 'drag-drop',
        notes: input.notes || '',
        importedAt: now,
        updatedAt: now
      });
    }
    if (created.length) writeJson(files.assets, [...created, ...current].slice(0, 3000));
    logActivity({ type: 'assets.uploaded', count: created.length, marketplace: input.marketplace || '', module: input.module || '' });
    return { imported: created, errors, assets: listAssets({ marketplace: input.marketplace || '' }) };
  }

  function deleteAsset(assetId) {
    const assets = readJson(files.assets, []);
    const asset = assets.find((item) => item.assetId === assetId);
    writeJson(files.assets, assets.filter((item) => item.assetId !== assetId));
    let removedFile = false;
    const localPath = asset?.localPath || '';
    if (localPath) {
      const root = path.resolve(dirs.assetFiles);
      const resolved = path.resolve(localPath);
      if (resolved.startsWith(root + path.sep) && fs.existsSync(resolved)) {
        try {
          fs.unlinkSync(resolved);
          removedFile = true;
        } catch (error) {
          logActivity({ type: 'asset.file_remove_failed', assetId, error: error.message });
        }
      }
    }
    logActivity({ type: 'asset.deleted', assetId, removedFile });
    return { ok: true, assetId, localPath, removedFile };
  }

  function assetsForAssistant(input = {}, linkInfo = { paths: [], links: [] }) {
    const all = readJson(files.assets, []);
    const selectedIds = Array.isArray(input.assetIds) ? input.assetIds : [];
    const selected = all.filter((asset) => selectedIds.includes(asset.assetId));
    const latest = input.useLatestAssets ? all.slice(0, Number(input.assetLimit || 8)) : [];
    const fromMention = all.filter((asset) => {
      const content = `${input.message || ''} ${asset.name || ''}`;
      return asset.asin && String(input.message || '').toUpperCase().includes(String(asset.asin).toUpperCase())
        || (asset.tags || []).some((tag) => String(input.message || '').includes(tag))
        || String(input.message || '').includes(asset.name || '__never__');
    }).slice(0, 8);
    const transient = [
      ...(linkInfo.paths || []).map((filePath) => ({ assetId: `transient-${filePath}`, name: path.basename(filePath), kind: mediaKind(filePath), sourceType: 'message_path', originalPath: filePath })),
      ...(linkInfo.links || []).map((url) => ({ assetId: `transient-${url}`, name: url, kind: 'link', sourceType: 'message_link', url }))
    ];
    const merged = [...selected, ...latest, ...fromMention, ...transient];
    const seen = new Set();
    return merged.filter((asset) => {
      const key = asset.assetId || asset.originalPath || asset.url;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, Number(input.assetLimit || 12));
  }

  function listProjects() {
    return readJson(files.projects, []);
  }

  function saveProject(input = {}) {
    const projects = listProjects();
    const id = input.id || makeId('project');
    const existing = projects.find((item) => item.id === id) || {};
    const marketplace = marketplaceByCode(input.marketplace || existing.marketplace);
    const now = new Date().toISOString();
    const project = {
      ...existing,
      id,
      name: input.name || input.projectName || existing.name || '未命名项目',
      marketplace: marketplace?.code || existing.marketplace || '',
      marketplaceId: marketplace?.marketplaceId || existing.marketplaceId || '',
      region: marketplace?.region || existing.region || '',
      currency: marketplace?.currency || existing.currency || '',
      language: marketplace?.language || existing.language || '',
      dataSource: input.dataSource || existing.dataSource || 'manual',
      connectorId: input.connectorId || existing.connectorId || '',
      notes: input.notes || existing.notes || '',
      updatedAt: now,
      createdAt: existing.createdAt || now
    };
    writeJson(files.projects, [project, ...projects.filter((item) => item.id !== id)].slice(0, 500));
    logActivity({ type: 'project.saved', projectId: id, marketplace: project.marketplace });
    return project;
  }

  function deleteProject(id) {
    writeJson(files.projects, listProjects().filter((item) => item.id !== id));
    logActivity({ type: 'project.deleted', projectId: id });
    return { ok: true, projectId: id };
  }

  function redactSecrets(value, depth = 0) {
    if (depth > 12) return value;
    if (Array.isArray(value)) return value.map((item) => redactSecrets(item, depth + 1));
    if (value && typeof value === 'object') {
      const out = {};
      for (const [key, val] of Object.entries(value)) {
        out[key] = SENSITIVE_KEY_PATTERN.test(key) ? '[redacted]' : redactSecrets(val, depth + 1);
      }
      return out;
    }
    return value;
  }

  function listProjectPackages() {
    ensureDir(dirs.projectPackages);
    return fs.readdirSync(dirs.projectPackages)
      .filter((name) => name.endsWith('.json'))
      .map((name) => {
        try {
          const data = readJson(path.join(dirs.projectPackages, name), null);
          if (!data) return null;
          return {
            packageId: data.packageId,
            projectName: data.project?.name || data.manifest?.projectName || '',
            marketplace: data.project?.marketplace || '',
            fileName: name,
            filePath: path.join(dirs.projectPackages, name),
            createdAt: data.createdAt || '',
            counts: data.manifest?.counts || {}
          };
        } catch (_error) {
          return null;
        }
      })
      .filter(Boolean)
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  function exportProjectPackage(projectId) {
    const project = listProjects().find((item) => item.id === projectId);
    if (!project) throw new Error('project_not_found');
    const tasks = listTasks().filter((item) => item.projectId === projectId);
    const listingDrafts = listListingDrafts().filter((item) => item.projectId === projectId);
    const dataImports = listDataImports().filter((item) => item.projectId === projectId);
    const assets = listAssets().filter((item) => item.projectId === projectId);
    const packageId = makeId('pkg');
    const createdAt = new Date().toISOString();
    const pkg = {
      format: 'amazon-control-project-package',
      version: 1,
      packageId,
      createdAt,
      manifest: {
        projectId,
        projectName: project.name,
        counts: { tasks: tasks.length, listingDrafts: listingDrafts.length, dataImports: dataImports.length, assets: assets.length }
      },
      project,
      tasks: redactSecrets(tasks),
      listingDrafts: redactSecrets(listingDrafts),
      dataImports: redactSecrets(dataImports),
      assets: redactSecrets(assets.map((asset) => ({ assetId: asset.assetId, name: asset.name, kind: asset.kind, marketplace: asset.marketplace, module: asset.module, tags: asset.tags, asin: asset.asin, sku: asset.sku, url: asset.url, originalPath: asset.originalPath })))
    };
    const stamp = createdAt.replace(/[:.]/g, '-');
    const fileName = `project-${projectId}-${stamp}.json`;
    const filePath = path.join(dirs.projectPackages, fileName);
    writeJson(filePath, pkg);
    logActivity({ type: 'project_package.exported', packageId, projectId, filePath });
    return { packageId, filePath, fileName, manifest: pkg.manifest };
  }

  function importProjectPackage(filePath) {
    const safePath = assertSafeLocalPath(filePath);
    if (!fs.existsSync(safePath)) throw new Error('package_file_not_found');
    const pkg = readJson(safePath, null);
    if (!pkg || pkg.format !== 'amazon-control-project-package') throw new Error('invalid_package');
    const sourceProject = pkg.project || {};
    const newProjectId = makeId('project');
    const imported = { projects: 0, tasks: 0, listingDrafts: 0, dataImports: 0, assets: 0 };
    const project = {
      ...redactSecrets(sourceProject),
      id: newProjectId,
      name: `${sourceProject.name || '导入项目'}（导入）`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    writeJson(files.projects, [project, ...listProjects().filter((item) => item.id !== newProjectId)].slice(0, 500));
    imported.projects = 1;

    const idMap = {};
    for (const task of pkg.tasks || []) {
      const newTaskId = makeId('task');
      idMap[task.taskId] = newTaskId;
      writeJson(files.tasks, [{ ...redactSecrets(task), taskId: newTaskId, projectId: newProjectId }, ...listTasks()].slice(0, 1000));
      writeJson(path.join(dirs.results, `${newTaskId}.json`), { ...redactSecrets(task), taskId: newTaskId, projectId: newProjectId });
      imported.tasks += 1;
    }
    for (const draft of pkg.listingDrafts || []) {
      saveListingDraft({ ...redactSecrets(draft), id: makeId('listing'), projectId: newProjectId, sourceTaskId: idMap[draft.sourceTaskId] || '' });
      imported.listingDrafts += 1;
    }
    for (const imp of pkg.dataImports || []) {
      const importId = makeId('import');
      writeJson(files.dataImports, [{ ...redactSecrets(imp), importId, projectId: newProjectId }, ...listDataImports()].slice(0, 1000));
      imported.dataImports += 1;
    }
    for (const asset of pkg.assets || []) {
      const assetId = makeId('asset');
      writeJson(files.assets, [{ ...redactSecrets(asset), assetId, projectId: newProjectId, localPath: '', importedFromPackage: true }, ...listAssets()].slice(0, 2000));
      imported.assets += 1;
    }
    logActivity({ type: 'project_package.imported', packageId: pkg.packageId, projectId: newProjectId, imported });
    return { ok: true, projectId: newProjectId, project, imported };
  }

  function listApprovals() {
    return readJson(files.approvals, []);
  }

  function listActionDrafts() {
    return readJson(files.actionDrafts, []);
  }

  function listExecutionQueue() {
    return readJson(files.executionQueue, []);
  }

  function listSkills() {
    return readJson(files.skills, []);
  }

  function parseSkillFrontmatter(content) {
    const match = String(content || '').match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*/);
    if (!match) return {};
    const result = {};
    for (const line of match[1].split(/\r?\n/)) {
      const field = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
      if (!field) continue;
      result[field[1]] = field[2].replace(/^["']|["']$/g, '').trim();
    }
    return result;
  }

  function discoverSkills(input = {}) {
    const roots = (Array.isArray(input.roots) ? input.roots : [
      process.env.AMAZON_CONTROL_SKILLS_DIR,
      process.env.CODEX_HOME ? path.join(process.env.CODEX_HOME, 'skills') : '',
      'D:\\CodexData\\.codex\\skills'
    ]).filter(Boolean).map((item) => path.resolve(item));
    const discovered = [];
    const visited = new Set();
    function walk(dir, depth) {
      if (depth > 3 || !fs.existsSync(dir)) return;
      let real;
      try { real = fs.realpathSync(dir); } catch (_error) { return; }
      if (visited.has(real)) return;
      visited.add(real);
      let entries;
      try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (_error) { return; }
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isSymbolicLink()) continue;
        if (entry.isDirectory()) {
          walk(fullPath, depth + 1);
          continue;
        }
        if (entry.name !== 'SKILL.md') continue;
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const metadata = parseSkillFrontmatter(content);
          discovered.push({
            id: path.basename(path.dirname(fullPath)),
            name: metadata.name || path.basename(path.dirname(fullPath)),
            description: metadata.description || '',
            path: fullPath,
            root: dir,
            enabled: true,
            source: 'codex-skill',
            metadata
          });
        } catch (_error) {
          // Ignore unreadable skill manifests and continue scanning.
        }
      }
    }
    roots.forEach((root) => walk(root, 0));
    const unique = [];
    const seen = new Set();
    for (const skill of discovered) {
      if (seen.has(skill.id)) continue;
      seen.add(skill.id);
      unique.push(skill);
    }
    return unique.sort((a, b) => a.name.localeCompare(b.name));
  }

  function saveSkill(input = {}) {
    const skills = listSkills();
    const id = input.id || makeId('skill');
    const skill = {
      id,
      name: safeString(input.name) || '未命名 Skill',
      description: safeString(input.description),
      module: safeString(input.module) || 'data',
      toolIds: Array.isArray(input.toolIds) ? input.toolIds : [],
      enabled: input.enabled !== false,
      updatedAt: new Date().toISOString()
    };
    writeJson(files.skills, [skill, ...skills.filter((item) => item.id !== id)].slice(0, 500));
    logActivity({ type: 'skill.saved', skillId: id, name: skill.name });
    return skill;
  }

  function deleteSkill(id) {
    writeJson(files.skills, listSkills().filter((item) => item.id !== id));
    logActivity({ type: 'skill.deleted', skillId: id });
    return { ok: true, skillId: id };
  }

  function listTools() {
    const stored = readJson(files.toolRegistry, []);
    return Array.isArray(stored) && stored.length ? stored : DEFAULT_TOOL_REGISTRY;
  }

  function saveTool(input = {}) {
    const tools = listTools();
    const id = input.id || makeId('tool');
    const tool = {
      id,
      name: safeString(input.name) || '未命名工具',
      kind: safeString(input.kind) || 'builtin',
      module: safeString(input.module) || 'data',
      description: safeString(input.description),
      inputSchema: Array.isArray(input.inputSchema) ? input.inputSchema : [],
      outputSchema: Array.isArray(input.outputSchema) ? input.outputSchema : [],
      risk: ['low', 'medium', 'high'].includes(input.risk) ? input.risk : 'low',
      approvalRequired: !!input.approvalRequired,
      targetModules: Array.isArray(input.targetModules) ? input.targetModules : [],
      status: 'available',
      updatedAt: new Date().toISOString()
    };
    writeJson(files.toolRegistry, [tool, ...tools.filter((item) => item.id !== id)].slice(0, 500));
    logActivity({ type: 'tool.saved', toolId: id, name: tool.name });
    return tool;
  }

  function deleteTool(id) {
    writeJson(files.toolRegistry, listTools().filter((item) => item.id !== id));
    logActivity({ type: 'tool.deleted', toolId: id });
    return { ok: true, toolId: id };
  }

  function listToolRuns() {
    return readJson(files.toolRuns, []);
  }

  function listVerificationResults(filters = {}) {
    return readJson(files.verificationResults, []).filter((item) => {
      if (filters.runId && item.runId !== filters.runId) return false;
      if (filters.status && item.status !== filters.status) return false;
      return true;
    });
  }

  function runTool(input = {}) {
    const tool = listTools().find((item) => item.id === input.toolId);
    if (!tool) throw new Error('tool_not_found');
    const approvalRequired = tool.approvalRequired || tool.risk === 'high';
    const task = submitTask({
      ...input,
      module: tool.module || input.module || 'auto',
      message: input.message || tool.description,
      permissionMode: input.permissionMode || (approvalRequired ? 'approval' : undefined)
    });
    const runs = listToolRuns();
    const run = {
      runId: makeId('toolrun'),
      toolId: tool.id,
      toolName: tool.name,
      taskId: task.taskId,
      status: 'completed',
      summary: task.summary,
      createdAt: new Date().toISOString()
    };
    writeJson(files.toolRuns, [run, ...runs].slice(0, 500));
    logActivity({ type: 'tool.ran', toolId: tool.id, taskId: task.taskId });
    return { ...task, toolRun: run.runId };
  }

  function listListingDrafts() {
    return readJson(files.listingDrafts, []);
  }

  function getListingDraft(id) {
    return listListingDrafts().find((item) => item.id === id) || null;
  }

  function saveListingDraft(input = {}) {
    const drafts = listListingDrafts();
    const id = input.id || makeId('listing');
    const existing = drafts.find((item) => item.id === id) || {};
    const status = ['draft', 'needs_review', 'approved', 'locked', 'submitted', 'archived'].includes(input.status)
      ? input.status
      : (existing.status || 'draft');
    const draft = {
      id,
      projectId: input.projectId ?? existing.projectId ?? '',
      marketplace: input.marketplace ?? existing.marketplace ?? '',
      marketplaceId: input.marketplaceId ?? existing.marketplaceId ?? '',
      currency: input.currency ?? existing.currency ?? '',
      language: input.language ?? existing.language ?? '',
      sku: safeString(input.sku ?? existing.sku),
      asin: safeString(input.asin ?? existing.asin),
      title: safeString(input.title ?? existing.title),
      bullets: Array.isArray(input.bullets) ? input.bullets : (existing.bullets || []),
      description: safeString(input.description ?? existing.description),
      searchTerms: Array.isArray(input.searchTerms) ? input.searchTerms : (existing.searchTerms || []),
      price: input.price != null ? number(input.price) : (existing.price ?? ''),
      quantity: input.quantity != null ? number(input.quantity) : (existing.quantity ?? ''),
      condition: safeString(input.condition) || existing.condition || 'new',
      sourceTaskId: input.sourceTaskId ?? existing.sourceTaskId ?? '',
      status,
      createdAt: existing.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    writeJson(files.listingDrafts, [draft, ...drafts.filter((item) => item.id !== id)].slice(0, 500));
    logActivity({ type: 'listing_draft.saved', listingDraftId: id, status });
    return draft;
  }

  function deleteListingDraft(id) {
    writeJson(files.listingDrafts, listListingDrafts().filter((item) => item.id !== id));
    logActivity({ type: 'listing_draft.deleted', listingDraftId: id });
    return { ok: true, listingDraftId: id };
  }

  function transitionListingDraft(id, nextStatus) {
    const draft = getListingDraft(id);
    if (!draft) throw new Error('listing_draft_not_found');
    const allowed = LISTING_DRAFT_TRANSITIONS[draft.status] || [];
    if (!allowed.includes(nextStatus)) throw new Error(`invalid_transition:${draft.status}->${nextStatus}`);
    return saveListingDraft({ ...draft, status: nextStatus });
  }

  function exportListingDraftCsv(id) {
    const draft = getListingDraft(id);
    if (!draft) throw new Error('listing_draft_not_found');
    const bullets = draft.bullets || [];
    const row = {
      item_sku: draft.sku || '',
      external_product_id: draft.asin || '',
      item_name: draft.title || '',
      bullet_point1: bullets[0] || '',
      bullet_point2: bullets[1] || '',
      bullet_point3: bullets[2] || '',
      bullet_point4: bullets[3] || '',
      bullet_point5: bullets[4] || '',
      product_description: draft.description || '',
      generic_keywords: (draft.searchTerms || []).join(';'),
      standard_price: draft.price || '',
      quantity: draft.quantity || '',
      condition_type: draft.condition || 'new'
    };
    const columns = Object.keys(row);
    const content = columns.join(',') + '\n' + columns.map((col) => {
      const cell = String(row[col] ?? '').replaceAll('"', '""');
      return `"${/^[=+\-@]/.test(cell) ? `'${cell}` : cell}"`;
    }).join(',');
    const filePath = path.join(dirs.exports, `listing-${id}.csv`);
    fs.writeFileSync(filePath, '\ufeff' + content, 'utf8');
    logActivity({ type: 'listing_draft.exported', listingDraftId: id, filePath });
    return { filePath, csv: content, columns, row };
  }

  function approveAction(id) {
    const approvals = listApprovals();
    const approval = approvals.find((item) => item.id === id);
    if (!approval) throw new Error('审批记录不存在');
    if (approval.status === 'approved') {
      const existing = listActionDrafts().find((item) => item.approvalId === id);
      if (existing) return existing;
    }
    approval.status = 'approved';
    approval.approvedAt = new Date().toISOString();
    writeJson(files.approvals, approvals);

    const drafts = listActionDrafts();
    const draft = {
      id: makeId('action'),
      approvalId: id,
      taskId: approval.taskId,
      module: approval.module,
      status: 'approved',
      reason: approval.reason || '',
      createdAt: new Date().toISOString()
    };
    writeJson(files.actionDrafts, [draft, ...drafts].slice(0, 500));
    logActivity({ type: 'approval.approved', approvalId: id, taskId: approval.taskId });
    return draft;
  }

  function rejectAction(id) {
    const approvals = listApprovals();
    const approval = approvals.find((item) => item.id === id);
    if (!approval) throw new Error('审批记录不存在');
    approval.status = 'rejected';
    approval.rejectedAt = new Date().toISOString();
    writeJson(files.approvals, approvals);
    logActivity({ type: 'approval.rejected', approvalId: id, taskId: approval.taskId });
    return { ok: true, status: 'rejected' };
  }

  function executeApprovedAction(draftId) {
    const drafts = listActionDrafts();
    const draft = drafts.find((item) => item.id === draftId);
    if (!draft) throw new Error('动作草稿不存在');
    if (draft.status !== 'approved') throw new Error('动作尚未批准');
    if (draft.status === 'queued') throw new Error('动作已在执行队列');
    draft.status = 'queued';
    writeJson(files.actionDrafts, drafts);
    const queue = listExecutionQueue();
    const entry = {
      id: makeId('exec'),
      actionDraftId: draftId,
      taskId: draft.taskId,
      module: draft.module,
      status: 'waiting_human',
      message: '已进入执行队列。后台写入仍需人工确认，本版本不自动提交亚马逊。',
      createdAt: new Date().toISOString()
    };
    writeJson(files.executionQueue, [entry, ...queue].slice(0, 500));
    logActivity({ type: 'action.queued', actionDraftId: draftId, taskId: draft.taskId });
    return entry;
  }

  function getCodexStatus() {
    const aiConnection = resolveAiConnection();
    return {
      available: Boolean(aiConnection),
      mode: aiConnection ? 'ai_provider' : 'context_bridge',
      provider: aiConnection ? aiConnection.connectorId : '',
      reason: aiConnection
        ? '已配置 AI 兼容接口，聊天会优先调用模型并在失败时回退本地规则。'
        : '尚未配置 AI 兼容接口。当前是 Codex 修改上下文桥接页，只生成可复制给 Codex 的任务。',
      launchHint: '在接口资产中心配置 OpenAI/AI 兼容接口后，即可启用真实模型推理；密钥只保存在本地配置。'
    };
  }

  function submitCodexTask(input = {}) {
    return submitTask({ ...input, module: 'codex', permissionMode: 'approval' });
  }

  function exportTask(taskId, format = 'json') {
    const task = getTask(taskId);
    if (!task) throw new Error('task_not_found');
    if (!safeId(taskId)) throw new Error('invalid_task_id');
    const ext = format === 'markdown' ? 'md' : format === 'csv' ? 'csv' : 'json';
    let content = JSON.stringify(task, null, 2);
    if (ext === 'md') {
      content = [`# ${MODULES[task.resolvedModule]?.title || task.resolvedModule}`, '', task.summary || '', '', '## 洞察', ...(task.insights || []).map((item) => `- ${item.label}: ${item.value}`), '', '## 动作', ...(task.actions || []).map((item) => `- ${item.priority}: ${item.text}`), '', '## 风险', ...(task.risks || []).map((item) => `- ${item}`)].join('\n');
    }
    if (ext === 'csv') {
      const table = task.artifacts?.find((item) => item.type === 'upload-table')?.data;
      const cols = table?.columns || ['taskId', 'module', 'summary'];
      const row = table?.row || { taskId: task.taskId, module: task.resolvedModule, summary: task.summary };
      content = `${cols.join(',')}\n${cols.map((col) => {
        const cell = String(row[col] ?? '').replaceAll('"', '""');
        return `"${/^[=+\-@]/.test(cell) ? `'${cell}` : cell}"`;
      }).join(',')}`;
    }
    const filePath = path.join(dirs.exports, `${taskId}.${ext}`);
    fs.writeFileSync(filePath, content, 'utf8');
    logActivity({ type: 'task.exported', taskId, format: ext, filePath });
    return { filePath, format: ext };
  }

  function getAppState() {
    ensureStore();
    return {
      modules: MODULES,
      workflowStages: WORKBENCH_PAGES,
      marketplaces: readJson(files.marketplaces, MARKETPLACES),
      connectors: readJson(files.connectors, CONNECTOR_CATALOG.map((item) => ({ id: item.connectorId, status: item.type === 'official' ? 'not_configured' : 'available', ...item }))),
      connectorCatalog: CONNECTOR_CATALOG,
      apiConnections: listApiConnections(),
      dataImports: listDataImports(),
      assets: listAssets(),
      assistantMessages: listAssistantMessages(),
      codexStatus: getCodexStatus(),
      projects: listProjects(),
      tasks: listTasks(),
      approvals: readJson(files.approvals, []),
      actionDrafts: listActionDrafts(),
      executionQueue: readJson(files.executionQueue, []),
      skills: listSkills(),
      tools: listTools(),
      toolRuns: listToolRuns(),
      listingDrafts: listListingDrafts(),
      projectPackages: listProjectPackages(),
      syncJobs: readJson(files.syncJobs, []),
      providerProfiles: listProviderProfiles(),
      providerRoutes: listProviderRoutes(),
      agents: listAgents(),
      agentFlows: listAgentFlows(),
      workflowRuns: listWorkflowRuns(),
      mediaRuns: readJson(files.mediaRuns, []),
      mediaOperations: listMediaOperations(),
      generatorRuns: readJson(files.generatorRuns, []),
      verificationResults: readJson(files.verificationResults, []),
      usageSummary: getUsageSummary({}),
      settings: readJson(files.settings, {}),
      service: { port: server?.address()?.port || null, dataDir }
    };
  }

  function sendAssetFile(req, res, fileInfo) {
    const stat = fs.statSync(fileInfo.filePath);
    const sendStream = (stream) => {
      stream.on('error', () => {
        if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.destroy();
      });
      stream.pipe(res);
    };
    const range = String(req.headers.range || '');
    const baseHeaders = {
      'Content-Type': fileInfo.contentType,
      'Cache-Control': 'no-store',
      'Accept-Ranges': 'bytes',
      'Content-Disposition': 'inline',
      'X-Content-Type-Options': 'nosniff'
    };
    if (res.amazonControlOrigin) baseHeaders['Access-Control-Allow-Origin'] = res.amazonControlOrigin;
    if (range) {
      const match = range.match(/^bytes=(\d*)-(\d*)$/);
      if (!match) {
        res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` });
        return res.end();
      }
      const start = match[1] ? Number(match[1]) : 0;
      const end = match[2] ? Number(match[2]) : stat.size - 1;
      if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end < start || start >= stat.size) {
        res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` });
        return res.end();
      }
      const safeEnd = Math.min(end, stat.size - 1);
      res.writeHead(206, {
        ...baseHeaders,
        'Content-Range': `bytes ${start}-${safeEnd}/${stat.size}`,
        'Content-Length': safeEnd - start + 1
      });
      return sendStream(fs.createReadStream(fileInfo.filePath, { start, end: safeEnd }));
    }
    res.writeHead(200, { ...baseHeaders, 'Content-Length': stat.size });
    return sendStream(fs.createReadStream(fileInfo.filePath));
  }

  function sendJson(res, code, body) {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'content-type, x-amazon-token'
    };
    if (res.amazonControlOrigin) headers['Access-Control-Allow-Origin'] = res.amazonControlOrigin;
    res.writeHead(code, headers);
    res.end(code === 204 ? '' : JSON.stringify(body));
  }

  function startServer(port = DEFAULT_PORT) {
    ensureStore();
    scheduleAutoSync();
    if (server) return server;
    server = http.createServer(async (req, res) => {
      try {
        const origin = req.headers.origin || '';
        res.amazonControlOrigin = origin && LOCAL_ORIGIN_PATTERN.test(origin) ? origin : '';
        if (origin && !res.amazonControlOrigin) return sendJson(res, 403, { error: 'origin_not_allowed' });
        if (req.method === 'OPTIONS') return sendJson(res, 204, {});
        const url = new URL(req.url, `http://${req.headers.host}`);
        if (req.method === 'GET' && url.pathname === '/health') return sendJson(res, 200, { ok: true, status: 'ready', dataDir });
        if (req.method === 'GET' && /^\/assets\/[^/]+\/file$/.test(url.pathname)) {
          const fileInfo = getAssetFileInfo(decodeURIComponent(url.pathname.split('/')[2]));
          if (!fileInfo) return sendJson(res, 404, { error: 'asset_file_not_found' });
          return sendAssetFile(req, res, fileInfo);
        }
        if ((req.headers['x-amazon-token'] || '') !== LOCAL_TOKEN) return sendJson(res, 401, { error: 'unauthorized' });
        if (req.method === 'GET' && url.pathname === '/state') return sendJson(res, 200, getAppState());
        if (req.method === 'GET' && url.pathname === '/tasks') return sendJson(res, 200, listTasks());
        if (req.method === 'GET' && url.pathname.startsWith('/tasks/')) return sendJson(res, 200, getTask(decodeURIComponent(url.pathname.split('/')[2])) || { error: 'not_found' });
        if (req.method === 'POST' && url.pathname === '/tasks') return sendJson(res, 200, submitTask(await parseBody(req)));
        if (req.method === 'POST' && url.pathname === '/import-csv') {
          const body = await parseBody(req);
          if (body.filePath) return sendJson(res, 200, importCsv(body.module, body.filePath));
          const rows = parseCsv(body.csvText || '');
          return sendJson(res, 200, { module: body.module, headers: rows[0] || [], rows: rows.slice(0, 31), rowCount: Math.max(rows.length - 1, 0), ready: true, dataSource: 'csv' });
        }
        if (req.method === 'POST' && url.pathname === '/export-task') {
          const body = await parseBody(req);
          return sendJson(res, 200, exportTask(body.taskId, body.format));
        }
        if (req.method === 'GET' && url.pathname === '/api/connections') return sendJson(res, 200, listApiConnections());
        if (req.method === 'POST' && url.pathname === '/api/connections') return sendJson(res, 200, saveApiConnection(await parseBody(req)));
        if (req.method === 'DELETE' && url.pathname.startsWith('/api/connections/')) return sendJson(res, 200, deleteApiConnection(decodeURIComponent(url.pathname.split('/')[3])));
        if (req.method === 'POST' && url.pathname.match(/^\/api\/connections\/[^/]+\/test$/)) return sendJson(res, 200, await testApiConnection(decodeURIComponent(url.pathname.split('/')[3])));
        if (req.method === 'POST' && url.pathname.match(/^\/api\/connections\/[^/]+\/sync$/)) return sendJson(res, 200, await syncApiConnection(decodeURIComponent(url.pathname.split('/')[3])));
        if (req.method === 'GET' && url.pathname === '/provider-profiles') return sendJson(res, 200, listProviderProfiles());
        if (req.method === 'POST' && url.pathname === '/provider-profiles') return sendJson(res, 200, saveProviderProfile(await parseBody(req)));
        if (req.method === 'POST' && url.pathname.match(/^\/provider-profiles\/[^/]+\/test$/)) return sendJson(res, 200, await testProviderProfile(decodeURIComponent(url.pathname.split('/')[2])));
        if (req.method === 'DELETE' && url.pathname.startsWith('/provider-profiles/')) return sendJson(res, 200, deleteProviderProfile(decodeURIComponent(url.pathname.split('/')[2]), { force: url.searchParams.get('force') === '1' }));
        if (req.method === 'GET' && url.pathname === '/provider-routes') return sendJson(res, 200, listProviderRoutes());
        if (req.method === 'POST' && url.pathname === '/provider-routes') return sendJson(res, 200, saveProviderRoute(await parseBody(req)));
        if (req.method === 'GET' && url.pathname === '/usage') return sendJson(res, 200, getUsageSummary(Object.fromEntries(url.searchParams.entries())));
        if (req.method === 'GET' && url.pathname === '/agents') return sendJson(res, 200, listAgents());
        if (req.method === 'POST' && url.pathname === '/agents') return sendJson(res, 200, saveAgent(await parseBody(req)));
        if (req.method === 'DELETE' && url.pathname.startsWith('/agents/')) return sendJson(res, 200, deleteAgent(decodeURIComponent(url.pathname.split('/')[2])));
        if (req.method === 'GET' && url.pathname === '/agent-flows') return sendJson(res, 200, listAgentFlows());
        if (req.method === 'POST' && url.pathname === '/agent-flows') return sendJson(res, 200, saveAgentFlow(await parseBody(req)));
        if (req.method === 'POST' && url.pathname.match(/^\/agent-flows\/[^/]+\/publish$/)) return sendJson(res, 200, publishAgentFlow(decodeURIComponent(url.pathname.split('/')[2])));
        if (req.method === 'GET' && url.pathname === '/workflow-runs') return sendJson(res, 200, listWorkflowRuns());
        if (req.method === 'POST' && url.pathname === '/workflow-runs') return sendJson(res, 200, await submitWorkflowRun(await parseBody(req)));
        if (req.method === 'GET' && url.pathname.match(/^\/workflow-runs\/[^/]+$/)) return sendJson(res, 200, getWorkflowRun(decodeURIComponent(url.pathname.split('/')[2])) || { error: 'not_found' });
        if (req.method === 'GET' && url.pathname === '/media/operations') return sendJson(res, 200, listMediaOperations());
        if (req.method === 'GET' && url.pathname === '/media/runs') return sendJson(res, 200, listMediaRuns());
        if (req.method === 'POST' && url.pathname === '/media/runs') return sendJson(res, 200, await submitMediaRun(await parseBody(req)));
        if (req.method === 'POST' && url.pathname.match(/^\/media\/runs\/[^/]+\/cancel$/)) return sendJson(res, 200, cancelMediaRun(decodeURIComponent(url.pathname.split('/')[3])));
        if (req.method === 'DELETE' && url.pathname.match(/^\/media\/runs\/[^/]+$/)) return sendJson(res, 200, deleteMediaRun(decodeURIComponent(url.pathname.split('/')[3])));
        if (req.method === 'GET' && url.pathname.match(/^\/media\/runs\/[^/]+$/)) return sendJson(res, 200, getMediaRun(decodeURIComponent(url.pathname.split('/')[3])) || { error: 'not_found' });
        if (req.method === 'GET' && url.pathname === '/data/imports') return sendJson(res, 200, listDataImports());
        if (req.method === 'POST' && url.pathname === '/data/imports') return sendJson(res, 200, saveDataImport(await parseBody(req)));
        if (req.method === 'POST' && url.pathname === '/data/preview') return sendJson(res, 200, previewDataSource(await parseBody(req)));
        if (req.method === 'DELETE' && url.pathname.startsWith('/data/imports/')) return sendJson(res, 200, deleteDataImport(decodeURIComponent(url.pathname.split('/')[3])));
        if (req.method === 'GET' && url.pathname === '/assets') return sendJson(res, 200, listAssets(Object.fromEntries(url.searchParams.entries())));
        if (req.method === 'POST' && url.pathname === '/assets/import') return sendJson(res, 200, importAssets(await parseBody(req)));
        if (req.method === 'POST' && url.pathname === '/assets/upload') return sendJson(res, 200, uploadAssets(await parseBody(req)));
        if (req.method === 'GET' && url.pathname.startsWith('/assets/')) return sendJson(res, 200, getAsset(decodeURIComponent(url.pathname.split('/')[2])) || { error: 'not_found' });
        if (req.method === 'DELETE' && url.pathname.startsWith('/assets/')) return sendJson(res, 200, deleteAsset(decodeURIComponent(url.pathname.split('/')[2])));
        if (req.method === 'GET' && url.pathname === '/projects') return sendJson(res, 200, listProjects());
        if (req.method === 'POST' && url.pathname === '/projects') return sendJson(res, 200, saveProject(await parseBody(req)));
        if (req.method === 'DELETE' && url.pathname.startsWith('/projects/')) return sendJson(res, 200, deleteProject(decodeURIComponent(url.pathname.split('/')[2])));
        if (req.method === 'GET' && url.pathname === '/approvals') return sendJson(res, 200, listApprovals());
        if (req.method === 'POST' && url.pathname.match(/^\/approvals\/[^/]+\/approve$/)) return sendJson(res, 200, approveAction(decodeURIComponent(url.pathname.split('/')[2])));
        if (req.method === 'POST' && url.pathname.match(/^\/approvals\/[^/]+\/reject$/)) return sendJson(res, 200, rejectAction(decodeURIComponent(url.pathname.split('/')[2])));
        if (req.method === 'GET' && url.pathname === '/action-drafts') return sendJson(res, 200, listActionDrafts());
        if (req.method === 'POST' && url.pathname.match(/^\/action-drafts\/[^/]+\/execute$/)) return sendJson(res, 200, executeApprovedAction(decodeURIComponent(url.pathname.split('/')[2])));
        if (req.method === 'GET' && url.pathname === '/execution-queue') return sendJson(res, 200, listExecutionQueue());
        if (req.method === 'GET' && url.pathname === '/skills') return sendJson(res, 200, listSkills());
        if (req.method === 'GET' && url.pathname === '/skills/discover') return sendJson(res, 200, discoverSkills(Object.fromEntries(url.searchParams.entries())));
        if (req.method === 'POST' && url.pathname === '/skills') return sendJson(res, 200, saveSkill(await parseBody(req)));
        if (req.method === 'DELETE' && url.pathname.startsWith('/skills/')) return sendJson(res, 200, deleteSkill(decodeURIComponent(url.pathname.split('/')[2])));
        if (req.method === 'GET' && url.pathname === '/tools') return sendJson(res, 200, listTools());
        if (req.method === 'POST' && url.pathname === '/tools') return sendJson(res, 200, saveTool(await parseBody(req)));
        if (req.method === 'DELETE' && url.pathname.startsWith('/tools/')) return sendJson(res, 200, deleteTool(decodeURIComponent(url.pathname.split('/')[2])));
        if (req.method === 'POST' && url.pathname.match(/^\/tools\/[^/]+\/run$/)) return sendJson(res, 200, runTool(await parseBody(req)));
        if (req.method === 'GET' && url.pathname === '/tool-runs') return sendJson(res, 200, listToolRuns());
        if (req.method === 'GET' && url.pathname === '/listing-drafts') return sendJson(res, 200, listListingDrafts());
        if (req.method === 'POST' && url.pathname === '/listing-drafts') return sendJson(res, 200, saveListingDraft(await parseBody(req)));
        if (req.method === 'DELETE' && url.pathname.startsWith('/listing-drafts/')) return sendJson(res, 200, deleteListingDraft(decodeURIComponent(url.pathname.split('/')[2])));
        if (req.method === 'POST' && url.pathname.match(/^\/listing-drafts\/[^/]+\/transition$/)) return sendJson(res, 200, transitionListingDraft(decodeURIComponent(url.pathname.split('/')[2]), (await parseBody(req)).status));
        if (req.method === 'POST' && url.pathname.match(/^\/listing-drafts\/[^/]+\/export$/)) return sendJson(res, 200, exportListingDraftCsv(decodeURIComponent(url.pathname.split('/')[2])));
        if (req.method === 'GET' && url.pathname === '/project-packages') return sendJson(res, 200, listProjectPackages());
        if (req.method === 'POST' && url.pathname === '/project-packages/export') return sendJson(res, 200, exportProjectPackage((await parseBody(req)).projectId));
        if (req.method === 'POST' && url.pathname === '/project-packages/import') return sendJson(res, 200, importProjectPackage((await parseBody(req)).filePath));
        if (req.method === 'GET' && url.pathname === '/assistant/messages') return sendJson(res, 200, listAssistantMessages());
        if (req.method === 'POST' && url.pathname === '/assistant/chat') return sendJson(res, 200, submitAssistantMessageWithAssets(await parseBody(req)));
        if (req.method === 'GET' && url.pathname === '/codex/status') return sendJson(res, 200, getCodexStatus());
        if (req.method === 'POST' && url.pathname === '/codex/tasks') return sendJson(res, 200, submitCodexTask(await parseBody(req)));
        if (req.method === 'GET' && url.pathname === '/verifications') return sendJson(res, 200, listVerificationResults(Object.fromEntries(url.searchParams.entries())));
        return sendJson(res, 404, { error: 'not_found' });
      } catch (error) {
        return sendJson(res, 400, { error: error.message });
      }
    });
    server.on('error', (error) => {
      logActivity({ type: 'service.listen_error', error: error.message });
      console.warn(`Amazon Control service listen failed: ${error.message}`);
    });
    server.listen(port, '127.0.0.1');
    return server;
  }

  function stopServer() {
    if (syncTimer) clearInterval(syncTimer);
    syncTimer = null;
    if (server) {
      server.close();
      server = null;
    }
  }

  ensureStore();
  return {
    submitTask,
    listTasks,
    getTask,
    importCsv,
    exportTask,
    getAppState,
    listApiConnections,
    saveApiConnection,
    deleteApiConnection,
    testApiConnection,
    syncApiConnection,
    listDataImports,
    saveDataImport,
    deleteDataImport,
    previewDataSource,
    listAssets,
    importAssets,
    uploadAssets,
    getAsset,
    deleteAsset,
    listAssistantMessages,
    submitAssistantMessage: submitAssistantMessageWithAssets,
    getCodexStatus,
    submitCodexTask,
    listProjects,
    saveProject,
    deleteProject,
    listProjectPackages,
    exportProjectPackage,
    importProjectPackage,
    listApprovals,
    listActionDrafts,
    listExecutionQueue,
    listSkills,
    discoverSkills,
    saveSkill,
    deleteSkill,
    listTools,
    saveTool,
    deleteTool,
    runTool,
    listToolRuns,
    listListingDrafts,
    saveListingDraft,
    deleteListingDraft,
    transitionListingDraft,
    exportListingDraftCsv,
    approveAction,
    rejectAction,
    executeApprovedAction,
    listProviderProfiles,
    saveProviderProfile,
    deleteProviderProfile,
    listProviderRoutes,
    saveProviderRoute,
    resolveProviderRoute,
    testProviderProfile,
    setProviderSecret,
    setEncryptedProviderCredential,
    listEncryptedProviderCredentials,
    recordUsage,
    getUsageSummary,
    migrateLegacyProviders,
    listAgents,
    saveAgent,
    deleteAgent,
    listAgentFlows,
    saveAgentFlow,
    publishAgentFlow,
    validateAgentFlow,
    listWorkflowRuns,
    getWorkflowRun,
    saveWorkflowRun,
    submitWorkflowRun,
    listVerificationResults,
    listMediaOperations,
    listMediaRuns,
    getMediaRun,
    submitMediaRun,
    cancelMediaRun,
    deleteMediaRun,
    startServer,
    stopServer
  };
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > MAX_JSON_BODY_BYTES) req.destroy(new Error('payload_too_large'));
    });
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); } catch (error) { reject(error); }
    });
    req.on('error', reject);
  });
}

if (require.main === module) {
  const service = createTaskService();
  service.startServer(DEFAULT_PORT);
  console.log(`amazon-control-service listening on http://127.0.0.1:${DEFAULT_PORT}`);
  console.log(`data directory: ${DEFAULT_DATA_DIR}`);
}

module.exports = {
  createTaskService,
  MARKETPLACES,
  MODULES,
  WORKBENCH_PAGES,
  CONNECTOR_CATALOG,
  DEFAULT_TOOL_REGISTRY,
  LISTING_DRAFT_TRANSITIONS,
  parseCsv,
  routeModule,
  DEFAULT_DATA_DIR
};
