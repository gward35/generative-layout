let canvas;
let savedCanvas;
const color = [['#9E0031', '#8E0045', '#770058'], ['#666A86', '#788AA3', '#92B6B1'], ['#FC7753', '#66D7D1', '#403D58']];
let queueNumber = [0, 1, 2];
let num = 30;
let colorThemeIndex = 0;
let currentPalette, tileLen;

function setup() {
    canvas = createCanvas(windowWidth, windowWidth)
    
    let gridItems = selectAll('.item');
    for (let i = 0; i < gridItems.length; i++) {
        gridItems[i].mouseOver(hoverChange);
    }
    noLoop();
}



function draw() {
    noStroke();
    tileLen = windowWidth / num;
    currentPalette = color[colorThemeIndex]

    for (let x = 0; x < windowWidth; x += tileLen) {
        for(let y = 0; y < windowWidth; y += tileLen) {
            // let indexX = x/tileLen;
            // let indexY = y/tileLen;
            // console.log('x:' + indexX)
            // console.log('y:' + indexY)
            queueNumber = shuffle(queueNumber);
            fill(currentPalette[queueNumber[0]]);
            rect(x, y, tileLen, tileLen);
            fill(currentPalette[queueNumber[1]]);
            // let r = 1;
            // if(indexX < 3 && indexY < 3) {
            //     triangle(x, y, x, y + tileLen, x + tileLen, y + tileLen)
            // }
            switch(round(random(0.51, 9.49))) {
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

    savedCanvas = canvas.canvas.toDataURL();
    let button = select('button');
    
    button.style('background-image', `url(${str(savedCanvas)})`);
}

function hoverChange() {
    redraw();
}