const http = require("http");
const path = require("path");
const { lookup } = require("mime-types");
const { readFile, stat, readdir } = require("fs/promises");
const server = http.createServer(async (req, res) => {
  const baseDir = path.join(__dirname, "Public");
  const pagesDir = path.join(baseDir, "Pages");
  try {
    const htmlFiles = await readdir(pagesDir);
    const url = req.url === "/" ? "/index" : req.url;
    const matchedFile = htmlFiles.find(
      (file) => url === `/${path.basename(file, ".html")}`
    );
    let filePath;
    if (matchedFile) {
      filePath = path.join(pagesDir, matchedFile);
    } else {
      filePath = path.join(baseDir, req.url);
    }
    await stat(filePath);
    const mimeType = lookup(filePath) || "application/octet-stream";
    const content = await readFile(filePath);
    res.writeHead(200, { "Content-Type": mimeType });
    res.end(content);
  } catch (error) {
    console.error(`Error handling request: ${error.message}`);
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end("<h1>Internal Server Error</h1>");
  }
});
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
