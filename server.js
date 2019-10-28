const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const canvas = require('./src/canvas')
const url = require('url')
let rand = require('random-seed').create()

const cacheHeader = (res, seconds = 1800) => {
  //30 minutes
  res.set('Cache-Control', `max-age=${seconds}`)
}

const randomizer = () => {
  return (req, res, next) => {
    const color = {
      red: ['#C75146', '#AD2E24', '#81171B'],
      brightred: ['#FF220C', '#FEC0AA', '#FF4B3E'],
      orange: ['#F08700', '#EFCA08', '#F49F0A'],
      salmon: ['#FFAF87', '#FF8E72', '#ED6A5E'],
      blue: ['#006BA6', '#0496FF', '#1D3461'],
      slate: ['#495867', '#577399', '#BDD5EA'],
      purple: ['#2B193D', '#5D4E6D', '#8A7090'],
      myrtle: ['#413C58', '#967AA1', '#ACACDE'],
      green: ['#1E441E', '#2A7221', '#119822'],
      lime: ['#629460', '#96BE8C', '#ACECA1'],
      coral: ['#F6C28B', '#5296A5', '#82DDF0'],
      jade: ['#476A6F', '#519E8A', '#7EB09B'],
      grayscale: ['#7A7D7D', '#D0CFCF', '#565254'],
    }

    let tileLen

    if (req.query.random === 'true' && !req.query.color) {
      let colorKeys = Object.keys(color)
      let selectedColors =
        colorKeys[Math.floor(rand.random() * colorKeys.length)]
      req.query.color = selectedColors
    }

    if (req.query.random === 'true' && !req.query.tileSize) {
      tileLen = Math.ceil(rand.random() * 100)
      req.query.tileSize = tileLen
    }

    if (req.query.random === 'true' && !req.query.pattern) {
      const patterns = ['triangle', 'circle', 'arc', 'line', 'mmm', 'false']
      let selectedPattern =
        patterns[Math.floor(rand.random() * patterns.length)]
      req.query.pattern = selectedPattern
    }
    next()
  }
}

app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
  res.postUrl
})

app.get('/canvas', randomizer(), (req, res) => {
  if (!req.query.random) {
    cacheHeader(res)
  }

  if (!req.query.seed) {
    req.query.seed = 1

    res.redirect(
      url.format({
        pathname: '/canvas',
        query: req.query,
      })
    )
  }

  if (req.query.random === 'true') {
    let seed = Math.round(Math.ceil(Math.random() * 1000))
    req.query.seed = seed
    delete req.query.random
    res.redirect(
      url.format({
        pathname: '/canvas',
        query: req.query,
      })
    )
  }
  canvas(req, res)
})

app.use(express.urlencoded())

app.post('/canvas', (req, res) => {
  console.log(req.body.color)
  console.log(req.body.pattern)
  console.log(req.body.width)
  console.log(req.body.height)
  console.log(req.body.width)
  console.log(req.body.height)

  req.body.width = '&width=' + req.body.width
  req.body.height = '&height=' + req.body.height
  req.body.tilesize = '&tileSize=' + req.body.tilesize
  req.body.seed = '&seed=' + req.body.seed
  if (req.body.random === undefined) {
    req.body.random = ''
  }

  console.log(req.body.random)

  const postUrl =
    req.protocol +
    '://' +
    req.get('Host') +
    req.url +
    req.body.color +
    req.body.pattern +
    req.body.width +
    req.body.height +
    req.body.tilesize +
    req.body.seed +
    req.body.random
  console.log(postUrl)
})

app.listen(port, () => console.log(`Listening on port ${port}!`))
