/**
 * Sivakumar Portfolio — Node.js Server
 * Run:  node server.js
 * Then open http://localhost:3000
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.pdf':  'application/pdf',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
};

const ROUTES = {
  '/':             'sivakumar_portfolio.html',
  '/portfolio':    'sivakumar_portfolio.html',
  '/admin':        'backend_admin.html',
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0].replace(/\/+$/, '') || '/';

  // ── Named routes ──
  if (ROUTES[urlPath]) {
    serveFile(res, path.join(__dirname, ROUTES[urlPath]));
    return;
  }

  // ── Static files (css, js, images, fonts, etc.) ──
  const filePath = path.join(__dirname, urlPath);
  const ext = path.extname(filePath).toLowerCase();

  // Block path traversal outside project dir
  if (!filePath.startsWith(__dirname)) {
    send(res, 403, 'text/plain', 'Forbidden');
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    serveFile(res, filePath);
    return;
  }

  // ── 404 ──
  send(res, 404, 'text/html; charset=utf-8', `
    <!DOCTYPE html>
    <html><head><title>404</title>
    <style>
      body{background:#060608;color:#f0f0f0;font-family:monospace;
           display:flex;flex-direction:column;align-items:center;
           justify-content:center;height:100vh;gap:16px;margin:0;}
      h1{color:#D4AF37;font-size:48px;margin:0;}
      p{color:rgba(255,255,255,0.4);font-size:12px;letter-spacing:2px;}
      a{color:#D4AF37;text-decoration:none;}
    </style></head>
    <body>
      <h1>404</h1>
      <p>PAGE NOT FOUND</p>
      <a href="/">← Back to Portfolio</a>
    </body></html>
  `);
});

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      send(res, 500, 'text/plain', 'Internal Server Error');
      return;
    }
    res.writeHead(200, {
      'Content-Type': mime,
      'Content-Length': Buffer.byteLength(data),
      'Cache-Control': 'no-cache',
    });
    res.end(data);
  });
}

function send(res, status, mime, body) {
  const buf = Buffer.from(body, 'utf-8');
  res.writeHead(status, {
    'Content-Type': mime,
    'Content-Length': buf.length,
  });
  res.end(buf);
}

server.listen(PORT, () => {
  console.log('');
  console.log('  ┌─────────────────────────────────────────┐');
  console.log('  │   Sivakumar Portfolio — Node.js Server  │');
  console.log('  ├─────────────────────────────────────────┤');
  console.log(`  │   Portfolio  →  http://localhost:${PORT}    │`);
  console.log(`  │   Admin      →  http://localhost:${PORT}/admin │`);
  console.log('  └─────────────────────────────────────────┘');
  console.log('');
  console.log('  Press Ctrl+C to stop.');
  console.log('');
});
