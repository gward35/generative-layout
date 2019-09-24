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
  let dynamicWidth = (req.query.width ? parseInt(req.query.width) : 500);
  let dynamicHeight = (req.query.height ? parseInt(req.query.height) : 500);
  canvas = createCanvas(dynamicWidth, dynamicHeight)
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

  const triangle = (x1, y1, x2, y2, x3, y3) => {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.closePath();
    context.fill();
  }

  const arc = (x, y, radius, startAngle, endAngle) => {
    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, radius, startAngle, endAngle);
    context.closePath();
    context.fill();
  }

  const line = (x1, y1, x2, y2) => {
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke()
  }

  for (let x = 0; x < dynamicWidth; x += tileLen) {
    for(let y = 0; y < dynamicHeight; y += tileLen) {
        queueNumber = shuffle(queueNumber);
        context.strokeStyle = (currentPalette[queueNumber[0]]);
        context.fillStyle = (currentPalette[queueNumber[0]]);
        context.fillRect(x, y, tileLen, tileLen);
        context.strokeStyle = (currentPalette[queueNumber[1]]);
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

      if(req.query.pattern === 'arc') {
        switch(Math.round(Math.random() * 10)) {
          case 1: arc(x, y, 50, 0, 0.5 * Math.PI);
          break;
          case 2: arc(x + tileLen, y + tileLen, 50, 1.575, 1 * Math.PI);
          break;
          case 3: arc(x + tileLen, y, 50, 1.575, 1 * Math.PI);
          break;
          case 4: arc(x, y, 50, Math.PI, 1.5 * Math.PI);
          break;
          case 5: arc(x, y + tileLen, 50, 1.575, 1 * Math.PI);
          break;
          case 6: arc(x, y + tileLen, 50, 0, 0.5 * Math.PI);
          break;
          case 7: arc(x + tileLen, y + tileLen, 50, Math.PI, 1.5 * Math.PI);
          break;
          case 8: arc(x + tileLen, y, 50, Math.PI, 1.5 * Math.PI);
          break;
          case 9: arc(x, y + tileLen, 50, Math.PI, 1.5 * Math.PI);
          break;
        }
      }

      if(req.query.pattern === 'line') {
        switch(Math.round(Math.random() * 10)) {
          case 1: line(x, y, x + tileLen, y + tileLen);
          break;    
          case 2: line(x + tileLen, y, x, y + tileLen);
          break; 
          case 3: line(x, y + tileLen, x + tileLen, y);
          break; 
          case 4: line(x + tileLen, y + tileLen, x, y);
          break;    
          case 5: line(x + tileLen / 2, y, x + tileLen / 2, y + tileLen);
          break; 
          case 6: line(x, y + tileLen / 2, x + tileLen, y + tileLen / 2);
          break;     
          case 7: line(x, y, x + tileLen, y + tileLen), 
                  line(x - 8, y, x + tileLen - 8, y + tileLen);
          break;
          case 8: line(x, y + tileLen / 2, x + tileLen, y + tileLen / 2),
                  line(x, y + tileLen / 2 - 8, x + tileLen, y + tileLen / 2 - 8);
          break;  
          case 9: line(x + tileLen / 2 - 8, y, x + tileLen / 2 -8, y + tileLen),
                  line(x + tileLen / 2 - 8, y, x + tileLen / 2 -8, y + tileLen);
          break; 
          case 10: line(x, y + tileLen, x + tileLen, y),
                   line(x, y + tileLen - 8, x + tileLen, y - 8);
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
