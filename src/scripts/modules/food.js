
/**
* This is the food.js file, this file
* handles Food creation and behavior
*
* @author Tristan Falcon
**/

class Food {

    /**
     * this is the constructor used to create Food objects.
     * 
     * @param ctx 
     * @param element 
     * 
     * @author Tristan Falcon
     */
    constructor(ctx, element) {
        // sets the Snake's ctx to the '2d' canvas 
        this._ctx = ctx;
        // the width and width in pixels of the canvas
        this._width = element.width;
        this._height = element.height;
        // sets Snake color and border colors
        this._color = 'red';
        this._border = 'black';
        // sets the coordinates of the food 
        this._foodX;
        this._foodY;
    }

    /**
     * Method used to return a random set of coordinates 
     * 
     * @param min, minimum coordinate value
     * @param max, maximum coordinate value 
     * 
     * @author Tristan Falcon
     */
    randomCoordinate(min, max) {
        return Math.round((Math.random() * (max-min) + min) / 20) * 20;
    }

    /**
     * Method used to set the snake coordinates, 
     * to a random location
     * 
     * @author Tristan Falcon
     */
    setFoodLocation() {
        this._foodX = this.randomCoordinate(0, this._width - 20);
        this._foodY = this.randomCoordinate(0, this._height - 20);
    }

    /**
     * Method used to draw food on canvas
     * 
     * @author Tristan Falcon
     */
    drawFood() {
        // set the color and and border color of the canvas ctx 
        this._ctx.fillStyle = this._color;
        this._ctx.strokeStyle = this._border;
        // draw the canvas and border using the ctx
        this._ctx.fillRect(this._foodX, this._foodY, 20, 20);
        this._ctx.strokeRect(this._foodX, this._foodY, 20, 20);
    }

    getFoodX() {
        return this._foodX;
    }

    getFoodY() {
        return this._foodY;
    }
}

    export default Food;