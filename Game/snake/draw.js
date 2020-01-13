const canvas = document.querySelector(".canvas"); // call class canvas
const ctx    = canvas.getContext("2d");
const scale  = 10;
const rows   = canvas.height / scale;
const columns = canvas.width / scale;

var snake;
var program;

(function setup() {
    snake = new Snake(); // call snake function from snake.js
    fruit = new Fruit();

    fruit.pickLocation();

    program = window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // xoá all
        snake.checkCollision();
        snake.update();
        fruit.draw();
        snake.draw();
        if (snake.eat(fruit)) {
            fruit.pickLocation();
        }
    }, 125);
}());

function stopProgram() {
  clearInterval(program);
  document.getElementById("js-btn-restart").style.display = "block";
}

window.addEventListener("keydown", ((evt) => {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
}));
