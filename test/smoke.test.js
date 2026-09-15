const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');
const { createTaskService } = require('../plugin-service/server');

function tempService() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'amazon-control-'));
  const service = createTaskService({ dataDir: dir });
  return { service, dir };
}

test('file path imports enter analysis and raw rows are preserved', () => {
  const { service, dir } = tempService();
  const file = path.join(dir, 'data.csv');
  fs.writeFileSync(file, 'units,revenue\n10,100\n5,50\n');
  const task = service.submitTask({ module: 'data', marketplace: 'US', message: '分析数据', filePath: file });
  assert.equal(task.usedContext.dataRows, 2);
  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('image and video module parameters reach the generated brief', () => {
  const { service, dir } = tempService();
  const image = service.submitTask({
    module: 'image',
    marketplace: 'US',
    message: '生成主图 brief',
    parameters: { imageSize: '3000x3000', imageRatio: '1:1' }
  });
  assert.equal(image.parameters.imageSize, '3000x3000');
  assert.equal(image.artifacts[0].data.imageSize, '3000x3000');
  const video = service.submitTask({
    module: 'video',
    marketplace: 'US',
    message: '生成视频 brief',
    parameters: { videoDuration: '45s', videoRatio: 'wide' }
  });
  assert.equal(video.artifacts[0].data.duration, '45s');
  assert.equal(video.artifacts[0].data.ratio, 'wide');
  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('inline Windows paths are detected inside Chinese prose', async () => {
  const { service, dir } = tempService();
  const file = path.join(dir, 'ads.csv');
  fs.writeFileSync(file, 'campaignName,searchTerm,spend,sales,orders\nBrand,keyword,10,20,1\n');
  const result = await service.submitAssistantMessage({
    marketplace: 'US',
    message: `美国站，读取 ${file}，帮我诊断广告效果`
  });
  assert.equal(result.importedData.length, 1);
  assert.equal(result.importedData[0].sourceType, 'csv');
  assert.match(result.assistantMessage.content, /已导入 1 个数据源/);
  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('high-risk approval is idempotent and execution queue is human-only', () => {
  const { service, dir } = tempService();
  const task = service.submitTask({ module: 'launch', marketplace: 'DE', message: '生成上架草稿' });
  const approval = service.listApprovals().find((item) => item.taskId === task.taskId);
  const first = service.approveAction(approval.id);
  const second = service.approveAction(approval.id);
  assert.equal(first.id, second.id);
  const entry = service.executeApprovedAction(first.id);
  assert.equal(entry.status, 'waiting_human');
  assert.throws(() => service.executeApprovedAction(first.id));
  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('custom tools marked for approval cannot bypass the approval queue', () => {
  const { service, dir } = tempService();
  const tool = service.saveTool({
    name: 'high risk custom tool',
    kind: 'rest',
    module: 'data',
    risk: 'high',
    approvalRequired: true,
    description: 'high risk action'
  });
  const task = service.runTool({ toolId: tool.id, marketplace: 'US', message: 'run high risk action' });
  assert.equal(task.permissionMode, 'approval');
  assert.equal(task.approvalStatus, 'required');
  assert.equal(service.listApprovals().filter((item) => item.taskId === task.taskId).length, 1);
  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('path traversal is rejected for local file reads', () => {
  const { service, dir } = tempService();
  assert.throws(() => service.importCsv('ads', '..\\..\\secret.csv'));
  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('missing file paths fail preview and asset import instead of reporting success', () => {
  const { service, dir } = tempService();
  const missing = path.join(dir, 'missing.csv');
  const preview = service.previewDataSource({ sourceType: 'csv', filePath: missing });
  assert.equal(preview.ok, false);
  assert.match(preview.message, /文件不存在/);
  assert.throws(() => service.saveDataImport({ name: 'missing', sourceType: 'csv', filePath: missing }));
  const imported = service.importAssets({ filePaths: [missing], marketplace: 'US' });
  assert.equal(imported.imported.length, 0);
  assert.equal(imported.errors.length, 1);
  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('tool registry seeds defaults, registers custom tools, and runs them', () => {
  const { service, dir } = tempService();
  const tools = service.listTools();
  assert.ok(tools.length >= 4, 'default tool registry should be seeded');
  const custom = service.saveTool({ name: '库存日报', kind: 'builtin', module: 'inventory', risk: 'medium', description: '汇总库存覆盖' });
  assert.equal(custom.name, '库存日报');
  const result = service.runTool({ toolId: 'inventory-plan', marketplace: 'US', message: '库存 300，30天销量 180，采购周期 35 天' });
  assert.ok(result.taskId, 'runTool should produce a task');
  assert.equal(result.resolvedModule, 'inventory');
  const runs = service.listToolRuns();
  assert.equal(runs[0].toolId, 'inventory-plan');
  const state = service.getAppState();
  assert.ok(Array.isArray(state.tools) && Array.isArray(state.toolRuns));
  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('api connection tests include configured bearer credentials', async () => {
  const { service, dir } = tempService();
  const api = http.createServer((req, res) => {
    const authorized = req.headers.authorization === 'Bearer review-token';
    res.writeHead(authorized ? 200 : 401, { 'content-type': 'application/json' });
    res.end(JSON.stringify(authorized ? { ok: true } : { error: 'unauthorized' }));
  });
  await new Promise((resolve) => api.listen(0, '127.0.0.1', resolve));
  const connection = service.saveApiConnection({
    connectorId: 'rest-api',
    name: 'auth review',
    type: 'third_party',
    authMethod: 'bearer',
    endpoint: `http://127.0.0.1:${api.address().port}/data`,
    credentials: { bearerToken: 'review-token' },
    fieldMapping: { rows: 'rows' }
  });
  const result = await service.testApiConnection(connection.id);
  assert.equal(result.ok, true);
  service.stopServer();
  await new Promise((resolve) => api.close(resolve));
  fs.rmSync(dir, { recursive: true, force: true });
});

test('asset files are served through the local HTTP service for web media preview', async () => {
  const { service, dir } = tempService();
  const source = path.join(dir, 'preview.png');
  const payload = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  fs.writeFileSync(source, payload);
  const asset = service.importAssets({ filePaths: [source], marketplace: 'US' }).imported[0];
  const server = service.startServer(0);
  if (!server.listening) await new Promise((resolve) => server.once('listening', resolve));
  const response = await new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${server.address().port}/assets/${asset.assetId}/file`, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks) }));
    }).on('error', reject);
  });
  assert.equal(response.status, 200);
  assert.deepEqual(response.body, payload);
  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('uploaded asset payloads are saved as local files', () => {
  const { service, dir } = tempService();
  const payload = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const result = service.uploadAssets({
    marketplace: 'US',
    files: [{ name: 'drag-upload.png', type: 'image/png', dataUrl: `data:image/png;base64,${payload.toString('base64')}` }]
  });
  assert.equal(result.imported.length, 1);
  assert.equal(result.imported[0].kind, 'image');
  assert.ok(fs.existsSync(result.imported[0].localPath));
  assert.deepEqual(fs.readFileSync(result.imported[0].localPath), payload);
  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('cors preflight echoes allowed local origins instead of a hardcoded port', async () => {
  const { service, dir } = tempService();
  const server = service.startServer(0);
  if (!server.listening) await new Promise((resolve) => server.once('listening', resolve));
  const response = await new Promise((resolve, reject) => {
    const request = http.request({
      host: '127.0.0.1',
      port: server.address().port,
      path: '/state',
      method: 'OPTIONS',
      headers: {
        Origin: 'http://localhost:9123',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'content-type, x-amazon-token'
      }
    }, (res) => {
      res.resume();
      res.on('end', () => resolve({ status: res.statusCode, origin: res.headers['access-control-allow-origin'] }));
    });
    request.on('error', reject);
    request.end();
  });
  assert.equal(response.status, 204);
  assert.equal(response.origin, 'http://localhost:9123');
  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('listing drafts follow a guarded state machine and export a CSV table', () => {
  const { service, dir } = tempService();
  const draft = service.saveListingDraft({ title: '宠物除毛器 Listing', sku: 'PET-001', marketplace: 'DE', bullets: ['卖点1', '卖点2', '卖点3'], status: 'draft' });
  assert.equal(draft.status, 'draft');
  const review = service.transitionListingDraft(draft.id, 'needs_review');
  assert.equal(review.status, 'needs_review');
  assert.throws(() => service.transitionListingDraft(draft.id, 'submitted'));
  const approved = service.transitionListingDraft(draft.id, 'approved');
  assert.equal(approved.status, 'approved');
  const exported = service.exportListingDraftCsv(draft.id);
  assert.ok(fs.existsSync(exported.filePath));
  assert.match(exported.csv, /item_sku/);
  assert.match(exported.csv, /PET-001/);
  const auto = service.submitTask({ module: 'launch', marketplace: 'US', message: '自动上架宠物除毛器' });
  assert.ok(service.listListingDrafts().some((item) => item.sourceTaskId === auto.taskId));
  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('project package exports redacted data and imports into another workspace', () => {
  const { service, dir } = tempService();
  const project = service.saveProject({ name: '德国站宠物', marketplace: 'DE' });
  service.submitTask({ projectId: project.id, module: 'data', marketplace: 'DE', message: '分析销量', metrics: { apiKey: 'SECRET123', units: 10 } });
  const exported = service.exportProjectPackage(project.id);
  assert.ok(fs.existsSync(exported.filePath));
  const raw = fs.readFileSync(exported.filePath, 'utf8');
  assert.ok(!raw.includes('SECRET123'), 'sensitive keys should be redacted');
  const { service: service2, dir: dir2 } = tempService();
  const imported = service2.importProjectPackage(exported.filePath);
  assert.equal(imported.imported.tasks, 1);
  assert.equal(service2.listProjects().length, 1);
  assert.ok(service2.listProjects()[0].name.includes('导入'));
  service.stopServer();
  service2.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
  fs.rmSync(dir2, { recursive: true, force: true });
});
