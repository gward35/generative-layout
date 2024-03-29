const { createCanvas } = require("canvas");
let rand = require("random-seed").create();

module.exports = function (req, res) {
  const color = {
    red: ["#C75146", "#AD2E24", "#81171B"],
    brightred: ["#FF220C", "#FEC0AA", "#FF4B3E"],
    orange: ["#F08700", "#EFCA08", "#F49F0A"],
    salmon: ["#FFAF87", "#FF8E72", "#ED6A5E"],
    blue: ["#006BA6", "#0496FF", "#1D3461"],
    slate: ["#495867", "#577399", "#BDD5EA"],
    purple: ["#2B193D", "#5D4E6D", "#8A7090"],
    myrtle: ["#413C58", "#967AA1", "#ACACDE"],
    green: ["#1E441E", "#2A7221", "#119822"],
    lime: ["#629460", "#96BE8C", "#ACECA1"],
    coral: ["#F6C28B", "#5296A5", "#82DDF0"],
    jade: ["#476A6F", "#519E8A", "#7EB09B"],
    grayscale: ["#7A7D7D", "#D0CFCF", "#565254"],
  };

  let queueNumber = [0, 1, 2];
  let currentPalette, tileLen;
  let canvas;
  let dynamicWidth = req.query.width ? parseInt(req.query.width) : 500;
  let dynamicHeight = req.query.height ? parseInt(req.query.height) : 500;
  let dynamicTileSize = req.query.tileSize ? parseInt(req.query.tileSize) : 50;
  let dynamicSeed = req.query.seed ? req.query.seed : 0;
  let seed = dynamicSeed;
  rand.seed(seed);

  canvas = createCanvas(dynamicWidth, dynamicHeight);
  const context = canvas.getContext("2d");

  if (!req.query.color) {
    currentPalette = color["grayscale"];
    if (req.query.customColor === "true") {
      let customColor = [];
      customColor.push("#" + req.query.firstCustomColor);
      customColor.push("#" + req.query.middleCustomColor);
      customColor.push("#" + req.query.lastCustomColor);
      currentPalette = customColor;
    }
  } else {
    currentPalette = color[`${req.query.color}`];
  }

  tileLen = dynamicTileSize;

  const randomPattern = (multiplier) => {
    return req.query.random === "true"
      ? Math.round(rand.random() * multiplier)
      : Math.round(rand.random() * multiplier);
  };

  const randomColor = (multiplier) => {
    return req.query.random === "true"
      ? Math.floor(rand.random() * multiplier)
      : Math.floor(rand.random() * multiplier);
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      tempVal,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = randomColor(currentIndex);
      currentIndex = currentIndex - 1;
      tempVal = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = tempVal;
    }
    return array;
  };

  const triangle = (x1, y1, x2, y2, x3, y3) => {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.closePath();
    context.fill();
  };

  const circle = (x, y, radius, startAngle, endAngle) => {
    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, radius, startAngle, endAngle);
    context.closePath();
    context.fill();
  };

  const arc = (x, y, radius, startAngle, endAngle) => {
    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, radius, startAngle, endAngle);
    context.closePath();
    context.fill();
  };

  const line = (x1, y1, x2, y2) => {
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  };

  const mmm = (x1, y1, x2, y2, x3, y3, x4, y4) => {
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.lineTo(x4, y4);
    context.stroke();
  };

  for (let x = 0; x < dynamicWidth; x += tileLen) {
    for (let y = 0; y < dynamicHeight; y += tileLen) {
      queueNumber = shuffle(queueNumber);
      let dynamicRandomColor =
        req.query.random === "true" ? shuffle(queueNumber) : queueNumber;
      queueNumber = dynamicRandomColor;

      context.strokeStyle = currentPalette[queueNumber[0]];
      context.fillStyle = currentPalette[queueNumber[0]];
      context.fillRect(x, y, tileLen, tileLen);
      context.strokeStyle = currentPalette[queueNumber[1]];
      context.fillStyle = currentPalette[queueNumber[1]];

      if (req.query.pattern === "triangle") {
        switch (randomPattern(10)) {
          case 1:
            triangle(x, y, x, y + tileLen, x + tileLen, y + tileLen);
            break;
          case 2:
            triangle(x, y, x + tileLen, y, x + tileLen, y + tileLen);
            break;
          case 3:
            triangle(x + tileLen, y, x + tileLen, y + tileLen, x, y);
            break;
          case 4:
            triangle(x + tileLen, y + tileLen, x + tileLen, y, x, y);
            break;
          case 5:
            triangle(x + tileLen, y, x + tileLen, y + tileLen, x, y + tileLen);
            break;
          case 6:
            triangle(x, y, x + tileLen, y + tileLen, x, y + tileLen);
            break;
          case 7:
            triangle(x + tileLen, y, x, y, x + tileLen, y + tileLen);
            break;
          case 8:
            triangle(x, y + tileLen, x + tileLen, y, x, y);
            break;
          case 9:
            triangle(x + tileLen, y, x, y + tileLen, x + tileLen, y + tileLen);
            break;
        }
      }

      if (req.query.pattern === "circle") {
        switch (randomPattern(2)) {
          case 1:
            circle(
              x + tileLen / 2,
              y + tileLen / 2,
              tileLen / 2,
              0,
              2 * Math.PI
            );
            break;
        }
      }

      if (req.query.pattern === "arc") {
        switch (randomPattern(5)) {
          case 1:
            arc(x, y, tileLen, 0, 0.5 * Math.PI);
            break;
          case 2:
            arc(x + tileLen, y + tileLen, tileLen, 1.575, Math.PI);
            break;
          case 3:
            arc(x, y, tileLen, 1.575, Math.PI);
            break;
          case 4:
            arc(x + tileLen, y + tileLen, tileLen, Math.PI * 0.5, Math.PI);
            break;
        }
      }

      if (req.query.pattern === "line") {
        switch (randomPattern(11)) {
          case 1:
            line(x, y, x + tileLen, y + tileLen);
            break;
          case 2:
            line(x + tileLen, y, x, y + tileLen);
            break;
          case 3:
            line(x, y + tileLen, x + tileLen, y);
            break;
          case 4:
            line(x + tileLen, y + tileLen, x, y);
            break;
          case 5:
            line(x + tileLen / 2, y, x + tileLen / 2, y + tileLen);
            break;
          case 6:
            line(x, y + tileLen / 2, x + tileLen, y + tileLen / 2);
            break;
          case 7:
            line(x, y, x + tileLen, y + tileLen),
              line(x - 8, y, x + tileLen - 8, y + tileLen);
            break;
          case 8:
            line(x, y + tileLen / 2, x + tileLen, y + tileLen / 2),
              line(x, y + tileLen / 2 - 8, x + tileLen, y + tileLen / 2 - 8);
            break;
          case 9:
            line(x + tileLen / 2 - 8, y, x + tileLen / 2 - 8, y + tileLen),
              line(x + tileLen / 2 - 8, y, x + tileLen / 2 - 8, y + tileLen);
            break;
          case 10:
            line(x, y + tileLen, x + tileLen, y),
              line(x, y + tileLen - 8, x + tileLen, y - 8);
            break;
        }
      }

      if (req.query.pattern === "mmm") {
        switch (randomPattern(9)) {
          case 1:
            mmm(
              x,
              y + tileLen,
              x,
              y,
              x + tileLen / 2,
              y + tileLen / 2,
              x + tileLen,
              y,
              x + tileLen,
              y + tileLen
            );
            break;
          case 2:
            mmm(
              x + tileLen,
              y,
              x,
              y,
              x + tileLen / 2,
              y + tileLen / 2,
              x,
              y + tileLen,
              x + tileLen,
              y + tileLen
            );
            break;
          case 3:
            mmm(
              x,
              y,
              x + tileLen,
              y,
              x + tileLen / 2,
              y + tileLen / 2,
              x + tileLen,
              y + tileLen,
              x,
              y + tileLen
            );
            break;
          case 4:
            mmm(
              x,
              y,
              x,
              y + tileLen,
              x + tileLen / 2,
              y + tileLen / 2,
              x + tileLen,
              y + tileLen,
              x + tileLen,
              y
            );
            break;
          case 5:
            mmm(
              x,
              y + tileLen,
              x,
              y,
              x + tileLen / 2,
              y + tileLen / 2,
              x + tileLen,
              y,
              x + tileLen,
              y + tileLen
            );
            break;
          case 6:
            mmm(
              x + tileLen,
              y,
              x,
              y,
              x + tileLen / 2,
              y + tileLen / 2,
              x,
              y + tileLen,
              x + tileLen,
              y + tileLen
            );
            break;
          case 7:
            mmm(
              x,
              y,
              x + tileLen,
              y,
              x + tileLen / 2,
              y + tileLen / 2,
              x + tileLen,
              y + tileLen,
              x,
              y + tileLen
            );
            break;
          case 8:
            mmm(
              x,
              y,
              x,
              y + tileLen,
              x + tileLen / 2,
              y + tileLen / 2,
              x + tileLen,
              y + tileLen,
              x + tileLen,
              y
            );
            break;
        }
      }
    }
  }
  res.set("Content-Type", "image/png");
  canvas.pngStream().pipe(res);
  const currentURL = req.protocol + "://" + req.get("Host") + req.url;

  console.log(currentURL);
};
