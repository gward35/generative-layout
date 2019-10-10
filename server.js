const express = require("express");
const app = express();
const port = 8080;
const canvas = require("./src/canvas");
const url = require("url");

app.get("/canvas", cacheMiddleware, (req, res) => {
  canvas(req, res);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
