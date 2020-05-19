// JAVASCRIPT CODE //
const cvs = document.getElementById('mycanvas');
const ctx = cvs.getContext('2d');

// Game canvas and const
let frames = 0;

// Load sprite image
const sprite = new Image();
sprite.src = 'img/sprite.png';

// Background 
const bg = {
    sX: 0,
    sY: 0,
    w: 276,
    h: 226,
    x: 0,
    y: cvs.height - 226,
    draw: function() {
        ctx.drawImage(
            sprite,
            this.sX, // Source X(in source image)
            this.sY, // Source Y
            this.w,  // Source width
            this.h,  // Source height
            this.x,  // Destination x(in canvas)
            this.y,  // Destination y
            this.w,  // Destinition width
            this.h   // Destinition height
        );
        ctx.drawImage(
            sprite,
            this.sX, // Source X(in source image)
            this.sY, // Source Y
            this.w,  // Source width
            this.h,  // Source height
            this.x + this.w,  // Destination x(in canvas)
            this.y,  // Destination y
            this.w,  // Destinition width
            this.h   // Destinition height
        );
    }
}
// const name = {
//     sX: 276,
//     sy: 112,
//     w: 34,
//     h: 26,
//     x: 0,
//     y: 0,
//     draw: function() {
//         ctx.drawImage(
//             sprite, 
//             this.sX, 
//             this.sY, 
//             this.w,
//             this.h, 
//             this.x, 
//             this.y, 
//             this.w, 
//             this.h);
//     }
// }
// function draw() {
//     name.draw();
// }
// const bird = {
//     animation: [
//         { sX: 276, sY: 112 },
//         { sX: 276, sY: 139 },
//         { sX: 276, sY: 164 },
//         { sX: 276, sY: 139 }
//     ],
//     x: 50,
//     y: 150,
//     w: 34,
//     h: 26,
//     frame: 0,
//     draw: function() {
//         let bird = this.animation[this.frame];
//         ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, this.x - this.w/2, this.y - this.h/2, this.w, this.h);
//         ctx.drawImage()
//     }
// }

function draw() {
    // Background of canvas
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0, 0, cvs.clientWidth, cvs.height );
    bg.draw();
}

function update() {

}

function loop() {
    // update();
    draw();
    frames++;
    requestAnimationFrame(loop);
}
loop();

