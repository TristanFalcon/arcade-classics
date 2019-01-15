/**
* This is the canvas.js file, 
* this file is responsible for the construction
* and behavior of canvas objects
*
* @author Tristan Falcon
**/

class Canvas {

    constructor() {
        this._color = 'black';
        this._border = 'white';
        this._element = document.getElementById("gameCanvas");
        this._ctx = gameCanvas.getContext("2d");
        this._width = gameCanvas.width;
        this._height = gameCanvas.height;        
    }

    setCanvas() {
        this._ctx.fillStyle = this._color;
        this._ctx.strokeStyle = this._border;
        this._ctx.fillRect(0, 0, this._width, this._height);
        this._ctx.strokeRect(0, 0, this._width, this._height);
    }
}

export default Canvas;