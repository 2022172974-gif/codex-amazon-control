const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');
const path = require('path');
const { spawn } = require('child_process');

function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(__dirname, '..', 'preview-server.js')], {
      env: Object.assign({}, process.env, { AMAZON_CONTROL_PREVIEW_PORT: '0' }),
      stdio: ['ignore', 'pipe', 'pipe']
    });
    let output = '';
    let errorOutput = '';
    const timeout = setTimeout(() => reject(new Error('preview server startup timed out')), 5000);
    child.stdout.on('data', (chunk) => {
      output += chunk.toString('utf8');
      const match = output.match(/http:\/\/127\.0\.0\.1:(\d+)/);
      if (match) {
        clearTimeout(timeout);
        resolve({ child, port: Number(match[1]) });
      }
    });
    child.stderr.on('data', (chunk) => {
      errorOutput += chunk.toString('utf8');
    });
    child.once('exit', (code) => {
      clearTimeout(timeout);
      reject(new Error(`preview server exited early (${code}): ${errorOutput}`));
    });
  });
}

function request(port, requestPath) {
  return new Promise((resolve, reject) => {
    http.get({ host: '127.0.0.1', port, path: requestPath }, (res) => {
      res.resume();
      res.on('end', () => resolve(res.statusCode));
    }).on('error', reject);
  });
}

test('preview server rejects malformed URL without exiting', async () => {
  const { child, port } = await startPreviewServer();
  try {
    const status = await request(port, '/%');
    assert.equal(status, 400);
    await new Promise((resolve) => setTimeout(resolve, 100));
    assert.equal(child.exitCode, null);
  } finally {
    child.kill();
  }
});
