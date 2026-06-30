const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml'
};

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/api/chat')) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const prompt = url.searchParams.get('prompt');
    if (!prompt) {
      res.writeHead(400);
      return res.end("Missing prompt");
    }
    
    try {
      const aiRes = await fetch("https://text.pollinations.ai/prompt/" + encodeURIComponent(prompt));
      const aiText = await aiRes.text();
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(aiText);
    } catch (e) {
      res.writeHead(500);
      res.end("Error contacting AI");
    }
    return;
  }

  // Basic static file server logic
  let filePath = '.' + req.url;
  if (filePath === './') filePath = './index.html';
  
  // Clean up URL query strings for file serving
  filePath = filePath.split('?')[0];

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if(err.code == 'ENOENT') {
        res.writeHead(404);
        res.end("404 Not Found");
      } else {
        res.writeHead(500);
        res.end('Server Error: '+err.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n=========================================`);
  console.log(`🐸 Polo OS is running!`);
  console.log(`🌐 Open http://localhost:${PORT}/ in your browser`);
  console.log(`=========================================\n`);
  console.log(`(Press Ctrl+C to stop)`);
});
