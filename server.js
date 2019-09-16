const express = require("express");
const app = express();
const port = 8080;
const canvas = require("./src/canvas");

app.use("/", express.static('public'));
app.get("/canvas", (req, res) => {
  canvas(req, res);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
