let canvas;
let savedCanvas;
const color = [['#9E0031', '#8E0045', '#770058'], ['#666A86', '#788AA3', '#92B6B1'], ['#FC7753', '#66D7D1', '#403D58']];
let queueNumber = [0, 1, 2];
let num = 30;
let colorThemeIndex = 1;
let currentPalette, tileLen;

function setup() {
    canvas = createCanvas(windowWidth, windowWidth)
    canvas.style('display', 'none');
    
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
    let buttons = selectAll('.button');
    let backgroundRect = select('.rectangle');
    let border = selectAll('.border');
    let input = select('.after::after');

    for (let i = 0; i < buttons.length; i++) {
        buttons[0].style('background', `url(${str(savedCanvas)})`);
        buttons[1].style('border-image', `url(${str(savedCanvas)}) 2 / 2px / 0 repeat`);
    }
    
    backgroundRect.style('background-image', `url(${str(savedCanvas)})`);

    for (let i = 0; i < border.length; i++) {
        border[1].style('border-image', `url(${str(savedCanvas)}) 5 / 5px / 0 repeat`);
    }
    
    input.style('background-image', `url(${str(savedCanvas)})`);
}

function mouseClicked() {
    redraw();
}