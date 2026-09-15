const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, 'web-dashboard');
const port = Number(process.env.AMAZON_CONTROL_PREVIEW_PORT || 8790);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml; charset=utf-8'
};

function safePath(urlPath) {
  try {
    const clean = decodeURIComponent(String(urlPath || '/').split('?')[0]).replace(/^\/+/, '') || 'index.html';
    const resolved = path.resolve(root, clean);
    const relative = path.relative(root, resolved);
    if (relative && (relative.startsWith('..') || path.isAbsolute(relative))) return '';
    return resolved;
  } catch (_error) {
    return '';
  }
}

const server = http.createServer((req, res) => {
  const filePath = safePath(req.url || '/');
  if (!filePath) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Bad request');
  }

  try {
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Not found');
    }
  } catch (_error) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Internal server error');
  }

  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, {
    'Content-Type': types[ext] || 'application/octet-stream',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
    'Content-Security-Policy': "frame-ancestors 'none'",
    'X-Content-Type-Options': 'nosniff'
  });
  const stream = fs.createReadStream(filePath);
  stream.on('error', () => {
    if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Internal server error');
  });
  stream.pipe(res);
});

server.on('error', (error) => {
  console.error(`Amazon Control web preview failed: ${error.message}`);
  process.exitCode = 1;
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Amazon Control web preview: http://127.0.0.1:${server.address().port}`);
});
