const express = require("express");
const app = express();
const mcache = require("memory-cache");
const port = 8080;
const canvas = require("./src/canvas");

app.set('generative pattern', 'input');

let cache = duration => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url 
    let cachedBody = mcache.get(key)
    if(cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = body => {
        mcache.put(key, body, duration * 1000)
        res.sendResponse(body)
      }
      next()
    }
  }
}

// app.use("/", cache(10), (req, res) => {
//   setTimeout(() => {
//     canvas(req, res);
//   }, 5000)
// });

app.get("/canvas", cache(10), (req, res) => {
    canvas(req, res);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
