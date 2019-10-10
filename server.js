const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const canvas = require("./src/canvas");
const url = require("url");

app.get("/canvas", (req, res) => {
  canvas(req, res);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
