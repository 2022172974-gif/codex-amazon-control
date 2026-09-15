const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const sharp = require('sharp');
const { createTaskService } = require('../plugin-service/server');

async function startTempService() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'amazon-control-http-'));
  const service = createTaskService({ dataDir: dir });
  const server = service.startServer(0);
  if (!server.listening) await new Promise((resolve) => server.once('listening', resolve));
  return { service, dir, baseUrl: `http://127.0.0.1:${server.address().port}` };
}

function headers() {
  return { 'content-type': 'application/json', 'x-amazon-token': 'amazon-control-local-v1' };
}

test('v4 HTTP bridge exposes providers, routes, agents and media operations', async () => {
  const { service, dir, baseUrl } = await startTempService();
  const profileResponse = await fetch(`${baseUrl}/provider-profiles`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      name: 'HTTP Provider',
      capabilities: ['image'],
      providerKind: 'openai-compatible',
      endpoint: 'https://example.test/v1',
      secret: 'http-secret'
    })
  });
  const profile = await profileResponse.json();
  assert.equal(profileResponse.status, 200);
  assert.equal(JSON.stringify(profile).includes('http-secret'), false);

  const routeResponse = await fetch(`${baseUrl}/provider-routes`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ capability: 'image', scopeType: 'global', profileIds: [profile.id] })
  });
  assert.equal(routeResponse.status, 200);

  const state = await (await fetch(`${baseUrl}/state`, { headers: headers() })).json();
  assert.ok(state.providerProfiles.some((item) => item.id === profile.id));
  assert.ok(state.providerRoutes.some((item) => item.capability === 'image' && item.profileIds.includes(profile.id)));
  assert.equal(state.agents.length, 8);
  assert.equal(state.mediaOperations.length, 4);
  assert.equal(JSON.stringify(state).includes('http-secret'), false);

  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('v4 HTTP media endpoint returns a real artifact', async () => {
  const { service, dir, baseUrl } = await startTempService();
  const source = path.join(dir, 'source.png');
  await sharp({
    create: { width: 320, height: 320, channels: 4, background: { r: 80, g: 140, b: 220, alpha: 1 } }
  }).png().toFile(source);
  const response = await fetch(`${baseUrl}/media/runs`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      operationId: 'image_to_image',
      engine: 'local',
      sourcePaths: [source],
      options: { width: 240, height: 240, format: 'png' }
    })
  });
  const run = await response.json();
  assert.equal(response.status, 200);
  assert.equal(run.status, 'completed');
  assert.equal(fs.existsSync(run.artifacts[0].path), true);
  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});
