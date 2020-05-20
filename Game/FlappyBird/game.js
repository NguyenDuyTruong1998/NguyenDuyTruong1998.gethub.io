// JAVASCRIPT CODE //
const cvs = document.getElementById('mycanvas');
const ctx = cvs.getContext('2d');

// Game canvas and const
let frames = 0;

// Load sprite image
const sprite = new Image();
sprite.src = './img/sprite.png';
// Game state
const state = {
    current: 0,
    gameReady: 0,
    game: 1,
    over: 2
}
// Control the game
document.addEventListener('click', function(evt) {
    switch(state.current) {
        case state.gameReady:
            state.current = state.game;
            break;
        case state.game:
            console.log('Flap flap');
            bird.flap();
            break;
        case state.over:
            state.current = state.game;
            break;
    }
})
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
// Fore ground

const fg = {
    sX: 276,
    sY: 0,
    w: 224,
    h: 112,
    x: 0,
    y: cvs.height - 112,
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

// }
// function draw() {
//     name.draw();
// }
const bird = {
    animation: [
        { sX: 276, sY: 112 },
        { sX: 276, sY: 139 },
        { sX: 276, sY: 164 },
        { sX: 276, sY: 139 }
    ],
    x: 50,
    y: 150,
    w: 34,
    h: 26,
    frame: 0,
    period: 5,
    draw: function() {
        let bird = this.animation[this.frame];
        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, this.x - this.w/2, this.y - this.h/2, this.w, this.h);
    },
    flap: function() {

    },
    update: function() {
        this.period = state.current == state.getReady ? 10 : 5
        // We increment the frame by 1, each period
        this.frame += frames % this.period === 0 ? 1 : 0
        // Frame goes from 0 to 4, then again to 0.
        this.frame = this.frame % this.animation.length
    }
}

const getReady = {
    sX: 0,
    sY: 228,
    w: 173,
    h: 152,
    x: cvs.width/2 - 173/2,
    y: 80,
    draw: function() {
        if (state.current === state.gameReady) {
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
        }
    }
}

const gameOver = {
    sX: 175,
    sY: 228,
    w: 225,
    h: 202,
    x: cvs.width/2 - 225/2,
    y: 90,
    draw: function() {
        if (state.current === state.over) {
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
        }
    }
}
function draw() {
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0, 0, cvs.clientWidth, cvs.height );
    
    bg.draw();
    fg.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
}

function update() {
    bird.update();
}

function loop() {
    update();
    draw();
    frames++;
    requestAnimationFrame(loop);
}
loop();

