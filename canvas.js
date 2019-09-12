const { createCanvas } = require('canvas');
module.exports = function(res) {
    const canvas = createCanvas(200, 200);
    const context = canvas.getContext('2d');
    console.log(canvas);

    function triangle(x1, y1, x2, y2, x3, y3) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineTo(x3, y3);
        context.closePath();
        context.fill();
    }

    context.fillStyle = 'red';
    triangle(0,100, 100, 100, 100, 0 );

    res.set('Content-Type', 'image/png');
    canvas.pngStream().pipe(res);


}