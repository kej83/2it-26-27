let http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);

// 1. Kjør programmet:
// node 3-1-first-server.js
// 2. I nettleseren skriv:
// localhost:8080