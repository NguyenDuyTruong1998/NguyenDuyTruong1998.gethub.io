function Snake() {
    this.x      = 0;
    this.y      = 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.total  = 0;
    this.tail   = [];
    this.direction = "Right"; // Hướng đi

    this.draw = function() {
        ctx.fillStyle = "#FFFFFF";
    	for (let i = 0; i < this.tail.length; i++) {
    	    ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    	}
        ctx.fillRect(this.x, this.y, scale, scale);
        ctx.fillStyle = "red";
        ctx.fillRect(this.x + 1, this.y+4, 3, 3);
        ctx.fillRect(this.x + 6, this.y+4, 3, 3);
    }
    // tăng x tăng y lên
    this.update = function() {

    	for (let i = 0; i < this.tail.length - 1; i++) {
    	    this.tail[i] = this.tail[i+1];
    	}

    	this.tail[this.total - 1] = { x: this.x, y: this.y};

    	this.x += this.xSpeed;
    	this.y += this.ySpeed;

    	if (this.x > canvas.width - 10)
            this.x = 0;

        if (this.y > canvas.height - 10)
            this.y = 0;

        if (this.x < 0)
            this.x = canvas.width - 10;

        if (this.y < 0)
            this.y = canvas.height - 10;
    }

    this.changeDirection = function(direction) {
        switch (direction) {
            case "Up":
                if (this.direction != "Down") {
                    this.xSpeed = 0;
                    this.ySpeed = -scale * 1;
                    this.direction = "Up";
                }
                break;
            case "Down":
                if (this.direction != "Up") {
                    this.xSpeed = 0;
                    this.ySpeed = scale * 1;
                    this.direction = "Down";
                }
                break;
            case "Left":
                if (this.direction != "Right") {
                    this.xSpeed = -scale * 1;
                    this.ySpeed = 0;
                    this.direction = "Left";
                }
                break;
            case "Right":
                if (this.direction != "Left") {
                    this.xSpeed = scale * 1;
                    this.ySpeed = 0;
                    this.direction = "Right";
                }
                break;
        }
    }

    this.eat = function(fruit) {
        if (this.x === fruit.x && this.y === fruit.y) {
        	this.total++;
        	return true;
        }
        return false;
    }

    this.checkCollision = function() {
        for (let i = 0; i < this.tail.length; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                stopProgram();
                //ctx.font      = "40px Comic Sans MS"; 
                ctx.fillStyle = "red";
                ctx.textAlign = "center";
                ctx.fillText("Game Over", (canvas.width)/2, (canvas.height)/2);
            }
        }
    }
    this.restart = function() {
    	clearInterval(program);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById("js-btn-restart").style.display = "none";
        this.x      = 0;
        this.y      = 0;
        this.xSpeed = scale * 1;
        this.ySpeed = 0;
        this.total  = 0;
        this.tail   = [];
        this.direction = "Right";
        program = window.setInterval(() => {
            //if (canvas.width != 0 && canvas.height != 0)
            ctx.clearRect(0, 0, canvas.width, canvas.height); // xoá all
            snake.update();
            snake.draw();
            fruit.draw();
            snake.checkCollision();
            if (snake.eat(fruit)) {
                fruit.pickLocation();
            }
        }, 125);
    }
}
