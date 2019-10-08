const express = require("express");
const app = express();
const port = 8080;
const canvas = require("./src/canvas");
const flatCache = require("flat-cache");
const url = require("url");

let cache = flatCache.load('patternsCache')

let cacheMiddleware = (req, res, next) => {
  let key = req.protocol + '://' + req.get('Host') + req.url;
  let cacheContent = cache.getKey(key)
  if(cacheContent) {
    res.send(cacheContent)
  } else {
    res.sendResponse = res.send
    res.send = (body) => {
      cache.setKey(key, body)
      cache.save()
      res.sendResponse(body)
    }
    next()
  }
}

app.get("/canvas", cacheMiddleware, (req, res) => {
  canvas(req, res);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
