
const fs = require('fs');
const http = require('http');

const port = 5000;

const server = http.createServer((req, res) => {
  if (req.url === '/files' && req.method === 'GET') {
    const directoryPath = './input-ui';

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to read directory' }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ files }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
