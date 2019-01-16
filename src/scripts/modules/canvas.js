/**
* This is the canvas.js file, 
* this file is responsible for the construction
* and behavior of canvas objects
*
* @author Tristan Falcon
**/

class Canvas {

    /**
     * This is the constructor used to create Canvas objects 
     * 
     * @param ctx, the '2d' context of the canvas 
     * @param element, the html element id of the canvas
     * 
     * @author Tristan Falcon
     */
    constructor(ctx, element) {
        // represents the context for the canvas 
        this._ctx = ctx;
        // the width and width in pixels of the canvas
        this._width = element.width;
        this._height = element.height;
        // the color and border color of the canvas
        this._color = 'black';
        this._border = 'white';        
    }

    /**
     * this is the setCanvas method used to draw a blank canvas 
     * 
     * @author Tristan Falcon
     */
    drawCanvas() {
        // set the color and and border color of the canvas ctx 
        this._ctx.fillStyle = this._color;
        this._ctx.strokeStyle = this._border;
        // draw the canvas and border using the ctx
        this._ctx.fillRect(0, 0, this._width, this._height);
        this._ctx.strokeRect(0, 0, this._width, this._height);
    }

    isFoodOnSnake(parts, foodX, foodY) {
       parts.forEach( function compareLocations(part) {
            const foodIsOnSnake = part.x == foodX && part.y == foodY;
            if (foodIsOnSnake) 
                return true
       });
    }
}

export default Canvas;