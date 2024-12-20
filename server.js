const express = require("express");
const path = require("path");
const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/Public/Pages/index.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/Public/Pages/about.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "/Public/Pages/contact.html"));
});
app.get("/work", (req, res) => {
  res.sendFile(path.join(__dirname, "/Public/Pages/work.html"));
});
app.use(express.static('./Public/src'))

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});
app.listen(5000, "localhost", () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
