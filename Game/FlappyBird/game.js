// JAVASCRIPT CODE //
const cvs = document.getElementById('mycanvas');
const ctx = cvs.getContext('2d');
const DEGREE = Math.PI/180;
// Game canvas and const
let frames = 0;

// Load sprite image
const sprite = new Image();
sprite.src = './img/sprite.png';

const SCORE_S = new Audio();
SCORE_S.src = 'audio/sfx_point.wav'

const FLAP = new Audio();
FLAP.src = 'audio/sfx_flap.wav'

const HIT = new Audio();
HIT.src = 'audio/sfx_hit.wav'

const SWOOSHING = new Audio();
SWOOSHING.src = 'audio/sfx_swooshing.wav'

const DIE = new Audio();
DIE.src = 'audio/sfx_die.wav'
// Game state
const state = {
    current: 0,
    gameReady: 0,
    game: 1,
    over: 2
}
const startBtn = {
    x: 120,
    y: 263,
    w: 83,
    h: 29
}
// Control the game
cvs.addEventListener('click', async function(evt) {
    switch(state.current) {
        case state.gameReady:
        SWOOSHING.play();
            state.current = state.game;
            break;
        case state.game:
            bird.flap();
            FLAP.play();
            break;
        case state.over:
            let rect = cvs.getBoundingClientRect();
            let clickX = evt.clientX - rect.left;
            let clickY = evt.clientY - rect.top;
            if (clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h) {
                pipes.reset();
                bird.speedReset();
                score.reset();
                state.current = state.gameReady;
            }
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
    dx: 1,
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
        ctx.drawImage( sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
        ctx.drawImage( sprite, this.sX, this.sY, this.w, this.h, this.x + this.w * 2, this.y, this.w, this.h);
    },
    update: function() {
        if (state.current == state.game) {
            this.x = (this.x - this.dx) % (this.w);
        }
    }
}

const score = {
    best: Number(localStorage.getItem("best")) | 0,
    value: 0,
    draw: function() {
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#000"
        if (state.current == state.game) {
            ctx.lineWidth = 2;
            ctx.font = "35px Teko";
            ctx.fillText(this.value, cvs.width/2, 50)
            ctx.strokeText(this.value, cvs.width/2, 50)
        } else if(state.current == state.over){
            
            ctx.font = "25px Teko";
            // score
            ctx.fillText(this.value, 255, 186)
            ctx.strokeText(this.value, 225, 186)
            // Best
            ctx.fillText(this.best, 225, 228)
            ctx.strokeText(this.best, 225, 228)
        }
    },
    reset: function() {
        this.value = 0;
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
    dx: 2,
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
    },
    update: function() {
        if (state.current == state.game) {
            this.x = (this.x - this.dx) % (this.w / 2);
        }
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
    gravity: 0.25,
    jump: 4.6,
    speed: 0,
    rotation: 0,
    radius: 12,
    draw: function() {
        let bird = this.animation[this.frame];
        ctx.save();
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation);
        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, - this.w/2, - this.h/2, this.w, this.h);
        ctx.restore();
    },
    flap: function() {
        if (this.y - this.w > 0) {
            this.speed = - this.jump
        }
    },
    update: function() {
        this.period = state.current == state.getReady ? 10 : 5
        // We increment the frame by 1, each period
        this.frame += frames % this.period === 0 ? 1 : 0
        // Frame goes from 0 to 4, then again to 0.
        this.frame = this.frame % this.animation.length

        if (state.current === state.gameReady) {
            this.y = 150 // Refresh position
            this.speed = 0;
            this.rotation = 0 * DEGREE;
        }
        if (state.current !== state.gameReady) {
            this.speed += this.gravity
            this.y += this.speed;
            if (this.y + this.h/2 >= cvs.height - fg.h) {
                this.y = cvs.height - fg.h - this.h/2
                if (state.current == state.game) {
                    state.current = state.over
                    DIE.play();
                }

            }
            if (this.speed >= this.jump) {
                this.rotation = 60 * DEGREE
            } else {
                this.rotation = -25 * DEGREE
            }
        }
    },
    speedReset: function() {
        this.speed = 0;
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

const pipes = {
    position: [],
    top: {
        sX: 553,
        sY: 0
    },
    bottom: {
        sX: 502,
        sY: 0
    },
    w: 53,
    h: 400,
    grap: 85,
    maxYpos: -150,
    dx: 2,
    draw: function() {
        for (let i = 0; i< this.position.length; i++) {
            let p = this.position[i];

            let topYPos = p.y;
            let bottomYPos = p.y + this.h + this.grap;
            // Top pipe
            ctx.drawImage(
                sprite,
                this.top.sX,
                this.top.sY,
                this.w,
                this.h,
                p.x,
                topYPos,
                this.w,
                this.h
            )
            // Bottom pipe
            ctx.drawImage(
                sprite,
                this.bottom.sX,
                this.bottom.sY,
                this.w,
                this.h,
                p.x,
                bottomYPos,
                this.w,
                this.h
            )
        }
    },
    update: function() {
        if (state.current !== state.game) return;
        if (frames % 100 === 0) {
            this.position.push({
                x: cvs.width,
                y: this.maxYpos * (Math.random() + 1)
            })
        }
        for(let i = 0; i < this.position.length; i++) {
            let p = this.position[i]
            
            let bottomYPos = p.y + this.grap + this.h
            // Top pipe
            if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w &&
                bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h) {
                state.current = state.over
                HIT.play()
            }
            // Bottom pipe
            if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w &&
                bird.y + bird.radius > bottomYPos && bird.y - bird.radius < bottomYPos + this.h) {
                state.current = state.over
                HIT.play()
            }
            // Move pipe to the left
            p.x -= this.dx;
            if (p.x + this.w <= 0) {
                this.position.shift();
                score.value += 1;
                SCORE_S.play()
                score.best = Math.max(score.value, score.best);
                localStorage.setItem("best", score.best);
            }
        }
    },
    reset: function() {
        this.position = [];
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
    pipes.draw();
    fg.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
    score.draw();
}

function update() {
    bird.update();
    fg.update();
    bg.update();
    pipes.update();
}

function loop() {
    update();
    draw();
    frames++;
    requestAnimationFrame(loop);
}
loop();

