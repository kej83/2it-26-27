import http from "node:http";

const server = http.createServer((req, res) => {
    console.log(`Hei. req.url: ${req.url}`)

    if( req.url === "/") {
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>Velkommen til Nannestad</h1><p>Min første webserver</p>");
    } else if ( req.url === "/nyheter") {
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>Nyheter fra Nannestad</h1><p>Rektor fikk baby</p>");
    } else {
        // 404 er standard feilkode når nettside ikke finnes
        res.writeHead(404, {"Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>404</h1><p>Siden finnes ikke</p>")
    }
});

server.listen(3000, () => {
    console.log("Serveren kjører på http://localhost:3000")
});