const http = require('http');
const path = require('path');
const {lookup} = require('mime-types');
const { readFile } = require('fs/promises');

const server = http.createServer(async (req, res) => {
    const url = req.url;

    try {
        if (url === '/') {
            const content = await readFile(path.join(__dirname, "./Public/Pages/index.html"), "utf-8");
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
            return;
        }

        if (url === '/about.html' || url === "/about") {
            const content = await readFile(path.join(__dirname, "./Public/Pages/about.html"), "utf-8");
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
            return;
        }

        if (url === '/contact.html' || url === '/contact') {
            const content = await readFile(path.join(__dirname, "./Public/Pages/contact.html"), "utf-8");
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
            return;
        }

        if (url.startsWith("/style")) {
            const filePath = path.join(__dirname, "Public/src", url);
            const content = await readFile(filePath, "utf-8");
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(content);
            return;
        }

        if (url.startsWith("/Public")) {
            const filePath = path.join(__dirname, "Public/images", url);
            const content = await readFile(filePath);
            const mimeType = lookup(filePath) || 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(content);
            return;
        }

        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("<h1>No Page Found</h1>");
    } catch (error) {
        console.error(`Error handling request: ${error.message}`);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end("<h1>Internal Server Error</h1>");
    }
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
