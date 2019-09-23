const { createCanvas } = require("canvas");
const color = {
  'red': ['#EDDDD4','#C44536','#772E25'],
  'plum': ['#9E0031', '#8E0045', '#770058'], 
  'blue': ['#006BA6', '#0496FF', '#1D3461'],
  'slate': ['#666A86', '#788AA3', '#92B6B1'], 
  'purple': ['#44355B', '#31263E', '#221E22'],
  'seafoam': ['#95B8D1','#B8E0D2','#D6EADF'],
  'lime': ['#629460', '#96BE8C', '#ACECA1']
}
let colorTheme;
let queueNumber = [0, 1, 2];
let num = 30;
let currentPalette, tileLen;

module.exports = function(req, res) {
  let canvas;
  if(req.query.width) {
    canvas = createCanvas(parseInt(req.query.width), parseInt(req.query.height))
    console.log(canvas)
  } else {
    canvas = createCanvas(500, 500)
  }
  const context = canvas.getContext("2d");
  colorTheme = color[`${req.query.color}`];
  tileLen = 1600 / num;
  currentPalette = (!colorTheme ? ['#7A7D7D', '#D0CFCF', '#565254'] : color[`${req.query.color}`]);

  const shuffle = array => {
    let currentIndex = array.length, tempVal, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      tempVal = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = tempVal;
    }

    return array;
  }

  const circle = (x, y, radius, startAngle, endAngle) => {
    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, radius, startAngle, endAngle);
    context.closePath();
    context.fill();
  }

  const triangle = (x1, y1, x2, y2, x3, y3) => {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.closePath();
    context.fill();
  }

  for (let x = 0; x < (req.query.width ? parseInt(req.query.width) : 500); x += tileLen) {
    for(let y = 0; y < (req.query.height ? parseInt(req.query.height) : 500); y += tileLen) {
        queueNumber = shuffle(queueNumber);
        context.fillStyle = (currentPalette[queueNumber[0]]);
        context.fillRect(x, y, tileLen, tileLen);
        context.fillStyle = (currentPalette[queueNumber[1]]);

      if(req.query.pattern === 'triangle') {
        switch(Math.round(Math.random() * 10)) {
          case 1: triangle(x, y, x, y + tileLen, x + tileLen, y + tileLen);
          break;
          case 2: triangle(x, y, x + tileLen, y, x + tileLen, y + tileLen);
          break;
          case 3: triangle(x + tileLen, y, x + tileLen, y + tileLen, x, y);
          break;
          case 4: triangle(x + tileLen, y + tileLen, x + tileLen, y, x, y);
          break;
          case 5: triangle(x + tileLen, y, x + tileLen, y + tileLen, x, y + tileLen);
          break;
          case 6: triangle(x, y, x + tileLen, y + tileLen, x, y + tileLen);
          break;
          case 7: triangle(x + tileLen, y, x, y, x + tileLen, y + tileLen);
          break;
          case 8: triangle(x, y + tileLen, x + tileLen, y, x, y);
          break;
          case 9: triangle(x + tileLen, y, x, y + tileLen, x + tileLen, y + tileLen);
          break;
        }
      }

      if(req.query.pattern === 'circle') {
        switch(Math.round(Math.random() * 10)) {
          case 1: circle(x, y, 50, 0, 0.5 * Math.PI);
          break;
          case 2: circle(x + tileLen, y + tileLen, 50, 1.575, 1 * Math.PI);
          break;
          case 3: circle(x + tileLen, y, 50, 1.575, 1 * Math.PI);
          break;
          case 4: circle(x, y, 50, Math.PI, 1.5 * Math.PI);
          break;
          case 5: circle(x, y + tileLen, 50, 1.575, 1 * Math.PI);
          break;
          case 6: circle(x, y + tileLen, 50, 0, 0.5 * Math.PI);
          break;
          case 7: circle(x + tileLen, y + tileLen, 50, Math.PI, 1.5 * Math.PI);
          break;
          case 8: circle(x + tileLen, y, 50, Math.PI, 1.5 * Math.PI);
          break;
          case 9: circle(x, y + tileLen, 50, Math.PI, 1.5 * Math.PI);
          break;
     
        }
      }
    }
  }
  res.set("Content-Type", "image/png");
  canvas.pngStream().pipe(res);
  const currentURL = req.protocol + '://' + req.get('Host') + req.originalUrl;
  console.log(currentURL)
};
