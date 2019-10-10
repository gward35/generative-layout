const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const canvas = require("./src/canvas");
const url = require("url");

const cacheHeader = (res, seconds = 1800) => { //30 minutes
  if(req.query.random) {
    return
  } else {
    res.set('Cache-Control', `max-age=${seconds}`)
  }
}

app.get("/canvas", cacheMiddleware, (req, res) => {
  cacheHeader(res)
  if(!req.query.seed) {
    req.query.seed = 0; 
    res.redirect(url.format({
      pathname: '/canvas',
      query: req.query
    }))
  }
  canvas(req, res);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
