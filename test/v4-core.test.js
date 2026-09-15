const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { createTaskService } = require('../plugin-service/server');
const { validateAgentFlow, resolveProviderRoute } = require('../plugin-service/v4-contracts');

function tempService() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'amazon-control-v4-'));
  const service = createTaskService({ dataDir: dir });
  return { service, dir };
}

test('v4 stores are created with canonical defaults', () => {
  const { service, dir } = tempService();
  const expected = [
    'provider-profiles.json',
    'provider-routes.json',
    'credential-vault.json',
    'agents.json',
    'agent-flows.json',
    'workflow-runs.json',
    'media-runs.json',
    'generator-runs.json',
    'verification-results.json',
    'usage-ledger.json'
  ];
  for (const name of expected) assert.equal(fs.existsSync(path.join(dir, name)), true, `${name} should exist`);
  assert.equal(service.listAgents().length, 8);
  assert.equal(service.listProviderRoutes().length >= 7, true);
  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('legacy AI connection migrates into provider profiles and routes', () => {
  const { service, dir } = tempService();
  const legacy = service.saveApiConnection({
    connectorId: 'openai-compatible',
    name: 'Legacy DeepSeek',
    type: 'ai',
    endpoint: 'https://example.test/v1',
    credentials: { apiKey: 'legacy-secret' }
  });
  const migrated = service.migrateLegacyProviders();
  assert.ok(migrated.profilesCreated >= 1);
  assert.ok(migrated.routesUpdated >= 1);
  const profile = service.listProviderProfiles().find((item) => item.legacyConnectionId === legacy.id);
  assert.ok(profile);
  assert.equal(JSON.stringify(profile).includes('legacy-secret'), false);
  const route = service.resolveProviderRoute('chat');
  assert.equal(route.profileId, profile.id);
  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('provider route precedence is agent then project then global', () => {
  const routes = [
    { capability: 'image', scopeType: 'global', scopeId: '', profileIds: ['global-image'] },
    { capability: 'image', scopeType: 'project', scopeId: 'project-1', profileIds: ['project-image'] },
    { capability: 'image', scopeType: 'agent', scopeId: 'agent-1', profileIds: ['agent-image'] }
  ];
  assert.equal(resolveProviderRoute(routes, 'image', { agentId: 'agent-1', projectId: 'project-1' }).profileId, 'agent-image');
  assert.equal(resolveProviderRoute(routes, 'image', { projectId: 'project-1' }).profileId, 'project-image');
  assert.equal(resolveProviderRoute(routes, 'image').profileId, 'global-image');
});

test('provider profile never returns session secrets', () => {
  const { service, dir } = tempService();
  const profile = service.saveProviderProfile({
    name: 'Image Provider',
    capability: 'image',
    providerKind: 'openai-compatible',
    endpoint: 'https://example.test/v1',
    model: 'image-model',
    secret: 'super-secret'
  });
  const listed = service.listProviderProfiles().find((item) => item.id === profile.id);
  assert.equal(listed.hasCredentials, true);
  assert.equal(JSON.stringify(listed).includes('super-secret'), false);
  assert.equal(JSON.stringify(service.getAppState()).includes('super-secret'), false);
  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('agent flow validation rejects cycles and missing verifier', () => {
  const invalid = {
    id: 'flow-invalid',
    name: 'Invalid',
    nodes: [
      { id: 'start', type: 'agent', label: 'Start' },
      { id: 'end', type: 'output', label: 'End' }
    ],
    edges: [
      { from: 'start', to: 'end' },
      { from: 'end', to: 'start' }
    ]
  };
  const result = validateAgentFlow(invalid, { requireVerifier: true });
  assert.equal(result.valid, false);
  assert.equal(result.errors.some((item) => item.code === 'cycle_detected'), true);
  assert.equal(result.errors.some((item) => item.code === 'missing_verifier'), true);
});

test('workflow run stores plan, immutable flow version and verification', async () => {
  const { service, dir } = tempService();
  const flow = service.listAgentFlows()[0];
  const run = await service.submitWorkflowRun({
    flowId: flow.id,
    marketplace: 'US',
    module: 'data',
    message: '分析这组业务数据',
    rows: [{ units: 10, revenue: 100 }]
  });
  assert.equal(run.status, 'completed');
  assert.equal(run.flowVersion, flow.version);
  assert.equal(Array.isArray(run.agentSteps), true);
  assert.equal(run.verification.status, 'passed');
  assert.ok(service.listWorkflowRuns().some((item) => item.runId === run.runId));
  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('skill discovery reads SKILL.md metadata without executing it', () => {
  const { service, dir } = tempService();
  const skillDir = path.join(dir, 'skills', 'demo-skill');
  fs.mkdirSync(skillDir, { recursive: true });
  fs.writeFileSync(path.join(skillDir, 'SKILL.md'), '---\nname: Demo Skill\ndescription: Demo description\n---\n# Body\n');
  const skills = service.discoverSkills({ roots: [path.join(dir, 'skills')] });
  assert.equal(skills.length, 1);
  assert.equal(skills[0].name, 'Demo Skill');
  assert.equal(skills[0].description, 'Demo description');
  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});
