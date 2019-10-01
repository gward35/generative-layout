const { createCanvas } = require("canvas");
let rand = require('random-seed').create();

module.exports = function(req, res) {
  const color = {
    'red': ['#EDDDD4','#C44536','#772E25'],
    'orange': ['#FFC15E', '#F5FF90', '#FF9F1C'], 
    'blue': ['#006BA6', '#0496FF', '#1D3461'],
    'slate': ['#666A86', '#788AA3', '#92B6B1'], 
    'purple': ['#44355B', '#31263E', '#221E22'],
    'seafoam': ['#95B8D1','#B8E0D2','#D6EADF'],
    'lime': ['#629460', '#96BE8C', '#ACECA1']
  }
  let colorTheme;
  let queueNumber = [0, 1, 2];
  let currentPalette, tileLen;
  let canvas;
  let dynamicWidth = (req.query.width ? parseInt(req.query.width) : 500);
  let dynamicHeight = (req.query.height ? parseInt(req.query.height) : 500);
  let dynamicTileSize = (req.query.tileSize ? parseInt(req.query.tileSize) : 53.33);
  let dynamicSeed = (req.query.seed ? req.query.seed : 10);
  let seed = dynamicSeed;
  rand.seed(seed);
  
  canvas = createCanvas(dynamicWidth, dynamicHeight)
  const context = canvas.getContext("2d");
  colorTheme = color[`${req.query.color}`];
  tileLen = dynamicTileSize;
  currentPalette = (!colorTheme ? ['#7A7D7D', '#D0CFCF', '#565254'] : color[`${req.query.color}`]);

  const randomPattern = (multiplier) => {
    return (req.query.random ? Math.round(Math.random() * multiplier) : Math.round(rand.random() * multiplier))
  }

  const randomColor = (multiplier) => {
    return (req.query.random ? Math.floor(Math.random() * multiplier) : Math.floor(rand.random() * multiplier))
  }

  const shuffle = array => {
    let currentIndex = array.length, tempVal, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = randomColor(currentIndex);
      currentIndex = currentIndex - 1;
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

  const circle = (x, y, radius, startAngle, endAngle) => {
    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, radius, startAngle, endAngle);
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

  const mmm = (x1, y1, x2, y2, x3, y3, x4, y4) => {
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.lineTo(x4, y4);
    context.stroke()
  }

  for (let x = 0; x < dynamicWidth; x += tileLen) {
    for(let y = 0; y < dynamicHeight; y += tileLen) {
      queueNumber = shuffle(queueNumber)
      let dynamicRandomColor = (req.query.random ? shuffle(queueNumber) : queueNumber );
      queueNumber = dynamicRandomColor;

      context.strokeStyle = (currentPalette[queueNumber[0]]);
      context.fillStyle = (currentPalette[queueNumber[0]]);
      context.fillRect(x, y, tileLen, tileLen);
      context.strokeStyle = (currentPalette[queueNumber[1]]);
      context.fillStyle = (currentPalette[queueNumber[1]]);

      if(req.query.pattern === 'triangle') {
        switch(randomPattern(10)) {
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
        switch(randomPattern(2)) {
          case 1: circle(x + tileLen / 2,  y + tileLen / 2, tileLen / 2, 0, 2 * Math.PI);
          break;
          // case 2: circle(25 + x, 25 + y, 20, 0, 2 * Math.PI);
          // break;
        }
      }

      if(req.query.pattern === 'arc') {
        switch(randomPattern(5)) {
          case 1: arc(x, y, 50, 0, 0.5 * Math.PI);
          break;
          case 2: arc(x + tileLen, y + tileLen, 50, 1.575, Math.PI);
          break;
          case 3: arc(x, y, 50, 1.575, Math.PI);
          break;
          case 4: arc(x + tileLen, y + tileLen, 50, Math.PI * 0.5, Math.PI);
          break;
        }
      }

      if(req.query.pattern === 'line') {
        switch(randomPattern(11)) {
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

      if(req.query.pattern === 'mmm') {
        switch(randomPattern(9)) {
          case 1: mmm(x, y + tileLen, x, y, x + tileLen / 2, y + tileLen / 2, x + tileLen, y, x + tileLen, y + tileLen);
          break;
          case 2: mmm(x + tileLen, y, x, y, x + tileLen / 2, y + tileLen / 2, x, y + tileLen, x + tileLen, y + tileLen);
          break;
          case 3: mmm(x, y, x + tileLen, y, x + tileLen / 2, y + tileLen / 2, x + tileLen, y + tileLen, x, y + tileLen);
          break;
          case 4: mmm(x, y, x, y + tileLen, x + tileLen / 2, y + tileLen / 2, x + tileLen, y + tileLen, x + tileLen, y);
          break;
          case 5: mmm(x, y + tileLen, x, y, x + tileLen / 2, y + tileLen / 2, x + tileLen, y, x + tileLen, y + tileLen);
          break;
          case 6: mmm(x + tileLen, y, x, y, x + tileLen / 2, y + tileLen / 2, x, y + tileLen, x + tileLen, y + tileLen);
          break;
          case 7: mmm(x, y, x + tileLen, y, x + tileLen / 2, y + tileLen / 2, x + tileLen, y + tileLen, x, y + tileLen);
          break;
          case 8: mmm(x, y, x, y + tileLen, x + tileLen / 2, y + tileLen / 2, x + tileLen, y + tileLen, x + tileLen, y);
          break;
        }
      }
    }
  }
  res.set("Content-Type", "image/png");
  canvas.pngStream().pipe(res);
  const currentURL = req.protocol + '://' + req.get('Host') + req.url;
  console.log(currentURL)
};
