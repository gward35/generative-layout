const { createCanvas } = require("canvas");
const color = {
  'red': ['#9E0031', '#8E0045', '#770058'], 
  'blue': ['#666A86', '#788AA3', '#92B6B1'], 
  'orange': ['#FC7753', '#66D7D1', '#403D58']
}

let queueNumber = [0, 1, 2];
let num = 30;
let colorTheme;
let currentPalette, tileLen;

module.exports = function(req, res) {
  const canvas = createCanvas(2000, 100);
  const context = canvas.getContext("2d");
  tileLen = 1600 / num;
  currentPalette = (!colorTheme ? ['#84828F', '#6A687A', '#536271'] : color[`${req.query.color}`]);

  function shuffle(array) {
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

  function triangle(x1, y1, x2, y2, x3, y3) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.closePath();
    context.fill();
  }

  for (let x = 0; x < 600; x += tileLen) {
    for(let y = 0; y < 600; y += tileLen) {
        queueNumber = shuffle(queueNumber);
        context.fillStyle = (currentPalette[queueNumber[0]]);
        context.fillRect(x, y, tileLen, tileLen);
        context.fillStyle = (currentPalette[queueNumber[1]]);

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
  }
  res.set("Content-Type", "image/png");
  canvas.pngStream().pipe(res);
};
