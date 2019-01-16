/**
* This is the snake.js file, this file
* handles Snake creation and behavior
*
* @author Tristan Falcon
**/

class Snake {

    /**
     * this is the constructor used to create Snake objects.
     * 
     * @param ctx 
     * @param element 
     * 
     * @author Tristan Falcon
     */
    constructor(ctx, element) {
        // sets the Snake's ctx to the '2d' canvas 
        this._ctx = ctx;
        // sets Snake color and border colors
        this._color = 'green';
        this._border = 'black';
        // variable used to track when Snake is changing direction 
        this._changingDirection = false;
        // pixel representation of Snakes coordinates when moving
        this._horizontalVelocity = 0;
        this._verticalVelocity = 0;
        // middle coordinates of canvas, where Snake is originally positioned
        this._midX = element.width / 2;
        this._midY = element.height / 2;
        // array of coordinates used to represent Snake location 
        this._parts = [
            {x: this._midX, y: this._midY},
            {x: this._midX - 20, y: this._midY},
            {x: this._midX - 40, y: this._midY},
            {x: this._midX - 60, y: this._midY},
            {x: this._midX - 80, y: this._midY},
        ]
    }

    /**
     * This method is used to draw the snake on the canvas
     * 
     * @author Tristan Falcon
     */
    drawSnake() {
        // set the variables to be used in drawSnakePart
        let ctx = this._ctx;
        ctx.fillStyle = this._color;
        ctx.strokeStyle = this._border;

        // loop through each snake _parts array and 
        // draw a 20px square on each coordinate
        this._parts.forEach( function drawSnakePart(snakePart) {
            ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
            ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
        });
    }

    getSnakeLocation() {
        return this._parts;
    }

    moveSnake() {
        
    }
}

export default Snake;