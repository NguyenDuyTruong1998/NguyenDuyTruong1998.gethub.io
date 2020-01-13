function Fruit() {
    this.x;
    this.y;

    this.pickLocation = function() {
        this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
        this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
            for (let i = 0; i < snake.tail.length - 1; i++) {
    	        if (this.x === snake.tail[i].x && this.y === snake.tail[i].y)
    	        	this.pickLocation();
    	    }
    }

    this.draw = function() {
        ctx.fillStyle = "#4cafab";
        ctx.fillRect(this.x, this.y, scale, scale);
        //ctx.fillText("🍎", this.x - 1, this.y + 8); // draw fruit is a apple
    }
}
